'use client'
import { useState, useEffect, useRef } from 'react'
import PatternShell from '../PatternShell'
import PatternAnnotation from '../../components/PatternAnnotation'
import StatusBadge from '../../components/StatusBadge'
import InlineAlert from '../../components/InlineAlert'
import Button from '../../components/Button'

type GenerationState = 'idle' | 'thinking' | 'streaming' | 'complete' | 'hung'
type BadgeState = 'thinking' | 'streaming' | 'complete' | 'hung' | 'error' | 'warning' | 'info'
interface BadgeConfig { state: BadgeState; label: string }
interface DemoProps {
  genState: GenerationState
  displayedText: string
  elapsedSeconds: number
  badge: BadgeConfig | null
  runNormal: () => void
  runHung: () => void
  reset: () => void
}

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo',       label: 'Interactive demo' },
  { id: 'states',     label: 'All states' },
]

const SAMPLE = 'AI generation is not a download. When a model processes a request, it is reasoning — weighing options, constructing output, making probabilistic choices. The interface must make this process legible at every stage: before output begins, during streaming, at completion, and — critically — when generation stalls.'

const STATE_BADGE: Record<GenerationState, BadgeConfig | null> = {
  idle:      null,
  thinking:  { state: 'thinking',  label: 'Thinking' },
  streaming: { state: 'streaming', label: 'Generating' },
  complete:  { state: 'complete',  label: 'Complete' },
  hung:      { state: 'hung',      label: 'Response stalled' },
}

const ANNOTATION = 'Observed across Claude, ChatGPT, Gemini, and Perplexity. In every product, the visual state during active generation is identical to the visual state during a hung or stalled generation. No product communicates completion as an explicit state — users infer it from the appearance of feedback UI. GitHub Copilot is the only product that marks an interrupted response as incomplete.'

