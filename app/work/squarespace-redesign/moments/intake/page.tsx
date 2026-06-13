'use client'
import { useState, useRef, useEffect } from 'react'
import MomentNav from '../MomentNav'

const SQ = {
  black: '#0e0e0e', white: '#ffffff', grayLight: '#f2f2f2',
  grayMid: '#878787', grayPlaceholder: '#afafaf', grayBorder: '#666666',
  graySubtle: '#e7e7e7', progressBase: '#b7b7b7',
}

const getClarifyingQuestion = (input: string): string | null => {
  const lower = input.toLowerCase().trim()
  if ((lower === 'design' || lower === 'designer') && lower.length < 15)
    return "What kind of designer are you? For example — UX, product, graphic, interior, or something else?"
  if (lower === 'developer' || lower === 'dev' || lower === 'engineer')
    return "What kind of development do you focus on — web, mobile, full-stack, or something more specialized?"
  if (lower === 'photographer' || lower === 'photography')
    return "What type of photography — portrait, commercial, editorial, events?"
  if (lower === 'consultant' || lower === 'consulting')
    return "What field do you consult in?"
  if (lower.split(' ').length < 4)
    return "Can you tell me a bit more? The more specific you are, the better I can tailor your site."
  return null
}

const QUESTIONS = [
  {
    id: 'identity',
    question: "Before we start making things look pretty — tell me about yourself. Who are you, what do you do, and what is this site actually for?",
    placeholder: "e.g. I'm a UX designer with 10 years of experience. I'm building a portfolio to land my next role at an AI-focused company...",
    suggestions: [
      "I'm Ali Khan — a Senior Product Designer and UX researcher with 10+ years of experience. I'm building a portfolio to land my next role at an AI-focused product company.",
      "I design AI-native products and research systems. This portfolio is specifically for hiring managers evaluating me for senior design or design technologist roles.",
    ],
  },
  {
    id: 'audience',
    question: "Who are you trying to reach — and when they land on your site, what do you want them to do?",
    placeholder: "e.g. Hiring managers and recruiters at product companies. I want them to read my case studies and reach out to schedule a call...",
    suggestions: [
      "Hiring managers and design leads at AI-first companies. I want them to read two or three case studies and reach out to schedule a conversation.",
      "Recruiters and senior designers at product-led teams. I want them to feel confident I can operate autonomously and reach out.",
    ],
  },
  {
    id: 'personality',
    question: "Last one — how would you describe the feel of your brand? Don't search for the perfect word. Just describe it naturally.",
    placeholder: "e.g. Professional but human. Not corporate. I want it to feel like a real person made it, not an agency...",
    suggestions: [
      "Warm but not casual. Direct. Feels like a designer with real opinions — not an agency trying to impress everyone.",
      "Professional but human. Evidence-based, not aesthetic-first. Like a researcher who also knows how to ship.",
    ],
  },
]

interface Message {
  type: 'ai' | 'user' | 'summary'
  content: string
}

