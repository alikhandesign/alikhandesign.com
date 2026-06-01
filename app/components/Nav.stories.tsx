import type { Meta, StoryObj } from '@storybook/react'
import Nav from './Nav'

const meta: Meta<typeof Nav> = {
  title: 'Navigation/HeaderNavigation',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Nav>

export const Default: Story = {}

export const WorkActive: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: '/work' },
    },
  },
}

export const AboutActive: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: '/about' },
    },
  },
}
