'use client'
import { getNextWork } from '@/app/work.config'
import CaseStudyPage from '@/app/components/CaseStudyPage'
import PasswordGate from '@/app/components/PasswordGate'
import SectionIntro from '@/app/components/SectionIntro'
import Body from '@/app/components/Body'
import PullQuote from '@/app/components/PullQuote'
import StatCard from '@/app/components/StatCard'
import { GalleryGrid, ProjectImage } from '@/app/components/Lightbox'

const SECTIONS = [
  'the-context',
  'the-research',
  'the-findings',
  'the-reframe',
  'the-design',
  'the-outcomes',
  'the-reflection',
]

const INSIDE = [
  'Qualitative interview findings',
  'Six distinct member barrier categories',
  'The one-sided exchange insight',
  'Trust-first design principles',
  'Before and after portal comparison',
  'Program outcome context',
]

const BARRIERS: [string, string][] = [
  ['Redundancy with existing care', "The most common objection. Members who saw their PCP regularly couldn't understand what an IHE added. The visit felt like a duplicate of care they were already receiving."],
  ['Clinical inferiority', "Members knew what the visiting clinician couldn't do — no blood draws, no EKGs, no prescriptions. Without diagnostic capabilities, the visit felt like a lesser version of real medical care."],
  ['The one-sided exchange problem', 'Members described past visits as a one-way street: they gave extensive personal and medical information, and the provider "didn\'t really offer anything" in return. The experience felt extractive rather than beneficial.'],
  ['Scam skepticism', 'Unsolicited calls offering free medical services are a well-known scam vector targeting seniors. Multiple members expressed genuine uncertainty about whether the program was legitimate.'],
  ['Negative past experiences', 'Members who had participated in an IHE previously and found it unremarkable were resistant to trying again.'],
  ['Frequency and harassment', 'Several members were being called constantly and had reached a point where they declined simply to be left alone.'],
]

const OUTCOME_STATS: [string, string][] = [
  ['73 NPS', 'Post-visit member satisfaction'],
  ['3.5M+', 'Annual IHEs completed'],
  ['61%', 'More likely to renew health plan coverage'],
  ['6', 'Distinct barrier categories identified'],
]

