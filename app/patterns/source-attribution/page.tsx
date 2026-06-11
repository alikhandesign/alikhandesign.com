'use client'
import { useState } from 'react'
import PatternShell from '../PatternShell'
import PatternAnnotation from '../../components/PatternAnnotation'
import Button from '../../components/Button'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo',       label: 'Interactive demo' },
  { id: 'states',     label: 'All states' },
]

const ANNOTATION = 'Perplexity cites 94% of responses with 8.2 sources on average — highest in the audit. ChatGPT and Claude cite inconsistently: sometimes attributing, sometimes presenting identical claim types with no source. Inconsistent citation is a worse trust signal than no citation — users cannot build a reliable mental model of when to verify. The citation quality risk identified was absent attribution, not false attribution.'

interface Source { id: number; label: string; domain: string; date: string; match: 'Exact' | 'Synthesized'; excerpt: string }

const SOURCES: Source[] = [
  { id: 1, label: 'SEC 10-Q Filing', domain: 'sec.gov', date: 'Mar 2026', match: 'Exact', excerpt: 'Total revenue for Q1 2026 was $4.2B, representing a 12% increase year-over-year...' },
  { id: 2, label: 'Reuters Markets', domain: 'reuters.com', date: 'Apr 2026', match: 'Synthesized', excerpt: 'The company announced expansion plans across three European markets including Germany, France, and Spain...' },
  { id: 3, label: 'Bloomberg', domain: 'bloomberg.com', date: 'May 2026', match: 'Exact', excerpt: 'Asian market entry has been delayed by 6–9 months following regulatory review by local authorities...' },
]

