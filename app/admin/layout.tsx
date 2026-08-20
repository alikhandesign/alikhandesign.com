'use client'

import { useState, useEffect } from 'react'

// Centralized auth gate for the entire /admin area. Individual pages under
// /admin no longer need their own password prompt or auth state - they can
// assume they're only ever rendered once this layout has confirmed a valid
// session. This checks the existing httpOnly cookie on mount (via the GET
// endpoint built for exactly this) so a visitor with a valid 7-day session
// doesn't have to re-enter the password on every admin page.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<'checking' | 'authed' | 'unauthed'>('checking')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch('/api/verify-access?type=admin')
      .then(res => res.json())
      .then(data => setStatus(data.unlocked ? 'authed' : 'unauthed'))
      .catch(() => setStatus('unauthed'))
  }, [])

  const submit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, type: 'admin' }),
      })
      if (res.status === 401) {
        setError('Incorrect password.')
        return
      }
      if (!res.ok) throw new Error()
      setStatus('authed')
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (status === 'checking') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Loading…</p>
      </main>
    )
  }

  if (status === 'unauthed') {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <div style={{ width: 320 }}>
          <p className="section-label" style={{ marginBottom: 'var(--space-2)' }}>Admin</p>
          <h1 className="font-serif" style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 400, marginBottom: 'var(--space-6)' }}>Sign in</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            autoFocus
            style={{
              width: '100%', padding: '0.625rem 0.875rem',
              fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-sans)',
              border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              background: 'var(--color-surface)', color: 'var(--color-text)',
              marginBottom: 'var(--space-3)', outline: 'none',
            }}
          />
          {error && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)', marginBottom: 'var(--space-3)' }}>{error}</p>}
          <button
            onClick={submit}
            disabled={submitting || !password}
            style={{
              width: '100%', padding: '0.625rem',
              fontSize: 'var(--font-size-sm)', fontWeight: 500,
              background: 'var(--color-text)', color: 'var(--color-bg)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              cursor: submitting ? 'wait' : 'pointer', fontFamily: 'var(--font-sans)',
            }}
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </main>
    )
  }

  return <>{children}</>
}
