interface CaseStudyDetailsItem {
  label: string
  value: string
}

interface CaseStudyDetailsProps {
  items: CaseStudyDetailsItem[]
}

export default function CaseStudyDetails({ items }: CaseStudyDetailsProps) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius)',
      padding: 'var(--space-8)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8)',
      margin: '0 3rem 3rem',
    }}>
      {items.map(item => (
        <div key={item.label}>
          <p style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--letter-spacing-lg)',
            textTransform: 'uppercase' as const,
            color: 'var(--color-text-muted)',
            fontWeight: 500,
            marginBottom: 'var(--space-2)',
          }}>
            {item.label}
          </p>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text)',
            fontWeight: 500,
            lineHeight: 1.5,
          }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}
