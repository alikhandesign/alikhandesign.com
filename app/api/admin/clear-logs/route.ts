import { NextRequest, NextResponse } from 'next/server'
import { getKV } from '@/lib/kv'
import { isRequestAuthorized } from '@/lib/auth'

type ClearMode = 'all' | 'since' | 'sessions'

type LogLike = {
  sessionId?: string
  timestamp?: string
}

type FeedbackLike = {
  sessionId?: string
  timestamp?: string
}

function parseJson<T>(value: unknown): T | null {
  if (value == null) return null
  if (typeof value === 'object') return value as T
  if (typeof value !== 'string') return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

async function loadEntries<T>(
  kv: ReturnType<typeof getKV>,
  keys: string[],
): Promise<{ key: string; value: T }[]> {
  if (keys.length === 0) return []
  const rows = await Promise.all(
    keys.map(async (key) => {
      try {
        const raw = await kv.get<string>(key)
        const value = parseJson<T>(raw)
        if (value == null) return null
        return { key, value }
      } catch {
        return null
      }
    }),
  )
  const loaded: { key: string; value: T }[] = []
  for (const row of rows) {
    if (row) loaded.push(row)
  }
  return loaded
}

async function rewriteIndex(
  kv: ReturnType<typeof getKV>,
  indexKey: string,
  keepKeys: string[],
) {
  await kv.del(indexKey)
  if (keepKeys.length > 0) {
    await kv.rpush(indexKey, ...keepKeys)
  }
}

// Destructive, admin-only. Accepts a JSON body so the dashboard can wipe
// everything, a recent time window, or selected sessions without orphaning
// keys in the indexes. Missing/empty body keeps the original full-wipe
// behavior.
export async function POST(req: NextRequest) {
  const authorized = await isRequestAuthorized(req, 'admin')
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let mode: ClearMode = 'all'
  let sinceMs: number | undefined
  let sessionIds: string[] = []

  try {
    const body = await req.json().catch(() => null)
    if (body && typeof body === 'object') {
      if (body.mode === 'since' || body.mode === 'sessions' || body.mode === 'all') {
        mode = body.mode
      }
      if (typeof body.sinceMs === 'number' && Number.isFinite(body.sinceMs)) {
        sinceMs = body.sinceMs
      }
      if (Array.isArray(body.sessionIds)) {
        sessionIds = body.sessionIds.filter((id: unknown) => typeof id === 'string' && id.length > 0)
      }
    }
  } catch {
    mode = 'all'
  }

  if (mode === 'since' && (sinceMs === undefined || sinceMs < 0)) {
    return NextResponse.json({ error: 'sinceMs is required' }, { status: 400 })
  }
  if (mode === 'sessions' && sessionIds.length === 0) {
    return NextResponse.json({ error: 'sessionIds is required' }, { status: 400 })
  }

  const sessionSet = new Set(sessionIds)

  try {
    const kv = getKV()

    const [logKeys, feedbackKeys] = await Promise.all([
      kv.lrange<string>('log:index', 0, -1),
      kv.lrange<string>('feedback:index', 0, -1),
    ])

    if (mode === 'all') {
      const allKeys = [...(logKeys ?? []), ...(feedbackKeys ?? [])]
      if (allKeys.length > 0) {
        await Promise.all(allKeys.map((key) => kv.del(key)))
      }
      await Promise.all([kv.del('log:index'), kv.del('feedback:index')])
      return NextResponse.json({ success: true, deletedCount: allKeys.length })
    }

    const logs = await loadEntries<LogLike>(kv, logKeys ?? [])
    const feedback = await loadEntries<FeedbackLike>(kv, feedbackKeys ?? [])

    const shouldDeleteLog = (entry: LogLike) => {
      if (mode === 'sessions') {
        return Boolean(entry.sessionId && sessionSet.has(entry.sessionId))
      }
      const ts = entry.timestamp ? new Date(entry.timestamp).getTime() : NaN
      return Number.isFinite(ts) && ts >= sinceMs!
    }

    const shouldDeleteFeedback = (entry: FeedbackLike) => {
      if (mode === 'sessions') {
        return Boolean(entry.sessionId && sessionSet.has(entry.sessionId))
      }
      const ts = entry.timestamp ? new Date(entry.timestamp).getTime() : NaN
      return Number.isFinite(ts) && ts >= sinceMs!
    }

    const deleteLogKeys = logs.filter((row) => shouldDeleteLog(row.value)).map((row) => row.key)
    const keepLogKeys = (logKeys ?? []).filter((key) => !deleteLogKeys.includes(key))
    const deleteFeedbackKeys = feedback.filter((row) => shouldDeleteFeedback(row.value)).map((row) => row.key)
    const keepFeedbackKeys = (feedbackKeys ?? []).filter((key) => !deleteFeedbackKeys.includes(key))

    const toDelete = [...deleteLogKeys, ...deleteFeedbackKeys]
    if (toDelete.length > 0) {
      await Promise.all(toDelete.map((key) => kv.del(key)))
    }

    await Promise.all([
      rewriteIndex(kv, 'log:index', keepLogKeys),
      rewriteIndex(kv, 'feedback:index', keepFeedbackKeys),
    ])

    return NextResponse.json({ success: true, deletedCount: toDelete.length })
  } catch (err) {
    console.error('Clear logs error:', err)
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 })
  }
}
