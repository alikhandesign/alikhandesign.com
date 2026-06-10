'use client'
import { useState } from 'react'

interface Tab {
  id: string
  label: string
}

interface TabNavigationProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
  variant?: 'top' | 'side'
}

export default function TabNavigation({
  tabs, activeTab, onTabChange, variant = 'top'
}: TabNavigationProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  if (variant === 'side') {
    return (
      <nav aria-label="Tab navigation">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tabs.map(tab => {
            const isActive = activeTab === tab.id
            const isHovered = hovered === tab.id && !isActive
            return (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  onMouseEnter={() => setHovered(tab.id)}
                  onMouseLeave={() => setHovered(null)}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: 'var(--space-2) 0 var(--space-2) var(--space-3)',
                    fontSize: 'var(--color-text-base)',
                    fontFamily: 'var(--font-sans)',
                    fontWeight: isActive || isHovered ? 500 : 400,
                    color: isActive ? 'var(--color-accent)' : isHovered ? 'var(--color-text-mid)' : 'var(--color-text-muted)',
                    background: 'none',
                    border: 'none',
                    borderLeft: `2px solid ${isActive ? 'var(--color-accent)' : isHovered ? 'var(--color-border-mid)' : 'var(--color-border)'}`,
                    cursor: 'pointer',
                    lineHeight: 1.4,
                    transition: 'color var(--transition-base), border-color var(--transition-base)',
                  }}
                >
                  {tab.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }

  // top variant
  return (
    <nav
      aria-label="Tab navigation"
      style={{
        borderBottom: '1px solid var(--color-border)',
        padding: '0 var(--space-12)',
        display: 'flex',
        gap: 0,
      }}
    >
      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        const isHovered = hovered === tab.id && !isActive
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            onMouseEnter={() => setHovered(tab.id)}
            onMouseLeave={() => setHovered(null)}
            aria-current={isActive ? 'true' : undefined}
            style={{
              padding: 'var(--space-4) var(--space-5)',
              fontSize: 'var(--color-text-sm)',
              fontFamily: 'var(--font-sans)',
              fontWeight: isActive ? 'var(--font-weight-semibold)' : isHovered ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
              color: isActive ? 'var(--color-accent)' : isHovered ? 'var(--color-text-mid)' : 'var(--color-text-muted)',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${isActive ? 'var(--color-accent)' : 'transparent'}`,
              cursor: 'pointer',
              marginBottom: -1,
              whiteSpace: 'nowrap',
              transition: 'color var(--transition-base), border-color var(--transition-base)',
            }}
          >
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
