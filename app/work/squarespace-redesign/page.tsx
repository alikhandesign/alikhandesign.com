'use client'
import Link from 'next/link'
import PasswordGate from '@/app/components/PasswordGate'
import SideNav from '@/app/components/SideNav'
import { CaseStudyImage } from '@/app/components/Lightbox'
import { useState } from 'react'

const INSIDE = [
  'Full audit findings across Track A (new user) and Track B (power user)',
  '20 failure modes defined, evidenced, and taxonomized',
  'The diagnosis: why Squarespace\'s AI fails at a structural level',
  'Three redesigned moments with before/after comparisons',
  'Link to the full audit spreadsheet (22 documented intents)',
  'Link to the interactive prototype (built in React and Vercel)',
]

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

      {/* THE CONTEXT */}
      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Context" heading="A product built around its own inventory, not its users" />
        <Body>After being laid off, I needed to rebuild my portfolio. I'd been on Squarespace for years and figured their AI tools would make the refresh faster. I already had the site. I just needed it to sound like me.</Body>
        <Body>What I found was a system that had AI features without AI thinking — tools that generated content confidently without understanding what the content was for, or who it was for. I documented everything.</Body>
        <Body>The audit ran across two tracks. Track B tested the AI writing tools on my existing site across twelve specific prompts. Track A went through the full Blueprint AI onboarding as a new user. Together they produced twenty distinct failure modes and a clear picture of why Squarespace's AI underdelivers on its core promise.</Body>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', margin: '2rem 0', padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          {[['My Role', 'Solo — UX Research, Interaction Design, Prototyping'], ['Methods', 'Comparative audit, failure mode taxonomy, interaction design'], ['Tools', 'Claude, Figma, Next.js, Vercel'], ['Type', 'Self-initiated, 2026']].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.35rem' }}>{label}</p>
              <p style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500, lineHeight: 1.5 }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Problem" heading="The promise: customized for your brand. The reality: a template." />
        <Body>Squarespace's Blueprint AI entry point promises a website "customized for your brand or business after a few simple questions." The onboarding asks six questions. Five are categorical selection — pick a topic from a dropdown, check boxes for goals, choose a personality archetype, select a color palette, pick a font pairing. One asks for something personal: your site title.</Body>
        <Body>The AI generated a complete website from those inputs. The hero headline was "Strategic Interface Design." The About page said "The studio delivers user interface and user experience design solutions." When I tried to add a Portfolio page — the one page my stated goal required — the templates were populated with floristry photography and projects called The Atlas Project and The Lumen Project.</Body>
        <Callout>"This feels like I just chose a template."</Callout>
        <Body>In Track B, the failures were more specific. The AI called me Alexandre. It generated six hundred words of automated chemical synthesis documentation when I described my AI research pipeline. After twelve prompts establishing my professional context, it produced a therapy intake profile recommending worry management techniques and a 7-day behavioral experiment.</Body>
        <Callout>"My name is Ali, not Alexandre."</Callout>
      </section>

      {/* THE RESEARCH */}
      <section id="the-research" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Research" heading="Twenty failure modes across two user journeys" />
        <Body>I documented every failure systematically. Twenty distinct failure modes emerged — organized into three categories.</Body>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['Accuracy failures', 'The AI invented things that were never provided. Alexandre Khan with degrees in cognitive science. A fake phone number with specific calling hours. Six hundred words of chemical synthesis documentation for a UX pipeline. These outputs were presented with complete confidence, making fabricated content difficult to detect without careful scrutiny.'],
            ['Relevance failures', 'The AI produced correct-format output for the wrong context. "Strategic Interface Design" for a job-search portfolio. Floristry photography for a UI/UX designer. E-commerce framing applied to a healthcare enrollment metric. The AI understood the structure of the request but not the meaning behind it.'],
            ['Voice failures', 'Even when output was technically acceptable, it belonged to no one in particular. Intent 9 produced genuinely good writing — thoughtful, well-structured — that could have been written by any senior designer anywhere. It replaced my voice with a competent anonymous one. That\'s harder to catch than obvious failure, and in some ways more dangerous.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 3, background: 'var(--accent)' }} />
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem', paddingLeft: '0.75rem' }}>{title}</p>
              <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7, paddingLeft: '0.75rem' }}>{desc}</p>
            </div>
          ))}
        </div>

        <Body>The most consistent failure — appearing in eleven of twelve Track B intents and structuring the entire Track A experience — was Session Blindness. The AI has no persistent model of the user. Every interaction is the first interaction. Asked to summarize what it knew about me after twelve prompts, it produced a profile for a stranger.</Body>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {[['11', 'Session Blindness appearances'], ['10', 'Generic Output appearances'], ['8', 'Opacity appearances']].map(([val, label]) => (
            <div key={label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--accent)' }} />
              <div className="font-serif" style={{ fontSize: '2rem', color: 'var(--accent)', lineHeight: 1, marginBottom: '0.35rem' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>{label}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '1rem', marginTop: '2rem' }}>Track A — New user journey</p>
        <Body>I went through the full Blueprint AI onboarding as myself — a designer who knew exactly what he needed. The system asked me six questions. One was personal (site title). The rest were categorical: topic dropdown, goal checkboxes, personality archetype, color palette, font pairing.</Body>
        <Body>The first question — "What's your site about?" — revealed the first significant finding before the AI had generated a single word.</Body>
        <Body>The default dropdown showed eight popular topics: Photography, Design, Education, Consulting, Art, Health, Marketing, Technology. I selected "Design" and proceeded. The AI generated a site with a chair as the hero image and "Strategic Design Excellence" as the headline.</Body>
        <Body>I went back. I typed "Design" into the search field and noticed "UI/UX Design" appear as a sub-option. It wasn't in the default list — only discoverable by searching. I selected it and ran the onboarding again. The chair became a phone. The headline became "Strategic Interface Design." Two words changed. The structure, copy quality, page recommendations, and fundamental personalization failures remained completely identical.</Body>
        <Callout>"I selected 'Design' from the dropdown. The AI generated a site with a chair as the hero image. I went back, searched for 'UI/UX Design,' and ran it again. The chair became a phone. The headline changed by two words. Everything else stayed exactly the same."</Callout>
        <Body>This single observation contains two findings. First: the system has more specificity than it surfaces — Discoverability Failure. "UI/UX Design" exists as a more granular input but is only discoverable by searching. A non-technical user who accepts "Design" from the default list never knows a better option exists. Second: even when you find the more specific input and use it, the fundamental failures persist. The AI changed the visual props but not the script.</Body>

        <CaseStudyImage src="" alt="Design vs UI/UX Design — chair becomes phone, headline changes by two words" caption="Selecting 'Design' produced a chair and 'Strategic Design Excellence.' Selecting 'UI/UX Design' produced a phone and 'Strategic Interface Design.' Two words changed. Everything else stayed the same." />

        <Body>The most revealing moment in Track A was font pairing. I worried the entire time about whether my selection would clash with my logo — my actual signature, which is the most personal and distinctive brand element I have. The system never asked about it. Not once. It made every visual design decision assuming I was starting from zero.</Body>
        <Body>When I tried to add a Portfolio page after generation — the one page my stated goal required — the templates were populated with floristry photography. The system knew I was a UI/UX designer. It gave me flowers.</Body>

        <CaseStudyImage src="" alt="Portfolio page templates populated with floristry photography for a UI/UX designer" caption="The system recommended Homepage, About, and Contact — no Portfolio page. When I added one manually, it populated with floristry stock photography." />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Track A synthesis</p>
        <Callout>"Blueprint AI gives you a coherent website for someone like you. Not a website for you."</Callout>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '1rem', marginTop: '2rem' }}>Track B — Power user journey</p>
        <Body>I used my existing Squarespace site and directed the AI with twelve portfolio-specific prompts — drawn directly from decisions I'd already made when building my actual portfolio. The prompts were specific: write a headline that signals AI expertise without being generic, generate a case study hook for a specific project, write a bio without using the word "passionate."</Body>
        <Body>The AI failed every constraint simultaneously. It ignored the "not generic" instruction in Intent 1 and repeated the same vocabulary — "human-centered," "trustworthy," "AI experiences" — across every subsequent intent. It fabricated metrics, invented credentials, and in Intent 12 confirmed the pattern definitively: asked to summarize what it knew about me after twelve prompts, it produced a therapy profile for a stranger.</Body>

        <CaseStudyImage src="" alt="Intent 7: AI renamed user Alexandre Khan with fabricated credentials" caption="Intent 7: The AI generated a bio for 'Alexandre Khan' — complete with invented degrees in cognitive science and a speaking career I don't have." />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Track B synthesis</p>
        <Callout>"Squarespace's AI cannot distinguish between you and anyone else — and it was never designed to."</Callout>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '1rem', marginTop: '2rem' }}>The comparison</p>
        <Body>Running both tracks revealed a three-way breakdown. Failures shared across both tracks — Generic Output, Template Prison, Opacity — are systemic. Track B failures are generative — they happen when the AI is actively producing content. Track A failures are architectural — they happen before the AI generates anything, in how the system is designed to gather input.</Body>

        <div style={{ margin: '2rem 0', padding: '1.25rem 1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <a href="https://docs.google.com/spreadsheets/d/14aYE4MwHlpsOULX9u09c1IXI_B1YytyLBPpUJ3VYBnY/edit" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>Full audit spreadsheet</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>22 documented intents · user quotes · failure mode taxonomy</p>
            </div>
            <span style={{ color: 'var(--accent)', fontSize: 16, flexShrink: 0 }}>→</span>
          </a>
        </div>
      </section>

      {/* THE INSIGHT */}
      <section id="the-insight" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Insight" heading="A categorization engine wearing a personalization promise" />
        <Body>The failure isn't that Squarespace's AI needs context. All AI needs context. The failure is that the system was never designed to gather it.</Body>
        <Body>Every category in Blueprint AI's onboarding maps to Squarespace's existing product inventory — template families, feature modules, color systems, font packages. The AI was designed around Squarespace's content catalog, not around the user's actual intent. Personalization was the marketing frame applied afterward.</Body>
        <Callout>"Squarespace's AI is a categorization engine wearing a personalization promise — and every category in that engine maps to Squarespace's business model, not the user's actual needs."</Callout>
        <Body>This is a deliberate product decision, not a technical failure. Categorical selection keeps output within a quality range Squarespace can control. It reduces cognitive load for non-technical users. It scales efficiently. These are real product considerations. What isn't defensible is calling the result "customized for your brand."</Body>
      </section>

      {/* THE DESIGN */}
      <section id="the-design" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Design" heading="Three redesigned moments, four principles" />
        <Body>The redesign is grounded in four principles from my own design philosophy — each a direct response to a documented failure pattern.</Body>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: '2rem 0' }}>
          {[
            ['Make AI useful — trust over smart', 'AI should contribute to decisions that matter: information architecture, content strategy, voice and positioning. The measure of usefulness isn\'t whether content was generated. It\'s whether the user is closer to their actual goal.', 'Intent Translation Failure · Generic Output · False Promise'],
            ['Show AI reasoning — transparency by design', 'Every AI decision should be explainable. Users should be able to see the logic, challenge it, and redirect it. Uncertainty is a UI problem, not a model problem.', 'Opacity · False Recommendation · Silent Assumption'],
            ['Give real flexibility — scale what humans do well', 'Users should be able to express intent outside predefined categories. The system should expand to meet the user\'s needs, not compress the user\'s needs to fit the system\'s inventory.', 'Template Prison · Asset Blindness · False Equivalence'],
            ['Learn from behavior — ethical use as a constraint', 'The AI should build a model of the user over time. A user who changes "Strategic Interface Design" to "I help product teams understand their users at scale" is telling the AI something important. It should listen — and remember.', 'Session Blindness · Voice Displacement · Reset'],
          ].map(([title, desc, modes]) => (
            <div key={title as string} style={{ padding: '1.25rem 1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>{title}</p>
              <p style={{ fontSize: 14, color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '0.75rem' }}>{desc}</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>{modes}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem', marginTop: '2.5rem' }}>Moment 1 — The Intake</p>
        <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--accent)', fontWeight: 500, marginBottom: '0.75rem' }}>Make AI useful</p>
        <Body>The current onboarding gathers one personal input across six steps. The redesign replaces the checkbox flow with a conversational AI that asks three open-ended questions — beginning with:</Body>
        <Callout>"Before we start making things look pretty — tell me about yourself. Who are you, what do you do, and what is this site actually for?"</Callout>
        <Body>The AI asks clarifying questions when answers are vague. If you type "designer," it asks what kind. Goals are woven into the audience question rather than separated into a checkbox grid. The intake ends with a summary of what the AI understood, editable before anything is generated.</Body>

        <CaseStudyImage src="" alt="Moment 1: Conversational intake replacing checkbox onboarding" caption="Before: six steps, five categorical selections, one personal input. After: three open-ended questions that build real context before generating anything." />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem', marginTop: '2.5rem' }}>Moment 2 — The Transparent Builder</p>
        <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--accent)', fontWeight: 500, marginBottom: '0.75rem' }}>Show AI reasoning</p>
        <Body>The current builder generates a complete website silently. No explanation for any decision. No visibility into how inputs affected outputs. No mechanism to redirect specific choices without starting over.</Body>
        <Body>The redesign lets users click any section of the live preview to see why the AI made that decision. Each reasoning callout names the assumption behind the choice, identifies the failure mode it introduces, and suggests a specific override. Users direct the AI by pointing at what they want to change — closer to Figma Make or Vercel's v0 than to a settings panel.</Body>

        <CaseStudyImage src="" alt="Moment 2: Click-to-select sections with AI reasoning shown inline" caption="Before: silent generation, no explanation for any decision. After: click any section to see the AI's reasoning and override it directly." />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.75rem', marginTop: '2.5rem' }}>Moment 3 — The Context Layer</p>
        <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--accent)', fontWeight: 500, marginBottom: '0.75rem' }}>Learn from behavior</p>
        <Body>The current system has no memory between sessions. Every editing prompt starts from zero. The post-generation dashboard shows no record of what the user said during onboarding.</Body>
        <Body>The redesign shows a persistent panel with what the AI currently understands — built from intake answers, updated as the user edits, annotated with confidence levels and source attribution. When the AI makes an assumption it surfaces it. When the user corrects it, the correction applies forward across all generated content.</Body>

        <CaseStudyImage src="" alt="Moment 3: Persistent context layer showing AI's understanding with confidence levels" caption="Before: no memory, every session starts from zero. After: a persistent model of the user, updated through edits, with confidence levels showing what the AI knows vs. assumes." />

        <div style={{ margin: '2.5rem 0', padding: '1.25rem 1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
          <a href="https://squarespace-ai-redesign.vercel.app" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: '0.25rem' }}>Interactive prototype</p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Built in React and Vercel — all three moments interactive</p>
            </div>
            <span style={{ color: 'var(--accent)', fontSize: 16, flexShrink: 0 }}>→</span>
          </a>
        </div>
      </section>

      {/* THE OUTCOMES */}
      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Outcomes" heading="What this project made clear" />
        <Body>I didn't publish the redesign on Squarespace. I built my own portfolio site instead — using Claude and Vercel, the same stack this prototype runs on.</Body>
        <Body>That decision wasn't planned. It emerged from the audit. Working through what Squarespace's AI couldn't do made it clear what a better process would look like — one that started with intent, built context through conversation, and let me make the decisions that required human judgment.</Body>
        <Body>AI can be slapped onto a product to make it feel special. Squarespace did that. Or it can be integrated into the workflow in a way that genuinely extends what the human can do. The difference isn't capability. It's design.</Body>
        <Body mb={false}>A better AI website builder would ask more and assume less. It would show its reasoning and invite correction. It would remember what you told it and apply it forward. It would treat personalization as something earned through conversation — not declared through a dropdown. That's what I tried to build here.</Body>
      </section>

      {/* THE REFLECTION */}
      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Reflection" heading="Design is the difference" />
        <Body>This project started as a frustration and became a framework. The twenty failure modes aren't a list of bugs — they're a taxonomy of what happens when a product is designed around its own needs instead of its users' needs. That's a pattern that shows up far beyond Squarespace, and one I'll carry into every AI product I work on from here.</Body>
        <Body mb={false}>The most important thing I learned: the gap between AI that gets in the way and AI that genuinely helps isn't about model capability. It's about how the system is designed to gather context, surface reasoning, and learn from behavior. Those are design problems. And design problems have design solutions.</Body>
      </section>

    </div>
  )
}

