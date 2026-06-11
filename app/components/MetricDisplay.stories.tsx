import type { Meta, StoryObj } from '@storybook/react'
import MetricDisplay from './MetricDisplay'

const meta: Meta<typeof MetricDisplay> = {
  title: 'Core Components/MetricDisplay',
  component: MetricDisplay,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Large accent metric display used in case study headers to communicate impact at a glance. The value renders at `--text-4xl` (40px) in `--color-accent`. The optional label defaults to sentence case. Set `labelCase="upper"` for all-caps treatment with letter spacing. For outcome metrics within the body of a case study, use MetricCard instead.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof MetricDisplay>

export const SentenceCase: Story = {
  args: {
    value: '95%',
    label: 'Categorization accuracy',
    labelCase: 'sentence',
  },
}

export const UpperCase: Story = {
  args: {
    value: '95%',
    label: 'Categorization accuracy',
    labelCase: 'upper',
  },
}

export const NoLabel: Story = {
  args: {
    value: '45%',
  },
}

export const MultipleMetrics: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
      <MetricDisplay value="95%" label="Categorization accuracy" />
      <MetricDisplay value="8 hrs → 8 min" label="Synthesis time reduction" />
      <MetricDisplay value="45%" label="Faster time-to-convert" />
    </div>
  ),
}
