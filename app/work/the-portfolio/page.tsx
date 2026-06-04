'use client'
import Link from 'next/link'
import SideNav from '@/app/components/SideNav'
import { CaseStudyImage } from '@/app/components/Lightbox'
import CTAStrip from '@/app/components/CTAStrip'
import ContactModal from '@/app/components/ContactModal'
import { useState } from 'react'

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid var(--accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--surface)', borderRadius: '0 4px 4px 0' }}>
      <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text)', lineHeight: 1.5, fontStyle: 'italic' }}>{children}</p>
    </div>
  )
}

function SectionIntro({ label, heading }: { label: string; heading: string }) {
  return (
    <>
      <p className="section-label">{label}</p>
      <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>{heading}</h2>
    </>
  )
}

function Body({ children, mb = true }: { children: React.ReactNode; mb?: boolean }) {
  return (
    <p style={{ fontSize: 16, color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: mb ? '1.25rem' : 0 }}>{children}</p>
  )
}

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Context" heading="Does your portfolio demonstrate how you work, or just describe it?" />
        <Body>Every designer eventually has to answer that question. For a while, mine described it. I was on Squarespace, like a lot of designers. It was fine. It looked professional. It didn't embarrass me. But it also didn't do anything a hiring manager couldn't get from reading my resume.</Body>
        <Body>The audit changed that. After spending time systematically evaluating Squarespace's AI design tools, I reached a conclusion I couldn't ignore: the platform was built for constraint, not expression. Its AI is a categorization engine wearing a personalization promise. And I had been using it to represent work that was, at its core, about breaking through exactly that kind of design mediocrity.</Body>
        <Body>The decision to build from scratch wasn't impulsive. It was the logical endpoint of the research.</Body>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', margin: '2rem 0', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          {[
            ['My Role', 'Product Designer, Design Technologist'],
            ['Stack', 'Next.js, React, Vercel, CSS custom properties, Figma'],
            ['Timeline', 'Under 2 weeks, concept to shipped'],
            ['Type', 'Self-initiated · 2026'],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>{label}</p>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Problem" heading="Portfolio sites have a homogeneity problem" />
        <Body>Not because designers lack taste, but because they all start from the same place. The same platforms, the same templates, the same AI tools making the same decisions. The output looks different on the surface and identical underneath.</Body>
        <Body>The deeper problem is that most portfolio sites are deliverables. A designer finishes their work, then builds a container to hold it. The portfolio is an artifact of a job search, not a demonstration of how the designer actually thinks.</Body>
        <Body>That framing gets the user wrong. A hiring manager isn't just looking at your work. They're trying to answer a specific question: can this person solve problems I haven't told them about yet? A portfolio that's just a gallery of past work doesn't answer that question. A portfolio that is itself evidence of product thinking does.</Body>
        <Callout>The job to be done was clear: build something that demonstrates the work in the act of existing.</Callout>
      </section>

      <section id="the-research" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Research" heading="The audit that made the decision inevitable" />
        <Body>The foundation for this project was the Squarespace audit, documented as a <Link href="/work/squarespace-redesign" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>separate case study</Link>. The short version: after testing Squarespace's AI-assisted design tools across two tracks, the platform's core failure was a gap between what it promised and what it could deliver.</Body>
        <Body>Three findings from that audit directly shaped this build:</Body>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['Templates masquerade as strategy', 'Squarespace gives you a starting point and calls it a brand identity. The starting point is fine. Calling it a brand identity is the problem. This project needed to start from actual positioning decisions, not a theme selection.'],
            ['The platform constrains the message', 'Every design decision on Squarespace exists within what Squarespace allows. For most use cases that\'s a reasonable tradeoff. For a portfolio that\'s supposed to demonstrate design capability, it\'s a ceiling on the argument you can make.'],
            ['AI used as decoration is worse than no AI', 'Features that invoke AI as a marketing claim while delivering pattern matching are not neutral. They create expectations they can\'t meet. This project needed to use AI in a way that was honest about what AI actually does.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ padding: '1.25rem 1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'var(--accent)' }} />
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>{title}</p>
              <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7, paddingLeft: '0.75rem' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="the-insight" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Insight" heading="Treat the portfolio like a product" />
        <Body>The audit produced a diagnosis. The reframe was simple.</Body>
        <Body>A product has a user — the hiring manager. A job to be done — get to the interview. And success criteria — does it move someone to reach out? It means research before decisions, not after. The design system isn't decoration, it's infrastructure. AI is a collaborator in execution, not a substitute for thinking.</Body>
        <Body>This is not a novel idea. It's just rarely applied to personal work with the same rigor applied to client work. The gap between how designers treat their own portfolios and how they'd treat a client's product is where most portfolios fail.</Body>
        <Callout>The portfolio needed to answer a question before anyone asked it: does this designer apply the same thinking to their own work that they'd apply to mine?</Callout>
      </section>

      <section id="the-design" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Design" heading="Four decisions that shaped everything" />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem' }}>Architecture first</p>
        <Body>The site is four pages: Home, My Work, About Me, and a footer-based contact section. Every navigation decision was made around the hiring manager's likely path, not around what a standard portfolio site includes. No dedicated contact page — a contact page implies the contact is the goal. The goal is the work. Contact follows from that.</Body>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem', marginTop: '1.5rem' }}>The Honest Design System</p>
        <Body>Rather than using an existing component library, this site is built on a custom design system created specifically for this project. <Link href="/work/honest-design-system" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>Honest is documented separately as its own case study.</Link> The short version: 19 components, a two-layer token architecture, full Figma-to-code parity, and a Storybook integration that makes the system auditable. Using a custom system meant every visual decision was intentional, not inherited.</Body>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem', marginTop: '1.5rem' }}>Password-gated case studies</p>
        <Body>Detailed case study content sits behind a password gate. This was a deliberate product decision: it signals the work exists without exposing it to unqualified access, creates a natural filter for serious candidates and recruiters, and positions the portfolio as something worth protecting rather than something available to anyone.</Body>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem', marginTop: '1.5rem' }}>AI as execution layer</p>
        <Body>Claude was used throughout the build for code generation, component architecture, copy editing, accessibility review, and typography decisions. The distinction that mattered: AI did not make design decisions. It executed them.</Body>
        <Body>Every page structure, every content hierarchy, every token value was decided first. Claude's job was to close the gap between the decision and the shipped component. That's a different relationship with AI than asking it to design something and accepting what it produces.</Body>
        <Callout>AI is a better collaborator when the human side of the collaboration is more rigorous. The quality of the output tracks the quality of the input — which turns out to be a design problem all the way down.</Callout>

        <CaseStudyImage
          src="/images/portfolio-site-hero.png"
          alt="alikhandesign.com homepage — hero section with photo, headline, and three pillar strip"
          caption="The finished site at alikhandesign.com. Four pages, one design system, zero templates."
        />
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Outcomes" heading="The site is the evidence" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['12+', 'Pages designed and built'],
            ['Under 2 weeks', 'Concept to shipped site'],
            ['90%', 'Reduction in annual hosting cost'],
            ['$0', 'External labor cost'],
          ].map(([val, label]) => (
            <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
              <div className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.35rem' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>
        <Body>Squarespace at approximately $144 per year replaced by Cloudflare domain registration at $10 per year and Vercel on the free tier. The savings are modest in absolute terms. The ownership is not.</Body>
        <Body mb={false}>The site itself is the primary outcome. Not as a collection of pages, but as evidence: a designer who applies product thinking to every surface they touch, including their own professional representation.</Body>
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Reflection" heading="The ceiling moves. The thinking has to move with it." />
        <Body>Building this site taught me something I already believed but hadn't tested against myself: the gap between knowing how to design and actually shipping something is where most of the real work happens.</Body>
        <Body>I have basic HTML and CSS skills. I can build things, but slowly, and not always cleanly. AI changed the equation entirely. Not because it designed anything for me, but because it removed the bottleneck between a decision and its implementation. Anything I could clearly specify, I could ship. That's a different kind of design leverage than I've had access to before.</Body>
        <Body>What surprised me was how much the product thinking framework clarified the AI collaboration. When you know exactly what you're building and why, prompts get sharper. The honest version of what AI-native workflow looks like in practice isn't a designer who prompts their way to finished screens. It's a designer who thinks more clearly because they're not limited by execution constraints.</Body>
        <Body mb={false}>I built this while job searching, after a layoff, with no external accountability. The site exists because the product thinking framework made the scope manageable. It shipped because it had a product definition. That's the whole argument.</Body>
      </section>

    </div>
  )
}

