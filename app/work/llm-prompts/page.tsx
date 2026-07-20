import { getNextWork } from '@/app/work.config'
import ProjectPage from '@/app/components/ProjectPage'


export default function Page() {
  return <ProjectPage
    title="LLM Prompt Engineering for Website Audits"
    company="Willis Towers Watson"
    tags={['AI Workflow', 'AI Design']}
    hook="The organization had a definition of \"legal\" but no definition of \"done\" — quality checks stopped at accessibility compliance, so unpolished work shipped and stayed shipped. I built an AI-driven audit engine that turned four departments' buried standards into a live, weighted scorecard any team could run in seconds."
    details={[{ label: 'Company', value: 'Willis Towers Watson' }, { label: 'Role', value: 'Senior UX Designer' }, { label: 'Disciplines', value: 'Prompt Engineering, Context Engineering' }, { label: 'Output', value: 'AI-driven, cross-functional audit engine' }]}
    sections={[
      { label: 'The Brief', title: 'A scalable way to enforce standards across four disciplines', body: ['The initial ask was for UX audits — a way to check pages against design standards without relying on one person\'s manual review. During discovery, I found the same gap existed in engineering, accessibility, and content strategy: standards existed, but they were buried in documentation nobody had time to cross-reference mid-sprint. I proposed expanding the project into a unified auditing system covering all four disciplines.'] },
      { label: 'The Problem', title: 'A culture of compliance, not quality', body: ['The organization only enforced audits for legally mandated accessibility checks, so design and content standards carried no institutional weight. Developers could bypass documented patterns under deadline pressure, a single writer was responsible for maintaining a unified voice across years of content, and there was no official record of non-legal defects — so functional-but-unpolished work simply stayed in production. Quality was treated as optional because no one was accountable for it.'] },
      { label: 'The Process', title: 'Engineering context, not just prompts', body: ['I deconstructed the internal Quality Knowledge Base — UX, engineering, accessibility, and content standards — into structured context specs for Microsoft Copilot, building in logic that reflected our actual business rules rather than generic AI feedback: weighting Medicare content for a 5th-grade reading level, for example, while allowing more technical nuance elsewhere. Each audit scored a page from 0–100 using a weighted rubric with a 0–3 severity scale, from blocker to full alignment.', 'I deployed the specs as a zero-friction toolkit inside the Microsoft Edge sidebar, so any team member could run a discipline-specific audit directly on a live page — no separate tool, no waiting on manual SME review.'] },
      { label: 'The Solution', title: 'From reactive compliance to proactive, cross-functional accountability', body: ['The audit engine cut page review from hours of manual cross-referencing to minutes of automated synthesis, and gave leadership an objective, data-driven map of where design and technical debt were concentrated. It also democratized expertise that had been bottlenecked in one or two people — content strategy especially — by making it accessible to every department through a shared prompt library.', 'The bigger shift was cultural: once every team was scoring against the same 0–3 standard, quality feedback stopped feeling like personal critique and started reading as shared, objective data.'] },
    ]}
    gallery={[{ src: '', alt: 'Prompt Framework Overview', caption: 'Full prompt framework architecture' },
        { src: '', alt: 'Sample Audit Output', caption: 'Sample structured audit output' },
        { src: '', alt: 'Heuristic Mapping', caption: 'Heuristic to prompt mapping' },
        { src: '', alt: 'Before/After Comparison', caption: 'Manual vs AI audit output comparison' }]}
    cta={{ title: 'Curious how to turn buried standards into a scalable, cross-functional audit system?' }}
    next={getNextWork('llm-prompts')!}
  />
}
