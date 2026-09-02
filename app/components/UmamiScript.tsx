'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const scriptUrl = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL

export default function UmamiScript() {
  const pathname = usePathname()

  if (!websiteId || !scriptUrl) return null
  if (pathname.startsWith('/admin')) return null

  return (
    <Script
      src={scriptUrl}
      data-website-id={websiteId}
      strategy="afterInteractive"
    />
  )
}
