'use client'

import { useState, useEffect } from 'react'

interface LogEntry {
  ip: string
  userMessage: string
  assistantMessage: string
  unlocked: boolean
  timestamp: string
}

export default function AdminLogsPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState<number | null>(null)

  const fetchLogs = async (pw: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/logs?password=${encodeURIComponent(pw)}`)
      if (res.status === 401) {
        setError('Incorrect password.')
        setAuthed(false)
        return
      }
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setLogs(data.logs || [])
      setAuthed(true)
    } catch {
      setError('Failed to load logs. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!authed) {
    return (
      <div style={{ maxWidth: 420, margin: '6rem auto', padding: '0 var(--space-6)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Admin</p>
        <h1 className="font-serif" style={{ fontSize: 'var(--text-3xl)', fontWeight: 400, marginBottom: 'var(--space-6)' }}>Chat Logs</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <input
            type="password"
            className="password-input"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchLogs(password)}
            style={{ background: 'var(--bg)', color: 'var(--text)', borderColor: 'var(--border)' }}
            aria-label="Admin password"
          />
          <button
            onClick={() => fetchLogs(password)}
            className="btn-primary"
            disabled={loading}
            style={{ justifyContent: 'center' }}
          >
            {loading ? 'Loading...' : 'View logs →'}
          </button>
          {error && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-dark)' }}>{error}</p>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'var(--space-8) var(--space-12)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Admin</p>
          <h1 className="font-serif" style={{ fontSize: 'var(--text-3xl)', fontWeight: 400 }}>Chat Logs</h1>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{logs.length} conversations</span>
          <button
            onClick={() => fetchLogs(password)}
            style={{
              fontSize: 'var(--text-xs)', padding: '0.4rem 0.75rem',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              color: 'var(--text-muted)',
            }}
          >
            Refresh
          </button>
          <button
            onClick={() => setAuthed(false)}
            style={{
              fontSize: 'var(--text-xs)', padding: '0.4rem 0.75rem',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              color: 'var(--text-muted)',
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {logs.length === 0 && (
        <div style={{ padding: 'var(--space-16)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--text-base)' }}>
          No conversations yet.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {logs.map((log, i) => (
          <div
            key={i}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                width: '100%', padding: '1rem var(--space-6)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 'var(--space-4)', background: 'transparent', border: 'none',
                cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 'var(--text-base)', color: 'var(--text)', fontWeight: 500,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  marginBottom: '0.2rem',
                }}>
                  {log.userMessage}
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)' }}>
                    {log.ip}
                  </span>
                  {log.unlocked && (
                    <span style={{
                      fontSize: 'var(--text-xs)', color: 'var(--accent)',
                      background: 'var(--accent-bg)', padding: '0 0.4rem',
                      borderRadius: 2, fontWeight: 500,
                    }}>
                      Protected
                    </span>
                  )}
                </div>
              </div>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', flexShrink: 0 }}>
                {expanded === i ? '▲' : '▼'}
              </span>
            </button>

            {expanded === i && (
              <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-6)' }}>
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <p style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.4rem' }}>User</p>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 1.7, background: 'var(--bg)', padding: '0.75rem', borderRadius: 'var(--radius)' }}>{log.userMessage}</p>
                </div>
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.4rem' }}>Assistant</p>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'var(--bg)', padding: '0.75rem', borderRadius: 'var(--radius)' }}>{log.assistantMessage}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
