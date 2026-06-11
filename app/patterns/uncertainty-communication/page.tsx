'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import PatternAnnotation from '../../components/PatternAnnotation'
import EpistemicBanner from '../../components/EpistemicBanner'
import Button from '../../components/Button'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo',       label: 'Interactive demo' },
  { id: 'states',     label: 'All states' },
]

type Scenario = 'none' | 'knowledge-gap' | 'principled-limit' | 'probabilistic'

const ANNOTATION = 'Five of six products communicate uncertainty exclusively through language — no visual differentiation between high-confidence and uncertain claims. Hedging language was observed mid-response in both Claude and ChatGPT, meaning users who skim encounter confident assertions without their caveats. No product in the audit distinguishes between a knowledge gap and a principled limit — they look identical in every interface.'

interface ScenarioCfg {
  banner: 'knowledge-gap' | 'principled-limit' | 'probabilistic' | null
  response: string
  probabilisticClaims: Array<{ text: string; reason: string }> | null
  label: string
}

const SCENARIOS: Record<Scenario, ScenarioCfg> = {
  none: {
    banner: null,
    response: 'The Eiffel Tower was completed in 1889 and stands 330 meters tall. It was designed by Gustave Eiffel for the 1889 World\'s Fair in Paris.',
    probabilisticClaims: null,
    label: 'High confidence',
  },
  'knowledge-gap': {
    banner: 'knowledge-gap',
    response: 'I searched the web for current information. Based on recent results, the company\'s last reported valuation was approximately $4.2B as of Q1 2026. This figure reflects publicly available filings — check live financial sources for intraday changes.',
    probabilisticClaims: null,
    label: 'Knowledge gap',
  },
  'principled-limit': {
    banner: 'principled-limit',
    response: 'I don\'t have access to private personal data, medical records, or non-public information. I can\'t retrieve details about a specific individual\'s personal history — this isn\'t a knowledge gap, it\'s a structural boundary.',
    probabilisticClaims: null,
    label: 'Principled limit',
  },
  probabilistic: {
    banner: 'probabilistic',
    response: 'The mechanism is likely related to mitochondrial function, though research in this area is ongoing and some findings remain contested. The current scientific consensus leans toward the oxidative stress hypothesis, but alternative models exist and the field has not reached agreement.',
    probabilisticClaims: [
      { text: 'likely related to mitochondrial function', reason: 'Ongoing research area — multiple competing mechanisms proposed as of 2024.' },
      { text: 'leans toward the oxidative stress hypothesis', reason: 'Current majority position but contested — several 2023–2024 papers support alternative models.' },
      { text: 'the field has not reached agreement', reason: 'Synthesized from review literature — not a single authoritative source.' },
    ],
    label: 'Probabilistic claims',
  },
}

