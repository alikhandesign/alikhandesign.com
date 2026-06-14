import type { Metadata } from 'next'
import './sq.css'

export const metadata: Metadata = {
  title: 'From Checkboxes to Conversations — Interactive Prototypes',
  description: 'Three interactive prototypes redesigning key moments in Squarespace\'s Blueprint AI — by Ali Khan.',
}

// This layout is intentionally isolated from the main site layout.
// It imports sq.css (Squarespace design tokens) instead of globals.css
// so the Honest Design System tokens never bleed into the prototype pages.
export default function MomentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: '#fff', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
