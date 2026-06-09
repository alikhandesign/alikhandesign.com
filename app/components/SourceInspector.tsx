'use client'

import Link from 'next/link'
import type { SiteSource } from '@/lib/sources'

interface SourceInspectorProps {
  sources: SiteSource[]
  activeId: number | null
  onClose: () => void
  onSelect: (id: number) => void
}

export default function SourceInspector({ sources, activeId, onClose, onSelect }: SourceInspectorProps) {
  if (sources.length === 0) return null

  const activeSource = sources.find(s => s.id === activeId) ?? sources[0]

  return (
    <div style={{
      marginTop: 'var(--space-3)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      background: 'var(--warm-75, #F2EFE9)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: 'var(--space-3) var(--space-4)',
        borderBottom: '1px solid var(--border)',
      }}>
        <p style={{
          fontSize: 'var(--text-xs)', fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: 'var(--text-muted)',
        }}>
          Source inspector
        </p>
        <button
          onClick={onClose}
          aria-label="Close source inspector"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', padding: 4,
            display: 'flex', alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Source list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, padding: 'var(--space-3)', background: 'var(--warm-75, #F2EFE9)' }}>
        {sources.map(source => {
          const isActive = source.id === activeSource.id
          return (
            <button
              key={source.id}
              onClick={() => onSelect(source.id)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                background: isActive ? 'var(--surface)' : 'transparent',
                border: `1px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                borderRadius: 'var(--radius)',
                cursor: 'pointer', textAlign: 'left', width: '100%',
                fontFamily: 'var(--font-sans)',
                transition: 'all var(--transition-base)',
              }}
            >
              {/* Badge */}
              <span style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                background: isActive ? 'var(--accent)' : 'var(--text-mid)',
                color: '#fff', fontSize: 10, fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background var(--transition-base)',
              }}>
                {source.id}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 'var(--text-xs)', fontWeight: 600,
                  color: 'var(--text)', marginBottom: 2,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {source.title}
                </p>
                <p style={{
                  fontSize: 'var(--text-xs)', color: 'var(--text-muted)',
                  lineHeight: 1.5,
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {source.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active source detail */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: 'var(--space-4)',
        background: 'var(--surface)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)',
      }}>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', lineHeight: 1.5, flex: 1 }}>
          {activeSource.description}
        </p>
        <Link
          href={activeSource.url}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 'var(--text-xs)', fontWeight: 500,
            color: 'var(--accent)', textDecoration: 'none',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}
        >
          Read more →
        </Link>
      </div>
    </div>
  )
}
