'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import ContactModal from '../components/ContactModal'
import GenerationState, { type GenerationPhase } from '../components/GenerationState'
import ChatBubble from '../components/ChatBubble'
import SuggestedPrompts from '../components/SuggestedPrompts'
import ChatInput from '../components/ChatInput'
import SourceInspector from '../components/SourceInspector'
import Heading from '../components/Heading'
import type { SiteSource } from '@/lib/sources'

const RATE_LIMIT_WARN_THRESHOLD = 4 // show warning when this many or fewer responses remain - matches the documented 25% threshold (25% of 15 = 3.75, rounded to 4)
const RATE_LIMIT_MAX = 15 // matches app/api/chat/route.ts RATE_LIMIT_MAX exactly

// Generate a stable session ID for this page load
function generateSessionId(): string {
  return Math.random().toString(36).slice(2, 9)
}

interface Message {
  role: 'user' | 'assistant'
  content: string
  sources?: SiteSource[]
  retryContent?: string // set on a failed assistant message - the user content to resend on retry
  turnIndex?: number // the messageIndex sent to the backend for this turn - used to correlate feedback
}

const SUGGESTED_QUESTIONS = [
  'What makes Ali different from other designers?',
  'What is his experience with AI product design?',
  'Has he worked at enterprise scale?',
  'Is Ali available for full-time roles?',
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState(false)
  const [generationPhase, setGenerationPhase] = useState<GenerationPhase>('thinking')
  const [unlocked, setUnlocked] = useState(false)
  const [showUnlock, setShowUnlock] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [unlockSubmitting, setUnlockSubmitting] = useState(false)
  const [rateLimitError, setRateLimitError] = useState('')
  const [remaining, setRemaining] = useState(RATE_LIMIT_MAX) // synced from server's real count on every response, not a local counter
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [feedbackByTurn, setFeedbackByTurn] = useState<Record<number, 'up' | 'down'>>({})
  const bottomRef = useRef<HTMLDivElement>(null)
  const unlockRef = useRef<HTMLButtonElement>(null)
  const unlockPanelRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const contactTriggerRef = useRef<HTMLButtonElement>(null)
  const inspectorCloseRef = useRef<HTMLButtonElement>(null)
  const inspectorTriggerRef = useRef<HTMLElement | null>(null)

  // Stable session ID for this page load — used to group log entries into sessions
  const sessionIdRef = useRef<string>(generateSessionId())
  // Track turn number within this session
  const messageIndexRef = useRef<number>(0)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Auto-unlock if this visitor already has a valid access cookie (e.g. from
  // unlocking a case study page earlier in the same 7-day window).
  useEffect(() => {
    fetch('/api/verify-access?type=case-study')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.unlocked) setUnlocked(true) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Close unlock panel on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        showUnlock &&
        unlockRef.current && !unlockRef.current.contains(e.target as Node) &&
        unlockPanelRef.current && !unlockPanelRef.current.contains(e.target as Node)
      ) {
        setShowUnlock(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showUnlock])

  const handleUnlock = async () => {
    if (unlockSubmitting) return
    setUnlockSubmitting(true)
    try {
      const res = await fetch('/api/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput, type: 'case-study' }),
      })
      if (res.ok) {
        setUnlocked(true)
        setShowUnlock(false)
        setPasswordInput('')
        setPasswordError(false)
      } else {
        setPasswordError(true)
        setTimeout(() => setPasswordError(false), 2000)
      }
    } catch {
      setPasswordError(true)
      setTimeout(() => setPasswordError(false), 2000)
    } finally {
      setUnlockSubmitting(false)
    }
  }

  const handlePauseEdit = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current)
      watchdogRef.current = null
    }
    // Remove the last user message and restore it to the input
    setMessages(prev => {
      const lastUser = [...prev].reverse().find(m => m.role === 'user')
      if (lastUser) setInput(lastUser.content)
      return prev.filter((_, i) => i < prev.length - 1).filter(m => !(m === lastUser))
    })
    setLoading(false)
    setStreaming(false)
    setTimeout(() => {}, 50)
  }, [])

  const performRequest = async (allMessages: Message[], userContent: string) => {
    setLoading(true)
    setStreaming(true)
    setGenerationPhase('thinking')

    const controller = new AbortController()
    abortRef.current = controller

    // Watchdog: if the request takes longer than this without resolving, surface
    // a distinct "stalled" state rather than leaving the thinking pulse running
    // forever with no signal that something might be wrong.
    if (watchdogRef.current) clearTimeout(watchdogRef.current)
    const thisWatchdog = setTimeout(() => {
      setGenerationPhase('stalled')
    }, 8000)
    watchdogRef.current = thisWatchdog

    // If a retry aborts this request and starts a new one, this request's own
    // catch/finally blocks still run afterward (JS always runs finally, even
    // after an early return in catch). Without this guard, a stale request's
    // cleanup would clobber the newer request's abortRef/watchdog/loading
    // state right after it started. Only reset shared state if nothing newer
    // has taken over since this request began.
    const clearOwnWatchdog = () => {
      if (watchdogRef.current === thisWatchdog) {
        clearTimeout(thisWatchdog)
        watchdogRef.current = null
      }
    }

    const currentMessageIndex = messageIndexRef.current
    messageIndexRef.current += 1

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map(({ role, content }) => ({ role, content })),
          sessionId: sessionIdRef.current,
          messageIndex: currentMessageIndex,
        }),
        signal: controller.signal,
      })

      clearOwnWatchdog()

      if (res.status === 429) {
        setRateLimitError('limit')
        setRemaining(0)
        setMessages(prev => prev.slice(0, -1))
        return
      }

      if (!res.ok) throw new Error('api_error')

      setGenerationPhase('generating')
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message,
        sources: data.sources ?? [],
        turnIndex: currentMessageIndex,
      }])
      if (typeof data.remaining === 'number') {
        setRemaining(data.remaining)
      }
    } catch (err: unknown) {
      clearOwnWatchdog()
      if (err instanceof Error && err.name === 'AbortError') return

      setGenerationPhase('error')

      // Distinguish a genuine network failure (fetch itself never reached the
      // server - TypeError in browsers) from a completed request that came
      // back with an error status (our own thrown 'api_error'). Two real,
      // different situations - not the full four-type taxonomy, but a
      // meaningful improvement over one generic message for every cause.
      const isNetworkFailure = err instanceof TypeError
      const errorContent = isNetworkFailure
        ? "I couldn't reach the server — check your connection and try again, or reach out to Ali directly at ali@alikhandesign.com."
        : 'Something went wrong on my end. Please try again, or reach out to Ali directly at ali@alikhandesign.com.'

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorContent,
        retryContent: userContent,
      }])
    } finally {
      if (abortRef.current === controller) {
        setLoading(false)
        setStreaming(false)
        abortRef.current = null
      }
    }
  }

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    if (remaining <= 0) {
      setRateLimitError('limit')
      return
    }
    setRateLimitError('')

    const userMessage: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')

    await performRequest(newMessages, text.trim())
  }

  const retryLastMessage = () => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    if (watchdogRef.current) {
      clearTimeout(watchdogRef.current)
      watchdogRef.current = null
    }

    const last = messages[messages.length - 1]
    if (last?.role === 'assistant' && last.retryContent) {
      // A completed error message - drop it and resend the same user content
      const withoutFailed = messages.slice(0, -1)
      setMessages(withoutFailed)
      performRequest(withoutFailed, last.retryContent)
    } else if (last?.role === 'user') {
      // Stalled, not yet failed - the user message is still there, just retry
      // the request itself
      performRequest(messages, last.content)
    }
  }

  const isEmpty = messages.length === 0
  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant')?.content ?? ''

  // Source inspector state — lifted to page level so panel sits beside the thread
  const [inspectorSources, setInspectorSources] = useState<import('@/lib/sources').SiteSource[]>([])
  const [activeSourceId, setActiveSourceId] = useState<number | null>(null)
  const inspectorOpen = inspectorSources.length > 0

  const handleBadgeClick = (sources: import('@/lib/sources').SiteSource[], id: number) => {
    if (inspectorOpen && activeSourceId === id && inspectorSources === sources) {
      // Toggle off same badge — the badge itself is still focused naturally,
      // nothing to do
      setInspectorSources([])
      setActiveSourceId(null)
    } else {
      // Opening (or switching source) — remember what had focus so it can be
      // restored when the panel closes via the X button
      inspectorTriggerRef.current = document.activeElement as HTMLElement | null
      setInspectorSources(sources)
      setActiveSourceId(id)
    }
  }

  const handleInspectorClose = () => {
    setInspectorSources([])
    setActiveSourceId(null)
    inspectorTriggerRef.current?.focus()
  }

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(prev => (prev === index ? null : prev)), 1800)
    } catch {
      // Clipboard access denied or unavailable - fail silently, no harm done
    }
  }

  const handleFeedback = (turnIndex: number, rating: 'up' | 'down') => {
    const current = feedbackByTurn[turnIndex]
    const newRating = current === rating ? null : rating // clicking the same one again removes the vote

    setFeedbackByTurn(prev => {
      const next = { ...prev }
      if (newRating === null) {
        delete next[turnIndex]
      } else {
        next[turnIndex] = newRating
      }
      return next
    })

    // Fire and forget - a failed feedback submission shouldn't interrupt
    // anything the visitor is doing, and the UI already updated optimistically
    fetch('/api/chat/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: sessionIdRef.current,
        messageIndex: turnIndex,
        rating: newRating,
      }),
    }).catch(() => {})
  }

  // Move focus into the panel when it opens, so keyboard users land somewhere
  // meaningful rather than the panel appearing with focus left behind on a
  // badge that's now potentially off in the scrolled-past chat history
  useEffect(() => {
    if (inspectorOpen) {
      inspectorCloseRef.current?.focus()
    }
  }, [inspectorOpen])

  const handleSourceSelect = (id: number) => {
    setActiveSourceId(prev => prev === id ? null : id)
  }
  const showWarn = remaining <= RATE_LIMIT_WARN_THRESHOLD && remaining > 0
  const showLimit = rateLimitError === 'limit' || remaining <= 0

  return (
    <>
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        triggerRef={contactTriggerRef}
      />

      <div style={{
        maxWidth: 'var(--max-w)',
        margin: '0 auto',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 var(--space-4)',
        paddingBottom: 'var(--space-12)',
      }}>

        {/* Header */}
        <header className="page-header" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Link href="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--color-border-mid)' }}>›</span>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 500 }}>Ask Ali</span>
          </nav>

          <p className="eyebrow">Portfolio Assistant</p>
          <Heading level={1} lineHeight={1.1}>Ask Ali anything.</Heading>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: 520, marginBottom: 'var(--space-4)' }}>
            An AI assistant that knows Ali's work, background, and approach. Ask about specific projects, research methods, paste a job description to see if it's a fit, or find out what he's looking for next.
          </p>

          {/* Unlock link */}
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {!unlocked ? (
              <button
                ref={unlockRef}
                onClick={() => setShowUnlock(v => !v)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)', padding: 0,
                }}
                aria-expanded={showUnlock}
                aria-label="Unlock protected work"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Unlock protected work
              </button>
            ) : (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 'var(--font-size-sm)', color: '#4A6130',
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M5.5 7V5a2.5 2.5 0 0 1 4.95-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Work unlocked
              </span>
            )}

            {/* Unlock panel */}
            {showUnlock && !unlocked && (
              <div
                ref={unlockPanelRef}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: 0,
                  zIndex: 100, width: 380, maxWidth: 'calc(100vw - var(--space-8))',
                  background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: 'var(--space-5)',
                  boxSizing: 'border-box',
                }}
              >
                <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, marginBottom: '0.4rem' }}>Enter access code</p>
                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
                  Don't have a code?{' '}
                  <button
                    ref={contactTriggerRef}
                    onClick={() => { setShowUnlock(false); setContactModalOpen(true) }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--color-accent)', fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--font-size-xs)', padding: 0,
                    }}
                  >
                    Request access →
                  </button>
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="password"
                    className="password-input"
                    placeholder="Access code"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                    aria-label="Access code"
                    autoFocus
                  />
                  <button onClick={handleUnlock} disabled={unlockSubmitting} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    Unlock
                  </button>
                </div>
                {passwordError && (
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent-dark)', marginTop: '0.4rem' }}>
                    Incorrect code. Contact Ali to request access.
                  </p>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Chat area */}
        <div
          className="chat-container"
          style={{
            position: 'relative',
            marginTop: 'var(--space-6)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
          }}
        >
          {/* Left — message thread + input */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            height: '100%',
            background: 'var(--color-surface)',
            padding: 'var(--space-6)',
            minWidth: 0,
            flex: 1,
          }}>
            {/* Messages — scrollable */}
            <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            paddingBottom: isEmpty ? 0 : 'var(--space-4)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--color-border) transparent',
          }}>
            {/* Visually hidden - announces new assistant responses to screen readers
                without re-announcing the whole visible conversation on every render */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {lastAssistantMessage}
            </div>
            {messages.map((msg, i) => (
              <div key={i}>
                <ChatBubble
                  role={msg.role}
                  content={msg.content}
                  sources={msg.sources}
                  activeSourceId={msg.sources === inspectorSources ? activeSourceId : null}
                  onBadgeClick={(id) => handleBadgeClick(msg.sources ?? [], id)}
                />
                {msg.role === 'assistant' && !msg.retryContent && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2, marginTop: 4 }}>
                    <button
                      onClick={() => handleCopy(msg.content, i)}
                      aria-label="Copy response"
                      style={{
                        fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        padding: '2px 6px', fontFamily: 'var(--font-sans)',
                        display: 'flex', alignItems: 'center', gap: 4,
                      }}
                    >
                      {copiedIndex === i ? (
                        'Copied'
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                            <path d="M3 10V3.5A1.5 1.5 0 0 1 4.5 2H10" stroke="currentColor" strokeWidth="1.3"/>
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                    {typeof msg.turnIndex === 'number' && (
                      <>
                        <button
                          onClick={() => handleFeedback(msg.turnIndex!, 'up')}
                          aria-label="Good response"
                          aria-pressed={feedbackByTurn[msg.turnIndex] === 'up'}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: '2px 6px', display: 'flex', alignItems: 'center',
                            color: feedbackByTurn[msg.turnIndex] === 'up' ? 'var(--color-accent)' : 'var(--color-text-faint)',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
                            <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleFeedback(msg.turnIndex!, 'down')}
                          aria-label="Bad response"
                          aria-pressed={feedbackByTurn[msg.turnIndex] === 'down'}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: '2px 6px', display: 'flex', alignItems: 'center',
                            color: feedbackByTurn[msg.turnIndex] === 'down' ? 'var(--color-accent)' : 'var(--color-text-faint)',
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <g transform="scale(1,-1) translate(0,-24)">
                              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
                              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                            </g>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                )}
                {msg.retryContent && i === messages.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 'var(--space-2)' }}>
                    <button
                      onClick={retryLastMessage}
                      style={{
                        fontSize: 'var(--font-size-xs)', fontWeight: 500,
                        padding: '0.4rem 0.9rem',
                        background: 'var(--color-surface)', color: 'var(--color-text)',
                        border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer', fontFamily: 'var(--font-sans)',
                      }}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: 'var(--color-surface)', border: '1px solid var(--color-border)',
                  borderRadius: '12px 12px 12px 2px',
                }}>
                  <GenerationState phase={generationPhase} />
                  {generationPhase === 'stalled' && (
                    <div style={{
                      padding: '0 1rem 0.75rem',
                      display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                    }}>
                      <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        This is taking longer than usual.
                      </span>
                      <button
                        onClick={retryLastMessage}
                        style={{
                          fontSize: 'var(--font-size-xs)', fontWeight: 500,
                          padding: '0.3rem 0.75rem',
                          background: 'var(--color-surface)', color: 'var(--color-text)',
                          border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer', fontFamily: 'var(--font-sans)', flexShrink: 0,
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Rate limit warning */}
          {showWarn && (
            <div style={{
              padding: '8px 12px', background: '#fdf6ec',
              borderLeft: '3px solid #92600A',
              fontSize: 'var(--font-size-xs)', color: '#92600A',
              marginBottom: 'var(--space-4)',
              lineHeight: 1.5,
            }}>
              {remaining} response{remaining === 1 ? '' : 's'} remaining — limited to keep this a quick, focused conversation — for anything deeper,{' '}
              <button
                onClick={() => setContactModalOpen(true)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#92600A', fontWeight: 500, fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--font-size-xs)', textDecoration: 'underline', padding: 0,
                  display: 'inline',
                }}
              >
                reach out to Ali directly
              </button>.
            </div>
          )}

          {/* Rate limit reached */}
          {showLimit && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', background: 'var(--color-accent-bg)',
              borderLeft: '3px solid var(--color-accent)',
              fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)',
              marginBottom: 'var(--space-4)',
            }}>
              <span>You've used all available responses.</span>
              <button
                onClick={() => setContactModalOpen(true)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--color-accent)', fontWeight: 500, fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--font-size-xs)', textDecoration: 'underline', padding: 0,
                }}
              >
                Contact Ali for more
              </button>
            </div>
          )}

          {/* Input area */}
          <div style={{
            borderTop: isEmpty ? 'none' : '1px solid var(--color-border)',
            paddingTop: isEmpty ? 0 : 'var(--space-6)',
          }}>
            {isEmpty && (
              <SuggestedPrompts
                prompts={SUGGESTED_QUESTIONS}
                onSelect={sendMessage}
              />
            )}

            <ChatInput
              value={input}
              onChange={setInput}
              onSend={() => sendMessage(input)}
              onPauseEdit={handlePauseEdit}
              disabled={showLimit}
              streaming={streaming}
              placeholder="Ask about Ali's work, background, or approach..."
            />
          </div>{/* end input area */}
          </div>{/* end left column */}

          {/* Right — source inspector panel (desktop only) */}
          {!isMobile && inspectorOpen && (
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: 260,
              zIndex: 10,
              boxShadow: '-4px 0 16px rgba(0,0,0,0.08)',
              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
              overflow: 'hidden',
            }}>
              <SourceInspector
                ref={inspectorCloseRef}
                sources={inspectorSources}
                activeId={activeSourceId}
                onClose={handleInspectorClose}
                onSelect={handleSourceSelect}
              />
            </div>
          )}
        </div>{/* end chat-container */}

        {/* Bottom drawer — source inspector (mobile only) */}
        {isMobile && inspectorOpen && (
          <>
            {/* Dim overlay */}
            <div
              onClick={handleInspectorClose}
              style={{
                position: 'fixed', inset: 0, zIndex: 40,
                background: 'rgba(0,0,0,0.3)',
              }}
            />
            {/* Drawer */}
            <div style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
              height: '62vh',
              background: 'var(--color-surface)',
              borderRadius: '16px 16px 0 0',
              boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
              display: 'flex', flexDirection: 'column',
              animation: 'drawer-up 0.25s ease',
            }}>
              {/* Drag handle */}
              <div style={{
                display: 'flex', justifyContent: 'center',
                padding: '12px 0 4px',
                flexShrink: 0,
              }}>
                <div style={{
                  width: 36, height: 4, borderRadius: 2,
                  background: 'var(--color-border-mid)',
                }} />
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <SourceInspector
                  ref={inspectorCloseRef}
                  sources={inspectorSources}
                  activeId={activeSourceId}
                  onClose={handleInspectorClose}
                  onSelect={handleSourceSelect}
                />
              </div>
            </div>
            <style>{`
              @keyframes drawer-up {
                from { transform: translateY(100%); }
                to { transform: translateY(0); }
              }
            `}</style>
          </>
        )}
      </div>
    </>
  )
}
