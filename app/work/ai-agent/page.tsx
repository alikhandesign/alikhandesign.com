'use client'
import { useState, useRef, useId } from 'react'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import CalloutCard from '@/app/components/CalloutCard'
import StatCard from '@/app/components/StatCard'
import ProjectImage from '@/app/components/ProjectImage'
import PullQuote from '@/app/components/PullQuote'
import PasswordGate from '@/app/components/PasswordGate'

// ─── StakeholderNeeds (local component) ──────────────────────────────────────

interface StakeholderData {
  label: string
  primaryNeed: string
  secondaryNeed: string
  successCriteria: string
  toleranceForAmbiguity: string
  relationshipToSystem: string
}

const STAKEHOLDERS: StakeholderData[] = [
  {
    label: 'End Users',
    primaryNeed: 'To be heard accurately — feedback categorized to what they actually meant, not what their words literally matched.',
    secondaryNeed: 'Not applicable — they don\'t query the system. They are the source of its data.',
    successCriteria: 'Their feedback routes to the correct taxonomy node regardless of how they phrased it.',
    toleranceForAmbiguity: 'Not applicable — but the system\'s tolerance on their behalf must be very low. Miscategorization means their signal is lost.',
    relationshipToSystem: 'Source population, not users. Their language is the hardest to interpret — emotionally loaded, domain-naive, and varied across six product lines.',
  },
  {
    label: 'UX Researchers & Designers',
    primaryNeed: 'Pattern recognition — what are members actually experiencing, in their own words.',
    secondaryNeed: 'Sentiment correlation, longitudinal trends, taxonomy edge cases, proactive anomaly detection.',
    successCriteria: 'Enough fidelity to form or validate a hypothesis.',
    toleranceForAmbiguity: 'High — comfortable with uncertainty and expect to interpret the data themselves.',
    relationshipToSystem: 'Primary operator. The system was built to serve their synthesis workflow first.',
  },
  {
    label: 'Product Managers',
    primaryNeed: 'Prioritization signal — what\'s broken, how bad, what to fix first.',
    secondaryNeed: 'Feature-specific feedback, population-specific feedback (ICHRA, Medicare vs. IFP), pre-release risk assessment.',
    successCriteria: 'A clear answer they can bring into sprint planning or a roadmap conversation.',
    toleranceForAmbiguity: 'Low — needs something actionable, not a pile of raw signal.',
    relationshipToSystem: 'Consumer of synthesized output. Needs answers, not data.',
  },
  {
    label: 'Leadership',
    primaryNeed: 'Confirmatory signal — is what we think is happening actually happening.',
    secondaryNeed: 'Throughput and system performance, year-over-year trends, resourcing justification.',
    successCriteria: 'A synthesized, defensible answer — not raw data.',
    toleranceForAmbiguity: 'Very low — needs yes/no with evidence, not "it depends".',
    relationshipToSystem: 'Consumer of high-level output. Least tolerant of ambiguity, most dependent on confidence signaling.',
  },
  {
    label: 'Engineering',
    primaryNeed: 'Isolate technical failure signals from experiential feedback — bugs, errors, compatibility issues, broken flows.',
    secondaryNeed: 'Volume and frequency of specific technical issues, platform or browser-specific patterns, correlation between technical issues and other categories.',
    successCriteria: 'Enough specificity to open a ticket — ideally with enough member-reported detail to reproduce the issue.',
    toleranceForAmbiguity: 'Low — "members are frustrated with enrollment" is useless. "Plan comparison crashes on Safari with more than two plans in comparison" is actionable.',
    relationshipToSystem: 'Consumer of a specific taxonomy slice — Browser Issues, Technical, and categories where member language suggests system failure rather than UX confusion.',
  },
  {
    label: 'Account Managers',
    primaryNeed: 'Client retention signal — are members of a specific employer account having a disproportionately bad experience.',
    secondaryNeed: 'Client-specific volume trends, comparison against broader population benchmarks, escalation evidence for account reviews.',
    successCriteria: 'A clear yes/no on whether a specific client needs attention, with enough supporting evidence to bring into an account review conversation.',
    toleranceForAmbiguity: 'Low — needs something specific enough to act on before a client relationship is at risk.',
    relationshipToSystem: 'Consumer of a specific filtered slice — same taxonomy, same agent, always scoped to a client identifier.',
  },
  {
    label: 'Legal & Compliance',
    primaryNeed: 'Assurance that the agent never receives HIPAA or PHI data.',
    secondaryNeed: 'Auditability — demonstrating that redaction happened before data reached Copilot Studio.',
    successCriteria: 'A clear, documented redaction policy that can be reviewed and approved.',
    toleranceForAmbiguity: 'Zero — binary. Either PHI reaches the agent or it doesn\'t.',
    relationshipToSystem: 'Constraint, not user. Their requirements shaped the architecture — they don\'t query the output.',
  },
]

