import { ReactNode } from 'react'

interface InlineAlertProps {
  variant: 'info' | 'warning' | 'error' | 'success' | 'neutral'
  title?: string
  children: ReactNode
  action?: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
}

const variantStyles = {
  info:    { bg: '#EFF6FF', border: '#BFDBFE', color: '#1E3A5F', accent: '#1D4ED8', leftBar: '#3B82F6' },
  warning: { bg: '#FFFBEB', border: '#FDE68A', color: '#451A03', accent: '#B45309', leftBar: '#F59E0B' },
  error:   { bg: 'var(--color-accent-bg)', border: '#FECACA', color: '#450A0A', accent: 'var(--color-accent)', leftBar: 'var(--color-accent)' },
  success: { bg: '#F0FDF4', border: '#BBF7D0', color: '#052E16', accent: '#15803D', leftBar: '#22C55E' },
  neutral: { bg: 'var(--color-surface-subtle)', border: 'var(--color-border)', color: 'var(--color-text)', accent: 'var(--color-text-muted)', leftBar: 'var(--color-border-mid)' },
}

export default function InlineAlert({ variant, title, children, action, secondaryAction }: InlineAlertProps) {
  const s = variantStyles[variant]
  return (
    <div style={{
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderLeft: `3px solid ${s.leftBar}`,
      borderRadius: `0 var(--radius) var(--radius) 0`,
      padding: 'var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
    }}>
      {title && (
        <p style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-weight-semibold)',
          letterSpacing: 'var(--letter-spacing-md)',
          textTransform: 'uppercase',
          color: s.accent,
          margin: 0,
        }}>{title}</p>
      )}
      <div style={{ fontSize: 'var(--text-sm)', color: s.color, lineHeight: 'var(--line-height-normal)' }}>
        {children}
      </div>
      {(action || secondaryAction) && (
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-1)', flexWrap: 'wrap' }}>
          {action && (
            <button onClick={action.onClick} style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-semibold)',
              color: s.accent,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              textDecoration: 'underline',
              textUnderlineOffset: 2,
            }}>{action.label}</button>
          )}
          {secondaryAction && (
            <button onClick={secondaryAction.onClick} style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-weight-medium)',
              color: s.color,
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              opacity: 0.7,
            }}>{secondaryAction.label}</button>
          )}
        </div>
      )}
    </div>
  )
}
