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
