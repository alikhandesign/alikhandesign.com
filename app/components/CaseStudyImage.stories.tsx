import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyImage from './CaseStudyImage'

/**
 * CaseStudyImage is used inside case study pages to display research artifacts,
 * screenshots, and process documentation. It supports an optional caption for
 * labeling figures.
 *
 * When no `src` is provided, a warm placeholder fills the image area — useful
 * during content development before final assets are ready.
 */
const meta: Meta<typeof CaseStudyImage> = {
  title: 'Image/CaseStudyImage',
  tags: ['autodocs'],
  component: CaseStudyImage,
  argTypes: {
    src: { control: 'text', description: 'Image source URL. If omitted, a placeholder is shown.' },
    alt: { control: 'text', description: 'Alt text for accessibility.' },
    caption: { control: 'text', description: 'Optional figure caption displayed below the image in italic muted text.' },
  },
}

export default meta
type Story = StoryObj<typeof CaseStudyImage>

export const Placeholder: Story = {
  args: {
    caption: 'Figure 1 — Enrollment flow before redesign',
  },
}

export const WithCaption: Story = {
  args: {
    src: '/images/ali.jpg',
    alt: 'Enrollment flow diagram',
    caption: 'Figure 1 — Enrollment flow before redesign',
  },
}

export const NoCaption: Story = {
  args: {
    src: '/images/ali.jpg',
    alt: 'Research artifact',
  },
}
