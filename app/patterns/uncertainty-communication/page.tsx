'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import EpistemicBanner from '../../components/EpistemicBanner'
import StatusBadge from '../../components/StatusBadge'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

const NAV = {
  prev: { slug: 'generation-states', title: 'Generation States' },
  next: { slug: 'source-attribution', title: 'Source & Attribution' },
}

type ScenarioKey = 'gap' | 'limit' | 'probabilistic' | 'certain'

const SCENARIOS: Record<ScenarioKey, { bannerType: 'knowledge-gap'|'principled-limit'|'probabilistic'|null, bannerMsg: string, actionLabel?: string, response: string, hedgeRanges?: [number,number][] }> = {
  gap: {
    bannerType: 'knowledge-gap',
    bannerMsg: 'This information falls outside my training data.',
    actionLabel: 'Run web search',
    response: "As of my training data, the quarterly revenue figures for that company have not been confirmed. The most recent public filing I have access to showed approximately $4.2B in Q1 revenue, but this may be outdated. I'd recommend checking their latest SEC filing or investor relations page for current figures.",
    hedgeRanges: [[93, 133], [134, 159]],
  },
  limit: {
    bannerType: 'principled-limit',
    bannerMsg: 'I am structurally restricted from accessing private personal data.',
    response: "I don't have access to private individual data, personal records, or information that isn't publicly available. This isn't a knowledge gap — I'm structurally restricted from processing or retrieving private personal information regardless of how the request is framed.",
  },
  probabilistic: {
    bannerType: 'probabilistic',
    bannerMsg: 'This response contains claims that may vary — verify before acting.',
    response: "The general consensus among economists is that interest rate increases tend to slow inflation over a 12–18 month period, though the exact timeline varies significantly depending on the broader economic conditions at the time. Some studies suggest the lag can be as short as 6 months or as long as 24 months.",
    hedgeRanges: [[92, 141]],
  },
  certain: {
    bannerType: null,
    bannerMsg: '',
    response: "The Eiffel Tower is located in Paris, France. It was designed by Gustave Eiffel and constructed between 1887 and 1889 as the entrance arch for the 1889 World's Fair. It stands 330 metres tall and was the tallest man-made structure in the world for 41 years.",
  },
}

