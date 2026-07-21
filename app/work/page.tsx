'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SectionLabel from '../components/SectionLabel'
import Heading from '../components/Heading'
import { workItems } from '../work.config'
import CaseStudyCard from '../components/CaseStudyCard'
import FeaturedProjectCard from '../components/FeaturedProjectCard'

const caseStudies = [
  { title: 'AI Interface Pattern Library', company: 'Self-initiated', tags: ['AI Design', 'UX Research', 'Design Systems'], desc: 'Audited six conversational AI products against a standardized 23-prompt methodology, documented failure modes across six pattern categories, and built an interactive pattern library with formal definitions and React demos.', outcomes: [{ val: '6', label: 'Products audited' }, { val: 'Public', label: 'Empirically grounded pattern library' }], href: '/work/pattern-library', image: '/images/work/work-pattern-library-card.png' },
  { title: 'AI Feedback & Insights Agent', company: 'Willis Towers Watson', tags: ['Agentic Workflow Design', 'AI Design'], desc: 'Designed and deployed an agentic AI research pipeline that automated qualitative synthesis — transforming raw user feedback into structured, actionable insights with 95% categorization accuracy and eliminating a full day of manual analysis.', outcomes: [{ val: '95%', label: 'Categorization accuracy' }, { val: '8 hrs → 8 min', label: 'Synthesis time reduction' }], href: '/work/ai-agent', image: '/images/work/work-ai-agent-card.png' },
  { title: 'People-First Enrollment Redesign', company: 'Via Benefits · WTW', tags: ['UX Research', 'Product Strategy'], desc: 'Dismantled a legacy product-first gate causing cognitive overwhelm and high abandonment — replacing it with an identity-driven enrollment flow that drove a 15% lift in total enrollments and 45% faster time-to-convert.', outcomes: [{ val: '45%', label: 'Faster time-to-convert' }, { val: '15%', label: 'Lift in enrollments' }, { val: '50%', label: 'Reduction in rage clicks' }], href: '/work/people-first', image: '/images/work/work-people-first-card.png' },
  { title: 'IHE Scheduling Portal', company: 'Signify Health · CVS Health', tags: ['UX Research', 'UX Design'], desc: 'Led mixed-methods research to uncover why members declined free in-home health evaluations — findings that directly informed a trust-first scheduling portal redesign.', outcomes: [{ val: '73 NPS', label: 'Post-visit satisfaction' }, { val: '3.5M+', label: 'Annual IHEs completed' }, { val: '6', label: 'Barrier categories identified' }], href: '/work/ihe-portal', image: '/images/work/work-ihe-portal-card.png' },
  { title: 'From Checkboxes to Conversations', company: 'Squarespace · Self-initiated', tags: ['AI Design', 'UX Research', 'Interaction Design'], desc: "Audited Squarespace's Blueprint AI across two user journeys, documented 20 distinct failure modes, and redesigned three key moments — grounded in the principles I use every time I work with AI as a design tool.", outcomes: [{ val: '20', label: 'Failure modes documented' }, { val: '22', label: 'Intents audited' }, { val: '3', label: 'Redesigned moments' }], href: '/work/squarespace-redesign', image: '/images/work/work-squarespace-redesign-card.png' },
  { title: 'The Portfolio Is the Product', company: 'Self-initiated', tags: ['Design Technologist', 'AI-Native Workflow', 'Product Thinking'], desc: 'Built a custom Next.js portfolio site from scratch — with a bespoke design system, AI as an execution layer, and product thinking applied to every decision. Under 2 weeks from concept to shipped site.', outcomes: [{ val: '12+', label: 'Pages designed and built' }, { val: '< 2 weeks', label: 'Concept to shipped' }, { val: '90%', label: 'Hosting cost reduction' }], href: '/work/the-portfolio', image: '/images/work/work-the-portfolio-card.png' },
  { title: 'Honest Design System', company: 'Self-initiated', tags: ['Design Systems', 'Design Technologist'], desc: 'Built a production design system for alikhandesign.com — 39 components, a two-layer token architecture, full Figma-to-code parity, Storybook documentation, and WCAG 2.1 AA throughout.', outcomes: [{ val: '39', label: 'Components' }, { val: 'WCAG 2.1 AA', label: 'Accessibility standard' }, { val: '1:1', label: 'Figma-to-code parity' }], href: '/work/honest-design-system', image: '/images/work/work-honest-design-system-card.png' },
]

