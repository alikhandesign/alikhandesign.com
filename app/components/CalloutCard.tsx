interface CalloutCardProps {
  title: string
  body: string
}

export default function CalloutCard({ title, body }: CalloutCardProps) {
  return (
    <div style={{
      padding: 'var(--space-4)',
      borderLeft: '3px solid var(--accent)',
      background: 'var(--dark-surface)',
      borderRadius: '0 var(--radius) var(--radius) 0',
    }}>
      <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' as const, color: 'var(--bg)', fontWeight: 'var(--font-weight-semibold)' as any, marginBottom: '0.35rem' }}>{title}</p>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--warm-300, #C4BDB7)', lineHeight: 1.5 }}>{body}</p>
    </div>
  )
}
