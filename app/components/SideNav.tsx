'use client'
import { useEffect, useState } from 'react'

interface SideNavProps {
  sections: string[]
  unlocked?: boolean
}

export default function SideNav({ sections, unlocked = true }: SideNavProps) {
  const [active, setActive] = useState(sections[0])
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const setup = () => {
      sections.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        const observer = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) setActive(id) },
          { rootMargin: '-10% 0px -80% 0px' }
        )
        observer.observe(el)
        observers.push(observer)
      })
    }
    const timer = setTimeout(setup, 100)
    return () => {
      clearTimeout(timer)
      observers.forEach(o => o.disconnect())
    }
  }, [sections, unlocked])

  const ACRONYMS = new Set(['ai', 'ui', 'ux'])
  const formatLabel = (id: string) =>
    id.split('-').map(w => ACRONYMS.has(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const getLinkStyle = (id: string): React.CSSProperties => {
    const isActive = active === id
    const isHovered = hovered === id && !isActive
    return {
      fontSize: 'var(--font-size-sm)',
      color: isActive ? 'var(--color-accent)' : isHovered ? 'var(--color-text-mid)' : 'var(--color-text-muted)',
      fontWeight: isActive || isHovered ? 500 : 400,
      textDecoration: 'none',
      display: 'block',
      padding: 'var(--space-2) 0 var(--space-2) var(--space-3)',
      borderLeft: `2px solid ${isActive ? 'var(--color-accent)' : isHovered ? 'var(--color-border-mid)' : 'var(--color-border)'}`,
      lineHeight: 1.4,
      transition: 'color var(--transition-base), border-color var(--transition-base)',
    }
  }

  return (
    <aside style={{ position: 'sticky', top: '5rem' }}>
      <p style={{
        fontSize: 'var(--font-size-xs)',
        letterSpacing: 'var(--letter-spacing-lg)',
        textTransform: 'uppercase' as const,
        color: 'var(--color-text-muted)',
        fontWeight: 500,
        marginBottom: 'var(--space-4)'
      }}>Contents</p>
      <ul style={{ listStyle: 'none' }}>
        {sections.map(id => (
          <li key={id}>
            <a
              href={`#${id}`}
              style={getLinkStyle(id)}
              aria-current={active === id ? 'true' : undefined}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              {formatLabel(id)}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