const FIELDS: { key: keyof StakeholderData; label: string }[] = [
  { key: 'primaryNeed',           label: 'Primary Need' },
  { key: 'secondaryNeed',         label: 'Secondary Need' },
  { key: 'successCriteria',       label: 'Success Criteria' },
  { key: 'toleranceForAmbiguity', label: 'Tolerance for Ambiguity' },
  { key: 'relationshipToSystem',  label: 'Relationship to System' },
]

function StakeholderNeeds() {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabListRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const baseId = useId()

  const active = STAKEHOLDERS[activeIndex]

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
      const next = (index + 1) % STAKEHOLDERS.length
      selectTab(next)
      tabRefs.current[next]?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = (index - 1 + STAKEHOLDERS.length) % STAKEHOLDERS.length
      selectTab(prev)
      tabRefs.current[prev]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      selectTab(0)
      tabRefs.current[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      const last = STAKEHOLDERS.length - 1
      selectTab(last)
      tabRefs.current[last]?.focus()
    }
  }

  return (
    <div style={{ margin: '2rem 0 2.5rem' }}>
      {/* Tab bar */}
      <div style={{ position: 'relative' }}>
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Stakeholder groups"
          style={{
            display: 'flex',
            overflowX: 'auto',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {STAKEHOLDERS.map((s, i) => {
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
        {/* Right fade indicator */}
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

      {/* Panel */}
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
  'the-problem',
  'the-reframe',
  'the-constraint',
  'the-build',
  'the-validation',
  'the-outcomes',
  'the-reflection',
]

const INSIDE = [
  'Compliance-first design approach and legal workshops',
  'Hybrid categorization architecture (structured + AI)',
  'The double-blind validation methodology with PMs',
  'Iteration from 78% to 95% accuracy',
  'Stakeholder adoption data — 128 sessions, 4.5/5 satisfaction',
  'Full system architecture and intent mapping',
]

function FullCaseStudy() {
  return (
    <div>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Context"
          heading="A billion-dollar book of business generating feedback nobody could keep up with"
        />
        <Body>
          Willis Towers Watson managed an annual book of business exceeding $1B in the Medicare and individual benefits space. That scale generated a constant stream of user feedback — website surveys, mobile app surveys, post-call feedback, NPS and CSAT scores — flowing in from hundreds of thousands of participants on the Via Benefits platform.
        </Body>
        <Body mb={false}>
          During Medicare Open Enrollment, that volume spiked by 1000%. I was the Senior UX Designer embedded on the Individual Marketplace team. What I noticed, through observation rather than any formal assignment, was that the people whose job it was to understand users were spending most of their time doing data entry.
        </Body>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Problem"
          heading="Three compounding failures, one critical risk"
        />
        <Body>
          The research team operated within a fragmented, labor-intensive feedback loop. Researchers manually downloaded data from multiple sources, aggregated it, cleaned it, redacted sensitive information, tagged and categorized every comment by hand, and packaged it into a static spreadsheet posted to a Teams channel once a week. Three distinct failure modes compounded each other.
        </Body>

        <CalloutCard
          variant="light"
          title="The synthesis tax"
          body="A single researcher spent an entire day each week on categorization and tagging alone — 20% of weekly capacity consumed by work that required domain expertise they didn't have, producing outputs that arrived too late to act on."
        />
        <CalloutCard
          variant="light"
          title="The expert gap"
          body="The researchers doing the categorization weren't subject-matter experts on every product feature they were reviewing. Technical nuance got lost in translation. A Medicare plan comparison bug looked identical to a general navigation complaint unless you knew the product well enough to distinguish them."
        />
        <CalloutCard
          variant="light"
          title="The distribution lag"
          body="Even when synthesized correctly, insights sat in static spreadsheets that didn't reach the relevant Product Owners until days later. A systemic bug appearing on a Monday wouldn't surface until Friday's report — at the earliest."
        />

        <PullQuote>
          This wasn't just a process inefficiency. It was a compliance and retention risk. The voice of the user was arriving too late to matter.
        </PullQuote>
      </section>

      <section id="the-reframe" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reframe"
          heading="The question wasn't speed — it was trust"
        />
        <Body>
          The obvious framing was: can AI do this faster? But that wasn't the right question. A faster version of the same flawed process would just produce wrong answers more quickly. The real problem was the expert gap — the mismatch between the people doing the categorization and the domain knowledge required to do it accurately.
        </Body>
        <Body mb={false}>
          The right question was: can AI close the expert gap while handling sensitive healthcare data responsibly? That reframe changed everything about how I designed the system — and in what order.
        </Body>
      </section>

      <section id="the-constraint" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Constraint"
          heading="Before AI could touch the data, the data had to be safe"
        />
        <Body>
          The first design challenge wasn't building anything. It was earning the right to build. I ran workshops with Legal and Compliance to define exactly what constituted PII and PHI in our context — names, Social Security numbers, Medicare IDs, claim details — and where the line was that the system could not cross.
        </Body>
        <Body>
          From those workshops, I engineered a layered redaction approach in Qualtrics. Structured pattern queries handled known identifiers. An additional redaction pass caught names and edge cases. Legal signed off before any data touched the model. That sign-off wasn't a checkbox — it was what made the rest of the project possible.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/redaction-policy.jpg"
          alt="Qualtrics PII redaction policy configuration showing SSN detection pattern"
          caption="The Qualtrics redaction policy showing SSN pattern detection. This ran before any feedback reached the agent — Legal sign-off on this configuration was the prerequisite for everything else."
        />
      </section>

      <section id="the-build" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Build"
          heading="A hybrid system designed around the expert gap"
        />
        <Body>
          The architecture had four layers, each solving a specific part of the problem.
        </Body>

        <CalloutCard
          variant="light"
          title="Taxonomy and intent mapping"
          body="I started by interviewing product owners to understand how they thought about user feedback — not just what categories existed, but what signals within feedback indicated each category. Those interviews produced a structured taxonomy stored in Dataverse as the single source of truth."
        />
        <CalloutCard
          variant="light"
          title="Qualtrics Text IQ queries"
          body="I built topic queries in Qualtrics Text IQ to anchor known patterns to the correct product buckets. These were the guardrails — precise keyword and phrase logic that ensured business-critical signals were never miscategorized, regardless of how the AI performed on edge cases."
        />
        <CalloutCard
          variant="light"
          title="Copilot Studio as the brain"
          body="I connected the Dataverse taxonomy to a Copilot Studio agent and grounded it in WTW's internal product documentation and the Via Benefits public websites. This gave the AI the product context it needed to interpret ambiguous feedback the way a subject-matter expert would."
        />
        <CalloutCard
          variant="light"
          title="Power Automate and Teams integration"
          body="The pipeline ran automatically: new feedback in → redaction → categorization → stakeholder delivery. I also built a conversational interface in Teams so PMs could ask direct questions — 'What were the top three complaints from Medicare users this week?' — and get real-time synthesized answers without waiting for a weekly report."
        />

        <Body>
          Before writing a single topic description, I mapped each stakeholder's primary need, secondary need, success criteria, and tolerance for ambiguity. That last field wasn't just a description of how stakeholders prefer to receive information — it was a design constraint. A researcher can work with uncertain data and find the signal themselves. A VP of Operations cannot. Those are different epistemic requirements, and they should drive the agent's response format, not just its retrieval logic.
        </Body>

        <StakeholderNeeds />

        <ProjectImage
          src="/images/work/ai-agent/knowledge-sources.jpg"
          alt="Copilot Studio knowledge sources showing Dataverse feedback table and Via Benefits public websites"
          caption="The agent was grounded in both structured data (Dataverse feedback table) and product context (Via Benefits public websites). This is what separated it from a generic LLM — it understood the product it was categorizing feedback about."
        />

        <Body>
          The taxonomy wasn't built from scratch. It mirrors how WTW already organized its products internally — seven domains that stakeholders already used to think and talk about the platform. Shopping & Enrollment, Account Management, Profile, Post Enrollment, Funding, Help & Support, and a cross-cutting Technical domain for bugs and errors.
        </Body>
        <Body>
          The agent's job was to bridge the gap between that structure and how members actually talked. A member saying "my plan disappeared" doesn't use the words "Post Enrollment." A member saying "why does it keep asking me for a code" doesn't say "Multi-Factor Authentication." The taxonomy was fixed. The language wasn't. Inferring the correct domain from unstructured natural language — without keyword matching — is what the agent had to solve.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/taxonomy-diagram.jpg"
          alt="Radial diagram showing the seven feedback taxonomy domains radiating from a central Participant Feedback node"
          caption="Seven domains reflecting WTW's existing product structure. The agent had to route member language into a framework designed for internal stakeholders, not for the people leaving feedback."
        />

        <Body>
          Intent mapping was the intellectual work behind this translation. For each stakeholder type, I mapped the raw language they'd use to query the system, the intent beneath that language, and the taxonomy nodes it resolved to. Each stakeholder's tolerance for ambiguity — defined above — shaped not just what the agent retrieved, but how it responded.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/intent-mapping.jpg"
          alt="Copilot Studio topic trigger showing natural language description and Account Management entity with smart matching enabled"
          caption="Left: the topic trigger uses a natural language description rather than keyword rules — the agent routes to this topic based on semantic intent matching. Right: the Account Management entity with synonyms and smart matching enabled, allowing the agent to understand 'Via account,' 'my credentials,' and 'account settings' as the same intent."
        />

        <ProjectImage
          src="/images/work/ai-agent/topics-queries.jpg"
          alt="Qualtrics topic query taxonomy showing product buckets and query formulas"
          caption="The Qualtrics topic query structure — each bucket had a name, description, and explicit keyword formula. These were the guardrails that ensured known signals were never miscategorized regardless of how the AI handled edge cases."
        />

        <ProjectImage
          src="/images/work/ai-agent/agent-instructions.jpg"
          alt="Copilot Studio agent instructions configuration"
          caption="The agent instructions defined scope, tone, and behavior — including fallback logic for feedback that couldn't be confidently categorized."
        />
      </section>

      <section id="the-validation" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Validation"
          heading="78% to 95% — earning trust through evidence"
        />
        <Body>
          I didn't ask stakeholders to trust the AI. I built a methodology to prove it deserved trust. The validation process ran as a double-blind accuracy audit with Product Managers: I manually categorized a full week of raw feedback. The agent categorized the same feedback independently. Both outputs were stripped of origin labels and reviewed blind by PMs who judged which categorizations were accurate.
        </Body>
        <Body>
          The first audit came back at 78%. Not good enough for production. I refined the agent instructions, improved the grounding queries, and added fallback logic that flagged uncategorized feedback for human review rather than forcing a low-confidence guess. The process repeated weekly until the gap closed.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/evaluation.jpg"
          alt="Copilot Studio evaluation panel showing ten test cases for the Participant Listening Agent"
          caption="The evaluation test set built directly in Copilot Studio — ten representative stakeholder queries used to assess response quality. This made the validation methodology systematic rather than ad hoc."
        />

        <CalloutCard
          variant="light"
          title="95% accuracy after iterative tuning"
          body="After several validation cycles, the agent reached 95% accuracy against expert human categorization — the point at which PMs could no longer reliably distinguish AI output from a trained researcher's work."
        />

        <PullQuote>
          The lead UX researcher who had told me "this will never be as good as human analysis" became one of the system's most vocal advocates.
        </PullQuote>
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Outcomes"
          heading="From synthesis tax to strategic asset"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          <StatCard value="8+ hrs → min" label="Weekly synthesis time" />
          <StatCard value="95%" label="Categorization accuracy" />
          <StatCard value="5 days → same day" label="Insight delivery lag" />
          <StatCard value="20%" label="Research capacity returned" />
          <StatCard value="128" label="Conversation sessions" />
          <StatCard value="4.5 / 5" label="Stakeholder satisfaction" />
        </div>

        <Body>
          The system was deployed and adopted by stakeholders on the Individual Marketplace team. Copilot Studio telemetry showed 128 conversation sessions with a 76% engagement rate and 4.5/5 satisfaction score — signal that PMs were not just using the tool but finding value in it. The most meaningful shift was behavioral: Product Owners who had previously waited for weekly reports started querying the agent proactively during high-stakes launch windows.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/agent-conversation.jpg"
          alt="Example conversation with the Participant Listening Agent in Microsoft Teams showing Plan Comparison as top trending issue"
          caption="A PM asking what the top trending issue was last week. The agent surfaced Plan Comparison Logic at 38% of 256 comments, with representative member quotes — same-day, without a researcher in the loop."
        />

        <ProjectImage
          src="/images/work/ai-agent/analysis-report.jpg"
          alt="Example analysis report output showing categorized feedback with user quotes"
          caption="Agent output delivered to stakeholders: categorized feedback with representative user quotes, surfaced same-day rather than end of week."
        />
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reflection"
          heading="The interface wasn't the hard part"
        />
        <Body>
          What made this project difficult wasn't the technology — Copilot Studio, Qualtrics, Power Automate are accessible tools. The hard part was making AI trustworthy enough that people were willing to delegate important decisions to it. That required compliance-first thinking before the first line of logic, a validation methodology rigorous enough to change a skeptic's mind, and fallback logic that kept humans in the loop where they needed to be.
        </Body>
        <Body>
          The stakeholder needs mapping — specifically the tolerance for ambiguity column — is the piece I'd design more explicitly from the start next time. Each stakeholder's tolerance defines what an acceptable answer looks like. Which means it also defines what an uncertain answer looks like, and whether that uncertainty should be surfaced or absorbed. That's the design work this system left unfinished.
        </Body>
        <Body>
          The natural next step is explicit confidence signaling — not token prediction probability, which is not the same as epistemic reliability. A model can be highly confident in the wrong answer. What stakeholders actually need is a signal grounded in validation history: categories where the agent has a strong track record versus categories where it historically struggles. A researcher with high ambiguity tolerance might see a raw distribution. A VP with very low tolerance would see a single qualified verdict. The same underlying reliability signal, calibrated to the audience.
        </Body>
        <Body mb={false}>
          The skeptic-to-advocate arc — from "this will never be as good as human analysis" to active advocacy — didn't happen because the AI was impressive. It happened because the evidence was undeniable. In agentic AI work, the design challenge isn't the interface. It's earning trust through transparency, iteration, and proof.
        </Body>
      </section>

    </div>
  )
}

export default function AIAgentPage() {
  return (
    <CaseStudyPage
      title="AI Feedback & Insights Agent"
      company="Willis Towers Watson · Individual Marketplace · 2025–2026"
      tags={['Agentic Workflow Design', 'AI Design', 'UX Research']}
      hook="Nobody asked me to build this. I noticed that the research team was spending entire days doing work a well-designed system could do in minutes, and I couldn't stop thinking about what they could be doing instead."
      heroImage="/images/work/ai-agent/hero.jpg"
      heroImageAlt="Participant Listening Agent overview showing agent description, analytics with 128 sessions, 76% engagement, 4.3/5 satisfaction, and the live test panel"
      metrics={[
        { value: '95%', label: 'Categorization accuracy' },
        { value: '8+ hrs → min', label: 'Synthesis time' },
        { value: '5 days → same day', label: 'Insight delivery' },
        { value: '4.5 / 5', label: 'Stakeholder satisfaction' },
      ]}
      details={[
        { label: 'My Role', value: 'Senior UX Designer (self-initiated)' },
        { label: 'Stack', value: 'Copilot Studio, Qualtrics API, Dataverse, Power Automate' },
        { label: 'Timeline', value: '2025–2026' },
        { label: 'Type', value: 'Agentic AI workflow, internal tooling' },
      ]}
      sections={SECTIONS}
      cta={{ title: 'Want to talk through the methodology or the build?' }}
      next={getNextWork('ai-agent')!}
    >
      <PasswordGate
        password="4likh4n"
        onUnlock={() => {}}
        title="Ready to see how it came together?"
        description="The full case study covers the compliance-first design approach, the hybrid categorization architecture, and the validation methodology that took accuracy from 78% to 95%."
        inside={INSIDE}
      >
        <FullCaseStudy />
      </PasswordGate>
    </CaseStudyPage>
  )
}
