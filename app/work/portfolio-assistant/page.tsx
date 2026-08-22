// Portfolio Assistant case study page.
// Image srcs are placeholders per the confirmed image strategy — swap once
// real screenshots exist, nothing else changes. PersonaNeeds below matches
// ai-agent's StakeholderNeeds component exactly in structure and mechanics.
'use client'
import { useState, useRef, useId } from 'react'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import PullQuote from '@/app/components/PullQuote'
import { ProjectImage } from '@/app/components/Lightbox'
import CalloutCard from '@/app/components/CalloutCard'
import StatCard from '@/app/components/StatCard'

// ─── PersonaNeeds (local component) ──────────────────────────────────────────
// Matches the structure of ai-agent's StakeholderNeeds exactly (same tab/panel
// mechanics, same keyboard nav, same styling) — trimmed to the fields that
// carry real information for this audience. relationshipToSystem is dropped:
// these personas mostly interact with the Assistant once, in a single chat,
// rather than holding an ongoing operational relationship with it the way
// ai-agent's stakeholders did.

interface PersonaData {
  label: string
  primaryNeed: string
  secondaryNeed: string
  successCriteria: string
  toleranceForAmbiguity: string
}

const PERSONAS: PersonaData[] = [
  {
    label: 'Hiring Managers',
    primaryNeed: 'Verify the reasoning behind a claimed decision is real, not rehearsed.',
    secondaryNeed: 'See how Ali handles a direct challenge to something he\'s already documented.',
    successCriteria: 'One credible trade-off or limit, named honestly, not resolved in full.',
    toleranceForAmbiguity: 'High — admitted uncertainty reads as honest here, not as a weakness.',
  },
  {
    label: 'Product Managers',
    primaryNeed: 'Can Ali explain what he chose not to build, and why, not just what he shipped.',
    secondaryNeed: 'Confirm Ali can tie a design decision back to a business constraint he didn\'t originally state.',
    successCriteria: 'A real "what got cut and why," tied to an actual constraint, not a rehearsed talking point.',
    toleranceForAmbiguity: 'Low — a vague non-answer reads as a dodge, not honesty.',
  },
  {
    label: 'Engineers',
    primaryNeed: 'Confirm feasibility-mindedness and edge-case awareness.',
    secondaryNeed: 'Gauge how closely Ali actually works with engineering during a build, not just at handoff.',
    successCriteria: 'Evidence of design-system thinking and constraint-awareness, not just visual outcomes.',
    toleranceForAmbiguity: 'Medium — specifics are expected, but "still developing this" reads as honest, not disqualifying.',
  },
  {
    label: 'Recruiters',
    primaryNeed: 'Paste a job description in and get a fast, honest read on fit, not a conversation.',
    secondaryNeed: 'Confirm role alignment without reading through full case studies first.',
    successCriteria: 'A direct answer to "is this a fit," in about the same time they\'d spend scanning the site.',
    toleranceForAmbiguity: 'Near zero, same as their scan behavior elsewhere — a vague answer to a direct fit question reads as evasive.',
  },
]

const FIELDS: { key: keyof PersonaData; label: string }[] = [
  { key: 'primaryNeed',           label: 'Primary Need' },
  { key: 'secondaryNeed',         label: 'Secondary Need' },
  { key: 'successCriteria',       label: 'Success Criteria' },
  { key: 'toleranceForAmbiguity', label: 'Tolerance for Ambiguity' },
]

