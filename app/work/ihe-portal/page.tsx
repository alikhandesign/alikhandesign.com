'use client'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import PasswordGate from '@/app/components/PasswordGate'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import PullQuote from '@/app/components/PullQuote'
import StatCard from '@/app/components/StatCard'
import CalloutCard from '@/app/components/CalloutCard'
import { GalleryGrid, ProjectImage } from '@/app/components/Lightbox'

const IMG = '/images/work/ihe-portal'

const SECTIONS = [
  'the-context',
  'the-problem',
  'the-research',
  'the-findings',
  'the-reframe',
  'the-design',
  'the-outcomes',
  'the-reflection',
]

const INSIDE = [
  'Why members were enrolling in social care but declining clinical care, and what that contrast revealed',
  'The full interview synthesis across four cohorts, and the two clusters the eight barriers split into',
  'The one-sided exchange finding, and how it reframed the entire redesign',
  'Three design decisions, including how a non-negotiable business requirement got honored without sacrificing the user',
]

type Barrier = { title: string; text: string; quote?: string }

const VALUE_BARRIERS: Barrier[] = [
  {
    title: 'Redundancy with existing care',
    text: "The most common objection. Members who saw their PCP regularly couldn't understand what an IHE added.",
    quote: 'They come and take your blood pressure and ask how you\u2019re doing. I need it. I get that at the dr.',
  },
  {
    title: 'Not a replacement for a PCP visit',
    text: "Members knew what the visiting clinician couldn't do: no blood draws, no EKGs, no prescriptions.",
    quote: 'Why would I want a doctor who can\u2019t even prescribe an aspirin for me, let alone a prescription.',
  },
  {
    title: 'Health literacy',
    text: 'Some members didn\u2019t understand what was actually available to them. One member described struggling with prescription costs without realizing a Signify Health clinician could connect them to Social Care Coordination for help paying.',
  },
]

const TRUST_BARRIERS: Barrier[] = [
  {
    title: 'Brand unfamiliarity',
    text: 'Members recognized their insurance carrier, not \u201CSignify Health,\u201D so an unfamiliar name asking for personal information read as unverifiable before it read as risky.',
  },
  {
    title: 'Negative past experiences',
    text: 'A prior unremarkable IHE made someone resistant to trying again.',
  },
  {
    title: 'Frequency and harassment',
    text: 'Repeated outreach calls wore members down to a flat no.',
  },
  {
    title: 'Financial anxiety',
    text: 'A belief that a \u201Cfree\u201D service was quietly driving up their premiums.',
    quote: 'It comes out of the premium I have to pay. That\u2019s why our healthcare is so high right now.',
  },
]

const BRIDGE_BARRIER: Barrier[] = [
  {
    title: 'The one-sided exchange problem',
    text: 'Members described past visits as a one-way street: extensive personal and medical information given, and nothing offered back in return. Not purely a value problem or purely a trust problem. It\u2019s what happens when nothing has proven its worth to someone yet, so they stop extending trust by default.',
    quote: 'It was useless because my husband was giving him all this information about himself, but they didn\u2019t really offer anything... waste of time really.',
  },
]

const GUIDE_QUESTIONS = [
  'Who did you think Signify Health was in relationship to your health insurance provider?',
  'What value do you feel you get from a visit at the doctor\u2019s office that you wouldn\u2019t get from an in-home visit?',
  'What types of services could we offer that would be helpful for someone like you?',
]

const OUTCOME_STATS: [string, string][] = [
  ['73 NPS', 'Post-visit member satisfaction'],
  ['2M+', 'Annual IHEs completed'],
  ['61%', 'More likely to renew health plan coverage'],
  ['8', 'Barriers to enrollment identified'],
]

