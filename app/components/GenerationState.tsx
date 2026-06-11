export type GenerationPhase = 'thinking' | 'generating' | 'complete' | 'stalled' | 'error'

interface GenerationStateProps {
  phase: GenerationPhase
}

const PHASE_CONFIG: Record<GenerationPhase, { color: string; label: string }> = {
  thinking:   { color: 'var(--color-warning, #92600A)',  label: 'Thinking'   },
  generating: { color: 'var(--color-success, #4A6130)',  label: 'Generating' },
  complete:   { color: 'var(--color-success, #4A6130)',  label: 'Complete'   },
  stalled:    { color: 'var(--color-warning, #92600A)',  label: 'Stalled'    },
  error:      { color: 'var(--accent, #C0392B)',         label: 'Error'      },
}

export default function GenerationState({ phase }: GenerationStateProps) {
  const config = PHASE_CONFIG[phase]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0.75rem 1rem' }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: config.color,
        display: 'block',
        animation: phase === 'complete' || phase === 'error' ? 'none' : 'gen-pulse 1.6s ease-in-out infinite',
        flexShrink: 0,
        opacity: phase === 'complete' || phase === 'error' ? 1 : undefined,
      }} />
      <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
        {config.label}
      </span>
      <style>{`
        @keyframes gen-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.25); }
        }
      `}</style>
    </div>
  )
}
