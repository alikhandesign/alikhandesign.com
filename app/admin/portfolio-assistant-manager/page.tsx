'use client'

import { useState, useEffect, useMemo } from 'react'

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
    sessions.push({
      sessionId,
      ip: sorted[0].ip,
      startTime: sorted[0].timestamp,
      endTime: sorted[sorted.length - 1].timestamp,
      messageCount: sorted.filter(e => e.userMessage).length,
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
      fontSize: 11, fontWeight: 500, padding: '2px 6px', borderRadius: 3,
      background: color ? `${color}18` : 'var(--color-border)',
      color: color ?? 'var(--color-text-muted)', letterSpacing: '0.03em', flexShrink: 0,
    }}>
      {label}
    </span>
  )
}

// ---------- Dashboard tab ----------

function StatCard({ label, value, sublabel, color }: { label: string; value: string; sublabel?: string; color?: string }) {
  return (
    <div style={{
      padding: '1.25rem', background: 'var(--color-surface)',
      border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
    }}>
      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: '0.4rem' }}>{label}</p>
      <p className="font-serif" style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 400, color: color ?? 'var(--color-text)' }}>{value}</p>
      {sublabel && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', marginTop: '0.25rem' }}>{sublabel}</p>}
    </div>
  )
}

function DashboardTab({ sessions, rawCount }: { sessions: Session[]; rawCount: number }) {
  const stats = useMemo(() => {
    const totalSessions = sessions.length
    const allEntries = sessions.flatMap(s => s.entries).filter(e => e.userMessage)
    const totalEntries = allEntries.length

    const citedCount = allEntries.filter(e => e.patterns?.cited_sources).length
    const limitationCount = allEntries.filter(e => e.patterns?.limitation_handling).length
    const errorCount = allEntries.filter(e => e.patterns?.error_state).length
    const rateLimitedSessions = sessions.filter(s => s.flags.rate_limited).length
    const unlockedSessions = sessions.filter(s => s.flags.unlocked).length

    const pct = (n: number, d: number) => d === 0 ? '—' : `${Math.round((n / d) * 100)}%`

    // Sessions per day, most recent 14 days present in the data
    const dayMap = new Map<string, number>()
    for (const s of sessions) {
      const day = new Date(s.startTime).toISOString().slice(0, 10)
      dayMap.set(day, (dayMap.get(day) ?? 0) + 1)
    }
    const days = Array.from(dayMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-14)
    const maxDayCount = Math.max(1, ...days.map(([, c]) => c))

    return {
      totalSessions, totalEntries, citedCount, limitationCount, errorCount,
      rateLimitedSessions, unlockedSessions, pct, days, maxDayCount,
    }
  }, [sessions])

  return (
    <div>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
        Computed from the most recent {rawCount} logged messages ({stats.totalSessions} sessions). The underlying log only retains the last 100 entries, so this reflects recent activity, not full history.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-8)' }}>
        <StatCard label="Sessions" value={String(stats.totalSessions)} />
        <StatCard label="Messages" value={String(stats.totalEntries)} />
        <StatCard label="Citation rate" value={stats.pct(stats.citedCount, stats.totalEntries)} sublabel={`${stats.citedCount} of ${stats.totalEntries} messages`} color="#2563EB" />
        <StatCard label="Limitation hit" value={stats.pct(stats.limitationCount, stats.totalEntries)} sublabel={`${stats.limitationCount} of ${stats.totalEntries} messages`} color="#92600A" />
        <StatCard label="Error state" value={stats.pct(stats.errorCount, stats.totalEntries)} sublabel={`${stats.errorCount} of ${stats.totalEntries} messages`} color="#B91C1C" />
        <StatCard label="Rate limited" value={String(stats.rateLimitedSessions)} sublabel="sessions" color="#6B21A8" />
        <StatCard label="Unlocked" value={String(stats.unlockedSessions)} sublabel="sessions" color="#4A6130" />
      </div>

      <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>Sessions per day (last {stats.days.length} days with activity)</p>
        {stats.days.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-faint)' }}>No session data yet.</p>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
            {stats.days.map(([day, count]) => (
              <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{
                  width: '100%', maxWidth: 28,
                  height: `${Math.max(4, (count / stats.maxDayCount) * 80)}px`,
                  background: 'var(--color-accent)', borderRadius: '2px 2px 0 0',
                }} title={`${day}: ${count} session${count !== 1 ? 's' : ''}`} />
                <span style={{ fontSize: 10, color: 'var(--color-text-faint)' }}>{day.slice(5)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 'var(--space-6)', padding: '1rem 1.25rem', background: 'var(--color-bg)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', lineHeight: 1.6 }}>
          These metrics use the same coarse pattern tags the chat API already logs — they can't yet show which specific guardrail fired (password, interview confirm/deny, hostility ladder, etc.), only generic buckets like "error state." Richer, guardrail-specific tracking is a planned follow-up.
        </p>
      </div>
    </div>
  )
}

// ---------- Logs tab ----------

