interface CaseStudyDetailsItem {
  label: string
  value: string
}

interface CaseStudyDetailsProps {
  items: CaseStudyDetailsItem[]
}

export default function CaseStudyDetails({ items }: CaseStudyDetailsProps) {
  return (
    <div className="details-bar">
      {items.map(item => (
        <div key={item.label}>
          <p style={{
            fontSize: 'var(--text-xs)',
            letterSpacing: 'var(--letter-spacing-md)',
            textTransform: 'uppercase' as const,
            color: 'var(--color-text-muted)',
            fontWeight: 500,
            marginBottom: 'var(--space-1)',
          }}>
            {item.label}
          </p>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text)',
            fontWeight: 500,
          }}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  )
}
