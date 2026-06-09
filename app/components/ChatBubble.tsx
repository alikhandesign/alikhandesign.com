interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: role === 'user' ? 'flex-end' : 'flex-start',
    }}>
      <div style={{
        maxWidth: '72%',
        padding: '0.75rem 1rem',
        borderRadius: role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        fontSize: 'var(--text-base)',
        lineHeight: 1.7,
        background: role === 'user' ? 'var(--text)' : 'var(--surface)',
        color: role === 'user' ? 'var(--bg)' : 'var(--text)',
        border: role === 'assistant' ? '1px solid var(--border)' : 'none',
        whiteSpace: 'pre-wrap',
      }}>
        {content}
      </div>
    </div>
  )
}
