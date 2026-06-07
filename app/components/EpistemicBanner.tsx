interface EpistemicBannerProps {
  type: 'knowledge-gap' | 'principled-limit' | 'probabilistic'
  message: string
  actionLabel?: string
  onAction?: () => void
}

const bannerConfig = {
  'knowledge-gap': {
    label: 'Data gap',
    bg: '#FFFBEB',
    border: '#FDE68A',
    barColor: '#F59E0B',
    color: '#451A03',
    accentColor: '#B45309',
  },
  'principled-limit': {
    label: 'Restricted',
    bg: 'var(--accent-bg)',
    border: '#FECACA',
    barColor: 'var(--accent)',
    color: '#450A0A',
    accentColor: 'var(--accent)',
  },
  'probabilistic': {
    label: 'Contains probabilistic claims',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    barColor: '#3B82F6',
    color: '#1E3A5F',
    accentColor: '#1D4ED8',
  },
}

export default function EpistemicBanner({ type, message, actionLabel, onAction }: EpistemicBannerProps) {
  const c = bannerConfig[type]
  return (
    <div style={{
      borderTop: `4px solid ${c.barColor}`,
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 'var(--radius)',
      padding: 'var(--space-3) var(--space-4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-4)',
      flexWrap: 'wrap',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: 'var(--letter-spacing-md)',
          textTransform: 'uppercase',
          color: c.accentColor,
          whiteSpace: 'nowrap',
        }}>{c.label}</span>
        <span style={{
          width: 1,
          height: 12,
          background: c.border,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: 'var(--text-sm)',
          color: c.color,
          lineHeight: 'var(--line-height-normal)',
        }}>{message}</span>
      </div>
      {actionLabel && onAction && (
        <button onClick={onAction} style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-weight-semibold)',
          color: c.accentColor,
          background: 'none',
          border: `1px solid ${c.border}`,
          borderRadius: 'var(--radius)',
          padding: '4px var(--space-3)',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          whiteSpace: 'nowrap',
          transition: 'background var(--transition-base)',
        }}>{actionLabel}</button>
      )}
    </div>
  )
}
