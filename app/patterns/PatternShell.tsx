'use client'
import Link from 'next/link'
import { ReactNode } from 'react'
import TabNavigation from '../components/TabNavigation'

const PATTERN_ORDER = [
  { slug: 'generation-states',         title: 'Generation States' },
  { slug: 'uncertainty-communication', title: 'Uncertainty Communication' },
  { slug: 'source-attribution',        title: 'Source & Attribution' },
  { slug: 'limitation-handling',       title: 'Limitation Handling' },
  { slug: 'correction-refinement',     title: 'Correction & Refinement' },
  { slug: 'error-states',              title: 'Error States' },
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
  mobileContent?: Record<string, ReactNode>
}

export default function PatternShell({
  title, slug, problem, activeTab, onTabChange, tabs, children, mobileContent
}: PatternShellProps) {
  const idx  = PATTERN_ORDER.findIndex(p => p.slug === slug)
  const prev = PATTERN_ORDER[(idx - 1 + PATTERN_ORDER.length) % PATTERN_ORDER.length]
  const next = PATTERN_ORDER[(idx + 1) % PATTERN_ORDER.length]

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
      {/* Header */}
      <div className="page-header">
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
          <Link href="/patterns" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            Pattern Library
          </Link>
          <span style={{ fontSize: 'var(--font-size-sm)', color: '#C4BDB7' }} aria-hidden="true">›</span>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 500 }} aria-current="page">
            {title}
          </span>
        </nav>
        <h1 className="font-serif" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 400, lineHeight: 'var(--line-height-tight)', marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
          {title}
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)', maxWidth: 640 }}>
          {problem}
        </p>
      </div>

      {/* Desktop: TabNavigation + content */}
      <div className="pattern-desktop-only">
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} variant="top" />
        <div className="section-pad">{children}</div>
      </div>

      {/* Mobile: stacked sections */}
      <div className="pattern-mobile-only">
        {mobileContent
          ? tabs.map(tab => (
              <div key={tab.id} style={{ padding: 'var(--space-8) var(--space-5)', borderBottom: '1px solid var(--color-border)' }}>
                <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>{tab.label}</p>
                {mobileContent[tab.id]}
              </div>
            ))
          : <div style={{ padding: 'var(--space-8) var(--space-5)' }}>{children}</div>
        }
      </div>

      {/* Prev / Next */}
      <div className="next-project" style={{ borderTop: '1px solid var(--color-border)', marginTop: 0 }}>
        <Link href={`/patterns/${prev.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' }}>← Previous</span>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 'var(--font-weight-medium)' }}>{prev.title}</span>
        </Link>
        <Link href={`/patterns/${next.slug}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', alignItems: 'flex-end' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' }}>Next →</span>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 'var(--font-weight-medium)' }}>{next.title}</span>
        </Link>
      </div>

      <style>{`
        .pattern-mobile-only { display: none; }
        @media (max-width: 768px) {
          .pattern-desktop-only { display: none; }
          .pattern-mobile-only  { display: block; }
        }
      `}</style>
    </div>
  )
}
