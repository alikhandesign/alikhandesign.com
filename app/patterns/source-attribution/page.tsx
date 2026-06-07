'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

const NAV = {
  prev: { slug: 'uncertainty-communication', title: 'Uncertainty Communication' },
  next: { slug: 'limitation-handling', title: 'Limitation Handling' },
}

interface Source { id: number; title: string; domain: string; date: string; matchType: 'Exact match' | 'Synthesized' }

const SOURCES: Source[] = [
  { id: 1, title: 'Q1 2026 Earnings Report', domain: 'sec.gov', date: 'Mar 2026', matchType: 'Exact match' },
  { id: 2, title: 'Company expands to Europe', domain: 'reuters.com', date: 'Apr 2026', matchType: 'Exact match' },
  { id: 3, title: 'Asia regulatory delays continue', domain: 'bloomberg.com', date: 'May 2026', matchType: 'Synthesized' },
]

const RESPONSE_PARTS = [
  { text: 'According to recent filings, Company X reported $4.2B in Q1 revenue', cite: 1 },
  { text: ' and expanded operations into Europe', cite: 2 },
  { text: '. Market entry in Asia was delayed due to local regulatory bottlenecks', cite: 3 },
  { text: '. Leadership indicated they expect resolution by Q3, though no firm timeline has been confirmed', cite: null },
  { text: '.', cite: null },
]

