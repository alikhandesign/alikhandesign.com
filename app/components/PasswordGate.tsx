'use client'
import { useState } from 'react'

interface PasswordGateProps {
  password: string
  children: React.ReactNode
  title: string
  description: string
  inside: string[]
  onUnlock?: () => void
}

export default function PasswordGate({ password, children, title, description, inside, onUnlock }: PasswordGateProps) {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = () => {
    if (input === password) {
      setUnlocked(true)
      setError(false)
      onUnlock?.()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (unlocked) return <>{children}</>

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: 'var(--space-8)',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: 560,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />

      <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>Full Case Study</p>
      <h3 className="font-serif" style={{ fontSize: 'var(--text-xl)', fontWeight: 400, lineHeight: 1.25, marginBottom: 'var(--space-2)' }}>{title}</h3>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>{description}</p>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' as any, marginBottom: '0.6rem' }}>What's inside</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {inside.map(item => (
            <li key={item} style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'block' }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text)', fontWeight: 'var(--font-weight-semibold)' as any }}>Enter password to access</p>
        <input
          type="password"
          className={`password-input${error ? ' error' : ''}`}
          placeholder="Password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          style={{ width: '100%' }}
          aria-label="Case study password"
        />
        <button
          onClick={handleSubmit}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          View full case study <span aria-hidden="true">→</span>
        </button>
        {error && (
          <p role="alert" style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-dark)' }}>Incorrect password. Try again or request access below.</p>
        )}
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          No password?{' '}
          <a href="mailto:ali@alikhandesign.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' as any }}>Request access →</a>
        </p>
      </div>
    </div>
  )
}
