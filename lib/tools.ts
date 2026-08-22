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

export const AUDIENCE_TOOL = {
  name: 'report_audience',
  description:
    "Report a working estimate of who the visitor is likely evaluating this from the perspective of, based on the conversation so far. This is never shown to the visitor and is not a confirmed fact - it's a private, evolving inference used to calibrate tone and to decide whether this is a natural point to suggest contacting Ali directly. Call this on every turn, even when the estimate hasn't changed from the previous one.",
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
