import Link from 'next/link'

const caseStudies = [
  { title: 'AI Feedback & Insights Agent', company: 'Willis Towers Watson', tags: ['Agentic Workflow Design', 'AI Design'], desc: 'Designed and deployed an agentic AI research pipeline that automated qualitative synthesis — transforming raw user feedback into structured, actionable insights with 95% categorization accuracy and eliminating a full day of manual analysis.', outcomes: [{ val: '95%', label: 'Categorization accuracy' }, { val: '1 day → min', label: 'Synthesis time reduction' }], disciplines: 'AI Design · Agentic Workflow · Qualitative Research', href: '/work/ai-agent' },
  { title: 'People-First Enrollment Redesign', company: 'Via Benefits · WTW', tags: ['UX Research', 'Product Strategy'], desc: 'Dismantled a legacy product-first gate causing cognitive overwhelm and high abandonment — replacing it with an identity-driven enrollment flow that drove a 15% lift in total enrollments and 45% faster time-to-convert.', outcomes: [{ val: '45%', label: 'Faster time-to-convert' }, { val: '15%', label: 'Lift in enrollments' }, { val: '50%', label: 'Reduction in rage clicks' }], disciplines: 'UX Research · Product Design · Stakeholder Strategy', href: '/work/people-first' },
  { title: 'IHE Scheduling Portal', company: 'Signify Health · CVS Health', tags: ['UX Research', 'UX Design'], desc: 'Led mixed-methods research to uncover why members declined free in-home health evaluations — findings that directly informed a trust-first scheduling portal redesign.', outcomes: [{ val: '73 NPS', label: 'Post-visit satisfaction' }, { val: '3.5M+', label: 'Annual IHEs completed' }, { val: '6', label: 'Barrier categories identified' }], disciplines: 'Mixed-Methods Research · UX Design · Trust Strategy', href: '/work/ihe-portal' },
]

const projects = [
  { title: 'Optimizing the Ancillary Insurance Journey', company: 'Willis Towers Watson', tags: ['Usability Research', 'Mixed-Methods Research'], desc: 'A qualitative deep dive into how Medicare enrollees navigate dental, vision, and hearing coverage — identifying comprehension gaps and friction points.', href: '/work/ancillary-journey' },
  { title: 'Vivio Clinical App', company: 'Ventric Health', tags: ['Product Design', 'Design Systems', 'Native iOS'], desc: 'Designed a native iOS clinical application for Vivio — a non-invasive heart failure diagnostic tool — with a complete design system and 20+ error states.', href: '/work/vivio' },
  { title: 'Signify Health Rebrand', company: 'Signify Health', tags: ['Brand Design', 'Web Design'], desc: 'Led a full brand refresh in partnership with W2O Group, resulting in a 50% increase in total website traffic.', href: '/work/signify-rebrand' },
  { title: 'LLM Prompt Engineering for Website Audits', company: 'Willis Towers Watson', tags: ['AI Workflow', 'AI Design'], desc: 'Engineered a structured prompt framework for using large language models to conduct UX website audits.', href: '/work/llm-prompts' },
  { title: 'Design Handoff Checklist', company: 'Willis Towers Watson', tags: ['Process Design', 'Workflow Optimization'], desc: 'Developed a comprehensive design-to-development handoff checklist that reduced miscommunication cycles.', href: '/work/design-handoff' },
]

export default function WorkPage() {
  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <header className="page-header">
          <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>Portfolio</p>
          <h1 className="font-serif page-title-lg" style={{ fontSize: '2.8rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.75rem' }}>My Work</h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580 }}>10+ years of product design and UX research — from AI-native research pipelines to zero-to-one product ecosystems.</p>
        </header>
      </div>

      {/* Case Studies */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <h2 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 400 }}>Case Studies</h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>— 3 deep dives</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {caseStudies.map(cs => (
            <Link key={cs.title} href={cs.href} aria-label={`View case study: ${cs.title}`} className="work-card cs-card-grid" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'var(--border)', minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Project Preview</div>
              <div style={{ padding: '2rem 2rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.9rem', flexWrap: 'wrap' as const }}>
                    <span className="tag-cs">Case Study</span>
                    {cs.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '0.25rem' }}>{cs.title}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.85rem' }}>{cs.company}</p>
                  <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{cs.desc}</p>
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' as const, marginBottom: '1.5rem' }}>
                    {cs.outcomes.map(o => (
                      <div key={o.label}>
                        <div className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--accent)', lineHeight: 1 }}>{o.val}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.4 }}>{o.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap' as const, gap: '0.75rem' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{cs.disciplines}</span>
                  <span style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500 }}>Read case study →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Projects */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
          <h2 className="font-serif" style={{ fontSize: '1.5rem', fontWeight: 400 }}>Projects</h2>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>— 5 selected works</span>
        </div>
        <div className="grid-proj">
          {projects.map(p => (
            <Link key={p.title} href={p.href} aria-label={`View project: ${p.title}`} className="work-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', height: 160, background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Project Preview</div>
              <div style={{ padding: '1.25rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' as const }}>
                  {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.1rem', fontWeight: 400, lineHeight: 1.25, marginBottom: '0.25rem' }}>{p.title}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '0.6rem' }}>{p.company}</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, flex: 1, marginBottom: '1rem' }}>{p.desc}</p>
                <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>View project →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
