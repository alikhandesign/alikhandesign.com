'use client'
import Link from 'next/link'
import SideNav from '@/app/components/SideNav'
import CTAStrip from '@/app/components/CTAStrip'
import ContactModal from '@/app/components/ContactModal'
import { useState } from 'react'

const SECTIONS = [
  'the-context',
  'the-problem',
  'the-framework',
  'the-audit',
  'the-findings',
  'the-patterns',
  'the-build',
  'the-outcomes',
  'the-reflection',
]

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Context</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>AI interfaces are being designed without a shared language for their failure modes</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Conversational AI products have proliferated faster than the design thinking required to evaluate them. Most UI pattern libraries were built for conventional software — deterministic systems where inputs produce predictable outputs and failure states are well-understood. AI interfaces don't behave that way. They generate rather than retrieve. They fail silently. They express uncertainty inconsistently. They require correction as a routine interaction mode rather than an edge case.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>Designers working on these products are largely working without shared infrastructure. There is no publicly available, empirically grounded pattern library that treats AI-specific interaction problems as a distinct design domain. This project is an attempt to build one.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', margin: '2rem 0', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          {[
            ['My Role', 'Senior Product Designer (self-initiated)'],
            ['Output', 'Competitive audit, pattern definitions, React implementation, design system components'],
            ['Timeline', '2025–2026'],
            ['Status', 'Phase 1 complete — conversational AI patterns'],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>{label}</p>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Problem</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>The interfaces don't match the outputs they're presenting</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>When I started using AI products seriously as a designer and researcher, I noticed a consistent gap between what the models were producing and what the interfaces were communicating about those outputs. A response that was partially fabricated looked identical to one grounded in verified sources. A generation that had silently stalled looked identical to one actively streaming. A knowledge gap — something the model simply didn't have in its training data — looked identical to a principled limit, something the model couldn't and shouldn't access.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>These aren't aesthetic problems. They're trust problems. And they're solvable design problems — if you can first define what's actually going wrong and why.</p>
        <div style={{ borderLeft: '3px solid var(--accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--surface)', borderRadius: '0 4px 4px 0' }}>
          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.5, fontStyle: 'italic' }}>The core issue: AI output is probabilistic, but AI interfaces are designed as if it isn't. Every pattern I eventually defined traces back to this single mismatch.</p>
        </div>
      </section>

      <section id="the-framework" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Framework</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Four properties that make AI interfaces categorically different</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Before auditing any product, I needed to establish what made AI interfaces distinct enough to warrant their own pattern language. I identified four properties that separate them from conventional software interfaces.</p>
        {[
          ['Inherent uncertainty', 'Every AI response carries some degree of uncertainty. Unlike a database query that returns a correct or incorrect result, model output exists on a confidence spectrum the interface rarely communicates.'],
          ['Generative output', "AI doesn't retrieve — it generates. Responses can be partially correct, confidently wrong, or accurate in ways that are impossible to verify without domain expertise. Interfaces designed around retrieved content don't account for this."],
          ['Silent failure risk', 'AI systems fail in ways that produce no visible signal. A hung generation looks like a slow one. A fabricated response looks like an accurate one. The interface has no mechanism to flag what it cannot know.'],
          ['Correction as a first-class interaction mode', 'With conventional software, correction is an edge case — an undo, a retry. With AI, iteration is the expected workflow. Most interfaces treat correction as an afterthought.'],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid var(--border)' }}>
            <p style={{ fontSize: 15, color: 'var(--text)', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
            <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>{body}</p>
          </div>
        ))}
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>These four properties defined the six pattern categories: Generation States, Uncertainty Communication, Source & Attribution, Limitation Handling, Correction & Refinement, and Error States.</p>
      </section>

      <section id="the-audit" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Audit</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Observed behavior across six products, using a standardized prompt set</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>I audited six products: ChatGPT, Claude, Gemini, Perplexity, Notion AI, and GitHub Copilot. The methodology was designed to produce comparable, defensible findings rather than impressionistic product reviews.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>A standard prompt set of 23 prompts was written before any product was tested and applied verbatim across all six. Prompts were designed to surface behavior in each of the six pattern categories — real-time data requests to test limitation handling, ambiguous correction signals to test refinement flows, network interruption scenarios to test error states.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Two data sources were treated as distinct throughout: observed product behavior and model self-assessment. Where products were asked to assess their own behavior, divergences between self-reported and observed behavior were flagged as key findings rather than used interchangeably.</p>
        <div style={{ borderLeft: '3px solid var(--accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--surface)', borderRadius: '0 4px 4px 0' }}>
          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.5, fontStyle: 'italic' }}>One finding was corrected mid-audit: Claude's response to a real-time stock price request was initially characterized as a hallucination. On review, Claude had used web search and disclosed it — the correct behavior. The error traced to a gap in the audit instrument: no field existed for web search disclosure. The finding was corrected and the instrument updated. This kind of self-correction is what a rigorous methodology requires.</p>
        </div>
      </section>

      <section id="the-findings" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Findings</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>What six products revealed about the current state of AI interface design</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.5rem' }}>Several findings were consistent enough across products to constitute documented gaps rather than individual product failures.</p>
        {[
          ['The hung state problem is the most widespread', 'No product in the audit differentiates between active generation and a stalled one. The streaming indicator runs identically whether the model is generating or frozen. Users have no signal to distinguish between the two and no prompt to intervene.'],
          ['Inconsistent citation compounds trust problems', 'Perplexity cites on nearly every response with inline footnotes, a persistent source panel, and hover previews. ChatGPT and Claude cite inconsistently — sometimes attributing, sometimes not, for claims of equivalent credibility. Inconsistent citation is a worse trust signal than no citation: users cannot build a reliable mental model of when to verify.'],
          ['No product differentiates epistemic states', "When a model lacks information because its training data doesn't include it, and when a model lacks information because it structurally cannot access it, the interface response is identical. These are different situations requiring different user responses."],
          ['The clearest anti-pattern: Notion AI', 'Notion AI surfaced a hard usage limit mid-task without prior warning, discarding work in progress and replacing the limitation explanation with marketing copy. No product in the audit offered a proactive redirect before a limitation was hit.'],
          ['The positive findings were as informative', "Claude's handling of real-time data requests — searching proactively and disclosing the search — is the correct pattern for knowledge limitation handling. GitHub Copilot is the only product that explicitly marks an interrupted response as incomplete. Perplexity's source panel is the closest existing implementation of consistent citation infrastructure."],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: '1.75rem' }}>
            <p style={{ fontSize: 15, color: 'var(--text)', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</p>
            <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>{body}</p>
          </div>
        ))}
      </section>

      <section id="the-patterns" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Patterns</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Six definitions grounded in what the audit actually found</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.5rem' }}>Each pattern definition answers four questions: what problem does it solve, what does it prescribe, what design decisions does it involve, and what tradeoffs exist. The definitions are the intellectual core of the library — the part that demonstrates design thinking rather than visual execution.</p>
        {[
          ['Generation States', 'Four distinct states minimum: thinking, streaming, complete, and hung. Each requires a distinct visual treatment. Completion must be communicated explicitly, not inferred. The hung state must escalate from a generation indicator to an explicit error-adjacent state after a defined timeout, with a recovery affordance.'],
          ['Uncertainty Communication', 'Epistemic banners appear before the response body, not within it. Three distinct states: knowledge gap, principled limit, and probabilistic claims. Claim-level uncertainty uses dotted underlines with hover explanations rather than response-level confidence scores.'],
          ['Source & Attribution', 'Citation must be consistent across comparable claims, inline rather than aggregated, and accessible without requiring a click-through. The Source Inspector panel slides in on citation click. Absent citation is marked explicitly so its absence is a deliberate signal rather than an interface gap.'],
          ['Limitation Handling', 'Three limitation types require distinct handling: capability limits redirect proactively, knowledge limits trigger a web search before responding, and commercial limits disclose progressively before the threshold is hit. The ARI structure — Acknowledge, Redirect, Invite — applies across all three.'],
          ['Correction & Refinement', 'Vague corrections trigger a Clarification Interceptor rather than blind regeneration. The interceptor presents structured options including a tone dropdown and inline text selection for targeted rephrasing. All prior versions are preserved and navigable.'],
          ['Error States', 'A four-error taxonomy: hung state, network failure, context length exceeded, and policy refusal. Each has distinct visual treatment, specific copy, input preservation, and a recovery path. The user\'s prompt is never cleared during any error type.'],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid var(--border)' }}>
            <p style={{ fontSize: 15, color: 'var(--text)', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
            <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>{body}</p>
          </div>
        ))}
        <div style={{ marginTop: '2rem' }}>
          <Link href="/patterns" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>
            View the pattern library →
          </Link>
        </div>
      </section>

      <section id="the-build" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Build</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Pattern definitions proved in React, documented in Storybook</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The pattern library is implemented as a Next.js route within the Honest Design System repository. Each pattern has three tabs: Pattern Definition (the intellectual core), Interactive Demo (proof of buildability), and All States (component reference).</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The interactive demos are behavioral rather than visual — they demonstrate state changes, timing, and conditional logic that static Figma frames cannot communicate. The Generation States demo runs a live streaming simulation with a watchdog timer that escalates to the hung state after five seconds without new tokens. The Source & Attribution demo slides the Source Inspector panel in on citation click. The Correction & Refinement demo triggers the Clarification Interceptor on vague input and supports inline text selection with a contextual toolbar.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>Three net-new components were added to the Honest Design System as direct outputs of this work: TabNavigation (top and side variants), PatternAnnotation (an audit finding callout used consistently across all six demo tabs), and a secondary variant for the existing Button component. All three are documented in Storybook.</p>
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Outcomes</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>A research artifact that didn't exist before</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['6', 'Pattern categories with formal definitions'],
            ['6', 'Products audited'],
            ['3', 'Net-new design system components'],
            ['Empirically grounded pattern library', 'First of its kind'],
          ].map(([val, label]) => (
            <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
              <div className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.35rem' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1rem' }}>What this work does not claim: these patterns are not exhaustive, not validated through user research, and not final. They are a structured starting point grounded in observed behavior — which is more than currently exists publicly.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>The audit also produced a documented methodology and standard prompt set reusable for future audits — including the next phase, agentic AI patterns, which present a categorically harder design problem.</p>
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <p className="section-label">The Reflection</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Designing for intent, not output</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The hardest part was resisting the temptation to solve for interfaces I'd want to build rather than problems I'd actually observed. Several early pattern prescriptions were too prescriptive — they described ideal systems rather than the minimum viable design decisions that address the documented failure. Anchoring every prescription to a specific audit finding kept the work honest.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The audit instrument gap — no field for web search disclosure — produced one incorrect finding before it was caught and corrected. Methodology gaps produce findings gaps. The correction is documented, but the better answer is building the instrument carefully enough that the correction isn't necessary.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>The deeper shift this work points to is one of framing. Conventional interface design operates on deterministic assumptions — a defined input produces a defined output, and the designer's job is to make that transaction as clear as possible. AI doesn't work that way. Designing for that reality means shifting from prescribing outputs to understanding intent — what is the user actually trying to accomplish — and then building interfaces transparent enough to guide them toward it, even when the system's response is uncertain, incomplete, or wrong. That is a different kind of design problem, and this pattern library is one attempt to name what it requires.</p>
      </section>

    </div>
  )
}

