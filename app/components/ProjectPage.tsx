import Link from 'next/link'

interface Section { label: string; title: string; body: string[] }
interface ProjectPageProps {
  title: string; company: string; tags: string[]; hook: string;
  details: { label: string; value: string }[];
  sections: Section[];
  gallery: string[];
  cta: { title: string; href: string };
  next: { title: string; href: string };
}

export default function ProjectPage({ title, company, tags, hook, details, sections, gallery, cta, next }: ProjectPageProps) {
  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <nav style={{ padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' as const }}>
          <Link href="/work" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>My Work</Link>
          <span style={{ fontSize: 13, color: '#C4BDB7' }}>›</span>
          <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{title}</span>
        </nav>
        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            {tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <h1 className="font-serif page-title-lg" style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>{title}</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>{company}</p>
          <p style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.7, maxWidth: 680 }}>{hook}</p>
        </header>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <div style={{ width: '100%', height: 400, background: 'var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Hero Project Image</div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="details-bar">
          {details.map(d => (
            <div key={d.label}>
              <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>{d.label}</p>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{d.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '4rem 3rem' }}>
        {sections.map(s => (
          <section key={s.label} style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">{s.label}</p>
            <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: i < s.body.length - 1 ? '1.25rem' : 0 }}>{p}</p>
            ))}
          </section>
        ))}
      </div>

      {gallery.length > 0 && (
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 4rem' }}>
          <p className="section-label" style={{ marginBottom: '1.25rem' }}>Project Gallery</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {gallery.map((label, i) => (
              <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : undefined }}>
                <div style={{ width: '100%', aspectRatio: i === 0 ? '16/9' : '4/3', background: 'var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <section style={{ background: 'var(--dark-bg)', padding: '4rem 3rem' }}>
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' as const }}>
          <div>
            <p style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4BDB7', fontWeight: 500, marginBottom: '0.6rem' }}>Interested?</p>
            <h2 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, color: 'var(--bg)', lineHeight: 1.25, maxWidth: 500 }}>{cta.title}</h2>
          </div>
          <a href={cta.href} className="btn-primary" style={{ flexShrink: 0 }}>Get in touch <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <div className="divider" />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="next-project">
          <div>
            <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>Next Project</p>
            <p className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 400 }}>{next.title}</p>
          </div>
          <Link href={next.href} style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>View project →</Link>
        </div>
      </div>
    </main>
  )
}
