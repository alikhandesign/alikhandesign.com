interface PatternAnnotationProps {
  finding: string
}

export default function PatternAnnotation({ finding }: PatternAnnotationProps) {
  return (
    <div style={{
      marginBottom: 'var(--space-6)',
      paddingBottom: 'var(--space-6)',
      borderBottom: '1px solid var(--border)',
    }}>
      <p className="eyebrow" style={{ marginBottom: 'var(--space-2)' }}>
        Audit finding
      </p>
      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-muted)',
        lineHeight: 'var(--line-height-normal)',
        maxWidth: 640,
      }}>
        {finding}
      </p>
    </div>
  )
}
