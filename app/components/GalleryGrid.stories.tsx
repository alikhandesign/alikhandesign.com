import type { Meta, StoryObj } from '@storybook/react'
import GalleryGrid from './GalleryGrid'

/**
 * GalleryGrid displays a collection of case study images in a responsive
 * 3-column grid. The first item can span two columns using the `wide` prop,
 * creating a visual anchor for the most important image in the set.
 *
 * ## Design rationale
 * 3 columns was chosen as the standard because it works well for collections of
 * 3-6 images — the typical range for a case study artifact set. Fewer columns
 * wastes horizontal space; more creates images too small to evaluate.
 *
 * The `wide` prop exists because the first image in a case study artifact set is
 * often the most important — a key wireframe, a research synthesis map, or a final
 * design. Spanning two columns gives it the prominence it deserves without requiring
 * a separate layout component.
 *
 * ## Responsive behavior
 * All items collapse to a single column on mobile (`max-width: 768px`). The `wide`
 * property has no effect at mobile breakpoint — all items are equal width.
 *
 * ## GalleryItem type
 * Each item in the `items` array accepts:
 * - `src` (string, optional) — image source URL. If omitted, warm placeholder renders.
 * - `alt` (string, optional) — alt text. Provide descriptive alt for all content images.
 * - `wide` (boolean, optional, default false) — if true, item spans 2 columns.
 *
 * Multi-word IDs with hyphens (e.g. `user-research`) are supported in section IDs
 * but `wide` is a simple boolean with no edge cases.
 *
 * ## Tokens used
 * - Grid gap: 1rem (intentionally hardcoded — between `--space-4` at 1rem and `--space-2`
 *   at 0.5rem; 1rem was chosen for visual balance at 3 columns)
 * - Image border radius: `--radius-sm` (4px)
 * - Placeholder fill: `--color-border` (warm/100)
 * - Placeholder text: `--font-size-xs`, `--color-text-muted`, `--letter-spacing-md`, uppercase
 * - Wide item: `aspect-ratio: 16/9`
 * - Standard item: `aspect-ratio: 4/3`
 *
 * ## Usage
 * Used inside case study pages to display sets of research artifacts, wireframes,
 * and process documentation. Typically 3-6 images. Always the first item `wide: true`
 * to anchor the most important image.
 */
const meta: Meta<typeof GalleryGrid> = {
  title: 'Templates/GalleryGrid',
  tags: ['autodocs'],
  component: GalleryGrid,
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of GalleryItem objects. Each item: { src?: string, alt?: string, wide?: boolean }. First item is typically wide: true.',
    },
  },
}

export default meta
type Story = StoryObj<typeof GalleryGrid>

export const Placeholders: Story = {
  args: {
    items: [
      { wide: true },
      { wide: false },
      { wide: false },
      { wide: false },
    ],
  },
}

export const AllStandard: Story = {
  name: 'All Standard Width',
  args: {
    items: [
      { wide: false },
      { wide: false },
      { wide: false },
    ],
  },
}
