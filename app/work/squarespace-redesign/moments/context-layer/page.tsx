'use client'
import { useState } from 'react'
import MomentNav from '../MomentNav'

const SQ = {
  black: '#0e0e0e', white: '#ffffff', grayLight: '#f2f2f2',
  grayMid: '#878787', grayPlaceholder: '#afafaf', grayBorder: '#666666',
  graySubtle: '#e7e7e7', progressBase: '#b7b7b7',
  amber: '#f0a500', amberBg: '#fffbf0',
  blue: '#1967d2', blueBg: '#e8f0fe',
}

const INITIAL_CONTEXT = {
  identity: { label: 'Who you are', value: 'Ali Khan — Senior Product Designer & UX Researcher, 10+ years experience', confidence: 'high', source: 'Your intake answers' },
  goal: { label: 'Site goal', value: 'Job search portfolio targeting AI-focused product companies', confidence: 'high', source: 'Your intake answers' },
  audience: { label: 'Target audience', value: 'Hiring managers and recruiters at product-led technology companies', confidence: 'high', source: 'Your intake answers' },
  personality: { label: 'Brand personality', value: 'Professional but human — warm, direct, not corporate', confidence: 'high', source: 'Your intake answers' },
  tone: { label: 'Assumed tone', value: 'First person, conversational, specific over generic', confidence: 'medium', source: 'Inferred from personality description' },
  colors: { label: 'Color direction', value: 'Warm neutrals — sophisticated palette selected', confidence: 'medium', source: 'Your palette selection' },
  fonts: { label: 'Typography', value: 'Professional pairing — second option selected from recommended', confidence: 'medium', source: 'Your font selection' },
  logo: { label: 'Existing logo', value: 'Unknown — no logo uploaded during onboarding', confidence: 'low', source: 'Assumption: starting from zero' },
}

const EDITABLE_ITEMS = ['identity', 'goal', 'audience', 'personality']

const EDIT_SUGGESTIONS: Record<string, string> = {
  identity: 'Ali Khan — Senior Product Designer & Researcher. AI-native designer building tools that reduce 8 hours of research synthesis to 8 minutes.',
  goal: 'Land a Senior Product Designer role at an AI-focused company — specifically targeting AppFolio, Vercel, and similar product-led teams.',
  audience: 'Hiring managers, design leads, and recruiters at AI-first or product-led companies. Remote-first roles preferred.',
  personality: 'Direct and specific. Warm but not casual. Feels like a designer with real opinions, not an agency trying to impress everyone.',
}

const confidenceColor = (c: string) => c === 'high' ? '#2a7a2a' : c === 'medium' ? '#c47a00' : '#c44'
const confidenceBg = (c: string) => c === 'high' ? '#f0f7f0' : c === 'medium' ? '#fffbf0' : '#fff0f0'