export default function GenerationStatesPage() {
  const [activeTab, setActiveTab]     = useState('definition')
  const [genState, setGenState]       = useState<GenerationState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const streamRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = () => {
    if (streamRef.current)   clearInterval(streamRef.current)
    if (watchdogRef.current) clearTimeout(watchdogRef.current)
    if (timerRef.current)    clearInterval(timerRef.current)
  }
  const reset = () => { clearAll(); setGenState('idle'); setDisplayedText(''); setElapsedSeconds(0) }

  const runNormal = () => {
    clearAll(); setDisplayedText(''); setElapsedSeconds(0); setGenState('thinking')
    setTimeout(() => {
      setGenState('streaming')
      let i = 0
      streamRef.current = setInterval(() => {
        i += 3; setDisplayedText(SAMPLE.slice(0, i))
        if (i >= SAMPLE.length) { clearInterval(streamRef.current!); setGenState('complete') }
      }, 40)
    }, 1800)
  }

  const runHung = () => {
    clearAll(); setDisplayedText(''); setElapsedSeconds(0); setGenState('thinking')
    setTimeout(() => {
      setGenState('streaming')
      let i = 0
      const partial = SAMPLE.slice(0, 80)
      streamRef.current = setInterval(() => {
        i += 3; setDisplayedText(partial.slice(0, i))
        if (i >= partial.length) {
          clearInterval(streamRef.current!)
          let secs = 0
          timerRef.current = setInterval(() => { secs++; setElapsedSeconds(secs) }, 1000)
          watchdogRef.current = setTimeout(() => { clearInterval(timerRef.current!); setGenState('hung') }, 5000)
        }
      }, 40)
    }, 1200)
  }

  useEffect(() => () => clearAll(), [])
  const badge = STATE_BADGE[genState]

  const definition = <Definition />
  const demo = <Demo genState={genState} displayedText={displayedText} elapsedSeconds={elapsedSeconds} badge={badge} runNormal={runNormal} runHung={runHung} reset={reset} />
  const states = <AllStates />

  return (
    <PatternShell title="Generation States" slug="generation-states"
      problem="Users cannot distinguish between a model that is actively generating and one that has frozen. No product in the audit communicates these as distinct states."
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
        { label: 'Problem', text: 'AI generation is not a download. No product in the audit differentiates thinking, streaming, complete, and hung as distinct states. A user watching a pulsing indicator has no information about whether to wait or intervene.' },
        { label: 'Prescription', text: 'Four states minimum, each with a distinct visual treatment: Thinking (processing before first token), Streaming (output actively writing), Complete (explicit signal, not inferred), Hung (escalated after watchdog threshold with recovery affordance).' },
        { label: 'Design decisions', text: 'Watchdog timeout threshold must be calibrated to product latency profile. Thinking-state copy specificity depends on backend state visibility. Completion signal must be explicit without being disruptive.' },
        { label: 'Tradeoffs', text: 'Hung-state escalation risks false positives on slow but functional responses. Specific thinking-state copy requires backend integration that generic indicators do not. Explicit completion signals add visual events to a reading experience.' },
      ].map(item => (
        <div key={item.label}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>{item.label}</p>
          <p style={{ fontSize: 'var(--color-text-base)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-loose)' }}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

function Demo({ genState, displayedText, elapsedSeconds, badge, runNormal, runHung, reset }: DemoProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PatternAnnotation finding={ANNOTATION} />
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Button label="Run normal generation" variant="primary" onClick={runNormal} arrow={false} />
        <Button label="Simulate hung state" variant="secondary" onClick={runHung} arrow={false} />
        <Button label="Reset" variant="secondary" onClick={reset} arrow={false} />
      </div>
      <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', background: 'var(--color-surface)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--color-text-xs)', color: 'var(--color-text-muted)', fontWeight: 'var(--font-weight-medium)', letterSpacing: 'var(--letter-spacing-sm)', textTransform: 'uppercase' }}>AI response</span>
          {badge && <StatusBadge state={badge.state} label={badge.label} pulse={genState === 'thinking' || genState === 'streaming'} />}
        </div>
        <div style={{ padding: 'var(--space-6)', minHeight: 160 }}>
          {genState === 'idle' && <p style={{ color: 'var(--color-text-faint)', fontSize: 'var(--color-text-sm)', fontStyle: 'italic' }}>Press a button above to simulate a generation state.</p>}
          {genState === 'thinking' && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--color-text-faint)', display:'block', animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
            </div>
          )}
          {(genState === 'streaming' || genState === 'complete') && displayedText && (
            <p style={{ fontSize: 'var(--color-text-base)', color: 'var(--color-text)', lineHeight: 'var(--line-height-loose)' }}>
              {displayedText}
              {genState === 'streaming' && <span style={{ display:'inline-block', width:2, height:'1em', background:'var(--color-text)', marginLeft:2, animation:'blink 1s step-end infinite', verticalAlign:'text-bottom' }} />}
              <style>{`@keyframes blink{50%{opacity:0}}`}</style>
            </p>
          )}
          {genState === 'hung' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--color-text-base)', color: 'var(--color-text)', lineHeight: 'var(--line-height-loose)' }}>{displayedText}</p>
              <InlineAlert variant="error" title="Generation stalled"
                action={{ label: 'Retry generation', onClick: runNormal }}
                secondaryAction={{ label: 'Copy partial output', onClick: () => navigator.clipboard?.writeText(displayedText) }}>
                The response stopped mid-stream. Your prompt has been preserved.
              </InlineAlert>
            </div>
          )}
        </div>
        {genState === 'streaming' && elapsedSeconds > 0 && (
          <div style={{ padding: 'var(--space-2) var(--space-4)', borderTop: '1px solid var(--color-border)', background: '#FFFBEB', fontSize: 'var(--color-text-xs)', color: '#B45309' }}>
            No new tokens for {elapsedSeconds}s — watchdog escalates at 5s
          </div>
        )}
      </div>
    </div>
  )
}

function AllStates() {
  const items: Array<{ state: BadgeState; label: string; desc: string; pulse: boolean }> = [
    { state: 'thinking',  label: 'Thinking',        desc: 'Model has received the request. Processing before first token arrives.', pulse: true },
    { state: 'streaming', label: 'Generating',       desc: 'Output is actively streaming to the interface. Cursor visible.', pulse: true },
    { state: 'complete',  label: 'Complete',         desc: 'Generation finished. Explicit signal — not inferred from other UI elements.', pulse: false },
    { state: 'hung',      label: 'Response stalled', desc: 'Watchdog threshold exceeded. No new tokens for 5–8s. Recovery affordance shown.', pulse: false },
    { state: 'error',     label: 'Error',            desc: 'Network failure, context limit, or policy refusal. Distinct from hung.', pulse: false },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {items.map(item => (
        <div key={item.state} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)', padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', background: 'var(--color-surface)' }}>
          <div style={{ paddingTop: 2, flexShrink: 0 }}><StatusBadge state={item.state} label={item.label} pulse={item.pulse} /></div>
          <div>
            <p style={{ fontSize: 'var(--color-text-sm)', color: 'var(--color-text)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>{item.label}</p>
            <p style={{ fontSize: 'var(--color-text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-normal)' }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
