interface MetricDisplayProps {
  value: string
  label?: string
  labelCase?: 'upper' | 'sentence'
}

export default function MetricDisplay({
  value,
  label,
  labelCase = 'sentence',
}: MetricDisplayProps) {
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
          letterSpacing: labelCase === 'upper' ? 'var(--letter-spacing-md)' : 'normal',
          textTransform: labelCase === 'upper' ? 'uppercase' : 'none',
          fontWeight: 500,
        }}>
          {label}
        </p>
      )}
    </div>
  )
}
