'use client'
import Link from 'next/link'
import { GalleryGrid } from './Lightbox'
import { useState } from 'react'
import ContactModal from './ContactModal'
import Breadcrumb from './Breadcrumb'
import CTAStrip from './CTAStrip'
import DetailsCard from './DetailsCard'

interface Section { label: string; title: string; body: string[] }
interface ProjectPageProps {
  title: string; company: string; tags: string[]; hook: string;
  details: { label: string; value: string }[];
  sections: Section[];
  gallery: { src: string; alt: string; caption?: string }[];
  cta: { title: string };
  next: { title: string; href: string; type: 'case-study' | 'project' };
}

export default function ProjectPage({ title, company, tags, hook, details, sections, gallery, cta, next }: ProjectPageProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div style={{ padding: '1.25rem 3rem 0' }}>
          <Breadcrumb items={[{ label: 'My Work', href: '/work' }, { label: title }]} />
        </div>
        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            {tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <h1 className="font-serif page-title-lg" style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 400, lineHeight: 1.1, marginBottom: 'var(--space-2)' }}>{title}</h1>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: 'var(--letter-spacing-sm)', marginBottom: 'var(--space-6)' }}>{company}</p>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)', lineHeight: 1.7, maxWidth: 680 }}>{hook}</p>
        </header>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <div style={{ width: '100%', height: 400, background: 'var(--color-border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' as const }}>Hero Project Image</div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <DetailsCard items={details} />
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '4rem 3rem' }}>
        {sections.map(s => (
          <section key={s.label} style={{ marginBottom: '3.5rem' }}>
            <p className="section-label">{s.label}</p>
            <h2 className="font-serif" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 400, lineHeight: 1.2, marginBottom: 'var(--space-5)' }}>{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: i < s.body.length - 1 ? 'var(--space-5)' : 0 }}>{p}</p>
            ))}
          </section>
        ))}
      </div>

      {gallery.length > 0 && (
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 4rem' }}>
          <p className="section-label" style={{ marginBottom: 'var(--space-5)' }}>Project Gallery</p>
          <GalleryGrid images={gallery} />
        </div>
      )}

      <CTAStrip title={cta.title} onContact={() => setModalOpen(true)} />

      <div className="divider" />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="next-project">
          <div>
            <p style={{ fontSize: 'var(--font-size-xs)', letterSpacing: 'var(--letter-spacing-lg)', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: 'var(--space-1)' }}>{next.type === 'case-study' ? 'Next Case Study' : 'Next Project'}</p>
            <p className="font-serif" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 400 }}>{next.title}</p>
          </div>
          <Link href={next.href} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}>{next.type === 'case-study' ? 'Read case study' : 'View project'} →</Link>
        </div>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
