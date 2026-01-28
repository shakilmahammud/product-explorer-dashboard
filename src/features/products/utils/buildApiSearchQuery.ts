import { type SearchParams } from '../types/productTypes'

export const buildProductUrl = (params: SearchParams): string => {
  const { query, category, limit = 20, skip = 0, sortBy, order } = params
  
  const queryParams = new URLSearchParams()
  queryParams.set('limit', limit.toString())
  queryParams.set('skip', skip.toString())

  if (query && query.trim()) {
    queryParams.set('q', query)
    if (sortBy && order) {
       queryParams.set('sortBy', sortBy)
       queryParams.set('order', order)
    }
    return `/products/search?${queryParams.toString()}`
  }

  if (category) {
    if (sortBy && order) {
       queryParams.set('sortBy', sortBy)
       queryParams.set('order', order)
    }
    return `/products/category/${category}?${queryParams.toString()}`
  }

  if (sortBy && order) {
    queryParams.set('sortBy', sortBy)
    queryParams.set('order', order)
  }
  
  return `/products?${queryParams.toString()}`
}
