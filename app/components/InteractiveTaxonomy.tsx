'use client'
import { useState } from 'react'

export interface TaxonomyChild {
  label: string
  description: string
  meta?: string
}

export interface TaxonomyDomain {
  id: string
  label: string
  desc: string
  children: TaxonomyChild[]
}

interface InteractiveTaxonomyProps {
  domains: TaxonomyDomain[]
  footer?: string
}

export default function InteractiveTaxonomy({ domains, footer }: InteractiveTaxonomyProps) {
  const [activeDomain, setActiveDomain] = useState(domains[0]?.id ?? '')
  const [expandedChild, setExpandedChild] = useState<string | null>(null)

  const domain = domains.find(d => d.id === activeDomain)!

  return (
    <div style={{ margin: '2rem 0' }}>
      {/* Domain tabs */}
      <div style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid var(--color-border)',
        marginBottom: '1.5rem',
        overflowX: 'auto',
      }}>
        {domains.map(d => {
          const isActive = d.id === activeDomain
          return (
            <button
              key={d.id}
              onClick={() => { setActiveDomain(d.id); setExpandedChild(null) }}
              style={{
                padding: '0.625rem 1rem',
                fontSize: 'var(--font-size-xs)',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                background: 'transparent',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--color-accent)' : '2px solid transparent',
                marginBottom: -1,
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                whiteSpace: 'nowrap' as const,
                transition: 'color 0.15s',
              }}
            >
              {d.label}
              <span style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '1px 5px',
                borderRadius: 3,
                background: isActive ? 'var(--color-accent-bg)' : 'var(--color-surface-subtle, var(--color-border))',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
              }}>
                {d.children.length}
              </span>
            </button>
          )
        })}
      </div>

      {/* Domain description */}
      <p style={{
        fontSize: 'var(--font-size-sm)',
        color: 'var(--color-text-muted)',
        marginBottom: '1rem',
        lineHeight: 1.6,
      }}>
        {domain.desc}
      </p>

      {/* Children list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {domain.children.map(child => {
          const isExpanded = expandedChild === child.label
          return (
            <div
              key={child.label}
              style={{
                border: `1px solid ${isExpanded ? 'var(--color-border-mid, var(--color-border))' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-surface)',
                overflow: 'hidden',
                transition: 'border-color 0.15s',
              }}
            >
              <button
                onClick={() => setExpandedChild(isExpanded ? null : child.label)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                    textAlign: 'left' as const,
                  }}>
                    {child.label}
                  </span>
                  {child.meta && (
                    <span style={{
                      fontSize: 10,
                      color: 'var(--color-text-faint)',
                      flexShrink: 0,
                    }}>
                      {child.meta}
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: 12,
                  color: 'var(--color-text-muted)',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  flexShrink: 0,
                }}>
                  ↓
                </span>
              </button>

              {isExpanded && (
                <div style={{
                  padding: '0.75rem 1rem 1rem',
                  borderTop: '1px solid var(--color-border)',
                }}>
                  <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-mid)',
                    lineHeight: 1.7,
                  }}>
                    {child.description}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Optional footer */}
      {footer && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '0.875rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)' }}>
            {footer}
          </p>
        </div>
      )}
    </div>
  )
}