export default function PatternLibraryPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
        AI Interface Pattern Library
      </h1>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <nav style={{ padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/work" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none' }}>My Work</Link>
          <span style={{ fontSize: 14, color: '#C4BDB7' }}>›</span>
          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>AI Interface Pattern Library</span>
        </nav>

        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            <span className="tag-cs">Case Study</span>
            <span className="tag">AI Design</span>
            <span className="tag">UX Research</span>
            <span className="tag">Design Systems</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>AI Interface Pattern Library</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Self-initiated · 2025–2026</p>
          <p style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.7, maxWidth: 680 }}>For 40 years, interface design has operated on one assumption: software does what you tell it. AI doesn't. The output is probabilistic, failure is often silent, and the user's relationship with the interface is defined less by commands than by negotiation. But the products being built on top of these models are still designed as if the old assumption holds — the same loading spinners, the same error states, the same correction flows, all inherited from systems that never had to guess. I audited six of them to find out exactly where that breaks down, and built a pattern library from what I found.</p>
        </header>
      </div>

      {/* Hero placeholder */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <div style={{ width: '100%', height: 400, background: 'var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
          Hero Image
        </div>
      </div>

      {/* Metrics strip */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)' }}>
        {[
          ['6', 'Products audited'],
          ['6', 'Pattern categories defined'],
          ['3', 'Design system components'],
          ['Empirically grounded pattern library', 'First of its kind'],
        ].map(([val, label]) => (
          <div key={label}>
            <div className="font-serif" style={{ fontSize: '2.25rem', color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Article layout */}
      <div className="article-layout" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 3rem' }}>
        <SideNav unlocked={true} sections={SECTIONS} />
        <FullCaseStudy />
      </div>

      <CTAStrip
        title="Want to talk through the research or the patterns?"
        onContact={() => setModalOpen(true)}
      />

      <div className="divider" />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '2.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '1rem' }}>
        <div>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>Next Case Study</p>
          <p className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 400 }}>AI Feedback & Insights Agent</p>
        </div>
        <Link href="/work/ai-agent" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>View project →</Link>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
