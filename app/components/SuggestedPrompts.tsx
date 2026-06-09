interface SuggestedPromptsProps {
  prompts: string[]
  onSelect: (prompt: string) => void
}

export default function SuggestedPrompts({ prompts, onSelect }: SuggestedPromptsProps) {
  return (
    <div style={{
      background: 'var(--bg-subtle, #F7F5F2)',
      borderRadius: 'var(--radius)',
      padding: 'var(--space-4)',
      marginBottom: 'var(--space-4)',
    }}>
      <p style={{
        fontSize: 'var(--text-xs)', fontWeight: 500, letterSpacing: '0.06em',
        textTransform: 'uppercase', color: 'var(--text-faint)',
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
              fontSize: 'var(--text-xs)',
              fontFamily: 'var(--font-sans)', fontWeight: 400,
              border: '1px solid var(--border)',
              borderRadius: '20px',
              background: 'var(--surface)', color: 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'border-color 0.15s, color 0.15s',
              textAlign: 'left',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--border-mid)'
              e.currentTarget.style.color = 'var(--text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}
