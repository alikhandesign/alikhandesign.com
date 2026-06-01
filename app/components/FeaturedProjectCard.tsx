import Link from 'next/link'
import Tag from './Tag'

interface FeaturedProjectCardProps {
  type: 'Case Study' | 'Project'
  title: string
  company: string
  description: string
  href: string
}

export default function FeaturedProjectCard({ type, title, company, description, href }: FeaturedProjectCardProps) {
  const ctaLabel = type === 'Case Study' ? 'Read case study' : 'View project'
  return (
    <Link href={href} className="work-card" style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      overflow: 'hidden',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
    }}>
      <div style={{ width: '100%', height: 200, background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
        {type === 'Case Study' ? 'Case Study Preview' : 'Project Preview'}
      </div>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <Tag label={type} variant={type === 'Case Study' ? 'accent' : 'default'} />
        </div>
        <h3 className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 400, lineHeight: 1.25, marginBottom: '0.25rem' }}>{title}</h3>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.75rem' }}>{company}</p>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{description}</p>
        <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>{ctaLabel} →</span>
      </div>
    </Link>
  )
}
