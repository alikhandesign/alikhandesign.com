'use client'

import type { SiteSource } from '@/lib/sources'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  sources?: SiteSource[]
  activeSourceId?: number | null
  onBadgeClick?: (id: number) => void
}

function parseContent(content: string): Array<{ type: 'text'; value: string } | { type: 'cite'; id: number }> {
  const parts: Array<{ type: 'text'; value: string } | { type: 'cite'; id: number }> = []
  const regex = /\[(\d+)\]/g
  let last = 0
  let match

  while ((match = regex.exec(content)) !== null) {
    if (match.index > last) {
      parts.push({ type: 'text', value: content.slice(last, match.index) })
    }
    parts.push({ type: 'cite', id: parseInt(match[1]) })
    last = match.index + match[0].length
  }

  if (last < content.length) {
    parts.push({ type: 'text', value: content.slice(last) })
  }

  return parts
}

export default function ChatBubble({ role, content, sources = [], activeSourceId, onBadgeClick }: ChatBubbleProps) {
  const parts = role === 'assistant' ? parseContent(content) : null

  return (
    <div style={{
      display: 'flex',
      justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        maxWidth: '80%',
        padding: '0.75rem 1rem',
        borderRadius: role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        fontSize: 'var(--color-text-base)',
        lineHeight: 1.7,
        background: role === 'user' ? 'var(--color-text)' : 'var(--color-surface)',
        color: role === 'user' ? 'var(--color-bg)' : 'var(--color-text)',
        border: role === 'assistant' ? '1px solid var(--color-border)' : 'none',
        whiteSpace: 'pre-wrap',
      }}>
        {parts ? parts.map((part, i) => {
          if (part.type === 'text') return <span key={i}>{part.value}</span>
          const isKnown = sources.some(s => s.id === part.id)
          if (!isKnown) return null
          const isActive = activeSourceId === part.id
          return (
            <button
              key={i}
              onClick={() => onBadgeClick?.(part.id)}
              aria-label={`Open source ${part.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, borderRadius: '50%',
                background: isActive ? 'var(--color-accent)' : 'var(--color-text-mid)',
                color: '#fff', fontSize: 10, fontWeight: 700,
                border: 'none', cursor: 'pointer',
                marginLeft: 2, marginRight: 1,
                verticalAlign: 'middle',
                transition: 'background var(--transition-base)',
                fontFamily: 'var(--font-sans)',
                flexShrink: 0,
              }}
            >
              {part.id}
            </button>
          )
        }) : content}
      </div>
    </div>
  )
}
