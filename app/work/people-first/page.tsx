import Link from 'next/link'
import PasswordGate from '@/app/components/PasswordGate'
import SideNav from '@/app/components/SideNav'

const INSIDE = [
  'FullStory analysis and rage click findings',
  'User interview synthesis and key insights',
  'The Head of Product stakeholder presentation',
  'Before and after design comparisons',
  'Minimal Viable Identity framework',
  'Full outcome metrics and business impact',
]

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>
      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Context</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>A legacy product built for the business, not the user</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Via Benefits is Willis Towers Watson's individual benefits marketplace, used by Medicare-eligible retirees to shop for health insurance coverage. The platform handles hundreds of thousands of enrollments annually, making every friction point in the funnel a meaningful business problem.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>I joined as the sole UX designer on the shopping experience team. My mandate was broad: improve the enrollment experience. What I found was a product designed entirely around how WTW had organized its insurance inventory, with no apparent consideration for how a retiree actually thinks about buying health insurance.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', margin: '2rem 0', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          {[['My Role', 'Lead UX Designer & Researcher'], ['Timeline', 'Q2 2023'], ['Team', '1 Designer, 1 PM, 4 Engineers'], ['Methods', 'FullStory Analysis, User Interviews, Usability Testing']].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>{label}</p>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Problem</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>A technical gate that stopped users before they could start</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The first thing a user encountered on the Via Benefits shopping site was a selector asking them to choose between Medicare Plans and Individual and Family Plans. On the surface, a reasonable starting point. In practice, a wall.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Most retirees didn't arrive with a clear sense of which insurance category they needed. They knew who they were shopping for and roughly what they needed. They didn't know the difference between a Medicare Advantage plan and a Medigap supplement, and they shouldn't have to.</p>
        <div style={{ borderLeft: '3px solid var(--accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--surface)', borderRadius: '0 4px 4px 0' }}>
          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.5, fontStyle: 'italic' }}>"They just want to see what's available for them. They don't want to answer a test question first."</p>
        </div>
      </section>

      <section id="the-research" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Research</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Diagnosing the failure with data and listening</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>I ran a dual-track research initiative. First, FullStory sessions revealed a dense cluster of rage clicks at exactly the plan type selector — users weren't just confused, they were frustrated. Second, moderated user interviews confirmed the core insight: users didn't want to select a plan category. They wanted to see what was available for someone like them.</p>
      </section>

      <section id="the-insight" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Insight</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>The product was asking users to think like the business</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The entry point was organized around WTW's product taxonomy, not around how a human being shops for insurance. The fix was clear: stop asking users what they want to buy, and start asking who they are. Age, date of birth, and zip code were all the system actually needed. Everything else was complexity we were making the user carry.</p>
        <div style={{ borderLeft: '3px solid var(--accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--surface)', borderRadius: '0 4px 4px 0' }}>
          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.5, fontStyle: 'italic' }}>The system only needed three data points to do its job. We had been asking users to do that job for us.</p>
        </div>
      </section>

      <section id="the-design" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Design</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>An identity-first entry point that removed the technical gate</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The redesigned selector led with a simple question: who are you shopping for? From there, users provided age and zip code, and the system handled eligibility filtering entirely in the background. I also designed an "Escape Hatch" for users who already knew their plan type, satisfying sophisticated users without making that the default path for everyone.</p>
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Outcomes</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Every key metric moved in the right direction</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[['45%', 'Faster time-to-convert (2m 55s to 1m 36s)'], ['15%', 'Lift in total enrollments'], ['50%', 'Reduction in rage clicks'], ['33%', 'Increase in task completion']].map(([val, label]) => (
            <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
              <div className="font-serif" style={{ fontSize: '2rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.35rem' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <p className="section-label">The Reflection</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>What I'd do differently, and what I learned</h2>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The hardest part of this project wasn't the design. It was dismantling a belief that had calcified into institutional fact. The "Product-First mandate" everyone cited turned out to be an assumption nobody had ever verified. That's a lesson I carry into every project now: question the constraints before you design within them.</p>
        <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85 }}>If I were doing this project again, I'd move to stakeholder alignment earlier. And I'd push harder for qualitative follow-up research after launch — the metrics told us what changed, but not how users felt about the new experience.</p>
      </section>
    </div>
  )
}

export default function PeopleFirstPage() {
  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <nav style={{ padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/work" style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>My Work</Link>
          <span style={{ fontSize: 13, color: '#C4BDB7' }}>›</span>
          <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>People-First Enrollment Redesign</span>
        </nav>

        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            <span className="tag-cs">Case Study</span>
            <span className="tag">UX Research</span>
            <span className="tag">Product Strategy</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>People-First Enrollment Redesign</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Via Benefits · WTW · 2023</p>
          <p style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.7, maxWidth: 680 }}>What happens when a product is designed around how the business works instead of how people think? For Medicare enrollees navigating health insurance, the answer was abandonment, frustration, and a flood of support calls that didn't need to happen.</p>
        </header>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <div style={{ width: '100%', height: 400, background: 'var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Hero Project Image</div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)' }}>
        {[['45%', 'Faster time-to-convert'], ['15%', 'Lift in total enrollments'], ['50%', 'Reduction in rage clicks'], ['33%', 'Increase in task completion']].map(([val, label]) => (
          <div key={label}>
            <div className="font-serif" style={{ fontSize: '2.4rem', color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 3rem', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '5rem', alignItems: 'start' }}>
        <SideNav sections={["the-context", "the-problem", "the-research", "the-insight", "the-design", "the-outcomes", "the-reflection"]} />

        <div>
          <PasswordGate
            password="4likh4n"
            title="Ready to see how it came together?"
            cta="The full case study walks through the research diagnosis, the stakeholder pivot, the design decisions, and the outcomes in detail."
            inside={INSIDE}
          >
            <FullCaseStudy />
          </PasswordGate>
        </div>
      </div>

      <div className="divider" />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '2.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '1rem' }}>
        <div>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>Next Case Study</p>
          <p className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 400 }}>AI Feedback & Insights Agent</p>
        </div>
        <Link href="/work/ai-agent" style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>View project →</Link>
      </div>
    </main>
  )
}
