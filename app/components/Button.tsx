'use client'
import React from 'react'

interface ButtonProps {
  label: string
  onClick?: () => void
  fullWidth?: boolean
  type?: 'button' | 'submit'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  arrow?: boolean
}

export default function Button({
  label,
  onClick,
  fullWidth = false,
  type = 'button',
  variant = 'primary',
  disabled = false,
  arrow = true,
}: ButtonProps) {
  if (variant === 'secondary') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          background: 'transparent',
          color: 'var(--text)',
          padding: '0.8rem var(--space-8)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: 'var(--letter-spacing-sm)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'border-color var(--transition-base), color var(--transition-base)',
          fontFamily: 'var(--font-sans)',
          width: fullWidth ? '100%' : undefined,
          justifyContent: fullWidth ? 'center' : undefined,
          opacity: disabled ? 0.4 : 1,
        }}
        onMouseEnter={e => {
          if (!disabled) {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--text)'
          }
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
        }}
      >
        {label} {arrow && <span aria-hidden="true">→</span>}
      </button>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="btn-primary"
      style={{
        width: fullWidth ? '100%' : undefined,
        justifyContent: fullWidth ? 'center' : undefined,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {label} {arrow && <span aria-hidden="true">→</span>}
    </button>
  )
}
