import { NextRequest, NextResponse } from 'next/server'

const ADMIN_PASSWORD = 'dadisgay123'

async function getKV() {
  const { Redis } = await import('@upstash/redis')
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const password = searchParams.get('password')
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const kv = await getKV()
    const order = await kv.get<string[]>('admin:work:order')
    const config = await kv.get<Record<string, { visible: boolean }>>('admin:work:config')
    return NextResponse.json({ order: order ?? null, config: config ?? null })
  } catch (err) {
    console.error('Admin work GET error:', err)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const password = searchParams.get('password')
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { order, config } = body
    const kv = await getKV()
    await kv.set('admin:work:order', JSON.stringify(order))
    await kv.set('admin:work:config', JSON.stringify(config))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin work POST error:', err)
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}
