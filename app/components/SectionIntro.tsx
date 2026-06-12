interface SectionIntroProps {
  label: string
  heading: string
}

export default function SectionIntro({ label, heading }: SectionIntroProps) {
  return (
    <>
      <p className="section-label">{label}</p>
      <h2 className="font-serif" style={{
        fontSize: 'var(--font-size-base)',
        fontWeight: 400,
        lineHeight: 1.2,
        marginBottom: '1.25rem',
      }}>
        {heading}
      </h2>
    </>
  )
}
