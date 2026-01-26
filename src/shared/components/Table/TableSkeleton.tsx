interface TableSkeletonProps {
  columnsCount: number
  rowsCount?: number
}

export function TableSkeleton({ 
  columnsCount, 
  rowsCount = 5 
}: TableSkeletonProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {Array.from({ length: columnsCount }).map((_, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left border-b"
              >
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {Array.from({ length: rowsCount }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columnsCount }).map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