const LESSONS: [string, string][] = [
  [
    'Trust and value aren\u2019t separate problems',
    'Trust is what\u2019s left over once value has been demonstrated. Any time a product asks someone to give something before they understand what they\u2019ll get back, it\u2019s building the exact distrust it\u2019s trying to overcome.',
  ],
  [
    'Compromise doesn\u2019t mean compromising the user',
    'I kept the primary CTA to satisfy business stakeholders and added the \u201CHere\u2019s how\u201D path alongside it. I don\u2019t always have to kill a rigid business requirement to save the user experience. Sometimes I just build a better door next to it.',
  ],
  [
    'Designing for skepticism, not just usability',
    'For a Medicare-eligible population, the primary friction wasn\u2019t a confusing UI or poor contrast. It was an inherent, justified skepticism of unsolicited contact. Designing for emotional friction rather than functional friction is a different problem than the one I was trained to look for.',
  ],
  [
    'The danger of isolated metrics',
    'Looking at the IHE in a vacuum made it look like the demographic simply didn\u2019t want free services. Placing it next to SCC proved otherwise. Evaluating a service in isolation often hides the actual behavioral drivers.',
  ],
]

function BarrierList({ items }: { items: Barrier[] }) {
  return (
    <>
      {items.map(({ title, text, quote }) => (
        <div
          key={title}
          style={{
            marginBottom: '1.5rem',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h3
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--color-text)',
              marginBottom: '0.4rem',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: 'var(--font-size-md)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}
          >
            {text}
          </p>
          {quote && (
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-mid)',
                lineHeight: 1.6,
                fontStyle: 'italic',
                marginTop: '0.75rem',
                paddingLeft: '1rem',
                borderLeft: '2px solid var(--color-border)',
              }}
            >
              &ldquo;{quote}&rdquo;
            </p>
          )}
        </div>
      ))}
    </>
  )
}

function ClusterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 'var(--font-size-sm)',
        fontWeight: 600,
        color: 'var(--color-text)',
        margin: '2rem 0 1.25rem',
      }}
    >
      {children}
    </p>
  )
}

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Context" heading="A free service backed by real scale" />
        <Body>
          Signify Health partners with health plans to offer eligible Medicare members an in-home health evaluation (IHE) at no cost, as part of their existing plan benefits. A licensed clinician visits the home, reviews medications and medical history, checks vitals, and reports findings back to the member&apos;s primary care provider. The program operates at real scale: more than 2 million evaluations a year, delivered by a nationwide network of licensed clinicians.
        </Body>
        <Body>
          The population this program specifically reaches generally scores poorly on social determinants of health: income, transportation access, and housing stability, the non-medical factors that already make getting care harder.
        </Body>
        <Body mb={false}>
          Signify Health also offered Social Care Coordination (SCC), a separate service connecting members to non-medical support like transportation and help paying for prescriptions. SCC was enrolling members at a noticeably higher rate than the IHE. At the time of this project, the two had been consolidated: a clinician completes the IHE, then determines during that same visit whether the member has needs SCC could resolve, making the clinician the primary coordinator rather than SCC a separately scheduled appointment.
        </Body>
      </section>

      <section id="the-problem" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Problem" heading="A split in acceptance no one could explain" />
        <Body>
          Too many eligible members were declining a free In-Home Health Evaluation that, by every available measure, benefited them. Yet those same members were actively enrolling in Social Care Coordination, a separate, non-medical support offering. The contrast was the real mystery: a population willing to accept social help was firmly shutting the door on clinical care.
        </Body>
        <Body mb={false}>
          No one on the team had a validated answer for why. Before any redesign could target the true barrier, we had to figure out what SCC was doing right that the IHE was getting wrong.
        </Body>
      </section>

      <section id="the-research" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Research" heading="A comparative study, not just a list of complaints" />
        <Body>
          I ran 17 interviews across the four cohorts: declined both (7), declined the IHE only (4), declined the SCC only (2), and accepted both (4).
        </Body>

        <CalloutCard
          variant="light"
          title="Four cohorts instead of one"
          body="The straightforward version of this study is interviewing people who said no and cataloguing their objections. I structured it as a comparison instead: members who declined both the IHE and SCC, declined the IHE only, declined the SCC only, and accepted both. Studying the decline in isolation would only ever produce a list of complaints. Studying it against the service members were saying yes to is what made the contrast legible."
        />

        <Body>
          The declined-both cohort was the one I needed most, since it held the clearest signal about why members were refusing outright, and it was also the hardest to recruit. A second round of recruitment focused specifically on that group rather than backfilling every cohort evenly.
        </Body>
        <Body>
          The recruiting difficulty turned out to be its own finding. Members who wouldn&apos;t take an unsolicited call about a free medical visit were, unsurprisingly, also reluctant to take an unsolicited call about a research study. The barrier I was studying was actively shaping my ability to study it.
        </Body>
        <Body>
          The interview guide was written to open the decision up rather than ask members to defend it. Three questions did most of the work:
        </Body>

        <ul style={{ margin: '0 0 1.5rem', paddingLeft: '1.25rem', listStyle: 'none' }}>
          {GUIDE_QUESTIONS.map(q => (
            <li
              key={q}
              style={{
                fontSize: 'var(--font-size-md)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '0.6rem',
                paddingLeft: '1rem',
                borderLeft: '2px solid var(--color-border)',
              }}
            >
              {q}
            </li>
          ))}
        </ul>

        <Body mb={false}>
          The first one produced a finding I hadn&apos;t gone in looking for: several members didn&apos;t recognize &ldquo;Signify Health&rdquo; as an entity at all. They knew their insurance carrier. Outreach from an unfamiliar name read as suspect before it ever got the chance to explain itself, especially for an elderly, Medicare-eligible population already primed to be wary of unsolicited contact. That&apos;s distinct from general scam anxiety: it&apos;s not &ldquo;this could be a scam,&rdquo; it&apos;s &ldquo;I don&apos;t know who&apos;s asking.&rdquo;
        </Body>
      </section>

      <section id="the-findings" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Findings" heading="Two different problems wearing one barrier list" />
        <Body mb={false}>
          Eight distinct barriers to enrollment came out of the research, and looking at them together, they split into two genuinely different problems.
        </Body>

        <ClusterHeading>Members didn&apos;t believe the visit offered real value</ClusterHeading>
        <BarrierList items={VALUE_BARRIERS} />

        <ClusterHeading>Members didn&apos;t trust the outreach itself</ClusterHeading>
        <BarrierList items={TRUST_BARRIERS} />

        <ClusterHeading>Sitting between both clusters, and the finding that mattered most</ClusterHeading>
        <BarrierList items={BRIDGE_BARRIER} />

        <PullQuote>
          Members weren&apos;t afraid of the visit. They just didn&apos;t believe it was worth their time. And they had good reason to think that.
        </PullQuote>
      </section>

      <section id="the-reframe" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Reframe" heading="Trust isn't given upfront. It's earned by proof." />
        <Body>
          The split in the findings pointed somewhere specific: four of the eight barriers were about not understanding the visit&apos;s value, and four were about not trusting the messenger, but they traced back to the same root. <strong>Members withheld trust because nothing had proven its worth to them yet.</strong>
        </Body>
        <Body mb={false}>
          That reframe, demonstrate value before asking for trust, drove every decision that followed.
        </Body>
        <ProjectImage
          src={`${IMG}/ihe-scheduling-portal-before-display.webp`}
          lightboxSrc={`${IMG}/ihe-scheduling-portal-before-lightbox.webp`}
          alt="The original scheduling page, asking for personal information up front in exchange for a callback within 24 hours"
          caption="Before, the original flow led with a form. Members had to submit personal information first and wait for a callback, with no indication of what the visit would actually offer them."
        />
      </section>

      <section id="the-design" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Design" heading="Three moments, not one page" />
        <Body mb={false}>
          I didn&apos;t get rid of the dedicated scheduling page. I designed around it: three pages, each doing one job, all supporting the same goal of getting someone to schedule.
        </Body>

        <Body>
          <strong>Home, identity and top-level trust.</strong> The homepage leads with who Signify Health is before it leads with what to do. &ldquo;Here&apos;s how&rdquo; and &ldquo;Schedule your visit&rdquo; sit together in the hero, and immediately below them, &ldquo;Invited in by millions, 10 years running&rdquo; and four credibility cards make the case for the visit before the page asks for anything.
        </Body>
        <ProjectImage
          src={`${IMG}/ihe-scheduling-portal-home-display.webp`}
          lightboxSrc={`${IMG}/ihe-scheduling-portal-home-lightbox.webp`}
          alt="The redesigned Signify Health homepage, with Here's how and Schedule your visit side by side, followed by credibility cards"
          caption="After, a value-first entry point. Members see credibility signals and hear from other members before the portal asks for anything in return."
        />
        <CalloutCard
          variant="light"
          title={'"Schedule your visit" stayed, "Here\u2019s how" got added'}
          body={'Business stakeholders had a standing requirement that the scheduler stay prominent and easy to find, and that requirement predated this project. I honored it rather than fighting it, and added a secondary path next to it, "Here\u2019s how," for members who weren\u2019t ready to commit yet. The primary CTA didn\u2019t move. A second door opened next to it.'}
        />

        <Body>
          <strong>What We Do, the value proof.</strong> This page carries the weight the research said was missing: &ldquo;5 things In-Home Health Visits provide,&rdquo; a category-by-category breakdown of what&apos;s actually included (wellness assessments, screenings, care coordination), video testimonials with transcripts, and Google Reviews. This is where &ldquo;redundancy with existing care&rdquo; and &ldquo;not a replacement for a PCP visit&rdquo; get answered with specifics instead of a general reassurance.
        </Body>
        <ProjectImage
          src={`${IMG}/ihe-scheduling-portal-what-we-do-display.webp`}
          lightboxSrc={`${IMG}/ihe-scheduling-portal-what-we-do-lightbox.webp`}
          alt="The What We Do page, listing the five things an in-home health visit provides and a breakdown of what the visit covers"
          caption="The What We Do page, answering the value-cluster barriers directly: what's included, and what members said about it. Open the full page to see the testimonials and Google Reviews below."
        />
        <CalloutCard
          variant="light"
          title="Value got its own page"
          body={'I could have put the value case directly on the homepage, folded into the hero. I gave it a dedicated page instead, reached through "Here\u2019s how." Value that has to compete with a hero image and a primary CTA for attention gets skimmed. Value that\u2019s the entire point of a page gets read.'}
        />

        <Body>
          <strong>Scheduling, member-controlled, not a callback.</strong> Two ways to schedule, both member-initiated: online, or by phone on their own timeline. Removing the callback-request model addressed the frequency and harassment barrier directly, since members were no longer waiting on outreach they didn&apos;t ask for.
        </Body>
        <ProjectImage
          src={`${IMG}/ihe-scheduling-portal-scheduler-display.webp`}
          lightboxSrc={`${IMG}/ihe-scheduling-portal-scheduler-lightbox.webp`}
          alt="The redesigned scheduling page, restating the cost and scope of the visit before asking who the visit is for"
          caption="The scheduling page repeats the value case before asking anything: no cost, doesn't replace your doctor, and exactly what the clinician will do. The financial anxiety and redundancy barriers get answered again at the point of commitment."
        />

        <Body mb={false}>
          <strong>Visit prep, closing the loop after commitment.</strong> Separate &ldquo;Get Ready for Your Upcoming Signify Health Visit&rdquo; and &ldquo;Preparing for Your Signify Health Video Visit&rdquo; pages walk members through exactly what to expect, by format, down to a pre-visit device checklist for video visits.
        </Body>
        <GalleryGrid images={[
          {
            src: `${IMG}/ihe-scheduling-portal-in-person-display.webp`,
            lightboxSrc: `${IMG}/ihe-scheduling-portal-in-person-lightbox.webp`,
            alt: 'Redesigned page preparing members for an in-person visit, with clear step-by-step guidance',
            caption: 'After, in-person visit prep, addressing what to have ready and what will happen in the home.',
            focus: 'top',
          },
          {
            src: `${IMG}/ihe-scheduling-portal-video-visit-display.webp`,
            lightboxSrc: `${IMG}/ihe-scheduling-portal-video-visit-lightbox.webp`,
            alt: 'Redesigned page preparing members for a video visit, with device and connectivity guidance',
            caption: 'After, video visit prep, handling the tech requirements that in-person members never face.',
            focus: 'top',
          },
        ]} />
        <CalloutCard
          variant="light"
          title="Prep pages split by visit type, not generic"
          body={'A single generic "what to expect" page would have been faster to build. I split it into separate in-person and video-visit prep pages instead, each addressing the specific uncertainty of that format: what to have ready in person, versus tech requirements for video. The value-cluster barriers don\u2019t fully resolve at the scheduling decision. They resolve right before the visit, when the details actually matter.'}
        />
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Outcomes" heading="Research that informed real scale" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {OUTCOME_STATS.map(([value, label]) => (
            <StatCard key={label} value={value} label={label} />
          ))}
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
          Note: Program-level metrics reflect Signify Health&apos;s broader outcomes. I can&apos;t claim sole attribution here. What I can say is the research identified the specific barriers preventing members from saying yes, and the redesign was built to remove them.
        </p>
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Reflection" heading="What this project taught me" />
        <Body>Four things from this project stayed with me.</Body>

        {LESSONS.map(([title, text]) => (
          <div key={title} style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.4rem' }}>
              {title}
            </h3>
            <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {text}
            </p>
          </div>
        ))}

        <Body>
          The real limitation is that I only interviewed members who had already gone through the decision, not members exposed to the redesigned portal itself. The NPS and renewal numbers describe outcomes for people who said yes. I don&apos;t have a clean before-and-after read on how many more people started saying yes, because that measurement was never set up going in.
        </Body>
        <Body mb={false}>
          The members who said no weren&apos;t wrong. They&apos;d been asked to hand their medical history to a stranger on the strength of a phone call from a company they&apos;d never heard of, and nothing in that ask had earned it. The redesign didn&apos;t convince them to trust more. It stopped asking them to trust first.
        </Body>
      </section>

    </div>
  )
}

