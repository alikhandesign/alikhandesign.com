'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import ContactModal from '../components/ContactModal'
import CalloutCard from '../components/CalloutCard'
import SectionLabel from '../components/SectionLabel'
import Heading from '../components/Heading'

const pillars = [
  { num: '01', title: 'Think like the user, not the business', text: "The most common gap I find in products isn't bad aesthetics or broken flows. It's a mismatch between how the business thinks about its product and how users actually experience it. I listen for that mismatch first. Not just by analyzing metrics, but by sitting with people and hearing how they describe their own experience in their own words. Once you hear it, you can't unhear it. My job is to close that gap, so the system does the hard work, not the user." },
  { num: '02', title: 'Design for the hardest user first', text: "I don't design for the ideal user, the one who arrives informed, confident, and unhurried. I design for the most overwhelmed, least experienced person in the room. If the product works for them, it works for everyone. If it doesn't, the design isn't finished." },
  { num: '03', title: "Design solves, it doesn't complicate", text: "The best solutions I've built didn't add a new step to someone's workflow. They removed one. Good design should reduce the burden on the people using it, whether that's a Medicare enrollee trying to find the right health plan, a UX researcher drowning in qualitative data, or a clinician reading test results under time pressure. If my design makes someone's day harder, even slightly, I haven't finished the job yet." },
]

const linkStyle = { color: 'var(--color-accent)', textDecoration: 'underline' } as const

const aiPrinciples = [
  { title: 'Trust over smart', text: "An AI that feels trustworthy is more valuable than one that feels impressive. Reliability and honesty come first." },
  { title: 'Transparency by design', text: "Users should always know what the AI is doing, why, and what to do when it's wrong. Uncertainty is a UI problem." },
  { title: 'Ethical use as a constraint', text: 'Not an afterthought. Privacy, fairness, and responsible use are design requirements, not legal disclaimers.' },
  { title: 'Scale what humans do well', text: 'AI should amplify human judgment, not replace it. The goal is a better team, not a smaller one.' },
]

