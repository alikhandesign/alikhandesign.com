// lib/knowledge/types.ts
// Shared types for the case-study knowledge base. The index (lib/knowledge/index.ts)
// stays fully loaded in every system prompt; individual project detail files
// (lib/knowledge/caseStudies/*.ts) are retrieved on demand via the
// lookup_case_study tool (lib/tools.ts) - see route.ts for the retrieval loop.

export interface CaseStudyIndexEntry {
  slug: string // matches the /work/<slug> URL and the detail file's own slug
  title: string
  oneLineSummary: string
  tags: {
    skills: string[]
    stack: string[]
    roleType: string[]
  }
}

export interface CaseStudyDetail {
  slug: string
  // What shipped, and the impact/metrics that resulted - this is the lens
  // that mostly already existed in prose form before this restructure.
  outcome: string
  // What got cut, or what real constraint shaped a decision - the lens
  // hiring-manager and PM mode need to answer "what didn't you build, and why."
  businessConstraint: string
  // Stack, API/data limits, feasibility tradeoffs - the lens engineer mode
  // needs, and the one design case studies rarely document at all.
  technicalConstraint: string
  // Project-specific facts the assistant must never embellish or distort.
  // Required, not optional - even a project with no known fabrication risk
  // should have at least one honest, verified fact stated here as a floor,
  // rather than leaving the field to imply nothing needs guarding.
  doNotFabricate: string[]
  // Only present for projects gated by PasswordGate on the real site. This
  // is what a locked visitor gets instead of the full four lenses - built
  // to match, fact for fact, exactly what's genuinely visible on the real
  // page before the gate (hook, public metrics, gate teaser text), not a
  // paraphrase or approximation of it. The principle: what the chatbot can
  // discuss unlocked should match what the site itself shows unlocked,
  // nothing more.
  publicSummary?: string
}
