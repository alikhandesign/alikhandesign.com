'use client'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import PatternAnnotation from '../../components/PatternAnnotation'
import StatusBadge from '../../components/StatusBadge'
import InlineAlert from '../../components/InlineAlert'
import Button from '../../components/Button'

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo',       label: 'Interactive demo' },
  { id: 'states',     label: 'All states' },
]

const ANNOTATION = 'The hung generation state — where the streaming indicator continues with no visual distinction between active generation and a frozen one — was observed in Claude, ChatGPT, Gemini, and Perplexity. In every case the interface communicated nothing to the user about the failure. No product escalated to an explicit error state. Claude\'s network error message was the strongest observed: it identified what happened, preserved the input, and provided a clear recovery path.'

type ErrorType = 'hung' | 'network' | 'context' | 'policy'
type SimState  = 'idle' | 'generating' | 'errored'

const PARTIAL = 'Analyzing the system architecture, I can identify three primary failure modes in the current implementation. The first relates to connection pooling under high concurrency — specifically when'

const ERROR_CONFIG: Record<ErrorType, {
  title: string; message: string; cta: string; secondaryCta?: string
  variant: 'error' | 'warning' | 'neutral'
  finding: string
}> = {
  hung: {
    title: 'Generation stalled',
    message: 'The response stopped mid-stream. Your prompt has been preserved.',
    cta: 'Resume generation', secondaryCta: 'Copy partial output',
    variant: 'error',
    finding: 'Observed in Claude, ChatGPT, Gemini, and Perplexity. Streaming indicator continued with no distinction between active and frozen generation. No product escalated to an error state or offered a recovery affordance.',
  },
  network: {
    title: 'Connection lost',
    message: 'Your network connection dropped. Retrying automatically in 5s.',
    cta: 'Retry now', secondaryCta: 'Copy prompt',
    variant: 'error',
    finding: 'Claude\'s network error message was the strongest in the audit: identified what happened, preserved the input, and provided a retry path. Most products returned a generic "Something went wrong" with no recovery affordance.',
  },
  context: {
    title: 'Context length exceeded',
    message: 'The conversation exceeds the current processing window. Trim the oldest messages to continue.',
    cta: 'Auto-trim and resubmit',
    variant: 'warning',
    finding: 'Perplexity surfaced a context-length error that communicated scale without telling the user what to do. Auto-trim as a recovery action is not offered by any product in the audit — users are left to resolve it manually.',
  },
  policy: {
    title: 'Content policy',
    message: 'This request triggers a system safety block. Edit your prompt to continue.',
    cta: 'Edit prompt', secondaryCta: 'View guidelines',
    variant: 'neutral',
    finding: 'Policy refusals vary widely in specificity across the audit. None of the products offer a structured prompt-editing flow — users are returned to an empty input with no guidance on what to change.',
  },
}

