import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { type SearchParams, type ProductsResponse, type Product, type Category } from '../types/productTypes'

export const useInfiniteProducts = (enabled: boolean = true, category: string | null = null, query: string | null = null) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ['products', 'infinite', category, query],
    queryFn: ({ pageParam = 0 }) => {
      return productService.getProducts({ 
        category: category || undefined, 
        query: query || undefined,
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

export const useProductById = (id: string | undefined) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, 
  })
}
export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
    staleTime: 1000 * 60 * 5, 
  })
}
