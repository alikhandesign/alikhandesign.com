'use client'
import Link from 'next/link'
import { useState } from 'react'

interface MetricCardProps {
  company: string
  value: string
  description: string
  href: string
}

export default function MetricCard({ company, value, description, href }: MetricCardProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <article
      style={{
        background: 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 'var(--radius)',
        padding: 'var(--space-8)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color var(--transition-base)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--color-accent)' }} />
      <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', fontWeight: 'var(--font-weight-medium)' as any }}>{company}</p>
      <p className="font-serif" style={{ fontSize: 'var(--text-5xl)', color: 'var(--color-text)', lineHeight: 1, marginBottom: 'var(--space-2)' }}>{value}</p>
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-5)' }}>{description}</p>
      <Link href={href} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' as any }}>Read case study →</Link>
    </article>
  )
}
