import { getNextWork } from '@/app/work.config'
import ProjectPage from '@/app/components/ProjectPage'
import PasswordGate from '@/app/components/PasswordGate'

const PRESENTATION_URL = 'https://www.figma.com/slides/Oi4CCDZp2zyZEwOLApjcGy'

function PresentationLink() {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-8)',
      maxWidth: 560,
    }}>
      <p style={{ fontSize: 'var(--font-size-xs)', letterSpacing: 'var(--letter-spacing-md)', textTransform: 'uppercase' as const, color: 'var(--color-text-muted)', fontWeight: 500, marginBottom: '0.6rem' }}>Full Research Deck</p>
      <h3 className="font-serif" style={{ fontSize: 'var(--font-size-lg)', fontWeight: 400, marginBottom: 'var(--space-3)' }}>Ancillary Products Study</h3>
      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-mid)', lineHeight: 1.7, marginBottom: 'var(--space-6)' }}>
        The complete research presentation — objectives and methodology, session-by-session findings across dental, vision, and hearing, and the full set of usability issues with severity ratings and recommendations.
      </p>
      <a
        href={PRESENTATION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
      >
        View full presentation <span aria-hidden="true">→</span>
      </a>
    </div>
  )
}

export default function Page() {
  return <ProjectPage
    title="Optimizing the Ancillary Insurance Journey"
    company="Willis Towers Watson"
    tags={['Usability Research', 'Mixed-Methods Research']}
    hook="Medicare enrollees shopping for dental, vision, and hearing coverage face a product category most people have never had to think about before. My research set out to understand where the confusion lived — and what it would take to remove it."
    hero="/images/work/ancillary-journey/ancillary-journey-session.jpg"
    heroFit="natural"
    details={[{ label: 'Company', value: 'Willis Towers Watson' }, { label: 'Role', value: 'UX Researcher' }, { label: 'Methods', value: 'Moderated Usability Sessions, Qualitative Interviews' }, { label: 'Disciplines', value: 'Usability Research, Mixed-Methods Research' }]}
    sections={[
      { label: 'The Brief', title: 'A deep dive into ancillary insurance navigation', body: ['Via Benefits offered ancillary insurance products — dental, vision, and hearing coverage — as part of its broader Medicare shopping experience. The team needed a qualitative deep dive into how enrollees actually navigated this category, where comprehension broke down, and what could be done to streamline the decision-making process.'] },
      { label: 'The Problem', title: 'An experience that assumed product literacy no one had', body: ['Ancillary insurance is genuinely confusing. Unlike medical coverage, most Medicare enrollees haven\'t shopped for standalone dental or vision plans before. They arrive without a mental model for how these products work, what they cover, or how to compare them. The existing experience assumed a level of product literacy that most users simply didn\'t have.'] },
      { label: 'The Process', title: 'Mixed-methods research across a range of literacy levels', body: ['I designed and ran a mixed-methods research study combining moderated usability sessions with qualitative interviews. Sessions were structured to observe navigation behavior in real time while also capturing the reasoning behind decisions — not just what users did, but why.', 'I mapped comprehension gaps at each step of the shopping flow, identifying where users were making decisions based on misunderstanding rather than informed choice.'] },
      { label: 'The Solution', title: 'Prioritized findings that gave the team somewhere to go', body: ['The research produced a prioritized set of findings and recommendations. Key themes included: the need for plain-language category explanations before plan comparison, the importance of anchoring cost comparisons in annual out-of-pocket terms rather than monthly premiums, and the value of progressive disclosure — surfacing the most critical information first.'] },
    ]}
    gallery={[]}
    cta={{ title: 'Want to see how mixed-methods research can simplify complex decision-making?' }}
    next={getNextWork('ancillary-journey')!}
  >
    <PasswordGate
      password="4likh4n"
      title="Want to see the full research deck?"
      description="The complete presentation covers research objectives, session-by-session findings across dental, vision, and hearing, and the full set of usability issues with severity ratings and recommendations."
      inside={['Research objectives & methodology', 'Session findings across dental, vision, and hearing', 'Usability issues with severity ratings', 'Prioritized recommendations']}
    >
      <PresentationLink />
    </PasswordGate>
  </ProjectPage>
}
