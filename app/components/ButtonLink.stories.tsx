import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from './ButtonLink'

const meta: Meta<typeof ButtonLink> = {
  title: 'Button/ButtonLink',
  component: ButtonLink,
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ButtonLink>

export const Normal: Story = {
  args: { label: 'Read case study', href: '#' },
}