function LogsTab({ sessions, rawCount, onRefresh, loading }: { sessions: Session[]; rawCount: number; onRefresh: () => void; loading: boolean }) {
  const [expandedSession, setExpandedSession] = useState<string | null>(null)
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'cited' | 'limitation' | 'error' | 'rate_limited' | 'unlocked'>('all')

  const filteredSessions = sessions.filter(s => {
    if (filter === 'all') return true
    if (filter === 'cited') return s.flags.cited_sources
    if (filter === 'limitation') return s.flags.limitation_handling
    if (filter === 'error') return s.flags.error_state
    if (filter === 'rate_limited') return s.flags.rate_limited
    if (filter === 'unlocked') return s.flags.unlocked
    return true
  })

  const FILTERS: { key: typeof filter; label: string; color?: string }[] = [
    { key: 'all', label: 'All sessions' },
    { key: 'cited', label: 'Citations used', color: '#2563EB' },
    { key: 'limitation', label: 'Limitation hit', color: '#92600A' },
    { key: 'error', label: 'Error state', color: '#B91C1C' },
    { key: 'rate_limited', label: 'Rate limited', color: '#6B21A8' },
    { key: 'unlocked', label: 'Unlocked', color: '#4A6130' },
  ]

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '0.75rem' }}>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
          {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''} · {rawCount} messages
        </span>
        <button
          onClick={onRefresh}
          disabled={loading}
          style={{
            fontSize: 'var(--font-size-xs)', padding: '0.4rem 0.75rem',
            border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
            background: 'transparent', cursor: loading ? 'wait' : 'pointer', fontFamily: 'var(--font-sans)',
            color: 'var(--color-text-muted)',
          }}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {filteredSessions.map(session => {
          const isExpanded = expandedSession === session.sessionId
          const firstMessage = session.entries.find(e => e.userMessage)
          const durationMs = new Date(session.endTime).getTime() - new Date(session.startTime).getTime()
          const durationMin = Math.round(durationMs / 60000)

          return (
            <div key={session.sessionId} style={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)', overflow: 'hidden',
            }}>
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
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 500,
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.25rem',
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
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)' }}>{session.ip}</span>
                  </div>
                </div>

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

              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--color-border)' }}>
                  {session.entries.map((entry, i) => {
                    if (!entry.userMessage && entry.patterns?.rate_limited) {
                      return (
                        <div key={i} style={{
                          padding: '0.625rem var(--space-6)',
                          borderBottom: i < session.entries.length - 1 ? '1px solid var(--color-border)' : 'none',
                          background: '#6B21A808', display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
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
                      <div key={i} style={{ borderBottom: i < session.entries.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                        <button
                          onClick={() => setExpandedEntry(isEntryExpanded ? null : entryKey)}
                          style={{
                            width: '100%', padding: '0.625rem var(--space-6)',
                            display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                            background: 'transparent', border: 'none',
                            cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left',
                          }}
                        >
                          <span style={{ fontSize: 11, color: 'var(--color-text-faint)', width: 18, textAlign: 'right', flexShrink: 0 }}>
                            {typeof entry.messageIndex === 'number' ? entry.messageIndex + 1 : i + 1}
                          </span>
                          <p style={{ flex: 1, fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
                              <p style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.3rem' }}>User</p>
                              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', lineHeight: 1.7, background: 'var(--color-bg)', padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                                {entry.userMessage}
                              </p>
                            </div>
                            <div>
                              <p style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.3rem' }}>Assistant</p>
                              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text)', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'var(--color-bg)', padding: '0.625rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
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
    </div>
  )
}

// ---------- Page ----------

export default function PortfolioAssistantManagerPage() {
  const [tab, setTab] = useState<'dashboard' | 'logs'>('dashboard')
  const [sessions, setSessions] = useState<Session[]>([])
  const [rawCount, setRawCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchLogs = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/logs')
      if (!res.ok) throw new Error()
      const data = await res.json()
      const logs: LogEntry[] = data.logs || []
      setRawCount(logs.length)
      setSessions(groupBySessions(logs))
    } catch {
      setError('Failed to load logs. Try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const TABS: { key: typeof tab; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'logs', label: 'Logs' },
  ]

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'var(--space-8) var(--space-12)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Admin</p>
        <h1 className="font-serif" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 400 }}>Portfolio Assistant manager</h1>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '0.625rem 1rem', fontSize: 'var(--font-size-sm)',
              fontWeight: tab === t.key ? 500 : 400,
              color: tab === t.key ? 'var(--color-text)' : 'var(--color-text-muted)',
              background: 'transparent', border: 'none',
              borderBottom: tab === t.key ? '2px solid var(--color-text)' : '2px solid transparent',
              marginBottom: -1, cursor: 'pointer', fontFamily: 'var(--font-sans)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading && sessions.length === 0 && (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Loading…</p>
      )}
      {error && (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)' }}>{error}</p>
      )}

      {!loading || sessions.length > 0 ? (
        tab === 'dashboard'
          ? <DashboardTab sessions={sessions} rawCount={rawCount} />
          : <LogsTab sessions={sessions} rawCount={rawCount} onRefresh={fetchLogs} loading={loading} />
      ) : null}

      <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-6)' }}>
        <a href="/admin" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
          ← Admin home
        </a>
        <a href="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
          Back to site →
        </a>
      </div>
    </div>
  )
}
