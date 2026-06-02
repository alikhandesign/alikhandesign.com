import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyCard from './CaseStudyCard'

/**
 * CaseStudyCard is the primary content card for the My Work page's case studies section.
 * It uses a horizontal layout — image left, content right — to give case studies more
 * visual weight and communicates depth before a visitor clicks through.
 *
 * ## Design rationale
 * Case studies are the primary evidence of process and strategic thinking. The horizontal
 * layout, outcomes metrics, and richer content structure signal that there is more here
 * than a project summary. This deliberate hierarchy contrasts with FeaturedProjectCard,
 * which uses a simpler vertical layout to communicate a lighter-touch deliverable.
 *
 * The outcomes row — displayed in DM Serif Display at accent color — is the first thing
 * the eye lands on after the title. This is intentional: quantified impact is the most
 * persuasive signal for a hiring manager scanning multiple candidates.
 *
 * ## Hover state
 * On hover, the border transitions from `--border` to `--accent` via `--transition-base`
 * (150ms ease). This matches the hover behavior of FeaturedProjectCard and MetricCard,
 * creating a consistent interactive affordance across all card types.
 *
 * ## Case Study tag
 * The "Case Study" accent tag is always prepended by the component itself — you do not
 * need to include it in the `tags` array. Pass discipline tags only (e.g. "UX Research",
 * "AI Design"). This enforces the design convention at the component level.
 *
 * ## Image area
 * The image area currently renders as a warm placeholder (`--border` fill). An `imageSrc`
 * prop will be added when case study assets are finalized.
 *
 * ## Tokens used
 * - Background: `--surface`
 * - Border: `--border` (hover: `--accent`)
 * - Border radius: `--radius`
 * - Image placeholder: `--border`
 * - Content padding: 2rem 2rem 2rem 2.5rem
 * - Title: `--text-2xl`, `--font-serif`, weight 400, line height 1.2
 * - Company: `--text-xs`, `--text-muted`, `--letter-spacing-sm`
 * - Description: `--text-base`, `--text-muted`, line height 1.7
 * - Outcome value: `--text-2xl`, `--font-serif`, `--accent`, line height 1
 * - Outcome label: `--text-xs`, `--text-muted`
 * - Outcomes gap: `--space-8`
 * - CTA: `--text-base`, `--accent`, `--font-weight-medium`
 * - Footer padding top: `--space-6`
 *
 * ## Usage
 * Used exclusively on the My Work page (`/work`) in the Case Studies section.
 * Not used on the homepage — the homepage uses FeaturedProjectCard for case studies.
 */
const meta: Meta<typeof CaseStudyCard> = {
  title: 'Card/CaseStudyCard',
  tags: ['autodocs'],
  component: CaseStudyCard,
  argTypes: {
    title: { control: 'text', description: 'Project title, displayed in DM Serif Display.' },
    company: { control: 'text', description: 'Client or employer name, displayed as small eyebrow below title.' },
    description: { control: 'text', description: 'Short summary of the work. Aim for 1-2 sentences (~40 words max).' },
    tags: { control: 'object', description: 'Discipline tags only — do not include "Case Study". The component prepends it automatically as an accent tag.' },
    outcomes: { control: 'object', description: 'Array of quantified outcomes. Each has val (metric) and label (description). Displayed in accent color at heading size.' },
    href: { control: 'text', description: 'Full relative URL to the case study page (e.g. "/work/ai-agent").' },
  },
}

export default meta
type Story = StoryObj<typeof CaseStudyCard>

export const Default: Story = {
  args: {
    title: 'AI Feedback & Insights Agent',
    company: 'Willis Towers Watson',
    tags: ['Agentic Workflow Design', 'AI Design'],
    description: 'Designed an agentic AI research pipeline that automated qualitative synthesis — transforming raw feedback into actionable insights with 95% accuracy.',
    outcomes: [
      { val: '95%', label: 'Categorization accuracy' },
      { val: '8 hrs → 8 min', label: 'Synthesis time reduction' },
      { val: '3.5M+', label: 'Annual evaluations supported' },
    ],
    href: '#',
  },
}

export const SingleOutcome: Story = {
  name: 'Single Outcome',
  args: {
    title: 'IHE Scheduling Portal',
    company: 'Signify Health · CVS Health',
    tags: ['UX Research', 'UX Design'],
    description: 'Led mixed-methods research to uncover why members declined free in-home health evaluations — findings that directly informed a trust-first portal redesign.',
    outcomes: [
      { val: '73 NPS', label: 'Post-visit satisfaction' },
    ],
    href: '#',
  },
}
