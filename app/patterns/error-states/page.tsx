'use client'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import StatusBadge from '../../components/StatusBadge'
import InlineAlert from '../../components/InlineAlert'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

const NAV = {
  prev: { slug: 'correction-refinement', title: 'Correction & Refinement' },
  next: { slug: 'generation-states', title: 'Generation States' },
}

type ErrorType = 'hung' | 'network' | 'context' | 'policy'
type SimState = 'idle' | 'generating' | 'stalled' | 'error'

const PARTIAL = "The Heartbeat Watchdog monitors token interarrival intervals on the client side. If no new token arrives within the defined threshold window, the interface declares a silent failure and"

const ERROR_TAXONOMY: Record<ErrorType, { label: string; badgeState: 'hung'|'error'|'warning'|'info'; bg: string; border: string; title: string; desc: string; cta: string; ctaSecondary?: string }> = {
  hung:    { label: 'Hung / stream stall', badgeState: 'hung', bg: '#FFF7ED', border: '#FED7AA', title: 'Generation server stopped responding mid-stream.', desc: 'The response paused before completing. Your prompt is preserved.', cta: 'Resume generation', ctaSecondary: 'Copy partial output' },
  network: { label: 'Network / disconnect', badgeState: 'error', bg: 'var(--accent-bg)', border: '#FECACA', title: 'Connection to the server dropped.', desc: 'Your internet connection or our servers are unreachable. Auto-retrying every 5s.', cta: 'Retry now', ctaSecondary: 'Copy prompt' },
  context: { label: 'Context length limit', badgeState: 'warning', bg: '#FFFBEB', border: '#FDE68A', title: 'Input exceeds the current processing window.', desc: 'The conversation is too long to process in full. Trimming oldest context will allow the request to proceed.', cta: 'Auto-trim and resubmit', ctaSecondary: 'Start new conversation' },
  policy:  { label: 'Content policy refusal', badgeState: 'info', bg: '#EFF6FF', border: '#BFDBFE', title: 'This request triggers system safety guidelines.', desc: 'The request cannot be processed as written. Editing the prompt may resolve the issue.', cta: 'Edit prompt', ctaSecondary: 'View guidelines' },
}

