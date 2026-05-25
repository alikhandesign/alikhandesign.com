'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const path = usePathname()

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.25rem 3rem',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <Link href="/" aria-label="Ali Khan Design — Home" style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/images/logo.svg" alt="Ali Khan" width={52} height={60} priority />
      </Link>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none' }}>
        <li>
          <Link href="/work" style={{
            textDecoration: 'none',
            color: path.startsWith('/work') ? 'var(--text)' : 'var(--text-muted)',
            fontWeight: path.startsWith('/work') ? 500 : 400,
            fontSize: 14,
            letterSpacing: '0.02em',
            transition: 'color 0.2s',
          }}>My Work</Link>
        </li>
        <li>
          <Link href="/about" style={{
            textDecoration: 'none',
            color: path === '/about' ? 'var(--text)' : 'var(--text-muted)',
            fontWeight: path === '/about' ? 500 : 400,
            fontSize: 14,
            letterSpacing: '0.02em',
            transition: 'color 0.2s',
          }}>About Me</Link>
        </li>
        <li>
          <a href="mailto:ali@alikhandesign.com" style={{
            textDecoration: 'none',
            color: 'var(--accent)',
            fontWeight: 500,
            fontSize: 14,
            letterSpacing: '0.02em',
          }}>Let's Talk</a>
        </li>
      </ul>
    </nav>
  )
}
