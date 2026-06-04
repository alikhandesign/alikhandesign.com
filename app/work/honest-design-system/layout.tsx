import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Honest Design System — Ali Khan',
  description: 'Case study: a production design system built for alikhandesign.com — 19 components, two-layer token architecture, Figma-to-code parity, and WCAG 2.1 AA throughout.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
