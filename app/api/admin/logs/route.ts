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
    const keys = await kv.lrange<string>('log:index', 0, 99)
    if (!keys || keys.length === 0) {
      return NextResponse.json({ logs: [] })
    }

    const logs = await Promise.all(
      keys.map(async (key: string) => {
        try {
          const entry = await kv.get<string>(key)
          return entry ? (typeof entry === 'string' ? JSON.parse(entry) : entry) : null
        } catch {
          return null
        }
      })
    )

    const validLogs = logs.filter(Boolean).sort((a: any, b: any) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return NextResponse.json({ logs: validLogs })
  } catch (err) {
    console.error('Admin logs error:', err)
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 })
  }
}
