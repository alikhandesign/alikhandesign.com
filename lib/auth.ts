import { NextRequest } from 'next/server'
import { randomBytes } from 'crypto'
import { getKV } from './kv'

export type AccessType = 'admin' | 'case-study'

const COOKIE_NAMES: Record<AccessType, string> = {
  admin: 'admin_access',
  'case-study': 'cs_access',
}

// 7 days — see conversation with Ali: long enough for a recruiter/hiring manager
// reviewing case studies over a few days, short enough to bound exposure if a
// device is shared or the cookie ends up somewhere unexpected.
export const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7

function envPassword(type: AccessType): string | undefined {
  return type === 'admin' ? process.env.ADMIN_PASSWORD : process.env.CASE_STUDY_PASSWORD
}

export function cookieNameFor(type: AccessType): string {
  return COOKIE_NAMES[type]
}

// Checks a submitted password against the server-side env var. On success,
// mints a random opaque token, stores it in KV with a 7-day expiry, and
// returns it so the caller can set it as an httpOnly cookie. Never trust a
// client-supplied "unlocked" boolean anywhere in the app — this is the only
// place access should be granted.
export async function verifyPassword(type: AccessType, password: string): Promise<string | null> {
  const expected = envPassword(type)
  if (!expected || !password || password !== expected) return null

  const token = randomBytes(24).toString('hex')
  const kv = getKV()
  await kv.set(`access:${type}:${token}`, true, { ex: TOKEN_TTL_SECONDS })
  return token
}

export async function isTokenValid(type: AccessType, token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  try {
    const kv = getKV()
    const val = await kv.get(`access:${type}:${token}`)
    return !!val
  } catch {
    return false
  }
}

// Server-side authorization check for API routes — reads the httpOnly cookie
// from the incoming request and verifies it against KV. This is the only
// source of truth for whether a request is authorized; request bodies and
// query strings are never trusted for this decision.
export async function isRequestAuthorized(req: NextRequest, type: AccessType): Promise<boolean> {
  const token = req.cookies.get(cookieNameFor(type))?.value
  return isTokenValid(type, token)
}
