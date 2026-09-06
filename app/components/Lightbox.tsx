'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface LightboxImage {
  src: string
  alt: string
  caption?: string
  focus?: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  onClose: () => void
}

const DRAG_THRESHOLD = 5
const CLICK_ZOOM = 2.5
const MAX_ZOOM = 4

function clampPan(x: number, y: number, zoom: number, width: number, height: number) {
  if (zoom <= 1) return { x: 0, y: 0 }
  return {
    x: Math.min(0, Math.max(width * (1 - zoom), x)),
    y: Math.min(0, Math.max(height * (1 - zoom), y)),
  }
}

function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex)
  const [loaded, setLoaded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const zoomRef = useRef(1)
  const panRef = useRef({ x: 0, y: 0 })
  const pointerRef = useRef({
    id: null as number | null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    moved: false,
  })
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  zoomRef.current = zoom
  panRef.current = pan

  const resetZoom = useCallback(() => {
    zoomRef.current = 1
    panRef.current = { x: 0, y: 0 }
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const zoomAt = useCallback((clientX: number, clientY: number, nextZoom: number) => {
    const frame = frameRef.current
    if (!frame || nextZoom <= 1) {
      resetZoom()
      return
    }
    const z = zoomRef.current
    const rect = frame.getBoundingClientRect()
    const cx = clientX - rect.left
    const cy = clientY - rect.top
    const factor = nextZoom / z
    const nextPan = clampPan(
      cx - (cx - panRef.current.x) * factor,
      cy - (cy - panRef.current.y) * factor,
      nextZoom,
      frame.offsetWidth,
      frame.offsetHeight,
    )
    zoomRef.current = nextZoom
    panRef.current = nextPan
    setZoom(nextZoom)
    setPan(nextPan)
  }, [resetZoom])

  const prev = useCallback(() => {
    setLoaded(false)
    resetZoom()
    setCurrent(i => (i - 1 + images.length) % images.length)
  }, [images.length, resetZoom])

  const next = useCallback(() => {
    setLoaded(false)
    resetZoom()
    setCurrent(i => (i + 1) % images.length)
  }, [images.length, resetZoom])

  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.stopPropagation()
    e.preventDefault()
    const nextZoom = Math.min(MAX_ZOOM, Math.max(1, zoomRef.current - e.deltaY * 0.0015))
    zoomAt(e.clientX, e.clientY, nextZoom)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    if (e.button !== 0) return
    e.stopPropagation()
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // Synthetic events (tests) may not support capture
    }
    pointerRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      moved: false,
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
    if (pointerRef.current.id !== e.pointerId) return
    const dx = e.clientX - pointerRef.current.lastX
    const dy = e.clientY - pointerRef.current.lastY
    pointerRef.current.lastX = e.clientX
    pointerRef.current.lastY = e.clientY
    const dist = Math.hypot(
      e.clientX - pointerRef.current.startX,
      e.clientY - pointerRef.current.startY,
    )
    if (dist > DRAG_THRESHOLD) pointerRef.current.moved = true
    if (zoomRef.current <= 1 || !pointerRef.current.moved) return
    e.preventDefault()
    setDragging(true)
    const frame = frameRef.current
    const nextPan = clampPan(
      panRef.current.x + dx,
      panRef.current.y + dy,
      zoomRef.current,
      frame?.offsetWidth ?? 0,
      frame?.offsetHeight ?? 0,
    )
    panRef.current = nextPan
    setPan(nextPan)
  }

  const endPointer = (e: React.PointerEvent<HTMLImageElement>) => {
    if (pointerRef.current.id !== e.pointerId) return
    const moved = pointerRef.current.moved
    pointerRef.current.id = null
    setDragging(false)
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    if (e.type === 'pointercancel') return
    if (moved && zoomRef.current > 1) return
    if (zoomRef.current > 1) resetZoom()
    else zoomAt(e.clientX, e.clientY, CLICK_ZOOM)
  }

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handle)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handle)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (zoom > 1) return
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev()
    }
  }

  const img = images[current]

  return (
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(28, 28, 26, 0.95)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        style={{
          position: 'absolute', top: '1.25rem', right: '1.25rem',
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
          color: '#FAF8F5', borderRadius: '50%',
          width: 40, height: 40, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, lineHeight: 1, zIndex: 10,
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >✕</button>

      {/* Counter — only shown when multiple images */}
      {images.length > 1 && (
        <p style={{
          position: 'absolute', top: '1.5rem', left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 14, color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif',
        }}>
          {current + 1} of {images.length}
        </p>
      )}

      {/* Prev arrow — desktop only */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev() }}
          aria-label="Previous image"
          className="lb-arrow lb-arrow-left"
          style={{
            position: 'absolute', left: '1.25rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: '#FAF8F5', borderRadius: '50%',
            width: 44, height: 44, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >‹</button>
      )}

      {/* Image container */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '90vw', maxHeight: '75vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '1rem',
          paddingBottom: images.length > 1 ? '3.5rem' : 0,
        }}
      >
        <div
          ref={frameRef}
          style={{ position: 'relative', maxWidth: '100%', maxHeight: '70vh' }}
        >
          {!loaded && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#FAF8F5', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            </div>
          )}
          <img
            src={img.src}
            alt={img.alt}
            draggable={false}
            onLoad={() => setLoaded(true)}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endPointer}
            onPointerCancel={endPointer}
            style={{
              maxWidth: '90vw', maxHeight: '68vh',
              objectFit: 'contain',
              borderRadius: 4,
              display: 'block',
              opacity: loaded ? 1 : 0,
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: '0 0',
              transition: dragging ? 'opacity 0.3s' : 'opacity 0.3s, transform 0.2s ease',
              cursor: zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'zoom-in',
              touchAction: 'none',
              userSelect: 'none',
            }}
          />
        </div>
        {img.caption && (
          <p style={{
            fontSize: 14, color: 'rgba(255,255,255,0.65)',
            textAlign: 'center', maxWidth: 600,
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'italic', lineHeight: 1.5,
          }}>{img.caption}</p>
        )}
      </div>

      {/* Next arrow — desktop only */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); next() }}
          aria-label="Next image"
          className="lb-arrow lb-arrow-right"
          style={{
            position: 'absolute', right: '1.25rem', top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: '#FAF8F5', borderRadius: '50%',
            width: 44, height: 44, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >›</button>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div style={{
          position: 'absolute', bottom: '1rem',
          display: 'flex', gap: '0.25rem',
          alignItems: 'center',
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setLoaded(false); resetZoom(); setCurrent(i) }}
              aria-label={`Go to image ${i + 1}`}
              style={{
                /* Invisible tap target — minimum 44px tall for touch */
                minWidth: 24, minHeight: 44,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 6px',
                background: 'none', border: 'none', cursor: 'pointer',
              }}
            >
              <span style={{
                display: 'block',
                width: i === current ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === current ? '#89181A' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.2s',
                pointerEvents: 'none',
              }} />
            </button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .lb-arrow { display: none !important; }
        }
      `}</style>
    </div>
  )
}

// ─── ProjectImage ────────────────────────────────────────
// Drop-in replacement for inline images within case studies
interface ProjectImageProps {
  src: string
  alt: string
  caption?: string
  allImages?: LightboxImage[]
  imageIndex?: number
}

export function ProjectImage({ src, alt, caption, allImages, imageIndex = 0 }: ProjectImageProps) {
  const [open, setOpen] = useState(false)
  const images = allImages || [{ src, alt, caption }]

  return (
    <>
      <div
        className="cs-image-wrap"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`View full size: ${alt}`}
        onKeyDown={e => e.key === 'Enter' && setOpen(true)}
        style={{ cursor: 'zoom-in', margin: '2rem 0' }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            borderRadius: 4,
            display: 'block',
            transition: 'filter 0.3s, brightness 0.3s',
          }}

        />
        {caption && (
          <p style={{
            fontSize: 12, color: 'var(--color-text-muted)',
            marginTop: '0.75rem', fontStyle: 'italic',
            textAlign: 'center', lineHeight: 1.5,
          }}>{caption}</p>
        )}
      </div>

      {open && (
        <Lightbox
          images={images}
          initialIndex={imageIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}

// ─── GalleryGrid ───────────────────────────────────────────
// For project page galleries
interface GalleryGridProps {
  images: LightboxImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const open = (i: number) => { setActiveIndex(i); setLightboxOpen(true) }

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <div
            key={i}
            className={images.length === 1 ? 'gallery-grid-item-full' : i === 0 ? 'gallery-grid-item-wide' : ''}
            onClick={() => open(i)}
            role="button"
            tabIndex={0}
            aria-label={`View full size: ${img.alt}`}
            onKeyDown={e => e.key === 'Enter' && open(i)}
            style={{ cursor: 'zoom-in' }}
          >
            <div style={{
              width: '100%',
              aspectRatio: i === 0 ? '16/9' : '4/3',
              background: 'var(--color-border)',
              borderRadius: 4,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {img.src ? (
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: img.focus || 'center',
                    transition: 'filter 0.3s, brightness 0.3s',
                    display: 'block',
                  }}

                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, color: 'var(--color-text-muted)',
                  letterSpacing: '0.05em', textTransform: 'uppercase',
                }}>{img.alt}</div>
              )}
            </div>
            {img.caption && (
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: '0.75rem', fontStyle: 'italic' }}>
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={activeIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
