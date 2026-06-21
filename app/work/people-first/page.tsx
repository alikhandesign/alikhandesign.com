'use client'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import StatCard from '@/app/components/StatCard'
import ProjectImage from '@/app/components/ProjectImage'
import PullQuote from '@/app/components/PullQuote'
import PasswordGate from '@/app/components/PasswordGate'

const SECTIONS = [
  'the-context',
  'the-problem',
  'the-research',
  'the-insight',
  'the-design',
  'the-outcomes',
  'the-reflection',
]

const INSIDE = [
  'FullStory analysis and rage click findings',
  'User interview synthesis and key insights',
  'The stakeholder pivot that reversed the product-first mandate',
  'Before and after design comparisons',
  'Minimal Viable Identity framework',
  'Full outcome metrics and business impact',
]

function FullCaseStudy() {
  return (
    <div>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Context"
          heading="A legacy product built for the business, not the user"
        />
        <Body>
          Via Benefits is Willis Towers Watson&apos;s individual benefits marketplace, used by Medicare-eligible retirees to shop for health insurance coverage. The platform handles hundreds of thousands of enrollments annually, making every friction point in the funnel a meaningful business problem.
        </Body>
        <Body mb={false}>
          I joined as the sole UX designer on the shopping experience team. My mandate was broad: improve the enrollment experience. What I found was a product designed entirely around how WTW had organized its insurance inventory, with no apparent consideration for how a retiree actually thinks about buying health insurance.
        </Body>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Problem"
          heading="A technical gate that stopped users before they could start"
        />
        <Body>
          The first thing a user encountered on the Via Benefits shopping site was a selector asking them to choose between Medicare Plans and Individual and Family Plans. On the surface, a reasonable starting point. In practice, a wall.
        </Body>
        <Body>
          Most retirees didn&apos;t arrive with a clear sense of which insurance category they needed. They knew who they were shopping for and roughly what they needed. They didn&apos;t know the difference between a Medicare Advantage plan and a Medigap supplement, and they shouldn&apos;t have to.
        </Body>

        <ProjectImage
          alt="The original Prepare to Shop page, showing the product-type selector users had to clear before shopping"
          caption="Before: users had to choose a plan category before they could see anything, with no way to know which category applied to them."
        />

        <PullQuote>
          They just want to see what&apos;s available for them. They don&apos;t want to answer a test question first.
        </PullQuote>
      </section>

      <section id="the-research" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Research"
          heading="Diagnosing the failure with data and listening"
        />
        <Body>
          I ran a dual-track research initiative. FullStory sessions revealed a dense cluster of rage clicks at exactly the plan type selector. To understand why, I ran moderated interviews where participants were shown the actual current Prepare to Shop page and asked to react to it directly, rather than describing the problem in the abstract.
        </Body>

        <PullQuote>
          Why do I have to pick a product first? I don&apos;t know what product I need.
        </PullQuote>

        <Body mb={false}>
          To measure task completion, I built a FullStory funnel in strict order from Prepare to Shop to Shopping Results. The Escape Hatch option still routed through Prepare to Shop, so a single funnel captured both the identity-first path and the plan-type path without redefining who counted as having completed the flow.
        </Body>
      </section>

      <section id="the-insight" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Insight"
          heading="The product was asking users to think like the business"
        />
        <Body>
          When I asked participants what the first question on the site should be, they didn&apos;t describe plan categories. They described people. &quot;Who needs coverage.&quot; &quot;My age.&quot; &quot;Who&apos;s in my household.&quot; Without being prompted, they were designing the entry point I&apos;d eventually ship.
        </Body>
        <Body mb={false}>
          The entry point was organized around WTW&apos;s product taxonomy, not around how a person shops for insurance. The fix followed directly from what users had already told me: stop asking what they want to buy, start asking who they are. I called the result a minimal viable identity, the smallest set of inputs &mdash; age, date of birth, zip code &mdash; the system actually needed to do its job.
        </Body>

        <PullQuote>
          The system only needed three data points to do its job. We had been asking users to do that job for us.
        </PullQuote>
      </section>

      <section id="the-design" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Design"
          heading="An identity-first entry point that removed the technical gate"
        />
        <Body>
          The redesigned selector led with a simple question: who are you shopping for? From there, users provided age and zip code, and the system handled eligibility filtering entirely in the background. I also designed an &quot;Escape Hatch&quot; for users who already knew their plan type, satisfying sophisticated users without making that the default path for everyone.
        </Body>

        <ProjectImage
          src="/images/work/people-first/hero.jpg"
          alt="The redesigned Prepare to Shop page, showing the identity-first household and coverage selector"
          caption="After: the redesigned selector leads with who the coverage is for, then surfaces eligible benefit types directly, no category guess required."
        />
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Outcomes"
          heading="Every key metric moved in the right direction"
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          <StatCard value="45%" label="Faster time-to-convert (2m 55s to 1m 36s)" />
          <StatCard value="15%" label="Lift in total enrollments" />
          <StatCard value="50%" label="Reduction in rage clicks" />
          <StatCard value="33%" label="Increase in task completion" />
        </div>
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reflection"
          heading="What I'd do differently, and what I learned"
        />
        <Body>
          The hardest part of this project wasn&apos;t the design. It was dismantling a belief that had calcified into institutional fact. Multiple PMs had told me the product-first gate was a hard requirement. When I shared the research with the Head of Product, he told me he&apos;d never believed it had to be product-first &mdash; the mandate everyone cited had never actually been decided by the person whose decision it would have been. That&apos;s a lesson I carry into every project now: question the constraints before you design within them.
        </Body>
        <Body mb={false}>
          If I were doing this project again, I&apos;d move to stakeholder alignment earlier. And I&apos;d push harder for qualitative follow-up research after launch &mdash; the metrics told us what changed, but not how users felt about the new experience.
        </Body>
      </section>

    </div>
  )
}

export default function PeopleFirstPage() {
  return (
    <CaseStudyPage
      title="People-First Enrollment Redesign"
      company="Via Benefits · WTW · 2023"
      tags={['UX Research', 'Product Strategy']}
      hook="What happens when a product is designed around how the business works instead of how people think? For Medicare enrollees navigating health insurance, the answer was abandonment, frustration, and a flood of support calls that didn't need to happen."
      heroImage="/images/work/people-first/hero.jpg"
      heroImageAlt="The redesigned Prepare to Shop identity-first selector"
      metrics={[
        { value: '45%', label: 'Faster time-to-convert' },
        { value: '15%', label: 'Lift in total enrollments' },
        { value: '50%', label: 'Reduction in rage clicks' },
        { value: '33%', label: 'Increase in task completion' },
      ]}
      details={[
        { label: 'My Role', value: 'Lead UX Designer & Researcher' },
        { label: 'Timeline', value: 'Q2 2023' },
        { label: 'Team', value: '1 Designer, 1 PM, 4 Engineers' },
        { label: 'Methods', value: 'FullStory Analysis, User Interviews, Usability Testing' },
      ]}
      sections={SECTIONS}
      cta={{ title: 'Interested in how this came together?' }}
      next={getNextWork('people-first')!}
    >
      <PasswordGate
        password="4likh4n"
        onUnlock={() => {}}
        title="Ready to see how it came together?"
        description="The full case study walks through the research diagnosis, the stakeholder pivot, the design decisions, and the outcomes in detail."
        inside={INSIDE}
      >
        <FullCaseStudy />
      </PasswordGate>
    </CaseStudyPage>
  )
}