export default function ErrorStatesPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [errorType, setErrorType] = useState<ErrorType>('hung')
  const [simState, setSimState] = useState<SimState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [elapsed, setElapsed] = useState(0)
  const streamRef = useRef<ReturnType<typeof setInterval>|null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null)
  const watchRef = useRef<ReturnType<typeof setTimeout>|null>(null)

  const clearAll = () => {
    if (streamRef.current) clearInterval(streamRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    if (watchRef.current) clearTimeout(watchRef.current)
  }

  const reset = () => { clearAll(); setSimState('idle'); setDisplayedText(''); setElapsed(0) }

  const simulate = () => {
    clearAll(); setDisplayedText(''); setElapsed(0); setSimState('generating')
    let i = 0
    streamRef.current = setInterval(() => {
      i += 3; setDisplayedText(PARTIAL.slice(0, i))
      if (i >= PARTIAL.length) {
        clearInterval(streamRef.current!)
        setSimState('stalled')
        let secs = 0
        timerRef.current = setInterval(() => { secs++; setElapsed(secs) }, 1000)
        watchRef.current = setTimeout(() => { clearInterval(timerRef.current!); setSimState('error') }, 8000)
      }
    }, 40)
  }

  useEffect(() => () => clearAll(), [])
  const e = ERROR_TAXONOMY[errorType]

  return (
    <PatternShell
      title="Error States"
      patternName="Error States"
      problem="The most dangerous AI error is one the user does not notice. Silent failures — hung states, incomplete responses with no indication they are incomplete — erode trust in ways that explicit failures do not."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
      nav={NAV}
    >
      {activeTab === 'definition' && <Definition />}

      {activeTab === 'demo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <button onClick={simulate} style={btn('#1D4ED8','#EFF6FF','#BFDBFE')}>Simulate hung state</button>
            <button onClick={reset} style={btn('var(--text-muted)','var(--warm-75)','var(--border)')}>Reset</button>
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--warm-75)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
              {simState === 'generating' && <StatusBadge state="streaming" label="Generating" pulse />}
              {simState === 'stalled' && <StatusBadge state="hung" label={`Stalled ${elapsed}s`} pulse={false} />}
              {simState === 'error' && <StatusBadge state="error" label="Generation failed" />}
            </div>

            <div style={{ padding: 'var(--space-6)', minHeight: 160, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {simState === 'idle' && <p style={{ color:'var(--text-faint)',fontSize:'var(--text-sm)',fontStyle:'italic' }}>Press "Simulate hung state" to run the watchdog demo.</p>}

              {(simState === 'generating' || simState === 'stalled' || simState === 'error') && displayedText && (
                <p style={{ fontSize:'var(--text-base)',color:'var(--text)',lineHeight:'var(--line-height-loose)' }}>
                  {displayedText}
                  {simState === 'generating' && <span style={{ display:'inline-block',width:2,height:'1em',background:'var(--text)',marginLeft:2,animation:'blink 1s step-end infinite',verticalAlign:'text-bottom' }} />}
                  <style>{`@keyframes blink{50%{opacity:0}}`}</style>
                </p>
              )}

              {simState === 'error' && (
                <InlineAlert variant="error" title="Generation stalled" action={{ label: 'Resume generation', onClick: simulate }} secondaryAction={{ label: 'Copy partial output', onClick: () => navigator.clipboard?.writeText(displayedText) }}>
                  The response stopped after {elapsed}s without new tokens. Your prompt and partial output are preserved.
                </InlineAlert>
              )}
            </div>

            {simState === 'stalled' && (
              <div style={{ padding:'var(--space-2) var(--space-4)',borderTop:'1px solid var(--border)',background:'#FFFBEB',fontSize:'var(--text-xs)',color:'#B45309' }}>
                Watchdog: no new tokens for {elapsed}s — escalating to error state at 8s
              </div>
            )}
          </div>

          <p style={{ fontSize:'var(--text-xs)',color:'var(--text-faint)',lineHeight:'var(--line-height-normal)' }}>
            The watchdog monitors token interarrival. After 8 seconds of silence, the streaming indicator escalates to an explicit error state with input and partial output preserved.
          </p>
        </div>
      )}

      {activeTab === 'states' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
            {(Object.keys(ERROR_TAXONOMY) as ErrorType[]).map(k => (
              <button key={k} onClick={() => setErrorType(k)} style={btn(errorType === k ? 'var(--accent)' : 'var(--text-muted)', errorType === k ? 'var(--accent-bg)' : 'var(--warm-75)', errorType === k ? '#FECACA' : 'var(--border)')}>
                {ERROR_TAXONOMY[k].label}
              </button>
            ))}
          </div>

          <div style={{ border:`1px solid ${e.border}`,borderLeft:`3px solid ${e.border}`,borderRadius:`0 var(--radius) var(--radius) 0`,background:e.bg,padding:'var(--space-5)',display:'flex',flexDirection:'column',gap:'var(--space-4)' }}>
            <div style={{ display:'flex',alignItems:'center',gap:'var(--space-3)' }}>
              <StatusBadge state={e.badgeState} label={e.label} />
            </div>
            <div>
              <p style={{ fontSize:'var(--text-md)',fontWeight:'var(--font-weight-semibold)',color:'var(--text)',marginBottom:'var(--space-2)' }}>{e.title}</p>
              <p style={{ fontSize:'var(--text-base)',color:'var(--text-muted)',lineHeight:'var(--line-height-normal)' }}>{e.desc}</p>
            </div>
            <div style={{ display:'flex',gap:'var(--space-3)',flexWrap:'wrap' }}>
              <button style={{ ...btn('var(--bg)','var(--accent)','var(--accent-dark)'),color:'var(--bg)' }}>{e.cta}</button>
              {e.ctaSecondary && <button style={btn('var(--text-muted)','var(--warm-75)','var(--border)')}>{e.ctaSecondary}</button>}
            </div>
          </div>

          <div style={{ padding:'var(--space-4)',border:'1px solid var(--border)',borderRadius:'var(--radius)',background:'var(--surface)' }}>
            <p style={{ fontSize:'var(--text-xs)',color:'var(--text-faint)',lineHeight:'var(--line-height-normal)' }}>
              Each error category has a distinct visual treatment and a direct recovery path. Input is never cleared on error. Partial output is preserved and accessible.
            </p>
          </div>
        </div>
      )}
    </PatternShell>
  )
}

function Definition() {
  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { label: 'Problem', text: 'The most dangerous AI error is one the user does not notice. Silent failures — hung states, incomplete responses, errors that resolve without surfacing — erode trust in ways that explicit failures do not, because users cannot calibrate their behavior against failures they cannot see. The hung generation state was observed across four of six products in the audit with no design solution in any of them.' },
        { label: 'Prescription', text: 'Every failure must produce a visible signal — no silent failures. Error messages must identify what went wrong at a level of specificity that enables user action. User input must be preserved across all error types. Every error state must include a clear recovery path. Four error categories require distinct treatments: hung/stall, network/disconnect, context length, and content policy refusal.' },
        { label: 'Design decisions', text: 'Hung state timeout threshold must be calibrated to the product's actual latency profile — too low produces false positives; too high leaves users stranded. Error message specificity: precise enough to be actionable without requiring technical knowledge. Dynamic timeout expansion: when the backend signals a heavy processing task, the watchdog threshold expands from 8s to 30s to avoid false positives on complex agentic workflows.' },
        { label: 'Tradeoffs', text: 'Hung state escalation risks false positives on slow but functional responses. Highly specific error messages require detailed state information the system may not always surface — when the cause is genuinely unknown, "unexpected error — please retry" is more honest than a fabricated specific cause. A full four-tier error taxonomy increases engineering scope; a minimum viable state (input preservation + single retry CTA) is a defensible starting point.' },
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
