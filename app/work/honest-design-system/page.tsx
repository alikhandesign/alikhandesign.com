'use client'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import PullQuote from '@/app/components/PullQuote'
import { ProjectImage } from '@/app/components/Lightbox'

const SECTIONS = [
  'the-context',
  'the-decision',
  'token-architecture',
  'type-and-spacing',
  'component-decisions',
  'accessibility',
  'storybook',
  'figma-parity',
  'the-reflection',
]

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Context" heading="A portfolio that needed to mean something" />
        <Body>When I decided to rebuild my portfolio from scratch, the question was never what to show. The question was whether the portfolio itself would hold up as a piece of craft. Most designer portfolios are built on templates — fine for shipping quickly, not so useful when the portfolio is supposed to demonstrate exactly what you can do.</Body>
        <Body>I wanted the site to feel like me: warm but not precious, structured but not rigid, and honest about what it is. A template couldn't get there. A design system built specifically for this context could.</Body>
      </section>

      <section id="the-decision" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Decision" heading="Why build a system instead of a site" />
        <Body>Building a design system for a portfolio is, on its face, overkill. But the alternative — designing components ad hoc and hoping they cohere — produces exactly the kind of inconsistency I spend my professional life trying to fix for other teams.</Body>
        <Body>More practically: I wanted the site's code and Figma documentation to match 1:1. That only works if the design decisions are made deliberately, captured as tokens, and implemented consistently. That's a design system, whether you call it one or not.</Body>
        <Body>The name Honest came from my design philosophy: I build trust through evidence, not aesthetics. The system should be exactly what it claims to be. No decorative tokens. No components that exist for appearance only. Everything earns its place.</Body>
        <PullQuote>The constraint that sharpened every decision: if a component doesn't have a live instance on this site, it doesn't exist in the system.</PullQuote>
      </section>

      <section id="token-architecture" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="Token Architecture" heading="Two layers: primitives and semantics" />
        <Body>The token architecture has two layers. Primitive tokens define the raw values: hex colors, rem sizes, numeric weights. Semantic tokens map those primitives to intent: <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>--text-muted</code> is a semantic token that resolves to <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>#6B6560</code>. Components always reference semantic tokens, never raw values.</Body>
        <Body>This separation means that if the palette changes, the swap happens in one place. It also makes Figma documentation straightforward: every token in the Figma library maps directly to a CSS custom property, by name.</Body>
        <div style={{ background: 'var(--color-bg-dark)', borderRadius: 'var(--radius-sm)', padding: '1.5rem', margin: '2rem 0', overflowX: 'auto' as const }}>
          <pre style={{ fontSize: 'var(--font-size-sm)', color: '#C4BDB7', lineHeight: 1.7, fontFamily: 'monospace', margin: 0 }}>{`/* Primitives */\n--red-800: #89181A;\n--warm-50: #FAF8F5;\n\n/* Semantics */\n--color-accent:  var(--red-800);\n--color-bg:      var(--warm-50);`}</pre>
        </div>
        <Body>All spacing, typography, color, motion, and radius values are tokenized. There are no magic numbers in component code.</Body>
        <ProjectImage
          src="/images/honest-ds-tokens.png"
          alt="Honest Design System token architecture in Figma — primitive and semantic layers side by side"
          caption="Primitive tokens (left) and semantic tokens (right) in the Figma library. Every CSS custom property has a matching Figma variable by name."
        />
      </section>

      <section id="type-and-spacing" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="Type and Spacing" heading="Rem-based, predictable, and purposeful" />
        <Body>The type scale is rem-based with a 16px root. Every size from <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>--text-xs</code> (12px) to <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>--text-5xl</code> (48px) is a named token. This makes the type scale accessible — it inherits user browser preferences rather than overriding them — and consistent across every component.</Body>
        <Body>Two typefaces: DM Serif Display for headings, Inter for UI text. The pairing was chosen for contrast and warmth. Serif headings carry weight without formality. Inter handles small sizes and data cleanly without drawing attention to itself.</Body>
        <Body>Letter spacing is one of the details that most design systems underspecify. Honest has three explicit values: <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>sm</code> (0.02em, nav links), <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>md</code> (0.08em, tags and callout titles), and <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>lg</code> (0.12em, eyebrows and section labels). Each scale value is tied to a specific use case, not used interchangeably.</Body>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['sm', '0.02em', 'Nav links'],
            ['md', '0.08em', 'Tags, callout titles'],
            ['lg', '0.12em', 'Eyebrows, section labels'],
          ].map(([name, val, use]) => (
            <div key={name} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', fontFamily: 'monospace', color: 'var(--color-accent)', marginBottom: '0.35rem' }}>--letter-spacing-{name}</p>
              <p style={{ fontSize: '1.1rem', fontWeight: 500, letterSpacing: val, textTransform: 'uppercase' as const, color: 'var(--color-text)', marginBottom: '0.35rem' }}>Sample</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{val} · {use}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="component-decisions" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="Component Decisions" heading="39 components, each with a reason to exist" />
        <Body>The component inventory came from the site itself, not from a wishlist. Every component in the system has a live instance somewhere on the site. If a component was proposed during build and couldn't be placed, it was cut.</Body>
        <Body>The system started with a core set of layout and content components and grew as the site's needs grew. When the AI Interface Pattern Library needed demos, pattern-specific components were added. When the portfolio chatbot was built, Chat UI components followed. Each addition came with a live consumer — the rule held throughout.</Body>
        <Body>Two components are worth calling out because the decisions behind them reflect the system's philosophy:</Body>

        <ProjectImage
          src="/images/honest-ds-cards.png"
          alt="MetricCard, FeaturedProjectCard, and CaseStudyCard components in Figma — default and hover states"
          caption="Card components in both light and dark states. Each variant is documented in Figma and has a corresponding Storybook story."
        />

        <div style={{ margin: '2rem 0' }}>
          <div style={{ marginBottom: '1.5rem', padding: '1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.5rem' }}>ContactModal</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>The contact flow uses a modal with form fields rather than a mailto link. Mailto opens a local email client — a reasonable assumption in 2012, not in 2026, when a growing percentage of people have no default mail client configured. A modal keeps the interaction in-context, works on every device, and gives me control over the experience. The tradeoff is complexity; the reason to accept that tradeoff is user reliability.</p>
          </div>
          <div style={{ padding: '1.5rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.5rem' }}>PasswordGate</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.7 }}>Several case studies contain work done under NDA or for clients whose data is sensitive. Rather than omit this work entirely or publish it without protection, PasswordGate provides controlled access. The pattern is intentionally low-friction for people with the password and appropriately blocked for those without one. It's a designed decision about information architecture, not just a lock on a door.</p>
          </div>
        </div>

        <ProjectImage
          src="/images/honest-ds-password-gate.png"
          alt="PasswordGate component in Figma showing the locked state with password input and access request link"
          caption="PasswordGate in Figma. The component exposes a title, description, bullet list of contents, and password field — all configurable per case study."
        />
      </section>

      <section id="accessibility" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="Accessibility" heading="WCAG 2.1 AA across every component" />
        <Body>Accessibility was a first-class requirement, not a post-build audit. All 35 WCAG 2.1 Level AA criteria pass. Lighthouse scores 100 on both desktop and mobile across all pages. Zero axe-reported errors. A full VoiceOver and keyboard audit was completed and documented.</Body>
        <Body>One known gap: SideNavigation does not currently implement an <code style={{ fontFamily: 'monospace', fontSize: 'var(--font-size-sm)', background: 'var(--color-surface-subtle)', padding: '2px 5px', borderRadius: 2 }}>aria-live</code> region for active section announcements to screen reader users. This is documented, de-prioritized (the component is decorative navigation, not primary wayfinding), and on the backlog.</Body>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['WCAG 2.1 AA', '35/35 criteria pass'],
            ['Lighthouse', '100 desktop and mobile'],
            ['axe', 'Zero reported errors'],
            ['Manual audit', 'VoiceOver + keyboard complete'],
          ].map(([metric, detail]) => (
            <div key={metric} style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--color-accent)' }} />
              <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.25rem' }}>{metric}</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{detail}</p>
            </div>
          ))}
        </div>
        <ProjectImage
          src="/images/honest-ds-lighthouse.png"
          alt="Lighthouse audit showing 100 scores across Performance, Accessibility, Best Practices, and SEO"
          caption="Lighthouse 100 across all four categories. Scores are consistent across desktop and mobile on every page."
        />
      </section>

      <section id="storybook" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="Storybook" heading="Documentation as a live artifact" />
        <Body>Every component in the system has a corresponding Storybook story. Stories document the component's props, variants, states, and intended use cases. The Storybook instance is deployed publicly at <a href="https://honest-design-system.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 500 }}>honest-design-system.vercel.app</a>.</Body>
        <Body>The Storybook serves a specific purpose for this project: it lets a hiring manager or collaborator inspect the system in isolation, separate from the portfolio site. You can see how each component behaves across its states without navigating the site to find an instance. That's the difference between documentation and evidence.</Body>
        <ProjectImage
          src="/images/honest-ds-storybook.png"
          alt="Storybook showing a component story with controls panel open — props, variants, and states documented"
          caption="The Storybook instance at honest-design-system.vercel.app. Every component has a story; every story has documented controls."
        />
      </section>

      <section id="figma-parity" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="Figma Parity" heading="Design leads code, not the other way around" />
        <Body>The Figma component library matches the production codebase 1:1. Token names, component names, prop names, and variant names are identical across both environments. This isn't just for neatness — it removes ambiguity in handoff and makes the Figma library useful as a reference for development, not just a source of screenshots.</Body>
        <Body>One deliberate constraint: Figma design decisions lead code changes, not the reverse. When design specs change, code is updated to match. This preserves Figma as the source of truth and prevents the library from drifting from what's actually on the screen.</Body>
        <ProjectImage
          src="/images/honest-ds-figma-components.png"
          alt="Honest Design System Figma component library showing navigation components with variants and states"
          caption="The Figma component library. Component names, variant names, and token references match production code exactly."
        />
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Reflection" heading="What a design system built for one teaches you" />
        <Body>Building a design system at enterprise scale means negotiating with constraints you didn't set — existing codebases, engineering capacity, legacy decisions, competing roadmap priorities. Building one for a single site means every constraint is your own. That's clarifying.</Body>
        <Body>The decisions I made under pressure in larger systems — skipping token naming conventions, treating accessibility as a phase rather than a property, letting Figma and code drift — I avoided here because there was no one to negotiate with. It's easier to hold the line when you're the only person in the room.</Body>
        <Body mb={false}>The takeaway I'd bring back to a team: most design system debt isn't from bad decisions. It's from deferred decisions. The token architecture, the accessibility baseline, the Figma-to-code parity — none of it is hard to establish on day one. It's very hard to retrofit on day three hundred.</Body>
      </section>

    </div>
  )
}

