'use client'
import { useState } from 'react'
import Link from 'next/link'
import Breadcrumb from './Breadcrumb'
import CTAStrip from './CTAStrip'
import ContactModal from './ContactModal'
import SideNav from './SideNav'
import DetailsCard from './DetailsCard'
import MetricDisplay from './MetricDisplay'
import Tag from './Tag'

interface CaseStudyPageProps {
  // Header
  title: string
  company: string
  tags: string[]
  hook: string

  // Optional header metrics (large accent numbers)
  metrics?: { value: string; label: string }[]

  // Optional details bar (My Role, Timeline, Methods etc.)
  details?: { label: string; value: string }[]

  // Optional side navigation section IDs
  sections?: string[]

  // Optional password gate
  unlocked?: boolean

  // Optional hero image
  heroImage?: string
  heroImageAlt?: string

  // Main content
  children: React.ReactNode

  // CTA strip
  cta: { title: string; description?: string }

  // Next item
  next: { title: string; href: string; type: 'case-study' | 'project' }
}

export default function CaseStudyPage({
  title,
  company,
  tags,
  hook,
  metrics,
  details,
  sections,
  unlocked,
  heroImage,
  heroImageAlt = 'Case study hero image',
  children,
  cta,
  next,
}: CaseStudyPageProps) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      {/* ── SEO-only h1 (visually hidden) ── */}
      <h1 style={{
        position: 'absolute', width: 1, height: 1,
        padding: 0, margin: -1, overflow: 'hidden',
        clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0
      }}>
        {title}
      </h1>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>

        {/* ── Breadcrumb ── */}
        <div style={{ padding: '1.25rem 3rem 0' }}>
          <Breadcrumb items={[{ label: 'My Work', href: '/work' }, { label: title }]} />
        </div>

        {/* ── Header ── */}
        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            {tags.map(t => <Tag key={t} label={t} variant="default" />)}
          </div>
          <h2 className="font-serif page-title-lg" style={{
            fontSize: 'var(--font-size-4xl)',
            fontWeight: 400,
            lineHeight: 1.1,
            marginBottom: 'var(--space-2)',
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            letterSpacing: 'var(--letter-spacing-sm)',
            marginBottom: 'var(--space-6)',
          }}>
            {company}
          </p>
          <p style={{
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text)',
            lineHeight: 1.7,
            maxWidth: 680,
          }}>
            {hook}
          </p>
        </header>

        {/* ── Hero image ── */}
        {heroImage && (
          <div style={{ padding: '0 3rem 2rem' }}>
            <img
              src={heroImage}
              alt={heroImageAlt}
              style={{ width: '100%', borderRadius: 'var(--radius-sm)', display: 'block', border: '1px solid var(--color-border)' }}
            />
          </div>
        )}

        {/* ── Header metrics ── */}
        {metrics && metrics.length > 0 && (
          <div style={{
            padding: '0 3rem 3rem',
            display: 'flex',
            gap: 'var(--space-12)',
            flexWrap: 'wrap' as const,
          }}>
            {metrics.map(m => (
              <MetricDisplay key={m.label} value={m.value} label={m.label} />
            ))}
          </div>
        )}
      </div>

      {/* ── Details bar ── */}
      {details && details.length > 0 && (
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <DetailsCard items={details} />
        </div>
      )}

      {/* ── Side nav + content ── */}
      {sections && sections.length > 0 ? (
        <div className="case-study-layout" style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <SideNav unlocked={unlocked ?? true} sections={sections} />
          <div style={{ maxWidth: 780 }}>
            {children}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 780, margin: '0 auto', padding: '4rem 3rem' }}>
          {children}
        </div>
      )}

      {/* ── CTA strip ── */}
      <CTAStrip title={cta.title} onContact={() => setModalOpen(true)} />

      {/* ── Next case study / project ── */}
      <div className="divider" />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div className="next-project">
          <div>
            <p style={{
              fontSize: 'var(--font-size-xs)',
              letterSpacing: 'var(--letter-spacing-lg)',
              textTransform: 'uppercase' as const,
              color: 'var(--color-text-muted)',
              fontWeight: 500,
              marginBottom: 'var(--space-1)',
            }}>
              {next.type === 'case-study' ? 'Next Case Study' : 'Next Project'}
            </p>
            <p className="font-serif" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 400 }}>
              {next.title}
            </p>
          </div>
          <Link href={next.href} style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-accent)',
            fontWeight: 500,
            textDecoration: 'none',
          }}>
            {next.type === 'case-study' ? 'Read case study' : 'View project'} →
          </Link>
        </div>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}

