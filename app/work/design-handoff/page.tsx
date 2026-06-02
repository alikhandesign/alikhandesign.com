import ProjectPage from '@/app/components/ProjectPage'
export default function Page() {
  return <ProjectPage
    title="Design Handoff Checklist"
    company="Willis Towers Watson"
    tags={['Process Design', 'Workflow Optimization']}
    hook="The gap between what a designer hands off and what an engineer builds isn't usually a talent problem. It's a communication problem. A well-designed checklist can close that gap before it opens."
    details={[{ label: 'Company', value: 'Willis Towers Watson' }, { label: 'Role', value: 'Senior UX Designer' }, { label: 'Disciplines', value: 'Process Design, Workflow Optimization' }, { label: 'Output', value: 'Shared handoff framework' }]}
    sections={[
      { label: 'The Brief', title: 'A shared definition of what "ready for development" means', body: ['Repeated miscommunication cycles between design and engineering were creating rework, delaying launches, and eroding trust between teams. I developed a comprehensive design-to-development handoff checklist to standardize what "ready for development" actually meant.'] },
      { label: 'The Problem', title: 'Implicit expectations create explicit problems', body: ['Without a shared definition of handoff readiness, every designer and engineer developed their own implicit expectations. Some designers handed off high-fidelity files with no specs. Some included specs but missed edge cases. Engineers made assumptions to fill the gaps, often in ways that didn\'t match design intent. The resulting back-and-forth consumed time that neither team had.'] },
      { label: 'The Process', title: 'Auditing failure points before building a solution', body: ['I started by auditing recent handoffs — interviewing both designers and engineers about where breakdowns had occurred and what information they wished they\'d had. I mapped the most common failure points into categories: missing states, undefined responsive behavior, unspecified interaction details, accessibility gaps, and asset naming inconsistencies.', 'From that audit, I built a checklist organized around those categories — designed to be completed by the designer before marking anything ready, and reviewable by the engineer as a first check before beginning implementation.'] },
      { label: 'The Solution', title: 'A shared language for design and engineering', body: ['The checklist established a shared definition of handoff readiness across the design and engineering teams. It reduced back-and-forth on specification questions, surfaced missing states and edge cases before they became implementation problems, and gave both teams a common language for discussing what was and wasn\'t ready to build.'] },
    ]}
    gallery={[{ src: '', alt: 'Checklist Overview', caption: 'Full design handoff checklist' },
        { src: '', alt: 'Category Breakdown', caption: 'Checklist category breakdown' },
        { src: '', alt: 'Before/After Handoff Quality', caption: 'Handoff quality before and after' },
        { src: '', alt: 'Team Adoption', caption: 'Team adoption and usage patterns' }]}
    cta={{ title: 'Want to see how a structured handoff process eliminates design-to-dev friction?' }}
    next={{ title: 'Back to All Work', href: '/work' }}
  />
}
