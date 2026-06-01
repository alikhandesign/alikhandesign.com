import type { Meta, StoryObj } from '@storybook/react'
import SideNav from './SideNav'

const meta: Meta<typeof SideNav> = {
  title: 'Navigation/SideNavigation',
  component: SideNav,
  tags: ['autodocs'],
  argTypes: {
    sections: { control: 'object' },
  },
}

export default meta
type Story = StoryObj<typeof SideNav>

export const Default: Story = {
  args: {
    sections: ['overview', 'research', 'design', 'outcomes', 'reflections'],
    unlocked: true,
  },
}
