// lib/knowledge/caseStudies/designHandoff.ts
import type { CaseStudyDetail } from '../types'

export const DESIGN_HANDOFF_DETAIL: CaseStudyDetail = {
  slug: 'design-handoff',

  outcome:
    'A mandatory Ready-for-Dev protocol standardizing how design got handed to engineering across 15 teams and 150+ developers at WTW [10]: a Jira gate requiring documented mobile breakpoints, state logic (loading, error, empty states), and interaction logic (tap versus click behaviors) before a story could move into development, plus a centralized knowledge base as a source of truth for handoff continuity. This was a governance system, not a traditional design deliverable - built to stop the same handoff gaps recurring project after project.',

  businessConstraint:
    'This came from a real, specific organizational failure: at enterprise scale (15 design teams, 150+ developers, 15 designers), delivery had stalled because handoff was essentially a black box. Components got reused inconsistently across teams, and a "Desktop-Only" myth persisted in the org - no team had ever actually documented mobile breakpoints, even though everything shipped responsively. Just as important as the mechanics was how buy-in was secured: Ali reframed the whole initiative as an accessibility and legacy-protection project rather than a process burden, which shifted senior designers from seeing it as compliance overhead toward something closer to mentorship.',

  technicalConstraint:
    'Implemented as a Design Sub-task gate in Jira, with a customization pipeline that formally vetted any new component before it entered the shared library, rather than letting ad-hoc components get created and reused inconsistently. The gate currently relies on a person manually checking the work - Ali has specifically noted this as the next thing he\'d change, wanting to automate parts of it with Figma linting plugins so governance shifts from being socially enforced to technically enforced.',

  doNotFabricate: [
    'The scale figures are specific: 15 design teams, 150+ developers, 15 designers. Do not round or restate these differently.',
    'The three required documentation items at the Jira gate are exactly: mobile breakpoints, state logic (loading/error/empty states), and interaction logic (tap versus click behaviors) - not a shorter or different list.',
    'The Figma-linting automation is a stated future direction, not something already built - never describe the gate as already automated.',
  ],
}
