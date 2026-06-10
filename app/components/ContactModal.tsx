'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  triggerRef?: React.RefObject<HTMLButtonElement | null>
}

export default function ContactModal({ isOpen, onClose, triggerRef }: ContactModalProps) {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)
  const firstFocusRef = useRef<HTMLButtonElement>(null)
  const lastFocusRef = useRef<HTMLAnchorElement>(null)

  const handleClose = useCallback(() => {
    setAnimating(false)
    setTimeout(() => {
      setVisible(false)
      onClose()
      // Return focus to trigger element
      if (triggerRef?.current) {
        triggerRef.current.focus()
      }
    }, 150)
  }, [onClose, triggerRef])

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimating(true)
          // Move focus into modal
          setTimeout(() => firstFocusRef.current?.focus(), 200)
        })
      })
    } else {
      setAnimating(false)
      setTimeout(() => setVisible(false), 150)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        e.preventDefault()
        handleClose()
      }
      // Focus trap
      if (e.key === 'Tab') {
        const focusable = document.querySelectorAll<HTMLElement>(
          '[data-modal-focus] button:not([disabled]), [data-modal-focus] a:not([disabled])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last?.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first?.focus()
          }
        }
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, handleClose])

  const handleCopy = async () => {
    await navigator.clipboard.writeText('ali@alikhandesign.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!visible) return null

  return (
    <div
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(28,28,26,0.75)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        opacity: animating ? 1 : 0,
        transition: 'opacity 200ms ease',
      }}
      aria-modal="true"
      role="dialog"
      aria-label="Contact Ali Khan"
    >
      <div
        data-modal-focus
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--color-bg)',
          borderRadius: 'var(--radius)',
          width: '100%',
          maxWidth: 480,
          position: 'relative',
          overflow: 'hidden',
          transform: animating ? 'scale(1)' : 'scale(0.96)',
          opacity: animating ? 1 : 0,
          transition: 'transform 200ms ease-out, opacity 200ms ease-out',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--color-accent)' }} />

        <div style={{ padding: 'var(--space-6)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-5)' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>Get in touch</p>
              <h2 className="font-serif" style={{ fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--color-text)', lineHeight: 1.2, margin: 0 }}>
                Let's work together.
              </h2>
            </div>
            <button
              ref={firstFocusRef}
              onClick={handleClose}
              aria-label="Close contact modal"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 8, display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: 44, minHeight: 44, justifyContent: 'center' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
            I'm actively looking for senior product design and AI-focused roles. Copy my email below or send directly — whatever works for you.
          </p>

          <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: '0.75rem var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>ali@alikhandesign.com</span>
            <button
              onClick={handleCopy}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-xs)', color: copied ? 'var(--color-accent)' : 'var(--color-text-muted)', fontWeight: 500, fontFamily: 'var(--font-sans)', padding: '8px 4px', transition: 'color var(--transition-base)', minHeight: 44, flexShrink: 0 }}
            >
              {copied ? (
                <><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>Copied!</>
              ) : (
                <><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="5" y="5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M3 11V3h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>Copy</>
              )}
            </button>
          </div>

          <a
            href="mailto:ali@alikhandesign.com"
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', boxSizing: 'border-box', marginBottom: 'var(--space-4)', textDecoration: 'none' }}
          >
            Send email →
          </a>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)', display: 'flex', justifyContent: 'center', gap: 'var(--space-6)' }}>
            <a
              href="https://www.linkedin.com/in/alikhandesign"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, minHeight: 44, padding: '8px 4px' }}
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M4 6.5V12M4 4v.5M7.5 12V9c0-1.1.9-2 2-2s2 .9 2 2v3M7.5 6.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              LinkedIn
            </a>
            <a
              ref={lastFocusRef}
              href="https://github.com/alikhandesign"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', textDecoration: 'none', fontWeight: 500, minHeight: 44, padding: '8px 4px' }}
            >
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 1C4.13 1 1 4.13 1 8c0 3.09 2 5.71 4.79 6.64.35.06.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.03-.78-1.03-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.62 1.07 1.63.76 2.03.58.06-.45.24-.76.44-.93-1.56-.18-3.2-.78-3.2-3.47 0-.77.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .59-.19 1.93.72A6.7 6.7 0 0 1 8 4.77c.6.003 1.2.08 1.76.24 1.34-.91 1.93-.72 1.93-.72.38.96.14 1.67.07 1.85.45.49.72 1.11.72 1.88 0 2.7-1.64 3.29-3.2 3.47.25.22.48.65.48 1.31v1.94c0 .19.12.4.48.33A7 7 0 0 0 15 8c0-3.87-3.13-7-7-7z" fill="currentColor"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
