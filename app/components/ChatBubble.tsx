'use client'

import { useState } from 'react'
import type { SiteSource } from '@/lib/sources'
import SourceInspector from './SourceInspector'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  sources?: SiteSource[]
}

// Parse content into text segments and citation markers
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

export default function ChatBubble({ role, content, sources = [] }: ChatBubbleProps) {
  const [activeSourceId, setActiveSourceId] = useState<number | null>(null)
  const [inspectorOpen, setInspectorOpen] = useState(false)

  const handleBadgeClick = (id: number) => {
    if (inspectorOpen && activeSourceId === id) {
      setInspectorOpen(false)
    } else {
      setActiveSourceId(id)
      setInspectorOpen(true)
    }
  }

  const parts = role === 'assistant' ? parseContent(content) : null

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: role === 'user' ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        maxWidth: '72%',
        padding: '0.75rem 1rem',
        borderRadius: role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        fontSize: 'var(--text-base)',
        lineHeight: 1.7,
        background: role === 'user' ? 'var(--text)' : 'var(--surface)',
        color: role === 'user' ? 'var(--bg)' : 'var(--text)',
        border: role === 'assistant' ? '1px solid var(--border)' : 'none',
        whiteSpace: 'pre-wrap',
      }}>
        {parts ? parts.map((part, i) => {
          if (part.type === 'text') return <span key={i}>{part.value}</span>
          const isKnown = sources.some(s => s.id === part.id)
          if (!isKnown) return null
          const isActive = inspectorOpen && activeSourceId === part.id
          return (
            <button
              key={i}
              onClick={() => handleBadgeClick(part.id)}
              aria-label={`Open source ${part.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, borderRadius: '50%',
                background: isActive ? 'var(--accent)' : 'var(--text-mid)',
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

      {/* Source inspector — only for assistant bubbles with sources */}
      {role === 'assistant' && inspectorOpen && sources.length > 0 && (
        <div style={{ maxWidth: '72%', width: '100%' }}>
          <SourceInspector
            sources={sources}
            activeId={activeSourceId}
            onClose={() => setInspectorOpen(false)}
            onSelect={setActiveSourceId}
          />
        </div>
      )}
    </div>
  )
}
