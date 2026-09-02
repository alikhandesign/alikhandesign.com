'use client'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import StatCard from '@/app/components/StatCard'
import { ProjectImage } from '@/app/components/Lightbox'
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
    <div style={{ maxWidth: 680 }}>

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
          src="/images/work/people-first/prepare-to-shop-before.jpg"
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

        <ProjectImage
          src="/images/work/people-first/research-themes.png"
          alt="Affinity map of recurring interview themes: identity versus product type, expected guidance versus a wall, and identity-first responses given spontaneously"
          caption="A sample of recurring themes from the interview synthesis, not the complete set of participant responses."
        />

        <PullQuote>
          Why do I have to pick a product first? I don&apos;t know what product I need.
        </PullQuote>

        <Body mb={false}>
          To measure task completion, I built a FullStory funnel in strict order from Prepare to Shop to Shopping Results. The Escape Hatch &mdash; the &quot;I don&apos;t know, show me all plan types&quot; option &mdash; still routed through Prepare to Shop, so a single funnel captured both the identity-first path and the show-everything path without redefining who counted as having completed the flow.
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
          The redesigned selector led with a simple question: who are you shopping for? From there, users provided age and zip code, and the system handled eligibility filtering entirely in the background. For users who still didn&apos;t know which category applied to them, I added an &quot;Escape Hatch&quot; &mdash; an &quot;I don&apos;t know, show me all plan types&quot; option that surfaced every plan type at once rather than forcing a guess, without making that the default path for everyone.
        </Body>

        <ProjectImage
          src="/images/work/people-first/sketch-02.jpg"
          alt="An earlier wireframe exploring a multi-person batch selector, letting users select every household member to shop for at once"
          caption="An earlier direction: selecting every household member to shop for at once, with eligibility resolved per person. Via Benefits' systems weren't built to support a multi-person batch workflow at the time, so this approach wasn't viable within project scope — informing the identity-first, one-person-at-a-time flow that shipped instead."
        />

        <ProjectImage
          src="/images/work/people-first/sketch-01.jpg"
          alt="A refined wireframe showing the identity-first selector with per-person eligibility and an explanation for unavailable products"
          caption="The concept that followed: one person at a time, with eligible coverage surfaced directly and a reason available for anything that wasn't shoppable, rather than hidden silently."
        />

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
        <Body>
          These results compare the Annual Enrollment Period year over year &mdash; FullStory data from AEP 2022 against AEP 2023, the first enrollment cycle after launch, using the same Oct 15&ndash;Dec 7 window both years.
        </Body>

        <ProjectImage
          src="/images/work/people-first/fullstory-analytics.png"
          alt="FullStory funnel comparison showing AEP 2022 versus AEP 2023, Prepare to Shop to Shopping Results conversion"
          caption="The FullStory funnel comparing AEP 2022 to AEP 2023 &mdash; the source of the conversion and time-to-convert figures referenced throughout this case study."
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
          Going in, my working theory was that this was a content problem &mdash; that clearer explanations of Medicare Advantage versus Individual and Family Plans would resolve the confusion. The research proved that assumption wrong. Participants weren&apos;t confused by the categories themselves; they often didn&apos;t know which category applied to them, and what they actually wanted was to see everything at once rather than guess their way into the right bucket first. No amount of clarifying copy would have fixed a page that asked people to self-sort before they had the information to self-sort correctly. That&apos;s what shifted the fix from explaining the choice better to removing the choice from the front door entirely.
        </Body>
        <Body>
          The hardest part of this project wasn&apos;t the design. It was dismantling a belief that had calcified into institutional fact. Multiple PMs had told me the product-first gate was a hard requirement. When I shared the research with the Head of Product, he told me he&apos;d never believed it had to be product-first &mdash; the mandate everyone cited had never actually been decided by the person whose decision it would have been. That&apos;s a lesson I carry into every project now: question the constraints before you design within them.
        </Body>
        <Body>
          If I were doing this project again, I&apos;d move to stakeholder alignment earlier. And I&apos;d push harder for qualitative follow-up research after launch &mdash; the metrics told us what changed, but not how users felt about the new experience.
        </Body>
        <Body mb={false}>
          Looking ahead, the natural next step is solving for households, not individuals. Via Benefits&apos; systems couldn&apos;t support a multi-person batch workflow within this project&apos;s scope, but the shape of that solution is clear: select everyone you&apos;re shopping for upfront, then walk through each person&apos;s coverage one at a time &mdash; closer to how TurboTax handles a multi-person return. That&apos;s the direction I&apos;d take this experience next.
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
