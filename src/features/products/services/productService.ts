import { fetchApi } from '../../../api/client'
import { type Product, type ProductsResponse, type SearchParams, type Category } from '../types/productTypes'
import { buildProductUrl } from '../utils/buildApiSearchQuery'

export const productService = {
  async getProducts(params: SearchParams): Promise<ProductsResponse> {
    return fetchApi<ProductsResponse>(buildProductUrl(params))
  },

  async getProductById(id: string | number): Promise<Product> {
    return fetchApi<Product>(`/products/${id}`)
  },

  async getCategories(): Promise<Category[]> {
    return fetchApi<Category[]>('/products/categories')
  },
}
