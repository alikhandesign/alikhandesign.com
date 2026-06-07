'use client'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import StatusBadge from '../../components/StatusBadge'
import InlineAlert from '../../components/InlineAlert'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo',       label: 'Interactive demo' },
  { id: 'states',     label: 'All states' },
]

type ErrorType = 'hung' | 'network' | 'context' | 'policy'
type SimState  = 'idle' | 'generating' | 'errored'

const PARTIAL_TEXT = 'Analyzing the system architecture, I can identify three primary failure modes in the current implementation. The first relates to connection pooling under high concurrency — specifically when'

const ERROR_CONFIG: Record<ErrorType, {
  title: string; message: string; cta: string; secondaryCta?: string
  variant: 'error' | 'warning' | 'neutral'
  auditFinding: string
}> = {
  hung: {
    title: 'Generation stalled',
    message: 'The response stopped mid-stream. Your prompt has been preserved.',
    cta: 'Resume generation', secondaryCta: 'Copy partial output',
    variant: 'error',
    auditFinding: 'Observed in Claude, ChatGPT, Gemini, and Perplexity. In every case, the streaming indicator continued running with no visual distinction between active generation and a frozen state. No product escalated to an error state — users had no signal to wait or intervene.',
  },
  network: {
    title: 'Connection lost',
    message: 'Your network connection dropped. Retrying automatically in 5s.',
    cta: 'Retry now', secondaryCta: 'Copy prompt',
    variant: 'error',
    auditFinding: 'Claude\'s network error message was the strongest in the audit: it identified what happened, noted what the user may have lost, preserved the input, and provided a clear retry path. Most products showed a generic "Something went wrong" with no recovery affordance.',
  },
  context: {
    title: 'Context length exceeded',
    message: 'The conversation exceeds the current processing window. Trim the oldest messages to continue.',
    cta: 'Auto-trim and resubmit',
    variant: 'warning',
    auditFinding: 'Perplexity surfaced a context-length error that communicated scale ("your conversation is too long") without telling the user what to do about it. Auto-trim as a recovery action is not offered by any product in the audit — users are left to figure out the fix manually.',
  },
  policy: {
    title: 'Content policy',
    message: 'This request triggers a system safety block. Edit your prompt to continue.',
    cta: 'Edit prompt', secondaryCta: 'View guidelines',
    variant: 'neutral',
    auditFinding: 'Policy refusals vary widely in specificity. Some products explain the category of restriction; others return a generic block with no context. None of the audited products offer a structured prompt-editing flow — users are returned to an empty input with no guidance on what to change.',
  },
}

