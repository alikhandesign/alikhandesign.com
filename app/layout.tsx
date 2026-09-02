import type { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import './globals.css'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/next'
import UmamiScript from './components/UmamiScript'

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

const inter = Inter({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Ali Khan — Senior Product Designer & Researcher',
  description: 'I help product teams understand their users at scale — combining mixed-methods research, strategic synthesis, and AI-native workflows to turn insight into action.',
  metadataBase: new URL('https://alikhandesign.com'),
  openGraph: {
    title: 'Ali Khan — Senior Product Designer & Researcher',
    description: 'Portfolio of Ali Khan, Senior Product Designer & Researcher based in Austin, TX.',
    url: 'https://alikhandesign.com',
    siteName: 'Ali Khan Design',
    images: [{ url: '/images/ali.jpg' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerifDisplay.variable} ${inter.variable}`}>
      <body style={{ background: 'var(--color-bg)' }}>
        <Nav />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <Analytics />
        <UmamiScript />
      </body>
    </html>
  )
}
