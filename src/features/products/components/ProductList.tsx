import { useState, useMemo, useRef, type RefObject } from 'react'
import { Table, TableSkeleton } from '../../../shared/components/Table'
import { EmptyState, ErrorState, LoadingSpinner } from '../../../shared/components/DataDisplay'
import { getProductColumns } from '../utils'
import { ProductInfoCard } from './ProductInfoCard'
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
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const closeTimeout = useRef<any>(null)

  const handleRowMouseEnter = (product: Product, e: React.MouseEvent) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setHoveredProduct(product)
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  const handleRowMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setHoveredProduct(null)
    }, 300)
  }

  const handleCardMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
  }

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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
              <div className="overflow-x-auto">
                <Table 
                  data={products} 
                  columns={columns} 
                  rowKey={(product) => product.id.toString()} 
                  onRowMouseEnter={handleRowMouseEnter}
                  onRowMouseLeave={handleRowMouseLeave}
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
          <LoadingSpinner size="md" className="text-[#22B573]" />
          <span className="text-sm text-gray-500">Loading more products...</span>
        </div>
      )}

      {pagination && (
        <div className="mt-6 flex justify-center">
          {pagination}
        </div>
      )}

      {sentinelRef && <div ref={sentinelRef} className="h-10" />}

      {hoveredProduct && (
        <div 
          className="hidden md:block fixed z-50 pointer-events-auto transition-opacity duration-200"
          style={{ 
            top: cursorPos.y + 15, 
            left: cursorPos.x + 15 
          }}
          onMouseEnter={handleCardMouseEnter}
          onMouseLeave={handleRowMouseLeave}
        >
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
             <div onClick={(e) => e.stopPropagation()}>
                <ProductInfoCard product={hoveredProduct} />
             </div>
          </div>
        </div>
      )}
    </div>
  )
}
