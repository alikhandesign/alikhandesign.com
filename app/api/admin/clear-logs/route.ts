import { NextRequest, NextResponse } from 'next/server'
import { getKV } from '@/lib/kv'
import { isRequestAuthorized } from '@/lib/auth'

// Destructive, admin-only action - wipes all logged conversation and
// feedback data. Requires the same admin session cookie as the read
// endpoint. Built specifically because all current log data is
// development/testing traffic - the site has no real visitor history yet,
// and manual testing through the live chat UI carries no marker
// distinguishing it from genuine visitor traffic, unlike script-driven
// tests which are tagged is_test_request. A full wipe was the cleanest way
// to start fresh, rather than building selective-filtering logic against
// data that was never consistently tagged in the first place.
export async function POST(req: NextRequest) {
  const authorized = await isRequestAuthorized(req, 'admin')
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const kv = getKV()

    // Read the FULL index lists, not the capped range the read endpoint
    // uses for display - a partial clear would leave stale keys behind
    // with nothing referencing them, silently wasting KV storage.
    const [logKeys, feedbackKeys] = await Promise.all([
      kv.lrange<string>('log:index', 0, -1),
      kv.lrange<string>('feedback:index', 0, -1),
    ])

    const allKeys = [...(logKeys ?? []), ...(feedbackKeys ?? [])]

    // Delete every individual entry, then the two index lists themselves.
    if (allKeys.length > 0) {
      await Promise.all(allKeys.map((key) => kv.del(key)))
    }
    await Promise.all([
      kv.del('log:index'),
      kv.del('feedback:index'),
    ])

    return NextResponse.json({ success: true, deletedCount: allKeys.length })
  } catch (err) {
    console.error('Clear logs error:', err)
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 })
  }
}
