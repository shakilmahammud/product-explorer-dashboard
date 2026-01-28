import { useMemo } from 'react'
import { useInfiniteProducts } from '../queries/productsQueries'
import { useIntersectionObserver } from '../../../shared/hooks/useIntersectionObserver'
import { sortProducts } from '../utils/productSorting'

interface UseProductDataProps {
  category: string | null
  sortBy: 'title' | 'price' | 'rating' | null
  sortOrder: 'asc' | 'desc'
}

export function useProductData({
  category,
  sortBy,
  sortOrder
}: UseProductDataProps) {
  
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteProducts(true, category)

  const sentinelRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    enabled: Boolean(hasNextPage && !isFetchingNextPage),
  })

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.products) ?? [],
    [data]
  )
  
  const displayProducts = useMemo(() => {
    let result = products
    
    if (category) {
      result = result.filter(p => !p.category || p.category === category || p.category.toLowerCase() === category.toLowerCase())
    }
    
    const sortKey = `${sortBy}-${sortOrder}` as const
    return sortProducts(result, sortKey)
  }, [products, category, sortBy, sortOrder])

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
