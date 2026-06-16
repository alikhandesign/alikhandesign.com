import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from './components/SectionLabel'
import MetricCard from './components/MetricCard'
import FeaturedProjectCard from './components/FeaturedProjectCard'
import CalloutCard from './components/CalloutCard'
import Heading from './components/Heading'
import { workItems, featuredMeta, getFeaturedSlugs } from './work.config'

const metrics = [
  { company: 'Via Benefits', value: '45%', desc: 'Faster time-to-convert after replacing a product-first gate with an identity-driven enrollment flow.', link: '/work/people-first' },
  { company: 'WTW', value: '8 hrs → 8 min', desc: 'Research synthesis time slashed using an agentic AI pipeline with 95% categorization accuracy.', link: '/work/ai-agent' },
  { company: 'Signify Health', value: '73 NPS', desc: 'Post-visit member satisfaction score for a program whose scheduling portal I redesigned to remove trust and access barriers.', link: '/work/ihe-portal' },
]

const values = [
  { name: 'Empathy', text: 'Learned through research, not assumed.' },
  { name: 'Curiosity', text: 'Lifelong student of people and systems.' },
  { name: 'Honesty', text: 'Data as a mediator, not decoration.' },
  { name: 'Giving Back', text: 'Volunteering, fostering, pro bono work.' },
]

export default async function Home() {
  const featuredSlugs = await getFeaturedSlugs()

  const featured = featuredSlugs
    .map(slug => {
      const item = workItems.find(w => w.slug === slug)
      const meta = featuredMeta[slug]
      if (!item || !meta) return null
      return {
        type: item.type === 'case-study' ? 'Case Study' as const : 'Project' as const,
        title: item.title,
        company: meta.company,
        desc: meta.description,
        href: `/work/${slug}`,
      }
    })
    .filter((f): f is NonNullable<typeof f> => f !== null)

  return (
    <main>
      {/* Hero */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem' }}>
        <div className="grid-2" style={{ paddingTop: '5rem', paddingBottom: '4rem', alignItems: 'center' }}>
          <div>
            <p className="eyebrow">Senior Product Designer & Researcher</p>
            <Heading level={1} size="5xl" className="hero-title" lineHeight={1.1}>
              Designing systems that make research{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>scale.</em>
            </Heading>
            <p style={{ fontSize: 'var(--font-size-md)', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
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
              style={{ objectFit: 'cover', objectPosition: '75% top', borderRadius: 'var(--radius-sm)' }}
              priority
            />
            <div style={{ position: 'absolute', bottom: '-1.5rem', left: '-1rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>Status</div>
              <div className="font-serif" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-accent)', lineHeight: 1.2 }}>Available now</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <div className="pillars-strip" style={{ background: 'var(--color-bg)' }}>
        {['Mixed-Methods Research', 'AI-Native Workflows', 'Systems Thinking & Roadmap Influence'].map(p => (
          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: 'var(--font-size-sm)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0, display: 'block' }} />
            {p}
          </div>
        ))}
      </div>

      {/* Metrics */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad">
        <SectionLabel label="Impact" />
        <Heading level={2} className="section-title" lineHeight={1.15}>Work that moves the needle.</Heading>
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
        <Heading level={2} className="section-title" lineHeight={1.15}>Research in action.</Heading>
        <div className="grid-2">
          {featured.map(f => (
            <FeaturedProjectCard key={f.href} type={f.type} title={f.title} company={f.company} description={f.desc} href={f.href} />
          ))}
        </div>
      </section>

      {/* About Strip */}
      <section className="dark-section" style={{ background: 'var(--color-bg-dark)', padding: '4rem 3rem' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <p className="eyebrow-dark">About Me</p>
              <Heading level={2} color="var(--color-bg)" lineHeight={1.2}>I design for the questions, not just the answers.</Heading>
              <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-bg)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                With 10+ years in product design and UX research, I learned that the most valuable work happens before the first wireframe — understanding why people behave the way they do, and building systems that listen at scale.
              </p>
              <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--color-bg)', textDecoration: 'none', fontSize: 'var(--font-size-sm)', fontWeight: 500, borderBottom: '1px solid var(--color-accent)', paddingBottom: 2 }}>
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
