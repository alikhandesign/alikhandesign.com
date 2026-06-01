import type { Meta, StoryObj } from '@storybook/react'
import SectionLabel from './SectionLabel'

const meta: Meta<typeof SectionLabel> = {
  title: 'Labels/SectionLabel',
  component: SectionLabel,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['default', 'dark'] },
  },
}

export default meta
type Story = StoryObj<typeof SectionLabel>

export const Default: Story = {
  args: { label: 'Featured Work', variant: 'default' },
}

export const Dark: Story = {
  args: { label: 'About Me', variant: 'dark' },
  parameters: { backgrounds: { default: 'dark' } },
}
