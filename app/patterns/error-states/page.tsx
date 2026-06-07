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

type ErrorType = 'hung' | 'network' | 'context' | 'policy'
type SimState = 'idle' | 'generating' | 'errored'

const PARTIAL_TEXT = "Analyzing the system architecture, I can identify three primary failure modes in the current implementation. The first relates to connection pooling under high concurrency — specifically when"

const ERROR_CONFIG: Record<ErrorType, { title: string; message: string; cta: string; secondaryCta?: string; variant: 'error' | 'warning' | 'neutral' }> = {
  hung:    { title: 'Generation stalled',        message: 'The response stopped mid-stream. Your prompt has been preserved.', cta: 'Resume generation', secondaryCta: 'Copy partial output', variant: 'error' },
  network: { title: 'Connection lost',           message: 'Your network connection dropped. Retrying automatically in 5s.', cta: 'Retry now', secondaryCta: 'Copy prompt', variant: 'error' },
  context: { title: 'Context length exceeded',   message: 'The conversation exceeds the current processing window. Trim the oldest messages to continue.', cta: 'Auto-trim and resubmit', variant: 'warning' },
  policy:  { title: 'Content policy',            message: 'This request triggers a system safety block. Edit your prompt to continue.', cta: 'Edit prompt', secondaryCta: 'View guidelines', variant: 'neutral' },
}

