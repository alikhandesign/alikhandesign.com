interface ProjectImageProps {
  src?: string
  alt?: string
  caption?: string
}

export default function ProjectImage({ src, alt = '', caption }: ProjectImageProps) {
  return (
    <figure style={{ margin: 0 }}>
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', borderRadius: 'var(--radius-sm)', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: 320, background: 'var(--color-border)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          Image
        </div>
      )}
      {caption && (
        <figcaption style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '0.75rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
