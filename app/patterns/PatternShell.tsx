'use client'
import Link from 'next/link'
import { ReactNode } from 'react'

const PATTERN_ORDER = [
  { slug: 'generation-states',          title: 'Generation States' },
  { slug: 'uncertainty-communication',  title: 'Uncertainty Communication' },
  { slug: 'source-attribution',         title: 'Source & Attribution' },
  { slug: 'limitation-handling',        title: 'Limitation Handling' },
  { slug: 'correction-refinement',      title: 'Correction & Refinement' },
  { slug: 'error-states',               title: 'Error States' },
]

interface Tab { id: string; label: string }

interface PatternShellProps {
  title: string
  slug: string
  problem: string
  activeTab: string
  onTabChange: (id: string) => void
  tabs: Tab[]
  children: ReactNode
  /** Pass each tab's content keyed by tab id for mobile stacked layout */
  mobileContent?: Record<string, ReactNode>
}

export default function PatternShell({
  title, slug, problem, activeTab, onTabChange, tabs, children, mobileContent
}: PatternShellProps) {
  const idx = PATTERN_ORDER.findIndex(p => p.slug === slug)
  const prev = PATTERN_ORDER[(idx - 1 + PATTERN_ORDER.length) % PATTERN_ORDER.length]
  const next = PATTERN_ORDER[(idx + 1) % PATTERN_ORDER.length]

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <Link href="/patterns" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-medium)' }}>
            ← Pattern Library
          </Link>
          <span style={{ color: 'var(--border-mid)' }}>/</span>
          <span className="eyebrow">{title}</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: 'var(--text-3xl)', fontWeight: 400, lineHeight: 'var(--line-height-tight)', marginBottom: 'var(--space-4)', color: 'var(--text)' }}>
          {title}
        </h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', maxWidth: 640 }}>
          {problem}
        </p>
      </div>

      {/* Desktop: tab nav + content */}
      <div className="pattern-desktop-only">
        <div style={{ borderBottom: '1px solid var(--border)', padding: '0 var(--space-12)', display: 'flex', gap: 0 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                padding: 'var(--space-4) var(--space-5)',
                fontSize: 'var(--text-sm)',
                fontWeight: activeTab === tab.id ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                marginBottom: -1,
                transition: 'color var(--transition-base)',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="section-pad">{children}</div>
      </div>

      {/* Mobile: stacked sections */}
      <div className="pattern-mobile-only">
        {mobileContent
          ? tabs.map(tab => (
              <div key={tab.id} style={{ padding: 'var(--space-8) var(--space-5)', borderBottom: '1px solid var(--border)' }}>
                <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>{tab.label}</p>
                {mobileContent[tab.id]}
              </div>
            ))
          : <div style={{ padding: 'var(--space-8) var(--space-5)' }}>{children}</div>
        }
      </div>

      {/* Prev / Next navigation */}
      <div className="next-project" style={{ borderTop: '1px solid var(--border)', marginTop: 0 }}>
        <Link href={`/patterns/${prev.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' }}>← Previous</span>
          <span style={{ fontSize: 'var(--text-base)', color: 'var(--text)', fontWeight: 'var(--font-weight-medium)' }}>{prev.title}</span>
        </Link>
        <Link href={`/patterns/${next.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' }}>Next →</span>
          <span style={{ fontSize: 'var(--text-base)', color: 'var(--text)', fontWeight: 'var(--font-weight-medium)' }}>{next.title}</span>
        </Link>
      </div>

      <style>{`
        .pattern-mobile-only { display: none; }
        @media (max-width: 768px) {
          .pattern-desktop-only { display: none; }
          .pattern-mobile-only { display: block; }
        }
      `}</style>
    </div>
  )
}
