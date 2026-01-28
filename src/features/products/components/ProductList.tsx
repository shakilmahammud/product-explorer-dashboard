import { useMemo, type RefObject } from 'react'
import { Table, TableSkeleton } from '../../../shared/components/Table'
import { EmptyState, ErrorState, LoadingSpinner } from '../../../shared/components/DataDisplay'
import { getProductColumns } from '../utils'
import type { Product } from '../types/productTypes'

interface ProductListProps {
  products: Product[]
  isLoading: boolean
  isError: boolean
  error: unknown
  isFetchingNextPage: boolean
  onRetry: () => void
  sentinelRef?: RefObject<HTMLDivElement | null>
  pagination?: React.ReactNode
  emptyStateTitle?: string
  emptyStateMessage?: string
  emptyStateAction?: React.ReactNode
  hideTable?: boolean
}

export function ProductList({
  products,
  isLoading,
  isError,
  error,
  isFetchingNextPage,
  onRetry,
  sentinelRef,
  pagination,
  emptyStateTitle = "No products found",
  emptyStateMessage = "No products available.",
  emptyStateAction,
  hideTable = false
}: ProductListProps) {
  
  const columns = useMemo(() => getProductColumns(), [])

  return (
    <div className="space-y-6">
      {isLoading && (
        <TableSkeleton columnsCount={7} rowsCount={10} />
      )}

      {isError && (
        <ErrorState 
          message={error instanceof Error ? error.message : 'Failed to load products. Please check your internet connection and try again.'}
          onRetry={onRetry}
        />
      )}

      {!isLoading && !isError && (
        <>
          {!hideTable && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <Table 
                  data={products} 
                  columns={columns} 
                  rowKey={(product) => product.id.toString()} 
                />
              </div>
            </div>
          )}

          {(products.length === 0 || hideTable) && (
            <EmptyState 
              title={emptyStateTitle}
              message={emptyStateMessage}
              action={emptyStateAction}
            />
          )}
        </>
      )}

      {isFetchingNextPage && (
        <div className="flex justify-center items-center py-4 gap-2">
          <LoadingSpinner size="md" className="text-blue-600" />
          <span className="text-sm text-gray-500">Loading more products...</span>
        </div>
      )}

      {pagination && (
        <div className="mt-6 flex justify-center">
          {pagination}
        </div>
      )}

      {sentinelRef && <div ref={sentinelRef} className="h-10" />}
    </div>
  )
}
