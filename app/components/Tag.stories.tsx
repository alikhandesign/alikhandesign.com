import type { Meta, StoryObj } from '@storybook/react'
import Tag from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Tag/Tag',
  component: Tag,
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['default', 'accent'] },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: { label: 'UX Research', variant: 'default' },
}

export const Accent: Story = {
  args: { label: 'Case Study', variant: 'accent' },
}
