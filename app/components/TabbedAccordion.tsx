'use client'
import { useState, useRef, useEffect, useId } from 'react'

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

interface TabbedAccordionProps {
  domains: TaxonomyDomain[]
  footer?: string
}

export default function TabbedAccordion({ domains, footer }: TabbedAccordionProps) {
  const [activeDomain, setActiveDomain] = useState(domains[0]?.id ?? '')
  const [expandedChild, setExpandedChild] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const uid = useId()

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Reset expanded child when domain changes
  const handleDomainChange = (id: string) => {
    setActiveDomain(id)
    setExpandedChild(null)
  }

  // Keyboard navigation for tabs
  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % domains.length
    if (e.key === 'ArrowLeft') nextIndex = (index - 1 + domains.length) % domains.length
    if (e.key === 'Home') nextIndex = 0
    if (e.key === 'End') nextIndex = domains.length - 1
    if (nextIndex !== null) {
      e.preventDefault()
      handleDomainChange(domains[nextIndex].id)
      tabRefs.current[nextIndex]?.focus()
    }
  }

  const domain = domains.find(d => d.id === activeDomain) ?? domains[0]
  const tabPanelId = `${uid}-panel`

  return (
    <div style={{ margin: '2rem 0' }}>

      {/* Mobile: native select */}
      {isMobile && (
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor={`${uid}-select`}
            style={{
              display: 'block',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-muted)',
              fontWeight: 500,
              marginBottom: '0.4rem',
            }}
          >
            Select domain
          </label>
          <select
            id={`${uid}-select`}
            value={activeDomain}
            onChange={e => handleDomainChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.6rem 0.75rem',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text)',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-sans)',
              appearance: 'auto',
            }}
          >
            {domains.map(d => (
              <option key={d.id} value={d.id}>
                {d.label} ({d.children.length})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Desktop: tab bar */}
      {!isMobile && (
        <div
          role="tablist"
          aria-label="Feedback taxonomy domains"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0,
            borderBottom: '1px solid var(--color-border)',
            marginBottom: '1.5rem',
          }}
        >
          {domains.map((d, index) => {
            const isActive = d.id === activeDomain
            return (
              <button
                key={d.id}
                ref={el => { tabRefs.current[index] = el }}
                role="tab"
                aria-selected={isActive}
                aria-controls={tabPanelId}
                id={`${uid}-tab-${d.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleDomainChange(d.id)}
                onKeyDown={e => handleTabKeyDown(e, index)}
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
                  transition: 'color 0.15s',
                  outline: 'none',
                }}
                onFocus={e => {
                  e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-accent)'
                }}
                onBlur={e => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {d.label}
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '1px 5px',
                    borderRadius: 3,
                    background: isActive ? 'var(--color-accent-bg)' : 'var(--color-border)',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  }}
                >
                  {d.children.length}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Tab panel */}
      <div
        id={tabPanelId}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${domain.id}`}
        tabIndex={0}
        style={{ outline: 'none' }}
      >
        {/* Domain description */}
        <p style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-muted)',
          marginBottom: '1rem',
          lineHeight: 1.6,
        }}>
          {domain.desc}
        </p>

        {/* Accordion rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {domain.children.map((child, i) => {
            const isExpanded = expandedChild === child.label
            const childId = `${uid}-child-${i}`
            const childPanelId = `${uid}-child-panel-${i}`

            return (
              <div
                key={child.label}
                style={{
                  border: `1px solid ${isExpanded ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--color-surface)',
                  overflow: 'hidden',
                  transition: 'border-color 0.15s',
                }}
              >
                <button
                  id={childId}
                  aria-expanded={isExpanded}
                  aria-controls={childPanelId}
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
                    textAlign: 'left' as const,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
                    <span style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 500,
                      color: 'var(--color-text)',
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
                  <span
                    aria-hidden="true"
                    style={{
                      fontSize: 12,
                      color: 'var(--color-text-muted)',
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  >
                    ↓
                  </span>
                </button>

                <div
                  id={childPanelId}
                  role="region"
                  aria-labelledby={childId}
                  hidden={!isExpanded}
                  style={{
                    padding: isExpanded ? '0.75rem 1rem 1rem' : 0,
                    borderTop: isExpanded ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-mid)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {child.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Optional footer */}
      {footer && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '0.875rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          <p style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-faint)',
            margin: 0,
          }}>
            {footer}
          </p>
        </div>
      )}
    </div>
  )
}
