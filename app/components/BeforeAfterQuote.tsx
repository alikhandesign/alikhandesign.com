interface BeforeAfterQuoteProps {
  beforeLabel: string
  beforeQuote: string
  beforeAttribution: string
  afterLabel: string
  afterStruckQuote?: string
  afterQuote: string
  afterAttribution: string
  note?: string
}

export default function BeforeAfterQuote({
  beforeLabel,
  beforeQuote,
  beforeAttribution,
  afterLabel,
  afterStruckQuote,
  afterQuote,
  afterAttribution,
  note,
}: BeforeAfterQuoteProps) {
  const labelStyle = {
    fontSize: 'var(--font-size-2xl)',
    fontWeight: 'var(--font-weight-semibold)' as any,
    lineHeight: 'var(--line-height-tight)',
    color: 'var(--color-text)',
    marginBottom: 'var(--space-4)',
  }

  const quoteStyle = {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.4,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-4)',
  }

  const attributionStyle = {
    fontSize: 'var(--font-size-sm)',
    lineHeight: 1.34,
    color: 'var(--color-text-muted)',
  }

  return (
    <figure
      className="ba-quote"
      style={{
        background: 'var(--color-surface-subtle)',
        padding: 'var(--space-8) var(--space-6)',
        margin: '2rem 0',
        textAlign: 'center' as const,
      }}
    >
      <div className="ba-quote__row">
        <div className="ba-quote__side">
          <p style={labelStyle}>{beforeLabel}</p>
          <blockquote style={quoteStyle}>{beforeQuote}</blockquote>
          <figcaption style={attributionStyle}>{beforeAttribution}</figcaption>
        </div>

        <div className="ba-quote__arrow" aria-hidden="true">
          &rarr;
        </div>

        <div className="ba-quote__side">
          <p style={labelStyle}>{afterLabel}</p>
          <blockquote style={quoteStyle}>
            {afterStruckQuote && (
              <span
                style={{
                  display: 'block',
                  textDecoration: 'line-through',
                  textDecorationSkipInk: 'none' as any,
                  color: 'var(--color-text-muted)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {afterStruckQuote}
              </span>
            )}
            {afterQuote}
          </blockquote>
          <figcaption style={attributionStyle}>{afterAttribution}</figcaption>
        </div>
      </div>

      {note && (
        <p
          style={{
            fontSize: 'var(--font-size-base)',
            lineHeight: 1.36,
            color: 'var(--color-text-muted)',
            marginTop: 'var(--space-6)',
            maxWidth: '46ch',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {note}
        </p>
      )}
    </figure>
  )
}
