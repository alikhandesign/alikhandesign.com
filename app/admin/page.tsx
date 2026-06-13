'use client'

import { useState, useEffect, useRef } from 'react'
import { workItems, WorkItem } from '../work.config'

interface WorkRow extends WorkItem {
  visible: boolean
}

const TYPE_LABEL: Record<string, string> = {
  'case-study': 'Case Study',
  'project': 'Project',
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [rows, setRows] = useState<WorkRow[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saveMsg, setSaveMsg] = useState('')
  const [dirty, setDirty] = useState(false)
  const dragIndex = useRef<number | null>(null)
  const dragOverIndex = useRef<number | null>(null)

  const fetchConfig = async (pw: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/admin/work?password=${encodeURIComponent(pw)}`)
      if (res.status === 401) { setError('Incorrect password.'); return }
      if (!res.ok) throw new Error()
      const data = await res.json()

      // Merge KV data with config fallback
      const kvOrder: string[] | null = data.order
      const kvConfig: Record<string, { visible: boolean }> | null = data.config

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
      setAuthed(true)
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

      const res = await fetch(`/api/admin/work?password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order, config }),
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

  if (!authed) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
        <div style={{ width: 320 }}>
          <p className="section-label" style={{ marginBottom: 'var(--space-2)' }}>Admin</p>
          <h1 className="font-serif" style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 400, marginBottom: 'var(--space-6)' }}>Work manager</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchConfig(password)}
            style={{
              width: '100%', padding: '0.625rem 0.875rem',
              fontSize: 'var(--font-size-sm)', fontFamily: 'var(--font-sans)',
              border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
              background: 'var(--color-surface)', color: 'var(--color-text)',
              marginBottom: 'var(--space-3)', outline: 'none',
            }}
          />
          {error && <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-accent)', marginBottom: 'var(--space-3)' }}>{error}</p>}
          <button
            onClick={() => fetchConfig(password)}
            disabled={loading || !password}
            style={{
              width: '100%', padding: '0.625rem',
              fontSize: 'var(--font-size-sm)', fontWeight: 500,
              background: 'var(--color-text)', color: 'var(--color-bg)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              cursor: loading ? 'wait' : 'pointer', fontFamily: 'var(--font-sans)',
            }}
          >
            {loading ? 'Loading…' : 'Sign in'}
          </button>
        </div>
      </main>
    )
  }

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
          Drag to reorder. Toggle to show or hide from the work index. Changes take effect immediately after saving.
        </p>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {rows.map((row, index) => (
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
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'grab',
                opacity: row.visible ? 1 : 0.45,
                transition: 'opacity 0.15s',
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
          ))}
        </div>

        {/* Footer nav */}
        <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-6)' }}>
          <a href="/admin/logs" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            Chat logs →
          </a>
          <a href="/" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            Back to site →
          </a>
        </div>

      </div>
    </main>
  )
}
