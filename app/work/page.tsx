'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionLabel from '../components/SectionLabel'
import CaseStudyCard from '../components/CaseStudyCard'
import FeaturedProjectCard from '../components/FeaturedProjectCard'

const caseStudies = [
  {
    title: 'AI Interface Pattern Library',
    company: 'Self-initiated',
    tags: ['AI Design', 'UX Research', 'Design Systems'],
    desc: 'Audited six conversational AI products against a standardized 23-prompt methodology, documented failure modes across six pattern categories, and built an interactive pattern library with formal definitions and React demos.',
    outcomes: [{ val: '6', label: 'Products audited' }, { val: 'Public', label: 'Empirically grounded pattern library' }],
    href: '/work/pattern-library',
  },
  {
    title: 'AI Feedback & Insights Agent',
    company: 'Willis Towers Watson',
    tags: ['Agentic Workflow Design', 'AI Design'],
    desc: 'Designed and deployed an agentic AI research pipeline that automated qualitative synthesis — transforming raw user feedback into structured, actionable insights with 95% categorization accuracy and eliminating a full day of manual analysis.',
    outcomes: [{ val: '95%', label: 'Categorization accuracy' }, { val: '8 hrs → 8 min', label: 'Synthesis time reduction' }],
    href: '/work/ai-agent',
  },
  {
    title: 'People-First Enrollment Redesign',
    company: 'Via Benefits · WTW',
    tags: ['UX Research', 'Product Strategy'],
    desc: 'Dismantled a legacy product-first gate causing cognitive overwhelm and high abandonment — replacing it with an identity-driven enrollment flow that drove a 15% lift in total enrollments and 45% faster time-to-convert.',
    outcomes: [{ val: '45%', label: 'Faster time-to-convert' }, { val: '15%', label: 'Lift in enrollments' }, { val: '50%', label: 'Reduction in rage clicks' }],
    href: '/work/people-first',
  },
  {
    title: 'IHE Scheduling Portal',
    company: 'Signify Health · CVS Health',
    tags: ['UX Research', 'UX Design'],
    desc: 'Led mixed-methods research to uncover why members declined free in-home health evaluations — findings that directly informed a trust-first scheduling portal redesign.',
    outcomes: [{ val: '73 NPS', label: 'Post-visit satisfaction' }, { val: '3.5M+', label: 'Annual IHEs completed' }, { val: '6', label: 'Barrier categories identified' }],
    href: '/work/ihe-portal',
  },
  {
    title: 'From Checkboxes to Conversations',
    company: 'Squarespace · Self-initiated',
    tags: ['AI Design', 'UX Research', 'Interaction Design'],
    desc: "Audited Squarespace's Blueprint AI across two user journeys, documented 20 distinct failure modes, and redesigned three key moments — grounded in the principles I use every time I work with AI as a design tool.",
    outcomes: [{ val: '20', label: 'Failure modes documented' }, { val: '22', label: 'Intents audited' }, { val: '3', label: 'Redesigned moments' }],
    href: '/work/squarespace-redesign',
  },
  {
    title: 'The Portfolio Is the Product',
    company: 'Self-initiated',
    tags: ['Design Technologist', 'AI-Native Workflow', 'Product Thinking'],
    desc: 'Built a custom Next.js portfolio site from scratch — with a bespoke design system, AI as an execution layer, and product thinking applied to every decision. Under 2 weeks from concept to shipped site.',
    outcomes: [{ val: '12+', label: 'Pages designed and built' }, { val: '< 2 weeks', label: 'Concept to shipped' }, { val: '90%', label: 'Hosting cost reduction' }],
    href: '/work/the-portfolio',
  },
  {
    title: 'Honest Design System',
    company: 'Self-initiated',
    tags: ['Design Systems', 'Design Technologist'],
    desc: 'Built a production design system for alikhandesign.com — 19 components, a two-layer token architecture, full Figma-to-code parity, Storybook documentation, and WCAG 2.1 AA throughout.',
    outcomes: [{ val: '19', label: 'Components' }, { val: 'WCAG 2.1 AA', label: 'Accessibility standard' }, { val: '1:1', label: 'Figma-to-code parity' }],
    href: '/work/honest-design-system',
  },
]