export default function SquarespaceRedesignPage() {
  const [unlocked, setUnlocked] = useState(false)
  return (
    <main>
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <nav style={{ padding: '1.25rem 3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link href="/work" style={{ fontSize: 14, color: 'var(--text-muted)', textDecoration: 'none' }}>My Work</Link>
          <span style={{ fontSize: 14, color: '#C4BDB7' }}>›</span>
          <span style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>From Checkboxes to Conversations</span>
        </nav>

        <header style={{ padding: '2.5rem 3rem 3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' as const }}>
            <span className="tag-cs">Case Study</span>
            <span className="tag">AI Design</span>
            <span className="tag">UX Research</span>
            <span className="tag">Interaction Design</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: '3rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '0.5rem' }}>From Checkboxes to Conversations</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.04em', marginBottom: '1.5rem' }}>Squarespace · Self-initiated · 2026</p>
          <p style={{ fontSize: 18, color: 'var(--text)', lineHeight: 1.7, maxWidth: 680 }}>I didn't set out to audit Squarespace's AI. I set out to redesign my portfolio. What I found instead became this case study — a documented audit of Blueprint AI across two user journeys, twenty distinct failure modes, and a redesign grounded in the principles I use every time I work with AI as a design tool.</p>
        </header>
      </div>

      {/* Hero image */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem' }}>
        <div style={{ width: '100%', height: 400, background: 'var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>Hero Image — Before/After Composite</div>
      </div>

      {/* Metrics strip */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '0 3rem 3rem', display: 'flex', gap: '3rem', flexWrap: 'wrap' as const, borderBottom: '1px solid var(--border)' }}>
        {[['20', 'Failure modes documented'], ['22', 'Intents audited across 2 tracks'], ['3', 'Redesigned moments'], ['4', 'Design principles']].map(([val, label]) => (
          <div key={label}>
            <div className="font-serif" style={{ fontSize: '2.25rem', color: 'var(--accent)', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Article layout with side nav + password gate */}
      <div className="article-layout" style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '4rem 3rem' }}>
        <SideNav
          unlocked={unlocked}
          sections={['the-context', 'the-problem', 'the-research', 'the-insight', 'the-design', 'the-outcomes', 'the-reflection']}
        />
        <div>
          <PasswordGate
            password="4likh4n"
            onUnlock={() => setUnlocked(true)}
            title="The full audit, diagnosis, and redesign"
            description="Twenty failure modes. Two user journeys. Three redesigned moments. The complete case study walks through every finding in detail."
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
          <p className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 400 }}>People-First Enrollment Redesign</p>
        </div>
        <Link href="/work/people-first" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 500, textDecoration: 'none' }}>View project →</Link>
      </div>
    </main>
  )
}
