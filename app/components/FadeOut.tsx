export default function FadeOut({ children, active = true }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div style={{ position: 'relative' }}>
      {children}
      {active && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 35%, var(--color-bg) 92%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
