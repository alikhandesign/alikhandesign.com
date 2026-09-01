'use client'

import { useState, useEffect, useMemo, type CSSProperties } from 'react'

interface PatternTags {
  cited_sources: boolean
  source_count: number
  honest_uncertainty: boolean
  guardrail_triggered: 'password' | 'interview_confirm_deny' | 'rif_disclosure' | 'hostility_step_1' | 'hostility_final_disengage' | 'severity_override_forced' | null
  override_attempted: boolean
  rif_possible_leak: boolean
  error_state: boolean
  rate_limited: boolean
  is_test_request?: boolean
}

interface AudienceEstimate {
  audience: 'recruiter' | 'hiring_manager' | 'product_manager' | 'engineer' | 'unknown'
  confidence: number
  depth: 'surface' | 'technical' | 'business'
  suggest_contact: boolean
  fit_verdict?: 'strong_fit' | 'partial_fit' | 'no_fit' | 'not_applicable'
  case_study_pointer?: string
  register_used?: 'fast_direct' | 'exploratory'
}

interface LogEntry {
  ip: string
  country?: string | null
  region?: string | null
  city?: string | null
  sessionId?: string
  messageIndex?: number
  userMessage: string
  assistantMessage: string
  unlocked: boolean
  timestamp: string
  commitSha?: string
  patterns?: PatternTags
  audienceEstimate?: AudienceEstimate | null
  feedback?: 'up' | 'down' // attached at correlation time from the separate feedback records, not logged directly
}

interface FeedbackRecord {
  sessionId: string
  messageIndex: number
  rating: 'up' | 'down'
  timestamp: string
}

interface Session {
  sessionId: string
  ip: string
  country: string | null
  region: string | null
  city: string | null
  startTime: string
  endTime: string
  messageCount: number
  entries: LogEntry[]
  isTest: boolean
  finalAudience: AudienceEstimate | null // the most recent entry's estimate - the estimate evolves turn to turn, so this is the session's latest, most up-to-date read
  flags: {
    cited_sources: boolean
    honest_uncertainty: boolean
    guardrails_triggered: string[]
    override_attempted: boolean
    rif_possible_leak: boolean
    error_state: boolean
    rate_limited: boolean
    unlocked: boolean
    thumbs_up: boolean
    thumbs_down: boolean
  }
}

type ClearIntent = 'since-10m' | 'since-1h' | 'sessions' | 'all'

const fieldLabelStyle: CSSProperties = {
  display: 'block',
  fontSize: 11,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--color-text-muted)',
  fontWeight: 500,
  marginBottom: '0.3rem',
}

const compactInputStyle: CSSProperties = {
  padding: '0.3rem 0.5rem',
  fontSize: 'var(--font-size-xs)',
  fontFamily: 'var(--font-sans)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-surface)',
  color: 'var(--color-text)',
  outline: 'none',
}

function firstGeo(entries: LogEntry[], field: 'country' | 'region' | 'city'): string | null {
  for (const entry of entries) {
    const value = entry[field]
    if (value) return value
  }
  return null
}

function formatLocation(session: { city: string | null; region: string | null; country: string | null }): string {
  const parts = [session.city, session.region, session.country].filter(Boolean)
  return parts.length > 0 ? parts.join(', ') : '—'
}

function localDayKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function last14LocalDays(): { key: string; label: string }[] {
  const days: { key: string; label: string }[] = []
  const now = new Date()
  for (let i = 13; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    days.push({
      key: localDayKey(date),
      label: `${date.getMonth() + 1}/${date.getDate()}`,
    })
  }
  return days
}

