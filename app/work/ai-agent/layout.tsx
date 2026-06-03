import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Feedback & Insights Agent — Ali Khan',
  description: 'Case study: agentic AI research pipeline that automated qualitative synthesis with 95% accuracy.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
