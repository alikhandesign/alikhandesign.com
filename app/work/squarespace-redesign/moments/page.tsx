'use client'
import Link from 'next/link'
import SectionLabel from '@/app/components/SectionLabel'
import StatCard from '@/app/components/StatCard'
import Breadcrumb from '@/app/components/Breadcrumb'

const moments = [
  {
    num: '01',
    title: 'The Intake',
    slug: 'intake',
    principle: 'Make AI useful',
    desc: 'Replace checkbox onboarding with a conversational intake that gathers real intent — including clarifying questions when answers are vague.',
    failureModes: ['Intent Translation Failure', 'Generic Output', 'False Promise'],
    href: '/work/squarespace-redesign/moments/intake',
  },
  {
    num: '02',
    title: 'The Transparent Builder',
    slug: 'builder',
    principle: 'Show AI reasoning',
    desc: 'Click any section of the live preview to see why the AI made that decision — and override it with your own direction.',
    failureModes: ['Opacity', 'False Recommendation', 'Template Prison'],
    href: '/work/squarespace-redesign/moments/builder',
  },
  {
    num: '03',
    title: 'The Context Layer',
    slug: 'context-layer',
    principle: 'Learn from behavior',
    desc: 'A persistent model of who you are, built from your intake and updated as you edit. The AI never forgets, and never starts from zero.',
    failureModes: ['Session Blindness', 'Voice Displacement', 'Domain Collapse'],
    href: '/work/squarespace-redesign/moments/context-layer',
  },
]

export default function MomentsPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '1.25rem 3rem 0' }}>
        <Breadcrumb items={[
          { label: 'My Work', href: '/work' },
          { label: 'From Checkboxes to Conversations', href: '/work/squarespace-redesign' },
          { label: 'Interactive Prototypes' },
        ]} />
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '2.5rem 3rem 3rem' }}>

        {/* Header */}
        <SectionLabel label="From Checkboxes to Conversations" />
        <h1 className="font-serif" style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 400,
          lineHeight: 1.15,
          color: 'var(--color-text)',
          marginBottom: 'var(--space-6)',
          maxWidth: 680,
        }}>
          Three redesigned moments
        </h1>
        <p style={{
          fontSize: 'var(--font-size-base)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          maxWidth: 600,
          marginBottom: 'var(--space-8)',
        }}>
          Each prototype responds directly to a documented failure pattern from the audit. Toggle between Before and After to see the current Squarespace experience versus the redesign.
        </p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-12)', maxWidth: 680 }}>
          <StatCard value="20" label="Failure modes documented" />
          <StatCard value="2" label="Audit tracks" />
          <StatCard value="3" label="Redesigned moments" />
          <StatCard value="4" label="Design principles" />
        </div>

        {/* Diagnosis */}
        <div style={{
          borderLeft: '3px solid var(--color-accent)',
          paddingLeft: 'var(--space-6)',
          marginBottom: 'var(--space-12)',
          maxWidth: 680,
        }}>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)', fontWeight: 500, letterSpacing: 'var(--letter-spacing-lg)', textTransform: 'uppercase', marginBottom: 'var(--space-2)' }}>
            The diagnosis
          </p>
          <p className="font-serif" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.5, fontStyle: 'italic' }}>
            "Squarespace's AI is a categorization engine wearing a personalization promise — and every category in that engine maps to Squarespace's business model, not the user's actual needs."
          </p>
        </div>

        {/* Moment cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: 780 }}>
          {moments.map(m => (
            <Link
              key={m.slug}
              href={m.href}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-6)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 'var(--space-8)',
                transition: 'border-color var(--transition-base), box-shadow var(--transition-base)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-mid)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', fontWeight: 500 }}>{m.num}</span>
                    <h2 className="font-serif" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 400, color: 'var(--color-text)', margin: 0 }}>{m.title}</h2>
                    <span style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-muted)',
                      background: 'var(--color-surface-subtle)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                    }}>{m.principle}</span>
                  </div>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: 'var(--space-3)' }}>{m.desc}</p>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                    {m.failureModes.map(f => (
                      <span key={f} style={{
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-accent)',
                        border: '1px solid var(--color-accent-bg)',
                        background: 'var(--color-accent-bg)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                      }}>{f}</span>
                    ))}
                  </div>
                </div>
                <span style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-accent)', flexShrink: 0 }}>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'var(--space-12)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
          <Link href="/work/squarespace-redesign" style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-accent)',
            textDecoration: 'none',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            borderBottom: '1px solid var(--color-accent)',
            paddingBottom: 2,
          }}>
            Back to case study →
          </Link>
        </div>

      </div>
    </main>
  )
}