export default function UncertaintyPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [scenario, setScenario] = useState<ScenarioKey>('gap')
  const s = SCENARIOS[scenario]

  const renderResponse = (text: string, hedgeRanges?: [number,number][]) => {
    if (!hedgeRanges) return <span>{text}</span>
    const parts: React.ReactNode[] = []
    let last = 0
    hedgeRanges.forEach(([start, end], i) => {
      parts.push(<span key={`t${i}`}>{text.slice(last, start)}</span>)
      parts.push(
        <span key={`h${i}`} title="Uncertain claim" style={{ borderBottom: '2px dashed #F59E0B', cursor: 'help' }}>
          {text.slice(start, end)}
        </span>
      )
      last = end
    })
    parts.push(<span key="tail">{text.slice(last)}</span>)
    return <>{parts}</>
  }

  return (
    <PatternShell
      title="Uncertainty Communication"
      patternName="Uncertainty Communication"
      problem="No product differentiates a knowledge gap from a principled limit. Hedging language appears mid-response rather than before uncertain claims, meaning users who skim miss the caveat entirely."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
      nav={NAV}
    >
      {activeTab === 'definition' && <Definition />}

      {activeTab === 'demo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            {([
              { key: 'gap', label: 'Knowledge gap' },
              { key: 'limit', label: 'Principled limit' },
              { key: 'probabilistic', label: 'Probabilistic claims' },
              { key: 'certain', label: 'Certain response' },
            ] as { key: ScenarioKey; label: string }[]).map(({ key, label }) => (
              <button key={key} onClick={() => setScenario(key)} style={btn(scenario === key ? 'var(--accent)' : 'var(--text-muted)', scenario === key ? 'var(--accent-bg)' : 'var(--warm-75)', scenario === key ? '#FECACA' : 'var(--border)')}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
            {s.bannerType && (
              <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)' }}>
                <EpistemicBanner type={s.bannerType} message={s.bannerMsg} actionLabel={s.actionLabel} onAction={() => {}} />
              </div>
            )}
            <div style={{ padding: 'var(--space-6)' }}>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
                {renderResponse(s.response, s.hedgeRanges)}
              </p>
              {s.hedgeRanges && (
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginTop: 'var(--space-4)' }}>
                  Dashed amber underline indicates a claim with uncertainty. Hover to see the signal.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'states' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {([
            { type: 'knowledge-gap' as const, label: 'Knowledge gap', desc: 'Information falls outside training data. A web search may fill the gap.', actionLabel: 'Run web search' },
            { type: 'principled-limit' as const, label: 'Principled limit', desc: 'The model is structurally restricted from accessing this type of information. Not a data gap — a deliberate constraint.', actionLabel: 'View guardrails' },
            { type: 'probabilistic' as const, label: 'Probabilistic claims', desc: 'Response contains assertions that may vary. Dashed underlines on specific claims; verify before acting.' },
          ]).map(item => (
            <div key={item.type} style={{ display:'flex',flexDirection:'column',gap:'var(--space-3)',padding:'var(--space-4)',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--surface)' }}>
              <EpistemicBanner type={item.type} message={item.desc} actionLabel={item.actionLabel} onAction={() => {}} />
              <p style={{ fontSize:'var(--text-xs)',color:'var(--text-faint)',paddingLeft:'var(--space-1)' }}>{item.label}</p>
            </div>
          ))}
          <div style={{ padding:'var(--space-4)',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--surface)' }}>
            <p style={{ fontSize:'var(--text-sm)',color:'var(--text-muted)',marginBottom:'var(--space-2)' }}>No banner — certain response</p>
            <p style={{ fontSize:'var(--text-xs)',color:'var(--text-faint)' }}>When a response contains no uncertain claims, no epistemic banner appears. The banner is conditional, not universal — avoids alert fatigue.</p>
          </div>
        </div>
      )}
    </PatternShell>
  )
}

function Definition() {
  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { label: 'Problem', text: 'Every AI response carries some degree of uncertainty, but interfaces communicate it only through language — and only inconsistently. No product in the audit differentiates between a knowledge gap (training cutoff, missing data) and a principled limit (private information, real-time data the model structurally cannot access). These are different problems requiring different user responses.' },
        { label: 'Prescription', text: 'Uncertainty signals must appear before the uncertain claim, not embedded within it. The interface must distinguish at minimum two epistemic states: knowledge gap and principled limit. Where claims within a response carry uncertainty, inline marking at the claim level is more precise than a response-level hedge.' },
        { label: 'Design decisions', text: 'Placement of hedging language: leading with uncertainty reduces risk of users acting on unhedged claims, but may train users to dismiss hedges as boilerplate. Differentiation method: language-only is simplest; distinct visual treatments (color, iconography) are more scannable. Whether to surface a verification mechanism depends on whether the product has source retrieval infrastructure.' },
        { label: 'Tradeoffs', text: 'Leading with uncertainty front-loads friction for responses that turn out to be accurate. Visual confidence indicators imply the model has reliable self-knowledge about its accuracy, which is not guaranteed — a wrong indicator is more damaging than no indicator. Post-response verification tools add cognitive load and are experienced as friction-heavy by users who want a direct answer.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function btn(color: string, bg: string, border: string): CSSProperties {
  return { padding:'var(--space-2) var(--space-4)',fontSize:'var(--text-sm)',fontWeight:'var(--font-weight-medium)',color,background:bg,border:`1px solid ${border}`,borderRadius:'var(--radius)',cursor:'pointer',fontFamily:'var(--font-sans)',transition:'opacity var(--transition-base)' }
}
