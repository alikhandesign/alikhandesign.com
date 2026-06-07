'use client'
import Link from 'next/link'
import { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
}

interface PatternShellProps {
  title: string
  category: string
  problem: string
  activeTab: string
  onTabChange: (id: string) => void
  tabs: Tab[]
  children: ReactNode
}

export default function PatternShell({
  title, category, problem, activeTab, onTabChange, tabs, children
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
          <span className="eyebrow">{category}</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: 'var(--text-3xl)', fontWeight: 400, lineHeight: 'var(--line-height-tight)', marginBottom: 'var(--space-4)', color: 'var(--text)' }}>
          {title}
        </h1>
        <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', maxWidth: 640 }}>
          {problem}
        </p>
      </div>

      {/* Tab nav */}
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

      {/* Content */}
      <div className="section-pad">
        {children}
      </div>
    </div>
  )
}
