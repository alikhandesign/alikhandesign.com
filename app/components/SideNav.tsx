'use client'
import { useEffect, useState } from 'react'

interface SideNavProps {
  sections: string[]
}

export default function SideNav({ sections }: SideNavProps) {
  const [active, setActive] = useState(sections[0])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-20% 0px -70% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [sections])

  const formatLabel = (id: string) =>
    id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  return (
    <aside className="side-nav" style={{ position: 'sticky', top: '5rem' }}>
      <p style={{
        fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--text-muted)', fontWeight: 500, marginBottom: '1rem'
      }}>Contents</p>
      <ul style={{ listStyle: 'none' }}>
        {sections.map(id => (
          <li key={id}>
            <a
              href={`#${id}`}
              style={{
                fontSize: 13,
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
