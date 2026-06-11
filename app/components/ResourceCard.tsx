import Link from 'next/link'

interface ResourceCardProps {
  title: string
  description: string
  href: string
  external?: boolean
}

export default function ResourceCard({ title, description, href, external = false }: ResourceCardProps) {
  const linkProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Link
      href={href}
      {...linkProps}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-6)',
        padding: 'var(--space-6)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'border-color var(--transition-base)',
      }}
      className="work-card"
    >
      <div>
        <p style={{
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-semibold)' as any,
          color: 'var(--color-text)',
          marginBottom: '0.25rem',
        }}>
          {title}
        </p>
        <p style={{
          fontSize: 'var(--font-size-sm)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
        }}>
          {description}
        </p>
      </div>
      <span style={{
        color: 'var(--color-accent)',
        fontSize: 'var(--font-size-base)',
        flexShrink: 0,
      }}>
        →
      </span>
    </Link>
  )
}
