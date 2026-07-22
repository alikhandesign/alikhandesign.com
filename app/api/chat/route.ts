import { NextRequest, NextResponse } from 'next/server'
import { isRequestAuthorized } from '@/lib/auth'

const RATE_LIMIT_WINDOW = 60 * 60 // 1 hour in seconds
const RATE_LIMIT_MAX = 15 // messages per window

const LIMITATION_PHRASES = [
  "i'm not able to",
  "i can't",
  "i don't have access",
  "that's outside",
  "i'm unable to",
  "i'm designed to",
  "i don't have information",
  "i'm not sure i have",
]

// Lazy KV import — only runs server-side
async function getKV() {
  const { Redis } = await import('@upstash/redis')
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  })
}

async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  try {
    const kv = await getKV()
    const key = `ratelimit:${ip}`
    const current = await kv.get<number>(key)
    if (current === null) {
      await kv.set(key, 1, { ex: RATE_LIMIT_WINDOW })
      return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
    }
    if (current >= RATE_LIMIT_MAX) {
      return { allowed: false, remaining: 0 }
    }
    await kv.incr(key)
    return { allowed: true, remaining: RATE_LIMIT_MAX - current - 1 }
  } catch {
    return { allowed: true, remaining: RATE_LIMIT_MAX }
  }
}

async function logConversation(entry: {
  ip: string
  sessionId: string
  messageIndex: number
  userMessage: string
  assistantMessage: string
  unlocked: boolean
  timestamp: string
  patterns: {
    cited_sources: boolean
    source_count: number
    limitation_handling: boolean
    error_state: boolean
    rate_limited: boolean
  }
}) {
  try {
    const kv = await getKV()
    const logKey = `log:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`
    await kv.set(logKey, JSON.stringify(entry), { ex: 60 * 60 * 24 * 90 }) // 90 days
    await kv.lpush('log:index', logKey)
    await kv.ltrim('log:index', 0, 999)
  } catch {
    // Log silently fails — never block the chat
  }
}

function isAllowedOrigin(origin: string, host: string): boolean {
  if (!origin && !host) return false
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1')
  if (isLocal) return true
  const allowed = [
    'alikhandesign.com',
    'alikhandesign-com.vercel.app',
    '.vercel.app',
  ]
  return allowed.some(d => origin.includes(d))
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const host = req.headers.get('host') || ''

  if (!isAllowedOrigin(origin, host)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const { allowed, remaining } = await checkRateLimit(ip)

  if (!allowed) {
    // Log the rate limit hit so we can see where sessions are hitting walls
    await logConversation({
      ip,
      sessionId: 'unknown',
      messageIndex: -1,
      userMessage: '',
      assistantMessage: '',
      unlocked: false,
      timestamp: new Date().toISOString(),
      patterns: {
        cited_sources: false,
        source_count: 0,
        limitation_handling: false,
        error_state: false,
        rate_limited: true,
      },
    })
    return NextResponse.json(
      { error: 'Too many messages. Please try again in an hour.' },
      { status: 429 }
    )
  }

  const { messages, sessionId, messageIndex } = await req.json()
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  // Authorization is determined here, server-side, from the httpOnly cookie —
  // never from anything the client sends in the request body. A client-supplied
  // "unlocked" flag would let anyone unlock the protected prompt without a
  // password at all, so it's intentionally ignored even if present.
  const unlocked = await isRequestAuthorized(req, 'case-study')

  const resolvedSessionId = typeof sessionId === 'string' && sessionId.length > 0
    ? sessionId
    : 'unknown'
  const resolvedMessageIndex = typeof messageIndex === 'number' ? messageIndex : 0

  // Build system prompt
  const { PUBLIC_SYSTEM_PROMPT, PROTECTED_SYSTEM_PROMPT } = await import('@/lib/systemPrompt')
  const { SITE_SOURCES, formatSourcesForPrompt } = await import('@/lib/sources')

  const basePrompt = (unlocked
    ? PUBLIC_SYSTEM_PROMPT + '\n\n' + PROTECTED_SYSTEM_PROMPT
    : PUBLIC_SYSTEM_PROMPT
  ).replace('{{SOURCES}}', formatSourcesForPrompt())

  // Call Anthropic
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: basePrompt,
      messages,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error('Anthropic error:', err)
    return NextResponse.json({ error: 'AI service error. Please try again.' }, { status: 500 })
  }

  const data = await response.json()
  const assistantMessage = data.content?.[0]?.text ?? ''

  // Extract cited source IDs in order of first appearance
  const seenIds: number[] = []
  for (const match of assistantMessage.matchAll(/\[(\d+)\]/g)) {
    const id = parseInt(match[1])
    if (SITE_SOURCES.some(s => s.id === id) && !seenIds.includes(id)) {
      seenIds.push(id)
    }
  }

  // Build remapping: original source ID → sequential display number (1, 2, 3...)
  const idToDisplayNum: Record<number, number> = {}
  seenIds.forEach((id, index) => {
    idToDisplayNum[id] = index + 1
  })

  // Rewrite [n] markers in message text to sequential display numbers
  const renumberedMessage = assistantMessage.replace(/\[(\d+)\]/g, (match: string, num: string) => {
    const id = parseInt(num)
    return idToDisplayNum[id] !== undefined ? `[${idToDisplayNum[id]}]` : match
  })

  // Return sources in appearance order, matched to their new display numbers
  const citedSources = seenIds
    .map(id => SITE_SOURCES.find(s => s.id === id))
    .filter(Boolean)

  // Detect which patterns fired in this response
  const lowerMessage = renumberedMessage.toLowerCase()
  const patterns = {
    cited_sources: seenIds.length > 0,
    source_count: seenIds.length,
    limitation_handling: LIMITATION_PHRASES.some(p => lowerMessage.includes(p)),
    error_state: renumberedMessage.includes('Something went wrong on my end'),
    rate_limited: false,
  }

  const userMessage = messages[messages.length - 1]?.content ?? ''
  await logConversation({
    ip,
    sessionId: resolvedSessionId,
    messageIndex: resolvedMessageIndex,
    userMessage: typeof userMessage === 'string' ? userMessage : JSON.stringify(userMessage),
    assistantMessage: renumberedMessage,
    unlocked,
    timestamp: new Date().toISOString(),
    patterns,
  })

  return NextResponse.json(
    { message: renumberedMessage, sources: citedSources, remaining },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}
