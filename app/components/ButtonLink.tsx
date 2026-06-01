import Link from 'next/link'

interface ButtonLinkProps {
  label: string
  href: string
  variant?: 'primary' | 'text'
}

export default function ButtonLink({ label, href, variant = 'text' }: ButtonLinkProps) {
  if (variant === 'primary') {
    return (
      <Link href={href} className="btn-primary">
        {label} <span aria-hidden="true">→</span>
      </Link>
    )
  }
  return (
    <Link href={href} style={{ fontSize: 14, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
      {label} →
    </Link>
  )
}
