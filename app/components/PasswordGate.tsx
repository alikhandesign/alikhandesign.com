'use client'
import { useState, useEffect } from 'react'
import SectionLabel from './SectionLabel'

interface PasswordGateProps {
  children: React.ReactNode
  title: string
  description: string
  inside: string[]
  onUnlock?: () => void
  type?: 'case-study' | 'project'
}

export default function PasswordGate({ children, title, description, inside, onUnlock, type = 'case-study' }: PasswordGateProps) {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [checking, setChecking] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)

  // On mount, check whether this visitor already has a valid, unexpired
  // access cookie (e.g. from unlocking the chatbot or another case study
  // page) — so they aren't asked for the password again within the 7-day
  // window.
  useEffect(() => {
    let cancelled = false
    fetch('/api/verify-access?type=case-study')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (cancelled) return
        if (data?.unlocked) {
          setUnlocked(true)
          onUnlock?.()
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setChecking(false) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    if (!input || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input, type: 'case-study' }),
      })
      if (res.ok) {
        setUnlocked(true)
        setError(false)
        onUnlock?.()
      } else {
        setError(true)
        setTimeout(() => setError(false), 2000)
      }
    } catch {
      setError(true)
      setTimeout(() => setError(false), 2000)
    } finally {
      setSubmitting(false)
    }
  }

  if (checking) return null
  if (unlocked) return <>{children}</>

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-8)',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: 560,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--color-accent)' }} />

      <SectionLabel label={type === 'project' ? 'Full Project' : 'Full Case Study'} />
      <h2 className="font-serif" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 400, lineHeight: 1.25, marginBottom: 'var(--space-2)' }}>{title}</h2>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>{description}</p>

      <div style={{ marginBottom: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-medium)' as any, marginBottom: '0.6rem' }}>What's inside</p>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {inside.map(item => (
            <li key={item} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0, display: 'block' }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', fontWeight: 'var(--font-weight-semibold)' as any }}>Enter password to access</p>
        <input
          type="password"
          id="password-input"
          className={`password-input${error ? ' error' : ''}`}
          aria-describedby={error ? 'password-error' : undefined}
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
          disabled={submitting}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          {type === 'project' ? 'View full project' : 'View full case study'} <span aria-hidden="true">→</span>
        </button>
        {error && (
          <p id="password-error" role="alert" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-dark)' }}>Incorrect password. Try again or request access below.</p>
        )}
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
          No password?{' '}
          <a href="mailto:ali@alikhandesign.com" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' as any }}>Request access →</a>
        </p>
      </div>
    </div>
  )
}