export default function ErrorStatesPage() {
  const [activeTab, setActiveTab]   = useState('definition')
  const [errorType, setErrorType]   = useState<ErrorType>('hung')
  const [simState, setSimState]     = useState<SimState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [countdown, setCountdown]   = useState(0)
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

  const cfg = ERROR_CONFIG[errorType]

  const auditCallout = simState === 'errored' ? (
    <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3) var(--space-4)', background: 'var(--warm-75)', borderLeft: '3px solid var(--accent)', borderRadius: '0 var(--radius) var(--radius) 0' }}>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>
        <strong style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-md)', fontSize: 'var(--text-xs)' }}>Audit finding —</strong>{' '}
        {cfg.auditFinding}
      </p>
    </div>
  ) : null

  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <button onClick={() => simulate('hung')}    style={btn('var(--accent)', 'var(--accent-bg)', '#FECACA')}>Hung state</button>
        <button onClick={() => simulate('network')} style={btn('var(--accent)', 'var(--accent-bg)', '#FECACA')}>Network failure</button>
        <button onClick={() => simulate('context')} style={btn('#B45309', '#FFFBEB', '#FDE68A')}>Context limit</button>
        <button onClick={() => simulate('policy')}  style={btn('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>Policy refusal</button>
        <button onClick={reset}                     style={btn('var(--text-muted)', 'var(--surface)', 'var(--border)')}>Reset</button>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--warm-75)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
          {simState === 'generating' && <StatusBadge state="streaming" label="Generating" pulse />}
          {simState === 'errored'    && <StatusBadge state="error"     label="Error" />}
        </div>

        <div style={{ padding: 'var(--space-6)', minHeight: 120, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {simState === 'idle' && (
            <p style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>
              Select an error type above to simulate. Hung and network errors stream partial content before the watchdog fires.
            </p>
          )}
          {simState === 'generating' && !displayedText && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--text-faint)', display:'block', animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />
              ))}
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
            </div>
          )}
          {displayedText && (
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
              {displayedText}
              {simState === 'generating' && (
                <span style={{ display:'inline-block', width:2, height:'1em', background:'var(--text)', marginLeft:2, animation:'blink 1s step-end infinite', verticalAlign:'text-bottom' }} />
              )}
              <style>{`@keyframes blink{50%{opacity:0}}`}</style>
            </p>
          )}
          {simState === 'errored' && (
            <InlineAlert
              variant={cfg.variant}
              title={cfg.title}
              action={{ label: cfg.cta, onClick: () => { reset(); if (errorType === 'hung' || errorType === 'network') simulate(errorType) } }}
              secondaryAction={cfg.secondaryCta ? { label: cfg.secondaryCta, onClick: () => {} } : undefined}
            >
              {cfg.message}
            </InlineAlert>
          )}
        </div>

        {simState === 'generating' && countdown > 0 && (
          <div style={{ padding: 'var(--space-2) var(--space-4)', borderTop: '1px solid var(--border)', background: '#FFFBEB', fontSize: 'var(--text-xs)', color: '#B45309' }}>
            Watchdog: no new tokens — escalating in {countdown}s
          </div>
        )}

        {/* Preserved input — always visible */}
        <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--space-3) var(--space-4)', background: 'var(--warm-75)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <input
            readOnly
            value="Analyze the system architecture and identify the primary failure modes in the current implementation."
            style={{ flex: 1, padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', background: 'var(--surface)', color: 'var(--text-muted)', outline: 'none' }}
          />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', whiteSpace: 'nowrap' }}>Preserved</span>
        </div>
      </div>

      {auditCallout}
    </div>
  )

  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {(Object.entries(ERROR_CONFIG) as Array<[ErrorType, typeof ERROR_CONFIG[ErrorType]]>).map(([type, c]) => (
        <div key={type} style={{ padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--text)', marginBottom: 'var(--space-2)' }}>{c.title}</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)', marginBottom: 'var(--space-3)' }}>{c.message}</p>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)', borderTop: '1px solid var(--border)', paddingTop: 'var(--space-3)' }}>
            <strong style={{ color: 'var(--accent)' }}>Audit — </strong>{c.auditFinding}
          </p>
        </div>
      ))}
    </div>
  )

  const definition = <Definition />

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
        { label: 'Prescription', text: 'Four requirements: visibility (every failure produces a visible signal, hung state escalates after 8s watchdog), specificity (error messages identify what went wrong at an actionable level), input preservation (prompt never cleared during any error), recovery path (every error state has a clear next action). Four error types with distinct visual treatment and distinct copy.' },
        { label: 'Design decisions', text: 'Watchdog threshold: 8s standard, expandable to 30s for known heavy tasks via backend flag. Error message specificity vs. technical accuracy — when genuinely unknown, honest vagueness beats fabricated specificity. Minimum viable implementation: input preservation + single retry CTA satisfies the baseline before the full taxonomy.' },
        { label: 'Tradeoffs', text: 'Hung state escalation risks false positives on slow but functional responses — threshold must be calibrated to product latency. Differentiated visual taxonomy increases implementation surface area. Auto-retry behavior (network errors) must handle the case where the connection is still down.' },
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
