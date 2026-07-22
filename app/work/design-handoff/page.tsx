import { getNextWork } from '@/app/work.config'
import ProjectPage from '@/app/components/ProjectPage'
import PasswordGate from '@/app/components/PasswordGate'


export default function Page() {
  return (
    <PasswordGate
      title="Design Handoff Checklist"
      description="A developer-first handoff protocol built across 15 teams and 150+ developers — the Ready-for-Dev checklist, the discovery research behind it, and the annotated mockups it was built to fix."
      inside={['The Ready-for-Dev checklist as a mandatory Jira gate', 'Discovery research: status-quo and mobile-handling audit boards', 'Annotated handoff mockups with redline notes', 'Before/after adoption feedback from designers, devs, and QA']}
    >
      <ProjectPage
        title="Design Handoff Checklist"
        company="Willis Towers Watson"
        tags={['Process Design', 'Design Systems', 'Workflow Optimization']}
        hero="/images/work/design-handoff/design-handoff-hero.jpg"
        heroFit="natural"
        hook={"At enterprise scale, the gap between what design hands off and what engineering builds isn't a talent problem — it's a black box. I built a developer-first handoff protocol that closed it, standardizing 15 teams around a single source of truth and a mobile-first bar every ticket had to clear before it was \"ready.\""}
        details={[{ label: 'Company', value: 'Willis Towers Watson' }, { label: 'Role', value: 'Senior UX Designer' }, { label: 'Disciplines', value: 'Process Design, Design Systems, Workflow Optimization' }, { label: 'Output', value: 'Ready-for-Dev checklist, Knowledge Base, and Customization Pipeline' }]}
        sections={[
          { label: 'The Brief', title: 'A design-to-dev handoff protocol for 15 teams', body: ["At enterprise scale — 15 teams, 150+ developers, 15 designers — delivery had stalled under years of accumulated process debt. Handoff was a black box: components got reused inconsistently across teams, or skipped altogether, producing a \"Frankenstein\" UI where one team's primary button was another team's secondary link. A cultural assumption that our (older) user base didn't use mobile devices meant there was no responsive documentation at all — FullStory data showed the resulting frustration directly, in the mobile and tablet sessions that were happening anyway."] },
          { label: 'The Problem', title: 'An alignment gap, not a tooling gap', body: ["Despite having a shared component library, teams treated it as a suggestion rather than a standard. The \"Desktop-Only\" myth meant no team had ever documented mobile breakpoints or interaction states, so developers guessed at layout behavior on smaller screens. And because handoff lived as tribal knowledge in each designer's files, work became an indecipherable maze the moment a designer went on vacation or left the company — stalling engineering until someone could reverse-engineer intent."] },
          { label: 'The Process', title: 'Listening first, then engineering the gate', body: ["I started with a status-quo audit — interviewing designers and engineers across all 15 teams to document where the cost of inconsistency actually showed up, and using FullStory data to confirm the mobile frustration was real. I piloted the new responsive-first protocol on my own team first, which surfaced the actual gaps in our component library (mobile-friendly variants, mostly) before asking anyone else to adopt it. Winning over senior designers meant reframing the work: not as extra process, but as an accessibility and legacy project that protected junior designers from having to guess.", "From there I turned the Jira workflow itself into the gate. I built a mandatory Design Sub-task — a Ready-for-Dev checklist — that no story could clear without documented mobile breakpoints, state logic (loading, error, empty), and interaction logic (tap vs. click). A centralized Knowledge Base held the resulting source-of-truth documentation, and a Customization Pipeline gave teams a formal path to submit new components for vetting into the shared library instead of freelancing their own."] },
          { label: 'The Solution', title: 'A shared contract — and a case for automating it further', body: ["The protocol replaced \"design-by-developer\" guesswork with a standardized contract across all 15 teams. Rework dropped as the source of truth got established before a sprint began instead of getting negotiated mid-build, and the \"black box\" problem disappeared — any engineer or designer could pick up a ticket and understand the full intent, even across a handoff between people. FullStory sessions showed a measurable drop in user frustration as the UI became consistent and accessible across devices for the first time.", "The bigger lesson was that scaling a process across 200+ people is a human problem before it's a technical one — mentorship and advocacy moved veteran designers faster than a mandate would have. At larger scale, I'd want to move the Ready-for-Dev gate from social governance (checklists and meetings) to technical governance: automating it through Figma linting plugins that check for mobile breakpoints and token usage, so the gatekeeper role moves from a person to a tool."] },
        ]}
        gallery={[
          { src: '/images/work/design-handoff/research-current-handoff-quotes.jpg', alt: 'Status quo audit board: what does your current design handoff look like?', caption: 'Status-quo audit: designers, developers, and QA describing handoff as it actually worked, in their own words' },
          { src: '/images/work/design-handoff/research-mobile-handling-quotes.jpg', alt: 'Discovery audit board: how do you handle mobile designs?', caption: 'The mobile-handling audit that surfaced the \u201cDesktop-Only\u201d myth and its real cost to accessibility' },
          { src: '/images/work/design-handoff/annotated-mockup-review.jpg', alt: 'Ad hoc redline notes on a shopping-plans mockup', caption: 'Handoff before the protocol: ad hoc callouts patched on after the fact \u2014 exactly what the checklist was built to make unnecessary' },
          { src: '/images/work/design-handoff/responsive-breakpoints-overview.jpg', alt: 'Desktop, tablet, and mobile breakpoints documented in Figma', caption: 'The Responsive Mandate in practice: mobile and tablet breakpoints documented upfront, not guessed at during QA' },
          { src: '/images/work/design-handoff/adoption-feedback-quotes.jpg', alt: 'Post-implementation feedback from designers, developers, and QA', caption: 'After the protocol: designers, developers, and QA on what changed once \u201cready for development\u201d had a real definition' },
          { src: '/images/work/design-handoff/dev-mode-mcp-handoff.jpg', alt: 'Figma Dev Mode MCP panel showing an automated handoff prompt', caption: 'Where this goes next: automating the Ready-for-Dev gate itself through Figma\u2019s Dev Mode tooling' },
        ]}
        cta={{ title: 'Want to see how a structured handoff process eliminates design-to-dev friction?' }}
        next={getNextWork('design-handoff')!}
      />
    </PasswordGate>
  )
}
