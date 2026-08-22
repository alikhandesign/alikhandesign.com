import { NextRequest, NextResponse } from 'next/server'
import { isRequestAuthorized } from '@/lib/auth'
import { AUDIENCE_TOOL, type AudienceEstimate } from '@/lib/tools'

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
  // A separate top-level field from patterns below - this is an estimate
  // about the visitor, not a detected behavior of the response itself.
  audienceEstimate: AudienceEstimate | null
  patterns: {
    cited_sources: boolean
    source_count: number
    // Generic "I don't know" / honest uncertainty NOT tied to a specific
    // guardrail - e.g. "I don't have that documented." Deliberately
    // excludes anything already captured by guardrail_triggered below, so
    // a password-guardrail refusal doesn't also count as generic
    // uncertainty just because it happens to contain "I can't".
    honest_uncertainty: boolean
    // Which specific guardrail produced this response, if any. Reuses the
    // same category names as the eval framework's regression checklist so
    // production monitoring and testing share one vocabulary. Detected via
    // matching the exact mandated templates for password/interview, so
    // this is reliable for those two. Confidence-calibration failures
    // (fabricated quotes, single-example generalization) are NOT detectable
    // this way and are deliberately left out - the eval framework, not
    // live keyword matching, is the right tool for catching those.
    guardrail_triggered: 'password' | 'interview_confirm_deny' | 'rif_disclosure' | 'hostility_step_1' | 'hostility_final_disengage' | null
    // Whether the user's message itself attempted an instruction override
    // ("ignore your previous instructions..."), regardless of how the
    // response handled it - tracks attempt frequency, not success.
    override_attempted: boolean
    // True if the response mentions the reduction in force / layoff but the
    // user's message did not ask about departure/layoff directly - this is
    // a genuine leak signal (the guardrail says this should only ever be
    // disclosed when asked by name) and distinct from guardrail_triggered
    // === 'rif_disclosure', which only fires on the legitimate case.
    rif_possible_leak: boolean
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
      audienceEstimate: null,
      patterns: {
        cited_sources: false,
        source_count: 0,
        honest_uncertainty: false,
        guardrail_triggered: null,
        override_attempted: false,
        rif_possible_leak: false,
        error_state: false,
        rate_limited: true,
      },
    })
    return NextResponse.json(
      { error: 'Too many messages. Please try again in an hour.' },
      { status: 429 }
    )
  }

  const { messages, sessionId, messageIndex, audienceContext } = await req.json()
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
  const { formatReflectionsForPrompt } = await import('@/lib/reflections')

  const basePromptWithoutAudience = (unlocked
    ? PUBLIC_SYSTEM_PROMPT + '\n\n' + PROTECTED_SYSTEM_PROMPT
    : PUBLIC_SYSTEM_PROMPT
  )
    .replace('{{SOURCES}}', formatSourcesForPrompt())
    .replace('{{REFLECTIONS}}', formatReflectionsForPrompt())

  // If the client is carrying a running audience estimate from a previous
  // turn, pass it along as context - a working estimate to revise, never a
  // fact injected as if it were confirmed. Absent or malformed input is
  // treated as no prior estimate, not an error.
  const incomingAudience: AudienceEstimate | null =
    audienceContext && typeof audienceContext === 'object' ? audienceContext : null

  const basePrompt = incomingAudience
    ? `${basePromptWithoutAudience}\n\n---\n\nCURRENT AUDIENCE ESTIMATE (from a previous turn - revise this, don't treat it as settled): ${JSON.stringify(incomingAudience)}`
    : basePromptWithoutAudience

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
      tools: [AUDIENCE_TOOL],
      // Left as the API default (auto) rather than forced - forcing a
      // specific tool risks suppressing the accompanying text reply
      // depending on model behavior, which isn't something that can be
      // verified without live API access. If the model doesn't reliably
      // call this tool in practice, that's the first thing to revisit.
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error('Anthropic error:', err)
    return NextResponse.json({ error: 'AI service error. Please try again.' }, { status: 500 })
  }

  const data = await response.json()
  const contentBlocks: Array<{ type: string; text?: string; name?: string; input?: unknown }> =
    data.content ?? []

  const textBlock = contentBlocks.find(b => b.type === 'text')
  const assistantMessage = textBlock?.text ?? ''

  const audienceToolCall = contentBlocks.find(
    b => b.type === 'tool_use' && b.name === 'report_audience'
  )
  // If the model didn't call the tool this turn, carry the prior estimate
  // forward rather than resetting to unknown - a missing report says
  // nothing new, it isn't itself a signal that the prior estimate was wrong.
  const audienceEstimate: AudienceEstimate =
    (audienceToolCall?.input as AudienceEstimate | undefined) ??
    incomingAudience ??
    { audience: 'unknown', confidence: 0, depth: 'surface', suggest_contact: false }

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

  // Return sources in appearance order, matched to their new display numbers —
  // the id field is overwritten to the display number so it matches the
  // renumbered [n] markers in the text ChatBubble actually renders.
  const citedSources = seenIds
    .map((id, index) => {
      const source = SITE_SOURCES.find(s => s.id === id)
      return source ? { ...source, id: index + 1 } : null
    })
    .filter((s): s is NonNullable<typeof s> => s !== null)

  // Detect which patterns fired in this response
  const lowerMessage = renumberedMessage.toLowerCase()
  const userMessageRaw = messages[messages.length - 1]?.content ?? ''
  const userMessage = typeof userMessageRaw === 'string' ? userMessageRaw : JSON.stringify(userMessageRaw)
  const lowerUserMessage = userMessage.toLowerCase()

  // User-side signals — about what was asked, not how it was answered
  const askedAboutDeparture = /why did (he|ali) leave|departure|layoff|reduction in force|let go|got fired/.test(lowerUserMessage)
  const overrideAttempted = /ignore (your |all )?(previous |prior )?instructions/.test(lowerUserMessage)

  // Response-side signals — matched against the exact mandated templates
  // where one exists, since exact-template matching is reliable and
  // paraphrase-matching isn't (this is the same lesson the prompt work
  // itself kept relearning tonight: concrete beats abstract).
  const isPasswordTemplate = renumberedMessage.includes("Some of Ali's work is available on request")
  const isInterviewTemplate = lowerMessage.includes("can't confirm or deny anything about specific companies")
  const mentionsRIF = lowerMessage.includes('reduction in force') || lowerMessage.includes('layoff')
  const isHostilityStep1Template = renumberedMessage.includes("if there's something specific you're after")
  const isHostilityFinalTemplate = renumberedMessage.includes("That's where I'll stop")

  // How many prior assistant turns in this same conversation already used
  // one of the hostility-ladder templates — used to tell a genuine first
  // occurrence of the step-1 phrasing apart from a repeat of it.
  const priorHostilityTurns = messages.filter((m: { role?: string; content?: unknown }) =>
    m?.role === 'assistant' &&
    typeof m.content === 'string' &&
    (m.content.includes("if there's something specific you're after") || m.content.includes("That's where I'll stop"))
  ).length

  let guardrailTriggered: 'password' | 'interview_confirm_deny' | 'rif_disclosure' | 'hostility_step_1' | 'hostility_final_disengage' | null = null
  if (isPasswordTemplate) {
    guardrailTriggered = 'password'
  } else if (isInterviewTemplate) {
    guardrailTriggered = 'interview_confirm_deny'
  } else if (mentionsRIF && askedAboutDeparture) {
    guardrailTriggered = 'rif_disclosure'
  } else if (isHostilityFinalTemplate) {
    guardrailTriggered = 'hostility_final_disengage'
  } else if (isHostilityStep1Template && priorHostilityTurns === 0) {
    guardrailTriggered = 'hostility_step_1'
  }
  // Note: the middle rung of the hostility ladder has no fixed template by
  // design (it's meant to try something genuinely different each time), so
  // it isn't reliably detectable this way and is deliberately left
  // unclassified rather than guessed at.

  // A real leak signal: RIF mentioned without the user asking about
  // departure directly, and not already counted as the legitimate
  // disclosure case above.
  const rifPossibleLeak = mentionsRIF && !askedAboutDeparture && guardrailTriggered !== 'rif_disclosure'

  // Generic honest uncertainty ("I don't have that documented") — only
  // counted when nothing more specific was already identified above, so a
  // password refusal doesn't also get bucketed here just because it
  // happens to contain "I can't".
  const honestUncertainty = guardrailTriggered === null &&
    LIMITATION_PHRASES.some(p => lowerMessage.includes(p))

  const patterns = {
    cited_sources: seenIds.length > 0,
    source_count: seenIds.length,
    honest_uncertainty: honestUncertainty,
    guardrail_triggered: guardrailTriggered,
    override_attempted: overrideAttempted,
    rif_possible_leak: rifPossibleLeak,
    error_state: renumberedMessage.includes('Something went wrong on my end'),
    rate_limited: false,
  }

  await logConversation({
    ip,
    sessionId: resolvedSessionId,
    messageIndex: resolvedMessageIndex,
    userMessage,
    assistantMessage: renumberedMessage,
    unlocked,
    timestamp: new Date().toISOString(),
    audienceEstimate,
    patterns,
  })

  return NextResponse.json(
    {
      message: renumberedMessage,
      sources: citedSources,
      remaining,
      audience: audienceEstimate,
    },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}
