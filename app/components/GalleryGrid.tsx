interface GalleryItem {
  src?: string
  alt?: string
  wide?: boolean
}

interface GalleryGridProps {
  items: GalleryItem[]
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="gallery-grid">
      {items.map((item, i) => (
        <div key={i} className={item.wide ? 'gallery-grid-item-wide' : undefined}>
          {item.src ? (
            <img src={item.src} alt={item.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)', display: 'block' }} />
          ) : (
            <div style={{ width: '100%', aspectRatio: item.wide ? '16/9' : '4/3', background: 'var(--color-border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
              Image
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
