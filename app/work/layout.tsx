import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Work — Ali Khan',
  description: 'Product design and UX research case studies and projects by Ali Khan.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