export default function ErrorStatesPage() {
  const [activeTab, setActiveTab]         = useState('definition')
  const [errorType, setErrorType]         = useState<ErrorType>('hung')
  const [simState, setSimState]           = useState<SimState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [countdown, setCountdown]         = useState(0)
  const streamRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = () => {
    if (streamRef.current)   clearInterval(streamRef.current)
    if (watchdogRef.current) clearTimeout(watchdogRef.current)
    if (countRef.current)    clearInterval(countRef.current)
  }

  const simulate = (type: ErrorType) => {
    clearAll(); setErrorType(type); setDisplayedText(''); setCountdown(0); setSimState('generating')
    if (type === 'context' || type === 'policy') { setTimeout(() => setSimState('errored'), 800); return }
    let i = 0
    streamRef.current = setInterval(() => {
      i += 3; setDisplayedText(PARTIAL.slice(0, i))
      if (i >= PARTIAL.length) {
        clearInterval(streamRef.current!)
        let secs = 8; setCountdown(secs)
        countRef.current = setInterval(() => {
          secs--; setCountdown(secs)
          if (secs <= 0) { clearInterval(countRef.current!); setSimState('errored') }
        }, 1000)
      }
    }, 30)
  }

  const reset = () => { clearAll(); setSimState('idle'); setDisplayedText(''); setCountdown(0) }
  useEffect(() => () => clearAll(), [])

  const cfg = ERROR_CONFIG[errorType]

  const demo = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PatternAnnotation finding={ANNOTATION} />
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Button label="Hung state"      variant="primary"   onClick={() => simulate('hung')}    arrow={false} />
        <Button label="Network failure" variant="primary"   onClick={() => simulate('network')} arrow={false} />
        <Button label="Context limit"   variant="secondary" onClick={() => simulate('context')} arrow={false} />
        <Button label="Policy refusal"  variant="secondary" onClick={() => simulate('policy')}  arrow={false} />
        <Button label="Reset"           variant="secondary" onClick={reset}                     arrow={false} />
      </div>

      <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', background: 'var(--color-surface)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', textTransform: 'uppercase' }}>AI response</span>
          {simState === 'generating' && <StatusBadge state="streaming" label="Generating" pulse />}
          {simState === 'errored'    && <StatusBadge state="error"     label="Error" />}
        </div>

        <div style={{ padding: 'var(--space-6)', minHeight: 120, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {simState === 'idle' && <p style={{ color: 'var(--color-text-faint)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>Select an error type above. Hung and network errors stream partial content before the watchdog fires.</p>}
          {simState === 'generating' && !displayedText && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--color-text-faint)', display:'block', animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
            </div>
          )}
          {displayedText && (
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text)', lineHeight: 'var(--line-height-loose)' }}>
              {displayedText}
              {simState === 'generating' && <span style={{ display:'inline-block', width:2, height:'1em', background:'var(--color-text)', marginLeft:2, animation:'blink 1s step-end infinite', verticalAlign:'text-bottom' }} />}
              <style>{`@keyframes blink{50%{opacity:0}}`}</style>
            </p>
          )}
          {simState === 'errored' && (
            <InlineAlert variant={cfg.variant} title={cfg.title}
              action={{ label: cfg.cta, onClick: () => { reset(); if (errorType === 'hung' || errorType === 'network') simulate(errorType) } }}
              secondaryAction={cfg.secondaryCta ? { label: cfg.secondaryCta, onClick: () => {} } : undefined}>
              {cfg.message}
            </InlineAlert>
          )}
        </div>

        {simState === 'generating' && countdown > 0 && (
          <div style={{ padding: 'var(--space-2) var(--space-4)', borderTop: '1px solid var(--color-border)', background: '#FFFBEB', fontSize: 'var(--text-xs)', color: '#B45309' }}>
            Watchdog: no new tokens — escalating in {countdown}s
          </div>
        )}

        {/* Preserved input — always visible */}
        <div style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface-subtle)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <input readOnly value="Analyze the system architecture and identify the primary failure modes in the current implementation."
            style={{ flex: 1, padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', fontSize: 'var(--text-sm)', fontFamily: 'var(--font-sans)', background: 'var(--color-surface)', color: 'var(--color-text-muted)', outline: 'none' }}
          />
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-faint)', whiteSpace: 'nowrap' }}>Preserved</span>
        </div>
      </div>

      {/* Per-error audit finding — shown after error triggers */}
      {simState === 'errored' && (
        <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--color-surface-subtle)', borderLeft: '3px solid var(--color-accent)', borderRadius: '0 var(--radius) var(--radius) 0' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)' }}>
            <strong style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-md)', fontSize: 'var(--text-xs)' }}>Audit finding — {cfg.title} —</strong>{' '}{cfg.finding}
          </p>
        </div>
      )}
    </div>
  )

  const states = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {(Object.entries(ERROR_CONFIG) as Array<[ErrorType, typeof ERROR_CONFIG[ErrorType]]>).map(([type, c]) => (
        <div key={type} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', background: 'var(--color-surface)' }}>
          <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text)', marginBottom: 'var(--space-2)' }}>{c.title}</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)', marginBottom: 'var(--space-3)' }}>{c.message} Recovery: {c.cta}{c.secondaryCta ? ` / ${c.secondaryCta}` : ''}.</p>
        </div>
      ))}
    </div>
  )

  const definition = <Definition />

  return (
    <PatternShell title="Error States" slug="error-states"
      problem="The most dangerous AI error is one the user does not notice. Silent failures — hung states, incomplete responses with no indication they are incomplete — erode trust in ways that explicit failures do not."
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
        { label: 'Problem', text: 'Silent failures are the most consistent design gap in the audit. The hung generation state — where the streaming indicator continues with no differentiation between active generation and a frozen one — was observed in four of six products. No product escalates from a generation indicator to a distinct error state.' },
        { label: 'Prescription', text: 'Four requirements: visibility (every failure produces a visible signal), specificity (error messages identify what went wrong at an actionable level), input preservation (prompt never cleared during any error), recovery path (every error state has a clear next action). Four error types with distinct visual treatment and copy.' },
        { label: 'Design decisions', text: 'Watchdog threshold: 8s standard, expandable to 30s for known heavy tasks via backend flag. Error message specificity vs. accuracy — when genuinely unknown, honest vagueness beats fabricated specificity. Minimum viable implementation: input preservation + single retry CTA satisfies the baseline before the full taxonomy.' },
        { label: 'Tradeoffs', text: 'Hung state escalation risks false positives on slow but functional responses. Differentiated visual taxonomy increases implementation surface area. Auto-retry behavior on network errors must handle the case where the connection is still down.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}
