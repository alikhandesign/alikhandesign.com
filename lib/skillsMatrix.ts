// lib/skillsMatrix.ts
// Structured skill/tool/domain data, purpose-built for fast JD matching -
// deliberately always-loaded (like reflections.ts and sources.ts), not
// retrieval-based, since a recruiter reading a fit verdict needs speed, not
// a lookup round-trip.
//
// Three explicit tiers, not a flat list, matching the same precision
// discipline as the case studies' doNotFabricate notes: confident areas,
// areas with real but limited/contextual experience, and areas with no
// documented experience at all. The gaps array exists specifically so the
// assistant can say a plain, honest "no" to a JD requirement rather than
// stretching something adjacent to sound like a fit.

export interface SkillsMatrix {
  confident: string[]
  light: Array<{ skill: string; note: string }>
  gaps: string[]
  tools: string[]
  domains: string[]
  roleTypes: string[]
}

export const SKILLS_MATRIX: SkillsMatrix = {
  confident: [
    'Visual design fundamentals (typography, layout, color, hierarchy)',
    'Interaction design and micro-interactions',
    'Prototyping across fidelity levels (wireframe through high-fidelity interactive)',
    'Motion design and animation principles',
    'Responsive and adaptive design across device classes',
    'Design systems architecture, including governance, versioning, and adoption - not just usage',
    'Accessibility beyond compliance - inclusive design as a design driver, not a checklist (WCAG 2.1+, Section 508)',
    'Qualitative research methods (interviews, contextual inquiry, diary studies, ethnography)',
    'Quantitative research methods (surveys, A/B testing, statistical significance literacy)',
    'Mixed-methods synthesis',
    'Usability testing, moderated and unmoderated',
    'Card sorting, tree testing, information architecture validation',
    'Journey mapping and service blueprinting',
    'Competitive and comparative analysis',
    'Research operations (participant recruiting, panel management, repositories)',
    'Longitudinal and continuous discovery practices',
    'Information architecture at scale, across multiple products and teams',
    'Design ops - tooling, workflow, and handoff process design',
    'Cross-platform design consistency (web, mobile, native)',
    'Translating business goals into design strategy',
    'Defining and owning success metrics tied to business outcomes, not just usability metrics',
    'Roadmap influence - shaping what gets built, not just how',
    'Competitive and market positioning awareness',
    'Mentorship and coaching of other designers and researchers',
    'Setting design standards or patterns adopted by other teams',
    'Cross-functional alignment on ambiguous, contested problems',
    'Influencing without direct authority, across peers, other functions, and leadership',
    'Representing design in executive-level conversations',
    'Working fluency in engineering constraints - APIs, data models, performance tradeoffs',
    'Working fluency in PM practices - prioritization frameworks, roadmapping',
    'Working fluency in data and analytics - reading dashboards, framing testable hypotheses',
    'Understanding of legal, compliance, and privacy constraints in regulated domains',
    'AI and ML literacy - designing with probabilistic systems, not just using AI tools; uncertainty, non-determinism, evaluation',
    'Storytelling and narrative framing for design rationale',
    'Executive presence - synthesizing complexity into a clear ask',
    'Written communication - design docs and strategy memos, not just decks',
    'Public speaking and community presence',
    'Design critique facilitation',
    'Design for regulated industries (healthcare specifically, documented)',
    'Service design across multi-channel, non-digital touchpoints',
    'Growth design and experimentation culture',
    'Conversational and AI interaction design specifically - system prompts, guardrail design, evaluation frameworks',
  ],
  light: [
    {
      skill: 'Content design and UX writing',
      note: 'Has done it as part of broader design work, but it is not a specialty - never present this as a primary strength.',
    },
    {
      skill: 'Design hiring',
      note: 'Hired contract designers while working as a senior designer - not full-time headcount hiring, and not exercised at Staff or Principal scope.',
    },
    {
      skill: 'Building or shaping a design practice or discipline',
      note: 'Did a light version of this at Ventric Health specifically - not a broad, org-wide practice-building track record.',
    },
    {
      skill: 'Internationalization and localization design',
      note: 'Worked on Spanish-language design versions at WTW specifically - not broad multi-language i18n experience at scale.',
    },
  ],
  gaps: [
    'Business-case building - making the dollar or risk argument for a design investment. No documented experience; do not claim this.',
    'P&L or unit-economics literacy. No documented experience; do not claim this.',
    'Career ladder or leveling definition. No documented experience; do not claim this.',
  ],
  tools: [
    'Figma (Variables, Auto-layout)', 'Figma Make', 'Framer', 'Webflow', 'Sketch', 'InVision',
    'HTML5', 'CSS3',
    'Qualtrics XM (including Text IQ)', 'FullStory (including custom dashboard configuration)',
    'OptimalWorkshop', 'UserTesting', 'UserLytics', 'Dovetail', 'Maze',
    'Power Automate', 'Dataverse', 'Miro', 'Microsoft Copilot Studio',
    'Adobe Creative Cloud (InDesign, Illustrator, After Effects, Premiere)',
    'GitHub Copilot (personal use only, not at WTW)', 'Claude Code', 'Cursor', 'v0.app', 'NotebookLM',
  ],
  domains: [
    'Healthcare and Medicare/benefits marketplace (WTW / Via Benefits)',
    'Clinical and medical device design, FDA-regulated (Ventric Health)',
    'Healthcare services (Signify Health)',
    'AI and LLM product design (self-initiated and current, ongoing)',
  ],
  roleTypes: [
    'Senior / Staff Product Designer',
    'UX Researcher',
    'AI Interaction Designer',
    'Design Systems lead',
  ],
}

export function formatSkillsMatrixForPrompt(): string {
  const confidentText = SKILLS_MATRIX.confident.join('; ')
  const lightText = SKILLS_MATRIX.light
    .map((l) => `${l.skill} (${l.note})`)
    .join('; ')
  const gapsText = SKILLS_MATRIX.gaps.join('; ')
  const toolsText = SKILLS_MATRIX.tools.join(', ')
  const domainsText = SKILLS_MATRIX.domains.join('; ')
  const roleTypesText = SKILLS_MATRIX.roleTypes.join(', ')

  return [
    `CONFIDENT SKILLS: ${confidentText}`,
    `LIGHT/PARTIAL SKILLS (real but limited experience - never present as a primary strength): ${lightText}`,
    `GAPS (no documented experience - never claim these): ${gapsText}`,
    `TOOLS: ${toolsText}`,
    `DOMAINS: ${domainsText}`,
    `ROLE TYPES: ${roleTypesText}`,
  ].join('\n')
}
