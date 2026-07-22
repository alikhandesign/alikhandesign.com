'use client'

import { useState } from 'react'

interface PatternTags {
  cited_sources: boolean
  source_count: number
  limitation_handling: boolean
  error_state: boolean
  rate_limited: boolean
}

interface LogEntry {
  ip: string
  sessionId?: string
  messageIndex?: number
  userMessage: string
  assistantMessage: string
  unlocked: boolean
  timestamp: string
  patterns?: PatternTags
}

interface Session {
  sessionId: string
  ip: string
  startTime: string
  endTime: string
  messageCount: number
  entries: LogEntry[]
  flags: {
    cited_sources: boolean
    limitation_handling: boolean
    error_state: boolean
    rate_limited: boolean
    unlocked: boolean
  }
}

function groupBySessions(logs: LogEntry[]): Session[] {
  const sessionMap = new Map<string, LogEntry[]>()

  for (const entry of logs) {
    // Rate-limited entries with no sessionId get their own key by timestamp
    const key = entry.sessionId && entry.sessionId !== 'unknown'
      ? entry.sessionId
      : `anon-${entry.timestamp}`
    if (!sessionMap.has(key)) sessionMap.set(key, [])
    sessionMap.get(key)!.push(entry)
  }

  const sessions: Session[] = []
  for (const [sessionId, entries] of sessionMap) {
    const sorted = [...entries].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    const realEntries = sorted.filter(e => e.userMessage)
    sessions.push({
      sessionId,
      ip: sorted[0].ip,
      startTime: sorted[0].timestamp,
      endTime: sorted[sorted.length - 1].timestamp,
      messageCount: realEntries.length,
      entries: sorted,
      flags: {
        cited_sources: sorted.some(e => e.patterns?.cited_sources),
        limitation_handling: sorted.some(e => e.patterns?.limitation_handling),
        error_state: sorted.some(e => e.patterns?.error_state),
        rate_limited: sorted.some(e => e.patterns?.rate_limited),
        unlocked: sorted.some(e => e.unlocked),
      },
    })
  }

  return sessions.sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  )
}

function Tag({ label, active, color }: { label: string; active: boolean; color?: string }) {
  if (!active) return null
  return (
    <span style={{
      fontSize: 11,
      fontWeight: 500,
      padding: '2px 6px',
      borderRadius: 3,
      background: color ? `${color}18` : 'var(--color-border)',
      color: color ?? 'var(--color-text-muted)',
      letterSpacing: '0.03em',
      flexShrink: 0,
    }}>
      {label}
    </span>
  )
}

