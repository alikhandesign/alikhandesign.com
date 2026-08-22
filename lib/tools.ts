// lib/tools.ts
// Defines the report_audience tool the model calls alongside every visible
// response - a private, structured estimate of who's likely asking and
// whether this is a natural moment to suggest contacting Ali directly.
//
// This is a genuinely separate content block in the same API response, not
// text parsed out of the reply - the same distinction that made citation
// parsing reliable, now applied to a second kind of structured signal.
//
// Never shown to the visitor. Logged server-side for the admin dashboard,
// and fed back into the next turn's system prompt as a working estimate -
// never presented to the model or the visitor as a confirmed fact about who
// they are.

import { CASE_STUDY_INDEX } from './knowledge/index'

const CASE_STUDY_SLUGS = CASE_STUDY_INDEX.map((entry) => entry.slug)

export const AUDIENCE_TOOL = {
  name: 'report_audience',
  description:
    "Report a working estimate of who the visitor is likely evaluating this from the perspective of, based on the conversation so far. This is never shown to the visitor and is not a confirmed fact - it's a private, evolving inference used to calibrate tone and to decide whether this is a natural point to suggest contacting Ali directly. Call this on every turn, in addition to giving a full, substantive text reply to the visitor - this tool call never replaces or substitutes for that reply.",
  input_schema: {
    type: 'object',
    properties: {
      audience: {
        type: 'string',
        enum: ['recruiter', 'hiring_manager', 'product_manager', 'engineer', 'unknown'],
        description:
          "Best current guess at who's asking, from the shape and content of their messages - a pasted job-description-shaped block strongly suggests recruiter; 'why did you...' or a challenge to a documented decision suggests hiring_manager; 'what got cut' or a named constraint suggests product_manager; questions about stack, architecture, or how something technically works suggest engineer. Use 'unknown' rather than forcing a guess when there's genuinely no signal yet.",
      },
      confidence: {
        type: 'number',
        description:
          'How confident this estimate is, from 0 (no real signal, a pure default) to 1 (very clear signal, e.g. an actual pasted job description). Most early-conversation estimates should be low-to-moderate, not high.',
      },
      depth: {
        type: 'string',
        enum: ['surface', 'technical', 'business'],
        description:
          "What kind of depth this conversation seems to want - a fast, direct answer (surface), technical/engineering reasoning (technical), or business-constraint reasoning (business). Note that an engineer and a product manager can ask a near-identical question and only diverge here, in what a good answer contains - detection alone can't resolve that; both a technical- and business-framed version of key answers need to exist to draw from.",
      },
      suggest_contact: {
        type: 'boolean',
        description:
          "True only when this specific response reaches a natural point where reaching out to Ali directly is the right next step - the visitor asks how to get in touch, expresses clear interest in following up, or the conversation reaches a genuine positive fit assessment with an obvious next step. Examples of what should trigger this: \"How do I get in touch with him?\", \"Can I reach out about this role?\", \"What's the best way to follow up?\". Do not set this reflexively on every response - most responses should have this false.",
      },
    },
    required: ['audience', 'confidence', 'depth', 'suggest_contact'],
  },
} as const

export interface AudienceEstimate {
  audience: 'recruiter' | 'hiring_manager' | 'product_manager' | 'engineer' | 'unknown'
  confidence: number
  depth: 'surface' | 'technical' | 'business'
  suggest_contact: boolean
}

// lookup_case_study - retrieves deeper detail on one specific project, only
// for questions that actually need it. The always-loaded index
// (lib/knowledge/index.ts) covers routing and light matching; this tool is
// how the model pulls in a project's full four-lens detail on demand,
// keeping the default system prompt lean as the case-study corpus grows.
//
// Unlike report_audience, this tool's result has to flow back into the
// model's own context before it can write a real answer - this needs a
// genuine multi-step tool-use loop server-side (see route.ts), not a single
// call. The same lesson from report_audience's blank-response bug applies
// here even more directly: a turn that calls this tool must still end in a
// real text reply to the visitor, never just the retrieval itself.
export const CASE_STUDY_LOOKUP_TOOL = {
  name: 'lookup_case_study',
  description:
    "Retrieve detail on a specific project beyond what's in the always-loaded case study index. Use only when a question needs depth the index's one-line summary doesn't cover - a real business constraint, a technical constraint, or outcome detail for one specific project. Match the slug exactly against the index already in your system prompt. After receiving the result, you must still give a full, substantive text reply to the visitor using that content - calling this tool is never itself the response, and a turn that ends without a real text reply is wrong even if this tool was called correctly.",
  input_schema: {
    type: 'object',
    properties: {
      slug: {
        type: 'string',
        enum: CASE_STUDY_SLUGS,
        description: 'Exact project slug from the case study index.',
      },
      lens: {
        type: 'string',
        enum: ['outcome', 'business_constraint', 'technical_constraint', 'do_not_fabricate', 'all'],
        description:
          'Which section to retrieve. Use "all" if unsure which lens applies, or if the question spans more than one.',
      },
    },
    required: ['slug', 'lens'],
  },
} as const

export interface CaseStudyLookupInput {
  slug: string
  lens: 'outcome' | 'business_constraint' | 'technical_constraint' | 'do_not_fabricate' | 'all'
}