// ── Before view ────────────────────────────────────────────
function BeforeView() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
      <div style={{ borderRight: `1px solid ${SQ.graySubtle}`, overflow: 'auto', padding: 32 }}>
        <div style={{ marginBottom: 16, padding: '8px 16px', background: '#fff8f0', border: `1px solid #f0a500` }}>
          <span style={{ fontSize: 11, color: '#c47a00', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Current Squarespace — No context layer exists</span>
        </div>
        <p style={{ fontSize: 15, fontWeight: 500, color: SQ.black, marginBottom: 16 }}>Welcome, Ali</p>
        <p style={{ fontSize: 13, color: SQ.grayMid, marginBottom: 32, lineHeight: 1.6 }}>Your site has been created. Here are some next steps to get started.</p>
        <div style={{ border: `1px solid ${SQ.graySubtle}`, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 500 }}>Set up your website</p>
            <span style={{ fontSize: 12, color: SQ.grayMid }}>2/7</span>
          </div>
          {['Personalize your site header and logo', 'Customize your brand style', 'Manage site navigation', 'Edit site content', 'Add a custom domain', 'Set up analytics', 'Publish your site'].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < 6 ? `1px solid ${SQ.graySubtle}` : 'none', opacity: i > 1 ? 0.5 : 1 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${i < 2 ? SQ.blue : SQ.graySubtle}`, background: i < 2 ? SQ.blue : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {i < 2 && <span style={{ color: SQ.white, fontSize: 10 }}>✓</span>}
              </div>
              <p style={{ fontSize: 13, color: i < 2 ? SQ.grayMid : SQ.black, textDecoration: i < 2 ? 'line-through' : 'none' }}>{item}</p>
            </div>
          ))}
        </div>
        <div style={{ padding: '16px', background: SQ.grayLight, border: `1px solid ${SQ.graySubtle}` }}>
          <p style={{ fontSize: 12, color: '#c47a00', lineHeight: 1.6, fontStyle: 'italic' }}>
            ⚠ The AI has no memory of what you told it during onboarding. "Personalize your header" gives no hint that the AI already knows your name is Ali Khan, that you're a designer, or that this is a job search portfolio. Every edit starts from zero.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: 24, overflow: 'auto' }}>
        <div style={{ padding: '8px 16px', background: '#fff8f0', border: `1px solid #f0a500`, marginBottom: 24 }}>
          <span style={{ fontSize: 11, color: '#c47a00', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>What the AI knows: Nothing</span>
        </div>
        <p style={{ fontSize: 13, color: SQ.grayMid, lineHeight: 1.6, marginBottom: 16 }}>The AI that generated your site has no persistent model of who you are. Each editing session starts fresh. Every prompt is processed as if it were the first interaction.</p>
        <div style={{ background: SQ.grayLight, padding: 16, marginBottom: 16 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: SQ.black, marginBottom: 8 }}>Evidence from Track B audit:</p>
          {['Intent 7: AI renamed user "Alexandre Khan"', 'Intent 10: AI generated chemistry lab documentation', 'Intent 12: AI produced a therapy intake profile', 'Session Blindness appeared in 11 of 12 intents'].map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <span style={{ color: '#c44', fontSize: 12, flexShrink: 0 }}>✗</span>
              <p style={{ fontSize: 12, color: SQ.grayMid, lineHeight: 1.5 }}>{e}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── After view ─────────────────────────────────────────────
interface AfterViewProps {
  context: typeof INITIAL_CONTEXT
  editing: string | null
  editInput: string
  updates: string[]
  showLearning: boolean
  published: boolean
  setEditing: (k: string | null) => void
  setEditInput: (v: string) => void
  handleEdit: (k: string) => void
  handleSave: (k: string) => void
  applysuggestion: (k: string) => void
  setPublished: (v: boolean) => void
}

function AfterView({ context, editing, editInput, updates, showLearning, published, setEditing, setEditInput, handleEdit, handleSave, applysuggestion, setPublished }: AfterViewProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', height: '100%' }}>
      <div style={{ borderRight: `1px solid ${SQ.graySubtle}`, overflow: 'auto', background: '#fafafa' }}>
        <div style={{ padding: '8px 16px', background: '#f0f7f0', borderBottom: `1px solid ${SQ.graySubtle}`, position: 'sticky', top: 0, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: '#2a7a2a', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Redesign — Context Layer Active</span>
          <span style={{ fontSize: 11, color: SQ.grayMid }}>AI remembers everything from your intake</span>
        </div>
        <div style={{ padding: 24 }}>
          <p style={{ fontSize: 15, fontWeight: 500, color: SQ.black, marginBottom: 4 }}>Welcome back, Ali</p>
          <p style={{ fontSize: 13, color: SQ.grayMid, marginBottom: 24, lineHeight: 1.6 }}>Your portfolio is taking shape. Here are suggestions based on what I know about your goals.</p>
          {[
            { title: 'Your hero headline needs work', current: '"Strategic Interface Design"', suggestion: 'Based on your goal (job search portfolio) and audience (hiring managers at AI companies), I suggest something more specific to your actual expertise.', action: 'Update headline', type: 'warning' },
            { title: 'Missing: Work / Case Studies page', current: 'Your site currently has Homepage, About, Contact', suggestion: 'Your stated goal is to showcase work to hiring managers. You need a dedicated Work page with your case studies.', action: 'Add Work page', type: 'error' },
            { title: 'About page copy is off-brand', current: '"The studio delivers user interface and user experience design solutions..."', suggestion: 'You described yourself as an individual designer, not a studio. I can rewrite this in first person based on your intake answers.', action: 'Rewrite About', type: 'warning' },
          ].map((s, i) => (
            <div key={i} style={{ background: SQ.white, border: `1px solid ${s.type === 'error' ? '#fcc' : SQ.graySubtle}`, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: s.type === 'error' ? '#fff0f0' : SQ.amberBg, borderBottom: `1px solid ${s.type === 'error' ? '#fcc' : '#f0a500'}` }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: s.type === 'error' ? '#c44' : '#c47a00' }}>{s.title}</p>
              </div>
              <div style={{ padding: '12px 16px' }}>
                <p style={{ fontSize: 12, color: SQ.grayMid, marginBottom: 6, fontStyle: 'italic' }}>Current: {s.current}</p>
                <p style={{ fontSize: 13, color: SQ.black, lineHeight: 1.6, marginBottom: 12 }}>{s.suggestion}</p>
                <button style={{ background: SQ.black, color: SQ.white, border: 'none', padding: '8px 16px', fontSize: 12, letterSpacing: '2px', textTransform: 'uppercase' as const, cursor: 'pointer', fontFamily: 'inherit' }}>{s.action} →</button>
              </div>
            </div>
          ))}
          {showLearning && updates.length > 0 && (
            <div style={{ background: '#f0f7f0', border: '1px solid #2a7a2a', padding: '12px 16px', marginTop: 8 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: '#2a7a2a', letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginBottom: 8 }}>AI learned from your edits</p>
              {updates.slice(0, 3).map((u, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: '#2a7a2a', fontSize: 12, flexShrink: 0 }}>✓</span>
                  <p style={{ fontSize: 12, color: '#1a4a1a' }}>{u}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', background: '#f0f7f0', borderBottom: `1px solid ${SQ.graySubtle}` }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#2a7a2a', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: 2 }}>What I Know About You</p>
          <p style={{ fontSize: 11, color: SQ.grayMid }}>Built from your intake answers. Edit anything.</p>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
          {Object.entries(context).map(([key, item]) => (
            <div key={key} style={{ marginBottom: 12, padding: '12px', background: SQ.white, border: `1px solid ${SQ.graySubtle}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: SQ.grayMid, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{item.label}</p>
                <span style={{ fontSize: 10, padding: '2px 6px', background: confidenceBg(item.confidence), color: confidenceColor(item.confidence), fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, flexShrink: 0, marginLeft: 8 }}>{item.confidence}</span>
              </div>
              {editing === key ? (
                <div>
                  <textarea
                    value={editInput}
                    onChange={e => setEditInput(e.target.value)}
                    rows={3}
                    style={{ width: '100%', border: `1px solid ${SQ.grayBorder}`, outline: 'none', padding: '8px', fontSize: 12, fontFamily: 'inherit', resize: 'none', color: SQ.black, lineHeight: 1.5, boxSizing: 'border-box' as const, marginBottom: 6 }}
                  />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => handleSave(key)} style={{ flex: 1, background: SQ.black, color: SQ.white, border: 'none', padding: '8px', fontSize: 11, letterSpacing: '2px', textTransform: 'uppercase' as const, cursor: 'pointer', fontFamily: 'inherit' }}>SAVE</button>
                    <button onClick={() => setEditing(null)} style={{ background: SQ.white, color: SQ.grayMid, border: `1px solid ${SQ.graySubtle}`, padding: '8px 12px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>✕</button>
                  </div>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: 13, color: SQ.black, lineHeight: 1.5, marginBottom: 6 }}>{item.value}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 10, color: SQ.grayPlaceholder, fontStyle: 'italic' }}>Source: {item.source}</p>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {EDITABLE_ITEMS.includes(key) && EDIT_SUGGESTIONS[key] && item.source !== 'Updated by you' && (
                        <button onClick={() => applysuggestion(key)} style={{ fontSize: 10, color: '#2a7a2a', background: 'transparent', border: 'none', padding: '2px 0', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}>Apply suggestion</button>
                      )}
                      <button onClick={() => handleEdit(key)} style={{ fontSize: 10, color: SQ.grayMid, background: 'transparent', border: 'none', padding: '2px 0', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit' }}>Edit</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {published ? (
          <div style={{ background: '#f0f7f0', borderTop: '1px solid #2a7a2a', padding: '20px 24px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#2a7a2a', marginBottom: 4 }}>✓ Your site is live</p>
                <p style={{ fontSize: 12, color: '#2a7a2a', lineHeight: 1.5 }}>
                  This is what happens when the AI actually understood you from the start —<br />
                  a site that reflects who you are, not who the algorithm assumed you'd be.
                </p>
              </div>
              <a href="/work/squarespace-redesign" style={{ fontSize: 12, color: '#2a7a2a', textDecoration: 'none', letterSpacing: '2px', textTransform: 'uppercase' as const, border: '1px solid #2a7a2a', padding: '10px 16px', flexShrink: 0, marginLeft: 24, fontFamily: 'inherit' }}>
                BACK TO CASE STUDY →
              </a>
            </div>
          </div>
        ) : (
          <div style={{ background: SQ.white, boxShadow: '0px -4px 32px 0px rgba(0,0,0,0.12)', height: 94, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', flexShrink: 0 }}>
            <button style={{ background: SQ.white, color: SQ.black, border: `1px solid ${SQ.graySubtle}`, padding: '16px 22px', fontSize: 14, letterSpacing: '3.5px', textTransform: 'uppercase' as const, fontFamily: 'inherit' }}>BACK</button>
            <button onClick={() => setPublished(true)} style={{ background: SQ.black, color: SQ.white, border: 'none', padding: '16px 22px', fontSize: 14, letterSpacing: '3.5px', textTransform: 'uppercase' as const, cursor: 'pointer', fontFamily: 'inherit' }}>PUBLISH →</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Main ───────────────────────────────────────────────────
export default function Moment3() {
  const [view, setView] = useState<'before' | 'after'>('after')
  const [context, setContext] = useState(INITIAL_CONTEXT)
  const [editing, setEditing] = useState<string | null>(null)
  const [editInput, setEditInput] = useState('')
  const [updates, setUpdates] = useState<string[]>([])
  const [showLearning, setShowLearning] = useState(false)
  const [published, setPublished] = useState(false)

  const handleEdit = (key: string) => {
    setEditing(key)
    setEditInput(context[key as keyof typeof context].value)
  }

  const handleSave = (key: string) => {
    const item = context[key as keyof typeof context]
    setContext(prev => ({ ...prev, [key]: { ...prev[key as keyof typeof prev], value: editInput, confidence: 'high', source: 'Updated by you' } }))
    setUpdates(prev => [`Updated "${item.label}" — AI will apply this to all generated content`, ...prev])
    setEditing(null)
    setEditInput('')
  }

  const applysuggestion = (key: string) => {
    const suggestion = EDIT_SUGGESTIONS[key]
    if (!suggestion) return
    const item = context[key as keyof typeof context]
    setContext(prev => ({ ...prev, [key]: { ...prev[key as keyof typeof prev], value: suggestion, confidence: 'high', source: 'Updated by you' } }))
    setUpdates(prev => [`Applied suggested update to "${item.label}"`, ...prev])
    setShowLearning(true)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: SQ.white, fontFamily: "'Helvetica Neue', Arial, sans-serif", paddingTop: 101 }}>
      <MomentNav current={3} view={view} onViewChange={setView} />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {view === 'before' ? <BeforeView /> : (
          <AfterView
            context={context}
            editing={editing}
            editInput={editInput}
            updates={updates}
            showLearning={showLearning}
            published={published}
            setEditing={setEditing}
            setEditInput={setEditInput}
            handleEdit={handleEdit}
            handleSave={handleSave}
            applysuggestion={applysuggestion}
            setPublished={setPublished}
          />
        )}
      </div>
    </div>
  )
}
