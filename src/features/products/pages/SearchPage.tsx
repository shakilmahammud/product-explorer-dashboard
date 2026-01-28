import { ProductsLayout } from '../components/ProductsLayout'
import { Pagination } from '../../../shared/components/Navigation/Pagination'
import { useSearchPage } from '../hooks/useSearchPage'

export function SearchPage() {
  const { state, handlers } = useSearchPage()
  const { 
    query, category, sortBy, sortOrder, 
    isEmptyQuery, products, isLoading, isError, error, 
    page, totalPages, availableCategories
  } = state

  return (
    <ProductsLayout
      title={isEmptyQuery ? "Search Products" : `Search Results for "${query}"`}
      products={products}
      filters={{ query, category, sortBy, sortOrder }}
      handlers={{
        handleSearch: () => {}, // Search input handles its own state/navigation
        handleSortChange: handlers.handleSortChange,
        handleCategoryChange: handlers.handleCategoryChange,
        clearFilters: handlers.clearFilters
      }}
      status={{
        isLoading,
        isError,
        error,
        isFetchingNextPage: false
      }}
      actions={{ refetch: handlers.refetch }}
      isSearchActive={true}
      showSearch={false}
      showCategoryFilter={!isEmptyQuery}
      showSort={!isEmptyQuery}
      pagination={
        !isEmptyQuery && (
          <Pagination 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlers.handlePageChange}
          />
        )
      }
      availableCategories={availableCategories}
      emptyStateTitle={isEmptyQuery ? "Ready to Search" : undefined}
      emptyStateMessage={isEmptyQuery ? "Enter a keyword in the search bar above to find products." : undefined}
      hideStats={isEmptyQuery}
      hideTable={isEmptyQuery}
      hideAction={isEmptyQuery}
    />
  )
}