export default function UncertaintyPage() {
  const [activeTab, setActiveTab]     = useState('definition')
  const [scenario, setScenario]       = useState<Scenario>('none')
  const [hoveredClaim, setHoveredClaim] = useState<number | null>(null)
  const s = SCENARIOS[scenario]

  const renderResponse = () => {
    if (!s.probabilisticClaims) {
      return <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', lineHeight: 'var(--line-height-loose)' }}>{s.response}</p>
    }
    let remaining = s.response
    const parts: Array<{ text: string; claimIdx: number | null }> = []
    s.probabilisticClaims.forEach((claim, idx) => {
      const pos = remaining.indexOf(claim.text)
      if (pos === -1) return
      if (pos > 0) parts.push({ text: remaining.slice(0, pos), claimIdx: null })
      parts.push({ text: claim.text, claimIdx: idx })
      remaining = remaining.slice(pos + claim.text.length)
    })
    if (remaining) parts.push({ text: remaining, claimIdx: null })

    return (
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', lineHeight: 'var(--line-height-loose)', position: 'relative' }}>
        {parts.map((part, i) =>
          part.claimIdx !== null ? (
            <span key={i} onMouseEnter={() => setHoveredClaim(part.claimIdx)} onMouseLeave={() => setHoveredClaim(null)}
              style={{ borderBottom: '2px dotted #D97706', paddingBottom: 1, cursor: 'help', position: 'relative' }}>
              {part.text}
              {hoveredClaim === part.claimIdx && (
                <span style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8, background: 'var(--color-bg-dark)', color: 'var(--color-bg)', fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-normal)', padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-sm)', whiteSpace: 'normal', maxWidth: 280, zIndex: 10, pointerEvents: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                  {s.probabilisticClaims![part.claimIdx].reason}
                </span>
              )}
            </span>
          ) : <span key={i}>{part.text}</span>
        )}
      </p>
    )
  }

  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PatternAnnotation finding={ANNOTATION} />
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        {(['none', 'knowledge-gap', 'principled-limit', 'probabilistic'] as Scenario[]).map(sc => (
          <button key={sc} onClick={() => setScenario(sc)} style={{
            padding: 'var(--space-2) var(--space-4)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: scenario === sc ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
            color: scenario === sc ? 'var(--color-accent)' : 'var(--color-text-muted)',
            background: scenario === sc ? 'var(--color-accent-bg)' : 'var(--color-surface-subtle)',
            border: `1px solid ${scenario === sc ? 'var(--color-accent)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            transition: 'all var(--transition-base)',
          }}>
            {SCENARIOS[sc].label}
          </button>
        ))}
      </div>
      <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)', overflow: 'hidden' }}>
        {s.banner && (
          <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
            <EpistemicBanner
              type={s.banner}
              message={s.banner === 'knowledge-gap' ? 'I searched the web for current information.' : s.banner === 'principled-limit' ? 'I am structurally restricted from accessing this information.' : 'This response contains claims with meaningful uncertainty — hover underlined text for detail.'}
              actionLabel={s.banner === 'principled-limit' ? 'View why' : undefined}
              onAction={s.banner === 'principled-limit' ? () => {} : undefined}
            />
          </div>
        )}
        <div style={{ padding: 'var(--space-6)' }}>{renderResponse()}</div>
      </div>
    </div>
  )

  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {([
        { type: 'knowledge-gap' as const, label: 'Knowledge gap', desc: 'Training data is stale or missing. Model proactively searches and discloses it did so.', actionLabel: undefined },
        { type: 'principled-limit' as const, label: 'Principled limit', desc: 'The model cannot and should not access this information. Ethical boundary, not a knowledge gap.', actionLabel: 'View why' },
        { type: 'probabilistic' as const, label: 'Probabilistic claims', desc: 'Response contains assertions with meaningful uncertainty. Dotted underlines mark specific claims — hover for reason.' },
      ]).map(item => (
        <div key={item.type} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)' }}>
          <EpistemicBanner type={item.type} message={item.desc} actionLabel={item.actionLabel} onAction={item.actionLabel ? () => {} : undefined} />
        </div>
      ))}
    </div>
  )

  const definition = <Definition />

  return (
    <PatternShell title="Uncertainty Communication" slug="uncertainty-communication"
      problem="No product differentiates a knowledge gap from a principled limit. Hedging language appears mid-response where users who skim miss it entirely."
      activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS}
      mobileContent={{ definition, demo, states }}>
      {activeTab === 'definition' && definition}
      {activeTab === 'demo' && demo}
      {activeTab === 'states' && states}
    </PatternShell>
  )
}

function Definition() {
  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { label: 'Problem', text: "Every AI response carries uncertainty. Five of six products communicate it exclusively through language — no visual differentiation. Hedging language is often placed mid-response, meaning users who skim encounter confident claims without their caveats. No product distinguishes between 'I don't know' and 'I can't know.'" },
        { label: 'Prescription', text: 'Epistemic banners appear before the response body, not within it. Three distinct states: knowledge gap (amber — model searched proactively), principled limit (red — structural boundary), probabilistic (blue — claim-level uncertainty via dotted underlines with hover explanations).' },
        { label: 'Design decisions', text: 'Banner threshold determines when uncertainty is surfaced — not every response warrants one. Proactive web search on knowledge gaps matches observed behavior in Claude and Perplexity. Claim-level underlines require the model to surface confidence at the assertion level.' },
        { label: 'Tradeoffs', text: 'Prominent epistemic banners on every uncertain response risk alert fatigue. Visual confidence indicators imply model self-knowledge that may not be reliable — underlines are more honest than scores. Hover tooltips add interaction cost for users who want a direct answer.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}
