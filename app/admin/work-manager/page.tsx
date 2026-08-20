'use client'

import { useState, useEffect, useRef } from 'react'
import { workItems, WorkItem } from '../../work.config'

interface WorkRow extends WorkItem {
  visible: boolean
}

const TYPE_LABEL: Record<string, string> = {
  'case-study': 'Case Study',
  'project': 'Project',
}

const DEFAULT_FEATURED = ['people-first', 'ai-agent']

export default function WorkManagerPage() {
  const [rows, setRows] = useState<WorkRow[]>([])
  const [featured, setFeatured] = useState<string[]>(DEFAULT_FEATURED)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saveMsg, setSaveMsg] = useState('')
  const [dirty, setDirty] = useState(false)
  const dragIndex = useRef<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/work')
      if (!res.ok) throw new Error()
      const data = await res.json()

      // Merge KV data with config fallback
      const kvOrder: string[] | null = data.order
      const kvConfig: Record<string, { visible: boolean }> | null = data.config
      const kvFeatured: string[] | null = data.featured

      const orderedSlugs = kvOrder ?? workItems.map(i => i.slug)
      const merged: WorkRow[] = orderedSlugs
        .map(slug => workItems.find(i => i.slug === slug))
        .filter((i): i is WorkItem => !!i)
        .map(item => ({
          ...item,
          visible: kvConfig?.[item.slug]?.visible ?? true,
        }))

      // Add any items in config not in KV order yet
      workItems.forEach(item => {
        if (!merged.find(r => r.slug === item.slug)) {
          merged.push({ ...item, visible: true })
        }
      })

      setRows(merged)
      setFeatured(kvFeatured && kvFeatured.length > 0 ? kvFeatured : DEFAULT_FEATURED)
    } catch {
      setError('Failed to load. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const save = async () => {
    setSaving(true)
    setSaveMsg('')
    try {
      const order = rows.map(r => r.slug)
      const config: Record<string, { visible: boolean }> = {}
      rows.forEach(r => { config[r.slug] = { visible: r.visible } })

      const res = await fetch('/api/admin/work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order, config, featured }),
      })
      if (!res.ok) throw new Error()
      setSaveMsg('Saved.')
      setDirty(false)
      setTimeout(() => setSaveMsg(''), 3000)
    } catch {
      setSaveMsg('Failed to save. Try again.')
    } finally {
      setSaving(false)
    }
  }

  const toggleVisible = (slug: string) => {
    setRows(prev => prev.map(r => r.slug === slug ? { ...r, visible: !r.visible } : r))
    setDirty(true)
    setSaveMsg('')
  }

  const toggleFeatured = (slug: string) => {
    setFeatured(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug)
      if (prev.length >= 2) return prev
      return [...prev, slug]
    })
    setDirty(true)
    setSaveMsg('')
  }

  const onDragStart = (index: number) => { dragIndex.current = index }
  const onDragEnter = (index: number) => { dragOverIndex.current = index }
  const onDragEnd = () => {
    const from = dragIndex.current
    const to = dragOverIndex.current
    if (from === null || to === null || from === to) return
    const next = [...rows]
    const [moved] = next.splice(from, 1)
    next.splice(to, 0, moved)
    setRows(next)
    setDirty(true)
    setSaveMsg('')
    dragIndex.current = null
    dragOverIndex.current = null
  }

  if (loading) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Loading…</p>
      </main>
    )
  }

  if (error) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-accent)' }}>{error}</p>
      </main>
    )
  }

  const featuredCount = featured.length
  const atLimit = featuredCount >= 2

  return (
    <main style={{ minHeight: '100vh', background: 'var(--color-bg)', padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
          <div>
            <p className="section-label" style={{ marginBottom: 'var(--space-2)' }}>Admin</p>
            <h1 className="font-serif" style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 400, lineHeight: 1.1 }}>Work manager</h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            {saveMsg && (
              <p style={{ fontSize: 'var(--font-size-xs)', color: saveMsg.includes('Failed') ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                {saveMsg}
              </p>
            )}
            <button
              onClick={save}
              disabled={saving || !dirty}
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: 'var(--font-size-sm)', fontWeight: 500,
                background: dirty ? 'var(--color-text)' : 'var(--color-border)',
                color: dirty ? 'var(--color-bg)' : 'var(--color-text-muted)',
                border: 'none', borderRadius: 'var(--radius-sm)',
                cursor: dirty ? 'pointer' : 'default',
                fontFamily: 'var(--font-sans)',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>

        {/* Instructions */}
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
          Drag to reorder. Toggle visibility to show or hide from the work index. Flag up to 2 items as Featured to surface them on the home page. Changes take effect immediately after saving.
        </p>

        {/* Featured count indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
          fontSize: 'var(--font-size-xs)', color: atLimit ? 'var(--color-accent)' : 'var(--color-text-muted)',
        }}>
          <span style={{
            display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
            background: atLimit ? 'var(--color-accent)' : 'var(--color-border-mid)',
            flexShrink: 0,
          }} />
          {featuredCount === 0 && 'No featured items selected'}
          {featuredCount === 1 && '1 of 2 featured slots used'}
          {featuredCount === 2 && '2 of 2 featured slots used — deselect one to change'}
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {rows.map((row, index) => {
            const isFeatured = featured.includes(row.slug)
            const featuredDisabled = atLimit && !isFeatured

            return (
              <div
                key={row.slug}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragEnter={() => onDragEnter(index)}
                onDragEnd={onDragEnd}
                onDragOver={e => e.preventDefault()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                  padding: '0.875rem 1rem',
                  background: 'var(--color-surface)',
                  border: `1px solid ${isFeatured ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'grab',
                  opacity: row.visible ? 1 : 0.45,
                  transition: 'opacity 0.15s, border-color 0.15s',
                }}
              >
                {/* Drag handle */}
                <span style={{ color: 'var(--color-border-mid)', fontSize: 16, userSelect: 'none', flexShrink: 0 }}>⠿</span>

                {/* Position */}
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-faint)', width: 20, textAlign: 'right', flexShrink: 0 }}>
                  {index + 1}
                </span>

                {/* Title + meta */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.title}
                  </p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    {TYPE_LABEL[row.type]} · /work/{row.slug}
                  </p>
                </div>

                {/* Featured toggle */}
                <button
                  onClick={() => toggleFeatured(row.slug)}
                  disabled={featuredDisabled}
                  title={featuredDisabled ? '2 items already featured — deselect one first' : undefined}
                  style={{
                    padding: '0.25rem 0.75rem',
                    fontSize: 'var(--font-size-xs)', fontWeight: 500,
                    background: isFeatured ? 'var(--color-accent)' : 'transparent',
                    color: isFeatured ? 'var(--color-bg)' : featuredDisabled ? 'var(--color-text-faint)' : 'var(--color-text-muted)',
                    border: `1px solid ${isFeatured ? 'var(--color-accent)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    cursor: featuredDisabled ? 'not-allowed' : 'pointer',
                    flexShrink: 0,
                    fontFamily: 'var(--font-sans)',
                    transition: 'all 0.15s',
                    opacity: featuredDisabled ? 0.4 : 1,
                  }}
                >
                  {isFeatured ? '★ Featured' : '☆ Feature'}
                </button>

                {/* Visible toggle */}
                <button
                  onClick={() => toggleVisible(row.slug)}
                  style={{
                    padding: '0.25rem 0.75rem',
                    fontSize: 'var(--font-size-xs)', fontWeight: 500,
                    background: row.visible ? 'var(--color-accent-bg)' : 'transparent',
                    color: row.visible ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    border: `1px solid ${row.visible ? 'var(--color-accent-bg)' : 'var(--color-border)'}`,
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer', flexShrink: 0,
                    fontFamily: 'var(--font-sans)',
                    transition: 'all 0.15s',
                  }}
                >
                  {row.visible ? 'Visible' : 'Hidden'}
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-6)' }}>
          <a href="/admin" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            ← Admin home
          </a>
          <a href="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            Back to site →
          </a>
        </div>

      </div>
    </main>
  )
}
