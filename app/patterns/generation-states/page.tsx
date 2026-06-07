'use client'
import { useState, useEffect, useRef, CSSProperties } from 'react'
import PatternShell from '../PatternShell'
import StatusBadge from '../../components/StatusBadge'
import InlineAlert from '../../components/InlineAlert'

type GenerationState = 'idle' | 'thinking' | 'streaming' | 'complete' | 'hung'
type BadgeState = 'thinking' | 'streaming' | 'complete' | 'hung' | 'error' | 'warning' | 'info'
interface BadgeConfig { state: BadgeState; label: string }

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

const SAMPLE_RESPONSE = "AI generation is not a download. When a model processes a request, it is reasoning — weighing options, constructing output, making probabilistic choices. The interface must make this process legible at every stage: before output begins, during streaming, at completion, and — critically — when generation stalls."

const STATE_BADGE: Record<GenerationState, BadgeConfig | null> = {
  idle:      null,
  thinking:  { state: 'thinking',  label: 'Thinking' },
  streaming: { state: 'streaming', label: 'Generating' },
  complete:  { state: 'complete',  label: 'Complete' },
  hung:      { state: 'hung',      label: 'Response stalled' },
}

export default function GenerationStatesPage() {
  const [activeTab, setActiveTab] = useState('definition')
  const [genState, setGenState] = useState<GenerationState>('idle')
  const [displayedText, setDisplayedText] = useState('')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const streamRef  = useRef<ReturnType<typeof setInterval> | null>(null)
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearAll = () => {
    if (streamRef.current)  clearInterval(streamRef.current)
    if (watchdogRef.current) clearTimeout(watchdogRef.current)
    if (timerRef.current)   clearInterval(timerRef.current)
  }
  const reset = () => { clearAll(); setGenState('idle'); setDisplayedText(''); setElapsedSeconds(0) }

  const runNormal = () => {
    clearAll(); setDisplayedText(''); setElapsedSeconds(0); setGenState('thinking')
    setTimeout(() => {
      setGenState('streaming')
      let i = 0
      streamRef.current = setInterval(() => {
        i += 3
        setDisplayedText(SAMPLE_RESPONSE.slice(0, i))
        if (i >= SAMPLE_RESPONSE.length) { clearInterval(streamRef.current!); setGenState('complete') }
      }, 40)
    }, 1800)
  }

  const runHung = () => {
    clearAll(); setDisplayedText(''); setElapsedSeconds(0); setGenState('thinking')
    setTimeout(() => {
      setGenState('streaming')
      let i = 0
      const partial = SAMPLE_RESPONSE.slice(0, 80)
      streamRef.current = setInterval(() => {
        i += 3
        setDisplayedText(partial.slice(0, i))
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
    <PatternShell
      title="Generation States"
      slug="generation-states"
      problem="Users cannot distinguish between a model that is actively generating and one that has frozen. No product in the audit communicates these as distinct states."
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

interface DemoProps {
  genState: GenerationState; displayedText: string; elapsedSeconds: number
  badge: { state: BadgeState; label: string } | null
  runNormal: () => void; runHung: () => void; reset: () => void
}
type GenerationState = 'idle' | 'thinking' | 'streaming' | 'complete' | 'hung'
type BadgeState = 'thinking' | 'streaming' | 'complete' | 'hung' | 'error' | 'warning' | 'info'

function Demo({ genState, displayedText, elapsedSeconds, badge, runNormal, runHung, reset }: DemoProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <button onClick={runNormal} style={btn('#1D4ED8','#EFF6FF','#BFDBFE')}>Run normal generation</button>
        <button onClick={runHung}   style={btn('var(--accent)','var(--accent-bg)','#FECACA')}>Simulate hung state</button>
        <button onClick={reset}     style={btn('var(--text-muted)','var(--warm-75)','var(--border)')}>Reset</button>
      </div>
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)', background: 'var(--warm-75)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 'var(--font-weight-medium)' }}>AI response</span>
          {badge && <StatusBadge state={badge.state} label={badge.label} pulse={genState === 'thinking' || genState === 'streaming'} />}
        </div>
        <div style={{ padding: 'var(--space-6)', minHeight: 160 }}>
          {genState === 'idle' && <p style={{ color: 'var(--text-faint)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>Press a button above to simulate a generation state.</p>}
          {genState === 'thinking' && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              {[0,1,2].map(i => <span key={i} style={{ width:6, height:6, borderRadius:'50%', background:'var(--text-faint)', display:'block', animation:`bounce 1.2s ease-in-out ${i*0.2}s infinite` }} />)}
              <style>{`@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
            </div>
          )}
          {(genState === 'streaming' || genState === 'complete') && displayedText && (
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>
              {displayedText}
              {genState === 'streaming' && <span style={{ display:'inline-block', width:2, height:'1em', background:'var(--text)', marginLeft:2, animation:'blink 1s step-end infinite', verticalAlign:'text-bottom' }} />}
              <style>{`@keyframes blink{50%{opacity:0}}`}</style>
            </p>
          )}
          {genState === 'hung' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text)', lineHeight: 'var(--line-height-loose)' }}>{displayedText}</p>
              <InlineAlert variant="error" title="Generation stalled" action={{ label: 'Retry generation', onClick: runNormal }} secondaryAction={{ label: 'Copy partial output', onClick: () => navigator.clipboard?.writeText(displayedText) }}>
                The response stopped mid-stream. Your prompt has been preserved.
              </InlineAlert>
            </div>
          )}
        </div>
        {genState === 'streaming' && elapsedSeconds > 0 && (
          <div style={{ padding: 'var(--space-2) var(--space-4)', borderTop: '1px solid var(--border)', background: '#FFFBEB', fontSize: 'var(--text-xs)', color: '#B45309' }}>
            No new tokens for {elapsedSeconds}s — escalating to hung state at 5s
          </div>
        )}
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', lineHeight: 'var(--line-height-normal)' }}>
        The hung state simulation pauses streaming mid-response and starts the watchdog timer. After 5 seconds without new tokens, the interface escalates to an explicit error-adjacent state with a recovery affordance.
      </p>
    </div>
  )
}

function AllStates() {
  const items: Array<{ state: BadgeState; label: string; desc: string; pulse: boolean }> = [
    { state: 'thinking',  label: 'Thinking',          desc: 'Model has received request. Processing before first token.', pulse: true },
    { state: 'streaming', label: 'Generating',         desc: 'Output is actively streaming to the interface.', pulse: true },
    { state: 'complete',  label: 'Complete',           desc: 'Generation finished. Explicit signal — not inferred from other UI.', pulse: false },
    { state: 'hung',      label: 'Response stalled',   desc: 'Watchdog threshold exceeded. No new tokens in 5–8s.', pulse: false },
    { state: 'error',     label: 'Error',              desc: 'Network failure, context limit, or policy refusal.', pulse: false },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {items.map(item => (
        <div key={item.state} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-6)', padding: 'var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--surface)' }}>
          <div style={{ paddingTop: 2, flexShrink: 0 }}><StatusBadge state={item.state} label={item.label} pulse={item.pulse} /></div>
          <div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-1)' }}>{item.label}</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)', lineHeight: 'var(--line-height-normal)' }}>{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function btn(color: string, bg: string, border: string): CSSProperties {
  return { padding: 'var(--space-2) var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color, background: bg, border: `1px solid ${border}`, borderRadius: 'var(--radius)', cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'opacity var(--transition-base)' }
}
