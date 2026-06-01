interface SectionLabelProps {
  label: string
  variant?: 'default' | 'dark'
}

export default function SectionLabel({ label, variant = 'default' }: SectionLabelProps) {
  return (
    <p className={variant === 'dark' ? 'eyebrow-dark' : 'eyebrow'}>
      {label}
    </p>
  )
}
