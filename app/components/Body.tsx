interface BodyProps {
  children: React.ReactNode
  mb?: boolean
}

export default function Body({ children, mb = true }: BodyProps) {
  return (
    <p style={{
      fontSize: 'var(--text-sm)',
      color: 'var(--color-text-mid)',
      lineHeight: 1.85,
      marginBottom: mb ? '1.25rem' : 0,
    }}>
      {children}
    </p>
  )
}
