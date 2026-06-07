'use client'
import { useState, useEffect, useRef } from 'react'
import PatternShell from '../PatternShell'
import StatusBadge from '../../components/StatusBadge'
import InlineAlert from '../../components/InlineAlert'

type GenerationState = 'idle' | 'thinking' | 'streaming' | 'complete' | 'hung'

const TABS = [
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
  { id: 'definition', label: 'Pattern definition' },
]

const SAMPLE_RESPONSE = "AI generation is not a download. When a model processes a request, it is reasoning — weighing options, constructing output, making probabilistic choices. The interface must make this process legible at every stage: before output begins, during streaming, at completion, and — critically — when generation stalls."

export default function GenerationStatesPage() {
  const [activeTab, setActiveTab] = useState('demo')
  const [genState, setGenState] = useState<GenerationState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const streamRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = () => {
    if (streamRef.current) clearInterval(streamRef.current)
    if (watchdogRef.current) clearTimeout(watchdogRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const reset = () => {
    clearAll()
    setGenState('idle')
    setDisplayedText('')
    setElapsedSeconds(0)
  }

  const runNormal = () => {
    clearAll()
    setDisplayedText('')
    setElapsedSeconds(0)
    setGenState('thinking')

    setTimeout(() => {
      setGenState('streaming')
      let i = 0
      streamRef.current = setInterval(() => {
        i += 3
        setDisplayedText(SAMPLE_RESPONSE.slice(0, i))
        if (i >= SAMPLE_RESPONSE.length) {
          clearInterval(streamRef.current!)
          setGenState('complete')
        }
      }, 40)
    }, 1800)
  }

  const runHung = () => {
    clearAll()
    setDisplayedText('')
    setElapsedSeconds(0)
    setGenState('thinking')

    setTimeout(() => {
      setGenState('streaming')
      let i = 0
      const partial = SAMPLE_RESPONSE.slice(0, 80)
      streamRef.current = setInterval(() => {
        i += 3
        setDisplayedText(partial.slice(0, i))
        if (i >= partial.length) {
          clearInterval(streamRef.current!)
          // Simulate stall — watchdog fires after 5s
          let secs = 0
          timerRef.current = setInterval(() => {
            secs++
            setElapsedSeconds(secs)
          }, 1000)
          watchdogRef.current = setTimeout(() => {
            clearInterval(timerRef.current!)
            setGenState('hung')
          }, 5000)
        }
      }, 40)
    }, 1200)
  }

  useEffect(() => () => clearAll(), [])

  const stateLabel: Record<GenerationState, { state: StatusBadgeProps['state']; label: string } | null> = {
    idle: null,
    thinking: { state: 'thinking', label: 'Thinking' },
    streaming: { state: 'streaming', label: 'Generating' },
    complete: { state: 'complete', label: 'Complete' },
    hung: { state: 'hung', label: 'Response stalled' },
  }

  type StatusBadgeProps = import('../../components/StatusBadge').default extends (props: infer P) => any ? P : never

  const badge = stateLabel[genState]

  return (
    <PatternShell
      title="Generation States"
      category="Pattern 1"
      problem="Users cannot distinguish between a model that is actively generating and one that has frozen. No product in the audit communicates these as distinct states."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
    >
      {activeTab === 'demo' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          {/* Controls */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button onClick={runNormal} style={btnStyle('#1D4ED8', '#EFF6FF', '#BFDBFE')}>
              Run normal generation
            </button>
            <button onClick={runHung} style={btnStyle('var(--accent)', 'var(--accent-bg)', '#FECACA')}>
              Simulate hung state
            </button>
            <button onClick={reset} style={btnStyle('var(--text-muted)', 'var(--warm-75)', 'var(--border)')}>
              Reset
            </button>
          </div>

          {/* Demo chat window */}
          <div style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            background: 'var(--surface)',
            overflow: 'hidden',
          }}>
            {/* Chrome bar */}
            <div style={{
              padding: 'var(--space-3) var(--space-4)',
              borderBottom: '1px solid var(--border)',
              background: 'var(--warm-75)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>
                AI response
              </span>
              {badge && <StatusBadge state={badge.state} label={badge.label} pulse={genState === 'thinking' || genState === 'streaming'} />}
            </div>

            {/* Response area */}
            <div style={{ padding: 'var(--space-6)', minHeight: 160 }}>
              {genState === 'idle' && (
                <p style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>
                  Press a button above to simulate a generation state.
                </p>
              )}

              {genState === 'thinking' && (
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{
                      width: 6, height: 6, borderRadius: '50%', background: 'var(--text-faint)',
                      animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      display: 'block',
                    }} />
                  ))}
                  <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
                </div>
              )}

              {(genState === 'streaming' || genState === 'complete') && displayedText && (
                <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
                  {displayedText}
                  {genState === 'streaming' && (
                    <span style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--text)', marginLeft: 2, animation: 'blink 1s step-end infinite', verticalAlign: 'text-bottom' }} />
                  )}
                  <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
                </p>
              )}

              {genState === 'hung' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
                    {displayedText}
                  </p>
                  <InlineAlert
                    variant="error"
                    title="Generation stalled"
                    action={{ label: 'Retry generation', onClick: runNormal }}
                    secondaryAction={{ label: 'Copy partial output', onClick: () => navigator.clipboard?.writeText(displayedText) }}
                  >
                    The response stopped mid-stream. Your prompt has been preserved.
                  </InlineAlert>
                </div>
              )}
            </div>

            {/* Watchdog timer (visible during streaming stall) */}
            {genState === 'streaming' && elapsedSeconds > 0 && (
              <div style={{
                padding: 'var(--space-2) var(--space-4)',
                borderTop: '1px solid var(--border)',
                background: '#FFFBEB',
                fontSize: 'var(--text-xs)',
                color: '#B45309',
              }}>
                No new tokens for {elapsedSeconds}s — escalating to hung state at 5s
              </div>
            )}
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
            The hung state simulation pauses streaming mid-response and starts the watchdog timer. After 5 seconds without new tokens, the interface escalates to an explicit error-adjacent state with a recovery affordance.
          </p>
        </div>
      )}

      {activeTab === 'states' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {([
            { state: 'thinking' as const, label: 'Thinking', desc: 'Model has received request. Processing before first token.', pulse: true },
            { state: 'streaming' as const, label: 'Generating', desc: 'Output is actively streaming to the interface.', pulse: true },
            { state: 'complete' as const, label: 'Complete', desc: 'Generation finished. Explicit signal — not inferred from other UI.', pulse: false },
            { state: 'hung' as const, label: 'Response stalled', desc: 'Watchdog threshold exceeded. No new tokens in 5–8s.', pulse: false },
            { state: 'error' as const, label: 'Error', desc: 'Network failure, context limit, or policy refusal.', pulse: false },
          ]).map(item => (
            <div key={item.state} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)', padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
              <div style={{ paddingTop: 2 }}>
                <StatusBadge state={item.state} label={item.label} pulse={item.pulse} />
              </div>
              <div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>{item.label}</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'definition' && <PatternDefinition />}
    </PatternShell>
  )
}

function PatternDefinition() {
  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {[
        { label: 'Problem', text: 'AI generation is not a download. No product in the audit differentiates thinking, streaming, complete, and hung as distinct states. A user watching a pulsing indicator has no information about whether to wait or intervene.' },
        { label: 'Prescription', text: 'Four states minimum, each with a distinct visual treatment: Thinking (processing before first token), Streaming (output actively writing), Complete (explicit signal, not inferred), Hung (escalated after watchdog threshold with recovery affordance).' },
        { label: 'Design decisions', text: 'Watchdog timeout threshold must be calibrated to product latency profile. Thinking-state copy specificity depends on backend state visibility. Completion signal must be explicit without being disruptive.' },
        { label: 'Tradeoffs', text: 'Hung-state escalation risks false positives on slow but functional responses. Specific thinking-state copy requires backend integration that generic indicators do not. Explicit completion signals add visual events to a reading experience.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function btnStyle(color: string, bg: string, border: string): React.CSSProperties {
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
