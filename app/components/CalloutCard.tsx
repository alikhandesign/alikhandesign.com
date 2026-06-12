interface CalloutCardProps {
  title: string
  body: string
  variant?: 'dark' | 'light'
}

export default function CalloutCard({ title, body, variant = 'dark' }: CalloutCardProps) {
  const isDark = variant === 'dark'

  return (
    <div style={{
      padding: 'var(--space-4)',
      borderLeft: '3px solid var(--color-accent)',
      background: isDark ? 'var(--color-surface-dark)' : 'var(--color-surface)',
      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
      ...(isDark ? {} : {
        borderTop: '1px solid var(--color-border)',
        borderRight: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }),
    }}>
      <p style={{
        fontSize: 'var(--font-size-xs)',
        letterSpacing: 'var(--letter-spacing-md)',
        textTransform: 'uppercase' as const,
        color: isDark ? 'var(--color-bg)' : 'var(--color-text)',
        fontWeight: 'var(--font-weight-semibold)' as any,
        marginBottom: '0.35rem',
      }}>
        {title}
      </p>
      <p style={{
        fontSize: 'var(--font-size-sm)',
        color: isDark ? 'var(--color-text-on-dark)' : 'var(--color-text-mid)',
        lineHeight: 1.5,
      }}>
        {body}
      </p>
    </div>
  )
}
