import { fetchApi } from '../../../api/client'
import { type ProductsResponse, type SearchParams, type Category } from '../types/productTypes'

export const productService = {
  async fetchProducts(limit = 20, skip = 0): Promise<ProductsResponse> {
    return fetchApi<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`)
  },

  async searchProducts({ query, limit = 20, skip = 0 }: SearchParams): Promise<ProductsResponse> {
    const q = query ? encodeURIComponent(query) : ''
    return fetchApi<ProductsResponse>(
      `/products/search?q=${q}&limit=${limit}&skip=${skip}`
    )
  },

  async fetchProductsByCategory(category: string, limit = 20, skip = 0): Promise<ProductsResponse> {
    return fetchApi<ProductsResponse>(
      `/products/category/${category}?limit=${limit}&skip=${skip}`
    )
  },

  async getCategories(): Promise<Category[]> {
    return fetchApi<Category[]>('/products/categories')
  },
}
