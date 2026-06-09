import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import SourceInspector from './SourceInspector'
import type { SiteSource } from '@/lib/sources'

const MOCK_SOURCES: SiteSource[] = [
  {
    id: 1,
    title: 'AI Feedback & Insights Agent',
    url: '/work/ai-insights-agent',
    description: 'Agentic AI research pipeline at WTW — automated qualitative synthesis, PHI/PII redaction, and daily stakeholder reporting. 95% accuracy, 8+ hours to minutes.',
  },
  {
    id: 2,
    title: 'People-First Enrollment Redesign',
    url: '/work/people-first-enrollment',
    description: 'Identity-first redesign of the Via Benefits Medicare enrollment entry point. 45% faster time-to-convert, 15% lift in enrollments, 50% reduction in rage clicks.',
  },
  {
    id: 7,
    title: 'AI Pattern Library',
    url: '/patterns',
    description: 'A documented library of interaction patterns for AI product interfaces — source attribution, epistemic transparency, generation states, and more.',
  },
]

const meta: Meta<typeof SourceInspector> = {
  title: 'Chat UI/SourceInspector',
  component: SourceInspector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Slides open below an assistant chat bubble when the user clicks a citation badge. Shows all sources cited in that message as selectable cards, with the active source\'s description and a direct link to the page. Closes via the × button or by clicking the active badge again.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SourceInspector>

// Interactive wrapper so the story responds to clicks
function InteractiveDemo() {
  const [activeId, setActiveId] = useState<number | null>(1)
  return (
    <div style={{ maxWidth: 520, fontFamily: 'var(--font-sans)' }}>
      <SourceInspector
        sources={MOCK_SOURCES}
        activeId={activeId}
        onClose={() => setActiveId(null)}
        onSelect={setActiveId}
      />
    </div>
  )
}

export const Default: Story = {
  render: () => <InteractiveDemo />,
}

export const SingleSource: Story = {
  render: () => {
    const [activeId, setActiveId] = useState<number | null>(1)
    return (
      <div style={{ maxWidth: 520, fontFamily: 'var(--font-sans)' }}>
        <SourceInspector
          sources={[MOCK_SOURCES[0]]}
          activeId={activeId}
          onClose={() => setActiveId(null)}
          onSelect={setActiveId}
        />
      </div>
    )
  },
}
