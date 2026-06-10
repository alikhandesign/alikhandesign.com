'use client'
import { useState, useRef, useEffect, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import PatternAnnotation from '../../components/PatternAnnotation'
import Button from '../../components/Button'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo',       label: 'Interactive demo' },
  { id: 'states',     label: 'All states' },
]

const ANNOTATION = 'Every product in the audit responds to vague corrections with blind regeneration — producing a new output without asking what specifically was wrong. GitHub Copilot is the only product that explicitly marks an interrupted response as incomplete. No product prompts for clarification before rewriting, meaning the regenerated output may preserve the exact structural or tonal problem the user was trying to fix.'

type DemoState = 'idle' | 'intercepting' | 'refined'
type ClarificationType = 'tone' | 'specific' | 'format' | 'rephrase'
type ToneOption = 'More professional' | 'More academic' | 'More conversational' | 'Simpler'

const TONE_OPTIONS: ToneOption[] = ['More professional', 'More academic', 'More conversational', 'Simpler']

const ORIGINAL = `The mitochondria is often called the powerhouse of the cell. It makes energy for the cell to use by breaking down nutrients. This energy is stored in a molecule called ATP, which the cell uses to do things like move, grow, and respond to its environment.

Mitochondria are found in almost all cells that have a nucleus. They have their own DNA, which is separate from the DNA in the cell's nucleus. Scientists think mitochondria used to be separate bacteria that were absorbed by larger cells a long time ago.

The process mitochondria use to make energy is called cellular respiration. It takes in oxygen and glucose and produces ATP as a byproduct, along with carbon dioxide and water.`

const REFINED: Record<string, string> = {
  'tone-More professional':   'Mitochondria are membrane-bound organelles responsible for the production of adenosine triphosphate (ATP) through oxidative phosphorylation. Present in virtually all eukaryotic cells, mitochondria maintain their own circular genome — a vestige of their proposed endosymbiotic origin — and play a central role in cellular energy metabolism, apoptosis regulation, and calcium homeostasis.\n\nThe electron transport chain, located along the inner mitochondrial membrane, drives ATP synthesis by coupling electron transfer to proton pumping across the membrane, generating a gradient that powers ATP synthase.',
  'tone-More academic':       'Mitochondria (singular: mitochondrion) are double-membraned organelles found in eukaryotic cells, widely recognized for their role in aerobic ATP synthesis via oxidative phosphorylation (OXPHOS). The endosymbiotic theory, proposed by Lynn Margulis (1967), posits that mitochondria descended from proteobacterial ancestors incorporated into proto-eukaryotic host cells.\n\nMitochondrial function extends beyond bioenergetics: these organelles participate in reactive oxygen species (ROS) signaling, apoptotic pathways (including cytochrome c release), and calcium buffering — functions with significant implications in aging and disease.',
  'tone-More conversational': 'Think of mitochondria as tiny power plants inside your cells. Their main job is taking the food you eat and converting it into usable energy in the form of ATP. Every time your muscles contract or your brain fires a signal, ATP is what makes it happen.\n\nWhat makes mitochondria interesting is that they have their own DNA, separate from the rest of your cell. That is because billions of years ago, they were actually independent bacteria that got absorbed into larger cells — and the relationship worked out so well that it stuck.',
  'tone-Simpler':             'Mitochondria make energy for your cells. They take in food and oxygen and turn them into ATP — the fuel cells use to work.\n\nAlmost every cell in your body has mitochondria. They have their own DNA, which is unusual. Scientists think that is because they used to be separate living things before they became part of our cells.',
  'specific':  'Mitochondria produce ATP through oxidative phosphorylation along the inner mitochondrial membrane. A typical human cell contains between 1,000 and 2,500 mitochondria, though cardiac muscle cells can contain up to 5,000.\n\nUnder aerobic conditions, one molecule of glucose yields approximately 30 to 32 ATP molecules via oxidative phosphorylation, compared to just 2 ATP from anaerobic glycolysis alone. The efficiency difference explains why organisms evolved to use oxygen for energy production.\n\nMitochondria also contain their own ribosomes and can synthesize 13 proteins independently of the nuclear genome.',
  'format':    'Mitochondria: Key Facts\n\nFunction\nPrimary: ATP synthesis via oxidative phosphorylation\nSecondary: apoptosis regulation, calcium signaling, ROS production\n\nStructure\nDouble membrane — inner and outer\nInner membrane folds called cristae\nMatrix contains mitochondrial DNA and ribosomes\n\nDistribution\nPresent in virtually all eukaryotic cells\nCount per cell: 1,000 to 2,500 (up to 5,000 in high-demand cells)\n\nOrigin\nEndosymbiotic theory: descended from proteobacteria\nEvidence: own DNA, double membrane, bacterial-type ribosomes',
  'rephrase':  'The mitochondria is the metabolic core of the cell. Through a sequence of chemical reactions known as cellular respiration, it converts glucose and oxygen into adenosine triphosphate — the universal energy currency that powers virtually every cellular process, from muscle contraction to protein synthesis.\n\nUnlike other organelles, mitochondria carry their own genetic material, a remnant of their ancient bacterial ancestry. This unique feature, combined with their double-membrane structure, supports the endosymbiotic theory: that mitochondria were once free-living bacteria absorbed by a host cell in an evolutionary partnership that proved mutually beneficial.',
}

