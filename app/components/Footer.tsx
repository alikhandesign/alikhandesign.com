'use client'

import ButtonLink from './ButtonLink'
import { track } from '@/lib/umami'

const links = [
  { label: 'ali@alikhandesign.com', href: 'mailto:ali@alikhandesign.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alikhandesign', event: 'outbound_linkedin' as const },
  { label: 'GitHub', href: 'https://github.com/alikhandesign', event: 'outbound_github' as const },
]

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: 'var(--color-bg)' }}>
      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>© 2026 Ali Khan · alikhandesign.com</span>
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
        {links.map(({ label, href, event }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            onClick={() => {
              if (event) track(event, { source: 'footer' })
            }}
            style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
          >{label}</a>
        ))}
        <ButtonLink href="/chat" label="Chat with Ali" />
      </div>
    </footer>
  )
}
