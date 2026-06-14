'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface LightboxImage {
  src: string
  alt: string
  caption?: string
}

interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  onClose: () => void
}

function Lightbox({ images, initialIndex = 0, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex)
  const [loaded, setLoaded] = useState(false)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const prev = useCallback(() => {
    setLoaded(false)
    setCurrent(i => (i - 1 + images.length) % images.length)
  }, [images.length])

  const next = useCallback(() => {
    setLoaded(false)
    setCurrent(i => (i + 1) % images.length)
  }, [images.length])

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
        <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '70vh' }}>
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
            onLoad={() => setLoaded(true)}
            style={{
              maxWidth: '90vw', maxHeight: '68vh',
              objectFit: 'contain',
              borderRadius: 4,
              display: 'block',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.3s',
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
              onClick={e => { e.stopPropagation(); setLoaded(false); setCurrent(i) }}
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
        style={{ cursor: 'zoom-in', marginBottom: '0.5rem' }}
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
            marginTop: '0.6rem', fontStyle: 'italic',
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
            className={i === 0 ? 'gallery-grid-item-wide' : ''}
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
              <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: '0.4rem', fontStyle: 'italic' }}>
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
