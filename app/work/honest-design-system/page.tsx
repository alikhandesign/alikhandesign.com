'use client'
import Link from 'next/link'
import Image from 'next/image'
import SideNav from '@/app/components/SideNav'
import CTAStrip from '@/app/components/CTAStrip'
import ContactModal from '@/app/components/ContactModal'
import { CaseStudyImage } from '@/app/components/Lightbox'
import { useState } from 'react'

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>
      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Context</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>A portfolio that needed to mean something</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>When I decided to rebuild my portfolio from scratch, the question was never what to show. The question was whether the portfolio itself would hold up as a piece of craft. Most designer portfolios are built on templates — fine for shipping quickly, not so useful when the portfolio is supposed to demonstrate exactly what you can do.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85 }}>I wanted the site to feel like me: warm but not precious, structured but not rigid, and honest about what it is. A template couldn't get there. A design system built specifically for this context could.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', margin: '2rem 0', padding: '1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}>
          {[
            ['My Role', 'Designer and engineer'],
            ['Stack', 'Next.js, React, TypeScript, CSS custom properties, Storybook'],
            ['Timeline', '2025–2026'],
            ['Status', 'Deployed to production'],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>{label}</p>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text)', fontWeight: 500, lineHeight: 1.5 }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="the-decision" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">The Decision</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Why build a system instead of a site</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Building a design system for a portfolio is, on its face, overkill. But the alternative — designing components ad hoc and hoping they cohere — produces exactly the kind of inconsistency I spend my professional life trying to fix for other teams.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>More practically: I wanted the site's code and Figma documentation to match 1:1. That only works if the design decisions are made deliberately, captured as tokens, and implemented consistently. That's a design system, whether you call it one or not.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85 }}>The name Honest came from my design philosophy: I build trust through evidence, not aesthetics. The system should be exactly what it claims to be. No decorative tokens. No components that exist for appearance only. Everything earns its place.</p>
        <div style={{ borderLeft: '3px solid var(--color-accent)', padding: '1.25rem 1.5rem', margin: '2rem 0', background: 'var(--color-surface)', borderRadius: '0 4px 4px 0' }}>
          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--color-text)', lineHeight: 1.5, fontStyle: 'italic' }}>The constraint that sharpened every decision: if a component doesn't exist on this site, it doesn't exist in the system.</p>
        </div>
      </section>

      <section id="token-architecture" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">Token Architecture</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Two layers: primitives and semantics</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The token architecture has two layers. Primitive tokens define the raw values: hex colors, rem sizes, numeric weights. Semantic tokens map those primitives to intent: <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-base)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>--text-muted</code> is a semantic token that resolves to <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-base)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>#6B6560</code>. Components always reference semantic tokens, never raw values.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>This separation means that if the palette changes, the swap happens in one place. It also makes Figma documentation straightforward: every token in the Figma library maps directly to a CSS custom property, by name.</p>
        <div style={{ background: 'var(--color-bg-dark)', borderRadius: 'var(--radius)', padding: '1.5rem', margin: '2rem 0', overflowX: 'auto' as const }}>
          <pre style={{ fontSize: 'var(--text-sm)', color: '#C4BDB7', lineHeight: 1.7, fontFamily: 'monospace', margin: 0 }}>{`/* Primitives */
--red-800: #89181A;
--warm-50: #FAF8F5;

/* Semantics */
--color-accent:  var(--red-800);
--color-bg:      var(--warm-50);`}</pre>
        </div>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '2rem' }}>All spacing, typography, color, motion, and radius values are tokenized. There are no magic numbers in component code.</p>
        <CaseStudyImage
          src="/images/honest-ds-tokens.png"
          alt="Honest Design System token architecture in Figma — primitive and semantic layers side by side"
          caption="Primitive tokens (left) and semantic tokens (right) in the Figma library. Every CSS custom property has a matching Figma variable by name."
        />
      </section>

      <section id="type-and-spacing" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">Type and Spacing</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Rem-based, predictable, and purposeful</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The type scale is rem-based with a 16px root. Every size from <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-base)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>--text-xs</code> (12px) to <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-base)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>--text-5xl</code> (48px) is a named token. This makes the type scale accessible — it inherits user browser preferences rather than overriding them — and consistent across every component.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Two typefaces: DM Serif Display for headings, Inter for UI text. The pairing was chosen for contrast and warmth. Serif headings carry weight without formality. Inter handles small sizes and data cleanly without drawing attention to itself.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Letter spacing is one of the details that most design systems underspecify. Honest has three explicit values: <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-base)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>sm</code> (0.02em, nav links), <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-base)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>md</code> (0.08em, tags and callout titles), and <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-base)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>lg</code> (0.12em, eyebrows and section labels). Each scale value is tied to a specific use case, not used interchangeably.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['sm', '0.02em', 'Nav links'],
            ['md', '0.08em', 'Tags, callout titles'],
            ['lg', '0.12em', 'Eyebrows, section labels'],
          ].map(([name, val, use]) => (
            <div key={name} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: '1rem' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontFamily: 'monospace', color: 'var(--color-accent)', marginBottom: '0.35rem' }}>--letter-spacing-{name}</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 500, letterSpacing: val, textTransform: 'uppercase' as const, color: 'var(--color-text)', marginBottom: '0.35rem' }}>Sample</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{val} · {use}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="component-decisions" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">Component Decisions</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>19 components, each with a reason to exist</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The component inventory came from the site itself, not from a wishlist. Every component in the system has a live instance somewhere on the site. If a component was proposed during build and couldn't be placed, it was cut.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '2rem' }}>Two components are worth calling out because the decisions behind them reflect the system's philosophy:</p>

        <CaseStudyImage
          src="/images/honest-ds-cards.png"
          alt="MetricCard, FeaturedProjectCard, and CaseStudyCard components in Figma — default and hover states"
          caption="Card components in both light and dark states. Each variant is documented in Figma and has a corresponding Storybook story."
        />

        <div style={{ margin: '2rem 0' }}>
          <div style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}>
            <p style={{ fontSize: 'var(--text-sm)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.5rem' }}>ContactModal</p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>The contact flow uses a modal with form fields rather than a mailto link. Mailto opens a local email client — a reasonable assumption in 2012, not in 2026, when a growing percentage of people have no default mail client configured. A modal keeps the interaction in-context, works on every device, and gives me control over the experience. The tradeoff is complexity; the reason to accept that tradeoff is user reliability.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)' }}>
            <p style={{ fontSize: 'var(--text-sm)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.5rem' }}>PasswordGate</p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>Several case studies contain work done under NDA or for clients whose data is sensitive. Rather than omit this work entirely or publish it without protection, PasswordGate provides controlled access. The pattern is intentionally low-friction for people with the password and appropriately blocked for those without one. It's a designed decision about information architecture, not just a lock on a door.</p>
          </div>
        </div>

        <CaseStudyImage
          src="/images/honest-ds-password-gate.png"
          alt="PasswordGate component in Figma showing the locked state with password input and access request link"
          caption="PasswordGate in Figma. The component exposes a title, description, bullet list of contents, and password field — all configurable per case study."
        />
      </section>

      <section id="accessibility" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">Accessibility</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>WCAG 2.1 AA across every component</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Accessibility was a first-class requirement, not a post-build audit. All 35 WCAG 2.1 Level AA criteria pass. Lighthouse scores 100 on both desktop and mobile across all pages. Zero axe-reported errors. A full VoiceOver and keyboard audit was completed and documented.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>One known gap: SideNavigation does not currently implement an <code style={{ fontFamily: 'monospace', fontSize: 'var(--text-base)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>aria-live</code> region for active section announcements to screen reader users. This is documented, de-prioritized (the component is decorative navigation, not primary wayfinding), and on the backlog.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['WCAG 2.1 AA', '35/35 criteria pass'],
            ['Lighthouse', '100 desktop and mobile'],
            ['axe', 'Zero reported errors'],
            ['Manual audit', 'VoiceOver + keyboard complete'],
          ].map(([metric, detail]) => (
            <div key={metric} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--color-accent)' }} />
              <p style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.25rem' }}>{metric}</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{detail}</p>
            </div>
          ))}
        </div>
        <CaseStudyImage
          src="/images/honest-ds-lighthouse.png"
          alt="Lighthouse audit showing 100 scores across Performance, Accessibility, Best Practices, and SEO"
          caption="Lighthouse 100 across all four categories. Scores are consistent across desktop and mobile on every page."
        />
      </section>

      <section id="storybook" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">Storybook</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Documentation as a live artifact</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Every component in the system has a corresponding Storybook story. Stories document the component's props, variants, states, and intended use cases. The Storybook instance is deployed publicly at <a href="https://honest-design-system.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 500 }}>honest-design-system.vercel.app</a>.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '2rem' }}>The Storybook serves a specific purpose for this project: it lets a hiring manager or collaborator inspect the system in isolation, separate from the portfolio site. You can see how each component behaves across its states without navigating the site to find an instance. That's the difference between documentation and evidence.</p>
        <CaseStudyImage
          src="/images/honest-ds-storybook.png"
          alt="Storybook showing a component story with controls panel open — props, variants, and states documented"
          caption="The Storybook instance at honest-design-system.vercel.app. Every component has a story; every story has documented controls."
        />
      </section>

      <section id="figma-parity" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <p className="section-label">Figma Parity</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>Design leads code, not the other way around</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The Figma component library matches the production codebase 1:1. Token names, component names, prop names, and variant names are identical across both environments. This isn't just for neatness — it removes ambiguity in handoff and makes the Figma library useful as a reference for development, not just a source of screenshots.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '2rem' }}>One deliberate constraint: Figma design decisions lead code changes, not the reverse. When design specs change, code is updated to match. This preserves Figma as the source of truth and prevents the library from drifting from what's actually on the screen.</p>
        <CaseStudyImage
          src="/images/honest-ds-figma-components.png"
          alt="Honest Design System Figma component library showing navigation components with variants and states"
          caption="The Figma component library. Component names, variant names, and token references match production code exactly."
        />
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <p className="section-label">The Reflection</p>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 400, lineHeight: 1.2, marginBottom: '1.25rem' }}>What a design system built for one teaches you</h2>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>Building a design system at enterprise scale means negotiating with constraints you didn't set — existing codebases, engineering capacity, legacy decisions, competing roadmap priorities. Building one for a single site means every constraint is your own. That's clarifying.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85, marginBottom: '1.25rem' }}>The decisions I made under pressure in larger systems — skipping token naming conventions, treating accessibility as a phase rather than a property, letting Figma and code drift — I avoided here because there was no one to negotiate with. It's easier to hold the line when you're the only person in the room.</p>
        <p style={{ fontSize: 'var(--text-md)', color: 'var(--color-text-mid)', lineHeight: 1.85 }}>The takeaway I'd bring back to a team: most design system debt isn't from bad decisions. It's from deferred decisions. The token architecture, the accessibility baseline, the Figma-to-code parity — none of it is hard to establish on day one. It's very hard to retrofit on day three hundred.</p>
      </section>
    </div>
  )
}