// ── Before view — top-level component, no nesting ──────────
function BeforeView() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '100%' }}>
      <div style={{ borderRight: `1px solid ${SQ.graySubtle}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 16px', background: '#fff8f0', borderBottom: `1px solid ${SQ.graySubtle}` }}>
          <span style={{ fontSize: 11, color: '#c47a00', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Current Squarespace — Step 2: Topic Selection</span>
        </div>
        <div style={{ flex: 1, display: 'flex', padding: '48px 40px', gap: 48 }}>
          <div style={{ width: 280 }}>
            <p style={{ fontSize: 26, fontWeight: 500, color: SQ.black, lineHeight: 1.3, marginBottom: 12 }}>What's your site about?</p>
            <p style={{ fontSize: 14, color: SQ.grayMid, lineHeight: 1.6 }}>We'll tailor content and advice to your site needs.</p>
            <div style={{ marginTop: 24, height: 2, width: 88, position: 'relative', background: SQ.progressBase, borderRadius: 5 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: 2, width: 30, background: SQ.black, borderRadius: 5 }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: SQ.grayLight, borderBottom: `1px solid ${SQ.grayBorder}`, height: 60, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 8, maxWidth: 466 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={SQ.grayPlaceholder} strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <span style={{ fontSize: 15, color: SQ.grayPlaceholder }}>Search for your site topic</span>
            </div>
            <div style={{ maxWidth: 466, background: SQ.white, border: `1px solid ${SQ.graySubtle}`, marginTop: 4 }}>
              <div style={{ padding: '8px 16px', borderBottom: `1px solid ${SQ.graySubtle}` }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: SQ.grayMid, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Popular Topics</span>
              </div>
              {['Photography', 'Design', 'Education', 'Consulting', 'Art', 'Health'].map(t => (
                <div key={t} style={{ padding: '10px 16px', fontSize: 14, borderBottom: `1px solid #f5f5f5`, color: SQ.black }}>{t}</div>
              ))}
            </div>
            <p style={{ marginTop: 12, fontSize: 12, color: '#c47a00', fontStyle: 'italic' }}>
              ⚠ "UI/UX Design" only discoverable by searching — not visible in default list
            </p>
          </div>
        </div>
        <div style={{ background: SQ.white, boxShadow: '0px -4px 32px 0px rgba(0,0,0,0.12)', height: 94, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px' }}>
          <button style={{ background: SQ.black, color: SQ.white, border: 'none', padding: '16px 22px', fontSize: 14, fontWeight: 500, letterSpacing: '3.5px', textTransform: 'uppercase' as const }}>NEXT</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '8px 16px', background: '#fff8f0', borderBottom: `1px solid ${SQ.graySubtle}` }}>
          <span style={{ fontSize: 11, color: '#c47a00', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Current Squarespace — Step 3: Goal Selection</span>
        </div>
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '220px 1fr', padding: '48px 24px 24px', gap: 32 }}>
          <div>
            <p style={{ fontSize: 22, fontWeight: 500, color: SQ.black, lineHeight: 1.3 }}>What do you want to do with your website?</p>
            <div style={{ marginTop: 20, height: 2, width: 88, position: 'relative', background: SQ.progressBase, borderRadius: 5 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: 2, width: 55, background: SQ.black, borderRadius: 5 }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {['Sell access to group events', 'Promote a physical business', 'Publish a blog or other media', 'Sell products', 'Sell memberships', 'Sell online courses', 'Offer a contact form', 'Collect donations', 'Showcase work/expertise', 'Build community', 'Get appointments', 'Sell services'].map(g => (
                <div key={g} style={{ padding: '8px 10px', border: `1px solid ${g === 'Showcase work/expertise' ? SQ.black : SQ.graySubtle}`, fontSize: 12, color: SQ.black, display: 'flex', alignItems: 'center', gap: 8, background: g === 'Showcase work/expertise' ? '#f5f5f5' : SQ.white }}>
                  <div style={{ width: 14, height: 14, border: `1.5px solid ${g === 'Showcase work/expertise' ? SQ.black : '#ccc'}`, background: g === 'Showcase work/expertise' ? SQ.black : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {g === 'Showcase work/expertise' && <span style={{ color: SQ.white, fontSize: 9 }}>✓</span>}
                  </div>
                  {g}
                </div>
              ))}
            </div>
            <p style={{ marginTop: 10, fontSize: 12, color: '#c47a00', fontStyle: 'italic' }}>⚠ No option for "Get hired" or "Find a job"</p>
          </div>
        </div>
        <div style={{ background: SQ.white, boxShadow: '0px -4px 32px 0px rgba(0,0,0,0.12)', height: 94, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <button style={{ background: SQ.white, color: SQ.black, border: `1px solid ${SQ.graySubtle}`, padding: '16px 22px', fontSize: 14, fontWeight: 500, letterSpacing: '3.5px', textTransform: 'uppercase' as const }}>BACK</button>
          <button style={{ background: SQ.black, color: SQ.white, border: 'none', padding: '16px 22px', fontSize: 14, fontWeight: 500, letterSpacing: '3.5px', textTransform: 'uppercase' as const }}>NEXT</button>
        </div>
      </div>
    </div>
  )
}

// ── After view — top-level component, receives all state as props ──
interface AfterViewProps {
  messages: Message[]
  currentQ: number
  input: string
  setInput: (v: string) => void
  done: boolean
  answers: string[]
  handleSend: () => void
  handleSuggest: (text: string) => void
  bottomRef: React.RefObject<HTMLDivElement | null>
}

function AfterView({ messages, currentQ, input, setInput, done, answers, handleSend, handleSuggest, bottomRef }: AfterViewProps) {
  const summaryLabels = ['About you', 'Your audience & goal', 'Your brand personality']
  const currentSuggestions = QUESTIONS[Math.min(currentQ, QUESTIONS.length - 1)]?.suggestions ?? []

  return (
    <div style={{ display: 'flex', height: '100%', maxWidth: 800, margin: '0 auto', width: '100%', flexDirection: 'column' }}>
      <div style={{ padding: '16px 40px 8px', borderBottom: `1px solid ${SQ.graySubtle}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: SQ.grayMid, fontWeight: 500, marginBottom: 4 }}>Blueprint AI — Topic & Goals</p>
            <p style={{ fontSize: 13, color: SQ.grayMid }}>3 questions. No checkboxes. Just tell us what you're building.</p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {QUESTIONS.map((_, i) => (
              <div key={i} style={{ width: 48, height: 2, borderRadius: 5, background: i < answers.length ? SQ.black : SQ.progressBase, transition: 'background 0.3s' }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 40px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {messages.map((msg, i) => {
          if (msg.type === 'summary') return (
            <div key={i} style={{ background: SQ.grayLight, border: `1px solid ${SQ.graySubtle}`, padding: '20px 24px', marginTop: 8 }}>
              <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontWeight: 600, color: SQ.grayMid, marginBottom: 16 }}>Here's what I understood</p>
              {answers.map((ans, idx) => (
                <div key={idx} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: idx < answers.length - 1 ? `1px solid ${SQ.graySubtle}` : 'none' }}>
                  <p style={{ fontSize: 11, color: SQ.grayMid, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const, marginBottom: 6 }}>{summaryLabels[idx]}</p>
                  <p style={{ fontSize: 14, color: SQ.black, lineHeight: 1.6 }}>{ans}</p>
                </div>
              ))}
              <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                <button style={{ flex: 1, background: SQ.black, color: SQ.white, border: 'none', padding: '16px 22px', fontSize: 14, fontWeight: 500, letterSpacing: '3.5px', textTransform: 'uppercase' as const }}>BUILD MY SITE →</button>
                <button style={{ background: SQ.white, color: SQ.black, border: `1px solid ${SQ.graySubtle}`, padding: '16px 22px', fontSize: 14, fontWeight: 500, letterSpacing: '3.5px', textTransform: 'uppercase' as const }}>START OVER</button>
              </div>
            </div>
          )
          return (
            <div key={i} style={{ display: 'flex', justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-start', gap: 10 }}>
              {msg.type === 'ai' && (
                <div style={{ width: 28, height: 28, background: SQ.black, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                  <span style={{ color: SQ.white, fontSize: 9, fontWeight: 700, letterSpacing: '0.5px' }}>AI</span>
                </div>
              )}
              <div style={{ maxWidth: '75%', background: msg.type === 'user' ? SQ.black : SQ.grayLight, color: msg.type === 'user' ? SQ.white : SQ.black, padding: '12px 16px', borderRadius: msg.type === 'user' ? '12px 12px 2px 12px' : '2px 12px 12px 12px', fontSize: 14, lineHeight: 1.65, whiteSpace: 'pre-wrap' as const }}>
                {msg.content}
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {!done && (
        <div style={{ padding: '12px 40px', borderTop: `1px solid ${SQ.graySubtle}`, background: SQ.white }}>
          {/* Suggested prompts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
            <p style={{ fontSize: 11, color: SQ.grayMid, letterSpacing: '0.05em', textTransform: 'uppercase' as const, fontWeight: 500 }}>Suggested responses</p>
            {currentSuggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSuggest(s)}
                style={{ textAlign: 'left' as const, background: SQ.grayLight, border: `1px solid ${SQ.graySubtle}`, padding: '10px 14px', fontSize: 13, color: SQ.black, lineHeight: 1.5, cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = SQ.black)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = SQ.graySubtle)}
              >
                {s}
              </button>
            ))}
          </div>
          {/* Free-text input */}
          <div style={{ border: `1.5px solid ${SQ.graySubtle}` }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              placeholder="Or type your own answer..."
              rows={2}
              style={{ width: '100%', border: 'none', outline: 'none', padding: '10px 14px', fontSize: 14, fontFamily: 'inherit', resize: 'none', color: SQ.black, lineHeight: 1.6, boxSizing: 'border-box' as const, background: SQ.white }}
            />
            <div style={{ padding: '6px 10px', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${SQ.graySubtle}` }}>
              <span style={{ fontSize: 11, color: '#bbb' }}>Enter to send · Shift+Enter for new line</span>
              <button onClick={handleSend} disabled={!input.trim()} style={{ background: input.trim() ? SQ.black : SQ.graySubtle, color: input.trim() ? SQ.white : SQ.grayMid, border: 'none', padding: '6px 14px', fontSize: 12, fontWeight: 500, letterSpacing: '3px', textTransform: 'uppercase' as const, cursor: input.trim() ? 'pointer' : 'default', fontFamily: 'inherit' }}>
                SEND
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: SQ.white, boxShadow: '0px -4px 32px 0px rgba(0,0,0,0.12)', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 20px', flexShrink: 0 }}>
        <button disabled={!done} style={{ background: done ? SQ.black : SQ.graySubtle, color: done ? SQ.white : SQ.grayMid, border: 'none', padding: '14px 22px', fontSize: 14, fontWeight: 500, letterSpacing: '3.5px', textTransform: 'uppercase' as const, cursor: done ? 'pointer' : 'default', fontFamily: 'inherit' }}>NEXT</button>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────
export default function Moment1() {
  const [view, setView] = useState<'before' | 'after'>('after')
  const [messages, setMessages] = useState<Message[]>([{ type: 'ai', content: QUESTIONS[0].question }])
  const [currentQ, setCurrentQ] = useState(0)
  const [input, setInput] = useState('')
  const [answers, setAnswers] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const processAnswer = (text: string) => {
    const newMsgs: Message[] = [...messages, { type: 'user', content: text }]
    const updatedAnswers = [...answers, text]
    setAnswers(updatedAnswers)
    const nextQ = currentQ + 1
    if (nextQ < QUESTIONS.length) {
      const acks = ["Got it. That gives me a clear picture of who you are.", "Perfect. Now I understand the purpose behind every page."]
      newMsgs.push({ type: 'ai', content: `${acks[currentQ] || 'Good.'}\n\n${QUESTIONS[nextQ].question}` })
      setCurrentQ(nextQ)
    } else {
      newMsgs.push({ type: 'ai', content: "Got it — I have everything I need. Here's what I understood about your site." })
      newMsgs.push({ type: 'summary', content: '' })
      setDone(true)
    }
    setMessages(newMsgs)
  }

  const handleSend = () => {
    if (!input.trim()) return
    const text = input.trim()
    setInput('')
    processAnswer(text)
  }

  const handleSuggest = (text: string) => {
    setInput('')
    processAnswer(text)
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: SQ.white, fontFamily: "'Helvetica Neue', Arial, sans-serif", paddingTop: 101 }}>
      <MomentNav current={1} view={view} onViewChange={setView} />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
        {view === 'before' ? <BeforeView /> : (
          <AfterView
            messages={messages}
            currentQ={currentQ}
            input={input}
            setInput={setInput}
            done={done}
            answers={answers}
            handleSend={handleSend}
            handleSuggest={handleSuggest}
            bottomRef={bottomRef}
          />
        )}
      </div>
    </div>
  )
}
