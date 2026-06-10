'use client'

interface CTAStripProps {
  eyebrow?: string
  title: string
  onContact: () => void
}

export default function CTAStrip({ eyebrow = 'Interested?', title, onContact }: CTAStripProps) {
  return (
    <section style={{ background: 'var(--color-bg-dark)', padding: '4rem 3rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' as const }}>
        <div>
          <p className="eyebrow-dark" style={{ marginBottom: 'var(--space-2)' }}>{eyebrow}</p>
          <h2 className="font-serif" style={{ fontSize: 'var(--color-text-2xl)', fontWeight: 400, color: 'var(--color-bg)', lineHeight: 1.25, maxWidth: 500 }}>{title}</h2>
        </div>
        <button
          onClick={onContact}
          className="btn-primary"
          style={{ flexShrink: 0 }}
        >
          Get in touch <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
