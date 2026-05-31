'use client'

import Link from 'next/link'
import { useState } from 'react'

const caseStudies = [
  { title: 'AI Feedback & Insights Agent', company: 'Willis Towers Watson', tags: ['Agentic Workflow Design', 'AI Design'], desc: 'Designed and deployed an agentic AI research pipeline that automated qualitative synthesis — transforming raw user feedback into structured, actionable insights with 95% categorization accuracy and eliminating a full day of manual analysis.', outcomes: [{ val: '95%', label: 'Categorization accuracy' }, { val: '8 hrs → 8 min', label: 'Synthesis time reduction' }], href: '/work/ai-agent' },
  { title: 'From Checkboxes to Conversations', company: 'Squarespace · Self-initiated', tags: ['AI Design', 'UX Research', 'Interaction Design'], desc: "Audited Squarespace's Blueprint AI across two user journeys, documented 20 distinct failure modes, and redesigned three key moments — grounded in the principles I use every time I work with AI as a design tool.", outcomes: [{ val: '20', label: 'Failure modes documented' }, { val: '22', label: 'Intents audited' }, { val: '3', label: 'Redesigned moments' }], href: '/work/squarespace-redesign' },
  { title: 'People-First Enrollment Redesign', company: 'Via Benefits · WTW', tags: ['UX Research', 'Product Strategy'], desc: 'Dismantled a legacy product-first gate causing cognitive overwhelm and high abandonment — replacing it with an identity-driven enrollment flow that drove a 15% lift in total enrollments and 45% faster time-to-convert.', outcomes: [{ val: '45%', label: 'Faster time-to-convert' }, { val: '15%', label: 'Lift in enrollments' }, { val: '50%', label: 'Reduction in rage clicks' }], href: '/work/people-first' },
  { title: 'IHE Scheduling Portal', company: 'Signify Health · CVS Health', tags: ['UX Research', 'UX Design'], desc: 'Led mixed-methods research to uncover why members declined free in-home health evaluations — findings that directly informed a trust-first scheduling portal redesign.', outcomes: [{ val: '73 NPS', label: 'Post-visit satisfaction' }, { val: '3.5M+', label: 'Annual IHEs completed' }, { val: '6', label: 'Barrier categories identified' }], href: '/work/ihe-portal' },
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
  border: '1px solid var(--border)',
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
    background: 'var(--text)',
    borderColor: 'var(--text)',
    color: 'var(--bg)',
  }

  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <header className="page-header">
          <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>Portfolio</p>
          <h1 className="font-serif page-title-lg" style={{ fontSize: 'var(--text-5xl)', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.75rem' }}>My Work</h1>
          <p style={{ fontSize: 'var(--text-md)', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580, marginBottom: '1.5rem' }}>10+ years of product design and UX research — from AI-native research pipelines to zero-to-one product ecosystems.</p>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('all')} style={filter === 'all' ? activeStyle : filterStyles} aria-pressed={filter === 'all'}>
              All
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '1.1rem', height: '1.1rem', fontSize: '0.6875rem', fontWeight: 600, borderRadius: '999px', padding: '0 0.25rem', background: filter === 'all' ? 'rgba(250,248,245,0.25)' : 'var(--border)', color: filter === 'all' ? 'var(--bg)' : 'var(--text-muted)' }}>{total}</span>
            </button>
            <button onClick={() => setFilter('case-studies')} style={filter === 'case-studies' ? activeStyle : filterStyles} aria-pressed={filter === 'case-studies'}>
              Case Studies
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '1.1rem', height: '1.1rem', fontSize: '0.6875rem', fontWeight: 600, borderRadius: '999px', padding: '0 0.25rem', background: filter === 'case-studies' ? 'rgba(250,248,245,0.25)' : 'var(--border)', color: filter === 'case-studies' ? 'var(--bg)' : 'var(--text-muted)' }}>{caseStudies.length}</span>
            </button>
            <button onClick={() => setFilter('projects')} style={filter === 'projects' ? activeStyle : filterStyles} aria-pressed={filter === 'projects'}>
              Projects
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '1.1rem', height: '1.1rem', fontSize: '0.6875rem', fontWeight: 600, borderRadius: '999px', padding: '0 0.25rem', background: filter === 'projects' ? 'rgba(250,248,245,0.25)' : 'var(--border)', color: filter === 'projects' ? 'var(--bg)' : 'var(--text-muted)' }}>{projects.length}</span>
            </button>
          </div>
        </header>
      </div>

      {/* Case Studies */}
      {showCaseStudies && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-serif" style={{ fontSize: 'var(--text-2xl)', fontWeight: 400 }}>Case Studies</h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>— {caseStudies.length} deep dives</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {caseStudies.map(cs => (
              <Link key={cs.title} href={cs.href} aria-label={`View case study: ${cs.title}`} className="work-card cs-card-grid" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'var(--border)', minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Project Preview</div>
                <div style={{ padding: '2rem 2rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.9rem', flexWrap: 'wrap' as const }}>
                      <span className="tag-cs">Case Study</span>
                      {cs.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <h3 className="font-serif" style={{ fontSize: 'var(--text-2xl)', fontWeight: 400, lineHeight: 1.2, marginBottom: '0.25rem' }}>{cs.title}</h3>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.85rem' }}>{cs.company}</p>
                    <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>{cs.desc}</p>
                    <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' as const, marginBottom: 'var(--space-6)' }}>
                      {cs.outcomes.map(o => (
                        <div key={o.label}>
                          <div className="font-serif" style={{ fontSize: 'var(--text-2xl)', color: 'var(--accent)', lineHeight: 1 }}>{o.val}</div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>{o.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 'var(--text-base)', color: 'var(--accent)', fontWeight: 500 }}>Read case study →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {showCaseStudies && showProjects && <div className="divider" />}

      {/* Projects */}
      {showProjects && (
        <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
            <h2 className="font-serif" style={{ fontSize: 'var(--text-2xl)', fontWeight: 400 }}>Projects</h2>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>— {projects.length} selected works</span>
          </div>
          <div className="grid-proj">
            {projects.map(p => (
              <Link key={p.title} href={p.href} aria-label={`View project: ${p.title}`} className="work-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: 160, background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Project Preview</div>
                <div style={{ padding: '1.25rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' as const }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <h3 className="font-serif" style={{ fontSize: 'var(--text-xl)', fontWeight: 400, lineHeight: 1.25, marginBottom: '0.25rem' }}>{p.title}</h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.6rem' }}>{p.company}</p>
                  <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-muted)', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>{p.desc}</p>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--accent)', fontWeight: 500 }}>View project →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
