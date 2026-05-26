import Image from 'next/image'
import Link from 'next/link'

const pillars = [
  { num: '01', title: 'Think like the user, not the business', text: 'The most common gap I find in products isn\'t bad aesthetics or broken flows. It\'s a mismatch between how the business thinks about its product and how users actually experience it. I listen for that mismatch first. Not just by analyzing metrics, but by sitting with people and hearing how they describe their own experience in their own words. Once you hear it, you can\'t unhear it. My job is to close that gap, so the system does the hard work, not the user.' },
  { num: '02', title: 'Design for the hardest user first', text: 'I don\'t design for the ideal user, the one who arrives informed, confident, and unhurried. I design for the most overwhelmed, least experienced person in the room. If the product works for them, it works for everyone. If it doesn\'t, the design isn\'t finished.' },
  { num: '03', title: 'Design solves, it doesn\'t complicate', text: 'The best solutions I\'ve built didn\'t add a new step to someone\'s workflow. They removed one. Good design should reduce the burden on the people using it, whether that\'s a Medicare enrollee trying to find the right health plan, a UX researcher drowning in qualitative data, or a clinician reading test results under time pressure. If my design makes someone\'s day harder, even slightly, I haven\'t finished the job yet.' },
]

const aiPrinciples = [
  { title: 'Trust over smart', text: 'An AI that feels trustworthy is more valuable than one that feels impressive. Reliability and honesty come first.' },
  { title: 'Transparency by design', text: 'Users should always know what the AI is doing, why, and what to do when it\'s wrong. Uncertainty is a UI problem.' },
  { title: 'Ethical use as a constraint', text: 'Not an afterthought. Privacy, fairness, and responsible use are design requirements, not legal disclaimers.' },
  { title: 'Scale what humans do well', text: 'AI should amplify human judgment, not replace it. The goal is a better team, not a smaller one.' },
]