function groupBySessions(logs: LogEntry[], feedback: FeedbackRecord[] = []): Session[] {
  // Feedback is stored separately from logs and correlated here by matching
  // sessionId + messageIndex - see app/api/chat/feedback/route.ts for why.
  const feedbackMap = new Map<string, 'up' | 'down'>()
  for (const f of feedback) {
    feedbackMap.set(`${f.sessionId}:${f.messageIndex}`, f.rating)
  }

  const sessionMap = new Map<string, LogEntry[]>()

  for (const entry of logs) {
    const key = entry.sessionId && entry.sessionId !== 'unknown'
      ? entry.sessionId
      : `anon-${entry.timestamp}`
    if (!sessionMap.has(key)) sessionMap.set(key, [])
    const withFeedback: LogEntry = { ...entry }
    if (entry.sessionId && typeof entry.messageIndex === 'number') {
      const rating = feedbackMap.get(`${entry.sessionId}:${entry.messageIndex}`)
      if (rating) withFeedback.feedback = rating
    }
    sessionMap.get(key)!.push(withFeedback)
  }

  const sessions: Session[] = []
  for (const [sessionId, entries] of sessionMap) {
    const sorted = [...entries].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    sessions.push({
      sessionId,
      ip: sorted[0].ip,
      country: firstGeo(sorted, 'country'),
      region: firstGeo(sorted, 'region'),
      city: firstGeo(sorted, 'city'),
      startTime: sorted[0].timestamp,
      endTime: sorted[sorted.length - 1].timestamp,
      messageCount: sorted.filter(e => e.userMessage).length,
      entries: sorted,
      isTest: sorted.some(e => e.patterns?.is_test_request),
      finalAudience: [...sorted].reverse().find(e => e.audienceEstimate)?.audienceEstimate ?? null,
      flags: {
        cited_sources: sorted.some(e => e.patterns?.cited_sources),
        honest_uncertainty: sorted.some(e => e.patterns?.honest_uncertainty),
        guardrails_triggered: Array.from(new Set(
          sorted
            .map(e => e.patterns?.guardrail_triggered)
            .filter(g => typeof g === 'string')
        )) as string[],
        override_attempted: sorted.some(e => e.patterns?.override_attempted),
        rif_possible_leak: sorted.some(e => e.patterns?.rif_possible_leak),
        thumbs_up: sorted.some(e => e.feedback === 'up'),
        thumbs_down: sorted.some(e => e.feedback === 'down'),
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
  const [includeTest, setIncludeTest] = useState(false)

  const visibleSessions = useMemo(
    () => includeTest ? sessions : sessions.filter(s => !s.isTest),
    [sessions, includeTest],
  )
  const hiddenTestCount = sessions.length - visibleSessions.length

  const stats = useMemo(() => {
    const totalSessions = visibleSessions.length
    const uniqueIps = new Set(visibleSessions.map(s => s.ip)).size
    const allEntries = visibleSessions.flatMap(s => s.entries).filter(e => e.userMessage)
    const totalEntries = allEntries.length

    const citedCount = allEntries.filter(e => e.patterns?.cited_sources).length
    const uncertaintyCount = allEntries.filter(e => e.patterns?.honest_uncertainty).length
    const errorCount = allEntries.filter(e => e.patterns?.error_state).length
    const rateLimitedSessions = visibleSessions.filter(s => s.flags.rate_limited).length
    const unlockedSessions = visibleSessions.filter(s => s.flags.unlocked).length
    const overrideAttemptSessions = visibleSessions.filter(s => s.flags.override_attempted).length
    const rifLeakSessions = visibleSessions.filter(s => s.flags.rif_possible_leak).length
    const thumbsUpCount = allEntries.filter(e => e.feedback === 'up').length
    const thumbsDownCount = allEntries.filter(e => e.feedback === 'down').length
    const totalFeedback = thumbsUpCount + thumbsDownCount

    const guardrailCounts = new Map<string, number>()
    for (const e of allEntries) {
      const g = e.patterns?.guardrail_triggered
      if (g) guardrailCounts.set(g, (guardrailCounts.get(g) ?? 0) + 1)
    }
    const guardrailLabels: Record<string, string> = {
      password: 'Password guardrail',
      interview_confirm_deny: 'Interview confirm/deny',
      rif_disclosure: 'RIF disclosure (legitimate)',
      hostility_step_1: 'Hostility ladder, step 1',
      hostility_final_disengage: 'Hostility ladder, disengaged',
      severity_override_forced: 'Severity override (forced)',
    }

    const audienceCounts = new Map<string, number>()
    for (const s of visibleSessions) {
      const a = s.finalAudience?.audience ?? 'no estimate'
      audienceCounts.set(a, (audienceCounts.get(a) ?? 0) + 1)
    }
    const audienceLabels: Record<string, string> = {
      recruiter: 'Recruiter',
      hiring_manager: 'Hiring manager',
      product_manager: 'Product manager',
      engineer: 'Engineer',
      unknown: 'Unknown',
      'no estimate': 'No estimate recorded',
    }
    const suggestContactCount = visibleSessions.filter(s => s.finalAudience?.suggest_contact).length

    const fitVerdictCounts = new Map<string, number>()
    for (const s of visibleSessions) {
      const v = s.finalAudience?.fit_verdict
      if (v && v !== 'not_applicable') {
        fitVerdictCounts.set(v, (fitVerdictCounts.get(v) ?? 0) + 1)
      }
    }
    const fitVerdictLabels: Record<string, string> = {
      strong_fit: 'Strong fit',
      partial_fit: 'Partial fit',
      no_fit: 'No fit',
    }
    const caseStudyPointerCount = visibleSessions.filter(
      s => s.finalAudience?.case_study_pointer && s.finalAudience.case_study_pointer !== ''
    ).length

    const REGISTER_MISMATCH_CONFIDENCE_THRESHOLD = 0.4
    const registerCheckedEntries = allEntries.filter(e => e.audienceEstimate?.register_used)
    const registerMismatchCount = registerCheckedEntries.filter(
      e =>
        (e.audienceEstimate!.confidence ?? 1) < REGISTER_MISMATCH_CONFIDENCE_THRESHOLD &&
        e.audienceEstimate!.register_used === 'exploratory'
    ).length

    const locationCounts = new Map<string, number>()
    const cityCounts = new Map<string, number>()
    for (const s of visibleSessions) {
      const country = s.country || 'Unknown'
      locationCounts.set(country, (locationCounts.get(country) ?? 0) + 1)
      if (s.city) {
        const cityLabel = s.country ? `${s.city}, ${s.country}` : s.city
        cityCounts.set(cityLabel, (cityCounts.get(cityLabel) ?? 0) + 1)
      }
    }

    const pct = (n: number, d: number) => d === 0 ? '—' : `${Math.round((n / d) * 100)}%`

    const calendarDays = last14LocalDays()
    const sessionsByDay = new Map<string, number>()
    const ipsByDay = new Map<string, Set<string>>()
    for (const day of calendarDays) {
      sessionsByDay.set(day.key, 0)
      ipsByDay.set(day.key, new Set())
    }
    for (const s of visibleSessions) {
      const key = localDayKey(new Date(s.startTime))
      if (!sessionsByDay.has(key)) continue
      sessionsByDay.set(key, (sessionsByDay.get(key) ?? 0) + 1)
      ipsByDay.get(key)!.add(s.ip)
    }
    const days = calendarDays.map(day => ({
      key: day.key,
      label: day.label,
      sessions: sessionsByDay.get(day.key) ?? 0,
      uniqueIps: ipsByDay.get(day.key)?.size ?? 0,
    }))
    const maxDayCount = Math.max(1, ...days.flatMap(d => [d.sessions, d.uniqueIps]))

    return {
      totalSessions, uniqueIps, totalEntries, citedCount, uncertaintyCount, errorCount,
      rateLimitedSessions, unlockedSessions, overrideAttemptSessions, rifLeakSessions,
      thumbsUpCount, thumbsDownCount, totalFeedback,
      guardrailCounts, guardrailLabels, audienceCounts, audienceLabels, suggestContactCount,
      fitVerdictCounts, fitVerdictLabels, caseStudyPointerCount,
      registerCheckedEntries: registerCheckedEntries.length, registerMismatchCount,
      locationCounts, cityCounts,
      pct, days, maxDayCount,
    }
  }, [visibleSessions])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
          Computed from the most recent {rawCount} logged messages ({stats.totalSessions} sessions). Retention is the last 1000 entries. Chat sessions only — not site pageviews.
        </p>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
          <input
            type="checkbox"
            checked={includeTest}
            onChange={e => setIncludeTest(e.target.checked)}
          />
          Include test requests{hiddenTestCount > 0 ? ` (${hiddenTestCount} hidden)` : ''}
        </label>
      </div>

      {stats.rifLeakSessions > 0 && (
        <div style={{
          padding: '1rem 1.25rem', marginBottom: 'var(--space-6)',
          background: '#B91C1C12', border: '1px solid #B91C1C',
          borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
        }}>
          <span style={{ fontSize: 20 }}>⚠</span>
          <div>
            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: '#B91C1C' }}>
              {stats.rifLeakSessions} session{stats.rifLeakSessions !== 1 ? 's' : ''} with a possible RIF disclosure leak
            </p>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 2 }}>
              The reduction-in-force fact was mentioned without the user asking about departure directly — check the Logs tab for these sessions.
            </p>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        <StatCard label="Sessions" value={String(stats.totalSessions)} />
        <StatCard label="Unique IPs" value={String(stats.uniqueIps)} sublabel="distinct chat visitors" />
        <StatCard label="Messages" value={String(stats.totalEntries)} />
        <StatCard label="Citation rate" value={stats.pct(stats.citedCount, stats.totalEntries)} sublabel={`${stats.citedCount} of ${stats.totalEntries} messages`} color="#2563EB" />
        <StatCard label="Honest uncertainty" value={stats.pct(stats.uncertaintyCount, stats.totalEntries)} sublabel={`${stats.uncertaintyCount} of ${stats.totalEntries} messages`} color="#92600A" />
        <StatCard label="Error state" value={stats.pct(stats.errorCount, stats.totalEntries)} sublabel={`${stats.errorCount} of ${stats.totalEntries} messages`} color="#B91C1C" />
        <StatCard label="Override attempts" value={String(stats.overrideAttemptSessions)} sublabel="sessions" color="#6B21A8" />
        <StatCard label="Rate limited" value={String(stats.rateLimitedSessions)} sublabel="sessions" color="#6B21A8" />
        <StatCard label="Unlocked" value={String(stats.unlockedSessions)} sublabel="sessions" color="#4A6130" />
        <StatCard
          label="Feedback"
          value={stats.totalFeedback === 0 ? '—' : `${stats.thumbsUpCount}↑ / ${stats.thumbsDownCount}↓`}
          sublabel={stats.totalFeedback === 0 ? 'no votes yet' : `${stats.pct(stats.thumbsDownCount, stats.totalFeedback)} thumbs down`}
          color={stats.thumbsDownCount > 0 ? '#B91C1C' : '#4A6130'}
        />
      </div>

      <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          Locations (chat sessions) — from Vercel request headers on new logs; older entries show as Unknown
        </p>
        {stats.locationCounts.size === 0 ? (
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-faint)' }}>No sessions in this window.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 'var(--space-6)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {Array.from(stats.locationCounts.entries()).sort((a, b) => b[1] - a[1]).map(([key, count]) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                  <span style={{ color: 'var(--color-text)' }}>{key}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{count}</span>
                </div>
              ))}
            </div>
            {stats.cityCounts.size > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {Array.from(stats.cityCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([key, count]) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                    <span style={{ color: 'var(--color-text)' }}>{key}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>Guardrails triggered</p>
        {stats.guardrailCounts.size === 0 ? (
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-faint)' }}>None in this window.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {Array.from(stats.guardrailCounts.entries()).sort((a, b) => b[1] - a[1]).map(([key, count]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--color-text)' }}>{stats.guardrailLabels[key] ?? key}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          Audience estimate (by session, most recent estimate) — {stats.suggestContactCount} session{stats.suggestContactCount !== 1 ? 's' : ''} flagged a contact-suggestion moment
        </p>
        {stats.audienceCounts.size === 0 ? (
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-faint)' }}>No sessions in this window.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {Array.from(stats.audienceCounts.entries()).sort((a, b) => b[1] - a[1]).map(([key, count]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--color-text)' }}>{stats.audienceLabels[key] ?? key}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          Fit verdicts (JD-matching exchanges only) — {stats.caseStudyPointerCount} session{stats.caseStudyPointerCount !== 1 ? 's' : ''} pointed to a specific case study
        </p>
        {stats.fitVerdictCounts.size === 0 ? (
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-faint)' }}>No JD-matching exchanges in this window.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {Array.from(stats.fitVerdictCounts.entries()).sort((a, b) => b[1] - a[1]).map(([key, count]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
                <span style={{ color: 'var(--color-text)' }}>{stats.fitVerdictLabels[key] ?? key}</span>
                <span style={{ color: 'var(--color-text-muted)' }}>{count}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-6)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          Register consistency — checks the one explicit rule: low confidence should default to the fast, direct register
        </p>
        {stats.registerCheckedEntries === 0 ? (
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-faint)' }}>No entries with this field yet.</p>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)' }}>
            <span style={{ color: 'var(--color-text)' }}>
              {stats.registerMismatchCount} mismatch{stats.registerMismatchCount !== 1 ? 'es' : ''} out of {stats.registerCheckedEntries} checked
            </span>
            <span style={{ color: stats.registerMismatchCount > 0 ? '#B91C1C' : 'var(--color-text-muted)' }}>
              {stats.pct(stats.registerMismatchCount, stats.registerCheckedEntries)}
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '1.25rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
          Chat sessions per day (last 14 calendar days, local time)
        </p>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', marginBottom: 'var(--space-4)' }}>
          Quiet days are shown as empty. Counts chat sessions, not site pageviews.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-3)', fontSize: 11, color: 'var(--color-text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, background: 'var(--color-accent)', borderRadius: 1 }} />
            Sessions
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, background: 'var(--color-text-muted)', borderRadius: 1 }} />
            Unique IPs
          </span>
        </div>
        <div
          role="img"
          aria-label={stats.days.map(d => `${d.label}: ${d.sessions} sessions, ${d.uniqueIps} unique IPs`).join('. ')}
          style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 108 }}
        >
          {stats.days.map(day => (
            <div key={day.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 0 }}>
              <div
                style={{ display: 'flex', alignItems: 'flex-end', gap: 2, width: '100%', maxWidth: 32, height: 80 }}
                title={`${day.key}: ${day.sessions} session${day.sessions !== 1 ? 's' : ''}, ${day.uniqueIps} unique IP${day.uniqueIps !== 1 ? 's' : ''}`}
              >
                <div style={{
                  flex: 1,
                  height: day.sessions === 0 ? 2 : `${Math.max(4, (day.sessions / stats.maxDayCount) * 80)}px`,
                  background: day.sessions === 0 ? 'var(--color-border)' : 'var(--color-accent)',
                  borderRadius: '2px 2px 0 0',
                }} />
                <div style={{
                  flex: 1,
                  height: day.uniqueIps === 0 ? 2 : `${Math.max(4, (day.uniqueIps / stats.maxDayCount) * 80)}px`,
                  background: day.uniqueIps === 0 ? 'var(--color-border)' : 'var(--color-text-muted)',
                  borderRadius: '2px 2px 0 0',
                }} />
              </div>
              <span style={{ fontSize: 10, color: 'var(--color-text-faint)' }}>{day.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-6)', padding: '1rem 1.25rem', background: 'var(--color-bg)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', lineHeight: 1.6 }}>
          These metrics now track specific guardrails by name (password, interview confirm/deny, RIF disclosure, hostility ladder), detected by matching the exact mandated response templates. This is reliable for guardrails with a fixed template, but can't catch confidence-calibration failures like fabricated quotes or single-example generalization — those aren't detectable by keyword matching at all, and are covered by the eval framework instead, not live monitoring.
        </p>
      </div>
    </div>
  )
}

