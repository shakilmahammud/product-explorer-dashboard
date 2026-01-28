export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
  sku: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface SearchParams {
  query?: string
  category?: string
  sortBy?: SortOption
  limit?: number
  skip?: number
}

export type SortOption = 
  | 'title-desc' 
  | 'price-asc' 
  | 'price-desc'

export interface Category {
  slug: string
  name: string
  url: string
}
