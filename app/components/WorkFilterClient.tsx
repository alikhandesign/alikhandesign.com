'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionLabel from './SectionLabel'
import Heading from './Heading'
import CaseStudyCard from './CaseStudyCard'
import FeaturedProjectCard from './FeaturedProjectCard'

interface Outcome { val: string; label: string }

interface CaseStudyItem {
  title: string
  company: string
  tags: string[]
  desc: string
  outcomes: Outcome[]
  href: string
  image: string
}

interface ProjectItem {
  title: string
  company: string
  tags: string[]
  desc: string
  href: string
  image: string
}

type Filter = 'all' | 'case-studies' | 'projects'

const filterStyles: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  paddingTop: '0.4rem', paddingBottom: '0.4rem', paddingLeft: '0.875rem', paddingRight: '0.875rem',
  fontSize: 'var(--font-size-xs)', fontWeight: 500, letterSpacing: '0.04em',
  color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
  cursor: 'pointer', background: 'transparent', fontFamily: 'var(--font-sans)', transition: 'background 0.15s, color 0.15s',
}

// Receives already-sorted, already-visibility-filtered data as props (resolved
// server-side, from KV, before this component ever mounts). This is the fix
// for the "stutter" — there's no client-side fetch/reorder after first paint,
// only the client-only "all/case-studies/projects" toggle happens here.
export default function WorkFilterClient({
  caseStudies,
  projects,
}: {
  caseStudies: CaseStudyItem[]
  projects: ProjectItem[]
}) {
  const [filter, setFilter] = useState<Filter>('all')

  const showCaseStudies = filter === 'all' || filter === 'case-studies'
  const showProjects = filter === 'all' || filter === 'projects'
  const total = caseStudies.length + projects.length

  const activeStyle: React.CSSProperties = { ...filterStyles, background: 'var(--color-text)', border: '1px solid var(--color-text)', color: 'var(--color-bg)' }

  const badgeStyle = (active: boolean): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    minWidth: '1.1rem', height: '1.1rem', fontSize: '0.6875rem', fontWeight: 600,
    borderRadius: '999px', padding: '0 0.25rem',
    background: active ? 'rgba(250,248,245,0.25)' : 'var(--color-border)',
    color: active ? 'var(--color-bg)' : 'var(--color-text-muted)',
  })

  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <header className="page-header">
          <SectionLabel label="Portfolio" />
          <Heading level={1} className="page-title-lg" lineHeight={1.1}>My Work</Heading>
          <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: 580, marginBottom: '0.75rem' }}>10+ years of product design and UX research — from AI-native research pipelines to zero-to-one product ecosystems.</p>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Have questions about the work?{' '}
            <Link href="/chat" style={{ color: 'var(--color-text)', textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 500 }}>
              Start a conversation with the portfolio assistant.
            </Link>
            {' →'}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('all')} style={filter === 'all' ? activeStyle : filterStyles} aria-pressed={filter === 'all'}>All <span style={badgeStyle(filter === 'all')} aria-hidden="true">{total}</span></button>
            <button onClick={() => setFilter('case-studies')} style={filter === 'case-studies' ? activeStyle : filterStyles} aria-pressed={filter === 'case-studies'}>Case Studies <span style={badgeStyle(filter === 'case-studies')} aria-hidden="true">{caseStudies.length}</span></button>
            <button onClick={() => setFilter('projects')} style={filter === 'projects' ? activeStyle : filterStyles} aria-pressed={filter === 'projects'}>Projects <span style={badgeStyle(filter === 'projects')} aria-hidden="true">{projects.length}</span></button>
          </div>
        </header>
      </div>

      {showCaseStudies && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <Heading level={2}>Case Studies</Heading>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>— {caseStudies.length} deep dives</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {caseStudies.map(cs => <CaseStudyCard key={cs.title} {...cs} description={cs.desc} />)}
          </div>
        </section>
      )}

      {showCaseStudies && showProjects && <div className="divider" />}

      {showProjects && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <Heading level={2}>Projects</Heading>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>— {projects.length} selected works</span>
          </div>
          <div className="grid-proj">
            {projects.map(p => <FeaturedProjectCard key={p.title} type="Project" title={p.title} company={p.company} description={p.desc} href={p.href} image={p.image} />)}
          </div>
        </section>
      )}
    </main>
  )
}
