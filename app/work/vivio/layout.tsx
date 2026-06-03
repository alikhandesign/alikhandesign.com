import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vivio Clinical App — Ali Khan',
  description: 'Project: native iOS clinical application design for a heart failure diagnostic tool.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
