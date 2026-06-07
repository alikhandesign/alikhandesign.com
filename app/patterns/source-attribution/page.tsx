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
      title="Source & Attribution"
      category="Pattern 3"
      problem="Citation behavior is inconsistent across all products. Inconsistent citation is a worse trust signal than no citation at all."
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