export default function AdminLogsPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [sessions, setSessions] = useState<Session[]>([])
  const [rawCount, setRawCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedSession, setExpandedSession] = useState<string | null>(null)
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'cited' | 'limitation' | 'error' | 'rate_limited' | 'unlocked'>('all')

  const fetchLogs = async (pw: string) => {
    setLoading(true)
    setError('')
    try {
      const verifyRes = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw, type: 'admin' }),
      })
      if (verifyRes.status === 401) {
        setError('Incorrect password.')
        setAuthed(false)
        return
      }
      if (!verifyRes.ok) throw new Error('Failed to verify')

      const res = await fetch('/api/admin/logs')
      if (res.status === 401) {
        setError('Incorrect password.')
        setAuthed(false)
        return
      }
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      const logs: LogEntry[] = data.logs || []
      setRawCount(logs.length)
      setSessions(groupBySessions(logs))
      setAuthed(true)
    } catch {
      setError('Failed to load logs. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredSessions = sessions.filter(s => {
    if (filter === 'all') return true
    if (filter === 'cited') return s.flags.cited_sources
    if (filter === 'limitation') return s.flags.limitation_handling
    if (filter === 'error') return s.flags.error_state
    if (filter === 'rate_limited') return s.flags.rate_limited
    if (filter === 'unlocked') return s.flags.unlocked
    return true
  })

  if (!authed) {
    return (
      <div style={{ maxWidth: 420, margin: '6rem auto', padding: '0 var(--space-6)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Admin</p>
        <h1 className="font-serif" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 400, marginBottom: 'var(--space-6)' }}>Chat logs</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <input
            type="password"
            className="password-input"
            placeholder="Admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchLogs(password)}
            style={{ background: 'var(--color-bg)', color: 'var(--color-text)', borderColor: 'var(--color-border)' }}
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
          {error && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-dark)' }}>{error}</p>}
        </div>
      </div>
    )
  }

  const FILTERS: { key: typeof filter; label: string; color?: string }[] = [
    { key: 'all', label: 'All sessions' },
    { key: 'cited', label: 'Citations used', color: '#2563EB' },
    { key: 'limitation', label: 'Limitation hit', color: '#92600A' },
    { key: 'error', label: 'Error state', color: '#B91C1C' },
    { key: 'rate_limited', label: 'Rate limited', color: '#6B21A8' },
    { key: 'unlocked', label: 'Unlocked', color: '#4A6130' },
  ]

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'var(--space-8) var(--space-12)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'var(--space-6)', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Admin</p>
          <h1 className="font-serif" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 400 }}>Chat logs</h1>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''} · {rawCount} messages
          </span>
          <button
            onClick={() => fetchLogs(password)}
            style={{
              fontSize: 'var(--font-size-xs)', padding: '0.4rem 0.75rem',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-muted)',
            }}
          >
            Refresh
          </button>
          <button
            onClick={() => setAuthed(false)}
            style={{
              fontSize: 'var(--font-size-xs)', padding: '0.4rem 0.75rem',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-muted)',
            }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              fontSize: 'var(--font-size-xs)', padding: '0.35rem 0.75rem',
              border: `1px solid ${filter === f.key ? (f.color ?? 'var(--color-text)') : 'var(--color-border)'}`,
              borderRadius: 'var(--radius-sm)',
              background: filter === f.key ? (f.color ? `${f.color}12` : 'var(--color-surface)') : 'transparent',
              color: filter === f.key ? (f.color ?? 'var(--color-text)') : 'var(--color-text-muted)',
              cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: filter === f.key ? 500 : 400,
              transition: 'all 0.12s',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div style={{ padding: 'var(--space-16)', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          No sessions match this filter.
        </div>
      )}

      {/* Session list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {filteredSessions.map(session => {
          const isExpanded = expandedSession === session.sessionId
          const firstMessage = session.entries.find(e => e.userMessage)
          const durationMs = new Date(session.endTime).getTime() - new Date(session.startTime).getTime()
          const durationMin = Math.round(durationMs / 60000)

          return (
            <div
              key={session.sessionId}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
              }}
            >
              {/* Session header */}
              <button
                onClick={() => setExpandedSession(isExpanded ? null : session.sessionId)}
                style={{
                  width: '100%', padding: '0.875rem var(--space-6)',
                  display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                  background: 'transparent', border: 'none',
                  cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left',
                  flexWrap: 'wrap',
                }}
              >
                {/* First message preview */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 500,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    marginBottom: '0.25rem',
                  }}>
                    {firstMessage?.userMessage ?? '— rate limit hit —'}
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      {new Date(session.startTime).toLocaleString()}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)' }}>
                      {session.messageCount} msg{session.messageCount !== 1 ? 's' : ''}
                      {durationMin > 0 ? ` · ${durationMin}m` : ''}
                    </span>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)' }}>
                      {session.ip}
                    </span>
                  </div>
                </div>

                {/* Pattern tags */}
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Tag label="Citations" active={session.flags.cited_sources} color="#2563EB" />
                  <Tag label="Limitation" active={session.flags.limitation_handling} color="#92600A" />
                  <Tag label="Error" active={session.flags.error_state} color="#B91C1C" />
                  <Tag label="Rate limited" active={session.flags.rate_limited} color="#6B21A8" />
                  <Tag label="Unlocked" active={session.flags.unlocked} color="#4A6130" />
                </div>

                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                  {isExpanded ? '▲' : '▼'}
                </span>
              </button>

              {/* Expanded transcript */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--color-border)' }}>
                  {session.entries.map((entry, i) => {
                    // Rate limit entries — no message content
                    if (!entry.userMessage && entry.patterns?.rate_limited) {
                      return (
                        <div key={i} style={{
                          padding: '0.625rem var(--space-6)',
                          borderBottom: i < session.entries.length - 1 ? '1px solid var(--color-border)' : 'none',
                          background: '#6B21A808',
                          display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                        }}>
                          <Tag label="Rate limited" active color="#6B21A8" />
                          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                      )
                    }

                    const entryKey = `${session.sessionId}-${i}`
                    const isEntryExpanded = expandedEntry === entryKey

                    return (
                      <div
                        key={i}
                        style={{
                          borderBottom: i < session.entries.length - 1 ? '1px solid var(--color-border)' : 'none',
                        }}
                      >
                        <button
                          onClick={() => setExpandedEntry(isEntryExpanded ? null : entryKey)}
                          style={{
                            width: '100%', padding: '0.625rem var(--space-6)',
                            display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                            background: 'transparent', border: 'none',
                            cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left',
                          }}
                        >
                          <span style={{
                            fontSize: 11, color: 'var(--color-text-faint)',
                            width: 18, textAlign: 'right', flexShrink: 0,
                          }}>
                            {typeof entry.messageIndex === 'number' ? entry.messageIndex + 1 : i + 1}
                          </span>
                          <p style={{
                            flex: 1, fontSize: 'var(--font-size-xs)', color: 'var(--color-text)',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                          }}>
                            {entry.userMessage}
                          </p>
                          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                            {entry.patterns?.cited_sources && (
                              <Tag label={`${entry.patterns.source_count} src`} active color="#2563EB" />
                            )}
                            <Tag label="Limitation" active={entry.patterns?.limitation_handling ?? false} color="#92600A" />
                            <Tag label="Error" active={entry.patterns?.error_state ?? false} color="#B91C1C" />
                          </div>
                          <span style={{ fontSize: 11, color: 'var(--color-text-faint)', flexShrink: 0 }}>
                            {isEntryExpanded ? '▲' : '▼'}
                          </span>
                        </button>

                        {isEntryExpanded && (
                          <div style={{ padding: '0 var(--space-6) var(--space-4) calc(var(--space-6) + 30px)' }}>
                            <div style={{ marginBottom: 'var(--space-3)' }}>
                              <p style={{
                                fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                                color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.3rem',
                              }}>User</p>
                              <p style={{
                                fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', lineHeight: 1.7,
                                background: 'var(--color-bg)', padding: '0.625rem 0.75rem',
                                borderRadius: 'var(--radius-sm)',
                              }}>
                                {entry.userMessage}
                              </p>
                            </div>
                            <div>
                              <p style={{
                                fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const,
                                color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.3rem',
                              }}>Assistant</p>
                              <p style={{
                                fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', lineHeight: 1.7,
                                whiteSpace: 'pre-wrap', background: 'var(--color-bg)',
                                padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-sm)',
                              }}>
                                {entry.assistantMessage}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer nav */}
      <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-6)' }}>
        <a href="/admin" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
          ← Work manager
        </a>
        <a href="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
          Back to site →
        </a>
      </div>

    </div>
  )
}
