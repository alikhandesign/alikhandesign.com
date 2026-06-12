interface BodyProps {
  children: React.ReactNode
  mb?: boolean
  size?: 'sm' | 'base'
  color?: string
}

export default function Body({
  children,
  mb = true,
  size = 'sm',
  color = 'var(--color-text-mid)',
}: BodyProps) {
  const sizeMap = {
    sm:   'var(--font-size-sm)',
    base: 'var(--font-size-base)',
  }

  return (
    <p style={{
      fontSize: sizeMap[size],
      color,
      lineHeight: 1.85,
      marginBottom: mb ? '1.25rem' : 0,
    }}>
      {children}
    </p>
  )
}
