import { useMemo } from 'react'
import { useInfiniteProducts, useSearchProducts } from '../queries/productsQueries'
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver'
import { sortProducts } from '../utils/productSorting'

interface UseProductDataProps {
  isSearchActive: boolean
  query: string
  category: string | null
  sortBy: 'title' | 'price' | 'rating' | null
  sortOrder: 'asc' | 'desc'
}

export function useProductData({
  isSearchActive,
  query,
  category,
  sortBy,
  sortOrder
}: UseProductDataProps) {
  
  const allProductsQuery = useInfiniteProducts(!isSearchActive, category)
  const searchProductsQuery = useSearchProducts(query)
  
  const activeQuery = isSearchActive ? searchProductsQuery : allProductsQuery
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = activeQuery

  const sentinelRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  })

  // Derived State (Processing)
  const products = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data]
  )
  
  const displayProducts = useMemo(() => {
    let result = products
    
    // Client-side category filtering (supplemental to API if needed, or consistent with previous logic)
    if (!isSearchActive && category) {
      result = result.filter(p => !p.category || p.category === category || p.category.toLowerCase() === category.toLowerCase())
    }
    
    const sortKey = `${sortBy}-${sortOrder}` as const
    return sortProducts(result, sortKey)
  }, [products, isSearchActive, category, sortBy, sortOrder])

  return {
    displayProducts,
    totalProducts: products.length,
    status: {
        isLoading,
        isError,
        error,
        isFetchingNextPage,
    },
    pagination: {
        hasNextPage,
    },
    actions: {
        refetch
    },
    sentinelRef
  }
}
