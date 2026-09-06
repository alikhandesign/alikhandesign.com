'use client'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import StatCard from '@/app/components/StatCard'
import { ProjectImage } from '@/app/components/Lightbox'
import PullQuote from '@/app/components/PullQuote'
import PasswordGate from '@/app/components/PasswordGate'
import FadeOut from '@/app/components/FadeOut'

const SECTIONS = [
  'the-context',
  'the-problem',
  'the-research',
  'the-insight',
  'the-design',
  'the-validation',
  'the-outcomes',
  'the-reflection',
]

const INSIDE = [
  'The FullStory funnel and custom events behind the diagnosis',
  'What session replay revealed about ineligible shopping paths',
  'All three failed redesigns, and what each one tried',
  "The interview synthesis, in participants' own words",
  'Wireframes for the direction I cut',
  'The second round of testing that reversed the mandate',
  'Full outcome metrics, and the methodology behind them',
]

// ─── Pre-gate preview ────────────────────────────────────────────────────────

function FreePreview() {
  return (
    <div style={{ maxWidth: 680 }}>
      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Context"
          heading="Designing for people who can't reliably name the coverage they already have"
        />
        <Body>
          Via Benefits is Willis Towers Watson&apos;s individual benefits marketplace, used by Medicare-eligible retirees and pre-Medicare individuals to shop for health insurance coverage. The platform handles hundreds of thousands of enrollments annually, which makes every friction point in the funnel a business problem as well as a user one.
        </Body>
        <Body>
          The domain is unusually unforgiving. Medicare, Medicare Advantage, and Medicare supplement are three different things with overlapping names, and the distinctions carry real financial consequences. This isn&apos;t a matter of shoppers being uninformed. When <a href="https://www.commonwealthfund.org/publications/surveys/2024/feb/what-do-medicare-beneficiaries-value-about-their-coverage" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline', fontWeight: 500 }}>researchers preparing a Commonwealth Fund survey</a>{' '}sat down with people already enrolled in Medicare and checked their answers against their own insurance cards, they found people confusing traditional Medicare with Medicare Advantage, and Medicare Advantage with Medigap. Even people currently enrolled couldn&apos;t reliably say which kind of coverage they had.
        </Body>
        <Body>
          Layer onto that an audience in their sixties and beyond, many of them navigating this for the first time, under an annual deadline, on a decision they can&apos;t easily reverse for a year.
        </Body>
        <Body mb={false}>
          I joined as the sole UX designer on the shopping experience team, and I want to be honest about the starting point: I didn&apos;t understand this domain either. Learning which products a given person is eligible for, and why, took me months of reading eligibility rules and asking questions. That turned out to be the most useful thing I learned on this project, because it meant I stopped assuming the existing structure made sense to anyone and started asking whether it made sense at all.
        </Body>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Problem"
          heading="A mandate to improve shopping, and no agreed problem to solve"
        />
        <Body>
          My mandate was broad: improve the enrollment experience. What existed was a stale backlog that hadn&apos;t been meaningfully prioritized in a long time, and no shared view of where the shopping flow was actually failing. Different people had different theories, none of them evidenced.
        </Body>
        <FadeOut>
          <Body mb={false}>
            That absence was the real starting problem. Before I could improve anything, I had to find out what was broken, and the team had no reliable way to answer that question.
          </Body>
        </FadeOut>
      </section>


    </div>
  )
}

