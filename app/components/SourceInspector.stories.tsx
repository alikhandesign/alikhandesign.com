import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import SourceInspector from './SourceInspector'
import type { SiteSource } from '@/lib/sources'

const MOCK_SOURCES: SiteSource[] = [
  {
    id: 1,
    title: 'AI Patterns/Response/SourceInspector',
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
  name: 'Single source',
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

// No source selected — all cards in inactive state, detail panel empty
export const NoneSelected: Story = {
  name: 'None selected',
  render: () => {
    const [activeId, setActiveId] = useState<number | null>(null)
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
  },
}

// Desktop overlay context — fixed-width panel beside a simulated chat bubble.
// Matches the production layout where SourceInspector renders as a right-side
// overlay without reflowing the message thread.
export const DesktopOverlayContext: Story = {
  name: 'Desktop overlay context',
  parameters: {
    docs: {
      description: {
        story: 'Simulates the desktop layout: SourceInspector renders as an overlay panel to the right of the chat thread. The message thread does not reflow when the panel opens.',
      },
    },
  },
  render: () => {
    const [activeId, setActiveId] = useState<number | null>(1)
    return (
      <div style={{
        display: 'flex', gap: 0, maxWidth: 800,
        fontFamily: 'var(--font-sans)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        minHeight: 320,
      }}>
        {/* Simulated chat thread */}
        <div style={{
          flex: 1, padding: 'var(--space-4)',
          background: 'var(--color-bg)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
        }}>
          <p style={{
            margin: 0, color: 'var(--color-text-muted)',
            letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '11px',
          }}>
            Message thread (does not reflow)
          </p>
          <div style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-3)',
            fontSize: 'var(--font-size-sm)',
            lineHeight: 1.6,
            color: 'var(--color-text)',
          }}>
            The AI Feedback &amp; Insights Agent{' '}
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--color-accent)', color: '#fff',
              borderRadius: 10, fontSize: 10, fontWeight: 600,
              width: 16, height: 16, lineHeight: 1, cursor: 'pointer',
            }}>1</span>{' '}
            was built using Copilot Studio integrated with Qualtrics and Dataverse.{' '}
            The enrollment redesign{' '}
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--color-accent)', color: '#fff',
              borderRadius: 10, fontSize: 10, fontWeight: 600,
              width: 16, height: 16, lineHeight: 1, cursor: 'pointer',
            }}>2</span>{' '}
            reduced time-to-convert by 45%.
          </div>
        </div>

        {/* SourceInspector panel */}
        <div style={{ width: 260, flexShrink: 0, borderLeft: '1px solid var(--color-border)' }}>
          <SourceInspector
            sources={MOCK_SOURCES.slice(0, 2)}
            activeId={activeId}
            onClose={() => setActiveId(null)}
            onSelect={setActiveId}
          />
        </div>
      </div>
    )
  },
}

