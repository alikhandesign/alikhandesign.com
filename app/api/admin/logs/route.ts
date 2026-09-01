import { NextRequest, NextResponse } from 'next/server'
import { getKV } from '@/lib/kv'
import { isRequestAuthorized } from '@/lib/auth'

// Serves logged chatbot conversations — genuinely sensitive, so this requires
// a valid admin session cookie (set only via /api/verify-access after the
// real password is checked server-side). No password is ever accepted here
// directly, and nothing is trusted from the query string anymore.
export async function GET(req: NextRequest) {
  const authorized = await isRequestAuthorized(req, 'admin')
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const kv = getKV()
    const [logKeys, feedbackKeys] = await Promise.all([
      // Match chat retention (ltrim 0, 999). The dashboard previously only
      // read 100 keys, which made date filters and the 14-day chart incomplete.
      kv.lrange<string>('log:index', 0, 999),
      kv.lrange<string>('feedback:index', 0, 999),
    ])

    const logs = logKeys && logKeys.length > 0
      ? await Promise.all(
          logKeys.map(async (key: string) => {
            try {
              const entry = await kv.get<string>(key)
              return entry ? (typeof entry === 'string' ? JSON.parse(entry) : entry) : null
            } catch {
              return null
            }
          })
        )
      : []

    // Feedback is stored separately from logs (see app/api/chat/feedback/route.ts)
    // and correlated here by sessionId + messageIndex - not merged into a log
    // entry, since feedback can be submitted or changed after the original
    // conversation turn was already logged.
    const feedback = feedbackKeys && feedbackKeys.length > 0
      ? await Promise.all(
          feedbackKeys.map(async (key: string) => {
            try {
              const entry = await kv.get<string>(key)
              return entry ? (typeof entry === 'string' ? JSON.parse(entry) : entry) : null
            } catch {
              return null
            }
          })
        )
      : []

    const validLogs = logs.filter(Boolean).sort((a: any, b: any) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    const validFeedback = feedback.filter(Boolean)

    return NextResponse.json({ logs: validLogs, feedback: validFeedback })
  } catch (err) {
    console.error('Admin logs error:', err)
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 })
  }
}

