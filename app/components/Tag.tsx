interface TagProps {
  label: string
  variant?: 'default' | 'accent'
}

export default function Tag({ label, variant = 'default' }: TagProps) {
  if (variant === 'accent') {
    return <span className="tag-cs">{label}</span>
  }
  return <span className="tag">{label}</span>
}
