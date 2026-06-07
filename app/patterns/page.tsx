import Link from 'next/link'

const patterns = [
  {
    slug: 'generation-states',
    title: 'Generation States',
    desc: 'How the interface communicates thinking, streaming, completion, and stall — four states that current products collapse into one.',
    status: 'Built',
  },
  {
    slug: 'uncertainty-communication',
    title: 'Uncertainty Communication',
    desc: 'Placement, differentiation, and verifiability of hedging — addressing the gap between what models know and what interfaces signal.',
    status: 'Built',
  },
  {
    slug: 'source-attribution',
    title: 'Source & Attribution',
    desc: 'Consistent, inline, accessible citation patterns — the Source-Anchored Canvas with dual reading and audit modes.',
    status: 'Built',
  },
  {
    slug: 'limitation-handling',
    title: 'Limitation Handling',
    desc: 'Acknowledge, Redirect, Invite — treating capability, knowledge, and commercial limits as structured pivot points.',
    status: 'Built',
  },
  {
    slug: 'correction-refinement',
    title: 'Correction & Refinement',
    desc: 'The Clarification Interceptor and block-level versioning — moving from blind regeneration to surgical iteration.',
    status: 'Built',
  },
  {
    slug: 'error-states',
    title: 'Error States',
    desc: 'The Heartbeat Watchdog and four-error taxonomy — eliminating silent failures through state escalation and input preservation.',
    status: 'Built',
  },
]

export default function PatternsIndex() {
  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
      {/* Header */}
      <div className="page-header">
        <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Pattern Library</p>
        <h1 className="font-serif" style={{ fontSize: 'var(--text-4xl)', fontWeight: 400, lineHeight: 'var(--line-height-tight)', marginBottom: 'var(--space-4)', color: 'var(--text)' }}>
          AI Interface Patterns
        </h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', maxWidth: 640 }}>
          Six pattern categories derived from a competitive audit of ChatGPT, Claude, Gemini, Perplexity, Notion AI, and GitHub Copilot. Each pattern defines the problem, the prescription, the design decisions, and the tradeoffs.
        </p>
      </div>

      {/* Pattern grid */}
      <div className="section-pad">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {patterns.map((p) => (
            <Link
              key={p.slug}
              href={`/patterns/${p.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="work-card" style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                padding: 'var(--space-6)',
                background: 'var(--surface)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text)', lineHeight: 'var(--line-height-tight)' }}>
                    {p.title}
                  </h2>
                  <span className="tag">{p.status}</span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', flex: 1 }}>
                  {p.desc}
                </p>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 'var(--font-weight-medium)' }}>
                  View pattern →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
