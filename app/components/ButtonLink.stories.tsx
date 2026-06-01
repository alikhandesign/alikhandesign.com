import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from './ButtonLink'

const meta: Meta<typeof ButtonLink> = {
  title: 'Button/ButtonLink',
  tags: ['autodocs'],
  component: ButtonLink,
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    variant: { control: 'select', options: ['normal', 'underline'] },
  },
}

export default meta
type Story = StoryObj<typeof ButtonLink>

export const Normal: Story = {
  args: { label: 'Read case study', href: '#', variant: 'normal' },
}

export const Underline: Story = {
  args: { label: 'Read my full story', href: '#', variant: 'underline' },
  parameters: { backgrounds: { default: 'dark' } },
}
