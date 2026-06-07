'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

type DemoState = 'idle' | 'intercepting' | 'refined'
type ClarificationType = 'tone' | 'accuracy' | 'format' | 'rephrase'

const CLARIFICATION_OPTIONS: Array<{ id: ClarificationType; label: string; icon: string }> = [
  { id: 'tone',     label: 'Change the tone',      icon: '🎨' },
  { id: 'accuracy', label: 'Fix fact or accuracy',  icon: '🎯' },
  { id: 'format',   label: 'Alter the formatting',  icon: '📋' },
  { id: 'rephrase', label: 'Rephrase highlighted',  icon: '✍️' },
]

const REFINED_RESPONSES: Record<ClarificationType, string> = {
  tone:     'The mitochondria is a critical organelle responsible for cellular energy production through oxidative phosphorylation. This process generates ATP, the primary energy currency of the cell, enabling essential biological functions.',
  accuracy: 'The mitochondria is the primary site of cellular respiration. Through a process called oxidative phosphorylation, it generates the majority of a cell\'s ATP supply — roughly 30–32 molecules per glucose molecule under aerobic conditions.',
  format:   'The mitochondria generates cellular energy.\n\nPrimary function: ATP synthesis\nProcess: Oxidative phosphorylation\nLocation: Inner mitochondrial membrane\nCommon name: Powerhouse of the cell',
  rephrase: 'Often described as the cell\'s powerhouse, the mitochondria converts nutrients into usable energy through a series of chemical reactions, producing the ATP molecules that fuel virtually every cellular process.',
}

export default function CorrectionRefinementPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [demoState, setDemoState] = useState<DemoState>('idle')
  const [selectedClarification, setSelectedClarification] = useState<ClarificationType | null>(null)
  const [versionIndex, setVersionIndex] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const ORIGINAL = 'The mitochondria is the powerhouse of the cell. It makes energy for the cell to use.'

  const handleVagueInput = () => {
    const vague = ['fix it', 'redo', 'try again', 'not right', 'wrong', 'bad', 'no']
    const isVague = vague.some(v => inputValue.toLowerCase().includes(v)) || inputValue.split(' ').length <= 3
    if (isVague) {
      setDemoState('intercepting')
      setSelectedClarification(null)
    }
    setInputValue('')
  }

  const handleClarification = (type: ClarificationType) => {
    setSelectedClarification(type)
    setDemoState('refined')
    setVersionIndex(v => v + 1)
  }

  const reset = () => {
    setDemoState('idle')
    setSelectedClarification(null)
    setVersionIndex(0)
    setInputValue('')
  }

  const definition = <Definition />

  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--warm-75)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
          {versionIndex > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <button
                onClick={() => setVersionIndex(v => Math.max(0, v - 1))}
                disabled={versionIndex === 0}
                style={{ ...btn('var(--text-muted)', 'transparent', 'transparent'), padding: '2px var(--space-2)', opacity: versionIndex === 0 ? 0.3 : 1 }}
              >
                &lsaquo;
              </button>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>v{versionIndex + 1}</span>
              <button
                disabled
                style={{ ...btn('var(--text-muted)', 'transparent', 'transparent'), padding: '2px var(--space-2)', opacity: 0.3 }}
              >
                &rsaquo;
              </button>
            </div>
          )}
        </div>

        <div style={{ padding: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)', whiteSpace: 'pre-line' }}>
            {demoState === 'refined' && selectedClarification ? REFINED_RESPONSES[selectedClarification] : ORIGINAL}
          </p>
        </div>

        {demoState === 'intercepting' && (
          <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-5)', background: 'var(--warm-75)' }}>
            <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-3)' }}>
              What specifically should change?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              {CLARIFICATION_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleClarification(opt.id)}
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text)',
                    fontFamily: 'var(--font-sans)',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    transition: 'border-color var(--transition-base)',
                  }}
                >
                  <span>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-3) var(--space-4)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && inputValue.trim()) handleVagueInput() }}
            placeholder='Try "fix it" or "not quite right" then press Enter'
            style={{ flex: 1, padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', background: 'var(--surface)', color: 'var(--text)', outline: 'none' }}
          />
          <button onClick={reset} style={btn('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>Reset</button>
        </div>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
        Type a vague correction and press Enter to trigger the Clarification Interceptor. Selecting a clarification type produces a targeted refinement and increments the version counter.
      </p>
    </div>
  )

  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {[
        { label: 'Clarification interceptor', desc: 'Triggered by vague correction input (3 words or fewer, or known vague phrases). Presents structured options before generating.' },
        { label: 'Version navigation', desc: 'Arrow controls with version count. User can return to any prior version. Appears after first refinement.' },
        { label: 'Block-level fork', desc: 'Advanced: individual paragraphs fork independently. The rest of the response remains unchanged. Enhancement, not minimum viable.' },
        { label: 'Inline selection', desc: 'Highlighted text surfaces a micro-menu: Refine Selected or Flag Error. Submits the specific string to the next generation turn.' },
      ].map(item => (
        <div key={item.label} style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text)', marginBottom: 'var(--space-2)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>{item.desc}</p>
        </div>
      ))}
    </div>
  )

  return (
    <PatternShell
      title="Correction & Refinement"
      slug="correction-refinement"
      problem="Vague corrections trigger blind regeneration. No product in the audit prompts for clarification before rewriting — producing a new output that may preserve the exact problem the user was trying to fix."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
      mobileContent={{ definition, demo, states }}
    >
      {activeTab === 'definition' && definition}
      {activeTab === 'demo' && demo}
      {activeTab === 'states' && states}
    </PatternShell>
  )
}

function Definition() {
  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { label: 'Problem', text: 'AI output is rarely perfect on the first attempt. When users express general dissatisfaction, every product audited responds with blind regeneration — producing a new output without asking what specifically was wrong. The result is regeneration that may preserve the exact structural or tonal problem the user was trying to fix.' },
        { label: 'Prescription', text: 'Three requirements: preserved history (all prior versions accessible and navigable), clarification on vague correction (the interface prompts before regenerating when the correction signal is non-specific), and granular feedback mechanisms (structured options that give users language for their dissatisfaction).' },
        { label: 'Design decisions', text: 'When to prompt for clarification vs. regenerate immediately. Version navigation UI — how many versions to retain, whether versions are labeled. Feedback specificity — structured modal vs. thumbs-down. Whether to support partial correction targeting on selected text.' },
        { label: 'Tradeoffs', text: 'Clarification prompts add a round-trip before the user gets a new response. In low-stakes contexts this feels like friction. Preserved response history increases interface complexity. Structured feedback modals interrupt conversation flow for users who prefer to rephrase and try again immediately.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function btn(color: string, bg: string, border: string): CSSProperties {
  return {
    padding: 'var(--space-2) var(--space-4)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color,
    background: bg,
    border: `1px solid ${border}`,
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    fontFamily: 'var(--font-sans)',
    transition: 'opacity var(--transition-base)',
  }
}
