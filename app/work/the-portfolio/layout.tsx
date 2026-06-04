import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Portfolio Is the Product — Ali Khan',
  description: 'Case study: building a custom Next.js portfolio with a bespoke design system, using AI as an execution layer. Under 2 weeks from concept to shipped site.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
