'use client'
import React from 'react'

interface ButtonProps {
  label: string
  onClick?: () => void
  fullWidth?: boolean
  type?: 'button' | 'submit'
}

export default function Button({ label, onClick, fullWidth = false, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn-primary"
      style={{ width: fullWidth ? '100%' : undefined, justifyContent: fullWidth ? 'center' : undefined }}
    >
      {label} <span aria-hidden="true">→</span>
    </button>
  )
}