export default function CorrectionRefinementPage() {
  const [activeTab, setActiveTab]           = useState('definition')
  const [demoState, setDemoState]           = useState<DemoState>('idle')
  const [selectedType, setSelectedType]     = useState<ClarificationType | null>(null)
  const [selectedTone, setSelectedTone]     = useState<ToneOption>('More professional')
  const [showToneDropdown, setShowToneDropdown] = useState(false)
  const [versionHistory, setVersionHistory] = useState<string[]>([ORIGINAL])
  const [versionIndex, setVersionIndex]     = useState(0)
  const [inputValue, setInputValue]         = useState('')
  const [selection, setSelection]           = useState<{ top: number; left: number } | null>(null)
  const responseRef = useRef<HTMLDivElement>(null)

  const currentResponse = versionHistory[versionIndex]

  const handleVagueInput = () => {
    const vague = ['fix', 'redo', 'try again', 'not right', 'wrong', 'bad', 'no', 'again', 'nope']
    const isVague = vague.some(v => inputValue.toLowerCase().includes(v)) || inputValue.trim().split(' ').length <= 3
    if (isVague && inputValue.trim()) { setDemoState('intercepting'); setSelectedType(null) }
    setInputValue('')
  }

  const applyRefinement = (type: ClarificationType, tone?: ToneOption) => {
    const key = type === 'tone' ? `tone-${tone ?? selectedTone}` : type
    const refined = REFINED[key] ?? currentResponse
    const newHistory = versionHistory.slice(0, versionIndex + 1)
    newHistory.push(refined)
    setVersionHistory(newHistory)
    setVersionIndex(newHistory.length - 1)
    setSelectedType(type)
    setDemoState('refined')
    setSelection(null)
  }

  const reset = () => {
    setDemoState('idle'); setSelectedType(null)
    setVersionHistory([ORIGINAL]); setVersionIndex(0)
    setInputValue(''); setSelection(null)
  }

  const handleMouseUp = () => {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed || !responseRef.current) { setSelection(null); return }
    if (sel.toString().trim().length < 5) { setSelection(null); return }
    const range = sel.getRangeAt(0)
    const rect  = range.getBoundingClientRect()
    const cRect = responseRef.current.getBoundingClientRect()
    setSelection({ top: rect.top - cRect.top - 44, left: Math.max(0, rect.left - cRect.left + rect.width / 2 - 90) })
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (responseRef.current && !responseRef.current.contains(e.target as Node)) setSelection(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PatternAnnotation finding={ANNOTATION} />
      <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', background: 'var(--color-surface)', overflow: 'hidden' }}>
        {/* Chrome bar */}
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', textTransform: 'uppercase' }}>AI response</span>
          {versionHistory.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <button onClick={() => setVersionIndex(v => Math.max(0, v - 1))} disabled={versionIndex === 0}
                aria-label="Previous version"
                style={{ ...vBtn, opacity: versionIndex === 0 ? 0.3 : 1 }}>‹</button>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', minWidth: 36, textAlign: 'center' }}>v{versionIndex + 1}/{versionHistory.length}</span>
              <button onClick={() => setVersionIndex(v => Math.min(versionHistory.length - 1, v + 1))} disabled={versionIndex === versionHistory.length - 1}
                aria-label="Next version"
                style={{ ...vBtn, opacity: versionIndex === versionHistory.length - 1 ? 0.3 : 1 }}>›</button>
            </div>
          )}
        </div>

        {/* Selectable response */}
        <div ref={responseRef} onMouseUp={handleMouseUp}
          style={{ padding: 'var(--space-6)', position: 'relative', userSelect: 'text', cursor: 'text' }}>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text)', lineHeight: 'var(--line-height-loose)', whiteSpace: 'pre-line' }}>
            {currentResponse}
          </p>
          {selection && (
            <div style={{ position: 'absolute', top: selection.top, left: selection.left, background: 'var(--color-bg-dark)', borderRadius: 'var(--radius)', padding: '4px 6px', display: 'flex', gap: 4, zIndex: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              <button onClick={() => { applyRefinement('rephrase'); setSelection(null) }}
                style={{ fontSize: 'var(--text-xs)', color: '#fff', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: 2, fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>
                ✍️ Rephrase selected
              </button>
              <button onClick={() => setSelection(null)}
                style={{ fontSize: 'var(--text-xs)', color: '#C4BDB7', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px', borderRadius: 2, fontFamily: 'var(--font-sans)' }}>
                Flag error
              </button>
            </div>
          )}
        </div>

        {/* Clarification interceptor */}
        {demoState === 'intercepting' && (
          <div style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-5)', background: 'var(--color-surface-subtle)' }}>
            <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-4)' }}>
              What specifically should change?
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
              {/* Tone dropdown */}
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowToneDropdown(d => !d)} style={{ ...interceptorBtn(selectedType === 'tone'), justifyContent: 'space-between' }}>
                  <span>🎨 Change tone</span>
                  <span style={{ fontSize: 10, color: 'var(--color-text-muted)' }}>▾</span>
                </button>
                {showToneDropdown && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', marginTop: 2 }}>
                    {TONE_OPTIONS.map(opt => (
                      <button key={opt} onClick={() => { setSelectedTone(opt); setShowToneDropdown(false); applyRefinement('tone', opt) }}
                        style={{ width: '100%', padding: 'var(--space-2) var(--space-4)', background: selectedTone === opt ? 'var(--color-surface-subtle)' : 'none', border: 'none', cursor: 'pointer', fontSize: 'var(--text-sm)', color: 'var(--color-text)', fontFamily: 'var(--font-sans)', textAlign: 'left', display: 'block' }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={() => applyRefinement('specific')} style={interceptorBtn(selectedType === 'specific')}>🎯 Be more specific</button>
              <button onClick={() => applyRefinement('format')}   style={interceptorBtn(selectedType === 'format')}>📋 Alter the formatting</button>
              <button onClick={() => applyRefinement('rephrase')} style={interceptorBtn(selectedType === 'rephrase')}>✍️ Rephrase selection</button>
            </div>
          </div>
        )}

        {/* Input bar */}
        <div style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-3) var(--space-4)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center', background: 'var(--color-surface-subtle)' }}>
          <input value={inputValue} onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && inputValue.trim()) handleVagueInput() }}
            placeholder='Type "fix it" or "not right" then Enter — or select text above'
            style={{ flex: 1, padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', background: 'var(--color-surface)', color: 'var(--color-text)', outline: 'none' }}
          />
          <Button label="Reset" variant="secondary" onClick={reset} arrow={false} />
        </div>
      </div>
    </div>
  )

  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {[
        { label: 'Clarification interceptor', desc: 'Triggered by vague correction input — short phrases or known vague terms. Presents structured options before generating. Prevents blind rewrites.' },
        { label: 'Version navigation', desc: 'Arrow controls with v1/3 format. Back arrow returns to the original response. Full history preserved for the session.' },
        { label: 'Inline text selection', desc: 'Selecting any text in the response surfaces a contextual toolbar: Rephrase selected or Flag error. Submits the specific string to the next generation turn.' },
        { label: 'Tone dropdown', desc: 'Change tone opens a dropdown with four options — More professional, More academic, More conversational, Simpler. Communicates that specific options exist rather than leaving users to describe tone freeform.' },
      ].map(item => (
        <div key={item.label} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', background: 'var(--color-surface)' }}>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)' }}>{item.desc}</p>
        </div>
      ))}
    </div>
  )

  const definition = <Definition />

  return (
    <PatternShell title="Correction & Refinement" slug="correction-refinement"
      problem="Vague corrections trigger blind regeneration. No product in the audit prompts for clarification before rewriting — producing a new output that may preserve the exact problem the user was trying to fix."
      activeTab={activeTab} onTabChange={setActiveTab} tabs={TABS}
      mobileContent={{ definition, demo, states }}>
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
        { label: 'Prescription', text: 'Three requirements: preserved history (all prior versions accessible and navigable, back arrow returns to original), clarification on vague correction (structured options before regeneration, including a tone dropdown with specific options), and inline text selection (selecting specific text surfaces a contextual toolbar for targeted refinement).' },
        { label: 'Design decisions', text: 'Tone change as dropdown vs. flat button — dropdown communicates that specific options exist rather than leaving users to describe tone freeform. "Be more specific" rather than "Fix fact or accuracy" — more accurate description of the output. Inline selection toolbar appears on text selection, not on hover.' },
        { label: 'Tradeoffs', text: 'Clarification prompts add a round-trip before the user gets a new response — skippable for power users who prefer to rephrase immediately. Version history increases state complexity. Inline selection requires careful hit-testing so the toolbar does not interfere with normal reading.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

const vBtn: CSSProperties = { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', fontSize: 16, padding: '2px 6px', fontFamily: 'var(--font-sans)' }

function interceptorBtn(active: boolean): CSSProperties {
  return {
    padding: 'var(--space-3) var(--space-4)',
    background: active ? 'var(--color-accent-bg)' : 'var(--color-surface)',
    border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
    borderRadius: 'var(--radius)',
    cursor: 'pointer',
    fontSize: 'var(--text-sm)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-sans)',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    width: '100%',
    transition: 'all var(--transition-base)',
  }
}
