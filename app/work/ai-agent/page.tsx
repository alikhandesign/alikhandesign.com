'use client'
import { useState, useRef, useId } from 'react'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import CalloutCard from '@/app/components/CalloutCard'
import StatCard from '@/app/components/StatCard'
import { ProjectImage } from '@/app/components/Lightbox'
import BeforeAfterQuote from '@/app/components/BeforeAfterQuote'
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
    primaryNeed: 'To be heard accurately, feedback categorized to what they actually meant, not what their words literally matched.',
    secondaryNeed: 'Not applicable. They don\'t query the system. They are the source of its data.',
    successCriteria: 'Their feedback routes to the correct taxonomy node regardless of how they phrased it.',
    toleranceForAmbiguity: 'Not applicable, but the system\'s tolerance on their behalf must be very low. Miscategorization means their signal is lost.',
    relationshipToSystem: 'Source population, not users. Their language is the hardest to interpret: emotionally loaded, domain-naive, and varied across six product lines.',
  },
  {
    label: 'UX Researchers & Designers',
    primaryNeed: 'Pattern recognition, meaning what members are actually experiencing, in their own words.',
    secondaryNeed: 'Sentiment correlation, longitudinal trends, taxonomy edge cases, proactive anomaly detection.',
    successCriteria: 'Enough fidelity to form or validate a hypothesis.',
    toleranceForAmbiguity: 'High. Comfortable with uncertainty and expect to interpret the data themselves.',
    relationshipToSystem: 'Primary operator. The system was built to serve their synthesis workflow first.',
  },
  {
    label: 'Product Managers',
    primaryNeed: 'Prioritization signal: what\'s broken, how bad, what to fix first.',
    secondaryNeed: 'Feature-specific feedback, population-specific feedback (ICHRA, Medicare vs. IFP), pre-release risk assessment.',
    successCriteria: 'A clear answer they can bring into sprint planning or a roadmap conversation.',
    toleranceForAmbiguity: 'Low. Needs something actionable, not a pile of raw signal.',
    relationshipToSystem: 'Consumer of synthesized output. Needs answers, not data.',
  },
  {
    label: 'Leadership',
    primaryNeed: 'Confirmatory signal: is what we think is happening actually happening.',
    secondaryNeed: 'Throughput and system performance, year-over-year trends, resourcing justification.',
    successCriteria: 'A synthesized, defensible answer, not raw data.',
    toleranceForAmbiguity: 'Very low. Needs yes/no with evidence, not "it depends".',
    relationshipToSystem: 'Consumer of high-level output. Least tolerant of ambiguity, most dependent on confidence signaling.',
  },
  {
    label: 'Engineering',
    primaryNeed: 'Isolate technical failure signals from experiential feedback: bugs, errors, compatibility issues, broken flows.',
    secondaryNeed: 'Volume and frequency of specific technical issues, platform or browser-specific patterns, correlation between technical issues and other categories.',
    successCriteria: 'Enough specificity to open a ticket, ideally with enough member-reported detail to reproduce the issue.',
    toleranceForAmbiguity: 'Low. "Members are frustrated with enrollment" is useless. "Plan comparison crashes on Safari with more than two plans in comparison" is actionable.',
    relationshipToSystem: 'Consumer of a specific taxonomy slice: Browser Issues, Technical, and categories where member language suggests system failure rather than UX confusion.',
  },
  {
    label: 'Account Managers',
    primaryNeed: 'Client retention signal: are members of a specific employer account having a disproportionately bad experience.',
    secondaryNeed: 'Client-specific volume trends, comparison against broader population benchmarks, escalation evidence for account reviews.',
    successCriteria: 'A clear yes/no on whether a specific client needs attention, with enough supporting evidence to bring into an account review conversation.',
    toleranceForAmbiguity: 'Low. Needs something specific enough to act on before a client relationship is at risk.',
    relationshipToSystem: 'Consumer of a specific filtered slice: same taxonomy, same agent, always scoped to a client identifier.',
  },
  {
    label: 'Legal & Compliance',
    primaryNeed: 'Assurance that the agent never receives HIPAA or PHI data.',
    secondaryNeed: 'Auditability, meaning demonstrating that redaction happened before data reached Copilot Studio.',
    successCriteria: 'A clear, documented redaction policy that can be reviewed and approved.',
    toleranceForAmbiguity: 'Zero. Binary. Either PHI reaches the agent or it doesn\'t.',
    relationshipToSystem: 'Constraint, not user. Their requirements shaped the architecture. They don\'t query the output.',
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

// ─── Local helpers ───────────────────────────────────────────────────────────

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: 'var(--font-size-xl)',
        fontWeight: 600,
        lineHeight: 'var(--line-height-tight)',
        color: 'var(--color-text)',
        margin: '2.5rem 0 1rem',
      }}
    >
      {children}
    </h3>
  )
}