export default function HonestDesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <h1 style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', borderWidth: 0 }}>
        Honest Design System
      </h1>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <nav style={{ padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/work" style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>My Work</Link>
          <span style={{ fontSize: 'var(--text-base)', color: '#C4BDB7' }}>›</span>
          <span style={{ fontSize: 'var(--text-base)', color: 'var(--color-text)', fontWeight: 500 }}>Honest Design System</span>
        </nav>

        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            <span className="tag-cs">Case Study</span>
            <span className="tag">Design Systems</span>
            <span className="tag">Design Technologist</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>Honest Design System</h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-muted)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Personal · 2025–2026</p>
          <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-text)', lineHeight: 1.7, maxWidth: 680 }}>Most portfolio sites are built on templates. This one is built on a design system — 19 components, a two-layer token architecture, and a Figma library that matches production code 1:1.</p>
        </header>
      </div>

      {/* Hero image */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <CaseStudyImage
          src="/images/honest-ds-hero.png"
          alt="Honest Design System — component library overview showing cards, navigation, and tag components in Figma"
        />
      </div>

      {/* Metrics bar */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' as const, borderBottom: '1px solid var(--color-border)' }}>
        {[
          ['19', 'Components'],
          ['WCAG 2.1 AA', 'Accessibility standard'],
          ['100', 'Lighthouse score'],
          ['1:1', 'Figma-to-code parity'],
        ].map(([val, label]) => (
          <div key={label}>
            <div className="font-serif" style={{ fontSize: '2.25rem', color: 'var(--color-accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginTop: 4, lineHeight: 1.4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Article body */}
      <div className="article-layout" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 3rem' }}>
        <SideNav sections={[
          'the-context',
          'the-decision',
          'token-architecture',
          'type-and-spacing',
          'component-decisions',
          'accessibility',
          'storybook',
          'figma-parity',
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
          <p style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>Next Case Study</p>
          <p className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 400 }}>AI Feedback & Insights Agent</p>
        </div>
        <Link href="/work/ai-agent" style={{ fontSize: 'var(--text-base)', color: 'var(--color-accent)', fontWeight: 500, textDecoration: 'none' }}>View project →</Link>
      </div>

      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}
