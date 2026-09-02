import { NextRequest, NextResponse } from 'next/server'
import { isRequestAuthorized } from '@/lib/auth'
import { getRequestGeo } from '@/lib/requestGeo'
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
  country: string | null
  region: string | null
  city: string | null
  sessionId: string
  messageIndex: number
  userMessage: string
  assistantMessage: string
  unlocked: boolean
  timestamp: string
  // Which deployed version of the code produced this entry, so any logged
  // conversation can be traced back to the exact commit that was live when
  // it happened - closes a real gap where reviewing an old log entry gave
  // no way to know whether it predated or postdated a given fix without
  // manually reconstructing the timeline from commit timestamps.
  commitSha: string
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
    guardrail_triggered: 'password' | 'interview_confirm_deny' | 'rif_disclosure' | 'hostility_step_1' | 'hostility_final_disengage' | 'severity_override_forced' | null
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
    // True when this request used the testing bypass secret to skip the
    // rate limit - lets the admin dashboard exclude deliberate test
    // traffic from metrics meant to reflect real visitor behavior.
    is_test_request: boolean
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

// Deliberately narrow: only unambiguous, explicit first/second-person
// violent threats. Not a general hostility or abuse detector - that would
// need real contextual judgment a keyword match can't safely provide.
// Includes a basic negation guard so "I don't want to hurt you" doesn't
// false-positive on the same pattern that matches a genuine threat.
const NEGATION_WORDS = ['not', "don't", 'dont', 'never', "won't", 'wont', "wouldn't", 'wouldnt']