const projects = [
  { title: 'Optimizing the Ancillary Insurance Journey', company: 'Willis Towers Watson', tags: ['Usability Research', 'Mixed-Methods Research'], desc: 'A qualitative deep dive into how Medicare enrollees navigate dental, vision, and hearing coverage — identifying comprehension gaps and friction points.', href: '/work/ancillary-journey' },
  { title: 'Vivio Clinical App', company: 'Ventric Health', tags: ['Product Design', 'Design Systems', 'Native iOS'], desc: 'Designed a native iOS clinical application for Vivio — a non-invasive heart failure diagnostic tool — with a complete design system and 20+ error states.', href: '/work/vivio' },
  { title: 'Signify Health Rebrand', company: 'Signify Health', tags: ['Brand Design', 'Web Design'], desc: 'Led a full brand refresh in partnership with W2O Group, resulting in a 50% increase in total website traffic.', href: '/work/signify-rebrand' },
  { title: 'LLM Prompt Engineering for Website Audits', company: 'Willis Towers Watson', tags: ['AI Workflow', 'AI Design'], desc: 'Engineered a structured prompt framework for using large language models to conduct UX website audits.', href: '/work/llm-prompts' },
  { title: 'Design Handoff Checklist', company: 'Willis Towers Watson', tags: ['Process Design', 'Workflow Optimization'], desc: 'Developed a comprehensive design-to-development handoff checklist that reduced miscommunication cycles.', href: '/work/design-handoff' },
]

type Filter = 'all' | 'case-studies' | 'projects'

const filterStyles: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
  paddingLeft: '0.875rem',
  paddingRight: '0.875rem',
  fontSize: 'var(--text-xs)',
  fontWeight: 500,
  letterSpacing: '0.04em',
  color: 'var(--color-text)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius)',
  cursor: 'pointer',
  background: 'transparent',
  fontFamily: 'var(--font-sans)',
  transition: 'border-color 0.15s, background 0.15s, color 0.15s',
}

export default function WorkPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const showCaseStudies = filter === 'all' || filter === 'case-studies'
  const showProjects = filter === 'all' || filter === 'projects'
  const total = caseStudies.length + projects.length

  const activeStyle: React.CSSProperties = {
    ...filterStyles,
    background: 'var(--color-text)',
    borderColor: 'var(--color-text)',
    color: 'var(--color-bg)',
  }

  const badgeStyle = (active: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '1.1rem',
    height: '1.1rem',
    fontSize: '0.6875rem',
    fontWeight: 600,
    borderRadius: '999px',
    padding: '0 0.25rem',
    background: active ? 'rgba(250,248,245,0.25)' : 'var(--color-border)',
    color: active ? 'var(--color-bg)' : 'var(--color-text-muted)',
  })

  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <header className="page-header">
          <SectionLabel label="Portfolio" />
          <h1 className="font-serif page-title-lg" style={{ fontSize: 'var(--text-4xl)', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.75rem' }}>My Work</h1>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: 580, marginBottom: '0.75rem' }}>10+ years of product design and UX research — from AI-native research pipelines to zero-to-one product ecosystems.</p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Have questions about the work?{' '}
            <Link href="/chat" style={{ color: 'var(--color-text)', textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 500 }}>
              Start a conversation with the portfolio assistant.
            </Link>
            {' →'}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('all')} style={filter === 'all' ? activeStyle : filterStyles} aria-pressed={filter === 'all'}>
              All <span style={badgeStyle(filter === 'all')} aria-hidden="true">{total}</span>
            </button>
            <button onClick={() => setFilter('case-studies')} style={filter === 'case-studies' ? activeStyle : filterStyles} aria-pressed={filter === 'case-studies'}>
              Case Studies <span style={badgeStyle(filter === 'case-studies')} aria-hidden="true">{caseStudies.length}</span>
            </button>
            <button onClick={() => setFilter('projects')} style={filter === 'projects' ? activeStyle : filterStyles} aria-pressed={filter === 'projects'}>
              Projects <span style={badgeStyle(filter === 'projects')} aria-hidden="true">{projects.length}</span>
            </button>
          </div>
        </header>
      </div>

      {showCaseStudies && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <h2 className="font-serif" style={{ fontSize: 'var(--text-3xl)', fontWeight: 400 }}>Case Studies</h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>— {caseStudies.length} deep dives</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {caseStudies.map(cs => (
              <CaseStudyCard key={cs.title} {...cs} description={cs.desc} />
            ))}
          </div>
        </section>
      )}

      {showCaseStudies && showProjects && <div className="divider" />}

      {showProjects && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <h2 className="font-serif" style={{ fontSize: 'var(--text-3xl)', fontWeight: 400 }}>Projects</h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>— {projects.length} selected works</span>
          </div>
          <div className="grid-proj">
            {projects.map(p => (
              <FeaturedProjectCard key={p.title} type="Project" title={p.title} company={p.company} description={p.desc} href={p.href} />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
