import Link from 'next/link'
import Image from 'next/image'
import Tag from './Tag'

interface Outcome {
  val: string
  label: string
}

interface CaseStudyCardProps {
  title: string
  company: string
  tags: string[]
  description: string
  outcomes: Outcome[]
  href: string
  image?: string
}

export default function CaseStudyCard({ title, company, tags, description, outcomes, href, image }: CaseStudyCardProps) {
  return (
    <Link href={href} aria-label={`View case study: ${title}`} className="work-card cs-card-grid" style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      textDecoration: 'none',
      color: 'inherit',
    }}>
      <div style={{
        position: 'relative',
        width: 320,
        height: '100%',
        minHeight: 220,
        background: 'var(--color-border)',
        overflow: 'hidden',
        flexShrink: 0,
        alignSelf: 'stretch',
      }}>
        {image ? (
          <Image
            src={image}
            alt={`${title} preview`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center' }}
            sizes="320px"
          />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 220, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
            Project Preview
          </div>
        )}
      </div>
      <div style={{ padding: '2rem 2rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.9rem', flexWrap: 'wrap' as const }}>
            <Tag label="Case Study" variant="accent" />
            {tags.map(t => <Tag key={t} label={t} />)}
          </div>
          <h3 className="font-serif" style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 400, lineHeight: 1.2, marginBottom: '0.25rem' }}>{title}</h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: '0.85rem' }}>{company}</p>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>{description}</p>
          <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' as const, marginBottom: 'var(--space-6)' }}>
            {outcomes.map(o => (
              <div key={o.label}>
                <div className="font-serif" style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-accent)', lineHeight: 1 }}>{o.val}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: 2, lineHeight: 1.4 }}>{o.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)', fontWeight: 500 }}>Read case study →</span>
        </div>
      </div>
    </Link>
  )
}