function PersonaNeeds() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabListRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()
  const active = PERSONAS[activeIndex]

  function scrollTabIntoView(index: number) {
    const tab = tabRefs.current[index]
    const list = tabListRef.current
    if (!tab || !list) return
    const tabLeft = tab.offsetLeft
    const tabRight = tabLeft + tab.offsetWidth
    const listLeft = list.scrollLeft
    const listRight = listLeft + list.offsetWidth
    if (tabLeft < listLeft) {
      list.scrollTo({ left: tabLeft - 16, behavior: 'smooth' })
    } else if (tabRight > listRight) {
      list.scrollTo({ left: tabRight - list.offsetWidth + 16, behavior: 'smooth' })
    }
  }

  function selectTab(index: number) {
    setActiveIndex(index)
    scrollTabIntoView(index)
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const next = (index + 1) % PERSONAS.length
      selectTab(next)
      tabRefs.current[next]?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = (index - 1 + PERSONAS.length) % PERSONAS.length
      selectTab(prev)
      tabRefs.current[prev]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      selectTab(0)
      tabRefs.current[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      const last = PERSONAS.length - 1
      selectTab(last)
      tabRefs.current[last]?.focus()
    }
  }

  return (
    <div style={{ margin: '2rem 0 2.5rem' }}>
      <div style={{ position: 'relative' }}>
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Persona groups"
          style={{
            display: 'flex',
            overflowX: 'auto',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {PERSONAS.map((s, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={s.label}
                id={`${baseId}-tab-${i}`}
                ref={el => { tabRefs.current[i] = el }}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${baseId}-panel`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => selectTab(i)}
                onKeyDown={e => handleKeyDown(e, i)}
                style={{
                  flexShrink: 0,
                  padding: '0.75rem 1.25rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive
                    ? '2px solid var(--color-accent)'
                    : '2px solid transparent',
                  marginBottom: -1,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
              >
                {s.label}
              </button>
            )
          })}
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 64,
            height: 'calc(100% - 1px)',
            background: 'linear-gradient(to right, transparent, var(--color-bg))',
            pointerEvents: 'none',
          }}
        />
      </div>
      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeIndex}`}
        tabIndex={0}
        style={{
          padding: '1.25rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {FIELDS.map(({ key, label }) => (
          <div key={key}>
            <p style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              color: 'var(--color-text)',
              letterSpacing: 'var(--letter-spacing-md)',
              textTransform: 'uppercase' as const,
              marginBottom: '0.35rem',
            }}>
              {label}
            </p>
            <p style={{
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-text-mid)',
              lineHeight: 'var(--line-height-normal)',
            }}>
              {active[key] as string}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const SECTIONS = [
  'the-context',
  'the-users',
  'the-problem-statement',
  'the-needs',
  'source-and-guidance-for-the-ai',
  'the-evaluation',
  'the-ui',
  'the-outcomes',
  'what-i-would-build-next',
]

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Context" heading="Most portfolio chatbots are the easiest kind of AI feature to fake" />
        <Body>A portfolio chatbot is an easy thing to build badly and still ship. Point it at an API, give it a short system prompt describing a resume, and it will answer questions well enough to look like a feature. Most of what passes for AI on a portfolio site is exactly that: a thin conversational wrapper with nothing behind it.</Body>
        <Body>I wanted to build one anyway, but only if the substance behind it, what it says, what it won't say, how it fails, could hold up to the same scrutiny as every other project on this site. That meant treating what <a href="https://www.alikhandesign.com/chat" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>the Assistant</a> says, the guardrails, and the testing as the actual deliverable, not the demo wrapper around them.</Body>
      </section>

      <section id="the-users" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Users" heading="Who actually opens the chat, and who's just reading" />
        <Body>Not everyone who reads this portfolio opens the chat. Recruiters scan case studies for thirty to sixty seconds, checking role alignment and baseline professionalism. They're mostly deciding whether to keep reading at all, not typing into a chat window. Hiring managers and design leads are different: they've usually already read a case study and want to pressure-test it live. Product managers and engineers tend to show up later in a process, probing for business reasoning and technical feasibility respectively. Other designers and freelance clients land here too, but they're not who the Assistant is actually designed around.</Body>
        <Body>That distinction, who's really chatting versus who's just reading, is why the Assistant isn't a homepage feature. It sits in the footer on every page, and as a plain link, not a primary call to action, toward the top of the My Work page, just under the title and lede. The case studies are the evidence. The Assistant is secondary, there for whoever's invested enough to dig further.</Body>
        <ProjectImage
          src="/images/work/portfolio-assistant/footer-placement.jpg"
          alt="The Assistant's footer link, understated placement across every page"
          caption="The Assistant's only entry point on most pages: a plain text link in the footer, alongside contact info."
        />
        <ProjectImage
          src="/images/work/portfolio-assistant/my-work-page-link.jpg"
          alt="The Assistant linked (not CTA'd) at the top of the My Work page"
          caption="The link on the My Work page: a sentence, not a button, sitting under the page's title and lede."
        />
      </section>

      <section id="the-problem-statement" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Problem Statement" heading="Earn an interview, don't try to replace one" />
        <Body>The goal was never to build a chatbot. It was to make something genuinely useful to a hiring manager evaluating design judgment, not an Ali Khan Design wrapper around a Claude API call. Anyone can wire up an API call. The actual work is everything between that call and a system that behaves like it was designed on purpose.</Body>
        <PullQuote>This isn't trying to replace the interview. It's trying to earn one.</PullQuote>
        <Body>That's a smaller, more specific claim than "holds up under scrutiny," and it's one I could actually test. The Assistant's job isn't to answer every question in full. It's to give a recruiter or hiring manager enough signal that I'm worth a conversation. A trailer, not the film.</Body>
      </section>

      <section id="the-needs" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Needs" heading="What each person is actually trying to resolve" />
        <Body>Four real needs here, and Recruiters use the Assistant differently than the other three do. Hiring Managers, Product Managers, and Engineers are pressure-testing something they've already read. Recruiters are doing something narrower and faster: pasting in a job description to get a direct read on fit, the same thirty-second instinct that drives how they scan the rest of the site. That's also why there's no file upload anywhere in this tool. Paste-only was a deliberate choice, building an upload flow for a feature this narrow would have been solving a problem nobody actually had.</Body>
        <PersonaNeeds />
      </section>

      <section id="source-and-guidance-for-the-ai" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="Source and Guidance for the AI" heading="What the Assistant says, and how it decided to say it" />
        <Body>The real design work here wasn't visual. It was deciding what the Assistant should say, and how, one decision at a time.</Body>
        <Body>The first decision: citations aren't there to prove a claim, they're there to invite the reader deeper into a specific project. That changed how citation count worked too. A flat rule capping citations at two seemed reasonable, until a response legitimately covered four projects at once and the cap made the answer worse than no cap at all. Citation count now scales with how much the response actually covers.</Body>
        <CalloutCard
          variant="light"
          title="Concrete examples over abstract rules"
          body="Every guardrail I wrote as an abstract 'avoid X' instruction failed in testing: gated content, compensation, hostility, confirming or denying an active interview. Giving the Assistant an exact phrase to use instead, rather than a rule to interpret, fixed every one of them."
        />
        <Body>The graduated hostility ladder works the same way: three escalating steps, with a severity override for genuinely abusive language, replacing a flat rule nobody was actually following.</Body>
        <Body>Confidence calibration got its own section rather than a buried sub-clause in a general guardrails list, the one purely structural choice here worth calling out: it's the reason the fix ended up covering questions it wasn't originally written for.</Body>
        <ProjectImage
          src="/images/work/portfolio-assistant/hostility-ladder-escalation.jpg"
          alt="The graduated hostility ladder responding to repeated hostile messages"
          caption="The three-step ladder in a single conversation: neutral acknowledgment, then a genuine attempt to redirect, then disengagement."
        />
      </section>

      <section id="the-evaluation" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Evaluation" heading="Proving a probabilistic system works, and that its hard lines hold" />
        <Body>Here's the actual methodological problem this project had to solve: how do you know a system's behavior design works, when you can't just read the code and confirm it? This isn't generic QA. It's specific to designing systems where the same input doesn't guarantee the same output.</Body>
        <Body>I wasn't evaluating whether the Assistant gave good answers in some general sense. I was evaluating whether it actually followed the rules I'd designed it around: did it cite the right project for a claim, did it hold the line on gated content, did it de-escalate a hostile conversation the way I intended, did it admit real uncertainty instead of guessing, did it stay scoped to a single documented example instead of inventing a pattern that wasn't there. Twenty-eight scenarios, each one aimed at a specific behavior I'd actually designed, not a general sense of quality.</Body>
        <Body>A separate model reviews every response the Assistant gives, on purpose. Using the same model to generate and grade its own answers would introduce an obvious self-evaluation bias, so Sonnet checks Haiku's answers instead. And one bad answer is never treated as proof something's actually broken. The standing rule: run it again two or three times before touching anything, even when the instinct is to fix it right away.</Body>
        <Body>The harder skill was telling a real problem apart from a bad question. One test kept failing, four times in a row, but with a different complaint every time. That pattern was the actual signal: the question I'd written was unclear, not the Assistant's answer. Noticing that, instead of rewriting the Assistant's instructions again, was the real work.</Body>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          <StatCard value="54% → 100%" label="Eval pass rate, first attempt vs. final" />
          <StatCard value="28" label="Distinct test scenarios run" />
        </div>
        <Body>That progression showed the process was producing measurable improvement, not just adding ceremony.</Body>
        <Body>A guardrail protects one specific piece of gated content on the site. Getting it right looked simple at first: ban the phrase someone would use to ask for it directly.</Body>
        <Body>It wasn't simple. The first version leaked the exact thing it was supposed to protect, someone had just asked in slightly different words than the one phrase I'd banned. I patched it: banned that phrasing too. It leaked again, a third phrasing, same leak, same content out in the open.</Body>
        <Body>Three patches on the same failure was the real signal, more than the failure itself. I wasn't fixing a guardrail. I was playing whack-a-mole with an approach that could never work, one that assumed I could anticipate every way someone might ask.</Body>
        <PullQuote>A hard line isn't real until it's survived someone actually trying to get around it, more than once, in more than one way.</PullQuote>
        <Body>The fix that actually held wasn't a fourth banned phrase. It was a different kind of instruction: instead of trying to block every possible question, I gave the Assistant one exact answer to give, word for word, no matter how the question was asked. Nothing left to reinterpret, nothing left to slip through. That version has held across every test run since.</Body>
        <ProjectImage
          src="/images/work/portfolio-assistant/eval-terminal-output.jpg"
          alt="Terminal output from the eval framework showing the pass-rate progression"
          caption="A later round of testing: 14 of 17 passing, two partials, one fail, logged and triaged rather than hidden."
        />
        <ProjectImage
          src="/images/work/portfolio-assistant/anthropic-workbench-playground.jpg"
          alt="Testing a prompt change in Anthropic's Workbench before deploying"
          caption="The same hostility-ladder scenario under test in Anthropic's Workbench before the fix shipped."
        />
        <ProjectImage
          src="/images/work/portfolio-assistant/password-guardrail-response.jpg"
          alt="A gated-content guardrail's exact scripted response, live in the chat UI"
          caption="The mandated template, used verbatim, with no paraphrasing or reasoning added around it."
        />
      </section>

      <section id="the-ui" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The UI" heading="Where 'not just a wrapper' becomes visible" />
        <Body>Every UI decision had to serve the Assistant's narrow job: help someone evaluate fit quickly, without pretending to be a general-purpose AI assistant. That affected citations first. Citation resolution to a full case study page, rather than a specific excerpt, was deliberately not "fixed." A documented pattern in the site's own AI Interaction Pattern Library assumes evidentiary citations. This system's citations are wayfinding, so resolving to the full page is correct for its actual purpose, not a shortfall. That became a caveat written back into the pattern library itself.</Body>
        <Body>An uncertainty-communication banner system was rejected. Detecting hedged-versus-confident claims reliably enough to decide when to show a banner produced false positives and negatives on far simpler detection tasks during testing. A banner that flags a correct, confident answer as shaky does more damage than no banner at all. A blanket, always-present disclaimer replaced it: lower-risk, and more honest about what the system can actually self-report.</Body>
        <Body>"You might also ask" follow-up chips were rejected too, reasoned from the product's own purpose. This tool is for a quick fit assessment, not extended exploration. A feature built to extend engagement doesn't serve a product built for speed. Version history, a tone dropdown, and inline text-selection refinement were ruled out of scope entirely for the same reason: this isn't a general-purpose assistant UI, it's narrowly about one person's specific experience.</Body>
        <Body>Even the rate-limit banner's copy was grounded in the Assistant's actual goal rather than an operational explanation. It defines the limit in terms of what the tool is for, a fast, focused signal that earns an interview, not an extended conversation that resolves everything, rather than a cost-avoidance justification that risks reading as an apology.</Body>
        <ProjectImage
          src="/images/work/portfolio-assistant/citation-in-context.jpg"
          alt="The Source Inspector panel open, showing a cited case study"
          caption="A response citing two projects, with the Source Inspector open to the first one."
        />
        <ProjectImage
          src="/images/work/portfolio-assistant/rate-limit-banner.jpg"
          alt="The rate-limit banner, copy grounded in the tool's actual purpose"
          caption="The rate-limit banner as it read before this copy pass, kept here as the honest before-state rather than replaced quietly."
        />
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Outcomes" heading="What's real right now, and what isn't yet" />
        <Body>Every other case study on this site closes this section with a stat grid: conversion lift, satisfaction score, NPS. This one won't, on purpose. There are no live-usage metrics yet: no real user satisfaction data, no meaningful guardrail-trigger rate from real traffic, no accessibility outcome from an actual screen-reader user in the wild. Claiming otherwise would undercut the entire epistemic-honesty ethos this project was built around.</Body>
        <Body>What's real instead: the rigor metrics from the evaluation above, independent of live traffic, plus a production observability layer built specifically to capture the next chapter once real usage exists. That layer isn't redundant with the testing already done. A test's own wording can eventually be refined until it's unambiguous, that loop closes. The behavior it's testing can't close the same way: the same question run against the same system can still produce a different answer next time. That's the actual argument for watching it in production, not a hedge against having tested it enough. A categorized guardrail-triggered field replaced generic booleans, deliberately reusing the eval framework's own category vocabulary, so testing and production monitoring speak one language. Confidence-calibration failures were explicitly excluded from automated detection: fabricated quotes and over-generalization aren't reliably keyword-detectable, and admitting that limit honestly beat building a detector that would fake confidence.</Body>
        <PullQuote>This is a living case study: proof of what rigorous, self-directed testing surfaced before real usage could tell us anything.</PullQuote>
        <Body>Looking back across this whole project, one thing shows up more than any single decision: knowing when not to. Don't make the Assistant the primary way to read this portfolio. Don't try to answer every question in full. Don't cite a project just to prove a point already made. Don't ban another phrase when the rule itself is wrong. Don't rewrite a guardrail before confirming the test isn't the broken part. Don't add a confidence banner the system can't actually power. Don't build a detector for a failure mode that isn't reliably detectable. Don't build a file upload for a feature that only ever needed paste. Don't claim outcomes that don't exist yet. Restraint, applied consistently and on purpose, turned out to be most of the actual design work.</Body>
        <ProjectImage
          src="/images/work/portfolio-assistant/admin-dashboard-tab.jpg"
          alt="The admin Dashboard tab, showing real aggregated metrics"
          caption="Real session counts, citation rate, and guardrail triggers, computed from the live log."
        />
        <ProjectImage
          src="/images/work/portfolio-assistant/admin-logs-tab.jpg"
          alt="The admin Logs tab, filterable by guardrail category"
          caption="The same guardrail categories from the eval framework, filterable in production: a shared vocabulary between testing and monitoring."
        />
      </section>

      <section id="what-i-would-build-next" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="What I'd Build Next" heading="The methodology doesn't stop at launch" />
        <Body>Real usage will feed back into the same eval framework that validated pre-launch behavior, closing the loop the observability layer was built for. That's not hypothetical: a follow-up batch already ran after shipping a content fix, closing a gap where hindsight and prioritization questions had no real material to draw from, confirmed the fix worked, and logged a known issue deliberately left unaddressed rather than silently dropped.</Body>
      </section>

    </div>
  )
}

export default function PortfolioAssistantPage() {
  const nextWork = getNextWork('portfolio-assistant')
  return (
    <CaseStudyPage
      title="Portfolio Assistant"
      company="Self-initiated · 2026"
      tags={['AI Product Design', 'Behavior Design', 'Evaluation & Testing']}
      hook="Most portfolio chatbots are a thin wrapper around an API call. I wanted the substance behind mine, what it says, what it won't say, how it fails, to hold up to the same scrutiny as any other project on this site."
      heroImage="/images/work/portfolio-assistant/hero-chat-in-action.jpg"
      heroImageAlt="The Portfolio Assistant mid-conversation"
      details={[
        { label: 'My Role', value: 'Design & development, self-initiated' },
        { label: 'Stack', value: 'Next.js, Vercel, Claude Haiku 4.5, Upstash Redis' },
        { label: 'Timeline', value: '2026' },
        { label: 'Type', value: 'Conversational AI, portfolio tooling' },
      ]}
      sections={SECTIONS}
      cta={{ title: 'Want to talk through the methodology or the build?' }}
      next={getNextWork('portfolio-assistant')!}
    >
      <FullCaseStudy />
    </CaseStudyPage>
  )
}
