import ProjectPage from '@/app/components/ProjectPage'
export default function Page() {
  return <ProjectPage
    title="LLM Prompt Engineering for Website Audits"
    company="Willis Towers Watson"
    tags={['AI Workflow', 'AI Design']}
    hook="A UX website audit used to mean days of manual heuristic review, documented in a spreadsheet, delivered weeks after the window to act had closed. I wanted to know if it could be done in an afternoon."
    details={[{ label: 'Company', value: 'Willis Towers Watson' }, { label: 'Role', value: 'Senior UX Designer' }, { label: 'Disciplines', value: 'AI Workflow Design, Prompt Engineering' }, { label: 'Output', value: 'Structured prompt framework' }]}
    sections={[
      { label: 'The Brief', title: 'A repeatable framework for AI-powered UX audits', body: ['Manual UX website audits are time-intensive, inconsistent, and difficult to scale. I set out to design a structured prompt framework that would allow large language models to conduct rigorous UX audits — systematically, repeatably, and fast.'] },
      { label: 'The Problem', title: 'Generic AI feedback isn\'t useful', body: ['The problem with asking an AI to audit a website without structure is that you get generic feedback. "The navigation could be clearer." These observations aren\'t wrong but they\'re not useful. They don\'t connect to specific heuristics, don\'t prioritize findings, and don\'t give a design or product team anything concrete to act on.', 'The challenge was designing a prompt architecture that would produce specific, heuristic-grounded, prioritized audit output — consistently, across different types of sites and different evaluators.'] },
      { label: 'The Process', title: 'From heuristics to structured prompt architecture', body: ['I started by mapping the core heuristics I wanted the framework to evaluate against — drawing from Nielsen\'s usability heuristics, accessibility standards, and conversion-focused UX principles. I then designed a series of prompts structured around those heuristics, with explicit instructions for how to evaluate, how to prioritize findings, and how to format output for use by design and product teams.', 'I tested the framework across multiple site types — marketing pages, product dashboards, sign-up flows — comparing AI-generated audit outputs against manually produced ones. I iterated on the prompt structure based on where outputs were too generic or missing critical categories.'] },
      { label: 'The Solution', title: 'Structured, heuristic-grounded audit outputs in hours not days', body: ['The final framework produced structured audit outputs organized by severity, tied to specific page elements, and framed in terms of user impact rather than aesthetic preference. What previously required days of manual effort could be completed and reviewed in hours.'] },
    ]}
    gallery={['Prompt Framework Overview', 'Sample Audit Output', 'Heuristic Mapping', 'Before/After Comparison']}
    cta={{ title: 'Want to see how AI can systematize UX audits at scale?', href: 'mailto:ali@alikhandesign.com' }}
    next={{ title: 'Design Handoff Checklist', href: '/work/design-handoff' }}
  />
}
