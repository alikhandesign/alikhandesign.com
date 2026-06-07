'use client'
import { useState, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import Tag from '../../components/Tag'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

const NAV = {
  prev: { slug: 'limitation-handling', title: 'Limitation Handling' },
  next: { slug: 'error-states', title: 'Error States' },
}

const CLARIFICATION_OPTIONS = [
  { id: 'tone', label: 'Change the tone' },
  { id: 'accuracy', label: 'Fix a factual error' },
  { id: 'format', label: 'Alter the formatting' },
  { id: 'rephrase', label: 'Rephrase a specific section' },
]

const RESPONSE_V1 = "The Participant Listening Agent achieved 95% categorization accuracy, validated through a double-blind methodology. The system reduced research synthesis time from 8 hours to under 8 minutes — returning approximately 20% of the research team's weekly capacity to higher-value work."

const RESPONSE_V2 = "Using a double-blind validation methodology, the Participant Listening Agent reached 95% categorization accuracy. Research synthesis dropped from a full day to under 8 minutes. That efficiency gain returned roughly 20% of the team's weekly capacity — time now spent on analysis rather than data processing."

type DemoState = 'initial' | 'vague-input' | 'intercepted' | 'refined' | 'v2'

export default function CorrectionRefinementPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [demoState, setDemoState] = useState<DemoState>('initial')
  const [inputValue, setInputValue] = useState('')
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [activeVersion, setActiveVersion] = useState<1|2>(1)

  const handleSend = () => {
    const vague = ['fix it','redo','try again','not right','wrong','change it','no','nope'].some(v => inputValue.toLowerCase().includes(v)) || inputValue.trim().split(' ').length <= 3
    if (vague) {
      setDemoState('intercepted')
    } else {
      setDemoState('refined')
    }
    setInputValue('')
  }

  const handleOptionSelect = (id: string) => {
    setSelectedOption(id)
    setTimeout(() => {
      setDemoState('v2')
      setActiveVersion(2)
    }, 600)
  }

  const reset = () => {
    setDemoState('initial')
    setInputValue('')
    setSelectedOption(null)
    setActiveVersion(1)
  }

  return (
    <PatternShell
      title="Correction & Refinement"
      patternName="Correction & Refinement"
      problem="Vague corrections trigger blind regeneration across every product audited. No product prompts for clarification before rewriting, meaning a user who says 'fix it' gets a new response that may preserve the exact problem they wanted fixed."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
      nav={NAV}
    >
      {activeTab === 'definition' && <Definition />}

      {activeTab === 'demo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
            {/* Response area */}
            <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Version tabs */}
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginRight: 'var(--space-2)' }}>Version</span>
                {([1,2] as const).map(v => (
                  <button key={v} onClick={() => v <= (demoState === 'v2' ? 2 : 1) && setActiveVersion(v)} style={{ padding: '2px 10px', fontSize: 'var(--text-xs)', fontWeight: activeVersion === v ? 'var(--font-weight-semibold)' : 'var(--font-weight-regular)', color: activeVersion === v ? 'var(--accent)' : demoState !== 'v2' && v === 2 ? 'var(--text-faint)' : 'var(--text-muted)', background: activeVersion === v ? 'var(--accent-bg)' : 'var(--warm-75)', border: `1px solid ${activeVersion === v ? '#FECACA' : 'var(--border)'}`, borderRadius: 'var(--radius)', cursor: demoState !== 'v2' && v === 2 ? 'not-allowed' : 'pointer', fontFamily: 'var(--font-sans)', opacity: demoState !== 'v2' && v === 2 ? 0.4 : 1 }}>
                    v{v}
                  </button>
                ))}
              </div>

              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
                {activeVersion === 1 ? RESPONSE_V1 : RESPONSE_V2}
              </p>
            </div>

            {/* Clarification interceptor */}
            {demoState === 'intercepted' && (
              <div style={{ padding: 'var(--space-5)', background: 'var(--warm-75)', borderBottom: '1px solid var(--border)' }}>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-3)' }}>
                  What specifically should change?
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                  {CLARIFICATION_OPTIONS.map(opt => (
                    <button key={opt.id} onClick={() => handleOptionSelect(opt.id)} style={{ padding: 'var(--space-3)', fontSize: 'var(--text-sm)', color: selectedOption === opt.id ? 'var(--accent)' : 'var(--text)', background: selectedOption === opt.id ? 'var(--accent-bg)' : 'var(--surface)', border: `1px solid ${selectedOption === opt.id ? '#FECACA' : 'var(--border)'}`, borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-sans)', textAlign: 'left', transition: 'all var(--transition-base)' }}>
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginTop: 'var(--space-3)' }}>Or type specific details in the input below.</p>
              </div>
            )}

            {demoState === 'v2' && (
              <div style={{ padding: 'var(--space-3) var(--space-5)', background: '#F0FDF4', borderBottom: '1px solid #BBF7D0' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: '#15803D' }}>Refined based on: {CLARIFICATION_OPTIONS.find(o => o.id === selectedOption)?.label}. v1 preserved — use version controls above to compare.</p>
              </div>
            )}

            {/* Input */}
            <div style={{ padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && inputValue.trim() && handleSend()}
                placeholder={demoState === 'intercepted' ? 'Or describe what to change...' : 'Try "fix it" or "redo this" to trigger the interceptor...'}
                style={{ flex: 1, padding: 'var(--space-3)', fontSize: 'var(--text-sm)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontFamily: 'var(--font-sans)', background: 'var(--surface)', color: 'var(--text)', outline: 'none' }}
              />
              {inputValue.trim() && <button onClick={handleSend} style={{ ...btn('var(--bg)', 'var(--accent)', 'var(--accent-dark)'), color: 'var(--bg)' }}>Send</button>}
              {demoState !== 'initial' && <button onClick={reset} style={btn('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>Reset</button>}
            </div>
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
            Type a vague correction ("fix it", "redo", "not right") to trigger the Clarification Interceptor. Select an option to see the refined response. Both versions remain accessible via the version controls.
          </p>
        </div>
      )}

      {activeTab === 'states' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {[
            { label: 'Clarification interceptor', desc: 'Triggered on vague corrections (under 4 words, or containing "fix", "redo", "try again"). Halts regeneration and surfaces structured options. Skippable for power users.' },
            { label: 'Version navigation', desc: 'All prior response versions preserved and navigable. Arrow controls or version tabs allow comparison without resubmitting the prompt.' },
            { label: 'Block-level versioning', desc: 'Individual paragraphs fork independently on targeted correction. Only the corrected block updates — surrounding content preserved. Enhancement on top of response-level versioning.' },
            { label: 'Inline selection', desc: 'User highlights a specific sentence or phrase. A micro-menu appears: Refine selected text / Flag error. Enables surgical correction without rewriting the full response.' },
            { label: 'Structured feedback', desc: 'Thumbs-down opens a modal with categorized options: Inaccurate, Too long, Off-topic, Wrong format. Provides model improvement signal and gives users language for their dissatisfaction.' },
          ].map(item => (
            <div key={item.label} style={{ padding:'var(--space-4)',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--surface)',display:'flex',flexDirection:'column',gap:'var(--space-2)' }}>
              <p style={{ fontSize:'var(--text-sm)',fontWeight:'var(--font-weight-semibold)',color:'var(--text)' }}>{item.label}</p>
              <p style={{ fontSize:'var(--text-sm)',color:'var(--text-muted)',lineHeight:'var(--line-height-normal)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </PatternShell>
  )
}

function Definition() {
  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { label: 'Problem', text: 'AI output is rarely perfect on the first attempt. The interface must support iteration — a reliable, low-friction path from an unsatisfactory response toward a better one. The audit found two consistent gaps: vague corrections trigger blind regeneration that may preserve the exact problem the user wanted fixed, and no product prompts for clarification before rewriting.' },
        { label: 'Prescription', text: 'All prior response versions must be preserved and navigable. When a correction signal is non-specific, the interface should prompt for clarification before regenerating. Users should be able to indicate what specifically was wrong — not just that the response was wrong. The correction flow should feel like a continuation of the conversation, not a restart.' },
        { label: 'Design decisions', text: 'When to prompt vs regenerate immediately: clarification adds a step that power users experience as friction. The interceptor must be skippable. Version navigation UI: arrow-based with version count is the established convention. Feedback specificity: a thumbs-down button collects signal but no information — structured categories collect more useful data for model improvement.' },
        { label: 'Tradeoffs', text: 'Clarification prompts add a round-trip before the user gets a new response. In low-stakes contexts this friction is unwelcome. Preserved response history increases interface complexity and storage requirements. Structured feedback modals interrupt conversation flow — the mechanism should be accessible without being mandatory for users who prefer to move on.' },
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
  return { padding:'var(--space-2) var(--space-4)',fontSize:'var(--text-sm)',fontWeight:'var(--font-weight-medium)',color,background:bg,border:`1px solid ${border}`,borderRadius:'var(--radius)',cursor:'pointer',fontFamily:'var(--font-sans)',transition:'opacity var(--transition-base)' }
}
