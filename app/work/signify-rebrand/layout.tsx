import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signify Health Rebrand — Ali Khan',
  description: 'Project: full brand refresh resulting in 50% increase in website traffic.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
