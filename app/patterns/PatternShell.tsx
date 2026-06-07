'use client'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
}

interface PatternNav {
  prev: { slug: string; title: string } | null
  next: { slug: string; title: string } | null
}

interface PatternShellProps {
  title: string
  patternName: string
  problem: string
  activeTab: string
  onTabChange: (id: string) => void
  tabs: Tab[]
  children: ReactNode
  nav: PatternNav
  sections?: { id: string; label: string }[]
}

export default function PatternShell({
  title, patternName, problem, activeTab, onTabChange, tabs, children, nav, sections
}: PatternShellProps) {
  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
      {/* Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <Link href="/patterns" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textDecoration: 'none', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-medium)' }}>
            ← Pattern Library
          </Link>
          <span style={{ color: 'var(--border-mid)' }}>/</span>
          <span className="eyebrow">{patternName}</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: 'var(--text-3xl)', fontWeight: 400, lineHeight: 'var(--line-height-tight)', marginBottom: 'var(--space-4)', color: 'var(--text)' }}>
          {title}
        </h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', maxWidth: 640 }}>
          {problem}
        </p>
      </div>

      {/* Desktop tabs */}
      <div className="pattern-tabs-desktop" style={{ borderBottom: '1px solid var(--border)', padding: '0 var(--space-12)', display: 'flex', gap: 0 }}>
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

      {/* Desktop tab content */}
      <div className="pattern-tabs-desktop section-pad">
        {children}
      </div>

      {/* Mobile: long scroll sections */}
      <div className="pattern-mobile-scroll">
        {sections && sections.map(s => (
          <div key={s.id} id={s.id} style={{ padding: 'var(--space-8) var(--space-5)', borderBottom: '1px solid var(--border)' }}>
            <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>{s.label}</p>
            {children}
          </div>
        ))}
        {!sections && (
          <div style={{ padding: 'var(--space-8) var(--space-5)' }}>
            {children}
          </div>
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="divider" />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '2.5rem var(--space-12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        {nav.prev ? (
          <Link href={`/patterns/${nav.prev.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-lg)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)', marginBottom: '0.35rem' }}>Previous pattern</p>
            <p className="font-serif" style={{ fontSize: 'var(--text-xl)', fontWeight: 400 }}>← {nav.prev.title}</p>
          </Link>
        ) : <div />}
        {nav.next && (
          <Link href={`/patterns/${nav.next.slug}`} style={{ textDecoration: 'none', color: 'inherit', textAlign: 'right' }}>
            <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-lg)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)', marginBottom: '0.35rem' }}>Next pattern</p>
            <p className="font-serif" style={{ fontSize: 'var(--text-xl)', fontWeight: 400 }}>{nav.next.title} →</p>
          </Link>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pattern-tabs-desktop { display: none !important; }
          .pattern-mobile-scroll { display: block !important; }
        }
        @media (min-width: 769px) {
          .pattern-mobile-scroll { display: none !important; }
        }
      `}</style>
    </div>
  )
}
