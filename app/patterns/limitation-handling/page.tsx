'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import InlineAlert from '../../components/InlineAlert'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo',       label: 'Interactive demo' },
  { id: 'states',     label: 'All states' },
]

type LimitType = 'capability' | 'knowledge' | 'commercial'
type UsageDisplay = 'count' | 'percent'

const FLIGHT_RESULTS = [
  { airline: 'United', flight: 'UA 492', departs: '8:15 AM', arrives: '2:40 PM', price: '$342', stops: 'Nonstop' },
  { airline: 'Delta',  flight: 'DL 1087', departs: '10:30 AM', arrives: '5:05 PM', price: '$289', stops: '1 stop' },
  { airline: 'AA',     flight: 'AA 204',  departs: '2:45 PM', arrives: '9:10 PM', price: '$311', stops: 'Nonstop' },
]

const COMMERCIAL_MAX = 20

export default function LimitationHandlingPage() {
  const [activeTab, setActiveTab]         = useState('definition')
  const [limit, setLimit]                 = useState<LimitType>('capability')
  const [usageRemaining, setUsageRemaining] = useState(8)
  const [usageDisplay, setUsageDisplay]   = useState<UsageDisplay>('count')

  const usagePct = Math.round((usageRemaining / COMMERCIAL_MAX) * 100)
  const isLow    = usageRemaining <= 5

  const usageLabel = usageDisplay === 'count'
    ? `${usageRemaining} premium queries remaining`
    : `${usagePct}% of premium quota remaining`

  const auditNote = (
    <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)', background: 'var(--warm-75)', borderLeft: '3px solid var(--accent)', borderRadius: '0 var(--radius) var(--radius) 0' }}>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>
        <strong style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-md)', fontSize: 'var(--text-xs)' }}>Why this matters —</strong>{' '}
        Notion AI hit a hard usage limit mid-task with no prior warning — discarding work in progress and replacing the limit explanation with marketing copy. Perplexity refused private information requests but then provided aerial property photographs for the same address. Neither product treated the limitation as a design problem to solve.
      </p>
    </div>
  )

  const capabilityDemo = (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
      <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--warm-75)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
        <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 'var(--radius)', background: 'var(--warm-75)', border: '1px solid var(--border)', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Capability limit</span>
      </div>
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        {[
          { label: 'Acknowledge', text: "I can't directly book flights or access transactional booking engines." },
          { label: 'Redirect',    text: "I searched for flights on your dates. Here are the best options I found:" },
          { label: 'Invite',      text: "Would you like help comparing these, or should I draft an itinerary around one of them?" },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 'var(--font-weight-medium)', paddingTop: 3, minWidth: 80, flexShrink: 0 }}>{row.label}</span>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-normal)' }}>{row.text}</p>
          </div>
        ))}

        {/* Inline flight results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginLeft: 83 }}>
          {FLIGHT_RESULTS.map(f => (
            <div key={f.flight} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--warm-75)' }}>
              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text)', minWidth: 60 }}>{f.airline}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{f.departs} → {f.arrives}</span>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>{f.stops}</span>
              </div>
              <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--accent)' }}>{f.price}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', marginLeft: 83 }}>
          <button style={btn('var(--accent)', 'var(--accent-bg)', 'var(--accent)')}>Compare options →</button>
          <button style={btn('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>Draft itinerary →</button>
        </div>
      </div>
    </div>
  )

  const knowledgeDemo = (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
      <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: '#EFF6FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
        <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 'var(--radius)', background: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: '#1D4ED8' }}>Knowledge limit</span>
      </div>
      <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {[
          { label: 'Acknowledge', text: "I don't have access to real-time stock pricing — my training data has a cutoff." },
          { label: 'Redirect',    text: "I searched the web for current quotes. AAPL is trading at $213.40, up 1.2% today (as of market close)." },
          { label: 'Invite',      text: "Would you like a summary of recent analyst sentiment, or should I pull the last earnings report?" },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
            <span style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 'var(--font-weight-medium)', paddingTop: 3, minWidth: 80, flexShrink: 0 }}>{row.label}</span>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-normal)' }}>{row.text}</p>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginLeft: 83 }}>
          <button style={btn('#1D4ED8', '#EFF6FF', '#BFDBFE')}>Analyst sentiment →</button>
          <button style={btn('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>Earnings report →</button>
        </div>
      </div>
    </div>
  )

  const commercialDemo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {/* Workspace bar with progressive disclosure */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) var(--space-4)', background: 'var(--warm-75)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>Workspace</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {isLow && (
            <span style={{ fontSize: 'var(--text-xs)', color: '#7C3AED', fontWeight: 'var(--font-weight-medium)' }}>
              ⚡ {usageLabel}
            </span>
          )}
          <button
            onClick={() => setUsageDisplay(d => d === 'count' ? 'percent' : 'count')}
            style={btn('var(--text-muted)', 'var(--surface)', 'var(--border)')}
          >
            Show as {usageDisplay === 'count' ? '%' : '#'}
          </button>
          <button
            onClick={() => setUsageRemaining(r => Math.max(0, r - 1))}
            disabled={usageRemaining === 0}
            style={{ ...btn('#7C3AED', '#F5F3FF', '#DDD6FE'), opacity: usageRemaining === 0 ? 0.4 : 1 }}
          >
            Use query ({usageRemaining} left)
          </button>
          <button onClick={() => setUsageRemaining(8)} style={btn('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>
            Reset
          </button>
        </div>
      </div>

      {/* Usage bar */}
      <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${usagePct}%`, background: isLow ? '#7C3AED' : 'var(--accent)', borderRadius: 2, transition: 'width 0.3s ease, background 0.3s ease' }} />
      </div>

      {usageRemaining === 0 && (
        <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: '#F5F3FF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
            <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 'var(--radius)', background: '#F5F3FF', border: '1px solid #DDD6FE', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: '#7C3AED' }}>Usage limit</span>
          </div>
          <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {[
              { label: 'Acknowledge', text: "You've reached your hourly limit for advanced analysis." },
              { label: 'Redirect',    text: "I can continue processing this prompt using the standard model — slightly slower, same accuracy for most tasks." },
              { label: 'Invite',      text: "Would you like to switch models or view upgrade options?" },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 'var(--font-weight-medium)', paddingTop: 3, minWidth: 80, flexShrink: 0 }}>{row.label}</span>
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-normal)' }}>{row.text}</p>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginLeft: 83 }}>
              <button style={btn('#7C3AED', '#F5F3FF', '#DDD6FE')}>Use standard model →</button>
              <button style={btn('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>View upgrade options →</button>
            </div>
          </div>
        </div>
      )}

      {usageRemaining > 0 && (
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
          {isLow
            ? 'Progressive disclosure is active — the usage counter is visible because you are below 25% allocation.'
            : 'Usage counter is hidden above 25% allocation. Click "Use query" to deplete toward the disclosure threshold.'}
        </p>
      )}
    </div>
  )

  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <button onClick={() => setLimit('capability')} style={btn(limit === 'capability' ? 'var(--accent)' : 'var(--text-muted)', limit === 'capability' ? 'var(--accent-bg)' : 'var(--warm-75)', limit === 'capability' ? 'var(--accent)' : 'var(--border)')}>Capability limit</button>
        <button onClick={() => setLimit('knowledge')}  style={btn(limit === 'knowledge'  ? '#1D4ED8' : 'var(--text-muted)', limit === 'knowledge'  ? '#EFF6FF' : 'var(--warm-75)', limit === 'knowledge'  ? '#BFDBFE' : 'var(--border)')}>Knowledge limit</button>
        <button onClick={() => setLimit('commercial')} style={btn(limit === 'commercial' ? '#7C3AED' : 'var(--text-muted)', limit === 'commercial' ? '#F5F3FF' : 'var(--warm-75)', limit === 'commercial' ? '#DDD6FE' : 'var(--border)')}>Commercial limit</button>
      </div>

      {limit === 'capability' && capabilityDemo}
      {limit === 'knowledge'  && knowledgeDemo}
      {limit === 'commercial' && commercialDemo}

      {auditNote}
    </div>
  )

  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {[
        { variant: 'neutral' as const, title: 'Capability limit', children: "I can't directly book flights. I searched and found three options — want me to compare them or draft an itinerary?", action: { label: 'Compare options', onClick: () => {} } },
        { variant: 'info'    as const, title: 'Knowledge limit',  children: "My training data is stale for this. I searched the web and found current results.", action: { label: 'View results', onClick: () => {} } },
        { variant: 'warning' as const, title: 'Commercial limit', children: "You've reached your hourly limit. Continue with the standard model or upgrade.", action: { label: 'Use standard model', onClick: () => {} }, secondaryAction: { label: 'View upgrade options', onClick: () => {} } },
      ].map(item => (
        <InlineAlert key={item.title} {...item}>{item.children}</InlineAlert>
      ))}
    </div>
  )

  const definition = <Definition />

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
        { label: 'Problem', text: "When an AI cannot or will not do something, the interface must treat that as a first-class design problem. The audit found hard stops, undisclosed commercial paywalls at peak engagement, and no distinction between capability limits, knowledge limits, and principled refusals." },
        { label: 'Prescription', text: "Three limitation types with distinct handling: capability limits acknowledge the boundary and proactively search or redirect; knowledge limits differentiate 'I don't know' from 'I can't know' and trigger a web search before responding; commercial limits disclose progressively before the threshold is hit, never at the moment it is breached." },
        { label: 'Design decisions', text: 'Progressive disclosure threshold (25% remaining is a reasonable starting point). Count vs. percentage — percentage generalizes better across different quota models. Proactive search on capability and knowledge limits matches observed behavior and sets user expectation correctly.' },
        { label: 'Tradeoffs', text: 'Proactive search adds latency before the first response token. Specific inline results require the system to have reliable, current data — a fabricated flight price is worse than no flight price. Progressive commercial disclosure may increase churn for users who notice limits earlier than they otherwise would.' },
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
