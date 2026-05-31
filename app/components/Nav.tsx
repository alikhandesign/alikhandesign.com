'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Nav() {
  const path = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)

  const getLinkStyle = (href: string, matchFn: (p: string) => boolean): React.CSSProperties => {
    const isActive = matchFn(path)
    const isHovered = hovered === href && !isActive
    return {
      textDecoration: 'none',
      color: isActive ? 'var(--text)' : isHovered ? 'var(--accent-dark)' : 'var(--text-muted)',
      fontWeight: isActive || isHovered ? 500 : 400,
      transition: 'color 0.15s',
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <nav className="site-nav" role="navigation" aria-label="Main navigation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" aria-label="Ali Khan Design — Home" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/logo.svg" alt="" width={48} height={56} priority aria-hidden="true" />
        </Link>
        <ul className="nav-links" style={{ display: 'flex', listStyle: 'none' }}>
          <li>
            <Link
              href="/work"
              style={getLinkStyle('/work', p => p.startsWith('/work'))}
              onMouseEnter={() => setHovered('/work')}
              onMouseLeave={() => setHovered(null)}
            >My Work</Link>
          </li>
          <li>
            <Link
              href="/about"
              style={getLinkStyle('/about', p => p === '/about')}
              onMouseEnter={() => setHovered('/about')}
              onMouseLeave={() => setHovered(null)}
            >About Me</Link>
          </li>
          <li>
            <a href="mailto:ali@alikhandesign.com" style={{ textDecoration: 'none', color: 'var(--accent)', fontWeight: 500 }}>Let's Talk</a>
          </li>
        </ul>
      </nav>
    </>
  )
}
