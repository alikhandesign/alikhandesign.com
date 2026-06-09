'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import ContactModal from '../components/ContactModal'
import GenerationState, { type GenerationPhase } from '../components/GenerationState'
import ChatBubble from '../components/ChatBubble'
import SuggestedPrompts from '../components/SuggestedPrompts'
import ChatInput from '../components/ChatInput'

const CHAT_PASSWORD = '4likh4n'
const RATE_LIMIT_WARN = 7
const RATE_LIMIT_MAX = 10

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  'Walk me through the AI agent project',
  'What is Ali\'s approach to UX research?',
  'What roles is Ali looking for?',
  'Tell me about the People-First redesign',
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
  const [rateLimitError, setRateLimitError] = useState('')
  const [responseCount, setResponseCount] = useState(0)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const unlockRef = useRef<HTMLButtonElement>(null)
  const unlockPanelRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)
  const contactTriggerRef = useRef<HTMLButtonElement>(null)

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

  const handleUnlock = () => {
    if (passwordInput === CHAT_PASSWORD) {
      setUnlocked(true)
      setShowUnlock(false)
      setPasswordInput('')
      setPasswordError(false)
    } else {
      setPasswordError(true)
      setTimeout(() => setPasswordError(false), 2000)
    }
  }

  const handlePauseEdit = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
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

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    if (responseCount >= RATE_LIMIT_MAX) {
      setRateLimitError('limit')
      return
    }
    setRateLimitError('')

    const userMessage: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setStreaming(true)
    setGenerationPhase('thinking')

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, unlocked }),
        signal: controller.signal,
      })

      if (res.status === 429) {
        setRateLimitError('limit')
        setMessages(prev => prev.slice(0, -1))
        return
      }

      if (!res.ok) throw new Error('API error')

      setGenerationPhase('generating')
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      setResponseCount(c => c + 1)
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Something went wrong on my end. Please try again, or reach out to Ali directly at ali@alikhandesign.com.'
      }])
    } finally {
      setLoading(false)
      setStreaming(false)
      abortRef.current = null
    }
  }

  const isEmpty = messages.length === 0
  const remaining = RATE_LIMIT_MAX - responseCount
  const showWarn = responseCount >= RATE_LIMIT_WARN && responseCount < RATE_LIMIT_MAX
  const showLimit = rateLimitError === 'limit' || responseCount >= RATE_LIMIT_MAX

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
        <header className="page-header" style={{ borderBottom: '1px solid var(--border)' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Link href="/" style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'var(--border-mid)' }}>›</span>
            <span style={{ fontSize: 'var(--text-base)', color: 'var(--text)', fontWeight: 500 }}>Ask Ali</span>
          </nav>

          <p className="eyebrow">Portfolio Assistant</p>
          <h1 className="font-serif" style={{ fontSize: 'var(--text-4xl)', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>
            Ask Ali anything.
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 520, marginBottom: 'var(--space-4)' }}>
            An AI assistant that knows Ali's work, background, and approach. Ask about specific projects, research methods, or what he's looking for next.
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
                  fontSize: 'var(--text-sm)', color: 'var(--text-muted)',
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
                fontSize: 'var(--text-sm)', color: '#4A6130',
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
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: 'var(--space-5)',
                  boxSizing: 'border-box',
                }}
              >
                <p style={{ fontSize: 'var(--text-base)', fontWeight: 500, marginBottom: '0.4rem' }}>Enter access code</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
                  Don't have a code?{' '}
                  <button
                    ref={contactTriggerRef}
                    onClick={() => { setShowUnlock(false); setContactModalOpen(true) }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--accent)', fontFamily: 'var(--font-sans)',
                      fontSize: 'var(--text-xs)', padding: 0,
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
                  <button onClick={handleUnlock} className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                    Unlock
                  </button>
                </div>
                {passwordError && (
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--accent-dark)', marginTop: '0.4rem' }}>
                    Incorrect code. Contact Ali to request access.
                  </p>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Chat area */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          marginTop: 'var(--space-6)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          padding: 'var(--space-6)',
        }} className="chat-container">

          {/* Messages — scrollable */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            paddingBottom: isEmpty ? 0 : 'var(--space-4)',
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--border) transparent',
          }}>
            {messages.map((msg, i) => (
              <ChatBubble key={i} role={msg.role} content={msg.content} />
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: '12px 12px 12px 2px',
                }}>
                  <GenerationState phase={generationPhase} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Rate limit warning */}
          {showWarn && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', background: '#fdf6ec',
              borderLeft: '3px solid #92600A',
              fontSize: 'var(--text-xs)', color: '#92600A',
              marginBottom: 'var(--space-4)',
            }}>
              <span>{remaining} response{remaining === 1 ? '' : 's'} remaining.</span>
              <button
                onClick={() => setContactModalOpen(true)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#92600A', fontWeight: 500, fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)', textDecoration: 'underline', padding: 0,
                }}
              >
                Contact Ali
              </button>
            </div>
          )}

          {/* Rate limit reached */}
          {showLimit && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', background: 'var(--accent-bg)',
              borderLeft: '3px solid var(--accent)',
              fontSize: 'var(--text-xs)', color: 'var(--accent)',
              marginBottom: 'var(--space-4)',
            }}>
              <span>You've used all available responses.</span>
              <button
                onClick={() => setContactModalOpen(true)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--accent)', fontWeight: 500, fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--text-xs)', textDecoration: 'underline', padding: 0,
                }}
              >
                Contact Ali for more
              </button>
            </div>
          )}

          {/* Input area */}
          <div style={{
            borderTop: isEmpty ? 'none' : '1px solid var(--border)',
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
          </div>
        </div>
      </div>
    </>
  )
}





