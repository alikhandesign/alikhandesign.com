interface PullQuoteProps {
  children: React.ReactNode
}

export default function PullQuote({ children }: PullQuoteProps) {
  return (
    <div className="pull-quote" style={{
      margin: '4rem auto',
      maxWidth: '32rem',
      textAlign: 'center',
    }}>
      <p className="font-serif" style={{
        fontSize: 'var(--font-size-2xl)',
        color: 'var(--color-text)',
        lineHeight: 1.5,
        fontStyle: 'normal',
        textWrap: 'balance',
        margin: 0,
      }}>
        &ldquo;{children}&rdquo;
      </p>
      <div style={{
        width: '3rem',
        height: '2px',
        background: 'var(--color-accent)',
        margin: '1.5rem auto 0',
      }} />
    </div>
  )
}