export default function IHEPortalPage() {
  return (
    <CaseStudyPage
      title="IHE Scheduling Portal"
      company="Signify Health · Member Experience · Q4 2022"
      tags={['Case Study', 'UX Design', 'UX Research']}
      hook="A free in-home health evaluation sounds like an obvious yes. A licensed clinician comes to your home, reviews your medications, checks your vitals, and coordinates with your doctor, at no cost. So why were millions of eligible members saying no?"
      metrics={[
        { value: '73 NPS', label: 'Post-visit satisfaction' },
        { value: '2M+', label: 'Annual IHEs completed' },
        { value: '8', label: 'Barriers to enrollment identified' },
      ]}
      details={[
        { label: 'My Role', value: 'UX Researcher & Designer' },
        { label: 'Methods', value: 'Qualitative Interviews, Thematic Synthesis, Value-Led Information Architecture' },
        { label: 'Tools', value: 'Google Meet, Adobe XD, Miro' },
        { label: 'Status', value: 'Shipped redesigned scheduling portal' },
      ]}
      sections={SECTIONS}
      heroImage={`${IMG}/ihe-scheduling-portal-hero-with-mobile-display.webp`}
      heroImageAlt="The redesigned Signify Health scheduling portal shown on a laptop and phone, leading with the visit's value before asking members to schedule"
      cta={{ title: 'Interested in how this came together?' }}
      next={getNextWork('ihe-portal')!}
    >
      <PasswordGate
        onUnlock={() => {}}
        title="Ready to see how it came together?"
        description="Eight barriers to enrollment, two very different root causes, and a redesign built to answer both."
        inside={INSIDE}
      >
        <FullCaseStudy />
      </PasswordGate>
    </CaseStudyPage>
  )
}
