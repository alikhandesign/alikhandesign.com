import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Optimizing the Ancillary Insurance Journey — Ali Khan',
  description: 'Project: qualitative research into Medicare enrollee navigation of ancillary coverage.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
