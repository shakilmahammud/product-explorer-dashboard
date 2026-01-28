import { useSearchParams } from 'react-router-dom'
import { useCallback, useMemo } from 'react'

export interface SearchUrlState {
  query: string
  page: number
  category: string | null
  sortBy: 'title' | 'price' | 'rating' | null
  sortOrder: 'asc' | 'desc'
}

export const useSearchUrlState = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''
  const pageParam = searchParams.get('page')
  const page = pageParam ? parseInt(pageParam, 10) : 1
  
  const sortByParam = searchParams.get('sortBy')
  const sortBy = (sortByParam === 'title' || sortByParam === 'price' || sortByParam === 'rating') 
    ? (sortByParam as 'title' | 'price' | 'rating')
    : null
    
  const orderParam = searchParams.get('order')
  const sortOrder = (orderParam === 'asc' || orderParam === 'desc') 
    ? (orderParam as 'asc' | 'desc')
    : 'asc'

  const category = searchParams.get('category')

  const state: SearchUrlState = useMemo(() => ({
    query,
    page,
    category,
    sortBy,
    sortOrder
  }), [query, page, category, sortBy, sortOrder])

  const updateParams = useCallback((newParams: Record<string, string | null>) => {
    setSearchParams(prev => {
        const nextParams = new URLSearchParams(prev)
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null) {
                nextParams.delete(key)
            } else {
                nextParams.set(key, value)
            }
        })
        return nextParams
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [setSearchParams])

  const clearParams = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  return {
    state,
    searchParams, 
    updateParams,
    clearParams
  }
}