function FullCaseStudy() {
  return (
    <div style={{ maxWidth: 680 }}>

      <section id="the-context" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Context" heading="A free service that millions of people were turning down" />
        <Body>Signify Health partners with health plans to offer eligible Medicare members a licensed clinician who comes to your home, reviews your medications and medical history, checks your vitals, and coordinates findings with your primary care provider — at no cost. The program operates at scale, with over 10,000 clinicians performing evaluations across the country. But sign-up rates weren't reflecting that potential.</Body>
      </section>

      <section id="the-research" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Research" heading="Listening before designing" />
        <Body>Before anyone touched a wireframe, I needed to understand what was happening in members' minds when they declined. I ran a qualitative research initiative — interviews with members who had been offered an IHE and turned it down. The sessions were structured around one core question: not "why didn't you want this?" but "help me understand what you were thinking when you made that decision." The distinction matters. The first question invites defensiveness. The second invites honesty.</Body>
      </section>

      <section id="the-findings" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Findings" heading="It wasn't about strangers in the home" />
        <Body>Six distinct barrier categories emerged from the research.</Body>
        {BARRIERS.map(([title, text]) => (
          <div key={title} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text)', marginBottom: '0.4rem' }}>{title}</h3>
            <p style={{ fontSize: 'var(--font-size-md)', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{text}</p>
          </div>
        ))}
        <PullQuote>Members weren't afraid of the visit. They just didn't believe it was worth their time. And they had good reasons.</PullQuote>
      </section>

      <section id="the-reframe" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Reframe" heading={'From "will you let us in?" to "here\'s what\'s in it for you"'} />
        <Body>The original portal was organized around what Signify Health needed from members. It assumed members already understood the value and just needed a way to book. The research said otherwise. Members needed the value case made first. Only then would they be willing to give anything back. That reframe drove every design decision in the redesign.</Body>
        <ProjectImage
          src="/images/work/ihe-portal/ihe-portal-before.jpg"
          alt="The original scheduling page, asking for personal information up front in exchange for a callback within 24 hours"
          caption="Before — the original flow led with a form. Members had to submit personal information first and wait for a callback, with no indication of what the visit would actually offer them."
        />
      </section>

      <section id="the-design" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Design" heading="Trust-first, member-controlled" />
        <Body>Four principles from the research shaped every design decision: lead with value not process; give members real-time scheduling control instead of a callback request; establish legitimacy early with clear trust signals; and pair every request for information with a clear explanation of what the member would receive in return.</Body>
        <Body>"Lead with value not process" was a structural change, not just a copy change. The portal needed its own entry point, separate from the request form. Rather than routing members straight into a form asking for personal information, the redesign introduced a value-first landing experience — the benefit of the visit stated plainly, a testimonial video, real member ratings — that a member could see and absorb before being asked for anything at all.</Body>
        <ProjectImage
          src="/images/work/ihe-portal/ihe-portal-after-home.jpg"
          alt="The redesigned entry point, leading with the visit's value, a testimonial video, and member ratings before any request for personal information"
          caption="After — a value-first entry point. Members see what the visit offers and hear from other members before the portal asks for anything in return."
        />
        <Body mb={false}>The shift from a callback-request model to real-time self-scheduling was the most impactful single change — removing a friction point that, combined with scam skepticism, was causing significant drop-off.</Body>
        <GalleryGrid images={[
          {
            src: "/images/work/ihe-portal/ihe-portal-after-in-person.jpg",
            alt: "Redesigned page preparing members for an in-person visit, with clear step-by-step guidance",
            caption: "After — in-person visit preparation now leads with clear, concrete guidance instead of asking members to trust an unexplained process.",
            focus: "top",
          },
          {
            src: "/images/work/ihe-portal/ihe-portal-after-video-visit.jpg",
            alt: "Redesigned page preparing members for a video visit, with device and connectivity guidance",
            caption: "After — the same trust-first structure applied to video visits, removing tech uncertainty as a separate barrier.",
            focus: "top",
          },
        ]} />
      </section>

      <section id="the-outcomes" style={{ marginBottom: '4rem', scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Outcomes" heading="Research that informed real scale" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', margin: '2rem 0' }}>
          {OUTCOME_STATS.map(([value, label]) => (
            <StatCard key={label} value={value} label={label} />
          ))}
        </div>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>Note: Program-level metrics reflect Signify Health's broader outcomes. I can't claim sole attribution — what I can say is the research identified the specific barriers preventing members from saying yes, and the redesign was built to remove them.</p>
      </section>

      <section id="the-reflection" style={{ scrollMarginTop: '5rem' }}>
        <SectionIntro label="The Reflection" heading="What the research kept teaching me" />
        <Body>The most valuable thing this project reinforced is that the "obvious" barrier is rarely the real one. The one-sided exchange finding was the one that stayed with me — it applies far beyond this project. Any time a product asks users to give something before they've understood what they'll receive in return, you're creating the conditions for distrust.</Body>
        <Body mb={false}>I'd also push earlier for outcome metrics in future projects. The qualitative research here is rich and specific. A quantitative measurement of sign-up rate change before and after the redesign would have made this case study significantly stronger.</Body>
      </section>

    </div>
  )
}

export default function IHEPortalPage() {
  return (
    <CaseStudyPage
      title="IHE Scheduling Portal"
      company="Signify Health · Member Experience · Q4 2022"
      tags={['Case Study', 'UX Research', 'UX Design']}
      hook="A free in-home health evaluation sounds like an obvious yes. A licensed clinician comes to your home, reviews your medications, checks your vitals, and coordinates with your doctor — at no cost. So why were millions of eligible members saying no?"
      metrics={[
        { value: '73 NPS', label: 'Post-visit satisfaction' },
        { value: '3.5M+', label: 'Annual IHEs completed' },
        { value: '6', label: 'Barrier categories identified' },
      ]}
      details={[
        { label: 'My Role', value: 'Lead UX Designer' },
        { label: 'Methods', value: 'Qualitative Interviews, Thematic Synthesis, Value-Led Information Architecture' },
        { label: 'Tools', value: 'Google Meet, Adobe XD, Miro' },
        { label: 'Status', value: 'Shipped redesigned scheduling portal' },
      ]}
      sections={SECTIONS}
      heroImage="/images/work/ihe-portal/ihe-portal-hero.jpg"
      heroImageAlt="The redesigned Signify Health homepage, leading with the visit's value and a testimonial video before asking members to schedule"
      cta={{ title: 'Interested in how this came together?' }}
      next={getNextWork('ihe-portal')!}
    >
      <PasswordGate
        onUnlock={() => {}}
        title="Ready to see what the research uncovered?"
        description="The full case study walks through the research methodology, all six barrier categories, and the design principles that shaped the portal redesign."
        inside={INSIDE}
      >
        <FullCaseStudy />
      </PasswordGate>
    </CaseStudyPage>
  )
}
