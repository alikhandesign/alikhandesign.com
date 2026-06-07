'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import InlineAlert from '../../components/InlineAlert'
import StatusBadge from '../../components/StatusBadge'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

const NAV = {
  prev: { slug: 'source-attribution', title: 'Source & Attribution' },
  next: { slug: 'correction-refinement', title: 'Correction & Refinement' },
}

type LimitType = 'capability' | 'knowledge' | 'commercial'

const SCENARIOS: Record<LimitType, { badge: string; badgeState: 'warning'|'info'|'error'; title: string; acknowledge: string; redirect: string; invite: string; cta: string; ctaSecondary?: string }> = {
  capability: {
    badge: 'Capability limit',
    badgeState: 'warning',
    title: 'I cannot book flights directly.',
    acknowledge: 'I cannot access transactional booking systems or make purchases on your behalf.',
    redirect: 'I can draft your full travel itinerary — dates, times, and preferences — ready to paste into Google Flights or Kayak.',
    invite: 'Want me to draft the itinerary now?',
    cta: 'Draft itinerary',
    ctaSecondary: 'Open Google Flights',
  },
  knowledge: {
    badge: 'Knowledge limit',
    badgeState: 'info',
    title: 'I don't have current pricing data.',
    acknowledge: 'This falls outside my training data — real-time stock prices are not available to me directly.',
    redirect: 'I can run a web search to pull the latest publicly available price data.',
    invite: 'Should I search now?',
    cta: 'Run web search',
  },
  commercial: {
    badge: 'Usage limit',
    badgeState: 'error',
    title: 'You've reached your hourly limit for advanced analysis.',
    acknowledge: 'You have used your allocation of high-power queries for this hour.',
    redirect: 'I can continue processing this using the standard model, which handles most tasks without noticeable difference.',
    invite: 'Continue with standard model, or view upgrade options.',
    cta: 'Use standard model',
    ctaSecondary: 'View plans',
  },
}

export default function LimitationHandlingPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [limitType, setLimitType] = useState<LimitType>('capability')
  const [usageRemaining, setUsageRemaining] = useState(8)
  const s = SCENARIOS[limitType]

  return (
    <PatternShell
      title="Limitation Handling"
      patternName="Limitation Handling"
      problem="Commercial limits appear without warning at the moment of highest user intent. Capability limits produce hard stops rather than redirects. Both treat system boundaries as dead ends rather than structured pivot points."
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
              { key: 'capability', label: 'Capability limit' },
              { key: 'knowledge', label: 'Knowledge limit' },
              { key: 'commercial', label: 'Commercial limit' },
            ] as { key: LimitType; label: string }[]).map(({ key, label }) => (
              <button key={key} onClick={() => setLimitType(key)} style={btn(limitType === key ? 'var(--accent)' : 'var(--text-muted)', limitType === key ? 'var(--accent-bg)' : 'var(--warm-75)', limitType === key ? '#FECACA' : 'var(--border)')}>
                {label}
              </button>
            ))}
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
            {/* Usage bar — always visible, only prominent near limit */}
            {usageRemaining <= 5 && (
              <div style={{ padding: 'var(--space-2) var(--space-4)', background: '#FFFBEB', borderBottom: '1px solid #FDE68A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: '#B45309' }}>⚡ {usageRemaining} premium queries remaining this hour</span>
                <button onClick={() => setUsageRemaining(20)} style={{ fontSize: 'var(--text-xs)', color: '#B45309', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', textDecoration: 'underline' }}>Reset demo</button>
              </div>
            )}
            {usageRemaining > 5 && (
              <div style={{ padding: 'var(--space-2) var(--space-4)', background: 'var(--warm-75)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>Workspace · Pro</span>
                <button onClick={() => setUsageRemaining(4)} style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>Simulate low usage →</button>
              </div>
            )}

            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <StatusBadge state={s.badgeState} label={s.badge} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <p style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text)' }}>{s.title}</p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>{s.acknowledge}</p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>{s.redirect}</p>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-normal)', fontStyle: 'italic' }}>{s.invite}</p>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', paddingTop: 'var(--space-2)' }}>
                <button style={{ ...btn('var(--bg)', 'var(--accent)', 'var(--accent-dark)'), color: 'var(--bg)' }}>{s.cta}</button>
                {s.ctaSecondary && <button style={btn('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>{s.ctaSecondary}</button>}
              </div>
            </div>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
            The ARI framework: Acknowledge the limit directly, Redirect to what the system can do, Invite the user to take a next step. No dead ends.
          </p>
        </div>
      )}

      {activeTab === 'states' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {[
            { label: 'Capability limit', state: 'warning' as const, desc: 'System cannot perform the action. Redirect to an adjacent task the system can do.' },
            { label: 'Knowledge limit — gap', state: 'info' as const, desc: '"I don't know" — training cutoff or missing data. Offer web search as the redirect.' },
            { label: 'Knowledge limit — principled', state: 'info' as const, desc: '"I can't know" — private data, real-time systems. Explain the constraint; no redirect exists.' },
            { label: 'Commercial limit', state: 'error' as const, desc: 'Usage threshold reached. Disclosed progressively before the limit, not at the moment it is hit.' },
          ].map(item => (
            <div key={item.label} style={{ display:'flex',alignItems:'flex-start',gap:'var(--space-6)',padding:'var(--space-4)',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--surface)' }}>
              <div style={{ paddingTop: 2, minWidth: 140 }}><StatusBadge state={item.state} label={item.label} /></div>
              <p style={{ fontSize:'var(--text-sm)',color:'var(--text-muted)',lineHeight:'var(--line-height-normal)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </PatternShell>
  )
}

function Definition() {
  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { label: 'Problem', text: 'When an AI cannot or will not do something, the interface must treat that as a first-class design problem. The audit documented two failure types: graceless refusals (hard stops that explain nothing) and undisclosed commercial limits (paywalls that appear at the moment of highest user intent, discarding in-progress work). Notion AI's mid-task paywall is the clearest anti-pattern in the entire audit.' },
        { label: 'Prescription', text: 'Three limitation types require distinct handling: capability limits (redirect to what the system can do), knowledge limits (distinguish "I don't know" from "I can't know"), and commercial limits (disclose progressively before the limit is hit, never at the moment it is breached). The ARI framework — Acknowledge, Redirect, Invite — structures every limitation response as a pivot point rather than a dead end.' },
        { label: 'Design decisions', text: 'How early to surface commercial limits: the audit recommends visibility at 25% remaining capacity. Redirect specificity: only suggest alternatives the system can actually verify — a hardcoded registry of trusted external routes is safer than inventing links from parametric memory. Distinguishing knowledge limit types requires precise language and potentially distinct visual treatments.' },
        { label: 'Tradeoffs', text: 'Specific redirects require knowledge of alternatives the system may not reliably have — a redirect to an outdated resource is worse than acknowledging the limit cleanly. Progressive commercial disclosure may increase friction for users reminded of usage constraints before experiencing them. Distinguishing limitation types adds cognitive load to refusal responses that users may prefer to be brief.' },
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
