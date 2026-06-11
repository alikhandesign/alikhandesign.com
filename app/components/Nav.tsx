'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'
import ContactModal from './ContactModal'

export default function Nav() {
  const path = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const getLinkStyle = (href: string, matchFn: (p: string) => boolean): React.CSSProperties => {
    const isActive = matchFn(path)
    const isHovered = hovered === href && !isActive
    return {
      textDecoration: 'none',
      color: isActive ? 'var(--color-text)' : isHovered ? 'var(--color-accent-dark)' : 'var(--color-text-muted)',
      fontWeight: isActive || isHovered ? 500 : 400,
      transition: 'color 0.15s',
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-nav">Skip to main content</a>
      <nav className="site-nav" role="navigation" aria-label="Main navigation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" aria-label="Ali Khan Design — Home" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/logo.svg" alt="" width={48} height={56} priority aria-hidden="true" />
        </Link>
        <ul className="nav-links" style={{ display: 'flex', listStyle: 'none' }}>
          <li>
            <Link href="/work" style={getLinkStyle('/work', p => p.startsWith('/work'))}
              onMouseEnter={() => setHovered('/work')} onMouseLeave={() => setHovered(null)}>My Work</Link>
          </li>
          <li>
            <Link href="/about" style={getLinkStyle('/about', p => p === '/about')}
              onMouseEnter={() => setHovered('/about')} onMouseLeave={() => setHovered(null)}>About Me</Link>
          </li>
          <li>
            <button
              ref={triggerRef}
              onClick={() => setModalOpen(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-accent)', fontWeight: 500, fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-sm)', letterSpacing: 'var(--letter-spacing-sm)', padding: 0 }}
            >Let's Talk</button>
          </li>
        </ul>
      </nav>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} triggerRef={triggerRef} />
    </>
  )
}
