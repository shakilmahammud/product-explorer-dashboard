import { useInfiniteQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'

export function useInfiniteProducts(enabled = true, category?: string | null) {
  return useInfiniteQuery({
    queryKey: ['products', category],
    queryFn: ({ pageParam = 0 }) => 
      category 
        ? productService.fetchProductsByCategory(category, 20, pageParam)
        : productService.fetchProducts(20, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.flatMap(p => p.products).length
      return loadedCount < lastPage.total ? loadedCount : undefined
    },
    initialPageParam: 0,
    enabled,
  })
}

export function useSearchProducts(searchQuery: string) {
  return useInfiniteQuery({
    queryKey: ['products', 'search', searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      productService.searchProducts({ query: searchQuery, limit: 20, skip: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.flatMap(p => p.products).length
      return loadedCount < lastPage.total ? loadedCount : undefined
    },
    initialPageParam: 0,
    enabled: searchQuery.length > 0,
  })
}
