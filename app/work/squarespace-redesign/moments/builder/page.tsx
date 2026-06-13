'use client'
import { useState } from 'react'
import MomentNav from '../MomentNav'

const SQ = {
  black: '#0e0e0e', white: '#ffffff', grayLight: '#f2f2f2',
  grayMid: '#878787', grayPlaceholder: '#afafaf', grayBorder: '#666666',
  graySubtle: '#e7e7e7', progressBase: '#b7b7b7',
  amber: '#f0a500', amberBg: '#fffbf0',
}

const SECTIONS = [
  {
    id: 'hero', label: 'Hero',
    current: { headline: 'Strategic Interface Design', sub: 'Advancing Digital Interfaces With Strategic Precision', img: '📱' },
    reasoning: "I chose a tech-forward headline because you selected UI/UX Design as your topic. The mobile imagery matches that category.",
    failureMode: "Generic Output + Opacity",
    override: "Try: 'I help product teams understand their users at scale' — specific to your actual work",
  },
  {
    id: 'about', label: 'About',
    current: { headline: 'Delivering Measurable User Impact', sub: "The studio specializes in synthesizing research, strategy, and visual polish to construct digital products that facilitate sustained engagement.", img: '🖥️' },
    reasoning: "I generated this about section from your topic category. 'The studio' was assumed — you may be an individual, not an agency.",
    failureMode: "Identity Fabrication + Voice Displacement",
    override: "Enter your actual name and a sentence about your background to replace this",
  },
  {
    id: 'cta', label: 'Contact',
    current: { headline: 'Initiate Your Project Consultation', sub: 'Submit the inquiry form to enable a comprehensive evaluation of your requirements.', img: '📋' },
    reasoning: "I chose 'Project Consultation' framing because 'Consulting' appeared in related topics. But you may not be selling consulting services.",
    failureMode: "Context Collapse + Literal Compliance",
    override: "Try: 'Let's Talk' with a simple email link — matches the portfolio context better",
  },
  {
    id: 'portfolio', label: 'Portfolio',
    current: { headline: 'Our Work Speaks For Itself', sub: 'The Atlas Project · The Lumen Project · The Echo Project', img: '🌸' },
    reasoning: "No portfolio page was recommended by default. When you added one, I populated it with floristry stock photography — the closest match in my library to a generic 'creative portfolio'.",
    failureMode: "Domain Collapse + Template Prison",
    override: "This entire section needs your actual case study images and project titles",
  },
]

