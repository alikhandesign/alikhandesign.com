import Image from 'next/image'
import Link from 'next/link'

const metrics = [
  { company: 'Via Benefits', value: '45%', desc: 'Faster time-to-convert after replacing a product-first gate with an identity-driven enrollment flow.', link: '/work/people-first' },
  { company: 'WTW', value: '1 day → min', desc: 'Research synthesis time slashed using an agentic AI pipeline with 95% categorization accuracy.', link: '/work/ai-agent' },
  { company: 'Signify Health', value: '73 NPS', desc: 'Post-visit member satisfaction score for a program whose scheduling portal I redesigned to remove trust and access barriers.', link: '/work/ihe-portal' },
]

const featured = [
  { tag: 'Case Study', title: 'People-First Enrollment Redesign', desc: 'Dismantling a legacy product-first gate to drive a 15% lift in total enrollments and 45% faster time-to-convert.', meta: 'Via Benefits · UX Research + Design', href: '/work/people-first' },
  { tag: 'Case Study', title: 'Participant Listening Agent', desc: 'An agentic AI pipeline that automated qualitative synthesis — reducing a full day of analysis to minutes with 95% accuracy.', meta: 'WTW · Agentic Workflow Design', href: '/work/ai-agent' },
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
            <p className="eyebrow" style={{ marginBottom: '1.25rem' }}>Senior Product Designer & Researcher</p>
            <h1 className="font-serif hero-title" style={{ fontSize: '3.2rem', lineHeight: 1.1, color: 'var(--text)', marginBottom: '1.25rem', fontWeight: 400 }}>
              Designing systems that make research{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>scale.</em>
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2rem' }}>
              I help product teams understand their users at scale — combining mixed-methods research, strategic synthesis, and AI-native workflows to turn insight into action.
            </p>
            <Link href="/work" className="btn-primary">View My Work →</Link>
          </div>
          <div className="hero-img-wrap" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/images/ali.jpg"
              alt="Ali Khan smiling with his dog Chappie in a park"
              width={340} height={400}
              className="hero-img"
              style={{ objectFit: 'cover', objectPosition: 'center top', borderRadius: 'var(--radius)' }}
              priority
            />
            <div style={{ position: 'absolute', bottom: '-1.5rem', left: '-1rem', background: 'var(--bg)', border: '1px solid var(--border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Based in</div>
              <div className="font-serif" style={{ fontSize: 22, color: 'var(--accent)', lineHeight: 1.2 }}>Austin, TX</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <div className="pillars-strip" style={{ background: 'var(--bg)' }}>
        {['Mixed-Methods Research', 'AI-Native Workflows', 'Systems Thinking & Roadmap Influence'].map(p => (
          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: 13, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, display: 'block' }} />
            {p}
          </div>
        ))}
      </div>

      {/* Metrics */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad">
        <p className="section-label">Impact</p>
        <h2 className="font-serif section-title" style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '3rem', lineHeight: 1.15 }}>Work that moves the needle.</h2>
        <div className="grid-3">
          {metrics.map(m => (
            <article key={m.company} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem 1.75rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
              <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 500 }}>{m.company}</p>
              <p className="font-serif" style={{ fontSize: '2.8rem', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>{m.value}</p>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>{m.desc}</p>
              <Link href={m.link} style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Read the case study →</Link>
            </article>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* Featured Work */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad">
        <p className="section-label">Featured Work</p>
        <h2 className="font-serif section-title" style={{ fontSize: '2.2rem', fontWeight: 400, marginBottom: '3rem', lineHeight: 1.15 }}>Research in action.</h2>
        <div className="grid-2">
          {featured.map(f => (
            <Link key={f.title} href={f.href} className="work-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{ width: '100%', height: 200, background: 'var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Case Study Preview</div>
              <div style={{ padding: '1.5rem' }}>
                <span className="tag-cs" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>{f.tag}</span>
                <h3 className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 400, lineHeight: 1.25, marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{f.desc}</p>
                <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 500 }}>{f.meta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Strip */}
      <section className="dark-section" style={{ background: 'var(--dark-bg)', padding: '4rem 3rem' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>About Me</p>
              <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--bg)', lineHeight: 1.2, marginBottom: '1rem' }}>I design for the questions, not just the answers.</h2>
              <p style={{ fontSize: 15, color: 'var(--bg)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                With 10+ years in product design and UX research, I learned that the most valuable work happens before the first wireframe — understanding why people behave the way they do, and building systems that listen at scale.
              </p>
              <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--bg)', textDecoration: 'none', fontSize: 14, fontWeight: 500, borderBottom: '1px solid var(--accent)', paddingBottom: 2 }}>
                Read my full story →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {values.map(v => (
                <div key={v.name} style={{ padding: '1.1rem 1.1rem 1.1rem 1.25rem', borderLeft: '3px solid var(--accent)', background: 'var(--dark-surface)', borderRadius: '0 4px 4px 0' }}>
                  <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--bg)', fontWeight: 600, marginBottom: '0.35rem' }}>{v.name}</p>
                  <p style={{ fontSize: 13, color: '#C4BDB7', lineHeight: 1.5 }}>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