export default function SourceAttributionPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [hoveredCite, setHoveredCite] = useState<number | null>(null)
  const [auditMode, setAuditMode] = useState(false)

  return (
    <PatternShell
      title="Source & Attribution"
      patternName="Source & Attribution"
      problem="Citation behavior is inconsistent across all products audited. Inconsistent citation is a worse trust signal than no citation at all — users cannot build a mental model of when to verify."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
      nav={NAV}
    >
      {activeTab === 'definition' && <Definition />}

      {activeTab === 'demo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>Hover footnotes to highlight sources. Toggle audit mode to expand the panel.</p>
            <button onClick={() => setAuditMode(a => !a)} style={btn(auditMode ? 'var(--accent)' : 'var(--text-muted)', auditMode ? 'var(--accent-bg)' : 'var(--warm-75)', auditMode ? '#FECACA' : 'var(--border)')}>
              {auditMode ? 'Reading mode' : 'Audit mode'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: auditMode ? '1fr 280px' : '1fr 48px', gap: 'var(--space-4)', transition: 'grid-template-columns 0.2s ease', alignItems: 'start' }}>
            {/* Response */}
            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', padding: 'var(--space-6)' }}>
              <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-4)' }}>
                AI Response · {SOURCES.length} verified sources
              </p>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
                {RESPONSE_PARTS.map((part, i) => (
                  <span key={i}>
                    {part.text}
                    {part.cite !== null ? (
                      <sup
                        onMouseEnter={() => setHoveredCite(part.cite)}
                        onMouseLeave={() => setHoveredCite(null)}
                        style={{ cursor: 'pointer', color: auditMode ? 'var(--accent)' : 'var(--text-faint)', fontWeight: 'var(--font-weight-semibold)', marginLeft: 1, fontSize: '0.7em', transition: 'color var(--transition-base)' }}
                      >{part.cite}</sup>
                    ) : (
                      <span title="No source available" style={{ cursor: 'help', color: auditMode ? '#B45309' : 'var(--text-faint)', marginLeft: 2, fontSize: 'var(--text-xs)' }}>
                        {auditMode ? ' ⚠' : ''}
                      </span>
                    )}
                  </span>
                ))}
              </p>
              {auditMode && (
                <p style={{ fontSize: 'var(--text-xs)', color: '#B45309', marginTop: 'var(--space-4)', padding: 'var(--space-2) var(--space-3)', background: '#FFFBEB', borderRadius: 'var(--radius)', border: '1px solid #FDE68A' }}>
                  ⚠ One claim is synthesized from parametric memory with no external citation available.
                </p>
              )}
            </div>

            {/* Source panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {auditMode ? SOURCES.map(s => (
                <div key={s.id} style={{ border: `1px solid ${hoveredCite === s.id ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius)', padding: 'var(--space-3)', background: hoveredCite === s.id ? 'var(--accent-bg)' : 'var(--surface)', transition: 'all var(--transition-base)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-muted)' }}>{s.domain}</span>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>{s.date}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text)', marginBottom: 'var(--space-2)', lineHeight: 'var(--line-height-normal)' }}>{s.title}</p>
                  <span style={{ fontSize: 'var(--text-xs)', padding: '2px 6px', borderRadius: 2, background: s.matchType === 'Exact match' ? '#F0FDF4' : '#FFFBEB', color: s.matchType === 'Exact match' ? '#15803D' : '#B45309', border: `1px solid ${s.matchType === 'Exact match' ? '#BBF7D0' : '#FDE68A'}` }}>
                    {s.matchType}
                  </span>
                </div>
              )) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center', padding: 'var(--space-3) 0' }}>
                  {SOURCES.map(s => (
                    <div key={s.id} title={s.title} style={{ width: 32, height: 32, borderRadius: 'var(--radius)', border: `1px solid ${hoveredCite === s.id ? 'var(--accent)' : 'var(--border)'}`, background: hoveredCite === s.id ? 'var(--accent-bg)' : 'var(--warm-75)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text-muted)', cursor: 'default', transition: 'all var(--transition-base)' }}>
                      {s.id}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'states' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {[
            { label: 'Cited claim', desc: 'Footnote superscript links directly to a source card. Hover highlights the corresponding source in the sidebar.', color: 'var(--text)', bg: 'var(--surface)', border: 'var(--border)' },
            { label: 'Uncited claim ⚠', desc: 'Claim is synthesized from parametric memory. No external citation available. Visible only in audit mode to avoid noise in reading mode.', color: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
            { label: 'Exact match source', desc: 'Source card shows the specific passage that supports the claim. Domain, date, and match type visible at a glance.', color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0' },
            { label: 'Synthesized source', desc: 'The AI drew on this source but the claim is not a direct quotation or exact data point — it is an inference or summary.', color: '#B45309', bg: '#FFFBEB', border: '#FDE68A' },
          ].map(item => (
            <div key={item.label} style={{ display:'flex',alignItems:'flex-start',gap:'var(--space-4)',padding:'var(--space-4)',border:`1px solid ${item.border}`,borderRadius:'var(--radius)',background:item.bg }}>
              <div style={{ minWidth: 120 }}>
                <p style={{ fontSize:'var(--text-xs)',fontWeight:'var(--font-weight-semibold)',color:item.color,letterSpacing:'var(--letter-spacing-sm)' }}>{item.label}</p>
              </div>
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
        { label: 'Problem', text: 'Citations exist to give users the information they need to verify claims independently. Inconsistent citation behavior — sometimes citing, sometimes not, for claims of equivalent credibility — teaches users either to always verify (eroding trust in accurate citations) or to never verify (creating real risk when citations are absent on uncertain claims). The audit finding was not false attribution, but absent attribution.' },
        { label: 'Prescription', text: 'Citation behavior must be consistent and predictable. Citations must link specific claims to specific sources — not aggregate sources at the end of a response. Users must be able to assess source credibility without clicking through. Uncited claims must be flagged explicitly rather than treated identically to cited ones. Perplexity's source panel is the high-water mark in the audit.' },
        { label: 'Design decisions', text: 'Inline citation format: footnote-style superscripts keep response text readable; inline hyperlinks are more immediate but visually cluttered in dense responses. Source panel vs inline-only: a persistent sidebar separates reading from verifying, but requires more screen real estate. Reading/audit mode toggle allows both casual and expert use without forcing one experience on all users.' },
        { label: 'Tradeoffs', text: 'Consistent citation increases response length and visual complexity. In conversational contexts, prominent citation infrastructure feels like friction. Hover previews require source retrieval infrastructure and introduce latency on interaction. Inline citation numbering assumes users understand the footnote convention — in products serving non-expert users, this may go uninvestigated.' },
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