export default function AboutPage() {
  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <header className="page-header">
          <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>About Me</p>
          <h1 className="font-serif page-title-lg" style={{ fontSize: '2.8rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.75rem' }}>The person behind the work.</h1>
          <p style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 580 }}>Senior Product Designer and Researcher. Open to remote and in-person opportunities anywhere.</p>
        </header>
      </div>

      {/* Opener */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
        <div className="grid-2-wide" style={{ alignItems: 'start' }}>
          <div>
            {["I didn't start my career knowing I wanted to be a designer. I started it asking questions. Why do people make the decisions they make? What gets in their way? What would need to be true for things to feel effortless?", "Turns out, that's exactly what design is. Ten years in, I'm still asking the same questions, just with better tools, sharper instincts, and a lot more scar tissue from navigating legacy systems and stakeholder politics.", "I'm a Senior Product Designer and Researcher who specializes in the space between research and strategy, turning what users tell me into decisions that actually move products forward."].map((p, i) => (
              <p key={i} style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: i < 2 ? '1.25rem' : 0 }}>{p}</p>
            ))}
          </div>
          <div className="hero-img-wrap">
            <Image src="/images/ali-loverboy.jpg" alt="Ali Khan with his dog Loverboy" width={480} height={420} style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'center top', borderRadius: 'var(--radius)' }} />
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center', letterSpacing: '0.02em' }}>Me and Loverboy</p>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Philosophy */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
        <p className="section-label">Design Philosophy</p>
        <h2 className="font-serif section-title" style={{ fontSize: '2rem', fontWeight: 400, marginBottom: '1.75rem', lineHeight: 1.15 }}>How I think about design.</h2>
        <p style={{ fontSize: 17, color: 'var(--text)', lineHeight: 1.75, marginBottom: '3rem', maxWidth: 680 }}>The best design is the kind nobody notices. It just works. Getting there though requires a specific way of seeing problems, and over ten years I've found it comes down to three things.</p>
        <div>
          {pillars.map((p, i) => (
            <div key={p.num} className="pillar-grid" style={{ padding: '2.5rem 0', borderTop: '1px solid var(--border)', ...(i === pillars.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}) }}>
              <div>
                <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--accent)', fontWeight: 500, marginBottom: '0.5rem' }}>{p.num}</p>
                <h3 className="font-serif" style={{ fontSize: '1.4rem', fontWeight: 400, lineHeight: 1.2 }}>{p.title}</h3>
              </div>
              <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8 }}>{p.text}</p>
            </div>
          ))}
        </div>
        <p className="font-serif" style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--text)', marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)', lineHeight: 1.4, maxWidth: 600 }}>
          "I'll take a product that works over one that looks good, every time."
        </p>
      </section>

      {/* AI Mindset */}
      <section className="dark-section" style={{ background: 'var(--dark-bg)', padding: '4rem 3rem' }}>
        <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
          <div className="grid-2-wide" style={{ alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4BDB7', fontWeight: 500, marginBottom: '0.75rem' }}>AI-Native Mindset</p>
              <h2 className="font-serif" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--bg)', lineHeight: 1.15, marginBottom: '1.75rem' }}>AI that earns its place on the team.</h2>
              {["AI doesn't intimidate me, it excites me. But not uncritically.", "I've built agentic research pipelines from scratch. I've seen what happens when AI gets deployed without a validation framework, without transparency, without a human in the loop.", "The thing that frustrates me most about AI products is false confidence. When a system gives me a wrong answer like it's completely certain, that's a design failure. Not just a technical one.", "My goal is always the same: AI that scales what humans do well, that knows its limits, and signals them clearly. AI that earns the trust of the people using it."].map((p, i, arr) => (
                <p key={i} style={{ fontSize: 15, color: 'var(--bg)', lineHeight: 1.8, marginBottom: i < arr.length - 1 ? '1.25rem' : 0 }}>{p}</p>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '0.5rem' }}>
              {aiPrinciples.map(ap => (
                <div key={ap.title} style={{ padding: '1.25rem 1.25rem 1.25rem 1.5rem', borderLeft: '3px solid var(--accent)', background: 'var(--dark-surface)', borderRadius: '0 4px 4px 0' }}>
                  <p style={{ fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase' as const, color: 'var(--bg)', fontWeight: 600, marginBottom: '0.35rem' }}>{ap.title}</p>
                  <p style={{ fontSize: 13, color: '#C4BDB7', lineHeight: 1.6 }}>{ap.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Beyond */}
      <section style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }} className="section-pad-md">
        <div className="grid-2-wide" style={{ alignItems: 'start' }}>
          <div>
            <p className="section-label">Beyond the Work</p>
            <h2 className="font-serif section-title" style={{ fontSize: '2rem', fontWeight: 400, lineHeight: 1.15, marginBottom: '1.75rem' }}>When I'm not designing.</h2>
            {["When I'm not designing, I'm usually outside. Camping, hiking, overlanding. I've spent the last few years working remotely and using that freedom to explore. Chappie, my dog, has strong opinions about all of it.", "I care a lot about animals. I volunteer with Austin Pets Alive, Animal Haven, and the ASPCA. I also do pro bono design work through the Taproot Foundation, because good design shouldn't only be available to organizations that can afford it.", "I'm also into horror fiction, cooking, films, art, and video games, roughly in that order depending on the week."].map((p, i, arr) => (
              <p key={i} style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: i < arr.length - 1 ? '1.25rem' : 0 }}>{p}</p>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '2rem', position: 'relative', overflow: 'hidden', width: '100%' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
              <p className="eyebrow" style={{ marginBottom: '0.6rem' }}>Open to Opportunities</p>
              <h3 className="font-serif" style={{ fontSize: '1.6rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '0.75rem' }}>Let's work together.</h3>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.75rem' }}>I'm actively looking for senior product design and AI-focused roles. If you think there's a fit, I'd love to talk.</p>
              <a href="mailto:ali@alikhandesign.com" className="btn-primary">Get in touch <span aria-hidden="true">→</span></a>
              <Link href="/work" style={{ display: 'block', marginTop: '1rem', fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>View my work instead →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
