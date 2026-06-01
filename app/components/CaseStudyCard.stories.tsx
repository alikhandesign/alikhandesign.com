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
 * ## Tokens used
 * - Background: `--surface`
 * - Border: `--border` (hover: `--accent` via `.work-card`)
 * - Border radius: `--radius`
 * - Image placeholder: `--border`
 * - Title: `--text-2xl`, `--font-serif`, weight 400
 * - Company: `--text-xs`, `--text-muted`
 * - Description: `--text-base`, `--text-muted`
 * - Outcome value: `--text-2xl`, `--font-serif`, `--accent`
 * - Outcome label: `--text-xs`, `--text-muted`
 * - CTA: `--text-base`, `--accent`, weight 500
 * - Content padding: `--space-8` (2rem)
 * - Tag row gap: `--space-2` (0.5rem)
 * - Outcomes row gap: `--space-8` (2rem)
 *
 * ## Usage
 * Used exclusively on the My Work page (`/work`) in the Case Studies section.
 * Not used on the homepage — the homepage uses FeaturedProjectCard for case studies
 * to keep the featured section visually consistent with projects.
 */
const meta: Meta<typeof CaseStudyCard> = {
  title: 'Card/CaseStudyCard',
  component: CaseStudyCard,
  argTypes: {
    title: { control: 'text', description: 'Project title, displayed in DM Serif Display' },
    company: { control: 'text', description: 'Client or employer name, displayed as small uppercase eyebrow below title' },
    description: { control: 'text', description: 'Short summary of the work, 1-2 sentences' },
    tags: { control: 'object', description: 'Discipline tags. First tag is always "Case Study" (accent variant), additional tags use default variant' },
    outcomes: { control: 'object', description: 'Array of quantified outcomes. Each outcome has a val (metric) and label (description). Displayed in accent color.' },
    href: { control: 'text', description: 'Link to the full case study page' },
  },
}

export default meta
type Story = StoryObj<typeof CaseStudyCard>

export const Default: Story = {
  args: {
    title: 'AI Feedback & Insights Agent',
    company: 'Willis Towers Watson',
    tags: ['Agentic Workflow Design', 'AI Design'],
    description: 'Designed and deployed an agentic AI research pipeline that automated qualitative synthesis — transforming raw user feedback into structured, actionable insights with 95% categorization accuracy.',
    outcomes: [
      { val: '95%', label: 'Categorization accuracy' },
      { val: '8 hrs → 8 min', label: 'Synthesis time reduction' },
      { val: '3.5M+', label: 'Annual evaluations supported' },
    ],
    href: '#',
  },
}
