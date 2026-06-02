import ProjectPage from '@/app/components/ProjectPage'
export default function Page() {
  return <ProjectPage
    title="Optimizing the Ancillary Insurance Journey"
    company="Willis Towers Watson"
    tags={['Usability Research', 'Mixed-Methods Research']}
    hook="Medicare enrollees shopping for dental, vision, and hearing coverage face a product category most people have never had to think about before. My research set out to understand where the confusion lived — and what it would take to remove it."
    details={[{ label: 'Company', value: 'Willis Towers Watson' }, { label: 'Role', value: 'UX Researcher' }, { label: 'Methods', value: 'Moderated Usability Sessions, Qualitative Interviews' }, { label: 'Disciplines', value: 'Usability Research, Mixed-Methods Research' }]}
    sections={[
      { label: 'The Brief', title: 'A deep dive into ancillary insurance navigation', body: ['Via Benefits offered ancillary insurance products — dental, vision, and hearing coverage — as part of its broader Medicare shopping experience. The team needed a qualitative deep dive into how enrollees actually navigated this category, where comprehension broke down, and what could be done to streamline the decision-making process.'] },
      { label: 'The Problem', title: 'Clinical tools fail when they ask too much of the clinician', body: ['Ancillary insurance is genuinely confusing. Unlike medical coverage, most Medicare enrollees haven\'t shopped for standalone dental or vision plans before. They arrive without a mental model for how these products work, what they cover, or how to compare them. The existing experience assumed a level of product literacy that most users simply didn\'t have.'] },
      { label: 'The Process', title: 'Mixed-methods research across a range of literacy levels', body: ['I designed and ran a mixed-methods research study combining moderated usability sessions with qualitative interviews. Sessions were structured to observe navigation behavior in real time while also capturing the reasoning behind decisions — not just what users did, but why.', 'I mapped comprehension gaps at each step of the shopping flow, identifying where users were making decisions based on misunderstanding rather than informed choice.'] },
      { label: 'The Solution', title: 'Prioritized findings that gave the team somewhere to go', body: ['The research produced a prioritized set of findings and recommendations. Key themes included: the need for plain-language category explanations before plan comparison, the importance of anchoring cost comparisons in annual out-of-pocket terms rather than monthly premiums, and the value of progressive disclosure — surfacing the most critical information first.'] },
    ]}
    gallery={[{ src: '', alt: 'Full Research Overview', caption: 'Full research overview and methodology' },
        { src: '', alt: 'Comprehension Gap Map', caption: 'Comprehension gap mapping across the shopping flow' },
        { src: '', alt: 'Usability Session Findings', caption: 'Key findings from moderated usability sessions' },
        { src: '', alt: 'Recommendations Framework', caption: 'Prioritized recommendations framework' },
        { src: '', alt: 'Before/After IA', caption: 'Before and after information architecture comparison' }]}
    description={{ title: 'Want to see how mixed-methods research can simplify complex decision-making?', href: 'mailto:ali@alikhandesign.com' }}
    next={{ title: 'Vivio Clinical App', href: '/work/vivio' }}
  />
}
