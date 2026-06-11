interface MetricDisplayProps {
  value: string
  label?: string
}

export default function MetricDisplay({ value, label }: MetricDisplayProps) {
  return (
    <div>
      <p className="font-serif" style={{
        fontSize: 'var(--text-4xl)',
        color: 'var(--color-accent)',
        lineHeight: 1,
        marginBottom: label ? '0.25rem' : 0,
      }}>
        {value}
      </p>
      {label && (
        <p style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--letter-spacing-md)',
          textTransform: 'uppercase',
          fontWeight: 500,
        }}>
          {label}
        </p>
      )}
    </div>
  )
}
