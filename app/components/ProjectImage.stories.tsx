import type { Meta, StoryObj } from '@storybook/react'
import ProjectImage from './ProjectImage'

/**
 * ProjectImage is used inside case study and project pages to display research artifacts,
 * screenshots, and process documentation. It supports an optional caption for
 * labeling figures.
 *
 * ## Design rationale
 * When no `src` is provided, the component renders a warm fill placeholder using
 * `--color-border` (warm/100) rather than a grey box or broken image icon. This keeps
 * the palette consistent during content development and clearly signals that an
 * image slot exists without looking broken.
 *
 * ## Spacing
 * The component applies `margin: 2rem 0 2.5rem` on its outer `<figure>` element.
 * This ensures consistent breathing room above and below every image across all
 * case study pages — 2rem top (separates from preceding text or component),
 * 2.5rem bottom (separates caption from following text or component). Do not
 * add additional margin wrappers around `<ProjectImage>` in page files.
 *
 * ## Accessibility
 * Always provide descriptive `alt` text for images that communicate research
 * findings, flows, or process artifacts. The default is an empty string (`''`),
 * which is correct for purely decorative images but incorrect for content images.
 * For case study screenshots and diagrams, treat every image as a content image
 * and describe what it shows.
 *
 * ## Tokens used
 * - Outer margin: `2rem 0 2.5rem`
 * - Placeholder fill: `--color-border` (warm/100, #EDE9E4)
 * - Placeholder height: 320px fixed
 * - Placeholder text: `--font-size-xs`, `--color-text-muted`, `--letter-spacing-md`, uppercase
 * - Border radius: `--radius-sm` (4px)
 * - Caption: `--font-size-xs`, `--color-text-muted`, italic, centered
 * - Caption margin top: 0.75rem
 *
 * ## Usage
 * Used inside case study pages to display research artifacts, wireframes, and
 * process documentation. Typically appears inside a `.article-layout` content column.
 * The built-in margin means sequential images and surrounding Body text are
 * automatically spaced — no wrapper divs needed.
 */
const meta: Meta<typeof ProjectImage> = {
  title: 'Core Components/Content/ProjectImage',
  tags: ['autodocs'],
  component: ProjectImage,
  argTypes: {
    src: { control: 'text', description: 'Image source URL. If omitted, a warm placeholder is shown.' },
    alt: { control: 'text', description: 'Alt text for accessibility. Always provide descriptive alt for images that communicate research content. Leave empty only for purely decorative images.' },
    caption: { control: 'text', description: 'Optional figure caption displayed below the image in italic muted text.' },
  },
}

export default meta
type Story = StoryObj<typeof ProjectImage>

export const Placeholder: Story = {
  args: {
    caption: '',
  },
}

export const PlaceholderWithCaption: Story = {
  name: 'Placeholder with Caption',
  args: {
    caption: 'Figure 1 — Enrollment flow before redesign',
  },
}

export const WithCaption: Story = {
  args: {
    src: '/images/ali.jpg',
    alt: 'Research artifact showing enrollment flow',
    caption: 'Figure 1 — Enrollment flow before redesign',
  },
}

export const NoCaption: Story = {
  args: {
    src: '/images/ali.jpg',
    alt: 'Research artifact',
  },
}

export const SequentialImages: Story = {
  name: 'Sequential Images (spacing)',
  parameters: { docs: { source: { type: 'code' } } },
  render: () => (
    <div>
      <p style={{ fontSize: '1rem', marginBottom: 0 }}>
        Body text before the first image. The 2rem top margin on ProjectImage
        separates it from this paragraph.
      </p>
      <ProjectImage
        caption="First image — the 2.5rem bottom margin below the caption separates it from the next image."
      />
      <ProjectImage
        caption="Second image — same spacing applied automatically. No wrapper divs needed."
      />
      <p style={{ fontSize: '1rem' }}>
        Body text after the second image. The 2rem top margin on the figure
        above creates this gap automatically.
      </p>
    </div>
  ),
}
