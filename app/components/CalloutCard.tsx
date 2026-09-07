interface CalloutCardProps {
  title: string
  body: string
  variant?: 'dark' | 'light'
  /** 'sm' is the compact uppercase label. 'md' is a larger sentence-case title for case study use. */
  titleSize?: 'sm' | 'md'
}

export default function CalloutCard({ title, body, variant = 'dark', titleSize = 'sm' }: CalloutCardProps) {
  const isDark = variant === 'dark'
  const isLargeTitle = titleSize === 'md'

  return (
    <div style={{
      padding: 'var(--space-4)',
      marginBottom: '1.25rem',
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
        fontSize: isLargeTitle ? 'var(--font-size-md)' : 'var(--font-size-xs)',
        ...(isLargeTitle ? {} : {
          letterSpacing: 'var(--letter-spacing-md)',
          textTransform: 'uppercase' as const,
        }),
        color: isDark ? 'var(--color-bg)' : 'var(--color-text)',
        fontWeight: 'var(--font-weight-semibold)' as any,
        marginBottom: isLargeTitle ? '0.5rem' : '0.35rem',
        lineHeight: isLargeTitle ? 1.35 : undefined,
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
