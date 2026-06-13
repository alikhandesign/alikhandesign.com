'use client'

const MOMENTS = [
  { num: 1, title: 'The Intake', slug: 'intake', desc: 'Redesigning how Squarespace gathers intent' },
  { num: 2, title: 'The Transparent Builder', slug: 'builder', desc: 'Making AI reasoning visible and overridable' },
  { num: 3, title: 'The Context Layer', slug: 'context-layer', desc: 'Building persistent memory from user behavior' },
]

const BASE = '/work/squarespace-redesign/moments'

interface MomentNavProps {
  current: 1 | 2 | 3
  view: 'before' | 'after'
  onViewChange: (v: 'before' | 'after') => void
}

export default function MomentNav({ current, view, onViewChange }: MomentNavProps) {
  const SQ = {
    black: '#0e0e0e', white: '#ffffff',
    graySubtle: '#e7e7e7', grayMid: '#878787',
  }

  const prev = MOMENTS.find(m => m.num === current - 1)
  const next = MOMENTS.find(m => m.num === current + 1)
  const currentMoment = MOMENTS.find(m => m.num === current)!

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: SQ.white,
      borderBottom: `1px solid ${SQ.graySubtle}`,
      fontFamily: "'Helvetica Neue', Arial, sans-serif",
    }}>
      {/* Top bar — breadcrumb + before/after + return */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 40px',
        borderBottom: `1px solid ${SQ.graySubtle}`,
      }}>
        {/* Back to moments */}
        <a href={BASE} style={{
          fontSize: 12, color: SQ.grayMid, textDecoration: 'none',
          letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          ← All moments
        </a>

        {/* Before / After toggle */}
        <div style={{ display: 'flex', border: `1px solid ${SQ.graySubtle}` }}>
          <button
            onClick={() => onViewChange('before')}
            style={{
              padding: '6px 14px', fontSize: 11, fontWeight: 500,
              letterSpacing: '2px', textTransform: 'uppercase' as const,
              background: view === 'before' ? SQ.black : 'transparent',
              color: view === 'before' ? SQ.white : SQ.grayMid,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            Current Squarespace
          </button>
          <button
            onClick={() => onViewChange('after')}
            style={{
              padding: '6px 14px', fontSize: 11, fontWeight: 500,
              letterSpacing: '2px', textTransform: 'uppercase' as const,
              background: view === 'after' ? SQ.black : 'transparent',
              color: view === 'after' ? SQ.white : SQ.grayMid,
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
            }}
          >
            Redesign
          </button>
        </div>

        {/* Return to portfolio */}
        <a href="/work/squarespace-redesign" style={{
          fontSize: 12, color: SQ.grayMid, textDecoration: 'none',
          letterSpacing: '0.05em',
        }}>
          Return to case study →
        </a>
      </div>

      {/* Bottom bar — moment title + prev/next */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 40px',
      }}>
        {/* Prev */}
        <div style={{ width: 200 }}>
          {prev && (
            <a href={`${BASE}/${prev.slug}`} style={{
              fontSize: 12, color: SQ.grayMid, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              ← {prev.title}
            </a>
          )}
        </div>

        {/* Current moment */}
        <div style={{ textAlign: 'center' as const }}>
          <p style={{
            fontSize: 10, color: SQ.grayMid, letterSpacing: '0.12em',
            textTransform: 'uppercase' as const, fontWeight: 600, marginBottom: 2,
          }}>
            Moment {current} of 3
          </p>
          <p style={{ fontSize: 13, fontWeight: 500, color: SQ.black }}>
            {currentMoment.title}
          </p>
          <p style={{ fontSize: 11, color: SQ.grayMid, marginTop: 1 }}>
            {currentMoment.desc}
          </p>
        </div>

        {/* Next */}
        <div style={{ width: 200, textAlign: 'right' as const }}>
          {next && (
            <a href={`${BASE}/${next.slug}`} style={{
              fontSize: 12, color: SQ.grayMid, textDecoration: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6,
            }}>
              {next.title} →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
