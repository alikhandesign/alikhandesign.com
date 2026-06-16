import ButtonLink from './ButtonLink'

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: 'var(--color-bg)' }}>
      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>© 2026 Ali Khan · alikhandesign.com</span>
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { label: 'ali@alikhandesign.com', href: 'mailto:ali@alikhandesign.com' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alikhandesign' },
          { label: 'GitHub', href: 'https://github.com/alikhandesign' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-link"
            style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
          >{label}</a>
        ))}
        <ButtonLink href="/chat" label="Chat with Ali" />
      </div>
    </footer>
  )
}