// ─── Full case study (behind the gate) ───────────────────────────────────────

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>

      <section id="the-research" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Research"
          heading="Following the drop-off to a page that let people shop for plans they couldn't buy"
        />
        <Body>
          The organization had FullStory, and was using a fraction of it. Designers on other teams watched session replays surfaced through Participant Listening, our practice for capturing, analyzing, and synthesizing end user feedback. That&apos;s good for understanding one person&apos;s experience in depth and nearly useless for finding out where a funnel is losing people at scale. Part of coming up to speed was building the instrumentation that didn&apos;t exist yet: funnel definitions for the shopping flow, custom events to track the specific actions that mattered, and dashboards tracking behavioral signals including rage clicks. I ended up building metrics and dashboards for other teams as well.
        </Body>
        <Body>
          The data pointed somewhere I wasn&apos;t expecting. The largest single drop-off in the shopping funnel was the Select Products page, the first screen in the flow, before anyone had seen a single plan. Rage clicks were concentrated across that opening stretch of the flow, the same set of steps that would later be condensed into a single page.
        </Body>
        <Body>
          Session replays explained part of it and surfaced something worse. Users were selecting product categories they weren&apos;t eligible for and then shopping them. Medicare-eligible retirees worked their way through Individual and Family Plans they could never purchase. Others went down paths for Medicare products they didn&apos;t qualify for. In every case, the system let them invest real time before telling them the product wasn&apos;t available to them.
        </Body>

        <ProjectImage
          src="/images/work/people-first/prepare-to-shop-before.png"
          alt="The Select Products page as it stood, asking shoppers to choose a plan type with nothing indicating which options they were eligible to buy"
          caption='The Select Products page as it stood. It opened with "What are you shopping for today?" and asked you to select a plan type, before any plan information and with nothing to indicate which options you were eligible to buy.'
        />

        <Body>
          The structure had a name internally: product-first. You told the site what you wanted to buy, and only then would it show you anything. <strong>I assumed the framework was sound and the execution wasn&apos;t.</strong>{' '}So I redesigned the Select Products page three times inside it and ran 15 unmoderated sessions in UserLytics, five participants per version, run consecutively so each round could build on what the last one showed. I tracked task completion and ran SUS on every version, so each iteration had a baseline to move against. One leaned on copy, explaining the differences between plan types and what it took to be eligible for each. One added an &quot;I don&apos;t know, show me all plan types&quot; option for people who couldn&apos;t answer the question. One kept the question but flattened the answer set, presenting every plan type as an option from the start.
        </Body>
        <Body>
          Task completion and SUS barely moved across all three. Three consecutive rounds, each informed by the last, and the same hesitation showed up at the same step every time. <strong>The problem survived every version of the page I built, which meant it wasn&apos;t in the page.</strong>
        </Body>
        <Body>
          The third version is the one that should have worked by conventional logic, since flattening the list removes any need to know the categories. It failed for the same reason the original did: it still let people start shopping for products they weren&apos;t eligible to buy. Explaining the choice, softening the choice, and removing the choice all left the same failure intact, because the failure was never about the choice.
        </Body>
        <Body mb={false}>
          Fifteen sessions had told me the page kept failing without telling me why, and unmoderated testing had no way to close that gap. A recording shows you where someone hesitates. It can&apos;t be asked a follow-up question. So I stopped testing designs and ran 12 moderated interviews instead, showing participants the live Select Products page and asking them to react to it directly rather than describe the experience in the abstract.
        </Body>

        <ProjectImage
          src="/images/work/people-first/research-themes.png"
          alt="Affinity map of recurring interview themes: identity versus product type, expected guidance versus a wall, and identity-first responses given spontaneously"
          caption="A sample of recurring themes from the interview synthesis, not the complete set of participant responses."
        />

        <PullQuote>
          Why do I have to pick a product first? I don&apos;t know what product I need.
        </PullQuote>
      </section>

      <section id="the-insight" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Insight"
          heading="The product was asking users to think like the business"
        />
        <Body>
          When I asked participants how they would start shopping on the site, they didn&apos;t describe plan categories. They described people. &quot;Who needs coverage.&quot; &quot;What my family needs.&quot; &quot;Who&apos;s in my household.&quot; Without being prompted, they were designing the entry point I&apos;d eventually ship.
        </Body>
        <Body>
          They also assumed the site would let them handle everyone at once. Couples expected to shop for both spouses in a single session. Families expected to include their children. Nobody described the task as shopping for one person and then starting over.
        </Body>
        <Body>
          The pattern was clear by the eighth interview. I ran the remaining four to confirm it held rather than to find something new.
        </Body>
        <Body mb={false}>
          The existing entry point was organized around WTW&apos;s product taxonomy, not around how a person shops for insurance. Participants knew exactly who they were shopping for. What they didn&apos;t know was which products existed, or which of them they were eligible to buy. And if they told us who they were shopping for, we already had everything we needed to work that out on their behalf. <strong>We were asking users to answer a question we could answer ourselves, at the one moment they were least equipped to answer it.</strong>
        </Body>
      </section>

      <section id="the-design" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Design"
          heading="A people-first entry point that stopped asking users to sort themselves"
        />
        <Body>
          The first direction I explored, and the one I ended up cutting, came straight out of the household finding: a batch selector where you&apos;d choose everyone you were shopping for upfront, then resolve eligibility for each person. It matched what participants described more literally than anything else I sketched.
        </Body>

        <ProjectImage
          src="/images/work/people-first/sketch-02.jpg"
          alt="An earlier wireframe exploring a multi-person batch selector, letting users select every household member to shop for at once"
          caption="The direction I cut: select every household member at once, with eligibility resolved per person. It failed on system constraints, not on user fit."
        />

        <Body>
          Via Benefits&apos; systems couldn&apos;t support a multi-person batch workflow at the time, and changing that was outside what this project could take on. I cut it. What carried forward was the premise underneath it, that the entry point should ask who rather than what, applied to one person at a time instead of all at once.
        </Body>
        <Body>
          The page that shipped, called People-First internally, opens by asking who you&apos;re shopping for: yourself, or a household member. Returning users are already known to the system, so nothing further is required. New users provide date of birth and zip code at that step, which is information the flow was collecting anyway, just later. From there the system resolves eligibility in the background and surfaces what that person can actually buy, rather than everything Via Benefits offers.
        </Body>
        <Body>
          Medicare-specific details, an MBI and Part A and B effective dates, stayed optional. You could browse plans without them and only needed them to enroll. That kept the hardest information to produce out of the way until the point it was genuinely required, which is the same principle the rest of the page runs on.
        </Body>
        <Body mb={false}>
          For people who still weren&apos;t sure, the &quot;I don&apos;t know, show me all plan types&quot; option from the second of the three tested versions shipped as an escape hatch. It was available to anyone who wanted it without becoming the default path, which was the version of &quot;show everything&quot; that testing had already ruled out as a starting point.
        </Body>

        <ProjectImage
          src="/images/work/people-first/sketch-01.jpg"
          alt="A refined wireframe showing the identity-first selector with per-person eligibility and an explanation for unavailable products"
          caption="The concept that followed: one person at a time, with eligible coverage surfaced directly and a reason available for anything that wasn't shoppable, rather than hidden silently."
        />

        <ProjectImage
          src="/images/work/people-first/design-after.jpg"
          alt="The redesigned Prepare to Shop page, showing the identity-first household and coverage selector"
          caption="After: the redesigned selector leads with who the coverage is for, then surfaces eligible benefit types directly, no category guess required."
        />
      </section>

      <section id="the-validation" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Validation"
          heading="Fifteen more tests, and a question nobody had put to the person who could answer it"
        />
        <Body>
          I took the direction to the PMs I worked with and got a consistent answer: the organization believed in product-first, the Head of Product was an advocate for it, and he would never go for this. It wasn&apos;t presented as an opinion. It was presented as settled.
        </Body>
        <Body>
          I wasn&apos;t going to win this on opinion, so I went and got evidence. I ran a second round of moderated testing on the new direction, 15 sessions run in succession the same way the first round had been, iterating the design between them rather than validating a finished screen. Because SUS had been run on every product-first version too, the comparison was direct. By the end of the round, task completion and SUS were both well ahead of anything the three earlier versions had produced. That brought the project to 30 usability sessions in total, 15 unmoderated and 15 moderated, and for the first time the data said something other than &quot;this still doesn&apos;t work.&quot;
        </Body>
        <Body>
          I took that research to a senior PM and asked him to get me in a room with the Head of Product directly, rather than relaying it secondhand.
        </Body>
        <Body mb={false}>
          I presented the research. He told me he had never said it had to be product-first. The mandate everyone had been designing around, and citing to me as a hard requirement, had never actually been decided by the person whose decision it would have been. He was interested in the research, said he valued the willingness to question something the organization had stopped examining, and gave me the go-ahead to implement.
        </Body>
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Outcomes"
          heading="15% more enrollments, and 45% less time to get there"
        />
        <Body>
          These results compare the Annual Enrollment Period year over year, using FullStory data from AEP 2022 against AEP 2023, the first enrollment cycle after launch, over the same Oct 15 to Dec 7 window both years.
        </Body>
        <Body>
          To measure task completion, I built the funnel in strict order from Prepare to Shop to Shopping Results. The escape hatch still routed through Prepare to Shop, so a single funnel captured both the identity-first path and the show-everything path without redefining who counted as having completed the flow.
        </Body>

        <ProjectImage
          src="/images/work/people-first/fullstory-analytics.png"
          alt="FullStory funnel comparison showing AEP 2022 versus AEP 2023, Prepare to Shop to Shopping Results conversion"
          caption="The FullStory funnel comparing AEP 2022 to AEP 2023. This is the source of the conversion and time-to-convert figures referenced throughout this case study."
        />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          <StatCard value="45%" label="Faster time-to-convert (2m 55s to 1m 36s)" />
          <StatCard value="15%" label="Lift in total enrollments" />
          <StatCard value="50%" label="Reduction in rage clicks across the condensed flow" />
          <StatCard value="33%" label="Increase in task completion" />
        </div>
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro
          label="The Reflection"
          heading="What I'd do differently, and what I learned"
        />
        <Body>
          Going in, my working theory was that the framework was sound and the execution wasn&apos;t, that clearer explanations of Medicare Advantage versus Individual and Family Plans would resolve the confusion. Three redesigns and 15 sessions proved that assumption wrong, including the version that skipped explanation entirely and just showed everything. Participants weren&apos;t confused by the categories themselves; they didn&apos;t know which category applied to them, and no arrangement of that question was going to fix a page that asked people to self-sort before they had the information to self-sort correctly.
        </Body>
        <Body>
          <strong>The harder problem wasn&apos;t the design. It was a belief that had accumulated enough authority through repetition that nobody was checking it anymore</strong>, including the person it was attributed to. What I took from that isn&apos;t just to question constraints before designing within them. It&apos;s that the way to question one is with evidence rather than argument. I didn&apos;t change anyone&apos;s mind in that meeting by making a better case. I changed it by having done the research, which is what got me into the room in the first place.
        </Body>
        <Body>
          If I were doing this project again, I&apos;d run the interviews before the redesigns. I went straight to evaluative testing on a framework nobody had validated, which meant three rounds spent measuring how well an unexamined premise performed. The generative work is what actually moved this project, and I did it third. I&apos;d also push harder for qualitative follow-up research after launch. The metrics told us what changed, but not how users felt about the new experience.
        </Body>
        <Body mb={false}>
          Looking ahead, the natural next step is solving for households rather than individuals. Via Benefits&apos; systems couldn&apos;t support a multi-person batch workflow within this project&apos;s scope, but the shape of the solution is clear: select everyone you&apos;re shopping for upfront, then walk through each person&apos;s coverage one at a time, closer to how TurboTax handles a multi-person return.
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
      hook="What happens when a product is designed around how the business works instead of how people think? For Medicare and Individual and Family Plan enrollees navigating health insurance, the answer was abandonment, frustration, and a flood of support calls that didn't need to happen."
      heroImage="/images/work/people-first/hero.jpg"
      heroImageAlt="The redesigned Prepare to Shop identity-first selector"
      metrics={[
        { value: '45%', label: 'Faster time-to-convert' },
        { value: '15%', label: 'Lift in total enrollments' },
        { value: '50%', label: 'Reduction in rage clicks' },
        { value: '33%', label: 'Increase in task completion' },
      ]}
      details={[
        { label: 'My Role', value: 'Product Strategy, UX Design & Research' },
        { label: 'Timeline', value: 'Q2 2023' },
        { label: 'Team', value: '1 Designer, 1 PM, 4 Engineers' },
        { label: 'Methods', value: 'FullStory Analysis, Unmoderated and Moderated Testing, SUS Benchmarking, User Interviews' },
      ]}
      sections={SECTIONS}
      cta={{ title: 'Interested in how this came together?' }}
      next={getNextWork('people-first')!}
    >
      <FreePreview />
      <PasswordGate
        onUnlock={() => {}}
        title="Ready to see how it came together?"
        description="Thirty usability sessions, a first direction that had to be cut, and a mandate the organization treated as settled until someone checked. Enrollments went up 15%."
        inside={INSIDE}
      >
        <FullCaseStudy />
      </PasswordGate>
    </CaseStudyPage>
  )
}
