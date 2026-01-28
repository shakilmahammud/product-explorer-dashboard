import { fetchApi } from '../../../api/client'
import { type ProductsResponse, type SearchParams, type Category } from '../types/productTypes'
import { buildProductUrl } from '../utils/buildApiSearchQuery'

export const productService = {
  async getProducts(params: SearchParams): Promise<ProductsResponse> {
    return fetchApi<ProductsResponse>(buildProductUrl(params))
  },

  async getCategories(): Promise<Category[]> {
    return fetchApi<Category[]>('/products/categories')
  },
}