function Emphasis({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderLeft: '2px solid var(--color-accent)',
        paddingLeft: 'var(--space-5)',
        margin: '2rem 0',
      }}
    >
      <Body mb={false}>{children}</Body>
    </div>
  )
}

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
  'Three real examples of feedback that gets miscategorized, and the wrong design work that follows',
  'Why redaction became an architectural guarantee rather than an instruction',
  'What I chose not to build, and what that cost',
  'The double-blind audit, and why 95% was the ceiling worth stopping at',
]

// ─── Pre-gate preview ────────────────────────────────────────────────────────

function Preview() {
  return (
    <div style={{ maxWidth: 680, marginBottom: '3rem' }}>
      <Body>
        {`Researchers at Via Benefits spent a full day every week reading participant feedback and sorting it by hand. During Medicare Open Enrollment, that volume increased tenfold.`}
      </Body>
      <Body>
        {`The obvious fix was speed. But sorting feedback is really a routing decision, choosing which team owns a problem, and the people making that call weren't experts in every product area. "How do I keep my plan?" reads like an enrollment question. Most Medicare plans renew automatically, so a clearer enrollment flow solves nothing. Miscategorization didn't only misroute feedback. It produced confident design work aimed at problems members didn't have.`}
      </Body>
      <Body>
        {`So the real question wasn't whether AI could go faster. It was whether AI could be faster and more accurate at once.`}
      </Body>
      <Body>
        {`I built an agent that reads participant feedback, categorizes it against the product taxonomy WTW already used internally, and answers questions about it in Microsoft Teams. Legal refused the first version outright, since the data carried names, Social Security numbers, and Medicare IDs. The redaction policy I designed in response became the architecture, enforced before data ever left the feedback system rather than trusted to a model downstream.`}
      </Body>
      <Body>
        {`To prove it worked, I ran a double-blind audit built with the researchers most skeptical of it. My categorizations and the agent's were stripped of origin labels and graded by product managers. The first round came back at 78%. Several cycles of tuning later, they could no longer reliably tell which set was mine.`}
      </Body>
      <Body mb={false}>
        {`Weekly synthesis dropped from eight hours to minutes. Insight delivery went from up to a week to same day. The research team got back a fifth of its capacity.`}
      </Body>
    </div>
  )
}