export default function SourceAttributionPage() {
  const [activeTab, setActiveTab]   = useState('definition')
  const [openSource, setOpenSource] = useState<number | null>(null)
  const [hoveredRef, setHoveredRef] = useState<number | null>(null)
  const activeSourceData = SOURCES.find(s => s.id === openSource) ?? null

  const citationBadge = (id: number) => (
    <button
      onClick={() => setOpenSource(prev => prev === id ? null : id)}
      onMouseEnter={() => setHoveredRef(id)}
      onMouseLeave={() => setHoveredRef(null)}
      aria-label={`Open source ${id}`}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 20, height: 20, borderRadius: '50%',
        background: openSource === id ? 'var(--color-accent)' : hoveredRef === id ? 'var(--color-accent-dark)' : 'var(--color-text-mid)',
        color: '#fff', fontSize: 'var(--text-badge)', fontWeight: 700,
        border: 'none', cursor: 'pointer',
        marginLeft: 3, marginRight: 1, verticalAlign: 'middle',
        transition: 'background var(--transition-base)',
        fontFamily: 'var(--font-sans)', flexShrink: 0,
      }}
    >{id}</button>
  )

  const uncitedMarker = (
    <span title="No source available — claim drawn from parametric memory"
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: 'var(--color-surface-subtle)', border: '1px solid var(--color-border-mid)', fontSize: 'var(--text-badge)', color: 'var(--color-text-muted)', cursor: 'help', marginLeft: 3, verticalAlign: 'middle' }}>!</span>
  )

  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PatternAnnotation finding={ANNOTATION} />
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)' }}>
        Click any numbered citation to open the Source Inspector. The <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: 'var(--color-surface-subtle)', border: '1px solid var(--color-border-mid)', fontSize: 'var(--text-badge)', color: 'var(--color-text-muted)', verticalAlign: 'middle' }}>!</span> marker indicates a claim with no external source.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: openSource ? '1fr 260px' : '1fr', gap: 0, border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', overflow: 'hidden', transition: 'grid-template-columns 0.25s ease' }}>
        <div style={{ padding: 'var(--space-6)', borderRight: openSource ? '1px solid var(--color-border)' : 'none' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', lineHeight: 2 }}>
            According to recent filings, the company reported $4.2B in Q1 revenue{citationBadge(1)} and expanded operations into Europe{citationBadge(2)}.
            {' '}Market entry in Asia was delayed{citationBadge(3)} due to local regulatory bottlenecks.
            {' '}Logistics costs increased significantly over the same period{uncitedMarker} — the largest year-over-year increase in five years.
          </p>
        </div>
        {openSource && activeSourceData && (
          <div style={{ background: 'var(--color-surface-subtle)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-medium)' }}>Source inspector</p>
              <button onClick={() => setOpenSource(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 'var(--text-md)', lineHeight: 1, padding: 0 }} aria-label="Close source inspector">×</button>
            </div>
            {SOURCES.map(s => (
              <div key={s.id} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <button onClick={() => setOpenSource(s.id)} style={{ padding: 'var(--space-3)', borderRadius: s.id === openSource ? 'var(--radius) var(--radius) 0 0' : 'var(--radius)', border: `1px solid ${s.id === openSource ? 'var(--color-accent)' : 'var(--color-border)'}`, borderBottom: s.id === openSource ? 'none' : `1px solid ${s.id === openSource ? 'var(--color-accent)' : 'var(--color-border)'}`, background: s.id === openSource ? 'var(--color-accent-bg)' : 'var(--color-surface)', textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'all var(--transition-base)', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: s.id === openSource ? 'var(--color-accent)' : 'var(--color-text-mid)', color: '#fff', fontSize: 'var(--text-badge)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{s.id}</span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text)' }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>{s.domain}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)' }}>{s.date}</span>
                    <span style={{ fontSize: 9, letterSpacing: '0.05em', textTransform: 'uppercase', color: s.match === 'Exact' ? 'var(--color-success, #4A6130)' : 'var(--color-warning, #92600A)', fontWeight: 700 }}>{s.match}</span>
                  </div>
                </button>
                {s.id === openSource && (
                  <div style={{ padding: 'var(--space-3)', background: 'var(--color-surface)', borderRadius: '0 0 var(--radius) var(--radius)', border: '1px solid var(--color-accent)', borderTop: '1px solid var(--color-border)' }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' }}>Relevant excerpt</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text)', lineHeight: 'var(--line-height-normal)', fontStyle: 'italic' }}>&ldquo;{s.excerpt}&rdquo;</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {[
        { label: 'Cited — exact match', color: '#15803D', bg: '#F0FDF4', border: '#BBF7D0', desc: 'Claim directly supported by a specific passage in the cited source.' },
        { label: 'Cited — synthesized', color: '#B45309', bg: '#FFFBEB', border: '#FDE68A', desc: 'Claim derived from multiple sources or paraphrased. Source still indicated.' },
        { label: 'Uncited [!]', color: 'var(--color-text-muted)', bg: 'var(--color-surface-subtle)', border: 'var(--color-border)', desc: 'No external source available. Drawn from parametric memory. Absence is a deliberate signal, not an interface gap.' },
      ].map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', background: 'var(--color-surface)' }}>
          <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 'var(--radius)', background: item.bg, border: `1px solid ${item.border}`, fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-semibold)', color: item.color, whiteSpace: 'nowrap' }}>{item.label}</span>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)' }}>{item.desc}</p>
        </div>
      ))}
    </div>
  )

  const definition = <Definition />

  return (
    <PatternShell title="Source & Attribution" slug="source-attribution"
      problem="Citation behavior is inconsistent across all products audited. Inconsistent citation is a worse trust signal than no citation — users cannot build a reliable mental model of when to verify."
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
        { label: 'Problem', text: 'Citations exist to give users the information they need to verify claims independently. Inconsistent citation behavior — sometimes citing, sometimes not, for claims of equivalent credibility — is a more serious trust problem than no citation at all. It teaches users the presence of a citation is not a reliable signal.' },
        { label: 'Prescription', text: 'Four requirements: consistency (cite all comparable claims or none), inline connection (each citation badge links a specific claim to a specific source), accessibility (source content visible in panel without leaving the interface), and resolution (citations go to specific excerpts, not homepages). Source Inspector slides in on citation click.' },
        { label: 'Design decisions', text: 'Inline numbered badges over superscripts — more accessible, more visible, harder to miss. Click-to-open vs. always-visible panel — on-demand reduces clutter for casual reading while preserving full verifiability. Source cards show excerpt, credibility signals, and match type without requiring a click-through.' },
        { label: 'Tradeoffs', text: 'Consistent citation increases response length and visual complexity. The Source Inspector panel takes horizontal space — most appropriate for research-oriented contexts. Inline badges interrupt reading flow slightly more than superscripts, trading readability for accessibility.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

