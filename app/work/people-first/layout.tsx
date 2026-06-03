import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'People-First Enrollment Redesign — Ali Khan',
  description: 'Case study: identity-driven enrollment flow that drove a 15% lift in enrollments.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
