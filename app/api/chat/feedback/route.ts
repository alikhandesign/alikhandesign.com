import { NextRequest, NextResponse } from 'next/server'
import { getKV } from '@/lib/kv'

// Same origin check used by the main chat route. Not extracted to a shared
// lib since it's small and this avoids touching that already-tested file
// just to deduplicate ~8 lines.
function isAllowedOrigin(origin: string, host: string): boolean {
  if (!origin && !host) return false
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1')
  if (isLocal) return true
  const allowed = [
    'alikhandesign.com',
    'alikhandesign-com.vercel.app',
    '.vercel.app',
  ]
  return allowed.some(d => origin.includes(d))
}

// Feedback is stored as its own record, keyed deterministically by
// sessionId + messageIndex — the same identifiers already used for
// conversation logging — rather than updating the original log entry.
// This avoids adding a slower find-and-update lookup into the live chat
// request path; the admin dashboard correlates the two by matching those
// same identifiers at read time instead.
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') || ''
  const host = req.headers.get('host') || ''

  if (!isAllowedOrigin(origin, host)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { sessionId, messageIndex, rating } = body as {
    sessionId?: unknown
    messageIndex?: unknown
    rating?: unknown
  }

  if (
    typeof sessionId !== 'string' || !sessionId ||
    typeof messageIndex !== 'number' ||
    (rating !== 'up' && rating !== 'down' && rating !== null)
  ) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const kv = getKV()
    const key = `feedback:${sessionId}:${messageIndex}`

    if (rating === null) {
      // Removing a previously-submitted vote
      await kv.del(key)
      await kv.lrem('feedback:index', 0, key)
    } else {
      const existing = await kv.get(key)
      await kv.set(
        key,
        JSON.stringify({ sessionId, messageIndex, rating, timestamp: new Date().toISOString() }),
        { ex: 60 * 60 * 24 * 90 } // 90 days, matching the conversation log retention
      )
      // Only add to the index on a genuinely new vote, not when changing an
      // existing one, to avoid duplicate index entries for the same key.
      if (!existing) {
        await kv.lpush('feedback:index', key)
        await kv.ltrim('feedback:index', 0, 999)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    // Feedback storage failing should never surface as an error to the
    // visitor — this is a nice-to-have quality signal, not something worth
    // a visible failure state over. The chat itself already succeeded.
    console.error('Feedback storage error:', err)
    return NextResponse.json({ success: true })
  }
}
