interface DataTableProps {
  columns: string[]
  rows: string[][]
  columnWidths?: string[]
  marginBottom?: boolean
}

export default function DataTable({ columns, rows, columnWidths, marginBottom = true }: DataTableProps) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: marginBottom ? '1.5rem' : 0 }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 'var(--font-size-sm)',
      }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th
                key={col}
                style={{
                  textAlign: 'left',
                  padding: '0.6rem 1rem 0.6rem 0',
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  fontWeight: 500,
                  width: columnWidths?.[i] ?? 'auto',
                  paddingRight: i === columns.length - 1 ? 0 : '1rem',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: '0.6rem 0',
                    paddingRight: j === row.length - 1 ? 0 : '1rem',
                    borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
                    color: j === 0 ? 'var(--color-text)' : 'var(--color-text-muted)',
                    verticalAlign: 'top',
                    lineHeight: 1.7,
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