export default function ThePortfolioPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
        The Portfolio Is the Product
      </h1>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <nav style={{ padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/work" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none' }}>My Work</Link>
          <span style={{ fontSize: 14, color: '#C4BDB7' }}>›</span>
          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>The Portfolio Is the Product</span>
        </nav>

        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            <span className="tag-cs">Case Study</span>
            <span className="tag">Design Technologist</span>
            <span className="tag">AI-Native Workflow</span>
            <span className="tag">Product Thinking</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>The Portfolio Is the Product</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Self-initiated · 2026</p>
          <p style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.7, maxWidth: 680 }}>Most designers build a portfolio to show their work. I built one to demonstrate how I work — from scratch, with a custom design system, using AI as an execution layer rather than a design substitute. Under two weeks from first decision to shipped site.</p>
        </header>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <CaseStudyImage
          src="/images/portfolio-site-hero.png"
          alt="alikhandesign.com — the finished portfolio site"
        />
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)' }}>
        {[
          ['12+', 'Pages built'],
          ['< 2 weeks', 'Concept to shipped'],
          ['90%', 'Hosting cost reduction'],
          ['$0', 'External labor'],
        ].map(([val, label]) => (
          <div key={label}>
            <div className="font-serif" style={{ fontSize: '2.25rem', color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="article-layout" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 3rem' }}>
        <SideNav sections={[
          'the-context',
          'the-problem',
          'the-research',
          'the-insight',
          'the-design',
          'the-outcomes',
          'the-reflection',
        ]} />
        <FullCaseStudy />
      </div>

      <CTAStrip
        title="Interested in how this came together?"
        onContact={() => setModalOpen(true)}
      />

      <div className="divider" />
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '2.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' as const, gap: '1rem' }}>
        <div>
          <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>Next Case Study</p>
          <p className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 400 }}>Honest Design System</p>
        </div>
        <Link href="/work/honest-design-system" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>View project →</Link>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
