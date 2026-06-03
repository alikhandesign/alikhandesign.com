import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'From Checkboxes to Conversations — Ali Khan',
  description: 'Case study: auditing Squarespace Blueprint AI and redesigning key failure moments.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
