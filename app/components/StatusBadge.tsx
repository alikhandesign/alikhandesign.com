interface StatusBadgeProps {
  state: 'thinking' | 'streaming' | 'complete' | 'hung' | 'error' | 'warning' | 'info'
  label: string
  pulse?: boolean
}

const stateStyles: Record<StatusBadgeProps['state'], { bg: string; color: string; border: string }> = {
  thinking:  { bg: 'var(--color-surface-subtle)',  color: 'var(--color-text-muted)',  border: 'var(--color-border)' },
  streaming: { bg: '#EFF6FF',         color: '#1D4ED8',            border: '#BFDBFE' },
  complete:  { bg: '#F0FDF4',         color: '#15803D',            border: '#BBF7D0' },
  hung:      { bg: '#FFF7ED',         color: '#C2410C',            border: '#FED7AA' },
  error:     { bg: 'var(--color-accent-bg)', color: 'var(--color-accent)',     border: '#FECACA' },
  warning:   { bg: '#FFFBEB',         color: '#B45309',            border: '#FDE68A' },
  info:      { bg: '#EFF6FF',         color: '#1D4ED8',            border: '#BFDBFE' },
}

export default function StatusBadge({ state, label, pulse = false }: StatusBadgeProps) {
  const s = stateStyles[state]
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: '3px 10px',
      borderRadius: 'var(--radius-sm)',
      border: `1px solid ${s.border}`,
      background: s.bg,
      fontSize: 'var(--font-size-xs)',
      fontWeight: 'var(--font-weight-medium)',
      letterSpacing: 'var(--letter-spacing-md)',
      textTransform: 'uppercase',
      color: s.color,
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: s.color,
        flexShrink: 0,
        animation: pulse ? 'pulse 1.4s ease-in-out infinite' : 'none',
      }} />
      {label}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </span>
  )
}