export default function AboutPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <header className="page-header">
          <SectionLabel label="About Me" />
          <Heading level={1} className="page-title-lg" lineHeight={1.1}>The person behind the work.</Heading>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)', lineHeight: 1.7, maxWidth: 580 }}>Senior Product Designer and Researcher. Open to remote and in-person opportunities anywhere.</p>
        </header>
      </div>

      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
        <div className="grid-2-wide" style={{ alignItems: 'start' }}>
          <div>
            {["I like asking people questions and actually listening to their answers. Somewhere along the way I realized that's most of what good design is.", "Ten years in, that hasn't changed. I still think it's one of the luckiest parts of this job, getting to sit with someone, hear how they actually experience a problem, and build something that makes their life a little easier.", "I'm a Senior Product Designer and Researcher who specializes in the space between research and strategy, turning what users tell me into decisions that actually move products forward."].map((p, i) => (
              <p key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: i < 2 ? '1.25rem' : 0 }}>{p}</p>
            ))}
          </div>
          <div className="hero-img-wrap">
            <Image src="/images/ali-loverboy.jpg" alt="Ali Khan" width={480} height={420} style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center top', borderRadius: 'var(--radius-sm)' }} />
          </div>
        </div>
      </section>

      <div className="divider" />

      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
        <SectionLabel label="Design Philosophy" />
        <Heading level={2} className="section-title" lineHeight={1.15}>How I think about design.</Heading>
        <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)', lineHeight: 1.75, marginBottom: '3rem', maxWidth: 680 }}>The best design is the kind nobody notices. It just works. Getting there though requires a specific way of seeing problems, and over ten years I've found it comes down to three things.</p>
        <div>
          {pillars.map((p, i) => (
            <div key={p.num} className="pillar-grid" style={{ padding: '2.5rem 0', borderTop: '1px solid var(--color-border)', ...(i === pillars.length - 1 ? { borderBottom: '1px solid var(--color-border)' } : {}) }}>
              <div>
                <p style={{ fontSize: 'var(--font-size-xs)', letterSpacing: 'var(--letter-spacing-lg)', textTransform: 'uppercase' as const, color: 'var(--color-accent)', fontWeight: 500, marginBottom: 'var(--space-2)' }}>{p.num}</p>
                <Heading level={3} size="xl" lineHeight={1.2}>{p.title}</Heading>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
                {p.num === '03' ? (
                  <>The best solutions I've built didn't add a new step to someone's workflow. They removed one. Good design should reduce the burden on the people using it, whether that's a <Link href="/work/people-first" style={linkStyle}>Medicare enrollee trying to find the right health plan</Link>, a UX researcher drowning in qualitative data, or a <Link href="/work/vivio" style={linkStyle}>clinician reading test results under time pressure</Link>. If my design makes someone's day harder, even slightly, I haven't finished the job yet.</>
                ) : p.text}
              </p>
            </div>
          ))}
        </div>
        <p className="font-serif" style={{ fontSize: 'var(--font-size-2xl)', fontStyle: 'italic', color: 'var(--color-text)', marginTop: '2.5rem', lineHeight: 1.4, textAlign: 'center' as const }}>
          "I'll take a product that works over one that looks good, every time."
        </p>
      </section>

      <section className="dark-section" style={{ background: 'var(--color-bg-dark)', padding: '4rem 3rem' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="grid-2-wide" style={{ alignItems: 'start' }}>
            <div>
              <SectionLabel label="AI Design" variant="dark" />
              <Heading level={2} color="var(--color-bg)" lineHeight={1.15}>Uncertainty is a design problem.</Heading>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-bg)', lineHeight: 1.8, marginBottom: '1.25rem' }}>The thing that frustrates me most about AI products is false confidence. When a system gives me a wrong answer like it's completely certain, that's a design failure. Not just a technical one.</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-bg)', lineHeight: 1.8, marginBottom: '1.25rem' }}>I felt the opposite of that building the <Link href="/work/ai-agent" style={{ color: 'var(--color-bg)', textDecoration: 'underline' }}>Participant Listening Agent</Link>. The researchers using it didn't trust it because I told them to, they trusted it once double-blind testing showed it was categorizing data at 95% accuracy and climbing. That's the bar I hold AI to: it has to earn trust the way a person does, by being right, admitting when it isn't, and showing its work.</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-bg)', lineHeight: 1.8 }}>My goal is always the same: AI that scales what humans do well, that knows its limits, and signals them clearly.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingTop: 'var(--space-2)' }}>
              {aiPrinciples.map(ap => (
                <CalloutCard key={ap.title} title={ap.title} body={ap.text} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
        <div className="grid-2-wide" style={{ alignItems: 'start' }}>
          <div>
            <SectionLabel label="Beyond the Work" />
            <Heading level={2} className="section-title" lineHeight={1.15}>When I'm not designing.</Heading>
            {["I spent two years living out of a truck, and I still spend most of my free time on the road, splitting time between cities across the country, with my copilot, my dog.", "I also care about giving back where I can. I volunteer with Austin Pets Alive, Animal Haven, and the ASPCA, and I do pro bono design work through the Taproot Foundation, because good design shouldn't only be available to organizations that can afford it.", "When I'm home, I'm drawn to anything dark — horror movies, character design, books that don't end well. I'm a goth kid at heart."].map((p, i, arr) => (
              <p key={i} style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: i < arr.length - 1 ? '1.25rem' : 0 }}>{p}</p>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: 'var(--space-8)', position: 'relative', overflow: 'hidden', width: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--color-accent)' }} />
              <SectionLabel label="Open to Opportunities" />
              <Heading level={3} size="2xl" lineHeight={1.2}>Let's work together.</Heading>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>I'm actively looking for senior product design and AI-focused roles. If you think there's a fit, I'd love to talk.</p>
              <button onClick={() => setModalOpen(true)} className="btn-primary">Get in touch <span aria-hidden="true">→</span></button>
              <Link href="/work" style={{ display: 'block', marginTop: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>View my work instead →</Link>
            </div>
          </div>
        </div>
      </section>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
