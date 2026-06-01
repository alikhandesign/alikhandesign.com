import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from './ButtonLink'

const meta: Meta<typeof ButtonLink> = {
  title: 'Button/ButtonLink',
  component: ButtonLink,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    variant: { control: 'select', options: ['text', 'primary'] },
  },
}

export default meta
type Story = StoryObj<typeof ButtonLink>

export const Text: Story = {
  args: { label: 'Read case study', href: '#', variant: 'text' },
}

export const Primary: Story = {
  args: { label: 'View My Work', href: '#', variant: 'primary' },
}
