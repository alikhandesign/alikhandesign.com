export default function FadeOut({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 35%, var(--color-bg) 92%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
