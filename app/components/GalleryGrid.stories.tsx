import type { Meta, StoryObj } from '@storybook/react'
import GalleryGrid from './GalleryGrid'

/**
 * GalleryGrid displays a collection of case study images in a responsive
 * 3-column grid. The first item can span two columns using the `wide` prop,
 * creating a visual anchor for the most important image in the set.
 *
 * On mobile, all items collapse to a single column regardless of the `wide` setting.
 */
const meta: Meta<typeof GalleryGrid> = {
  title: 'Grids/GalleryGrid',
  tags: ['autodocs'],
  component: GalleryGrid,
  argTypes: {
    items: { control: 'object', description: 'Array of image items. Each item can have src, alt, and an optional wide boolean.' },
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

export const WithImages: Story = {
  args: {
    items: [
      { src: '/images/ali.jpg', alt: 'Research artifact', wide: true },
      { src: '/images/ali.jpg', alt: 'Wireframe' },
      { src: '/images/ali.jpg', alt: 'Final design' },
    ],
  },
}
