import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LLM Prompt Engineering for Website Audits — Ali Khan',
  description: 'Project: structured prompt framework for LLM-based UX website audits.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
