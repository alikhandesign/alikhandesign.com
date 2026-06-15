import Link from 'next/link'

const patterns = [
  {
    slug: 'generation-states',
    title: 'Generation States',
    desc: 'How the interface communicates thinking, streaming, completion, and stall — four states that current products collapse into one.',
    img: '/images/patterns/generation-states.jpg',
  },
  {
    slug: 'uncertainty-communication',
    title: 'Uncertainty Communication',
    desc: 'Placement, differentiation, and verifiability of hedging — addressing the gap between what models know and what interfaces signal.',
    img: '/images/patterns/uncertainty-communication.jpg',
  },
  {
    slug: 'source-attribution',
    title: 'Source & Attribution',
    desc: 'Consistent, inline, accessible citation patterns — the Source Inspector with click-to-reveal source panel.',
    img: '/images/patterns/source-attribution.jpg',
  },
  {
    slug: 'limitation-handling',
    title: 'Limitation Handling',
    desc: 'Acknowledge, Redirect, Invite — treating capability, knowledge, and commercial limits as structured pivot points.',
    img: '/images/patterns/limitation-handling.jpg',
  },
  {
    slug: 'correction-refinement',
    title: 'Correction & Refinement',
    desc: 'The Clarification Interceptor and block-level versioning — moving from blind regeneration to surgical iteration.',
    img: '/images/patterns/correction-refinement.jpg',
  },
  {
    slug: 'error-states',
    title: 'Error States',
    desc: 'The Heartbeat Watchdog and four-error taxonomy — eliminating silent failures through state escalation and input preservation.',
    img: '/images/patterns/error-states.jpg',
  },
]

export default function PatternsIndex() {
  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
      <div className="page-header">
        <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Pattern Library</p>
        <h1 className="font-serif" style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 400, lineHeight: 'var(--line-height-tight)', marginBottom: 'var(--space-4)', color: 'var(--color-text)' }}>
          AI Interface Patterns
        </h1>
        <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)', maxWidth: 640 }}>
          Six pattern categories derived from a competitive audit of ChatGPT, Claude, Gemini, Perplexity, Notion AI, and GitHub Copilot. Each pattern defines the problem, the prescription, the design decisions, and the tradeoffs.
        </p>
      </div>

      <div className="section-pad">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {patterns.map((p) => (
            <a key={p.slug} href={`/patterns/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="work-card" style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: 'pointer',
              }}>
                <div style={{ height: 140, background: 'var(--color-surface-subtle)', borderBottom: '1px solid var(--color-border)', overflow: 'hidden' }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                  />
                </div>
                <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
                  <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text)', lineHeight: 'var(--line-height-tight)' }}>
                    {p.title}
                  </h2>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)', flex: 1 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)', fontWeight: 'var(--font-weight-medium)' }}>
                      View pattern →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