export default function ErrorStatesPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [errorType, setErrorType] = useState<ErrorType>('hung')
  const [simState, setSimState] = useState<SimState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [countdown, setCountdown] = useState(0)
  const streamRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = () => {
    if (streamRef.current)   clearInterval(streamRef.current)
    if (watchdogRef.current) clearTimeout(watchdogRef.current)
    if (countRef.current)    clearInterval(countRef.current)
  }

  const simulate = (type: ErrorType) => {
    clearAll()
    setErrorType(type)
    setDisplayedText('')
    setCountdown(0)
    setSimState('generating')

    if (type === 'context' || type === 'policy') {
      setTimeout(() => setSimState('errored'), 800)
      return
    }

    let i = 0
    streamRef.current = setInterval(() => {
      i += 3
      setDisplayedText(PARTIAL_TEXT.slice(0, i))
      if (i >= PARTIAL_TEXT.length) {
        clearInterval(streamRef.current!)
        let secs = 8
        setCountdown(secs)
        countRef.current = setInterval(() => {
          secs--
          setCountdown(secs)
          if (secs <= 0) { clearInterval(countRef.current!); setSimState('errored') }
        }, 1000)
      }
    }, 30)
  }

  const reset = () => { clearAll(); setSimState('idle'); setDisplayedText(''); setCountdown(0) }
  useEffect(() => () => clearAll(), [])

  const definition = <Definition />
  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <button onClick={() => simulate('hung')}    style={btn('var(--accent)','var(--accent-bg)','#FECACA')}>Hung state</button>
        <button onClick={() => simulate('network')} style={btn('var(--accent)','var(--accent-bg)','#FECACA')}>Network failure</button>
        <button onClick={() => simulate('context')} style={btn('#B45309','#FFFBEB','#FDE68A')}>Context limit</button>
        <button onClick={() => simulate('policy')}  style={btn('var(--text-muted)','var(--warm-75)','var(--border)')}>Policy refusal</button>
        <button onClick={reset}                     style={btn('var(--text-muted)','var(--surface)','var(--border)')}>Reset</button>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--warm-75)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
          {simState === 'generating' && <StatusBadge state="streaming" label="Generating" pulse />}
          {simState === 'errored'    && <StatusBadge state="error"     label="Error" />}
        </div>

        <div style={{ padding: 'var(--space-6)', minHeight: 140, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {simState === 'idle' && <p style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>Select an error type above to simulate.</p>}

          {simState === 'generating' && !displayedText && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--text-faint)', display:'block', animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
            </div>
          )}

          {displayedText && (
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
              {displayedText}
              {simState === 'generating' && <span style={{ display:'inline-block', width:2, height:'1em', background:'var(--text)', marginLeft:2, animation:'blink 1s step-end infinite', verticalAlign:'text-bottom' }} />}
              <style>{`@keyframes blink{50%{opacity:0}}`}</style>
            </p>
          )}

          {simState === 'errored' && (
            <InlineAlert
              variant={ERROR_CONFIG[errorType].variant}
              title={ERROR_CONFIG[errorType].title}
              action={{ label: ERROR_CONFIG[errorType].cta, onClick: () => { reset(); if (errorType === 'hung' || errorType === 'network') simulate(errorType) } }}
              secondaryAction={ERROR_CONFIG[errorType].secondaryCta ? { label: ERROR_CONFIG[errorType].secondaryCta!, onClick: () => {} } : undefined}
            >
              {ERROR_CONFIG[errorType].message}
            </InlineAlert>
          )}
        </div>

        {simState === 'generating' && countdown > 0 && (
          <div style={{ padding: 'var(--space-2) var(--space-4)', borderTop: '1px solid var(--border)', background: '#FFFBEB', fontSize: 'var(--text-xs)', color: '#B45309' }}>
            Watchdog: no new tokens — escalating in {countdown}s
          </div>
        )}

        {/* Preserved input */}
        <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-3) var(--space-4)', background: 'var(--warm-75)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <input
            readOnly
            value="Analyze the system architecture and identify the primary failure modes in the current implementation."
            style={{ flex: 1, padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', background: 'var(--surface)', color: 'var(--text-muted)', outline: 'none' }}
          />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>Preserved</span>
        </div>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
        The user's prompt is always preserved in the input area — never cleared during an error. Hung and network errors stream partial content before the watchdog triggers. Context and policy errors surface immediately without partial output.
      </p>
    </div>
  )
  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {[
        { type: 'hung'    as ErrorType, label: '1. Hung / stream stall',      desc: 'Generation server stopped responding mid-turn. Partial output preserved. Watchdog fires after 8s (30s for known heavy tasks).', variantColor: '#C2410C' },
        { type: 'network' as ErrorType, label: '2. Network / disconnect',      desc: 'Local connection or server connection dropped. Input cached. Auto-retry every 5s.', variantColor: 'var(--accent)' },
        { type: 'context' as ErrorType, label: '3. Context length exceeded',   desc: 'Prompt exceeds the processing window. User is offered auto-trim rather than a hard stop.', variantColor: '#B45309' },
        { type: 'policy'  as ErrorType, label: '4. Content policy refusal',    desc: 'Request triggers a safety or privacy block. Clear reason given. Prompt editing offered.', variantColor: 'var(--text-muted)' },
      ].map(item => (
        <div key={item.type} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.variantColor, flexShrink: 0, marginTop: 4 }} />
          <div>
            <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text)', marginBottom: 'var(--space-1)' }}>{item.label}</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <PatternShell
      title="Error States"
      slug="error-states"
      problem="The most dangerous AI error is one the user does not notice. Silent failures — hung states, incomplete responses with no indication they are incomplete — erode trust in ways that explicit failures do not."
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
        { label: 'Problem', text: 'Silent failures are the most consistent design gap in the audit. The hung generation state — where the streaming indicator continues with no differentiation between active generation and a frozen one — was observed in four of six products. No product escalates from a generation indicator to a distinct error state.' },
        { label: 'Prescription', text: 'Four requirements: visibility (every failure produces a visible signal), specificity (error messages identify what went wrong at an actionable level), input preservation (user prompt is never cleared during any error type), and a recovery path (every error state includes a clear next action).' },
        { label: 'Design decisions', text: 'Hung state timeout threshold must be calibrated to product latency — 8s standard, expandable to 30s for known heavy tasks with a backend flag. Error message specificity vs. technical accuracy. Whether to implement a full four-error taxonomy or a minimum viable single error state first.' },
        { label: 'Tradeoffs', text: 'Hung state escalation risks false positives on slow but functional responses. Highly specific error messages require detailed state information the system may not always have — when genuinely unknown, honesty is the higher priority over fabricated specificity. Differentiated visual taxonomy increases implementation surface area.' },
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
  return { padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color, background: bg, border: `1px solid ${border}`, borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'opacity var(--transition-base)' }
}
