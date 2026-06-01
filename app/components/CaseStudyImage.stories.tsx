import type { Meta, StoryObj } from '@storybook/react'
import CaseStudyImage from './CaseStudyImage'

const meta: Meta<typeof CaseStudyImage> = {
  title: 'Image/CaseStudyImage',
  component: CaseStudyImage,
  tags: ['autodocs'],
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    caption: { control: 'text' },
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
    alt: 'Ali Khan',
    caption: 'Figure 1 — Enrollment flow before redesign',
  },
}

export const NoCaption: Story = {
  args: {
    src: '/images/ali.jpg',
    alt: 'Ali Khan',
  },
}