// ── Before view ────────────────────────────────────────────
function BeforeView() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
      <div style={{ borderRight: `1px solid ${SQ.graySubtle}`, overflow: 'auto', background: '#fafafa' }}>
        <div style={{ padding: '8px 16px', background: '#fff8f0', borderBottom: `1px solid ${SQ.graySubtle}`, position: 'sticky', top: 0 }}>
          <span style={{ fontSize: 11, color: '#c47a00', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Current Squarespace — Generated Output</span>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ background: SQ.white, border: `1px solid ${SQ.graySubtle}`, overflow: 'hidden' }}>
            <div style={{ padding: '8px 16px', borderBottom: `1px solid ${SQ.graySubtle}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: SQ.black, fontWeight: 500 }}>Ali Khan Design</span>
              <div style={{ display: 'flex', gap: 16 }}>
                {['About', 'Contact'].map(n => <span key={n} style={{ fontSize: 11, color: SQ.grayMid }}>{n}</span>)}
              </div>
            </div>
            {SECTIONS.map(s => (
              <div key={s.id} style={{ padding: s.id === 'hero' ? '48px 24px' : '24px', borderBottom: `1px solid ${SQ.graySubtle}`, background: s.id === 'hero' ? '#1a1a1a' : SQ.white }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: s.id === 'hero' ? 22 : 16, fontWeight: 500, color: s.id === 'hero' ? SQ.white : SQ.black, marginBottom: 8, lineHeight: 1.3 }}>{s.current.headline}</p>
                    <p style={{ fontSize: 12, color: s.id === 'hero' ? 'rgba(255,255,255,0.6)' : SQ.grayMid, lineHeight: 1.6 }}>{s.current.sub}</p>
                  </div>
                  <div style={{ fontSize: 32, flexShrink: 0 }}>{s.current.img}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 12, color: '#c47a00', fontStyle: 'italic', lineHeight: 1.6 }}>
            ⚠ This site was generated from a topic category and a personality selection. None of the content reflects Ali Khan's actual work, voice, or goals.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 16px', background: '#fff8f0', borderBottom: `1px solid ${SQ.graySubtle}` }}>
          <span style={{ fontSize: 11, color: '#c47a00', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Current Squarespace — Controls Panel</span>
        </div>
        <div style={{ flex: 1, padding: 24, overflow: 'auto' }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: SQ.black, marginBottom: 8 }}>Choose a color palette</p>
          <p style={{ fontSize: 13, color: SQ.grayMid, marginBottom: 20, lineHeight: 1.5 }}>These custom palettes were curated by our designers.</p>
          <p style={{ fontSize: 12, fontWeight: 600, color: SQ.black, marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Professional <span style={{ background: '#e8f0fe', color: '#1967d2', padding: '2px 8px', fontSize: 11, fontWeight: 500, marginLeft: 8 }}>Recommended</span></p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
            {[['#fff', '#ccc', '#000'], ['#fff', '#4a7c99', '#000'], ['#fff', '#3c3', '#000'], ['#f0f0ff', '#66f', '#000']].map((palette, i) => (
              <div key={i} style={{ border: `${i === 0 ? 2 : 1}px solid ${i === 0 ? SQ.black : SQ.graySubtle}`, display: 'flex', height: 40, overflow: 'hidden', cursor: 'pointer' }}>
                {palette.map((c, j) => <div key={j} style={{ flex: 1, background: c }} />)}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: SQ.grayMid, lineHeight: 1.6, fontStyle: 'italic', padding: '12px', background: SQ.grayLight, borderLeft: '3px solid #c47a00' }}>
            ⚠ No explanation for why "Professional" was recommended. No way to know how this palette interacts with your existing logo.
          </p>
        </div>
        <div style={{ background: SQ.white, boxShadow: '0px -4px 32px 0px rgba(0,0,0,0.12)', height: 94, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <button style={{ background: SQ.white, color: SQ.black, border: `1px solid ${SQ.graySubtle}`, padding: '16px 22px', fontSize: 14, letterSpacing: '3.5px', textTransform: 'uppercase' as const, fontFamily: 'inherit' }}>BACK</button>
          <button style={{ background: SQ.black, color: SQ.white, border: 'none', padding: '16px 22px', fontSize: 14, letterSpacing: '3.5px', textTransform: 'uppercase' as const, fontFamily: 'inherit' }}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

// ── After view ─────────────────────────────────────────────
interface AfterViewProps {
  selectedSection: string | null
  setSelectedSection: (s: string | null) => void
  prompt: string
  setPrompt: (s: string) => void
  overrides: Record<string, string>
  setOverrides: React.Dispatch<React.SetStateAction<Record<string, string>>>
  submitted: Record<string, boolean>
  setSubmitted: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

function AfterView({ selectedSection, setSelectedSection, prompt, setPrompt, overrides, setOverrides, submitted, setSubmitted }: AfterViewProps) {
  const selected = SECTIONS.find(s => s.id === selectedSection)

  const handleSubmitOverride = () => {
    if (!selectedSection || !prompt.trim()) return
    setOverrides(prev => ({ ...prev, [selectedSection]: prompt.trim() }))
    setSubmitted(prev => ({ ...prev, [selectedSection]: true }))
    setPrompt('')
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
      <div style={{ borderRight: `1px solid ${SQ.graySubtle}`, overflow: 'auto', background: '#fafafa' }}>
        <div style={{ padding: '8px 16px', background: '#f0f7f0', borderBottom: `1px solid ${SQ.graySubtle}`, position: 'sticky', top: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: '#2a7a2a', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Redesign — Transparent Builder</span>
          <span style={{ fontSize: 11, color: SQ.grayMid }}>Click any section to see AI reasoning + override</span>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ background: SQ.white, border: `1px solid ${SQ.graySubtle}`, overflow: 'hidden' }}>
            <div style={{ padding: '8px 16px', borderBottom: `1px solid ${SQ.graySubtle}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: SQ.black, fontWeight: 500 }}>Ali Khan Design</span>
              <div style={{ display: 'flex', gap: 16 }}>
                {['Work', 'About', "Let's Talk"].map(n => <span key={n} style={{ fontSize: 11, color: SQ.grayMid }}>{n}</span>)}
              </div>
            </div>
            {SECTIONS.map(s => (
              <div
                key={s.id}
                onClick={() => setSelectedSection(s.id === selectedSection ? null : s.id)}
                style={{ padding: s.id === 'hero' ? '48px 24px' : '24px', borderBottom: `1px solid ${SQ.graySubtle}`, background: s.id === 'hero' ? '#1a1a1a' : SQ.white, cursor: 'pointer', outline: selectedSection === s.id ? `2px solid ${SQ.amber}` : 'none', outlineOffset: -2, position: 'relative' as const, transition: 'outline 0.15s' }}
              >
                <div style={{ position: 'absolute', top: 8, right: 8, background: selectedSection === s.id ? SQ.amber : 'rgba(0,0,0,0.15)', color: SQ.white, fontSize: 10, padding: '2px 8px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
                  {selectedSection === s.id ? '● Selected' : 'Click to inspect'}
                </div>
                {submitted[s.id] && (
                  <div style={{ position: 'absolute', top: 8, left: 8, background: '#2a7a2a', color: SQ.white, fontSize: 10, padding: '2px 8px', fontWeight: 600 }}>✓ Overridden</div>
                )}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: s.id === 'hero' ? 22 : 16, fontWeight: 500, color: submitted[s.id] ? (s.id === 'hero' ? '#7af' : SQ.black) : (s.id === 'hero' ? SQ.white : SQ.black), marginBottom: 8, lineHeight: 1.3 }}>
                      {submitted[s.id] ? overrides[s.id] : s.current.headline}
                    </p>
                    <p style={{ fontSize: 12, color: s.id === 'hero' ? 'rgba(255,255,255,0.6)' : SQ.grayMid, lineHeight: 1.6 }}>
                      {submitted[s.id] ? '✓ Updated from your input' : s.current.sub}
                    </p>
                  </div>
                  <div style={{ fontSize: 32, flexShrink: 0 }}>{s.current.img}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '8px 16px', background: '#f0f7f0', borderBottom: `1px solid ${SQ.graySubtle}` }}>
          <span style={{ fontSize: 11, color: '#2a7a2a', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>AI Reasoning + Override</span>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {!selectedSection ? (
            <div style={{ textAlign: 'center' as const, paddingTop: 60 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>👆</div>
              <p style={{ fontSize: 14, color: SQ.grayMid, lineHeight: 1.6 }}>Click any section in the preview to see why the AI made that decision — and override it.</p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: SQ.grayMid, fontWeight: 600, marginBottom: 12 }}>{selected?.label} Section</p>
              <div style={{ background: SQ.amberBg, borderLeft: `3px solid ${SQ.amber}`, padding: '12px 16px', marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: SQ.amber, letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Why I chose this</p>
                <p style={{ fontSize: 13, color: '#5a4a00', lineHeight: 1.6 }}>{selected?.reasoning}</p>
              </div>
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#c47a00', letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Failure mode</p>
                <span style={{ display: 'inline-block', background: '#fff8f0', border: '1px solid #f0a500', color: '#c47a00', fontSize: 11, padding: '3px 10px' }}>{selected?.failureMode}</span>
              </div>
              <div style={{ background: '#f0f7f0', borderLeft: '3px solid #2a7a2a', padding: '12px 16px', marginBottom: 20 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#2a7a2a', letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginBottom: 6 }}>Suggested override</p>
                <p style={{ fontSize: 13, color: '#1a4a1a', lineHeight: 1.6 }}>{selected?.override}</p>
              </div>
              {!submitted[selectedSection] ? (
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: SQ.black, marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Override this section</p>
                  <textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Describe what you want instead..."
                    rows={3}
                    style={{ width: '100%', border: `1px solid ${SQ.graySubtle}`, outline: 'none', padding: '10px 12px', fontSize: 13, fontFamily: 'inherit', resize: 'none', color: SQ.black, lineHeight: 1.6, boxSizing: 'border-box' as const, marginBottom: 8 }}
                  />
                  <button onClick={handleSubmitOverride} disabled={!prompt.trim()} style={{ width: '100%', background: prompt.trim() ? SQ.black : SQ.graySubtle, color: prompt.trim() ? SQ.white : SQ.grayMid, border: 'none', padding: '14px 22px', fontSize: 13, fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase' as const, cursor: prompt.trim() ? 'pointer' : 'default', fontFamily: 'inherit' }}>
                    APPLY OVERRIDE
                  </button>
                </div>
              ) : (
                <div style={{ background: '#f0f7f0', padding: '16px', textAlign: 'center' as const }}>
                  <p style={{ fontSize: 13, color: '#2a7a2a', fontWeight: 500 }}>✓ Override applied</p>
                  <p style={{ fontSize: 12, color: SQ.grayMid, marginTop: 4 }}>The preview has been updated.</p>
                  <button onClick={() => { setSubmitted(prev => { const n = {...prev}; delete n[selectedSection]; return n }); setOverrides(prev => { const n = {...prev}; delete n[selectedSection]; return n }) }} style={{ marginTop: 12, background: 'transparent', border: `1px solid ${SQ.graySubtle}`, color: SQ.grayMid, padding: '8px 16px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase' as const, cursor: 'pointer', fontFamily: 'inherit' }}>UNDO</button>
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{ background: SQ.white, boxShadow: '0px -4px 32px 0px rgba(0,0,0,0.12)', height: 94, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
          <button style={{ background: SQ.white, color: SQ.black, border: `1px solid ${SQ.graySubtle}`, padding: '16px 22px', fontSize: 14, letterSpacing: '3.5px', textTransform: 'uppercase' as const, fontFamily: 'inherit' }}>BACK</button>
          <button style={{ background: SQ.black, color: SQ.white, border: 'none', padding: '16px 22px', fontSize: 14, letterSpacing: '3.5px', textTransform: 'uppercase' as const, fontFamily: 'inherit' }}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────
export default function Moment2() {
  const [view, setView] = useState<'before' | 'after'>('after')
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [prompt, setPrompt] = useState('')
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({})

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: SQ.white, fontFamily: "'Helvetica Neue', Arial, sans-serif", paddingTop: 101 }}>
      <MomentNav current={2} view={view} onViewChange={setView} />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {view === 'before' ? <BeforeView /> : (
          <AfterView
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
            prompt={prompt}
            setPrompt={setPrompt}
            overrides={overrides}
            setOverrides={setOverrides}
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
        )}
      </div>
    </div>
  )
}
