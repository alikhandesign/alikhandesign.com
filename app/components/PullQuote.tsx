interface PullQuoteProps {
  children: React.ReactNode
}

export default function PullQuote({ children }: PullQuoteProps) {
  return (
    <p className="font-serif pull-quote" style={{
      fontSize: 'var(--font-size-xl)',
      color: 'var(--color-text)',
      lineHeight: 1.5,
      fontStyle: 'normal',
      textAlign: 'center',
      textWrap: 'balance',
      maxWidth: '32rem',
      margin: '4rem auto',
    }}>
      &ldquo;{children}&rdquo;
    </p>
  )
}
