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
  'the-problem',
  'the-reframe',
  'the-build',
  'the-validation',
  'the-outcomes',
  'the-reflection',
]

const INSIDE = [
  'The before state — what the research workflow actually looked like',
  'Four design decisions that shaped the system',
  'Stakeholder needs and tolerance for ambiguity',
  'Intent mapping and the expert gap',
  'The double-blind validation methodology',
  'From 78% to 95% accuracy',
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
          Willis Towers Watson managed an annual book of business exceeding $1B across Medicare, IFP, DVH, and ancillary benefits. At that scale, participant feedback was constant — website surveys, mobile app feedback, post-call NPS, CSAT — flowing in from hundreds of thousands of members on the Via Benefits platform. During Medicare Open Enrollment, that volume spiked by 1000%.
        </Body>
        <Body mb={false}>
          Every week, a researcher downloaded the raw feedback from Qualtrics, manually categorized each comment in a spreadsheet, and posted it to a Teams channel. That was the entire system. No real-time access, no query capability, no way to ask a follow-up question. Anything more immediate than the weekly summary required a PM or designer to dig through raw data themselves. Quarterly was the cadence for anything resembling actual analysis — and even then, the categorization was only as accurate as the researcher doing it.
        </Body>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Problem"
          heading="Three problems that reinforced each other"
        />
        <Body>
          The research workflow had three structural failures. Each one was bad on its own. Together, they made the voice of the user functionally invisible.
        </Body>

        <CalloutCard
          variant="light"
          title="The synthesis tax"
          body="A researcher spent an entire day each week on categorization and tagging — 20% of weekly capacity consumed by work that required domain expertise they didn't have, producing outputs that arrived too late to act on."
        />
        <CalloutCard
          variant="light"
          title="The expert gap"
          body="The researchers doing the categorization weren't subject-matter experts on every product feature. A Medicare plan comparison bug and a general navigation complaint looked identical unless you knew the product. Miscategorization wasn't an edge case — it was the default for anything domain-specific."
        />
        <CalloutCard
          variant="light"
          title="The distribution lag"
          body="Even when categorized correctly, insights sat in a static spreadsheet until the weekly post. A critical bug surfacing on Monday wouldn't reach the right PM until Friday — at the earliest. During AEP, when feedback volume spiked and speed mattered most, the lag was longest."
        />

        <Body>
          I experienced the expert gap myself. I worked directly on the Shopping and Quoting team, which made me closer to the product than most researchers. But that proximity had limits. If a piece of feedback touched a known technical limitation in another team's domain, I might flag it as a bug when it wasn't one. The member's language didn't tell me which team owned the problem — only product context I didn't have would. The person doing the categorization couldn't know what they didn't know. That's not a failure of effort. It's a structural problem.
        </Body>

        <PullQuote>
          This wasn't just a process inefficiency. It was a compliance and retention risk. The voice of the user was arriving too late to matter.
        </PullQuote>
      </section>

      <section id="the-reframe" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reframe"
          heading="Speed wasn't the problem. The expert gap was."
        />
        <Body>
          The obvious framing was: can AI do this faster? But a faster version of the same flawed process would just produce wrong answers more quickly. The synthesis tax was real, but it was a symptom. The root problem was the expert gap — the mismatch between the people doing the categorization and the domain knowledge required to do it accurately.
        </Body>
        <Body mb={false}>
          The right question was: can AI close the expert gap while handling sensitive healthcare data responsibly? That reframe changed the order of everything that came next. Compliance had to come before capability. Trust had to be earned before adoption. The system had to be right before it could be fast.
        </Body>
      </section>

      <section id="the-build" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Build"
          heading="Four design decisions, not four features"
        />
        <Body>
          The technology choices were secondary. What shaped the system were four specific design decisions — each one made before writing a line of logic.
        </Body>

        <CalloutCard
          variant="light"
          title="1. Redaction at the source"
          body="PHI redaction could have happened anywhere in the pipeline. I chose to enforce it at the Qualtrics layer — before data ever left the feedback system — rather than relying on the agent to handle it downstream. If the agent never sees PHI, the risk surface disappears rather than being managed."
        />
        <Body>
          My first proposal was straightforward: feed the raw feedback directly into the agent. Legal said no. The data contained names, Social Security numbers, Medicare IDs — PHI that couldn't touch a third-party model under any circumstances.
        </Body>
        <Body>
          I didn't push back on the constraint. I designed around it. I researched what Qualtrics could do natively and discovered their redaction logic — structured pattern queries that could strip known identifiers before data ever left the feedback system. I built the policy, tested it, and brought it back to Legal not as a negotiation but as a solution.
        </Body>
        <Body>
          They had one additional requirement: auditability. They needed to demonstrate that redaction had happened, not just trust that it did. I built that into the agent instructions at two levels — reactive PHI audits that could be triggered on demand, and proactive flagging logic that used natural language to surface anything potentially sensitive before it became a problem.
        </Body>
        <Body>
          That sign-off unlocked everything else. Without it, there was no project.
        </Body>
        <ProjectImage
          src="/images/work/ai-agent/redaction-policy.jpg"
          alt="Qualtrics PII redaction policy configuration showing SSN detection pattern"
          caption="The redaction policy built in Qualtrics — SSN pattern detection, structured queries for known identifiers. This ran before any feedback reached the agent. Legal reviewed and approved this configuration before the first line of agent logic was written."
        />
        <CalloutCard
          variant="light"
          title="2. Meeting users where they were"
          body="The agent could have lived anywhere. I chose to surface it in Microsoft Teams because that's where PMs and researchers already spent their day. An insight that requires context-switching to a new tool is an insight that gets ignored. Embedding the agent in Teams meant the barrier to asking a question was the same as the barrier to sending a message."
        />
        <CalloutCard
          variant="light"
          title="3. Structured output by design"
          body="Different stakeholders needed different things from the same data. Executives needed a defensible summary they could bring into a meeting — I designed a structured PowerPoint report template with placeholder logic that the agent populated automatically, delivered via email and posted to a dedicated Teams channel. PMs needed to ask follow-up questions in real time — I built a conversational interface for ad hoc queries. The output format was a design decision, not a technical default."
        />
        <CalloutCard
          variant="light"
          title="4. Intent mapping over keyword matching"
          body="The existing Qualtrics queries were keyword-based — accurate for literal matches, wrong for everything else. I replaced the routing logic with natural language intent mapping: the agent infers what a member meant, not what they literally said. A researcher without Medicare domain knowledge routes 'my plan disappeared' to navigation. The agent routes it to Post Enrollment because it understands the intent. That's what closed the expert gap."
        />

        <Body>
          Before writing a single topic description, I mapped each stakeholder's primary need, secondary need, success criteria, and tolerance for ambiguity. That last field — tolerance for ambiguity — wasn't a description of preferences. It was a design constraint. A researcher can work with uncertain data and find the signal themselves. A VP of Operations cannot. Those are different epistemic requirements, and they drive how the agent responds, not just what it retrieves.
        </Body>

        <StakeholderNeeds />

        <ProjectImage
          src="/images/work/ai-agent/knowledge-sources.jpg"
          alt="Copilot Studio knowledge sources showing Dataverse feedback table and Via Benefits public websites"
          caption="The agent was grounded in both structured data (Dataverse feedback table) and product context (Via Benefits public websites). This is what separated it from a generic LLM — it understood the product it was categorizing feedback about."
        />

        <Body>
          The taxonomy wasn't invented. It mirrors how WTW already organized its products internally — seven domains that stakeholders already used to think and talk about the platform. The agent's job was to bridge the gap between that structure and how members actually talked.
        </Body>
        <Body>
          A member saying "my plan disappeared" doesn't use the words "Post Enrollment." A member saying "why does it keep asking me for a code" doesn't say "Multi-Factor Authentication." The taxonomy was fixed. The language wasn't. Inferring the correct domain from unstructured natural language — without keyword matching — is what the system had to solve.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/taxonomy-diagram.jpg"
          alt="Radial diagram showing the seven feedback taxonomy domains radiating from a central Participant Feedback node"
          caption="Seven domains reflecting WTW's existing product structure. The agent had to route member language into a framework designed for internal stakeholders, not for the people leaving feedback."
        />

        <Body>
          Intent mapping was the intellectual work behind this translation. For each stakeholder type, I mapped the raw language they'd use to query the system, the intent beneath that language, and the taxonomy nodes it resolved to. Each stakeholder's tolerance for ambiguity shaped not just what the agent retrieved, but how it responded.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/intent-mapping.jpg"
          alt="Copilot Studio topic trigger showing natural language description and Account Management entity with smart matching enabled"
          caption="Left: the topic trigger uses a natural language description rather than keyword rules — the agent routes based on semantic intent matching. Right: the Account Management entity with synonyms and smart matching enabled, so 'Via account,' 'my credentials,' and 'account settings' all resolve to the same intent."
        />

        <ProjectImage
          src="/images/work/ai-agent/topics-queries.jpg"
          alt="Qualtrics topic query taxonomy showing product buckets and query formulas"
          caption="The Qualtrics query structure served as guardrails — precise keyword logic that ensured known signals were never miscategorized regardless of how the AI handled edge cases. Structured and AI-based categorization worked together, not in sequence."
        />

        <ProjectImage
          src="/images/work/ai-agent/agent-instructions.jpg"
          alt="Copilot Studio agent instructions configuration"
          caption="The agent instructions defined scope, tone, and fallback behavior — including logic that flagged low-confidence categorizations for human review rather than forcing a guess."
        />
      </section>

      <section id="the-validation" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Validation"
          heading="78% to 95% — trust has to be earned"
        />
        <Body>
          I didn't ask stakeholders to trust the AI. I built a methodology to prove it deserved trust. The validation process ran as a double-blind accuracy audit: I manually categorized a full week of raw feedback. The agent categorized the same set independently. Both outputs were stripped of origin labels and reviewed blind by PMs who judged which categorizations were accurate.
        </Body>
        <Body>
          The first audit came back at 78%. Not good enough. I refined the agent instructions, sharpened the grounding queries, and added fallback logic that flagged uncertain categorizations for human review rather than forcing a low-confidence guess. The cycle repeated weekly until the gap closed.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/evaluation.jpg"
          alt="Copilot Studio evaluation panel showing ten test cases for the Participant Listening Agent"
          caption="The evaluation test set built directly in Copilot Studio — ten representative stakeholder queries used to assess response quality systematically rather than by feel."
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
          The system was deployed and adopted by the Individual Marketplace team. Copilot Studio telemetry showed 128 conversation sessions with a 76% engagement rate and 4.5/5 satisfaction score. The most meaningful shift was behavioral: Product Owners who had previously waited for weekly reports started querying the agent proactively during high-stakes launch windows. The weekly spreadsheet still existed. Nobody used it.
        </Body>

        <ProjectImage
          src="/images/work/ai-agent/agent-conversation.jpg"
          alt="Example conversation with the Participant Listening Agent in Microsoft Teams showing Plan Comparison as top trending issue"
          caption="A PM asking what the top trending issue was last week. The agent surfaced Plan Comparison Logic at 38% of 256 comments with representative member quotes — same-day, without a researcher in the loop."
        />

        <ProjectImage
          src="/images/work/ai-agent/analysis-report.jpg"
          alt="Example analysis report output showing categorized feedback with user quotes"
          caption="The structured report template — populated by the agent and delivered to executives and PMs automatically. Designed for people who need a defensible summary, not a data dump."
        />
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reflection"
          heading="An AI project that isn't really about AI"
        />
        <Body>
          The technology in this project — Copilot Studio, Qualtrics, Power Automate — is accessible to most product teams today. None of it was the hard part. The hard part was making AI trustworthy enough that people were willing to delegate important decisions to it. That required earning legal sign-off before writing the first line of logic, building a validation methodology rigorous enough to change a skeptic's mind, and designing fallback behavior that kept humans in the loop where they needed to be.
        </Body>
        <Body>
          The stakeholder needs mapping — specifically the tolerance for ambiguity column — is the piece I'd design more explicitly from the start next time. Each stakeholder's tolerance defines what an acceptable answer looks like. Which means it also defines what an uncertain answer looks like, and whether that uncertainty should be surfaced or absorbed. That's the design work this system left unfinished: explicit confidence signaling calibrated to the audience, grounded in validation history rather than token prediction probability.
        </Body>
        <Body>
          This project didn't improve a product. It improved the conditions under which good product decisions could be made. The research team didn't get a faster version of the old process — they got a fundamentally different one. That's not acceleration. That's leverage.
        </Body>
        <Body mb={false}>
          Design isn't always about creating better interfaces. Sometimes the highest-leverage opportunity is redesigning how work gets done — understanding the people inside the organization, not just the customers. The skeptic-to-advocate arc didn't happen because the AI was impressive. It happened because the evidence was undeniable. The AI wasn't the point. The system was.
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
      hook="During Medicare Open Enrollment, researchers were spending entire days manually categorizing participant feedback. I realized the bottleneck wasn't the volume — it was the workflow. So I built a system that automated the process, closed the expert gap, and reduced synthesis from hours to minutes."
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
        description="The full case study covers the four design decisions that shaped the system, the stakeholder needs mapping, and the validation methodology that took accuracy from 78% to 95%."
        inside={INSIDE}
      >
        <FullCaseStudy />
      </PasswordGate>
    </CaseStudyPage>
  )
}
