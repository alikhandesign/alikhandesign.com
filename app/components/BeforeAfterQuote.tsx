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
    fontWeight: 600,
    lineHeight: 'var(--line-height-tight)',
    color: 'var(--color-text)',
  }

  const quoteStyle = {
    fontSize: 'var(--font-size-base)',
    lineHeight: 1.4,
    color: 'var(--color-text)',
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
      <div className="ba-quote__grid">
        <p className="ba-quote__label-left" style={labelStyle}>{beforeLabel}</p>
        <blockquote className="ba-quote__quote-left" style={quoteStyle}>{beforeQuote}</blockquote>
        <figcaption className="ba-quote__attr-left" style={attributionStyle}>{beforeAttribution}</figcaption>

        <div className="ba-quote__arrow" aria-hidden="true">&rarr;</div>

        <p className="ba-quote__label-right" style={labelStyle}>{afterLabel}</p>
        <blockquote className="ba-quote__quote-right" style={quoteStyle}>
          {afterStruckQuote && (
            <>
              <span
                style={{
                  textDecoration: 'line-through',
                  textDecorationSkipInk: 'none' as any,
                  color: 'var(--color-text-muted)',
                }}
              >
                {afterStruckQuote}
              </span>
              <br />
            </>
          )}
          {afterQuote}
        </blockquote>
        <figcaption className="ba-quote__attr-right" style={attributionStyle}>{afterAttribution}</figcaption>
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
