import { Redis } from '@upstash/redis'

let client: Redis | null = null

// Shared Upstash Redis client. Lazy-initialized so it only ever runs server-side.
export function getKV(): Redis {
  if (!client) {
    client = new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  }
  return client
}

export interface WorkKVConfig {
  order: string[] | null
  config: Record<string, { visible: boolean }> | null
  featured: string[] | null
}

// Reads the admin-configured work page order/visibility/featured directly from KV.
// Used server-side only — no password required, since this data already determines
// what's publicly visible on /work anyway.
export async function getWorkKVConfig(): Promise<WorkKVConfig> {
  try {
    const kv = getKV()
    const [order, config, featured] = await Promise.all([
      kv.get<string[]>('admin:work:order'),
      kv.get<Record<string, { visible: boolean }>>('admin:work:config'),
      kv.get<string[]>('admin:work:featured'),
    ])
    return { order: order ?? null, config: config ?? null, featured: featured ?? null }
  } catch (err) {
    console.error('getWorkKVConfig error:', err)
    return { order: null, config: null, featured: null }
  }
}
