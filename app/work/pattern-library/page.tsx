'use client'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import CalloutCard from '@/app/components/CalloutCard'
import StatCard from '@/app/components/StatCard'
import PullQuote from '@/app/components/PullQuote'
import Link from 'next/link'

const SECTIONS = [
  'the-context',
  'the-problem',
  'the-framework',
  'the-audit',
  'the-findings',
  'the-principles',
  'the-patterns',
  'the-build',
  'the-outcomes',
  'the-reflection',
]

function FullCaseStudy() {
  return (
    <div>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Context"
          heading="Designers working on AI products don't have a shared vocabulary for their failure modes"
        />
        <Body>
          Conversational AI products have proliferated faster than the design thinking required to evaluate them. Most UI pattern libraries were built for conventional software — deterministic systems where inputs produce predictable outputs and failure states are well-understood. AI interfaces don't behave that way. They generate rather than retrieve. They fail silently. They express uncertainty inconsistently. They require correction as a routine interaction mode rather than an edge case.
        </Body>
        <Body mb={false}>
          What doesn't exist publicly is an empirically grounded pattern library that treats AI-specific interaction problems as a distinct design domain — one built from observed behavior across real products, not from first principles or speculation. This project is an attempt to build one.
        </Body>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Problem"
          heading="The interfaces don't match the outputs they're presenting"
        />
        <Body>
          When I started using AI products seriously as a designer and researcher, I noticed a consistent gap between what the models were producing and what the interfaces were communicating about those outputs. A response that was partially fabricated looked identical to one grounded in verified sources. A generation that had silently stalled looked identical to one actively streaming. A knowledge gap — something the model simply didn't have in its training data — looked identical to a principled limit, something the model couldn't and shouldn't access.
        </Body>
        <Body>
          These aren't aesthetic problems. They're trust problems. And they're solvable — if you can first define what's actually going wrong and why.
        </Body>
        <PullQuote>
          The core issue: AI output is probabilistic, but AI interfaces are designed as if it isn't. Every pattern I eventually defined traces back to this single mismatch.
        </PullQuote>
      </section>

      <section id="the-framework" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Framework"
          heading="Four properties that separate AI interfaces from everything that came before"
        />
        <Body>
          Before auditing any product, I needed to establish what made AI interfaces distinct enough to warrant their own pattern language. Four properties set them apart from conventional software.
        </Body>
        {[
          ['Inherent uncertainty', 'Every AI response carries some degree of uncertainty. Unlike a database query that returns a correct or incorrect result, model output exists on a confidence spectrum the interface rarely communicates.'],
          ['Generative output', "AI doesn't retrieve — it generates. Responses can be partially correct, confidently wrong, or accurate in ways that are impossible to verify without domain expertise. Interfaces designed around retrieved content don't account for this."],
          ['Silent failure risk', 'AI systems fail in ways that produce no visible signal. A hung generation looks like a slow one. A fabricated response looks like an accurate one. The interface has no mechanism to flag what it cannot know.'],
          ['Correction as a first-class interaction mode', 'With conventional software, correction is an edge case — an undo, a retry. With AI, iteration is the expected workflow. Most interfaces treat correction as an afterthought.'],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid var(--color-border)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.85 }}>{body}</p>
          </div>
        ))}
        <Body mb={false}>
          These four properties defined the six pattern categories: Generation States, Uncertainty Communication, Source & Attribution, Limitation Handling, Correction & Refinement, and Error States.
        </Body>
      </section>

      <section id="the-audit" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Audit"
          heading="Six products, 23 prompts, applied verbatim"
        />
        <Body>
          I audited ChatGPT, Claude, Gemini, Perplexity, Notion AI, and GitHub Copilot. The methodology was designed to produce comparable, defensible findings rather than impressionistic product reviews.
        </Body>
        <Body>
          A standard prompt set of 23 prompts was written before any product was tested and applied verbatim across all six. Prompts were designed to surface behavior in each of the six pattern categories — real-time data requests to test limitation handling, ambiguous correction signals to test refinement flows, network interruption scenarios to test error states.
        </Body>
        <Body mb={false}>
          Two data sources were treated as distinct throughout: observed product behavior and model self-assessment. Where products were asked to describe their own behavior, divergences between self-reported and observed behavior were flagged as findings rather than used interchangeably.
        </Body>
      </section>

      <section id="the-findings" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Findings"
          heading="What six products revealed about the state of AI interface design"
        />
        <Body>
          The most consistent failure in the audit wasn't a product-specific bug. It was a category-wide pattern gap.
        </Body>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '0.75rem',
          }}>
            {[
              { src: '/images/work/pattern-library/claude-spinner.gif', label: 'Claude' },
              { src: '/images/work/pattern-library/chatgpt-spinner.gif', label: 'ChatGPT' },
              { src: '/images/work/pattern-library/gemini-spinner.gif', label: 'Gemini' },
              { src: '/images/work/pattern-library/perplexity-spinner.gif', label: 'Perplexity' },
            ].map(({ src, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <img
                  src={src}
                  alt={`${label} generation indicator looping indefinitely`}
                  style={{
                    width: 160,
                    height: 160,
                    objectFit: 'contain',
                    display: 'block',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                    background: '#000',
                  }}
                />
                <span style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)',
                  fontWeight: 500,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            All four indicators loop indefinitely. None distinguish active generation from a frozen state.
          </p>
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.5rem' }}>No product differentiates between generating and frozen.</p>
          <Body>
            The hung generation state — where a spinner continues running with no visual distinction between "still working" and "stalled" — was observed across Claude, ChatGPT, Gemini, and Perplexity. Four of six products. The interface shows identical behavior whether the model is three seconds from completing or has been stuck for three minutes. This isn't a design oversight — the model itself has no awareness of its own generation state. A hung generation is typically an infrastructure failure between the API and the client, which means the interface is flying blind. GitHub Copilot is the only product in the audit that breaks from this: when generation is interrupted, it surfaces the message "Copilot was interrupted before it could finish this message." Simple, specific, honest. No other product does this.
          </Body>
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.5rem' }}>No product uses a visual confidence indicator.</p>
          <Body>
            Every product in this audit communicates uncertainty exclusively through language. Not one uses color, iconography, or structural treatment to distinguish a reliable claim from an uncertain one (distinct from model confidence in the technical sense, which refers to token prediction probability — not factual accuracy). The closest exception is Gemini's Double-Check feature — a post-response source verification tool that color-highlights claims as verified or contradicted by external sources — but that's a verification mechanism, not a confidence indicator at the point of generation. The absence of visual confidence design across the entire field is the most striking finding in the audit.
          </Body>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            {[
              { src: '/images/work/pattern-library/perplexity-citation.mp4', label: 'Perplexity' },
              { src: '/images/work/pattern-library/claude-citation.mp4', label: 'Claude' },
            ].map(({ src, label }) => (
              <div key={label} style={{ position: 'relative' }}>
                <video
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  style={{
                    width: '100%',
                    display: 'block',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border)',
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  left: '0.5rem',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)',
                  background: 'var(--color-bg)',
                  padding: '2px 6px',
                  borderRadius: '3px',
                  fontWeight: 500,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            Perplexity cites on nearly every response. Claude presents equivalent claims with no attribution. Inconsistency is a worse trust signal than silence.
          </p>
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.5rem' }}>Citation inconsistency is a worse trust signal than no citation.</p>
          <Body>
            Perplexity cites on nearly every factual response — inline footnotes, a persistent source panel, hover previews, links that resolve correctly. Claude cites on some responses and presents equivalent claims without attribution on others: health benefits of coffee got confident, uncited assertions; a startup failure rate claim appeared with no source. The problem isn't just the missing attribution — it's that users can't build a reliable mental model of when to verify. Inconsistency teaches either constant doubt or misplaced trust.
          </Body>
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.5rem' }}>No product distinguishes "I don't know" from "I can't know."</p>
          <Body mb={false}>
            When a model's training data doesn't include a recent event, and when a model is structurally prevented from knowing something — private communications, unpublished information — the interface response is identical. These are different epistemic states requiring different user responses: one invites a web search, the other doesn't. No product surfaces this distinction visually or structurally.
          </Body>
        </div>

        <CalloutCard
          variant="light"
          title="The clearest anti-pattern"
          body="Notion AI hit a usage limit at 20 responses — mid-task, without prior warning — discarded work in progress, and replaced the limitation explanation with a marketing upsell. No progressive disclosure. No graceful exit. This is what limitation handling looks like when it's treated as an edge case."
        />

        <Body mb={false}>
          The positive findings were as instructive. Claude's handling of real-time data requests — searching proactively and disclosing the search — is the correct pattern for capability limitation handling. GitHub Copilot's interrupted state notification is the correct pattern for hung states. Perplexity's source panel is the closest existing implementation of consistent citation infrastructure. The patterns already exist in fragments. The work is naming and systematizing them.
        </Body>
      </section>

      <section id="the-principles" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Principles"
          heading="Five principles that emerged from 23 prompts across six products"
        />
        <Body>
          These aren't prior convictions — they're what the data kept pointing to.
        </Body>
        {[
          ['Status should be specific, not just present', "Generic loading indicators tell users something is happening but not what. AI generation is not a download; it's a reasoning process. The interface should reflect that distinction. An indicator that escalates from \"generating\" to \"something may be wrong\" after a defined threshold is more honest than one that runs indefinitely."],
          ['Uncertainty should be visible before it\'s harmful', "Every AI response carries some degree of uncertainty. The interface's job is not to eliminate it but to make it legible — and to surface it at the beginning of a response, not buried within it. Absence of uncertainty signaling is itself a design choice. In AI interfaces, it's the wrong one."],
          ['Inconsistent citation is more damaging than no citation', "Citations exist to give users the information they need to verify claims independently. When a product sometimes cites and sometimes doesn't for equivalent claims, it creates the illusion of accountability without actually providing it. Every empirical claim should be attributed, or the interface should be honest that attribution isn't available."],
          ['Limitation handling is a first-class design problem', "A good limitation response tells the user what the system cannot do, why, and what they can do instead. Commercial limitations deserve the same honest treatment as technical ones. Users should know constraints exist before they hit them, not at the moment they're blocked."],
          ["The most dangerous error is the one users don't notice", "Silent failures erode trust in ways that explicit errors don't, because users can't respond to what they can't see. Every failure state should tell the user what happened, what they might have lost, and what they can do next. If the system doesn't know why it failed, it should say so rather than displaying the same animation it shows when it's working."],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid var(--color-border)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.85 }}>{body}</p>
          </div>
        ))}
      </section>

      <section id="the-patterns" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Patterns"
          heading="Six definitions grounded in what the audit actually found"
        />
        <Body>
          Each pattern definition answers four questions: what problem does it solve, what does it prescribe, what design decisions does it involve, and what tradeoffs exist. The definitions are the intellectual core of the library.
        </Body>
        {[
          ['Generation States', 'Four distinct states minimum: thinking, streaming, complete, and hung. Each requires a distinct visual treatment. Completion must be communicated explicitly, not inferred from UI returning to its resting state. The hung state must escalate from a generation indicator to an explicit error-adjacent state after a defined timeout, with a recovery affordance.'],
          ['Uncertainty Communication', 'Epistemic banners appear before the response body, not within it. Three distinct states: knowledge gap, principled limit, and probabilistic claims. Claim-level uncertainty uses dotted underlines with hover explanations rather than response-level confidence scores.'],
          ['Source & Attribution', 'Citation must be consistent across comparable claims, inline rather than aggregated, and accessible without requiring a click-through. The Source Inspector panel slides in on citation click. Absent citation is marked explicitly so its absence is a deliberate signal rather than an interface gap.'],
          ['Limitation Handling', 'Three limitation types require distinct handling: capability limits redirect proactively, knowledge limits trigger a web search before responding, and commercial limits disclose progressively before the threshold is hit. The ARI structure — Acknowledge, Redirect, Invite — applies across all three.'],
          ['Correction & Refinement', 'Vague corrections trigger a Clarification Interceptor rather than blind regeneration. The interceptor presents structured options including a tone dropdown and inline text selection for targeted rephrasing. All prior versions are preserved and navigable.'],
          ['Error States', "A four-error taxonomy: hung state, network failure, context length exceeded, and policy refusal. Each has distinct visual treatment, specific copy, input preservation, and a recovery path. The user's prompt is never cleared during any error type."],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid var(--color-border)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.85 }}>{body}</p>
          </div>
        ))}
        <div style={{ marginTop: '2rem' }}>
          <Link href="/patterns" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}>
            View the pattern library →
          </Link>
        </div>
      </section>

      <section id="the-build" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Build"
          heading="Pattern definitions proved in React, documented in Storybook"
        />
        <Body>
          The pattern library is implemented as a Next.js route within the portfolio repository. Each of the six patterns has three tabs: Pattern Definition (the intellectual core), Interactive Demo (proof of buildability), and All States (component reference).
        </Body>
        <Body mb={false}>
          The interactive demos are behavioral rather than visual — they demonstrate state changes, timing, and conditional logic that static Figma frames can't communicate. The Generation States demo runs a live streaming simulation with a watchdog timer that escalates to the hung state after five seconds without new tokens. The Source & Attribution demo slides the Source Inspector panel in on citation click. The Correction & Refinement demo triggers the Clarification Interceptor on vague input and supports inline text selection with a contextual toolbar.
        </Body>


      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Outcomes"
          heading="A research artifact that didn't exist before"
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          <StatCard value="6" label="Products audited" />
          <StatCard value="6" label="Pattern categories defined" />
          <StatCard value="23" label="Standardized prompts" />
          <StatCard value="Public" label="Empirically grounded pattern library" />
        </div>
        <Body>
          What this work does not claim: these patterns are not exhaustive, not validated through large-scale user research, and not final. They are a structured starting point grounded in observed behavior — which is more than currently exists publicly.
        </Body>
        <Body>
          A subset of these patterns is currently in live implementation in the portfolio chatbot at alikhandesign.com/chat. Sessions are instrumented — pattern triggers, citation events, session continuity, and rate limit hits are logged per conversation. This is ongoing; findings will inform the next revision of the pattern definitions and are available on request.
        </Body>
        <Body mb={false}>
          The audit also produced a reusable methodology: a standard prompt set designed for cross-product comparability, an audit instrument covering six pattern categories, and a synthesis framework that keeps observed behavior and model self-assessment as distinct data sources. The next phase — agentic AI patterns — presents a categorically harder design problem, and the instrument will need to be rebuilt from scratch for it.
        </Body>
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reflection"
          heading="Designing for intent, not output"
        />
        <Body>
          The hardest part was resisting the temptation to solve for interfaces I'd want to build rather than problems I'd actually observed. Several early pattern prescriptions were too prescriptive — they described ideal systems rather than the minimum viable design decisions that address the documented failure. Anchoring every prescription to a specific audit finding kept the work honest.
        </Body>
        <Body mb={false}>
          The deeper shift this work points to is one of framing. Conventional interface design operates on deterministic assumptions — a defined input produces a defined output, and the designer's job is to make that transaction as clear as possible. AI doesn't work that way. Designing for that reality means shifting from prescribing outputs to understanding intent — what is the user actually trying to accomplish — and then building interfaces transparent enough to guide them toward it, even when the system's response is uncertain, incomplete, or wrong. That is a different kind of design problem, and this pattern library is one attempt to name what it requires.
        </Body>
      </section>

    </div>
  )
}