// ---------- Logs tab ----------

function LogsTab({
  sessions,
  rawCount,
  onRefresh,
  loading,
  selectedIds,
  onSelectedIdsChange,
}: {
  sessions: Session[]
  rawCount: number
  onRefresh: () => void
  loading: boolean
  selectedIds: Set<string>
  onSelectedIdsChange: (ids: Set<string>) => void
}) {
  const [expandedSession, setExpandedSession] = useState<string | null>(null)
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'cited' | 'guardrail' | 'rif_leak' | 'error' | 'rate_limited' | 'unlocked' | 'thumbs_down' | 'test'>('all')
  const [search, setSearch] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [countryFilter, setCountryFilter] = useState('')

  const countries = useMemo(() => {
    const set = new Set<string>()
    for (const s of sessions) set.add(s.country || 'Unknown')
    return Array.from(set).sort()
  }, [sessions])

  const filteredSessions = sessions.filter(s => {
    if (filter === 'all') {}
    else if (filter === 'cited' && !s.flags.cited_sources) return false
    else if (filter === 'guardrail' && s.flags.guardrails_triggered.length === 0) return false
    else if (filter === 'rif_leak' && !s.flags.rif_possible_leak) return false
    else if (filter === 'error' && !s.flags.error_state) return false
    else if (filter === 'rate_limited' && !s.flags.rate_limited) return false
    else if (filter === 'unlocked' && !s.flags.unlocked) return false
    else if (filter === 'thumbs_down' && !s.flags.thumbs_down) return false
    else if (filter === 'test' && !s.isTest) return false

    if (search.trim()) {
      const q = search.toLowerCase()
      const match = s.entries.some(e =>
        e.userMessage?.toLowerCase().includes(q) ||
        e.assistantMessage?.toLowerCase().includes(q)
      )
      if (!match) return false
    }

    if (countryFilter) {
      const country = s.country || 'Unknown'
      if (country !== countryFilter) return false
    }

    if (dateFrom) {
      if (new Date(s.startTime) < new Date(dateFrom)) return false
    }
    if (dateTo) {
      const to = new Date(dateTo)
      to.setHours(23, 59, 59, 999)
      if (new Date(s.startTime) > to) return false
    }

    return true
  })

  const filteredUniqueIps = useMemo(
    () => new Set(filteredSessions.map(s => s.ip)).size,
    [filteredSessions],
  )

  const FILTERS: { key: typeof filter; label: string; color?: string }[] = [
    { key: 'all', label: 'All sessions' },
    { key: 'cited', label: 'Citations used', color: '#2563EB' },
    { key: 'guardrail', label: 'Guardrail triggered', color: '#92600A' },
    { key: 'rif_leak', label: 'Possible RIF leak', color: '#B91C1C' },
    { key: 'error', label: 'Error state', color: '#B91C1C' },
    { key: 'rate_limited', label: 'Rate limited', color: '#6B21A8' },
    { key: 'unlocked', label: 'Unlocked', color: '#4A6130' },
    { key: 'thumbs_down', label: 'Thumbs down', color: '#B91C1C' },
    { key: 'test', label: 'Test traffic', color: '#6B7280' },
  ]

  const filtersActive = Boolean(search || dateFrom || dateTo || countryFilter)

  const toggleSelected = (sessionId: string, checked: boolean) => {
    const next = new Set(selectedIds)
    if (checked) next.add(sessionId)
    else next.delete(sessionId)
    onSelectedIdsChange(next)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: '0.75rem' }}>
        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
          {filteredSessions.length} session{filteredSessions.length !== 1 ? 's' : ''} · {rawCount} messages · {filteredUniqueIps} unique IPs
          {selectedIds.size > 0 ? ` · ${selectedIds.size} selected` : ''}
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

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 'var(--space-4)' }}>
        <div style={{ flex: '2 1 180px' }}>
          <label htmlFor="log-search" style={fieldLabelStyle}>Search</label>
          <input
            id="log-search"
            type="text"
            placeholder="Search messages…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...compactInputStyle, width: '100%' }}
          />
        </div>
        <div style={{ flex: '1 1 140px' }}>
          <label htmlFor="log-country" style={fieldLabelStyle}>Country</label>
          <select
            id="log-country"
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
            style={{ ...compactInputStyle, width: '100%' }}
          >
            <option value="">All countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <fieldset style={{
          flex: '0 1 auto', margin: 0, padding: 0, border: 'none',
          display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-end',
        }}>
          <legend style={{ ...fieldLabelStyle, padding: 0 }}>Date range</legend>
          <div>
            <label htmlFor="log-date-from" style={{ ...fieldLabelStyle, textTransform: 'none', letterSpacing: 0 }}>From</label>
            <input
              id="log-date-from"
              type="date"
              value={dateFrom}
              onChange={e => setDateFrom(e.target.value)}
              style={{ ...compactInputStyle, width: 132 }}
            />
          </div>
          <div>
            <label htmlFor="log-date-to" style={{ ...fieldLabelStyle, textTransform: 'none', letterSpacing: 0 }}>To</label>
            <input
              id="log-date-to"
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              style={{ ...compactInputStyle, width: 132 }}
            />
          </div>
        </fieldset>
        {filtersActive && (
          <button
            onClick={() => { setSearch(''); setCountryFilter(''); setDateFrom(''); setDateTo('') }}
            style={{
              padding: '0.3rem 0.75rem', fontSize: 'var(--font-size-xs)',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-sans)',
              color: 'var(--color-text-muted)', height: 30,
            }}
          >
            Clear
          </button>
        )}
      </div>

      <div style={{ marginBottom: 'var(--space-2)' }}>
        <p style={fieldLabelStyle}>Session flags</p>
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
          const selected = selectedIds.has(session.sessionId)

          return (
            <div key={session.sessionId} style={{
              background: 'var(--color-surface)', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)', overflow: 'hidden',
              display: 'flex', alignItems: 'stretch',
            }}>
              <label
                onClick={e => e.stopPropagation()}
                style={{
                  display: 'flex', alignItems: 'flex-start', padding: '0.875rem 0 0.875rem 0.75rem',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  aria-label={`Select session ${session.sessionId}`}
                  onChange={e => toggleSelected(session.sessionId, e.target.checked)}
                  onClick={e => e.stopPropagation()}
                />
              </label>
              <div style={{ flex: 1, minWidth: 0 }}>
                <button
                  onClick={() => setExpandedSession(isExpanded ? null : session.sessionId)}
                  style={{
                    width: '100%', padding: '0.875rem var(--space-6) 0.875rem 0.75rem',
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
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)' }}>
                        {formatLocation(session)}
                      </span>
                      {firstMessage?.commitSha && firstMessage.commitSha !== 'local' && (
                        <span style={{
                          fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)',
                          fontFamily: 'var(--font-mono)',
                        }}>
                          {firstMessage.commitSha.slice(0, 7)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
                    <Tag label="Test" active={session.isTest} color="#6B7280" />
                    <Tag label="Citations" active={session.flags.cited_sources} color="#2563EB" />
                    {session.flags.guardrails_triggered.map(g => (
                      <Tag key={g} label={g.replace(/_/g, ' ')} active color="#92600A" />
                    ))}
                    <Tag label="Possible RIF leak" active={session.flags.rif_possible_leak} color="#B91C1C" />
                    <Tag label="👎 Thumbs down" active={session.flags.thumbs_down} color="#B91C1C" />
                    <Tag label="👍 Thumbs up" active={session.flags.thumbs_up} color="#4A6130" />
                    <Tag label="Override attempted" active={session.flags.override_attempted} color="#6B21A8" />
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
                    <p style={{
                      padding: '0.5rem var(--space-6)', fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-faint)', borderBottom: '1px solid var(--color-border)',
                    }}>
                      IP {session.ip}
                    </p>
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
                              {entry.patterns?.guardrail_triggered && (
                                <Tag label={entry.patterns.guardrail_triggered.replace(/_/g, ' ')} active color="#92600A" />
                              )}
                              {entry.audienceEstimate && entry.audienceEstimate.audience !== 'unknown' && (
                                <Tag
                                  label={`${entry.audienceEstimate.audience.replace(/_/g, ' ')} (${Math.round(entry.audienceEstimate.confidence * 100)}%)`}
                                  active
                                  color="#2563EB"
                                />
                              )}
                              {entry.audienceEstimate?.suggest_contact && (
                                <Tag label="Contact suggested" active color="#4A6130" />
                              )}
                              {entry.audienceEstimate?.fit_verdict && entry.audienceEstimate.fit_verdict !== 'not_applicable' && (
                                <Tag
                                  label={entry.audienceEstimate.fit_verdict.replace(/_/g, ' ')}
                                  active
                                  color={entry.audienceEstimate.fit_verdict === 'no_fit' ? '#B91C1C' : '#4A6130'}
                                />
                              )}
                              {entry.audienceEstimate?.case_study_pointer && (
                                <Tag label={`→ ${entry.audienceEstimate.case_study_pointer}`} active color="#2563EB" />
                              )}
                              {entry.audienceEstimate?.register_used && (
                                <Tag
                                  label={entry.audienceEstimate.register_used.replace('_', ' ')}
                                  active
                                  color="#6B7280"
                                />
                              )}
                              {entry.audienceEstimate?.register_used === 'exploratory' &&
                                (entry.audienceEstimate.confidence ?? 1) < 0.4 && (
                                  <Tag label="Register mismatch" active color="#B91C1C" />
                                )}
                              <Tag label="Possible RIF leak" active={entry.patterns?.rif_possible_leak ?? false} color="#B91C1C" />
                              {entry.feedback === 'down' && <Tag label="👎" active color="#B91C1C" />}
                              {entry.feedback === 'up' && <Tag label="👍" active color="#4A6130" />}
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---------- Page ----------

function confirmCopy(intent: ClearIntent, selectedCount: number): { title: string; confirm: string } {
  if (intent === 'since-10m') {
    return {
      title: 'This deletes conversation logs and matching feedback from the last 10 minutes. This cannot be undone.',
      confirm: 'Yes, clear last 10 minutes',
    }
  }
  if (intent === 'since-1h') {
    return {
      title: 'This deletes conversation logs and matching feedback from the last hour. This cannot be undone.',
      confirm: 'Yes, clear last hour',
    }
  }
  if (intent === 'sessions') {
    return {
      title: `This permanently deletes ${selectedCount} selected session${selectedCount !== 1 ? 's' : ''} and their feedback. This cannot be undone.`,
      confirm: 'Yes, clear selected',
    }
  }
  return {
    title: 'This permanently deletes every logged conversation and feedback entry. This cannot be undone. Are you sure?',
    confirm: 'Yes, delete everything',
  }
}

export default function PortfolioAssistantManagerPage() {
  const [tab, setTab] = useState<'dashboard' | 'logs'>('dashboard')
  const [sessions, setSessions] = useState<Session[]>([])
  const [rawCount, setRawCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [clearIntent, setClearIntent] = useState<ClearIntent | ''>('')
  const [clearing, setClearing] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const fetchLogs = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/logs')
      if (!res.ok) throw new Error()
      const data = await res.json()
      const logs: LogEntry[] = data.logs || []
      const feedback: FeedbackRecord[] = data.feedback || []
      setRawCount(logs.length)
      setSessions(groupBySessions(logs, feedback))
    } catch {
      setError('Failed to load logs. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClearLogs = async () => {
    if (!clearIntent) return
    setClearing(true)
    try {
      const body =
        clearIntent === 'all' ? { mode: 'all' as const }
        : clearIntent === 'sessions' ? { mode: 'sessions' as const, sessionIds: Array.from(selectedIds) }
        : {
            mode: 'since' as const,
            sinceMs: Date.now() - (clearIntent === 'since-10m' ? 10 * 60 * 1000 : 60 * 60 * 1000),
          }
      const res = await fetch('/api/admin/clear-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      setClearIntent('')
      setSelectedIds(new Set())
      await fetchLogs()
    } catch {
      setError('Failed to clear logs. Try again.')
    } finally {
      setClearing(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  useEffect(() => {
    if (clearIntent === 'sessions' && selectedIds.size === 0) {
      setClearIntent('')
    }
  }, [clearIntent, selectedIds])

  const TABS: { key: typeof tab; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'logs', label: 'Logs' },
  ]

  const confirm = clearIntent ? confirmCopy(clearIntent, selectedIds.size) : null

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'var(--space-8) var(--space-12)' }}>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Admin</p>
        <h1 className="font-serif" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 400 }}>Portfolio Assistant manager</h1>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-border)', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.35rem' }}>
          <label htmlFor="clear-logs" style={{ fontSize: 'var(--font-size-xs)', color: '#B91C1C' }}>Clear logs</label>
          <select
            id="clear-logs"
            value={clearIntent}
            onChange={e => setClearIntent(e.target.value as ClearIntent | '')}
            style={{
              fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-sans)',
              color: '#B91C1C', background: 'var(--color-surface)',
              border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              padding: '0.35rem 0.5rem',
            }}
          >
            <option value="">Choose…</option>
            <option value="since-10m">Clear last 10 minutes</option>
            <option value="since-1h">Clear last hour</option>
            <option value="sessions" disabled={selectedIds.size === 0}>
              Clear selected ({selectedIds.size})
            </option>
            <option value="all">Clear all logs</option>
          </select>
        </div>
      </div>

      {confirm && (
        <div style={{
          padding: '1rem', marginBottom: 'var(--space-6)',
          background: '#fdecec', border: '1px solid #B91C1C',
          borderRadius: 'var(--radius-sm)',
        }}>
          <p style={{ fontSize: 'var(--font-size-sm)', color: '#791F1F', marginBottom: '0.75rem' }}>
            {confirm.title}
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button
              onClick={handleClearLogs}
              disabled={clearing}
              style={{
                fontSize: 'var(--font-size-sm)', fontWeight: 500,
                color: '#fff', background: '#B91C1C', border: 'none',
                borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem',
                cursor: clearing ? 'default' : 'pointer', fontFamily: 'var(--font-sans)',
                opacity: clearing ? 0.6 : 1,
              }}
            >
              {clearing ? 'Clearing…' : confirm.confirm}
            </button>
            <button
              onClick={() => setClearIntent('')}
              disabled={clearing}
              style={{
                fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)',
                background: 'none', border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem',
                cursor: 'pointer', fontFamily: 'var(--font-sans)',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && sessions.length === 0 && (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Loading…</p>
      )}
      {error && (
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
          <span style={{ color: 'var(--color-accent)' }}>{error}</span>
        </p>
      )}

      {!loading || sessions.length > 0 ? (
        tab === 'dashboard'
          ? <DashboardTab sessions={sessions} rawCount={rawCount} />
          : (
            <LogsTab
              sessions={sessions}
              rawCount={rawCount}
              onRefresh={fetchLogs}
              loading={loading}
              selectedIds={selectedIds}
              onSelectedIdsChange={setSelectedIds}
            />
          )
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
