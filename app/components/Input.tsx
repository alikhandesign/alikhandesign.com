'use client'

interface InputProps {
  value: string
  onChange: (val: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: boolean
  ariaLabel?: string
}

export default function Input({ value, onChange, onKeyDown, placeholder = 'Password', error = false, ariaLabel }: InputProps) {
  return (
    <input
      type="password"
      className="password-input"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      style={{
        border: error ? '1.5px solid var(--accent-dark)' : undefined,
        width: '100%',
      }}
      aria-label={ariaLabel || placeholder}
    />
  )
}
