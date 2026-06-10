interface CaseStudyImageProps {
  src?: string
  alt?: string
  caption?: string
}

export default function CaseStudyImage({ src, alt = '', caption }: CaseStudyImageProps) {
  return (
    <figure style={{ margin: 0 }}>
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', borderRadius: 'var(--radius)', display: 'block' }} />
      ) : (
        <div style={{ width: '100%', height: 320, background: 'var(--color-border)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>
          Image
        </div>
      )}
      {caption && (
        <figcaption style={{ fontSize: 12, color: 'var(--color-text-muted)', fontStyle: 'italic', textAlign: 'center', marginTop: '0.5rem' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
