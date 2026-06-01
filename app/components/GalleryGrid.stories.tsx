import type { Meta, StoryObj } from '@storybook/react'
import GalleryGrid from './GalleryGrid'

const meta: Meta<typeof GalleryGrid> = {
  title: 'Grids/GalleryGrid',
  component: GalleryGrid,
  tags: ['autodocs'],
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
      { src: '/images/ali.jpg', alt: 'Image 1', wide: true },
      { src: '/images/ali.jpg', alt: 'Image 2' },
      { src: '/images/ali.jpg', alt: 'Image 3' },
    ],
  },
}
