'use client'

const SECTIONS = [
  {
    href: '/admin/work-manager',
    title: 'Work manager',
    description: 'Reorder, hide, and feature case studies and projects on the work index.',
  },
  {
    href: '/admin/portfolio-assistant-manager',
    title: 'Portfolio Assistant manager',
    description: 'Dashboard metrics and raw conversation logs for the chat assistant.',
  },
]

export default function AdminHubPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: 'var(--space-2)' }}>Admin</p>
        <h1 className="font-serif" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 400, lineHeight: 1.1, marginBottom: 'var(--space-8)' }}>
          Dashboard
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {SECTIONS.map(section => (
            <a
              key={section.href}
              href={section.href}
              style={{
                display: 'block',
                padding: '1.25rem 1.5rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              <p style={{ fontSize: 'var(--font-size-md)', fontWeight: 500, color: 'var(--color-text)', marginBottom: 4 }}>
                {section.title} →
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                {section.description}
              </p>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
          <a href="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            Back to site →
          </a>
        </div>
      </div>
    </main>
  )
}
