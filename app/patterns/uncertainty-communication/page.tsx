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
      title="Uncertainty Communication"
      category="Pattern 2"
      problem="No product differentiates a knowledge gap from a principled limit. Hedging language appears mid-response rather than before uncertain claims."
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
