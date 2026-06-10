import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import TabNavigation from './TabNavigation'

const meta: Meta<typeof TabNavigation> = {
  title: 'Core Components/Navigation/Tab',
  component: TabNavigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tab navigation component with two variants. The `top` variant renders a horizontal tab bar with a bottom-border active indicator — used in the AI Pattern Library shell. The `side` variant renders a vertical list with a left-border active indicator, matching the SideNav visual language used in case study pages. Both variants have three states: default, hover, and active.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TabNavigation>

const TABS = [
  { id: 'definition', label: 'Pattern definition' },
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
]

export const Top: Story = {
  render: () => {
    const [active, setActive] = useState('definition')
    return (
      <div style={{ background: 'var(--bg)', padding: '0 0 2rem' }}>
        <TabNavigation tabs={TABS} activeTab={active} onTabChange={setActive} variant="top" />
        <div style={{ padding: '1.5rem 3rem', fontSize: 14, color: 'var(--text-muted)' }}>
          Active: {active}
        </div>
      </div>
    )
  }
}

export const Side: Story = {
  render: () => {
    const [active, setActive] = useState('definition')
    return (
      <div style={{ background: 'var(--bg)', padding: '1.5rem', maxWidth: 200 }}>
        <TabNavigation tabs={TABS} activeTab={active} onTabChange={setActive} variant="side" />
      </div>
    )
  }
}