// ─── Full case study (behind the gate) ───────────────────────────────────────

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Context"
          heading="A billion-dollar book of business generating feedback nobody could keep up with"
        />
        <Body>
          {`Willis Towers Watson ran Via Benefits, a private marketplace where individuals, mostly retirees, shop for and enroll in health coverage. It carried an annual book of business exceeding $1B across Medicare, Individual and Family Plans, Dental, Vision, and Hearing, and other ancillary benefits.`}
        </Body>
        <Body>
          {`Feedback arrived constantly from hundreds of thousands of people: website surveys, mobile app feedback, post-call NPS, and CSAT.`}
        </Body>
        <Body mb={false}>
          {`The weekly pass was entirely manual. A researcher pulled the raw feedback out of Qualtrics, categorized each comment, and scrubbed PHI and PII line by line before any of it could be shared. The cleaned summary went to a Teams channel every Monday, covering the week prior. Live access to the raw data required a Qualtrics seat, so everyone else asked a researcher and waited, often a full day for a single question.`}
        </Body>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Problem"
          heading="Three problems that reinforced each other"
        />
        <Body>
          {`These three problems didn't happen in isolation. Each one made the other two worse.`}
        </Body>
        <Emphasis>
          <strong>The synthesis tax.</strong>
          {` A researcher spent a full day each week on categorization, cleanup, and redaction. That was 20% of weekly capacity going to work that required domain expertise they didn't have, producing outputs that arrived too late to act on.`}
        </Emphasis>
        <Emphasis>
          <strong>The expert gap.</strong>
          {` Categorization was really a routing decision. Choosing a bucket meant deciding which team owned the problem, and the people making that call weren't subject-matter experts on every product feature. Getting it wrong sent feedback to a team that couldn't act on it while the team that could never saw it. It also corrupted every trend report built on those categories, which is how a real pattern gets buried and a phantom one gets reported.`}
        </Emphasis>
        <Emphasis>
          <strong>The distribution lag.</strong>
          {` Insights sat in a spreadsheet until the Monday post. Feedback arriving on a Monday waited a full week before anyone outside the research team saw it. During Open Enrollment the cycle stayed the same length, but ten times the volume meant ten times as many issues sitting undelivered.`}
        </Emphasis>
        <Body>
          {`I ran into the expert gap myself. I helped with the feedback process from time to time, and I worked on the Shopping and Quoting team, so I was closer to the product than most researchers were. That proximity still had limits. If a comment touched a known technical limitation in another team's domain, I might file it as a bug when it wasn't one. The person doing the categorization couldn't know what they didn't know. That's structural.`}
        </Body>
        <Body mb={false}>
          {`Researcher hours were the smallest part of the cost. `}
          <strong>{`Feedback that arrives late and miscategorized is a compliance and retention risk.`}</strong>
          {` The signal that something is failing a participant reaches the people who can fix it after the window to fix it has closed.`}
        </Body>
      </section>

      <section id="the-reframe" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reframe"
          heading="Faster was the easy half"
        />
        <Body>
          {`The obvious framing was: can AI do this faster? Automating categorization would give back the day a researcher spent tagging and collapse the delivery lag. Both were real wins, and neither was hard to imagine.`}
        </Body>
        <Body>
          {`But a faster version of the same flawed process just produces wrong answers more quickly. The synthesis tax and the distribution lag were symptoms. The expert gap was the thing underneath them. Speed alone would leave it untouched.`}
        </Body>
        <Body mb={false}>
          {`So the question I actually had to answer was: `}
          <strong>{`can AI speed up synthesis while categorizing feedback more accurately than the researchers could?`}</strong>
          {` That second half is where the design work lived.`}
        </Body>
      </section>

      <section id="the-build" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Build"
          heading="Following the data, from a raw survey response to a decision someone can act on"
        />
        <ProjectImage
          src="/images/work/ai-agent/data-journey-simplified.png"
          alt="Flow diagram showing seven stages: capture, redact, categorize, move, reason, deliver, review, with return arrows from review back to redact, categorize, and reason"
          caption="The path a piece of feedback travels. The return arrows matter most: every human correction feeds back into redaction, categorization, or the agent's instructions."
        />

        <SubHead>Redaction at the source</SubHead>
        <Body>
          {`My first proposal was straightforward: feed the raw feedback directly into the agent. Legal said no. The data contained names, Social Security numbers, and Medicare IDs, none of which could touch a third-party model.`}
        </Body>
        <Body>
          {`I didn't push back on the constraint. I designed around it. Qualtrics could strip known identifiers natively through structured pattern queries, so I built the policy, tested it, and brought it back to Legal with the problem already solved.`}
        </Body>
        <CalloutCard
          variant="light"
          title="Redaction as architecture"
          body="Redaction could have happened anywhere in the pipeline. I enforced it at the Qualtrics layer, before data ever left the feedback system, rather than relying on the agent to handle it downstream. If the agent never sees PHI, the risk surface disappears instead of being managed."
        />
        <Body>
          {`Pattern queries are reliable for anything with a predictable shape. They are far less reliable for names, and the hardest cases are contextual. A provider's name only counts as PHI beside a participant's own. "I was not able to add Dr. Chen to the provider list" is not PHI. "I was not able to add Susan's oncologist, Dr. Chen, to her provider list" is. No regex expresses that distinction, so a second pass on Azure OpenAI Service read each record on export, flagging anything it wasn't sure about and withholding it from the agent entirely.`}
        </Body>
        <Body mb={false}>
          {`Legal never asked for auditability. I built it anyway, because `}
          <strong>{`a compliance policy you can't demonstrate is one you're asking people to take on faith.`}</strong>
          {` Being able to prove redaction had happened is what turned a hard no into a sign-off.`}
        </Body>
        <ProjectImage
          src="/images/work/ai-agent/redaction-policy.png"
          alt="Qualtrics redaction policy detail for the US Social Security Number detector, showing zero exemptions granted and a panel for testing sample text"
          caption="The SSN detector in the Qualtrics redaction policy, with zero exemptions and no surveys excluded. The test panel let me verify each detector against sample text before it went live, and Legal reviewed the configuration before the first line of the system prompt was written."
        />

        <SubHead>Categorization and grounding</SubHead>
        <Body>
          {`An LLM reading raw comments is very good at telling you what someone meant and much less reliable at telling you how many people meant it. Categorization also drifts at volume, where the same comment read alone and read inside a batch of two thousand can land in different buckets.`}
        </Body>
        <Body>
          {`So I pre-categorized in Qualtrics using TextIQ, tagging each record against the taxonomy before it reached the agent. Counting became a filter on a column rather than a reading task. TextIQ also removed the forced choice: a comment can carry more than one tag, so feedback touching two domains surfaces under both instead of being assigned to whichever one a person judged more important.`}
        </Body>
        <CalloutCard
          variant="light"
          title="Neither asked to do the other's job"
          body="Structured categorization handled anything that needed to be counted or filtered reliably. The LLM handled interpretation, nuance, and the comments that didn't fit cleanly anywhere."
        />
        <Body>
          {`Pre-categorization handled structure. Product context handled the expert gap itself. Three examples make the difference concrete.`}
        </Body>
        <Emphasis>
          {`“How do I keep my plan?” reads as an enrollment question, and the fix looks like a clearer re-enrollment flow. Most Medicare plans renew automatically. `}
          <strong>{`The member is describing anxiety about whether action is needed, and a better enrollment flow doesn't touch it.`}</strong>
        </Emphasis>
        <Emphasis>
          {`“My current plan is showing the wrong price.” reads as a bug, so it becomes a ticket and engineering hunts a display error. Premium data is frozen at the enrollment date because carriers don't provide year-over-year updates. `}
          <strong>{`Nothing is broken, so there's nothing to fix in code.`}</strong>
        </Emphasis>
        <Emphasis>
          {`“I can’t get through to anyone.” reads as a scheduling problem, so appointment booking gets more prominent. During Open Enrollment members could call without an appointment, and the site never told them. `}
          <strong>{`Call volume doesn't move and the communication gap stays open.`}</strong>
        </Emphasis>
        <Body mb={false}>
          {`In each case the miscategorization does more than misroute feedback. It produces confident, well-intentioned design work aimed at a problem the member doesn't have. Grounding the agent in the Via Benefits product sites alongside the feedback table is what let it tell these apart, and it's the kind of product context a researcher had no reliable way to get.`}
        </Body>

        <SubHead>Synthesis mechanics</SubHead>
        <Body>
          {`The agent's instructions were the surface I designed: what it would answer, what it would decline, and what it did when its own confidence was low. That last one carried the most weight. The instructions told it to flag an uncertain categorization for human review instead of forcing a guess, and the 95% later in this case study only means something because the agent was allowed to say it didn't know.`}
        </Body>
        <Body mb={false}>
          {`Copilot Studio handles high-volume aggregation natively. I could have built custom middleware to control that and chose not to, which means I can't fully explain why a particular synthesis came out the way it did. For an internal tool with a human review path behind it, that was worth trading. For a system deciding without a person in the loop, it wouldn't be.`}
        </Body>

        <SubHead>Structured output</SubHead>
        <Body>
          {`Before changing anything about how the agent answered, I mapped each stakeholder's needs, success criteria, and tolerance for ambiguity. That last field did the most work. A researcher can sit with uncertain data and find the signal themselves. A VP of Operations cannot.`}
        </Body>
        <StakeholderNeeds />
        <Body mb={false}>
          {`Executives needed a defensible summary, so the agent populated a structured report template automatically. It ran on two cadences because two different questions were being asked: daily kept feedback current enough to act on, weekly waited for enough volume that a trend was real.`}
        </Body>
        <ProjectImage
          src="/images/work/ai-agent/intent-map.png"
          alt="Intent map table with one representative query for each of six stakeholder groups, showing raw query, intent, taxonomy nodes, and ambiguity tolerance"
          caption="A slice of the intent map, one query per stakeholder group. Legal and Compliance is the row worth reading twice: their question isn't a taxonomy query at all, and their tolerance for ambiguity is zero, which is why redaction became an architectural guarantee rather than an instruction."
        />

        <SubHead>Human in the loop</SubHead>
        <Body>
          {`Building this meant accepting that categorization would sometimes be wrong and redaction would sometimes miss. The two failures get different treatment, deliberately, because `}
          <strong>{`the severity of the failure sets the severity of the intervention.`}</strong>
        </Body>
        <CalloutCard
          variant="light"
          title="A human stays in the loop for both failures"
          body="I could have automated both failure paths away: auto-purge anything flagged as sensitive, auto-discard anything the agent couldn't categorize. I built a person into both instead. A false positive on redaction should be reviewed, not erased. A miscategorized comment should be caught, not hidden. Automating either one trades a small, visible problem for a larger, invisible one."
        />
        <Body>
          {`Sensitive records never reach the agent and instead fire an alert to me and the researchers. The alert deliberately doesn't contain the flagged content, since putting suspected PHI in a Teams message to warn people about PHI would relocate the problem rather than solve it.`}
        </Body>
        <Body mb={false}>
          {`Uncategorized feedback stays visible. Withholding it would have been the safer-looking choice and the wrong one. A miscategorized comment is a small accuracy problem. A comment hidden from everyone is lost signal, and lost signal is what this project existed to fix.`}
        </Body>

        <SubHead>Delivery in Teams</SubHead>
        <Body>
          {`The agent could have lived anywhere. I put it in Microsoft Teams because that channel was already where the questions were happening. It's where the Monday report landed, and where a PM went when they wanted a researcher to dig into something, which is the request that used to take a day.`}
        </Body>
        <Body mb={false}>
          {`The question a PM used to type at a researcher could now be typed at the system and answered in the same minute.`}
        </Body>
        <ProjectImage
          src="/images/work/ai-agent/agent-conversation.png"
          alt="Microsoft Teams conversation where a product manager asks the agent for the top trending issue and receives Plan Comparison Logic at 38 percent of 256 comments, then asks for a specific comment ID and receives its timestamp, client segment, and a link to the FullStory session"
          caption="The agent surfacing Plan Comparison Logic at 38% of 256 comments with representative participant quotes, same day, without a researcher in the loop."
        />
        <ProjectImage
          src="/images/work/ai-agent/data-journey-full.png"
          alt="Detailed flowchart of the full pipeline from Qualtrics survey response through redaction, categorization, Power Automate, the Azure OpenAI sensitivity check, Dataverse, the Copilot agent ecosystem, and three report outputs, with human review paths feeding back upstream"
          caption="The complete flow, including what the summary leaves out: the second PHI check on export, flagged records held in isolation, and the three paths a human correction takes back into the system."
        />
      </section>

      <section id="the-validation" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Validation"
          heading="78% to 95%: trust has to be earned"
        />
        <Body>
          {`I didn't ask stakeholders to trust the AI. I built a methodology to prove it deserved trust, and I built it with the researchers most skeptical of it. `}
          <strong>{`A validation method the skeptics helped construct is much harder to dismiss than one handed to them.`}</strong>
        </Body>
        <Body>
          {`I categorized and synthesized a full week of raw feedback. The agent did the same set independently. Both outputs were stripped of origin labels, set side by side as Set A and Set B, and reviewed blind by PMs who marked whether the two agreed on the domain and on the summary. The accuracy figure is that agreement rate.`}
        </Body>
        <Body mb={false}>
          {`The first audit came back at 78%. I refined the instructions, sharpened the grounding queries, and added fallback logic for uncertain categorizations. The cycle repeated weekly until the gap closed.`}
        </Body>
        <ProjectImage
          src="/images/work/ai-agent/double-blind-audit.jpg"
          alt="Audit tracker spreadsheet with columns for feedback text, Set A category and synthesis notes, Set B category and synthesis notes, a product owner review verdict, and a match column"
          caption="A recreation of the audit tracker, built with synthetic feedback so no participant data leaves WTW. Each row pairs the two outputs with origin labels stripped. This shows a section of an earlier run. Agreement across the full audit reached 95%."
        />
        <BeforeAfterQuote
          beforeLabel="Before validation"
          beforeQuote="“This will never be as good as human analysis”"
          beforeAttribution="– Lead UX Researcher"
          afterLabel="After the 95% result"
          afterStruckQuote="“This revolutionary AI will transform everything!”"
          afterQuote="“This is cool!”"
          afterAttribution="– Same Lead UX Researcher"
          note="Okay, maybe not that dramatic. But the skepticism was real, and the validation changed minds."
        />
        <SubHead>Why 95% and not higher</SubHead>
        <Body mb={false}>
          {`Ninety-five wasn't a target picked in advance. It's where the audit stopped being able to tell the difference. Pushing higher would have meant forcing guesses on genuinely ambiguous records or tuning against the audit set, and both would have raised the number while lowering what it meant. Human categorization isn't perfectly consistent either. Parity with expert judgment was the honest ceiling.`}
        </Body>
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Outcomes"
          heading="From synthesis tax to strategic asset"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-4)',
            margin: '2rem 0 2.5rem',
          }}
        >
          <StatCard value="8+ hrs → min" label="Weekly synthesis time" />
          <StatCard value="95%" label="Categorization & synthesis accuracy" />
          <StatCard value="7 days → same day" label="Insight delivery lag" />
          <StatCard value="20%" label="Research capacity returned" />
          <StatCard value="128" label="Conversation sessions" />
          <StatCard value="4.3 / 5" label="Stakeholder satisfaction" />
        </div>
        <Body>
          {`The system was deployed and adopted by the Individual Marketplace team, with telemetry showing 128 conversation sessions at a 76% engagement rate and a 4.3/5 satisfaction score.`}
        </Body>
        <Body>
          {`The most meaningful shift was behavioral. Product Owners who had waited for the Monday report started querying the agent directly during high-stakes launch windows. The weekly spreadsheet still existed. Nobody used it.`}
        </Body>
        <Body mb={false}>
          {`What the research team did with the recovered capacity is the outcome that matters most to me. A fifth of their week had been going to tagging spreadsheets. It went back to interviews, observation sessions, and time with actual participants, which is work no system in this pipeline can do.`}
        </Body>
        <ProjectImage
          src="/images/work/ai-agent/analysis-report.jpg"
          alt="Structured analysis report slide populated automatically by the agent, summarizing feedback themes for an executive audience"
          caption="The structured report the agent populated and delivered on its own. Built for people who need a defensible summary they can carry into a meeting rather than a data dump."
        />
      </section>

      <section id="the-reflection" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reflection"
          heading="An AI project that isn't really about AI"
        />
        <Body>
          {`The technology here is accessible to most product teams today. None of it was the hard part. `}
          <strong>{`The hard part was making AI trustworthy enough that people were willing to delegate real decisions to it,`}</strong>
          {` which meant earning legal sign-off before writing the first line of the system prompt, building a validation methodology rigorous enough to change a skeptic's mind, and designing fallback behavior that kept humans in the loop where they needed to be.`}
        </Body>
        <Body>
          {`The first thing I'd build is the gap I already know about: the system doesn't tailor its answers to who's asking. I mapped each stakeholder's tolerance for ambiguity during the build, and that shaped the responses and the output formats, but the agent itself makes no judgment about its audience mid-conversation. Copilot supports that. I didn't build it. A researcher and a VP get the same handling of an uncertain answer when they need different things from it.`}
        </Body>
        <Body>
          {`After that, I'd give it more to look at: AI-generated FullStory session summaries, call center agent notes, and call transcripts. Each brings its own privacy problem, and transcripts are the hardest, since nearly every call opens with identity verification. I'd also split it into two agents, one for ingestion and one for synthesis, so a change to the interpretive half couldn't destabilize the compliance-critical one. And it's still entirely pull-based. Nobody hears about a spike unless they go looking.`}
        </Body>
        <Body mb={false}>
          {`Design isn't always about creating better interfaces. Sometimes the highest-leverage opportunity is redesigning how work gets done, understanding the people inside the organization as well as the customers. The skeptic-to-advocate arc came down to evidence. The AI being impressive would never have been enough.`}
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
      hook="During Medicare Open Enrollment, researchers were spending entire days manually categorizing participant feedback. I realized the bottleneck wasn't the volume, it was the workflow. So I built a system that automated the process, covered the researchers' product blind spots, and reduced synthesis from hours to minutes."
      heroImage="/images/work/ai-agent/hero.png"
      heroImageAlt="A product manager querying the Participant Listening Agent in Microsoft Teams, shown on a laptop. The agent reports the top trending issue as Plan Comparison Logic at 38% of 256 comments, with representative participant quotes."
      metrics={[
        { value: '95%', label: 'Categorization & synthesis accuracy' },
        { value: '8+ hrs → min', label: 'Synthesis time' },
        { value: '7 days → same day', label: 'Insight delivery' },
      ]}
      details={[
        { label: 'My Role', value: 'AI Product Design & Systems Design (self-initiated, cross-functional)' },
        { label: 'Stack', value: 'Copilot Studio (GPT-5), Qualtrics API and TextIQ, Azure OpenAI Service, Dataverse, Power Automate' },
        { label: 'Timeline', value: '2025–2026' },
        { label: 'Type', value: 'Agentic AI workflow, internal tooling' },
      ]}
      sections={SECTIONS}
      cta={{ title: 'Want to talk through the methodology or the build?' }}
      next={getNextWork('ai-agent')!}
    >
      <Preview />
      <PasswordGate
        onUnlock={() => {}}
        title="Ready to see how it came together?"
        description="The full case study covers the design decisions behind the system: how a Legal refusal became the architecture, how the agent closed a gap the researchers couldn't, and how the validation methodology got from 78% to 95%."
        inside={INSIDE}
      >
        <FullCaseStudy />
      </PasswordGate>
    </CaseStudyPage>
  )
}
