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
      borderRadius: '0 4px 4px 0',
    }}>
      <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--bg)', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
      <p style={{ fontSize: 14, color: '#C4BDB7', lineHeight: 1.5 }}>{body}</p>
    </div>
  )
}
