interface HeadingProps {
  level?: 1 | 2 | 3
  size?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
  children: React.ReactNode
}

const sizeMap = {
  xl:   'var(--font-size-xl)',
  '2xl': 'var(--font-size-2xl)',
  '3xl': 'var(--font-size-3xl)',
  '4xl': 'var(--font-size-4xl)',
  '5xl': 'var(--font-size-5xl)',
}

const defaultSizeForLevel: Record<number, HeadingProps['size']> = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
}

export default function Heading({ level = 2, size, children }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  const resolvedSize = size ?? defaultSizeForLevel[level] ?? '3xl'

  return (
    <Tag className="font-serif" style={{
      fontSize: sizeMap[resolvedSize],
      fontWeight: 400,
      lineHeight: 1.2,
      color: 'var(--color-text)',
      marginBottom: '1.25rem',
    }}>
      {children}
    </Tag>
  )
}
