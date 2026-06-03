import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IHE Scheduling Portal — Ali Khan',
  description: 'Case study: mixed-methods research informing a trust-first scheduling portal redesign.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
