import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ProjectImage } from './Lightbox'

/**
 * Lightbox renders a full-screen overlay for viewing case study images at full
 * resolution. It is not consumed directly — use `ProjectImage` (single image
 * with zoom-in trigger) or `GalleryGrid` (multi-image grid) instead.
 *
 * ## Behavior
 * - **Single image**: click to zoom. Counter and dot indicators are hidden —
 *   there is nothing to navigate to.
 * - **Multi-image**: dot indicators appear at the bottom. Each dot has a 44px
 *   tall touch target for mobile. The active dot expands to a 20px pill. Left/right
 *   arrow buttons appear on desktop and are hidden on mobile via media query.
 *   Swipe left/right navigates on touch devices **only when the image is not
 *   zoomed**.
 * - Keyboard: `Escape` closes, `ArrowLeft`/`ArrowRight` navigates.
 * - Clicking the backdrop closes the lightbox; clicking the image does not.
 * - **Zoom and pan**: click the image to zoom in at that point (2.5×). Scroll
 *   wheel zooms toward the cursor (1×–4×). Once zoomed, the cursor is a grab
 *   hand — click-drag pans. A click without dragging (under 5px) zooms back
 *   out. Pan is clamped so the image cannot be dragged entirely off-screen.
 *   On touch, one-finger drag pans when zoomed; swipe-to-navigate stays 1× only.
 *
 * ## Design rationale
 * Lightbox in a case study is for zooming, not browsing. Case study images
 * serve different narrative purposes at different points in the story — cycling
 * through them out of order removes that context. Each `ProjectImage` therefore
 * shows only itself in the lightbox. Multi-image cycling is reserved for
 * `GalleryGrid` where images are explicitly presented as a set.
 *
 * ## Tokens used
 * - Backdrop: `rgba(28, 28, 26, 0.95)` (matches `--color-bg-dark` at near-full opacity)
 * - Active dot: `#89181A` (`--color-accent`)
 * - Inactive dot: `rgba(255,255,255,0.3)`
 * - Close/arrow fill: `rgba(28, 28, 26, 0.9)` with `0 1px 8px rgba(0,0,0,0.45)` shadow
 *   so cream icons stay readable on light zoomed images. Hover adds a 12% white overlay.
 * - Close/arrow border: `rgba(255,255,255,0.2)`
 * - Caption color: `rgba(255,255,255,0.65)`
 * - Counter color: `rgba(255,255,255,0.5)`
 *
 * ## Accessibility
 * - All interactive elements have `aria-label`
 * - Dot buttons announce `Go to image N`
 * - Body scroll is locked while the lightbox is open
 * - Focus management: the overlay traps visual attention but does not yet
 *   implement a full focus trap — a known gap for keyboard-only users
 *
 * ## Tap target sizing
 * Dot indicator buttons have a minimum height of 44px and minimum width of 24px,
 * satisfying WCAG 2.5.5 (Target Size). The visual dot (6px × 6px / 20px × 6px)
 * is rendered as an inner span so the tap zone is larger than the visible dot.
 */

const SAMPLE_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80',
    alt: 'Research synthesis map — affinity diagram with participant quotes grouped by theme',
    caption: 'Affinity map from 14 participant interviews. Three primary themes emerged: trust through transparency, recovery confidence, and enrollment timing anxiety.',
  },
  {
    src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80',
    alt: 'Wireframe explorations for the enrollment entry point — six layout variants',
    caption: 'Six layout explorations for the enrollment entry point. Variant D was selected for testing based on information hierarchy and scan path.',
  },
  {
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    alt: 'Final design — enrollment portal with identity-first flow',
    caption: 'Final design. Identity-first flow reduced time-to-convert by 45% in moderated usability testing.',
  },
]

const meta: Meta = {
  title: 'Templates/Overlays/Lightbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Full-screen image overlay. Consumed via `ProjectImage` (single image zoom trigger) or `GalleryGrid` (gallery grid trigger). Single images show no counter or dots. Multi-image sets show dot navigation with WCAG-compliant tap targets and keyboard/swipe support.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  name: 'Default — single image trigger',
  render: () => (
    <div style={{ maxWidth: 480, fontFamily: 'var(--font-sans)' }}>
      <ProjectImage
        src={SAMPLE_IMAGES[0].src}
        alt={SAMPLE_IMAGES[0].alt}
        caption={SAMPLE_IMAGES[0].caption}
      />
      <p style={{
        marginTop: '1rem', fontSize: 13,
        color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)',
      }}>
        Click the image to open the lightbox. No counter or dots — single image zoom only.
      </p>
    </div>
  ),
}

export const MultiImage: Story = {
  name: 'Multi-image — dot navigation',
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div style={{ fontFamily: 'var(--font-sans)' }}>
        {!open && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 480 }}>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 13, margin: 0 }}>
              Lightbox closed. Dot indicators (bottom center) have 44px touch targets.
              Arrows visible on desktop, hidden on mobile.
            </p>
            <button
              onClick={() => setOpen(true)}
              style={{
                padding: '0.5rem 1rem', background: 'var(--color-accent)',
                color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', alignSelf: 'flex-start',
              }}
            >
              Reopen lightbox
            </button>
          </div>
        )}
        {open && (
          <ProjectImage
            src={SAMPLE_IMAGES[0].src}
            alt={SAMPLE_IMAGES[0].alt}
            caption={SAMPLE_IMAGES[0].caption}
            allImages={SAMPLE_IMAGES}
            imageIndex={0}
          />
        )}
      </div>
    )
  },
}