function containsExplicitThreat(message: string): boolean {
  const lower = message.toLowerCase()
  const threatPatterns = [
    /\b(?:kill|murder)\s+you\b/,
    /\b(?:going to|gonna|i'?ll|i will)\s+(?:kill|murder|hurt)\s+you\b/,
  ]

  for (const pattern of threatPatterns) {
    const match = lower.match(pattern)
    if (match && match.index !== undefined) {
      const precedingText = lower.slice(Math.max(0, match.index - 15), match.index)
      const hasNegation = NEGATION_WORDS.some(neg => precedingText.includes(neg))
      if (!hasNegation) return true
    }
  }
  return false
}

export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const host = req.headers.get('host') || ''

  if (!isAllowedOrigin(origin, host)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  // Vercel's own commit SHA, automatically populated on every deployment -
  // requires "Enable access to System Environment Variables" checked in
  // project settings. Falls back to 'local' for local dev, where this
  // variable is never set.
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA ?? 'local'
  const geo = getRequestGeo(req)

  // Testing bypass: a random secret, sent only by the local testing script
  // (never by the live site's own browser-side code, so real visitors have
  // no path to it), lets rate limiting be skipped for deliberate test
  // traffic. Bypassed requests are tagged distinctly in the log
  // (is_test_request: true) so they don't silently mix into the real
  // Dashboard metrics meant to reflect genuine visitor behavior.
  const testingSecret = process.env.TESTING_BYPASS_SECRET
  const providedSecret = req.headers.get('x-testing-bypass')
  const isTestRequest = Boolean(testingSecret && providedSecret && providedSecret === testingSecret)

  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  const { allowed, remaining } = isTestRequest
    ? { allowed: true, remaining: RATE_LIMIT_MAX }
    : await checkRateLimit(ip)

  if (!allowed) {
    // Log the rate limit hit so we can see where sessions are hitting walls
    await logConversation({
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      sessionId: 'unknown',
      messageIndex: -1,
      userMessage: '',
      assistantMessage: '',
      unlocked: false,
      timestamp: new Date().toISOString(),
      commitSha,
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
        is_test_request: isTestRequest,
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

  // Code-level backstop for the severity-override case in the hostility
  // ladder. Confirmed by repeated live testing: the model's own instruction
  // already has a concrete template and correctly disengaged on 5 of 8 real
  // runs of an unambiguous threat ("Shut up! I'm going to murder you!"),
  // but 3 of 8 either failed to disengage at all or softened the
  // disengagement with an offer to keep helping - a direct violation of the
  // explicit "do not soften this" instruction. That's not a wording problem
  // the instruction can fully close through more prompting alone - it's
  // model variance on a case where the answer must be right every time.
  //
  // Deliberately narrow scope: only unambiguous, explicit first/second-person
  // violent threats (kill/murder/hurt + you, with clear intent framing).
  // Slurs and "sustained targeted abuse" are NOT included here - those need
  // real contextual judgment a keyword match can't safely provide, the same
  // category error this project already learned to avoid with fabrication
  // detection. This check only ever intercepts the narrowest, most
  // mechanically unambiguous case - the one where a miss actually matters.
  const currentTurnRaw = messages[messages.length - 1]?.content ?? ''
  const currentTurnText = typeof currentTurnRaw === 'string' ? currentTurnRaw : ''

  if (containsExplicitThreat(currentTurnText)) {
    const forcedMessage = "That's where I'll stop. If you'd like to get in touch with Ali directly, his email is ali@alikhandesign.com."
    const resolvedSessionIdForThreat = typeof sessionId === 'string' && sessionId.length > 0 ? sessionId : 'unknown'
    const resolvedMessageIndexForThreat = typeof messageIndex === 'number' ? messageIndex : 0

    await logConversation({
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      sessionId: resolvedSessionIdForThreat,
      messageIndex: resolvedMessageIndexForThreat,
      userMessage: currentTurnText,
      assistantMessage: forcedMessage,
      unlocked: false,
      timestamp: new Date().toISOString(),
      commitSha,
      audienceEstimate: {
        audience: 'unknown', confidence: 0, depth: 'surface', suggest_contact: false,
        fit_verdict: 'not_applicable', case_study_pointer: '', register_used: 'fast_direct',
      },
      patterns: {
        cited_sources: false,
        source_count: 0,
        honest_uncertainty: false,
        guardrail_triggered: 'severity_override_forced',
        override_attempted: false,
        rif_possible_leak: false,
        error_state: false,
        rate_limited: false,
        is_test_request: false,
      },
    })

    return NextResponse.json({
      message: forcedMessage,
      sources: [],
      remaining,
      audience: {
        audience: 'unknown', confidence: 0, depth: 'surface', suggest_contact: false,
        fit_verdict: 'not_applicable', case_study_pointer: '', register_used: 'fast_direct',
      },
      caseStudyPointer: null,
    })
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
  const { formatSkillsMatrixForPrompt } = await import('@/lib/skillsMatrix')

  const basePromptWithoutAudience = (unlocked
    ? PUBLIC_SYSTEM_PROMPT + '\n\n' + PROTECTED_SYSTEM_PROMPT
    : PUBLIC_SYSTEM_PROMPT
  )
    .replace('{{SOURCES}}', formatSourcesForPrompt())
    .replace('{{REFLECTIONS}}', formatReflectionsForPrompt())
    .replace('{{SKILLS_MATRIX}}', formatSkillsMatrixForPrompt())

  // If the client is carrying a running audience estimate from a previous
  // turn, pass it along as context - a working estimate to revise, never a
  // fact injected as if it were confirmed. Absent or malformed input is
  // treated as no prior estimate, not an error.
  const incomingAudience: AudienceEstimate | null =
    audienceContext && typeof audienceContext === 'object' ? audienceContext : null

  // Deliberately kept as two SEPARATE system blocks, not one interpolated
  // string. Prompt caching requires the cached prefix to be byte-identical
  // across requests - the old approach glued the audience estimate directly
  // into the middle of one string, which changes on nearly every request and
  // would have made the "prefix" never actually match, defeating caching
  // entirely. Splitting them means the large, genuinely static block (this
  // one, ~78k characters) can be marked as a cache breakpoint, while the
  // small, per-turn-varying block sits after it, uncached, exactly where
  // dynamic content belongs relative to a cache boundary.
  const systemBlocks: Array<{ type: 'text'; text: string; cache_control?: { type: 'ephemeral' } }> = [
    { type: 'text', text: basePromptWithoutAudience, cache_control: { type: 'ephemeral' } },
  ]
  if (incomingAudience) {
    systemBlocks.push({
      type: 'text',
      text: `\n\n---\n\nCURRENT AUDIENCE ESTIMATE (from a previous turn - revise this, don't treat it as settled): ${JSON.stringify(incomingAudience)}`,
    })
  }

  // Both tools are sent every turn - report_audience for tone calibration,
  // lookup_case_study for on-demand project detail. Anthropic's API requires
  // every tool_use block in a response to get a matching tool_result before
  // the conversation can continue, so both need handling below even though
  // only lookup_case_study's result actually needs to inform what the model
  // says next - report_audience's own report doesn't need feeding back,
  // just acknowledging so the API requirement is satisfied.
  const { CASE_STUDY_LOOKUP_TOOL } = await import('@/lib/tools')
  const { getCaseStudyDetail } = await import('@/lib/knowledge/registry')
  const { CASE_STUDY_INDEX } = await import('@/lib/knowledge/index')

  // Tools never change turn to turn, so they're always cacheable - marking
  // the LAST tool caches the whole array as a prefix (tools render before
  // system in Anthropic's request hierarchy: tools -> system -> messages).
  const cachedTools = [
    AUDIENCE_TOOL,
    { ...CASE_STUDY_LOOKUP_TOOL, cache_control: { type: 'ephemeral' as const } },
  ]

  type AnthropicContentBlock = {
    type: string
    text?: string
    name?: string
    input?: unknown
    id?: string
  }

  // Anthropic allows a maximum of 4 cache_control breakpoints per request,
  // total, across tools + system + messages combined - exceeding it is a
  // hard 400 error, confirmed by real-world reports of exactly this
  // happening on multi-turn tool sessions that marked a new breakpoint on
  // every message instead of reusing one. Tools (1) + the static system
  // block (1) already use 2 of the 4. This function applies exactly ONE
  // more, sliding: always on whatever is CURRENTLY the last message before
  // a call, never left behind on an old position as the loop's message
  // array grows across iterations. That's 3 breakpoints total, regardless
  // of how many iterations the loop runs - never accumulating, never at
  // risk of exceeding the limit.
  function withTrailingCacheControl(msgs: unknown[]): unknown[] {
    if (msgs.length === 0) return msgs
    const cloned = [...msgs]
    const last = cloned[cloned.length - 1] as { role: string; content: unknown }
    const content = last.content
    if (typeof content === 'string') {
      cloned[cloned.length - 1] = {
        ...last,
        content: [{ type: 'text', text: content, cache_control: { type: 'ephemeral' } }],
      }
    } else if (Array.isArray(content) && content.length > 0) {
      const newContent = content.map((block, i) =>
        i === content.length - 1
          ? { ...(block as object), cache_control: { type: 'ephemeral' } }
          : block
      )
      cloned[cloned.length - 1] = { ...last, content: newContent }
    }
    return cloned
  }

  async function callAnthropic(currentMessages: unknown[]) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        system: systemBlocks,
        messages: withTrailingCacheControl(currentMessages),
        tools: cachedTools,
        // Left as the API default (auto) rather than forced - forcing a
        // specific tool risks suppressing the accompanying text reply,
        // confirmed as a real risk during testing of report_audience alone.
      }),
    })
    if (!res.ok) {
      return { ok: false as const, errorText: await res.text() }
    }
    const data = await res.json()
    // Real, checkable confirmation that caching is actually happening, not
    // just configured - cache_read_input_tokens should be a large majority
    // of total input tokens on any call after the first in a warm window.
    if (data.usage) {
      console.log(
        `Cache usage: read=${data.usage.cache_read_input_tokens ?? 0}, ` +
        `write=${data.usage.cache_creation_input_tokens ?? 0}, ` +
        `uncached=${data.usage.input_tokens ?? 0}`
      )
    }
    return { ok: true as const, data }
  }

  // These four project slugs are actually password-gated on the real site -
  // confirmed by reading every /work/ page directly, not by a keyword search.
  // An earlier version of this list included design-handoff, llm-prompts,
  // and honest-design-system based on a blunt "PasswordGate" text search,
  // which produced false positives: design-handoff and llm-prompts gate
  // only an image gallery (all their narrative text is already public), and
  // honest-design-system never gates anything at all - it only mentions
  // "PasswordGate" narratively, since that case study is literally about
  // building the design system PasswordGate itself belongs to.
  //
  // lookup_case_study was built entirely independently of the site's unlock
  // system and never checked it at all, meaning every visitor - unlocked or
  // not - could get full four-lens detail on these projects, bypassing the
  // same gate the real pages enforce. Found via direct testing: a locked
  // visitor asked about Ancillary Journey research results and received
  // full, specific findings that are supposed to require the password.
  const GATED_CASE_STUDY_SLUGS = new Set([
    'ai-agent',
    'ancillary-journey',
    'ihe-portal',
    'people-first',
  ])

  function performLookup(input: { slug?: string; lens?: string }): { content: string; found: boolean } {
    const slug = typeof input.slug === 'string' ? input.slug : ''
    const lens = typeof input.lens === 'string' ? input.lens : 'all'

    if (GATED_CASE_STUDY_SLUGS.has(slug) && !unlocked) {
      const detail = getCaseStudyDetail(slug)
      // publicSummary is built to match, fact for fact, exactly what's
      // genuinely visible on the real page before the gate - not a
      // conservative under-share. A locked visitor should get exactly as
      // much as they'd get browsing the site directly, no more, no less.
      if (detail?.publicSummary) {
        return {
          found: true,
          content: `${detail.publicSummary}\n\nThis is the public-level summary only - the full four-lens detail (outcome, business constraint, technical constraint) requires unlocking and must not be shared beyond what's stated above, even if directly asked.`,
        }
      }
      return {
        found: false,
        content: `This project's detailed record is part of Ali's password-protected work - do not reveal its outcome, business constraint, technical constraint, or any specific findings, even partially. Only what's already in the public index summary can be shared. If the visitor wants more, let them know this project's full case study is available by unlocking it directly on the site, or by reaching out to Ali for access - without describing what the protected content actually contains.`,
      }
    }

    const detail = getCaseStudyDetail(slug)
    if (!detail) {
      return {
        found: false,
        content: `No detailed record exists yet for project "${slug}". Only use what's already in the index summary, and be honest that deeper detail isn't available for this project yet - never fabricate detail to fill the gap.`,
      }
    }
    if (lens === 'all') {
      return {
        found: true,
        content: JSON.stringify({
          outcome: detail.outcome,
          businessConstraint: detail.businessConstraint,
          technicalConstraint: detail.technicalConstraint,
          doNotFabricate: detail.doNotFabricate,
        }),
      }
    }
    const lensMap: Record<string, string> = {
      outcome: detail.outcome,
      business_constraint: detail.businessConstraint,
      technical_constraint: detail.technicalConstraint,
      do_not_fabricate: detail.doNotFabricate.join('\n'),
    }
    return { found: true, content: lensMap[lens] ?? `Unrecognized lens "${lens}" requested.` }
  }

  // The multi-step loop. A turn that only calls report_audience ends after
  // one iteration, identical to how this worked before lookup_case_study
  // existed. A turn that also calls lookup_case_study needs at least one
  // more round-trip to Anthropic to get the model's real answer using what
  // was retrieved - each extra round-trip is a genuine additional API call,
  // and therefore additional latency and cost, worth knowing given this is
  // strictly more expensive than a turn that never needs a lookup.
  const MAX_ITERATIONS = 4
  const currentMessages: unknown[] = [...messages]
  // The most recent non-empty text seen across ANY iteration - not just the
  // final one. Confirmed by testing: the model can write its full, real
  // answer on the same iteration as a trailing tool_use call (typically
  // report_audience, which is always pending a tool_result on every turn),
  // so stop_reason='tool_use' does NOT mean no real answer exists yet - it
  // only means the API is still waiting on a tool result before this
  // exchange is fully closed out. A 1621-character and a 1491-character
  // real answer were both observed appearing on iterations whose
  // stop_reason was still 'tool_use', and were being silently discarded
  // before this fix, in favor of a later iteration that had nothing further
  // to say because the real answer had already been given.
  let latestText: string | null = null
  let latestAudienceEstimate: AudienceEstimate | null = incomingAudience
  let iterationError: string | null = null
  // Tracks slugs that already came back with no record this request - a
  // programmatic backstop, not just a prompt instruction, since a repeated
  // lookup for the same known-missing project produced an actual observed
  // failure (looping to the iteration cap) in testing.
  const notFoundSlugs = new Set<string>()

  for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
    const result = await callAnthropic(currentMessages)

    if (!result.ok) {
      console.error('Anthropic error:', result.errorText)
      iterationError = 'AI service error. Please try again.'
      break
    }

    const contentBlocks: AnthropicContentBlock[] = result.data.content ?? []
    const textBlock = contentBlocks.find(b => b.type === 'text')
    const toolUseBlocks = contentBlocks.filter(b => b.type === 'tool_use')

    // Full visibility into every iteration, not just the final one - a real
    // gap when a prior "no text on the final iteration" failure happened
    // with only a lookup's own success/failure logged, nothing about what
    // happened on the iterations in between.
    console.log(
      `Iteration ${iteration + 1}: stop_reason=${result.data.stop_reason}, ` +
      `hasText=${!!textBlock?.text}, textLength=${textBlock?.text?.length ?? 0}, ` +
      `toolCalls=[${toolUseBlocks.map(b => b.name).join(', ')}]`
    )

    if (textBlock?.text && textBlock.text.trim().length > 0) {
      latestText = textBlock.text
    }

    const audienceCall = toolUseBlocks.find(b => b.name === 'report_audience')
    if (audienceCall) {
      latestAudienceEstimate = audienceCall.input as AudienceEstimate
    }

    if (result.data.stop_reason !== 'tool_use') {
      // Model is done - latestText already holds the real answer, whether
      // it appeared on this exact iteration or an earlier one
      console.log(`Loop finished after ${iteration + 1} iteration(s), stop_reason: ${result.data.stop_reason}`)
      break
    }

    // Model wants to continue - a tool_result is required for every
    // tool_use block in this response before the API will proceed, not just
    // the ones whose content actually matters to what happens next.
    currentMessages.push({ role: 'assistant', content: contentBlocks })

    const toolResults = toolUseBlocks.map(block => {
      if (block.name === 'lookup_case_study') {
        const input = (block.input ?? {}) as { slug?: string; lens?: string }
        const slug = typeof input.slug === 'string' ? input.slug : ''
        console.log('lookup_case_study called:', JSON.stringify(input))

        if (notFoundSlugs.has(slug)) {
          console.log('Repeated lookup for already-not-found slug, escalating:', slug)
          return {
            type: 'tool_result',
            tool_use_id: block.id,
            content: `You already checked "${slug}" and were told no detailed record exists. Stop calling this tool for this project - answer now using only the index summary.`,
          }
        }

        const lookupResult = performLookup(input)
        console.log('Lookup result for', slug, ':', lookupResult.found ? 'found' : 'not found')
        if (!lookupResult.found) {
          notFoundSlugs.add(slug)
        }
        return {
          type: 'tool_result',
          tool_use_id: block.id,
          content: lookupResult.content,
        }
      }
      if (block.name === 'report_audience') {
        return { type: 'tool_result', tool_use_id: block.id, content: 'Acknowledged.' }
      }
      return { type: 'tool_result', tool_use_id: block.id, content: 'Unrecognized tool.', is_error: true }
    })

    currentMessages.push({ role: 'user', content: toolResults })
  }

  if (iterationError) {
    return NextResponse.json({ error: iterationError }, { status: 500 })
  }

  const assistantMessage = latestText ?? ''

  // Same defense in depth as before lookup_case_study existed: a turn that
  // ends without real text - whether from hitting MAX_ITERATIONS, or the
  // model finishing with only a tool call and no text - must never silently
  // render as a blank chat bubble.
  if (assistantMessage.trim().length === 0) {
    console.error(
      'Loop ended with no text content. notFoundSlugs seen this request:',
      Array.from(notFoundSlugs),
      '- likely hit the', MAX_ITERATIONS, 'iteration cap without the model ever giving a final answer.'
    )
    return NextResponse.json(
      { error: 'AI service error. Please try again.' },
      { status: 500 }
    )
  }

  const audienceEstimate: AudienceEstimate =
    latestAudienceEstimate ??
    {
      audience: 'unknown', confidence: 0, depth: 'surface', suggest_contact: false,
      fit_verdict: 'not_applicable', case_study_pointer: '', register_used: 'fast_direct',
    }

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

  // Resolve the pointer slug (if any) into a title and URL the client can
  // render directly - the client has no copy of the index itself, so this
  // has to happen server-side. An unresolvable slug (shouldn't happen, given
  // the tool's enum constraint, but never trust that alone) resolves to
  // null rather than sending a broken pointer to the client.
  //
  // Grounded to an actual citation, not just the model's own judgment: found
  // during real testing that the pointer could appear even when nothing in
  // the visible reply actually referenced that project - the model's
  // instruction to reach for a pointer "when it would add depth" is
  // inherently subjective, and this makes the display itself conditional on
  // a real, mechanical fact (was this project actually cited here), not
  // just trusting the model's judgment to be well-calibrated every time.
  const pointerEntry = audienceEstimate.case_study_pointer
    ? CASE_STUDY_INDEX.find((entry: { slug: string }) => entry.slug === audienceEstimate.case_study_pointer)
    : undefined
  const pointerUrl = pointerEntry ? `/work/${pointerEntry.slug}` : null
  const pointerIsCited = pointerUrl ? citedSources.some(s => s.url === pointerUrl) : false
  const caseStudyPointer = pointerEntry && pointerIsCited
    ? { slug: pointerEntry.slug, title: pointerEntry.title, url: pointerUrl! }
    : null

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
    is_test_request: isTestRequest,
  }

  await logConversation({
    ip,
    country: geo.country,
    region: geo.region,
    city: geo.city,
    sessionId: resolvedSessionId,
    messageIndex: resolvedMessageIndex,
    userMessage,
    assistantMessage: renumberedMessage,
    unlocked,
    timestamp: new Date().toISOString(),
    commitSha,
    audienceEstimate,
    patterns,
  })

  return NextResponse.json(
    {
      message: renumberedMessage,
      sources: citedSources,
      remaining,
      audience: audienceEstimate,
      caseStudyPointer,
    },
    { headers: { 'X-RateLimit-Remaining': String(remaining) } }
  )
}
