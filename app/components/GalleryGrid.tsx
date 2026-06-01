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
            <img src={item.src} alt={item.alt || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius)', display: 'block' }} />
          ) : (
            <div style={{ width: '100%', aspectRatio: item.wide ? '16/9' : '4/3', background: 'var(--border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
              Image
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
