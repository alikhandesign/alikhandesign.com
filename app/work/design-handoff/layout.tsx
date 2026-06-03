import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design Handoff Checklist — Ali Khan',
  description: 'Project: comprehensive design-to-development handoff checklist.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
