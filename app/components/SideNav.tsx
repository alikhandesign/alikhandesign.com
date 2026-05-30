'use client'
import { useEffect, useState } from 'react'

interface SideNavProps {
  sections: string[]
  unlocked?: boolean
}

export default function SideNav({ sections, unlocked = true }: SideNavProps) {
  const [active, setActive] = useState(sections[0])

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

    // Small delay to let DOM settle after password unlock
    const timer = setTimeout(setup, 100)
    return () => {
      clearTimeout(timer)
      observers.forEach(o => o.disconnect())
    }
  }, [sections, unlocked])

  const formatLabel = (id: string) =>
    id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <aside style={{
      position: 'sticky',
      top: '5rem',
      // Hide on mobile via inline style — CSS class handles it too
    }}>
      <p style={{
        fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const,
        color: 'var(--text-muted)', fontWeight: 500, marginBottom: '1rem'
      }}>Contents</p>
      <ul style={{ listStyle: 'none' }}>
        {sections.map(id => (
          <li key={id}>
            <a
              href={`#${id}`}
              style={{
                fontSize: 14,
                color: active === id ? 'var(--accent)' : 'var(--text-muted)',
                fontWeight: active === id ? 500 : 400,
                textDecoration: 'none',
                display: 'block',
                padding: '0.5rem 0 0.5rem 0.75rem',
                borderLeft: `2px solid ${active === id ? 'var(--accent)' : 'var(--border)'}`,
                lineHeight: 1.4,
                transition: 'color 0.2s, border-color 0.2s',
              }}
            >
              {formatLabel(id)}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
