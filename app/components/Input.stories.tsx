import type { Meta, StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    error: { control: 'boolean' },
    value: { control: 'text' },
  },
  parameters: { backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Password',
    error: false,
    onChange: () => {},
  },
}

export const Focus: Story = {
  args: {
    value: '',
    placeholder: 'Password',
    error: false,
    onChange: () => {},
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Error: Story = {
  args: {
    value: 'wrongpassword',
    placeholder: 'Password',
    error: true,
    onChange: () => {},
  },
}