export default function PatternLibraryPage() {
  return (
    <CaseStudyPage
      title="AI Interface Pattern Library"
      company="Self-initiated · 2025–2026"
      tags={['Case Study', 'AI Design', 'UX Research', 'Design Systems']}
      hook="For 40 years, interface design has operated on one assumption: software does what you tell it. AI doesn't. The output is probabilistic, failure is often silent, and the user's relationship with the interface is defined less by commands than by negotiation. But the products being built on top of these models are still designed as if the old assumption holds — the same loading spinners, the same error states, the same correction flows, all inherited from systems that never had to guess. I audited six of them to find out exactly where that breaks down, and built a pattern library from what I found."
      heroImage="/images/work/pattern-library/hero-audit-grid.jpg"
      heroImageAlt="Six AI product interfaces arranged in a grid, audited for AI-specific interaction patterns"
      metrics={[
        { value: '6', label: 'Products audited' },
        { value: '6', label: 'Pattern categories' },
        { value: '23', label: 'Standardized prompts' },
        { value: 'Public', label: 'Empirically grounded' },
      ]}
      details={[
        { label: 'My Role', value: 'Senior Product Designer (self-initiated)' },
        { label: 'Methods', value: 'Competitive audit, heuristic analysis, pattern definition' },
        { label: 'Tools', value: 'Next.js, React, Storybook, Figma' },
        { label: 'Status', value: 'Phase 1 complete — conversational AI patterns' },
      ]}
      sections={SECTIONS}
      cta={{ title: 'Want to talk through the research or the patterns?' }}
      next={getNextWork('pattern-library')!}
    >
      <FullCaseStudy />
    </CaseStudyPage>
  )
}

