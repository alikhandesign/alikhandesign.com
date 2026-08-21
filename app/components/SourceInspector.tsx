'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import type { SiteSource } from '@/lib/sources'

interface SourceInspectorProps {
  sources: SiteSource[]
  activeId: number | null
  onClose: () => void
  onSelect: (id: number) => void
}

const SourceInspector = forwardRef<HTMLButtonElement, SourceInspectorProps>(
  function SourceInspector({ sources, activeId, onClose, onSelect }, closeButtonRef) {
    if (sources.length === 0) return null

    const activeSource = sources.find(s => s.id === activeId) ?? null

    return (
      <div
        role="region"
        aria-label="Sources"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: 'var(--color-surface)',
          borderLeft: '1px solid var(--color-border)',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: 'var(--space-3) var(--space-4)',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}>
          <p style={{
            fontSize: 'var(--font-size-xs)', fontWeight: 500,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'var(--color-text-muted)', margin: 0,
          }}>
            Sources
          </p>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Close source inspector"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--color-text-muted)', padding: 4,
              display: 'flex', alignItems: 'center', borderRadius: 2,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Source list — scrollable */}
      <div style={{
        flex: 1, overflowY: 'auto',
        padding: 'var(--space-3)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
      }}>
        {sources.map(source => {
          const isActive = source.id === activeId
          return (
            <div key={source.id}>
              {/* Source card */}
              <button
                onClick={() => onSelect(isActive && activeId === source.id ? -1 : source.id)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)',
                  padding: 'var(--space-3)',
                  width: '100%', textAlign: 'left',
                  background: isActive ? 'var(--color-accent-bg)' : 'var(--color-surface)',
                  border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: isActive ? 'var(--radius-sm) var(--radius-sm) 0 0' : 'var(--radius-sm)',
                  borderBottom: isActive ? 'none' : `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  transition: 'all var(--transition-base)',
                }}
              >
                <span style={{
                  width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                  background: isActive ? 'var(--color-accent)' : 'var(--color-text-mid)',
                  color: '#fff', fontSize: 'var(--font-size-badge)', fontWeight: 700,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background var(--transition-base)',
                  marginTop: 1,
                }}>
                  {source.id}
                </span>
                <p style={{
                  fontSize: 'var(--font-size-xs)', fontWeight: 600,
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text)',
                  margin: 0, lineHeight: 1.4,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  flex: 1, minWidth: 0,
                }}>
                  {source.title}
                </p>
              </button>

              {/* Drawer — connected flush below card */}
              {isActive && (
                <div style={{
                  padding: 'var(--space-3)',
                  background: 'var(--color-accent-bg)',
                  border: '1px solid var(--color-accent)',
                  borderTop: 'none',
                  borderRadius: '0 0 var(--radius-sm) var(--radius-sm)',
                }}>
                  <p style={{
                    fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)',
                    lineHeight: 1.6, margin: '0 0 var(--space-3) 0',
                  }}>
                    {source.description}
                  </p>
                  <Link
                    href={source.url}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontSize: 'var(--font-size-xs)', fontWeight: 500,
                      color: 'var(--color-accent)', textDecoration: 'none',
                    }}
                  >
                    Read more →
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
    )
  }
)

export default SourceInspector