export default function HonestDesignSystemPage() {
  return (
    <CaseStudyPage
      title="Honest Design System"
      company="Self-initiated · 2025–2026"
      tags={['Case Study', 'Design Systems', 'Design Technologist']}
      hook="Most portfolio sites are built on templates. This one is built on a design system — 39 components, a two-layer token architecture, and a Figma library that matches production code 1:1."
      heroImage="/images/honest-ds-hero.png"
      heroImageAlt="Honest Design System — component library overview showing cards, navigation, and tag components in Figma"
      metrics={[
        { value: '39', label: 'Components' },
        { value: 'WCAG 2.1 AA', label: 'Accessibility standard' },
        { value: '100', label: 'Lighthouse score' },
        { value: '1:1', label: 'Figma-to-code parity' },
      ]}
      details={[
        { label: 'My Role', value: 'Designer and engineer' },
        { label: 'Stack', value: 'Next.js, React, TypeScript, CSS custom properties, Storybook' },
        { label: 'Timeline', value: '2025–2026' },
        { label: 'Status', value: 'Deployed to production' },
      ]}
      sections={SECTIONS}
      cta={{ title: 'Interested in how this came together?' }}
      next={getNextWork('honest-design-system')!}
    >
      <FullCaseStudy />
    </CaseStudyPage>
  )
}
