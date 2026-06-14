'use client'
import { useState } from 'react'

const CATEGORIES = [
  {
    id: 'systemic',
    label: 'Systemic',
    desc: 'Structural failures baked into how the system was designed — not fixable through better prompting.',
    modes: [
      { name: 'Session Blindness', count: 11, track: 'Both tracks', def: 'No persistent model of the user. Each prompt is processed as if it were the first interaction. Context established in prompt one is absent by prompt two.' },
      { name: 'Generic Output', count: 10, track: 'Both tracks', def: 'Content that could belong to any designer, any business, any portfolio. Defaults to the most common vocabulary for the detected category. Technically correct, personally meaningless.' },
      { name: 'Opacity', count: 8, track: 'Both tracks', def: 'AI makes design and content decisions without explanation. No visibility into why a particular layout, phrase, or structure was chosen — and no mechanism to challenge or redirect without starting over.' },
      { name: 'Template Prison', count: 4, track: 'Both tracks', def: 'Pre-formed structure applied regardless of explicit instructions. Knows what a "skills section" or "CTA" looks like by convention and produces that convention — overriding constraints.' },
    ],
  },
  {
    id: 'fabrication',
    label: 'Fabrication',
    desc: 'The AI invented things that were never provided — presented with complete confidence.',
    modes: [
      { name: 'Fabrication', count: 3, track: 'Track B', def: 'Invents specific, plausible-sounding details — metrics, credentials, contact information. Sounds credible and confident. None of it is true.' },
      { name: 'Context Collapse', count: 3, track: 'Track B', def: 'Correctly identifies a data point but applies it to the wrong context. "45% faster time-to-convert" became e-commerce checkout copy. Real information stripped of its actual meaning.' },
      { name: 'Domain Collapse', count: 2, track: 'Track B', def: 'Maps the prompt to an entirely different professional field. "AI research pipeline, 8 hours to 8 minutes" became 600 words of chemical synthesis documentation.' },
      { name: 'Identity Fabrication', count: 1, track: 'Track B · Intent 7', def: 'Generated a complete persona — name, degrees in cognitive science, speaking career — for "Alexandre Khan." A fictional character built from category patterns.' },
    ],
  },
  {
    id: 'interface',
    label: 'Interface',
    desc: 'UX decisions that failed before the AI generated a single word.',
    modes: [
      { name: 'False Promise', count: 2, track: 'Track A', def: '"Customized for your brand or business after a few simple questions." The system structurally cannot fulfill this claim. Personalization was the marketing frame applied afterward.' },
      { name: 'Intent Translation Failure', count: 2, track: 'Track A', def: '"Get hired" had to become "Showcase work/expertise." The translation is lossy. The actual goal — employment — has no place in the system\'s model of the world.' },
      { name: 'False Equivalence', count: 1, track: 'Track A', def: 'Template browsing and AI generation presented as parallel choices with identical visual weight. They aren\'t — one gives agency before commitment, one after.' },
      { name: 'False Recommendation', count: 1, track: 'Track A', def: '"Recommended" palette based on a single category label. Maps one word ("Professional") to one palette. Did not map me to a palette. Those are completely different things.' },
      { name: 'Discoverability Failure', count: 1, track: 'Track A', def: '"UI/UX Design" existed and produced different output — but was only discoverable by searching. The system has more capability than it surfaces.' },
      { name: 'Asset Blindness', count: 1, track: 'Track A', def: 'Never asked about existing logo or brand assets. Font recommendations made with zero awareness of the most important brand element I own — my actual signature.' },
      { name: 'Completion Theater', count: 1, track: 'Track A', def: '"2/7 complete" — a progress indicator for a site with no relevant content, no voice, and no connection to my goals. Tasks marked complete that aren\'t done in any meaningful sense.' },
      { name: 'Silent Assumption', count: 1, track: 'Track A', def: 'Used existing account data to pre-populate inputs without disclosure. I couldn\'t see or correct the assumptions before the site was generated.' },
    ],
  },
  {
    id: 'output',
    label: 'Output',
    desc: 'Problems with generated content — harder to detect because the output is often technically acceptable.',
    modes: [
      { name: 'Voice Displacement', count: 2, track: 'Track B', def: 'High-quality, well-written output — for a competent anonymous designer, not Ali Khan. The most dangerous failure because it\'s the hardest to catch. Almost publishable. Not mine.' },
      { name: 'Literal Compliance', count: 2, track: 'Track B', def: 'Followed the format instruction, missed the intent. The correct type of thing, in the wrong way. Technically fulfilling the brief while failing its purpose entirely.' },
      { name: 'False Distinctiveness', count: 2, track: 'Track B', def: 'Swapped one set of clichés for another. Signals effort toward creativity without achieving it. "Studio Story" instead of "About" — different convention, same problem.' },
      { name: 'Tone Inversion', count: 1, track: 'Track B · Intent 8', def: 'Explicit instruction: "urgent but not desperate." Output: maximally desperate — fake phone number, specific calling hours, a 15-minute plan for 30/60/90-day impact. It didn\'t miss the tone. It inverted it.' },
    ],
  },
]

