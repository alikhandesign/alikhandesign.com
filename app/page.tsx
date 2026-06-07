import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from './components/SectionLabel'
import MetricCard from './components/MetricCard'
import FeaturedProjectCard from './components/FeaturedProjectCard'
import CalloutCard from './components/CalloutCard'

const metrics = [
  { company: 'Via Benefits', value: '45%', desc: 'Faster time-to-convert after replacing a product-first gate with an identity-driven enrollment flow.', link: '/work/people-first' },
  { company: 'WTW', value: '8 hrs → 8 min', desc: 'Research synthesis time slashed using an agentic AI pipeline with 95% categorization accuracy.', link: '/work/ai-agent' },
  { company: 'Signify Health', value: '73 NPS', desc: 'Post-visit member satisfaction score for a program whose scheduling portal I redesigned to remove trust and access barriers.', link: '/work/ihe-portal' },
]

const featured = [
  { type: 'Case Study' as const, title: 'People-First Enrollment Redesign', company: 'Via Benefits · WTW', desc: 'Dismantling a legacy product-first gate to drive a 15% lift in total enrollments and 45% faster time-to-convert.', href: '/work/people-first' },
  { type: 'Case Study' as const, title: 'AI Feedback & Insights Agent', company: 'WTW', desc: 'An agentic AI pipeline that automated qualitative synthesis — reducing a full day of analysis to minutes with 95% accuracy.', href: '/work/ai-agent' },
]

const values = [
  { name: 'Empathy', text: 'Learned through research, not assumed.' },
  { name: 'Curiosity', text: 'Lifelong student of people and systems.' },
  { name: 'Honesty', text: 'Data as a mediator, not decoration.' },
  { name: 'Giving Back', text: 'Volunteering, fostering, pro bono work.' },
]

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem' }}>
        <div className="grid-2" style={{ paddingTop: '5rem', paddingBottom: '4rem', alignItems: 'center' }}>
          <div>
            <p className="eyebrow">Senior Product Designer & Researcher</p>
            <h1 className="font-serif hero-title" style={{ fontSize: '3rem', lineHeight: 1.1, color: 'var(--text)', marginBottom: '1.25rem', fontWeight: 400 }}>
              Designing systems that make research{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>scale.</em>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2rem' }}>
              I help product teams understand their users at scale — combining mixed-methods research, strategic synthesis, and AI-native workflows to turn insight into action.
            </p>
            <Link href="/work" className="btn-primary">View my work <span aria-hidden="true">→</span></Link>
          </div>
          <div className="hero-img-wrap" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/images/ali.jpg"
              alt="Ali Khan"
              width={340} height={400}
              className="hero-img"
              style={{ objectFit: 'cover', objectPosition: '75% top', borderRadius: 'var(--radius)' }}
              priority
            />
            <div style={{ position: 'absolute', bottom: '-1.5rem', left: '-1rem', background: 'var(--bg)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Status</div>
              <div className="font-serif" style={{ fontSize: 18, color: 'var(--accent)', lineHeight: 1.2 }}>Available now</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <div className="pillars-strip" style={{ background: 'var(--bg)' }}>
        {['Mixed-Methods Research', 'AI-Native Workflows', 'Systems Thinking & Roadmap Influence'].map(p => (
          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'block' }} />
            {p}
          </div>
        ))}
      </div>

      {/* Metrics */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad">
        <SectionLabel label="Impact" />
        <h2 className="font-serif section-title" style={{ fontSize: '2.25rem', fontWeight: 400, marginBottom: '3rem', lineHeight: 1.15 }}>Work that moves the needle.</h2>
        <div className="grid-3">
          {metrics.map(m => (
            <MetricCard key={m.company} company={m.company} value={m.value} description={m.desc} href={m.link} />
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Featured Work */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad">
        <SectionLabel label="Featured Work" />
        <h2 className="font-serif section-title" style={{ fontSize: '2.25rem', fontWeight: 400, marginBottom: '3rem', lineHeight: 1.15 }}>Research in action.</h2>
        <div className="grid-2">
          {featured.map(f => (
            <FeaturedProjectCard key={f.title} type={f.type} title={f.title} company={f.company} description={f.desc} href={f.href} />
          ))}
        </div>
      </section>

      {/* About Strip */}
      <section className="dark-section" style={{ background: 'var(--dark-bg)', padding: '4rem 3rem' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p className="eyebrow-dark">About Me</p>
              <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--bg)', lineHeight: 1.2, marginBottom: '1rem' }}>I design for the questions, not just the answers.</h2>
              <p style={{ fontSize: 16, color: 'var(--bg)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                With 10+ years in product design and UX research, I learned that the most valuable work happens before the first wireframe — understanding why people behave the way they do, and building systems that listen at scale.
              </p>
              <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--bg)', textDecoration: 'none', fontSize: 14, fontWeight: 500, borderBottom: '1px solid var(--accent)', paddingBottom: 2 }}>
                Read my full story →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {values.map(v => (
                <CalloutCard key={v.name} title={v.name} body={v.text} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