const projects = [
  { title: 'Optimizing the Ancillary Insurance Journey', company: 'Willis Towers Watson', tags: ['Usability Research', 'Mixed-Methods Research'], desc: 'A qualitative deep dive into how Medicare enrollees navigate dental, vision, and hearing coverage — identifying comprehension gaps and friction points.', href: '/work/ancillary-journey', image: '/images/work/work-ancillary-journey-card.jpg' },
  { title: 'Vivio Clinical App', company: 'Ventric Health', tags: ['Product Design', 'Design Systems', 'Native iOS'], desc: 'Designed a native iOS clinical application for Vivio — a non-invasive heart failure diagnostic tool — with a complete design system and 20+ error states.', href: '/work/vivio', image: '/images/work/work-vivio-card.png' },
  { title: 'Signify Health Rebrand', company: 'Signify Health', tags: ['Brand Design', 'Web Design'], desc: 'Led a full brand refresh in partnership with W2O Group, resulting in a 50% increase in total website traffic.', href: '/work/signify-rebrand', image: '/images/work/work-signify-rebrand-card.jpg' },
  { title: 'LLM Prompt Engineering for Website Audits', company: 'Willis Towers Watson', tags: ['AI Workflow', 'AI Design'], desc: 'Built an AI-driven audit engine that turned buried UX, engineering, accessibility, and content standards into a live, weighted scorecard — cutting page review from hours to minutes.', href: '/work/llm-prompts', image: '/images/work/work-llm-prompts-card.jpg' },
  { title: 'Design Handoff Checklist', company: 'Willis Towers Watson', tags: ['Process Design', 'Workflow Optimization'], desc: 'Built a developer-first handoff protocol across 15 teams and 150+ developers, replacing a black-box handoff process with a mandatory Ready-for-Dev checklist and centralized Knowledge Base.', href: '/work/design-handoff', image: '/images/work/work-design-handoff-card.jpg' },
]

type Filter = 'all' | 'case-studies' | 'projects'

interface KVConfig {
  order: string[] | null
  config: Record<string, { visible: boolean }> | null
}

const filterStyles: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
  paddingTop: '0.4rem', paddingBottom: '0.4rem', paddingLeft: '0.875rem', paddingRight: '0.875rem',
  fontSize: 'var(--font-size-xs)', fontWeight: 500, letterSpacing: '0.04em',
  color: 'var(--color-text)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
  cursor: 'pointer', background: 'transparent', fontFamily: 'var(--font-sans)', transition: 'background 0.15s, color 0.15s',
}

export default function WorkPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [kvConfig, setKvConfig] = useState<KVConfig | null>(null)

  useEffect(() => {
    fetch('/api/admin/work?password=dadisgay123')
      .then(r => r.ok ? r.json() : null)
      .then(data => data && setKvConfig(data))
      .catch(() => {})
  }, [])

  const applyKV = <T extends { href: string }>(items: T[], type: 'case-study' | 'project'): T[] => {
    if (!kvConfig?.order && !kvConfig?.config) return items
    return items.filter(item => {
      const match = workItems.find(w => item.href === '/work/' + w.slug)
      if (!match) return true
      return kvConfig?.config?.[match.slug]?.visible ?? true
    }).sort((a, b) => {
      if (!kvConfig?.order) return 0
      const aSlug = workItems.find(w => a.href === '/work/' + w.slug)?.slug ?? ''
      const bSlug = workItems.find(w => b.href === '/work/' + w.slug)?.slug ?? ''
      return (kvConfig.order!.indexOf(aSlug) ?? 999) - (kvConfig.order!.indexOf(bSlug) ?? 999)
    })
  }

  const visibleCaseStudies = applyKV(caseStudies, 'case-study')
  const visibleProjects = applyKV(projects, 'project')
  const showCaseStudies = filter === 'all' || filter === 'case-studies'
  const showProjects = filter === 'all' || filter === 'projects'
  const total = visibleCaseStudies.length + visibleProjects.length

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
            <button onClick={() => setFilter('case-studies')} style={filter === 'case-studies' ? activeStyle : filterStyles} aria-pressed={filter === 'case-studies'}>Case Studies <span style={badgeStyle(filter === 'case-studies')} aria-hidden="true">{visibleCaseStudies.length}</span></button>
            <button onClick={() => setFilter('projects')} style={filter === 'projects' ? activeStyle : filterStyles} aria-pressed={filter === 'projects'}>Projects <span style={badgeStyle(filter === 'projects')} aria-hidden="true">{visibleProjects.length}</span></button>
          </div>
        </header>
      </div>

      {showCaseStudies && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <Heading level={2}>Case Studies</Heading>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>— {visibleCaseStudies.length} deep dives</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {visibleCaseStudies.map(cs => <CaseStudyCard key={cs.title} {...cs} description={cs.desc} />)}
          </div>
        </section>
      )}

      {showCaseStudies && showProjects && <div className="divider" />}

      {showProjects && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <Heading level={2}>Projects</Heading>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>— {visibleProjects.length} selected works</span>
          </div>
          <div className="grid-proj">
            {visibleProjects.map(p => <FeaturedProjectCard key={p.title} type="Project" title={p.title} company={p.company} description={p.desc} href={p.href} image={p.image} />)}
          </div>
        </section>
      )}
    </main>
  )
}
