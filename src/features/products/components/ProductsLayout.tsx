import { type RefObject } from 'react'
import { SearchBar, SortDropdown, CategoryFilter, ProductList } from '../components'
import type { Product, Category } from '../types/productTypes'

interface ProductsLayoutProps {
  products: Product[]
  filters: {
    query: string
    category: string | null
    sortBy: 'title' | 'price' | 'rating' | null
    sortOrder: 'asc' | 'desc'
  }
  handlers: {
    handleSearch: (val: string) => void
    handleSortChange: (sortBy: string | null, order: 'asc' | 'desc') => void
    handleCategoryChange: (cat: string | null) => void
    clearFilters: () => void
  }
  status: {
    isLoading: boolean
    isError: boolean
    error: unknown
    isFetchingNextPage: boolean
  }
  actions: {
    refetch: () => void
  }
  sentinelRef?: RefObject<HTMLDivElement | null>
  isSearchActive: boolean
  title?: string
  showSearch?: boolean
  showSort?: boolean
  showCategoryFilter?: boolean
  pagination?: React.ReactNode
  emptyStateTitle?: string
  emptyStateMessage?: string
  hideStats?: boolean
  hideTable?: boolean
  hideAction?: boolean
  availableCategories?: Category[]
}

export function ProductsLayout({
  products,
  filters,
  handlers,
  status,
  actions,
  sentinelRef,
  isSearchActive,
  title = "Products",
  showSearch = true,
  showSort = true,
  showCategoryFilter = true,
  pagination,
  emptyStateTitle,
  emptyStateMessage,
  hideStats,
  hideTable,
  hideAction,
  availableCategories
}: ProductsLayoutProps) {
  
  const { isLoading, isError, error, isFetchingNextPage } = status

  const _emptyStateMessage = isSearchActive 
    ? `We couldn't find any products matching "${filters.query}". Try adjusting your search or filters.` 
    : "No products available in this category."

  const emptyStateAction = (
    <button 
      onClick={handlers.clearFilters}
      className="text-sm font-medium text-[#22B573] hover:text-green-700"
    >
      Clear all filters
    </button>
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {title}
        </h1>
        {!hideStats && (
          <p className="text-sm text-gray-500 mt-1">
            {isSearchActive 
              ? `Found ${products.length} results for "${filters.query}"`
              : filters.category 
                ? `Showing ${products.length} products in ${filters.category}`
                : `Showing ${products.length} products`
            }
          </p>
        )}
      </div>

      {(showSearch || showSort || showCategoryFilter) && (
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {showSearch && (
            <div className="w-full sm:flex-1 min-w-[200px]">
              <SearchBar 
                value={filters.query}
                onSearch={handlers.handleSearch}
                placeholder="Search products..."
              />
            </div>
          )}
          
          {(showSort || showCategoryFilter) && (
            <div className="flex items-center gap-4 w-full sm:w-auto flex-shrink-0 ml-auto">
              {showSort && (
                <div className="w-1/2 sm:w-auto">
                  <SortDropdown
                    sortBy={filters.sortBy}
                    sortOrder={filters.sortOrder}
                    onSortChange={handlers.handleSortChange}
                  />
                </div>
              )}
              {showCategoryFilter && (
                <div className="w-1/2 sm:w-auto">
                  <CategoryFilter 
                    selectedCategory={filters.category}
                    onCategorySelect={handlers.handleCategoryChange}
                    availableCategories={availableCategories}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <ProductList 
        products={products}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isFetchingNextPage={isFetchingNextPage}
        onRetry={actions.refetch}
        sentinelRef={sentinelRef}
        pagination={pagination}
        emptyStateTitle={emptyStateTitle || "No products found"}
        emptyStateMessage={emptyStateMessage || _emptyStateMessage}
        emptyStateAction={(!hideAction && (isSearchActive || filters.category)) ? emptyStateAction : undefined}
        hideTable={hideTable}
      />
    </div>
  )
}
