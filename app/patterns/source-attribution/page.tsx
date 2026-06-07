'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

interface Source { id: number; label: string; domain: string; date: string; match: 'Exact' | 'Synthesized' }

const SOURCES: Source[] = [
  { id: 1, label: 'SEC 10-Q Filing', domain: 'sec.gov', date: 'Mar 2026', match: 'Exact' },
  { id: 2, label: 'Reuters Markets', domain: 'reuters.com', date: 'Apr 2026', match: 'Synthesized' },
  { id: 3, label: 'Bloomberg', domain: 'bloomberg.com', date: 'May 2026', match: 'Exact' },
]

type Mode = 'reading' | 'audit'

export default function SourceAttributionPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [mode, setMode] = useState<Mode>('reading')
  const [hoveredRef, setHoveredRef] = useState<number | null>(null)

  const definition = <Definition />
  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Mode:</span>
        <button onClick={() => setMode('reading')} style={btn(mode === 'reading' ? 'var(--accent)' : 'var(--text-muted)', mode === 'reading' ? 'var(--accent-bg)' : 'var(--warm-75)', mode === 'reading' ? '#FECACA' : 'var(--border)')}>Reading</button>
        <button onClick={() => setMode('audit')}   style={btn(mode === 'audit'   ? '#1D4ED8' : 'var(--text-muted)', mode === 'audit'   ? '#EFF6FF' : 'var(--warm-75)', mode === 'audit'   ? '#BFDBFE' : 'var(--border)')}>Audit</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: mode === 'audit' ? '1fr 220px' : '1fr 32px', gap: 'var(--space-4)', transition: 'grid-template-columns 0.3s ease', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
        {/* Response pane */}
        <div style={{ padding: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
            According to recent filings, the company reported $4.2B in Q1 revenue
            <sup onMouseEnter={() => setHoveredRef(1)} onMouseLeave={() => setHoveredRef(null)}
              style={{ color: mode === 'audit' ? '#1D4ED8' : 'var(--border-mid)', cursor: 'pointer', fontWeight: 'var(--font-weight-semibold)', fontSize: '0.7em', marginLeft: 1 }}>¹</sup>
            {' '}and expanded operations into Europe
            <sup onMouseEnter={() => setHoveredRef(2)} onMouseLeave={() => setHoveredRef(null)}
              style={{ color: mode === 'audit' ? '#1D4ED8' : 'var(--border-mid)', cursor: 'pointer', fontWeight: 'var(--font-weight-semibold)', fontSize: '0.7em', marginLeft: 1 }}>²</sup>.
            {' '}Market entry in Asia was delayed
            <sup onMouseEnter={() => setHoveredRef(3)} onMouseLeave={() => setHoveredRef(null)}
              style={{ color: mode === 'audit' ? '#1D4ED8' : 'var(--border-mid)', cursor: 'pointer', fontWeight: 'var(--font-weight-semibold)', fontSize: '0.7em', marginLeft: 1 }}>³</sup>
            {' '}due to local regulatory bottlenecks.{' '}
            <span style={{ opacity: mode === 'audit' ? 1 : 0, transition: 'opacity 0.2s' }}>
              <span title="No source available for this claim" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14, borderRadius: '50%', background: 'var(--warm-75)', border: '1px solid var(--border-mid)', fontSize: 9, color: 'var(--text-muted)', cursor: 'help', verticalAlign: 'middle', marginLeft: 2 }}>!</span>
            </span>
            {' '}Logistics costs increased significantly over the same period.
          </p>
        </div>

        {/* Source panel */}
        <div style={{ borderLeft: '1px solid var(--border)', background: 'var(--warm-75)', padding: mode === 'audit' ? 'var(--space-4)' : 0, overflow: 'hidden' }}>
          {mode === 'audit' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-medium)' }}>Sources</p>
              {SOURCES.map(s => (
                <div key={s.id} style={{ padding: 'var(--space-3)', borderRadius: 'var(--radius)', border: `1px solid ${hoveredRef === s.id ? '#BFDBFE' : 'var(--border)'}`, background: hoveredRef === s.id ? '#EFF6FF' : 'var(--surface)', transition: 'all var(--transition-base)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: '#1D4ED8' }}>{s.id}.</span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--text)' }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-1)' }}>{s.domain}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>{s.date}</span>
                    <span style={{ fontSize: 9, letterSpacing: '0.05em', textTransform: 'uppercase', color: s.match === 'Exact' ? '#15803D' : '#B45309', fontWeight: 'var(--font-weight-semibold)' }}>{s.match}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
        Hover over footnote numbers in audit mode to highlight the corresponding source card. The [!] indicator marks a claim with no available source — absence of citation is a deliberate signal, not an interface gap.
      </p>
    </div>
  )
  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {[
        { label: 'Cited — exact match', color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0', desc: 'Claim is directly supported by a specific passage in the cited source.' },
        { label: 'Cited — synthesized', color: '#B45309', bg: '#FFFBEB', border: '#FDE68A', desc: 'Claim is derived from multiple sources or paraphrased. Source is still indicated.' },
        { label: 'Uncited [!]', color: 'var(--text-muted)', bg: 'var(--warm-75)', border: 'var(--border)', desc: 'No external source available. Claim is drawn from parametric memory. Marked explicitly in audit mode.' },
      ].map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
          <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 'var(--radius)', background: item.bg, border: `1px solid ${item.border}`, fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: item.color, whiteSpace: 'nowrap' }}>{item.label}</span>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>{item.desc}</p>
        </div>
      ))}
    </div>
  )

  return (
    <PatternShell
      title="Source & Attribution"
      slug="source-attribution"
      problem="Citation behavior is inconsistent across all products audited. Inconsistent citation is a worse trust signal than no citation — users cannot build a reliable mental model of when to verify."
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
        { label: 'Problem', text: 'Citations exist to give users the information they need to verify claims independently. Inconsistent citation behavior — sometimes citing, sometimes not, for claims of equivalent credibility — is a more serious trust problem than no citation at all. It teaches users that the presence of a citation is not a reliable signal.' },
        { label: 'Prescription', text: 'Four requirements: consistency (cite all comparable claims or none), inline connection (each citation links a specific claim to a specific source), accessibility (credibility visible on hover without clicking through), and resolution (links go to specific content, not homepages). A dual Reading/Audit mode separates casual reading from verification.' },
        { label: 'Design decisions', text: 'Footnote-style numbered references vs. inline hyperlinks. Persistent source panel vs. inline-only. Decision rule for what constitutes a citable claim. How to handle synthesized claims drawn from multiple sources.' },
        { label: 'Tradeoffs', text: 'Consistent citation increases response length and visual complexity. Hover previews require source retrieval infrastructure and introduce interaction latency. Audit mode adds interface complexity that casual users will never use — but its presence signals accountability even to users who never open it.' },
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
