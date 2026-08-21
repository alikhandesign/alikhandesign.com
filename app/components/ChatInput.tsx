'use client'

import { useRef, useEffect } from 'react'

interface ChatInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onPauseEdit?: () => void
  disabled?: boolean
  streaming?: boolean
  placeholder?: string
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  onPauseEdit,
  disabled = false,
  streaming = false,
  placeholder = 'Ask a question...',
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  // Reset height when value is cleared externally
  useEffect(() => {
    if (!value && inputRef.current) {
      inputRef.current.style.height = 'auto'
    }
  }, [value])

  return (
    <div>
      <div className="chat-input-row" style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
        <textarea
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          disabled={disabled}
          style={{
            flex: 1, resize: 'none', padding: '0.75rem 1rem',
            border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-sm)',
            lineHeight: 1.6, background: 'var(--color-surface)', color: 'var(--color-text)',
            outline: 'none', transition: 'border-color 0.15s',
            minHeight: 48, maxHeight: 160, boxSizing: 'border-box',
            opacity: disabled ? 0.5 : 1,
          }}
          onFocus={e => { if (!disabled) e.target.style.borderColor = 'var(--color-accent)' }}
          onBlur={e => { e.target.style.borderColor = 'var(--color-border)' }}
          aria-label="Chat input"
        />
        {streaming ? (
          <button
            onClick={onPauseEdit}
            style={{
              flexShrink: 0, height: 48, boxSizing: 'border-box',
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0 1rem',
              background: 'var(--color-text)', color: 'var(--color-bg)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-sm)',
              fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
            }}
            aria-label="Pause and edit"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="3" height="10" rx="1" fill="currentColor"/>
              <rect x="10" y="3" width="3" height="10" rx="1" fill="currentColor"/>
            </svg>
            Pause & edit
          </button>
        ) : (
          <button
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className="btn-primary"
            style={{
              flexShrink: 0,
              padding: '0 var(--space-6)',
              opacity: (!value.trim() || disabled) ? 0.5 : 1,
            }}
            aria-label="Send message"
          >
            Send →
          </button>
        )}
      </div>
      <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', marginTop: '0.5rem', lineHeight: 1.5 }}>
        Responses are AI-generated and may contain mistakes — verify anything important directly with Ali. Conversations may be logged to improve this experience. Press Enter to send, Shift+Enter for a new line.
      </p>
    </div>
  )
}
