'use client'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import CalloutCard from '@/app/components/CalloutCard'
import StatCard from '@/app/components/StatCard'
import ProjectImage from '@/app/components/ProjectImage'
import PullQuote from '@/app/components/PullQuote'
import TabbedAccordion from '@/app/components/TabbedAccordion'
import PasswordGate from '@/app/components/PasswordGate'

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

        {[
          ['The synthesis tax', 'A single researcher spent an entire day each week on categorization and tagging alone — 20% of weekly capacity consumed by work that required domain expertise they didn\'t have, producing outputs that arrived too late to act on.'],
          ['The expert gap', 'The researchers doing the categorization weren\'t subject-matter experts on every product feature they were reviewing. Technical nuance got lost in translation. A Medicare plan comparison bug looked identical to a general navigation complaint unless you knew the product well enough to distinguish them.'],
          ['The distribution lag', 'Even when synthesized correctly, insights sat in static spreadsheets that didn\'t reach the relevant Product Owners until days later. A systemic bug appearing on a Monday wouldn\'t surface until Friday\'s report — at the earliest.'],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid var(--color-border)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.85 }}>{body}</p>
          </div>
        ))}

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
          alt="Qualtrics PII redaction policy configuration showing SSN detection"
          caption="The redaction policy defined the boundary between what the AI could process and what had to stay behind. Legal sign-off on this was the prerequisite for everything else."
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

        <TabbedAccordion
          domains={[
            {
              id: 'shopping',
              label: 'Shopping & Enrollment',
              desc: 'The largest domain — covers every stage of the plan selection journey, from browsing through applying, across all plan types offered on the Via Benefits platform.',
              children: [
                { label: 'Shopping', description: 'General plan browsing and exploration across all product types. Includes error states specific to the shopping experience — pages not loading, filters not working, results not displaying.' },
                { label: 'Plan Comparison', description: 'Via Benefits\' feature allowing users to compare up to three plans side by side. Captures usability feedback, comparison accuracy, and errors within the comparison tool.' },
                { label: 'Current Plan Comparison', description: 'Feature that surfaces a user\'s currently enrolled plan alongside new plan options, enabling direct coverage comparison. Distinct from Plan Comparison — this is post-enrollment context brought into the shopping flow.' },
                { label: 'Plan Details', description: 'Individual plan detail pages — coverage breakdowns, benefit summaries, provider networks, formulary information. Distinct from comparison; this is single-plan deep-dive.' },
                { label: 'Shopping Cart', description: 'The cart experience — selecting, reviewing, and managing plans before applying. Includes cart errors: eligibility conflicts, plan availability issues, bundling problems.' },
                { label: 'Medicare Advantage Shopping', description: 'Feedback specific to browsing and comparing Medicare Advantage plans. Includes MA-specific errors and Group MA — a product variant offered to select employer clients with negotiated MA coverage.' },
                { label: 'Medigap Shopping', description: 'Medicare Supplement plan shopping. Focused on Medigap products only — not MA, MAPD, or PDP. Includes Medigap plan details and Medigap-specific errors.' },
                { label: 'PDP Shopping', description: 'Prescription Drug Plan shopping. Focused on standalone PDP products. Includes PDP plan details and PDP-specific errors.' },
                { label: 'Dental, Vision & Hearing Shopping', description: 'DVH coverage selection — standalone and add-on plans. Includes DVH plan details and DVH-specific errors.' },
                { label: 'Ancillary Shopping', description: 'Supplemental coverage — hospital indemnity, accident, critical illness. Includes ancillary plan details and ancillary-specific errors.' },
                { label: 'Individual & Family Plans', description: 'ACA and pre-65 individual/family coverage. Includes IFP plan details and IFP-specific errors.' },
                { label: 'ICHRA Shopping', description: 'Individual Coverage HRA shopping — added mid-project when Via Benefits launched an ICHRA offering with a pilot client. Tracking ICHRA-specific feedback was a direct business request.' },
                { label: 'Decision Support', description: 'Plan recommendation tools and the Coverage Checkup feature. Captures feedback about tool usability, accuracy of suggestions, and the overall experience of being guided toward a plan.' },
                { label: 'Recommendation Trust', description: 'Whether users trust, rely on, or doubt the plan suggestions generated by Decision Support tools. Surfaces skepticism, mismatched recommendations, and over-reliance.' },
                { label: 'Apply', description: 'The application submission experience — form usability, submission flow, confirmation handling, and follow-up instructions.' },
                { label: 'Submission Issues', description: 'Technical failures during application submission — submit button not working, application not going through, error messages on submission.' },
                { label: 'Next Steps Unclear', description: 'Confusion about what happens after applying — missing confirmation emails, unclear instructions, uncertainty about plan activation.' },
                { label: 'Help Needed After Applying', description: 'Post-application support needs — uploading documents, verifying enrollment, following up on application status.' },
                { label: 'Eligibility', description: 'Feedback about whether users can enroll — eligibility confusion, rejection messages, "why am I ineligible" frustration.' },
                { label: 'Enrollment Reasons', description: 'Qualifying life events, Special Enrollment Periods, Annual Enrollment — confusion about which reason applies, or frustration that no listed reason matches the user\'s situation.' },
              ],
            },
            {
              id: 'account',
              label: 'Account Management',
              desc: 'Authentication and access — the most technically complex feedback category due to MFA variability across devices and carriers.',
              children: [
                { label: 'Multi-Factor Authentication', description: 'MFA setup, verification steps, code delivery failures (text, call, email), authentication errors, and confusion around security prompts. Includes MFA-specific error states.' },
                { label: 'Sign-In', description: 'Login experience — session handling, access issues, "get into the site" feedback. Includes sign-in error states.' },
                { label: 'Sign-Up', description: 'New account creation — registration flow, initial setup, first-time access. Includes sign-up error states.' },
                { label: 'Username & Password', description: 'Credential management — password resets, username confusion, login email issues. Includes credential-specific error states.' },
              ],
            },
            {
              id: 'profile',
              label: 'Profile',
              desc: 'Personal and health information management — the inputs that feed directly into plan matching, eligibility, and recommendation accuracy.',
              children: [
                { label: 'Address', description: 'Mailing and home address — additions, updates, validation errors, ZIP code issues.' },
                { label: 'Social Security Number', description: 'SSN entry, editing, validation. High sensitivity — required for identity verification but frequently causes friction.' },
                { label: 'Medicare Information', description: 'Medicare Beneficiary Identifier (MBI) entry and verification. Confusion about where to enter it, MBI not recognized, Medicare section not working.' },
                { label: 'Contact Information', description: 'Phone number, email address, preferred contact method — updates, visibility, and error handling.' },
                { label: 'Health Information', description: 'Medications, preferred doctors, pharmacy selections — the core inputs that drive plan recommendation accuracy.' },
                { label: 'Health Questionnaire', description: 'Pre-enrollment health assessment questions — why they\'re being asked, what they affect, and confusion about how answers influence plan suggestions.' },
                { label: 'Document Uploader', description: 'QLE documentation submission — birth, death, marriage, divorce, adoption paperwork. File upload failures, format issues, deadline confusion.' },
              ],
            },
            {
              id: 'postenrollment',
              label: 'Post Enrollment',
              desc: 'Feedback from users who have already enrolled — often the most actionable for product owners because it reflects real coverage decisions already made.',
              children: [
                { label: 'Post Enrollment', description: 'General post-enrollment feedback — viewing current plan, accessing plan documents, understanding enrolled coverage.' },
                { label: 'Keep My Current Plan', description: 'Auto-renewal confusion, "do I need to re-enroll" questions, intent to retain existing coverage without making changes.' },
                { label: 'Make Changes to My Plan', description: 'Plan switches, coverage edits, cancellations, adding or removing family members, updating income.' },
              ],
            },
            {
              id: 'funding',
              label: 'Funding',
              desc: 'Health reimbursement account feedback — high stakes because errors directly affect participants\' finances and create compliance exposure.',
              children: [
                { label: 'Funding', description: 'General HRA/funding feedback — locating, understanding, and managing health expense accounts.' },
                { label: 'Qualifying for Funding', description: 'Eligibility confusion, denied funding, barriers to access, unclear qualification criteria.' },
                { label: 'Reimbursements', description: 'Denied claims, delayed payments, failed submissions, approval confusion.' },
                { label: 'Account Balances', description: 'Balance display confusion, fund not updating, zero balance when funds are expected.' },
                { label: 'Account Activity', description: 'Missing transactions, pending reimbursements not posting, payment history issues.' },
              ],
            },
            {
              id: 'helpsupport',
              label: 'Help & Support',
              desc: 'Feedback about how users seek assistance — surfaces gaps in self-service resources and escalation paths.',
              children: [
                { label: 'Help & Support', description: 'General help-seeking feedback — users expressing they need assistance but not specifying where or how.' },
                { label: 'Help & Support Center', description: 'The onsite help center and support documentation — locating it, finding it useful or not, gaps in available articles.' },
                { label: 'Chat Support Experience', description: 'Live chat, virtual assistant, and messaging-based support interactions — responsiveness, resolution rate, confusion.' },
                { label: 'External Education', description: 'Educational resources outside the platform — Medicare.gov, insurance carrier materials, third-party guides.' },
                { label: 'Contact Us', description: 'Direct contact requests — phone support, email inquiries, requests to speak to a person.' },
              ],
            },
            {
              id: 'technical',
              label: 'Technical',
              desc: 'Platform-level issues that cut across all product areas — not specific to any one feature.',
              children: [
                { label: 'Browser Issues', description: 'Browser compatibility, functionality failures, settings requirements — Chrome, Safari, Firefox, Edge. Includes cache/cookie issues, pop-up blockers, extension conflicts.' },
              ],
            },
          ]}
          footer="7 domains · 60+ subcategories · each mapped to a Qualtrics Text IQ query formula grounded in product owner interviews and product documentation"
        />

        {[
          ['Taxonomy and intent mapping', 'I started by interviewing product owners to understand how they thought about user feedback — not just what categories existed, but what signals within feedback indicated each category. That interviews produced a structured taxonomy stored in Dataverse as the single source of truth.'],
          ['Qualtrics Text IQ queries', 'I built topic queries in Qualtrics Text IQ to anchor known patterns to the correct product buckets. These were the guardrails — precise keyword and phrase logic that ensured business-critical signals were never miscategorized, regardless of how the AI performed on edge cases.'],
          ['Copilot Studio as the brain', 'I connected the Dataverse taxonomy to a Copilot Studio agent and grounded it in WTW\'s internal product documentation and knowledge base articles. This gave the AI the product context it needed to interpret ambiguous feedback the way a subject-matter expert would.'],
          ['Power Automate and Teams integration', 'The pipeline ran automatically: new feedback in → redaction → categorization → stakeholder delivery. I also built a conversational interface in Teams so PMs could ask direct questions — "What were the top three complaints from Medicare users this week?" — and get real-time synthesized answers without waiting for a weekly report.'],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingLeft: '1.25rem', borderLeft: '2px solid var(--color-border)' }}>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', fontWeight: 600, marginBottom: '0.35rem' }}>{title}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.85 }}>{body}</p>
          </div>
        ))}

        <ProjectImage
          src="/images/work/ai-agent/topics-queries.jpg"
          alt="Qualtrics topic query taxonomy showing product buckets and query formulas"
          caption="The topic query structure translated product owner mental models into machine-readable logic. Each bucket had a name, description, and explicit query formula."
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
          alt="Example conversation with the Participant Listening Agent in Microsoft Teams"
          caption="PMs queried the agent directly in Teams. A question that would have taken a researcher a day to answer now took seconds."
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
        <Body mb={false}>
          If I were starting over, I'd build validation into day one rather than week three. The skeptic-to-advocate arc — from "this will never be as good as human analysis" to active advocacy — didn't happen because the AI was impressive. It happened because the evidence was undeniable. In agentic AI work, the design challenge isn't the interface. It's earning trust through transparency, iteration, and proof.
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
      heroImageAlt="Participant Listening Agent interface showing categorized feedback and trend analysis"
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
