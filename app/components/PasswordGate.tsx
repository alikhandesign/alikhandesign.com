'use client'
import { useState } from 'react'

interface PasswordGateProps {
  password: string
  children: React.ReactNode
  title: string
  cta: string
  inside: string[]
  onUnlock?: () => void
}

export default function PasswordGate({ password, children, title, cta, inside, onUnlock }: PasswordGateProps) {
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
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: 560,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />

      <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>Full Case Study</p>
      <h3 className="font-serif" style={{ fontSize: '1.3rem', fontWeight: 400, lineHeight: 1.25, marginBottom: '0.5rem' }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{cta}</p>

      <div style={{ marginBottom: '1.75rem' }}>
        <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.6rem' }}>What's inside</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {inside.map(item => (
            <li key={item} style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'block' }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <p style={{ fontSize: 12, color: 'var(--text)', fontWeight: 600 }}>Enter password to access</p>
        <input
          type="password"
          className="password-input"
          placeholder="Password"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          style={{
            border: error ? '1.5px solid #e53e3e' : undefined,
            width: '100%',
          }}
          aria-label="Case study password"
        />
        <button
          onClick={handleSubmit}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center' }}
        >
          View Full Case Study <span aria-hidden="true">→</span>
        </button>
        {error && (
          <p style={{ fontSize: 12, color: '#e53e3e' }}>Incorrect password. Try again or request access below.</p>
        )}
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          No password?{' '}
          <a href="mailto:ali@alikhandesign.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Request access</a>
        </p>
      </div>
    </div>
  )
}
