'use client'
export default function Footer() {
  return (
    <footer className="site-footer" style={{ background: 'var(--bg)' }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>© 2026 Ali Khan · alikhandesign.com</span>
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' as const }}>
        {[
          { label: 'ali@alikhandesign.com', href: 'mailto:ali@alikhandesign.com' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/alikhandesign' },
          { label: 'GitHub', href: 'https://github.com/alikhandesign' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}
          >{label}</a>
        ))}
      </div>
    </footer>
  )
}
