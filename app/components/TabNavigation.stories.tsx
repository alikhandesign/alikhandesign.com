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
        component: 'Tab navigation with two variants. The `top` variant renders a horizontal tab bar with a bottom-border active indicator — used in the AI Pattern Library shell. Active tab shows `--color-accent` border; hover shows `--color-border-mid`. The `side` variant renders a vertical list with a left-border indicator, matching the Side navigation visual language. Both variants have default, hover, and active states.',
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
      <div style={{ background: 'var(--color-bg)', padding: '0 0 2rem' }}>
        <TabNavigation tabs={TABS} activeTab={active} onTabChange={setActive} variant="top" />
        <div style={{ padding: '1.5rem 3rem', fontSize: 14, color: 'var(--color-text-muted)' }}>
          Active: {active}
        </div>
      </div>
    )
  },
}

export const Side: Story = {
  render: () => {
    const [active, setActive] = useState('definition')
    return (
      <div style={{ background: 'var(--color-bg)', padding: '1.5rem', maxWidth: 200 }}>
        <TabNavigation tabs={TABS} activeTab={active} onTabChange={setActive} variant="side" />
      </div>
    )
  },
}
