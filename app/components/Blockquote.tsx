interface BlockquoteProps {
  children: React.ReactNode
}

export default function Blockquote({ children }: BlockquoteProps) {
  return (
    <div style={{
      borderLeft: '3px solid var(--color-accent)',
      padding: '1.25rem 1.5rem',
      margin: '2rem 0',
      background: 'var(--color-surface)',
      borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
    }}>
      <p className="font-serif" style={{
        fontSize: 'var(--text-xl)',
        color: 'var(--color-text)',
        lineHeight: 1.5,
        fontStyle: 'italic',
      }}>
        {children}
      </p>
    </div>
  )
}
