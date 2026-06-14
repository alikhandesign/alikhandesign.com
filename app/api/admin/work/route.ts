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
    const [order, config, featured] = await Promise.all([
      kv.get<string[]>('admin:work:order'),
      kv.get<Record<string, { visible: boolean }>>('admin:work:config'),
      kv.get<string[]>('admin:work:featured'),
    ])
    return NextResponse.json({
      order: order ?? null,
      config: config ?? null,
      featured: featured ?? null,
    })
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
    const { order, config, featured } = body

    if (Array.isArray(featured) && featured.length > 2) {
      return NextResponse.json({ error: 'Maximum 2 featured items allowed' }, { status: 400 })
    }

    const kv = await getKV()
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
