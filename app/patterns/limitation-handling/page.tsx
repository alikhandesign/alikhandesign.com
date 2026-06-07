'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import InlineAlert from '../../components/InlineAlert'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

type LimitType = 'capability' | 'knowledge' | 'commercial'

const SCENARIOS: Record<LimitType, { badge: string; badgeColor: string; badgeBg: string; badgeBorder: string; ack: string; redirect: string; invite: string; cta: string }> = {
  capability: {
    badge: 'Capability limit', badgeColor: 'var(--text-muted)', badgeBg: 'var(--warm-75)', badgeBorder: 'var(--border)',
    ack: "I can't directly book flights or access transactional booking engines.",
    redirect: "I can draft your precise travel itinerary and compare flight schedules for your dates.",
    invite: "Would you like me to generate the itinerary details so you can copy them into Google Flights or Kayak?",
    cta: "Draft itinerary →",
  },
  knowledge: {
    badge: 'Knowledge limit', badgeColor: '#1D4ED8', badgeBg: '#EFF6FF', badgeBorder: '#BFDBFE',
    ack: "I don't have access to real-time stock pricing.",
    redirect: "I can use web search to pull the latest publicly available quotes for that ticker.",
    invite: "Should I run a live search now?",
    cta: "Run web search →",
  },
  commercial: {
    badge: 'Usage limit', badgeColor: '#7C3AED', badgeBg: '#F5F3FF', badgeBorder: '#DDD6FE',
    ack: "You've reached your hourly limit for advanced analysis.",
    redirect: "I can continue processing this prompt using the standard model — slightly slower, same accuracy for most tasks.",
    invite: "Would you like to switch models or view upgrade options?",
    cta: "Use standard model →",
  },
}

export default function LimitationHandlingPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [limit, setLimit] = useState<LimitType>('capability')
  const [usageRemaining, setUsageRemaining] = useState(8)
  const s = SCENARIOS[limit]

  const definition = <Definition />
  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Progressive disclosure bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--warm-75)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Workspace</span>
        {usageRemaining <= 5 && (
          <span style={{ fontSize: 'var(--text-xs)', color: '#7C3AED', fontWeight: 'var(--font-weight-medium)' }}>
            ⚡ {usageRemaining} premium queries remaining
          </span>
        )}
        <button onClick={() => setUsageRemaining(r => Math.max(0, r - 1))} style={btn('var(--text-muted)','var(--surface)','var(--border)')}>
          Use a query ({usageRemaining} left)
        </button>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <button onClick={() => setLimit('capability')} style={btn('var(--text-muted)', limit === 'capability' ? 'var(--warm-75)' : 'var(--surface)', 'var(--border)')}>Capability limit</button>
        <button onClick={() => setLimit('knowledge')}  style={btn('#1D4ED8',           limit === 'knowledge'  ? '#EFF6FF'        : 'var(--surface)', limit === 'knowledge'  ? '#BFDBFE' : 'var(--border)')}>Knowledge limit</button>
        <button onClick={() => setLimit('commercial')} style={btn('#7C3AED',           limit === 'commercial' ? '#F5F3FF'        : 'var(--surface)', limit === 'commercial' ? '#DDD6FE' : 'var(--border)')}>Commercial limit</button>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--warm-75)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
          <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 'var(--radius)', background: s.badgeBg, border: `1px solid ${s.badgeBorder}`, fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: s.badgeColor }}>{s.badge}</span>
        </div>
        <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {[
              { label: 'Acknowledge', text: s.ack, color: 'var(--text)' },
              { label: 'Redirect',    text: s.redirect, color: 'var(--text)' },
              { label: 'Invite',      text: s.invite, color: 'var(--text-muted)' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 'var(--font-weight-medium)', paddingTop: 3, minWidth: 80, flexShrink: 0 }}>{row.label}</span>
                <p style={{ fontSize: 'var(--text-base)', color: row.color, lineHeight: 'var(--line-height-normal)' }}>{row.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', paddingTop: 'var(--space-2)' }}>
            <button style={btn(s.badgeColor, s.badgeBg, s.badgeBorder)}>{s.cta}</button>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
        The usage counter only appears when below 25% allocation. Click "Use a query" to see progressive disclosure activate. The ARI structure (Acknowledge, Redirect, Invite) is visible in the response breakdown.
      </p>
    </div>
  )
  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {[
        { variant: 'neutral' as const, title: 'Capability limit', children: "I can't directly book flights. I can draft your itinerary and link you to Google Flights.", action: { label: 'Draft itinerary', onClick: () => {} } },
        { variant: 'info' as const,    title: 'Knowledge limit',  children: "This falls outside my training data. I can run a web search to fill the gap.", action: { label: 'Run web search', onClick: () => {} } },
        { variant: 'warning' as const, title: 'Usage limit',      children: "You've reached your hourly limit. Continue with the standard model or upgrade.", action: { label: 'Use standard model', onClick: () => {} }, secondaryAction: { label: 'View upgrade options', onClick: () => {} } },
      ].map(item => (
        <InlineAlert key={item.title} {...item}>{item.children}</InlineAlert>
      ))}
    </div>
  )

  return (
    <PatternShell
      title="Limitation Handling"
      slug="limitation-handling"
      problem="Commercial limits appear without warning at the moment of highest user intent. Capability limits produce hard stops rather than redirects. No product distinguishes between a knowledge gap and a principled refusal."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
      mobileContent={{ definition, demo, states }}
    >
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
        { label: 'Problem', text: "When an AI cannot or will not do something, the interface must treat that as a first-class design problem. The audit found hard stops, undisclosed commercial paywalls that appear at peak user engagement, and no distinction between capability limits, knowledge limits, and principled refusals." },
        { label: 'Prescription', text: "Three limitation types, each with distinct handling: capability limits acknowledge the boundary and redirect toward what the system can do; knowledge limits differentiate 'I don't know' from 'I can't know' and offer a search pivot; commercial limits are disclosed progressively before the threshold is hit, never at the moment it is breached." },
        { label: 'Design decisions', text: 'Progressive disclosure threshold (25% remaining is a reasonable starting point). Redirect specificity — a specific alternative is more useful than a generic one, but only if the system can reliably provide it. ARI structure (Acknowledge, Redirect, Invite) as a template for all limitation responses.' },
        { label: 'Tradeoffs', text: 'Specific redirects require knowledge of alternatives the system may not reliably have. Progressive commercial disclosure adds interface complexity and may increase churn by making limits visible earlier. Distinguishing limitation types adds length to refusal responses that some users will find unwelcome.' },
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
  return { padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color, background: bg, border: `1px solid ${border}`, borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'opacity var(--transition-base)' }
}
