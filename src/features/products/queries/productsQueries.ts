import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { type SearchParams, type ProductsResponse } from '../types/productTypes'

export const useInfiniteProducts = (enabled: boolean = true, category: string | null = null) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products', 'infinite', category],
    queryFn: ({ pageParam = 0 }) => {
      return productService.getProducts({ 
        category: category || undefined, 
        limit: 20, 
        skip: pageParam as number
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit
      return nextSkip < lastPage.total ? nextSkip : undefined
    },
    enabled
  })
}

export const useSearchProducts = (params: SearchParams) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'search', params],
    queryFn: () => productService.getProducts(params),
    staleTime: 1000 * 60, 
  })
}
