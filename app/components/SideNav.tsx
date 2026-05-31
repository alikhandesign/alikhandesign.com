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

  const formatLabel = (id: string) =>
    id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const getLinkStyle = (id: string): React.CSSProperties => {
    const isActive = active === id
    const isHovered = hovered === id && !isActive
    return {
      fontSize: 14,
      color: isActive ? 'var(--accent)' : isHovered ? 'var(--text-mid)' : 'var(--text-muted)',
      fontWeight: isActive || isHovered ? 500 : 400,
      textDecoration: 'none',
      display: 'block',
      padding: '0.5rem 0 0.5rem 0.75rem',
      borderLeft: `2px solid ${isActive ? 'var(--accent)' : isHovered ? 'var(--border-mid)' : 'var(--border)'}`,
      lineHeight: 1.4,
      transition: 'color 0.15s, border-color 0.15s',
    }
  }

  return (
    <aside style={{ position: 'sticky', top: '5rem' }}>
      <p style={{
        fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
        color: 'var(--text-muted)', fontWeight: 500, marginBottom: '1rem'
      }}>Contents</p>
      <ul style={{ listStyle: 'none' }}>
        {sections.map(id => (
          <li key={id}>
            <a
              href={`#${id}`}
              style={getLinkStyle(id)}
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
