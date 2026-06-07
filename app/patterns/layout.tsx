import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Interface Pattern Library — Ali Khan Design',
  description: 'An empirically grounded pattern library for AI-facing product interfaces, built from a six-product competitive audit.',
}

export default function PatternsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
