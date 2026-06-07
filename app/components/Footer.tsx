import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: 'var(--bg)' }}>
      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>© 2026 Ali Khan · alikhandesign.com</span>
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', alignItems: 'center' }}>
        {[
          { label: 'ali@alikhandesign.com', href: 'mailto:ali@alikhandesign.com' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alikhandesign' },
          { label: 'GitHub', href: 'https://github.com/alikhandesign' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="footer-link"
            style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
          >{label}</a>
        ))}
        <Link
          href="/chat"
          className="footer-link"
          style={{ fontSize: 'var(--text-base)', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
        >
          Chat with Ali →
        </Link>
      </div>
    </footer>
  )
}
