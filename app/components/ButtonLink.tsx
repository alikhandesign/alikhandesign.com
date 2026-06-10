import Link from 'next/link'

interface ButtonLinkProps {
  label: string
  href: string
  variant?: 'normal' | 'underline'
}

export default function ButtonLink({ label, href, variant = 'normal' }: ButtonLinkProps) {
  if (variant === 'underline') {
    return (
      <Link href={href} style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--bg)',
        textDecoration: 'none',
        fontSize: 'var(--text-base)',
        fontWeight: 500,
        borderBottom: '1px solid var(--accent)',
        paddingBottom: 2,
      }}>
        {label} →
      </Link>
    )
  }
  return (
    <Link href={href} style={{
      fontSize: 'var(--text-base)',
      color: 'var(--accent)',
      textDecoration: 'none',
      fontWeight: 500,
    }}>
      {label} →
    </Link>
  )
}
