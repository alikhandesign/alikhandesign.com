import type { Meta, StoryObj } from '@storybook/react'
import CTAStrip from './CTAStrip'

/**
 * CTAStrip is the dark call-to-action section that appears at the bottom of every
 * project and case study page. It's the conversion moment for high-intent visitors —
 * someone who has read to the end of your work is the most likely person on the site
 * to reach out.
 *
 * ## Design rationale
 * The dark background (`--dark-bg`) creates a clear visual break between the page
 * content and the CTA — signaling "this page is ending, here's what to do next"
 * without requiring a hard divider or modal. The eyebrow + serif heading + button
 * layout mirrors the homepage hero and the About page contact card, creating
 * compositional consistency across high-intent moments on the site.
 *
 * The button triggers ContactModal rather than a direct mailto: link — consistent
 * with all other contact entry points on the site.
 *
 * ## Eyebrow variants
 * The default eyebrow is "Interested?" — used on project pages where the visitor
 * has just finished reading about a specific piece of work. On case study pages
 * the same default applies. The eyebrow prop accepts any string for flexibility.
 *
 * ## Tokens used
 * - Background: --dark-bg
 * - Padding: 4rem 3rem
 * - Eyebrow: eyebrow-dark class (--font-size-xs, --letter-spacing-lg, --color-text-on-dark)
 * - Title: --font-size-2xl, --font-serif, weight 400, --bg color
 * - Button: btn-primary class
 * - Max width: 780px (content column width, not --max-w)
 *
 * ## Usage
 * Used at the bottom of every project page (via ProjectPage component) and
 * every case study page. Always appears before the divider and Next Project/
 * Next Case Study footer navigation.
 */
const meta: Meta<typeof CTAStrip> = {
  title: 'Templates/CTAStrip',
  component: CTAStrip,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'dark' } },
  argTypes: {
    eyebrow: { control: 'text', description: 'Small uppercase label above the title. Defaults to "Interested?"' },
    title: { control: 'text', description: 'The main heading. Should be an invitation, not a command.' },
    onContact: { description: 'Callback that opens ContactModal. Passed down from the page component.' },
  },
}

export default meta
type Story = StoryObj<typeof CTAStrip>

export const Default: Story = {
  args: {
    eyebrow: 'Interested?',
    title: 'Interested in how this came together?',
    onContact: () => {},
  },
}

export const CaseStudy: Story = {
  name: 'Case Study variant',
  args: {
    eyebrow: 'Interested?',
    title: 'Want to see the full research methodology and design decisions?',
    onContact: () => {},
  },
}