export default function FailureModeTaxonomy() {
  const [activeCategory, setActiveCategory] = useState('systemic')
  const [expandedMode, setExpandedMode] = useState<string | null>(null)

  const category = CATEGORIES.find(c => c.id === activeCategory)!

  return (
    <div style={{ margin: '2rem 0' }}>
      {/* Category tabs */}
      <div style={{
        display: 'flex', gap: 0,
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
        overflowX: 'auto',
      }}>
        {CATEGORIES.map(cat => {
          const isActive = cat.id === activeCategory
          const total = cat.modes.reduce((s, m) => s + m.count, 0)
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setExpandedMode(null) }}
              style={{
                padding: '0.625rem 1rem',
                fontSize: 'var(--font-size-xs)',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                marginBottom: -1,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap' as const,
                transition: 'color 0.15s',
              }}
            >
              {cat.label}
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '1px 5px',
                borderRadius: 3,
                background: isActive ? 'var(--color-accent-bg)' : 'var(--color-surface-subtle)',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
              }}>
                {total}
              </span>
            </button>
          )
        })}
      </div>

      {/* Category description */}
      <p style={{
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-muted)',
        marginBottom: '1rem',
        lineHeight: 1.6,
      }}>
        {category.desc}
      </p>

      {/* Failure mode list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {category.modes.map(mode => {
          const isExpanded = expandedMode === mode.name
          return (
            <div
              key={mode.name}
              style={{
                border: `1px solid ${isExpanded ? 'var(--color-border-mid)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface)',
                overflow: 'hidden',
                transition: 'border-color 0.15s',
              }}
            >
              <button
                onClick={() => setExpandedMode(isExpanded ? null : mode.name)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                    textAlign: 'left' as const,
                  }}>
                    {mode.name}
                  </span>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: 3,
                    background: mode.count >= 4 ? 'var(--color-accent)' : 'var(--color-accent-bg)',
                    color: mode.count >= 4 ? 'var(--color-bg)' : 'var(--color-accent)',
                    flexShrink: 0,
                  }}>
                    {mode.count}×
                  </span>
                  <span style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-faint)',
                    flexShrink: 0,
                  }}>
                    {mode.track}
                  </span>
                </div>
                <span style={{
                  fontSize: 12,
                  color: 'var(--color-text-muted)',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  flexShrink: 0,
                }}>
                  ↓
                </span>
              </button>

              {isExpanded && (
                <div style={{
                  padding: '0 1rem 1rem',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: '0.75rem',
                }}>
                  <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-mid)',
                    lineHeight: 1.7,
                  }}>
                    {mode.def}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '1rem',
        paddingTop: '0.875rem',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: 8,
      }}>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)' }}>
          20 failure modes · 22 documented intents · Track A (10 steps) + Track B (12 intents)
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--color-text-muted)' }}>
            <span style={{ background: 'var(--color-accent)', width: 8, height: 8, borderRadius: 2, display: 'inline-block' }} />
            4+ appearances
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: 'var(--color-text-muted)' }}>
            <span style={{ background: 'var(--color-accent-bg)', border: '1px solid var(--color-accent)', width: 8, height: 8, borderRadius: 2, display: 'inline-block' }} />
            1–3 appearances
          </span>
        </div>
      </div>
    </div>
  )
}
