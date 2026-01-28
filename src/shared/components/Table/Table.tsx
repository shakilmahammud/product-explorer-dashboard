import type { ReactNode } from 'react'

export interface TableColumn<T> {
  header: string
  render: (row: T) => ReactNode
  className?: string
}

interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  rowKey: (row: T) => string | number
  onRowMouseEnter?: (row: T, event: React.MouseEvent) => void
  onRowMouseLeave?: (row: T, event: React.MouseEvent) => void
  onRowClick?: (row: T) => void
}

export function Table<T>({ data, columns, rowKey, onRowMouseEnter, onRowMouseLeave, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row) => (
            <tr 
              key={rowKey(row)} 
              className="hover:bg-gray-50 relative group cursor-pointer"
              onMouseEnter={(e) => onRowMouseEnter?.(row, e)}
              onMouseLeave={(e) => onRowMouseLeave?.(row, e)}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column, index) => (
                <td key={index} className={`px-6 py-4 text-sm text-gray-900 ${column.className || ''}`}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
