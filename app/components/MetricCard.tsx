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
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        padding: 'var(--space-8)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.15s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
      <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 500 }}>{company}</p>
      <p className="font-serif" style={{ fontSize: '3rem', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>{value}</p>
      <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{description}</p>
      <Link href={href} style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Read the case study →</Link>
    </article>
  )
}
