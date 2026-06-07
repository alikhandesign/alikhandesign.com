import Link from 'next/link'

const patterns = [
  {
    slug: 'generation-states',
    title: 'Generation States',
    desc: 'How the interface communicates thinking, streaming, completion, and stall — four states that current products collapse into one.',
    svg: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="28" width="104" height="24" rx="4" fill="var(--warm-75)" stroke="var(--border)" strokeWidth="1"/>
        <circle cx="24" cy="40" r="4" fill="var(--border-mid)"/>
        <circle cx="38" cy="40" r="4" fill="var(--border-mid)" opacity="0.6"/>
        <circle cx="52" cy="40" r="4" fill="var(--border-mid)" opacity="0.3"/>
        <rect x="64" y="36" width="32" height="8" rx="2" fill="var(--border)"/>
        <rect x="8" y="60" width="60" height="4" rx="2" fill="var(--accent)" opacity="0.2"/>
        <rect x="8" y="60" width="36" height="4" rx="2" fill="var(--accent)" opacity="0.6"/>
      </svg>
    ),
  },
  {
    slug: 'uncertainty-communication',
    title: 'Uncertainty Communication',
    desc: 'Placement, differentiation, and verifiability of hedging — addressing the gap between what models know and what interfaces signal.',
    svg: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="8" width="104" height="6" rx="2" fill="#FDE68A"/>
        <rect x="8" y="22" width="80" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="8" y="30" width="96" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="8" y="38" width="60" height="3" rx="1.5" fill="var(--border)" opacity="0.5"/>
        <rect x="8" y="38" width="60" height="3" rx="1.5" fill="#F59E0B" opacity="0.3"/>
        <rect x="72" y="50" width="40" height="20" rx="3" fill="var(--warm-75)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="76" y="55" width="28" height="3" rx="1.5" fill="var(--border-mid)"/>
        <rect x="76" y="62" width="20" height="3" rx="1.5" fill="var(--border)"/>
      </svg>
    ),
  },
  {
    slug: 'source-attribution',
    title: 'Source & Attribution',
    desc: 'Consistent, inline, accessible citation patterns — the Source-Anchored Canvas with dual reading and audit modes.',
    svg: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="8" width="68" height="64" rx="3" fill="var(--warm-75)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="82" y="8" width="30" height="64" rx="3" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="14" y="18" width="48" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="14" y="26" width="56" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="14" y="34" width="40" height="3" rx="1.5" fill="var(--border)" opacity="0.5"/>
        <circle cx="60" cy="27" r="3" fill="var(--accent)" opacity="0.7"/>
        <rect x="86" y="16" width="20" height="12" rx="2" fill="var(--warm-75)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="86" y="32" width="20" height="12" rx="2" fill="var(--warm-75)" stroke="var(--border-mid)" strokeWidth="1"/>
        <rect x="86" y="48" width="20" height="12" rx="2" fill="var(--warm-75)" stroke="var(--border)" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    slug: 'limitation-handling',
    title: 'Limitation Handling',
    desc: 'Acknowledge, Redirect, Invite — treating capability, knowledge, and commercial limits as structured pivot points.',
    svg: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="8" width="104" height="20" rx="3" fill="var(--warm-75)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="14" y="14" width="6" height="6" rx="1" fill="var(--border-mid)"/>
        <rect x="26" y="15" width="40" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="26" y="21" width="28" height="2" rx="1" fill="var(--border)" opacity="0.5"/>
        <rect x="8" y="36" width="104" height="36" rx="3" fill="var(--surface)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="11" y="36" width="3" height="36" rx="1.5" fill="var(--accent)" opacity="0.7"/>
        <rect x="20" y="43" width="56" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="20" y="51" width="72" height="3" rx="1.5" fill="var(--border)" opacity="0.6"/>
        <rect x="20" y="59" width="40" height="3" rx="1.5" fill="var(--accent)" opacity="0.4"/>
      </svg>
    ),
  },
  {
    slug: 'correction-refinement',
    title: 'Correction & Refinement',
    desc: 'The Clarification Interceptor and block-level versioning — moving from blind regeneration to surgical iteration.',
    svg: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="8" width="104" height="28" rx="3" fill="var(--warm-75)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="14" y="16" width="52" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="14" y="24" width="36" height="3" rx="1.5" fill="var(--border)" opacity="0.5"/>
        <rect x="100" y="14" width="6" height="14" rx="2" fill="var(--border-mid)" opacity="0.5"/>
        <rect x="8" y="44" width="104" height="28" rx="3" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" opacity="0.6"/>
        <rect x="14" y="52" width="52" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="14" y="60" width="40" height="3" rx="1.5" fill="var(--border)" opacity="0.5"/>
        <rect x="100" y="50" width="6" height="14" rx="2" fill="var(--accent)" opacity="0.4"/>
        <path d="M60 38 L60 44" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 2"/>
      </svg>
    ),
  },
  {
    slug: 'error-states',
    title: 'Error States',
    desc: 'The Heartbeat Watchdog and four-error taxonomy — eliminating silent failures through state escalation and input preservation.',
    svg: (
      <svg viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="8" y="8" width="104" height="40" rx="3" fill="var(--warm-75)" stroke="var(--border)" strokeWidth="1"/>
        <rect x="14" y="16" width="60" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="14" y="24" width="80" height="3" rx="1.5" fill="var(--border)"/>
        <rect x="14" y="32" width="40" height="3" rx="1.5" fill="var(--border)" opacity="0.4"/>
        <rect x="8" y="56" width="104" height="16" rx="3" fill="var(--accent-bg)" stroke="#FECACA" strokeWidth="1"/>
        <rect x="11" y="56" width="3" height="16" rx="1.5" fill="var(--accent)"/>
        <rect x="20" y="61" width="36" height="3" rx="1.5" fill="var(--accent)" opacity="0.5"/>
        <rect x="80" y="60" width="24" height="8" rx="2" fill="var(--accent)" opacity="0.15"/>
      </svg>
    ),
  },
]

export default function PatternsIndex() {
  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
      <div className="page-header">
        <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Pattern Library</p>
        <h1 className="font-serif" style={{ fontSize: 'var(--text-4xl)', fontWeight: 400, lineHeight: 'var(--line-height-tight)', marginBottom: 'var(--space-4)', color: 'var(--text)' }}>
          AI Interface Patterns
        </h1>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', maxWidth: 640 }}>
          Six pattern categories derived from a competitive audit of ChatGPT, Claude, Gemini, Perplexity, Notion AI, and GitHub Copilot. Each pattern defines the problem, the prescription, the design decisions, and the tradeoffs.
        </p>
      </div>

      <div className="section-pad">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-6)' }}>
          {patterns.map((p) => (
            <Link key={p.slug} href={`/patterns/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="work-card" style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--surface)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                cursor: 'pointer',
              }}>
                {/* SVG preview area */}
                <div style={{ height: 140, background: 'var(--warm-75)', borderBottom: '1px solid var(--border)', padding: 'var(--space-4)' }}>
                  {p.svg}
                </div>
                {/* Card body */}
                <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
                  <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text)', lineHeight: 'var(--line-height-tight)' }}>
                    {p.title}
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', flex: 1 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent)', fontWeight: 'var(--font-weight-medium)' }}>
                      View pattern →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
