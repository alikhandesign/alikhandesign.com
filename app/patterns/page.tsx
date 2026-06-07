import Link from 'next/link'

const patterns = [
  {
    slug: 'generation-states',
    title: 'Generation States',
    desc: 'How the interface communicates thinking, streaming, completion, and stall — four states that current products collapse into one.',
    svg: `<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" fill="#FAF8F5"/>
      <rect x="16" y="16" width="168" height="88" rx="4" fill="white" stroke="#EDE9E4"/>
      <rect x="28" y="28" width="60" height="8" rx="2" fill="#EDE9E4"/>
      <rect x="28" y="44" width="144" height="6" rx="2" fill="#EDE9E4"/>
      <rect x="28" y="56" width="120" height="6" rx="2" fill="#EDE9E4"/>
      <rect x="28" y="68" width="96" height="6" rx="2" fill="#EDE9E4"/>
      <rect x="28" y="80" width="8" height="8" rx="4" fill="#89181A" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.4s" repeatCount="indefinite"/>
      </rect>
      <rect x="140" y="24" width="36" height="16" rx="3" fill="#EFF6FF" stroke="#BFDBFE"/>
      <rect x="146" y="29" width="6" height="6" rx="3" fill="#1D4ED8" opacity="0.8">
        <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.4s" repeatCount="indefinite"/>
      </rect>
      <rect x="156" y="30" width="14" height="4" rx="1" fill="#1D4ED8" opacity="0.6"/>
    </svg>`,
  },
  {
    slug: 'uncertainty-communication',
    title: 'Uncertainty Communication',
    desc: 'Placement, differentiation, and verifiability of hedging — addressing the gap between what models know and what interfaces signal.',
    svg: `<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" fill="#FAF8F5"/>
      <rect x="16" y="16" width="168" height="20" rx="3" fill="#FFFBEB" stroke="#FDE68A"/>
      <rect x="16" y="16" width="4" height="20" rx="1" fill="#F59E0B"/>
      <rect x="26" y="21" width="28" height="5" rx="1" fill="#B45309" opacity="0.8"/>
      <rect x="62" y="22" width="1" height="8" fill="#FDE68A"/>
      <rect x="68" y="21" width="80" height="4" rx="1" fill="#B45309" opacity="0.4"/>
      <rect x="68" y="27" width="60" height="4" rx="1" fill="#B45309" opacity="0.3"/>
      <rect x="16" y="44" width="168" height="60" rx="4" fill="white" stroke="#EDE9E4"/>
      <rect x="28" y="54" width="120" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="28" y="64" width="80" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="28" y="74" width="100" height="5" rx="1" fill="#F59E0B" opacity="0.4"/>
      <rect x="28" y="74" width="100" height="5" rx="1" fill="none" stroke="#F59E0B" stroke-dasharray="2 2" opacity="0.6"/>
      <rect x="28" y="84" width="60" height="5" rx="1" fill="#EDE9E4"/>
    </svg>`,
  },
  {
    slug: 'source-attribution',
    title: 'Source & Attribution',
    desc: 'Consistent, inline, accessible citation patterns — the Source-Anchored Canvas with dual reading and audit modes.',
    svg: `<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" fill="#FAF8F5"/>
      <rect x="16" y="16" width="104" height="88" rx="4" fill="white" stroke="#EDE9E4"/>
      <rect x="128" y="16" width="56" height="88" rx="4" fill="white" stroke="#EDE9E4"/>
      <rect x="26" y="28" width="72" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="26" y="40" width="84" height="4" rx="1" fill="#EDE9E4"/>
      <rect x="26" y="50" width="60" height="4" rx="1" fill="#EDE9E4"/>
      <rect x="26" y="60" width="76" height="4" rx="1" fill="#EDE9E4"/>
      <rect x="26" y="70" width="50" height="4" rx="1" fill="#EDE9E4"/>
      <rect x="88" y="39" width="10" height="6" rx="1" fill="#89181A" opacity="0.7"/>
      <rect x="88" y="59" width="10" height="6" rx="1" fill="#89181A" opacity="0.7"/>
      <rect x="134" y="26" width="40" height="18" rx="2" fill="#FAF8F5" stroke="#EDE9E4"/>
      <rect x="138" y="30" width="6" height="6" rx="1" fill="#89181A" opacity="0.4"/>
      <rect x="148" y="31" width="22" height="3" rx="1" fill="#EDE9E4"/>
      <rect x="148" y="36" width="16" height="2" rx="1" fill="#EDE9E4" opacity="0.6"/>
      <rect x="134" y="50" width="40" height="18" rx="2" fill="#EFF6FF" stroke="#BFDBFE"/>
      <rect x="138" y="54" width="6" height="6" rx="1" fill="#1D4ED8" opacity="0.4"/>
      <rect x="148" y="55" width="22" height="3" rx="1" fill="#BFDBFE"/>
      <rect x="148" y="60" width="16" height="2" rx="1" fill="#BFDBFE" opacity="0.6"/>
      <rect x="134" y="74" width="40" height="18" rx="2" fill="#FAF8F5" stroke="#EDE9E4"/>
      <rect x="138" y="78" width="6" height="6" rx="1" fill="#89181A" opacity="0.4"/>
      <rect x="148" y="79" width="22" height="3" rx="1" fill="#EDE9E4"/>
      <rect x="148" y="84" width="16" height="2" rx="1" fill="#EDE9E4" opacity="0.6"/>
    </svg>`,
  },
  {
    slug: 'limitation-handling',
    title: 'Limitation Handling',
    desc: 'Acknowledge, Redirect, Invite — treating capability, knowledge, and commercial limits as structured pivot points.',
    svg: `<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" fill="#FAF8F5"/>
      <rect x="16" y="16" width="168" height="88" rx="4" fill="white" stroke="#EDE9E4"/>
      <rect x="16" y="16" width="168" height="14" rx="3" fill="#FAF8F5" stroke="#EDE9E4"/>
      <rect x="24" y="20" width="50" height="6" rx="1" fill="#EDE9E4"/>
      <rect x="148" y="20" width="28" height="6" rx="2" fill="#F0FDF4" stroke="#BBF7D0"/>
      <rect x="28" y="38" width="144" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="28" y="50" width="120" height="5" rx="1" fill="#89181A" opacity="0.3"/>
      <rect x="28" y="62" width="100" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="28" y="78" width="56" height="16" rx="3" fill="#FAF8F5" stroke="#EDE9E4"/>
      <rect x="36" y="83" width="40" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="92" y="78" width="68" height="16" rx="3" fill="#89181A"/>
      <rect x="100" y="83" width="52" height="5" rx="1" fill="white" opacity="0.8"/>
    </svg>`,
  },
  {
    slug: 'correction-refinement',
    title: 'Correction & Refinement',
    desc: 'The Clarification Interceptor and block-level versioning — moving from blind regeneration to surgical iteration.',
    svg: `<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" fill="#FAF8F5"/>
      <rect x="16" y="16" width="168" height="88" rx="4" fill="white" stroke="#EDE9E4"/>
      <rect x="28" y="28" width="144" height="20" rx="3" fill="#FAF8F5" stroke="#EDE9E4"/>
      <rect x="36" y="33" width="80" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="36" y="40" width="60" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="28" y="54" width="144" height="20" rx="3" fill="#EFF6FF" stroke="#BFDBFE"/>
      <rect x="36" y="59" width="60" height="5" rx="1" fill="#BFDBFE"/>
      <rect x="36" y="66" width="80" height="5" rx="1" fill="#BFDBFE"/>
      <rect x="152" y="54" width="20" height="10" rx="2" fill="#EFF6FF" stroke="#BFDBFE"/>
      <rect x="154" y="57" width="6" height="4" rx="1" fill="#1D4ED8" opacity="0.5"/>
      <rect x="162" y="58" width="8" height="3" rx="1" fill="#1D4ED8" opacity="0.3"/>
      <rect x="28" y="80" width="64" height="14" rx="3" fill="#FAF8F5" stroke="#EDE9E4"/>
      <rect x="36" y="84" width="48" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="100" y="80" width="72" height="14" rx="3" fill="#FAF8F5" stroke="#EDE9E4"/>
      <rect x="108" y="84" width="56" height="5" rx="1" fill="#EDE9E4"/>
    </svg>`,
  },
  {
    slug: 'error-states',
    title: 'Error States',
    desc: 'The Heartbeat Watchdog and four-error taxonomy — eliminating silent failures through state escalation and input preservation.',
    svg: `<svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="120" fill="#FAF8F5"/>
      <rect x="16" y="16" width="168" height="88" rx="4" fill="white" stroke="#EDE9E4"/>
      <rect x="28" y="28" width="144" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="28" y="38" width="120" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="28" y="48" width="60" height="5" rx="1" fill="#EDE9E4"/>
      <rect x="16" y="60" width="168" height="3" fill="#89181A" opacity="0.2"/>
      <rect x="16" y="63" width="168" height="41" rx="0" fill="#FDF0F0"/>
      <rect x="16" y="63" width="3" height="41" fill="#89181A"/>
      <rect x="28" y="71" width="36" height="5" rx="1" fill="#89181A" opacity="0.7"/>
      <rect x="28" y="81" width="100" height="4" rx="1" fill="#89181A" opacity="0.3"/>
      <rect x="28" y="89" width="44" height="10" rx="2" fill="#89181A"/>
      <rect x="34" y="92" width="32" height="4" rx="1" fill="white" opacity="0.9"/>
      <rect x="80" y="89" width="44" height="10" rx="2" fill="#FAF8F5" stroke="#EDE9E4"/>
      <rect x="86" y="92" width="32" height="4" rx="1" fill="#EDE9E4"/>
    </svg>`,
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
          {patterns.map((p) => (
            <Link key={p.slug} href={`/patterns/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="work-card" style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--surface)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                cursor: 'pointer',
              }}>
                {/* SVG illustration area */}
                <div style={{ borderBottom: '1px solid var(--border)', lineHeight: 0 }}
                  dangerouslySetInnerHTML={{ __html: p.svg }}
                />
                {/* Card body */}
                <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
                  <h2 style={{ fontSize: 'var(--text-md)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text)', lineHeight: 'var(--line-height-tight)' }}>
                    {p.title}
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', flex: 1 }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border)' }}>
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
