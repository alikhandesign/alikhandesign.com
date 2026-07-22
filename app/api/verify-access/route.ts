import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, isTokenValid, cookieNameFor, TOKEN_TTL_SECONDS, AccessType } from '@/lib/auth'

function parseType(value: string | null): AccessType | null {
  return value === 'admin' || value === 'case-study' ? value : null
}

// POST { password, type } — verifies the password server-side and, on
// success, sets an httpOnly cookie holding an opaque token (never the
// password itself, and never anything readable by client JS).
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const type = parseType(body?.type)
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!type) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }

  const token = await verifyPassword(type, password)
  if (!token) {
    return NextResponse.json({ unlocked: false, error: 'Incorrect password' }, { status: 401 })
  }

  const res = NextResponse.json({ unlocked: true })
  res.cookies.set(cookieNameFor(type), token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: TOKEN_TTL_SECONDS,
    path: '/',
  })
  return res
}

// GET ?type=admin|case-study — lets a page check on mount whether the
// visitor already has a valid, unexpired cookie, so they don't have to
// re-enter the password on every page within the 7-day window.
export async function GET(req: NextRequest) {
  const type = parseType(req.nextUrl.searchParams.get('type'))
  if (!type) {
    return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
  }
  const token = req.cookies.get(cookieNameFor(type))?.value
  const unlocked = await isTokenValid(type, token)
  return NextResponse.json({ unlocked })
}
