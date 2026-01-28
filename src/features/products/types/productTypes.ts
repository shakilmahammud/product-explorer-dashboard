export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

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
  tags: string[]
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
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
  order?: 'asc' | 'desc'
}

export type SortOption = 
  | 'title'
  | 'price'
  | 'rating'
  | 'title-desc' 
  | 'price-asc' 
  | 'price-desc'


export interface Category {
  slug: string
  name: string
  url: string
}
