import { NextRequest, NextResponse } from 'next/server'

const RATE_LIMIT_WINDOW = 60 * 60 // 1 hour in seconds
const RATE_LIMIT_MAX = 15 // messages per window

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
  userMessage: string
  assistantMessage: string
  unlocked: boolean
  timestamp: string
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
  // Allow any vercel.app preview + production domain
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
    return NextResponse.json(
      { error: 'Too many messages. Please try again in an hour.' },
      { status: 429 }
    )
  }

  const { messages, unlocked } = await req.json()
  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

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
      model: 'claude-sonnet-4-6',
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

  // Extract cited source IDs from inline [n] markers
  const citedIds = [...new Set(
    [...assistantMessage.matchAll(/\[(\d+)\]/g)]
      .map(m => parseInt(m[1]))
      .filter(id => SITE_SOURCES.some(s => s.id === id))
  )]
  const citedSources = SITE_SOURCES.filter(s => citedIds.includes(s.id))

  const userMessage = messages[messages.length - 1]?.content ?? ''
  await logConversation({
    ip,
    userMessage: typeof userMessage === 'string' ? userMessage : JSON.stringify(userMessage),
    assistantMessage,
    unlocked,
    timestamp: new Date().toISOString(),
  })

  return NextResponse.json(
    { message: assistantMessage, sources: citedSources, remaining },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}
