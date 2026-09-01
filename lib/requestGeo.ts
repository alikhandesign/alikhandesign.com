export type RequestGeo = {
  country: string | null
  region: string | null
  city: string | null
}

function decodeHeader(value: string | null): string | null {
  if (!value) return null
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

// Vercel attaches these on every incoming request at the edge. This is
// hosting metadata, not Vercel Analytics and not a pageview tracker.
export function getRequestGeo(req: Request): RequestGeo {
  return {
    country: req.headers.get('x-vercel-ip-country') || null,
    region: req.headers.get('x-vercel-ip-country-region') || null,
    city: decodeHeader(req.headers.get('x-vercel-ip-city')),
  }
}
