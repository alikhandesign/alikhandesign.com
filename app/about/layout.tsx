import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — Ali Khan',
  description: 'Senior Product Designer and UX Researcher based in Austin, TX.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
