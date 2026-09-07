interface SubHeadProps {
  children: React.ReactNode
  /** Tightens the top margin when the SubHead directly follows a section intro. */
  tight?: boolean
}

export default function SubHead({ children, tight = false }: SubHeadProps) {
  return (
    <h3
      style={{
        fontSize: 'var(--font-size-xl)',
        fontWeight: 600,
        lineHeight: 'var(--line-height-tight)',
        color: 'var(--color-text)',
        margin: tight ? '1.5rem 0 1rem' : '2.5rem 0 1rem',
      }}
    >
      {children}
    </h3>
  )
}
