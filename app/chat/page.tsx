'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const CHAT_PASSWORD = '4likh4n'

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

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '0.75rem 1rem' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--text-muted)',
          animation: 'typing-bounce 1.2s infinite',
          animationDelay: `${i * 0.2}s`,
          display: 'block',
        }} />
      ))}
      <style>{`
        @keyframes typing-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [showUnlock, setShowUnlock] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [rateLimitError, setRateLimitError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

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

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setRateLimitError('')

    const userMessage: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          unlocked,
        }),
      })

      if (res.status === 429) {
        setRateLimitError('You\'ve reached the message limit for this hour. Please try again later or email ali@alikhandesign.com directly.')
        setMessages(prev => prev.slice(0, -1))
        return
      }

      if (!res.ok) {
        throw new Error('API error')
      }

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Something went wrong on my end. Please try again, or reach out to Ali directly at ali@alikhandesign.com.'
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const isEmpty = messages.length === 0

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header className="page-header" style={{ borderBottom: '1px solid var(--border)' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <Link href="/" style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--border-mid)' }}>›</span>
          <span style={{ fontSize: 'var(--text-base)', color: 'var(--text)', fontWeight: 500 }}>Ask Ali</span>
        </nav>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p className="eyebrow">Portfolio Assistant</p>
            <h1 className="font-serif" style={{ fontSize: 'var(--text-4xl)', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>Ask Ali anything.</h1>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 520 }}>
              An AI assistant that knows Ali's work, background, and approach. Ask about specific projects, research methods, or what he's looking for next.
            </p>
          </div>
          {/* Unlock button */}
          {!unlocked && (
            <button
              onClick={() => setShowUnlock(v => !v)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.5rem 1rem', fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-sans)', fontWeight: 500,
                letterSpacing: '0.04em', border: '1px solid var(--border)',
                borderRadius: 'var(--radius)', background: 'transparent',
                color: 'var(--text-muted)', cursor: 'pointer',
                transition: 'border-color 0.15s, color 0.15s',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--border-mid)', display: 'block' }} />
              Unlock protected work
            </button>
          )}
          {unlocked && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', fontSize: 'var(--text-xs)',
              fontWeight: 500, letterSpacing: '0.04em',
              border: '1px solid var(--accent)', borderRadius: 'var(--radius)',
              color: 'var(--accent)', background: 'var(--accent-bg)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'block' }} />
              Protected work unlocked
            </div>
          )}
        </div>

        {/* Unlock panel */}
        {showUnlock && !unlocked && (
          <div style={{
            marginTop: '1rem', padding: 'var(--space-6)',
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius)', maxWidth: 420,
          }}>
            <p style={{ fontSize: 'var(--text-base)', fontWeight: 500, marginBottom: '0.4rem' }}>Enter access code</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>
              Don't have a code? <a href="mailto:ali@alikhandesign.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Request access →</a>
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="password"
                className="password-input"
                placeholder="Access code"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleUnlock()}
                style={{ flex: 1, background: 'var(--bg)' }}
                aria-label="Access code"
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
      </header>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'var(--space-8) var(--space-12)' }}>

        {/* Empty state */}
        {isEmpty && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 'var(--space-6)' }}>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)' }}>Try asking:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {SUGGESTED_QUESTIONS.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    padding: '0.5rem 1rem', fontSize: 'var(--text-sm)',
                    fontFamily: 'var(--font-sans)', fontWeight: 400,
                    border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                    background: 'var(--surface)', color: 'var(--text-muted)',
                    cursor: 'pointer', transition: 'border-color 0.15s, color 0.15s',
                    textAlign: 'left',
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {!isEmpty && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-8)' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '72%',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--text-base)',
                  lineHeight: 1.7,
                  background: msg.role === 'user' ? 'var(--text)' : 'var(--surface)',
                  color: msg.role === 'user' ? 'var(--bg)' : 'var(--text)',
                  border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                }}>
                  <TypingIndicator />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Rate limit error */}
        {rateLimitError && (
          <div style={{
            padding: '0.75rem 1rem', background: 'var(--accent-bg)',
            border: '1px solid var(--accent)', borderRadius: 'var(--radius)',
            fontSize: 'var(--text-sm)', color: 'var(--accent-dark)',
            marginBottom: 'var(--space-4)',
          }}>
            {rateLimitError}
          </div>
        )}

        {/* Input */}
        <div style={{
          display: 'flex', gap: '0.75rem', alignItems: 'flex-end',
          borderTop: isEmpty ? 'none' : '1px solid var(--border)',
          paddingTop: isEmpty ? 0 : 'var(--space-6)',
        }}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Ali's work, background, or approach..."
            rows={1}
            style={{
              flex: 1, resize: 'none', padding: '0.75rem 1rem',
              border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--text-base)',
              lineHeight: 1.6, background: 'var(--surface)', color: 'var(--text)',
              outline: 'none', transition: 'border-color 0.15s',
              minHeight: 44, maxHeight: 160,
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
            aria-label="Chat input"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="btn-primary"
            style={{ flexShrink: 0, opacity: (!input.trim() || loading) ? 0.5 : 1 }}
            aria-label="Send message"
          >
            Send →
          </button>
        </div>

        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-faint)', marginTop: '0.5rem', lineHeight: 1.5 }}>
          Conversations may be logged to improve this experience. Press Enter to send, Shift+Enter for a new line.
        </p>
      </div>
    </div>
  )
}
