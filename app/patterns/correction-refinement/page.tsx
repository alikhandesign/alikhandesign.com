'use client'
import { useState } from 'react'
import PatternShell from '../PatternShell'

const TABS = [
  { id: 'demo', label: 'Interactive demo' },
  { id: 'states', label: 'All states' },
  { id: 'definition', label: 'Pattern definition' },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState('demo')
  return (
    <PatternShell
      title="Correction & Refinement"
      category="Pattern 5"
      problem="Vague corrections trigger blind regeneration. No product prompts for clarification before rewriting."
      activeTab={activeTab}
      onTabChange={setActiveTab}
      tabs={TABS}
    >
      <div style={{ padding: 'var(--space-8)', border: '1px dashed var(--border)', borderRadius: 'var(--radius)', textAlign: 'center', color: 'var(--text-faint)' }}>
        <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>Interactive demo in progress</p>
        <p style={{ fontSize: 'var(--text-xs)' }}>Pattern definition, states, and interactions coming next.</p>
      </div>
    </PatternShell>
  )
}
