interface StatCardProps {
  value: string
  label: string
}

export default function StatCard({ value, label }: StatCardProps) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      padding: '1.25rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: 'var(--color-accent)',
      }} />
      <div className="font-serif" style={{
        fontSize: 'var(--font-size-3xl)',
        color: 'var(--color-accent)',
        lineHeight: 1,
        marginBottom: '0.35rem',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-text-muted)',
        lineHeight: 1.4,
      }}>
        {label}
      </div>
    </div>
  )
}
