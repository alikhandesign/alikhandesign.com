import { NextRequest, NextResponse } from 'next/server'
import { getKV, getWorkKVConfig } from '@/lib/kv'
import { isRequestAuthorized } from '@/lib/auth'

// Reading the work order/visibility/featured config is intentionally public —
// it only ever controls what's already visible on the public /work page, so
// there's nothing to protect here. This also means the page that renders it
// can fetch it server-side with zero secrets involved.
export async function GET() {
  const data = await getWorkKVConfig()
  return NextResponse.json(data)
}

// Writing to it is the sensitive operation — requires a valid admin session
// cookie, set only after /api/verify-access confirms the real password.
export async function POST(req: NextRequest) {
  const authorized = await isRequestAuthorized(req, 'admin')
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { order, config, featured } = body

    if (Array.isArray(featured) && featured.length > 2) {
      return NextResponse.json({ error: 'Maximum 2 featured items allowed' }, { status: 400 })
    }

    const kv = getKV()
    await Promise.all([
      kv.set('admin:work:order', JSON.stringify(order)),
      kv.set('admin:work:config', JSON.stringify(config)),
      kv.set('admin:work:featured', JSON.stringify(featured ?? [])),
    ])
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin work POST error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
