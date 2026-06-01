import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Button/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    fullWidth: { control: 'boolean' },
    type: { control: 'select', options: ['button', 'submit'] },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { label: 'View My Work' },
}

export const FullWidth: Story = {
  args: { label: 'View Full Case Study', fullWidth: true },
}
