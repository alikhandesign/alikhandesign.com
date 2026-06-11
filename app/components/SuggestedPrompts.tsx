interface SuggestedPromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
}

export default function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div style={{
      background: 'var(--color-surface-subtle)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-4)',
      marginBottom: 'var(--space-4)',
    }}>
      <p style={{
        fontSize: 'var(--font-size-xs)', fontWeight: 500, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: 'var(--color-text-faint)',
        marginBottom: 'var(--space-3)',
      }}>
        Try asking
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {prompts.map(prompt => (
          <button
            key={prompt}
            onClick={() => onSelect(prompt)}
            style={{
              padding: '0.375rem 0.875rem',
              fontSize: 'var(--font-size-xs)',
              fontFamily: 'var(--font-sans)', fontWeight: 400,
              border: '1px solid var(--color-border)',
              borderRadius: '20px',
              background: 'var(--color-surface)', color: 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
              textAlign: 'left',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--color-border-mid)'
              e.currentTarget.style.color = 'var(--color-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.color = 'var(--color-text-muted)'
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
