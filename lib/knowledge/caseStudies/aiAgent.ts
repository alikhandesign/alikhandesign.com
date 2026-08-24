// lib/knowledge/caseStudies/aiAgent.ts
// First project migrated to the four-lens structure - a real test case for
// the pattern before the rest of the corpus migrates. Content here is drawn
// directly from the current, already-verified system prompt content, not
// reconstructed from memory - this project specifically had a real
// fabrication incident earlier in this project's history (an invented
// "Open Enrollment spike" to a daily workload), so doNotFabricate here isn't
// a generic template filled in - it's the actual, hard-won lesson from that
// incident, stated precisely enough that it can't recur in a different form.

import type { CaseStudyDetail } from '../types'

export const AI_AGENT_DETAIL: CaseStudyDetail = {
  slug: 'ai-agent',

  outcome:
    'A fully automated pipeline [1]. Survey comments pulled daily via Qualtrics API. Before any AI touched data, Ali architected a two-layer redaction system: structured query patterns for known PHI/PII formats, plus an LLM-based layer for edge cases. Drug names and geographic references (cities, states) were intentionally preserved as non-identifying. Ali designed the intent mapping and categorization taxonomy from scratch - defining what categories comments should route into and how ambiguous cases should be handled - before any classification logic was built. Redacted data flowed into a hybrid categorization system built on that taxonomy: Qualtrics Text IQ for known patterns, Microsoft Copilot Studio (GPT) for ambiguous cases, both routing against the same intent structure Ali defined. Results structured against a Dataverse taxonomy table grounded in WTW\'s own product documentation, delivered as a daily Teams report. The pipeline also ran sentiment analysis on a weekly cadence (and could be run ad hoc on demand) - a significant speedup over the UX Research team\'s prior quarterly sentiment-analysis cadence. Ali also built a conversational Teams interface so stakeholders - PMs, Senior PMs, UX Researchers, Senior Leadership, Designers - could ask natural language questions about the data.\n\nValidation: a double-blind accuracy audit. Ali manually categorized a full week of raw feedback; the AI independently categorized the same data; both sets were stripped of origin labels and reviewed blind by Product Owners. First audit: 78% accuracy. Ali refined system instructions, improved grounding queries, and added fallback logic. Final accuracy: 95% - the point at which stakeholders could no longer reliably distinguish AI output from expert human categorization. The lead UX researcher who initially said "this will never be as good as human analysis" became one of the system\'s most vocal advocates.\n\nOutcomes: synthesis time went from 8+ hours to minutes; insight delivery lag from 5 days to same-day; 95% categorization accuracy; 20% of the research team\'s weekly capacity returned to higher-value work.',

  businessConstraint:
    'This was entirely self-initiated, not commissioned - which meant no dedicated budget or headcount, and no standing mandate to touch PHI/PII data at all. Before any AI could touch a single piece of feedback data, Ali had to run Legal and Compliance workshops to define what counted as PHI/PII in this specific context and earn explicit sign-off - a real constraint that shaped the system\'s entire architecture (the two-layer redaction system exists specifically because compliance sign-off was a hard gate, not an afterthought bolted on later). The expert gap was a second real constraint: researchers reviewing comments weren\'t domain experts on every product, which is precisely why a from-scratch intent taxonomy had to be designed before any classification logic - there was no existing structure to lean on.',

  technicalConstraint:
    'Two-layer redaction: structured query patterns handle known PHI/PII formats; an LLM-based layer catches edge cases the structured patterns miss. Drug names and geographic references (cities, states) are deliberately treated as non-identifying and preserved, a specific scoping decision about what counts as identifying information in this context. Categorization is hybrid, not single-model: Qualtrics Text IQ handles known patterns; Microsoft Copilot Studio (GPT) handles ambiguous cases; both route against the same custom intent taxonomy Ali designed, rather than two independently-reasoning systems. Output structure is grounded in a Dataverse taxonomy table built from WTW\'s own product documentation, not a generic category scheme. Sentiment analysis runs on a separate cadence (weekly, or ad hoc) from the categorization pipeline - two distinct capabilities on two distinct schedules, not one combined process.',

  doNotFabricate: [
    'The manual categorization workload before automation was one day per researcher, per week, consistently. Never describe it as happening daily, or as escalating during any specific period (e.g., Medicare Open Enrollment) - there is no documented spike of any kind. An earlier version of this content fabricated exactly such a spike (to "8 hours per day, every day, for the duration of the enrollment period") with no basis in the real case study, and it took several fix attempts across multiple sessions to fully close - treat this as a specifically hardened boundary, not a generic caution.',
    'Sentiment analysis is a separate capability of the automated pipeline (run weekly, or ad hoc), distinct from the manual categorization workload described above, and distinct from the UX Research team\'s own separate, prior quarterly sentiment-analysis cadence. Never merge these into one process or one time cost.',
    'The accuracy figures are 78% on the first double-blind audit, refined to 95% - never state a different number, and never state 95% as the first-attempt result. The improvement came specifically from refining system instructions, improving grounding queries, and adding fallback logic - not from a different or unspecified cause.',
  ],

  // This project is password-gated on the real site. Matches exactly what's
  // public: the hook, the four listed metrics, role/stack/timeline, and the
  // gate's own teaser text - which itself states the 78%-to-95% figure, so
  // that specific fact is genuinely public, not something this summary is
  // overstepping by including.
  publicSummary:
    'During Medicare Open Enrollment, researchers were spending entire days manually categorizing participant feedback. Ali built a system that automated the process, closing an expert-knowledge gap and reducing synthesis from hours to minutes. Publicly stated results: 95% categorization accuracy, validated through a double-blind process that took accuracy from 78% to 95%; synthesis time dropped from 8+ hours to minutes; insight delivery moved from a 5-day lag to same-day; and stakeholder satisfaction rated 4.5/5. Built with Copilot Studio, the Qualtrics API, Dataverse, and Power Automate - a self-initiated, agentic AI workflow project. The deeper methodology - the specific design decisions that shaped the system, and the stakeholder needs mapping - is part of Ali\'s password-protected work. If asked for that depth, point the visitor toward unlocking the case study on the site, or reaching out to Ali directly, without describing what the protected content actually contains.',
}
