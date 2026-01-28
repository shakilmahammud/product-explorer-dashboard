import { useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProductsUIStore } from '../store/productsUI.store'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const query = searchParams.get('q') || ''
  const urlCategory = searchParams.get('category')
  const urlSortBy = (searchParams.get('sortBy') as 'title' | 'price' | 'rating') || null
  const urlSortOrder = (searchParams.get('order') as 'asc' | 'desc') || 'asc'
  
  const {
    setSelectedCategory,
    setSortBy,
    setSortOrder,
    setSearchQuery,
  } = useProductsUIStore()

  // Sync URL to Store on Mount/Update
  useEffect(() => {
    const state = useProductsUIStore.getState()
    
    if (state.selectedCategory !== urlCategory) setSelectedCategory(urlCategory)
    if (state.sortBy !== urlSortBy) setSortBy(urlSortBy)
    if (state.sortOrder !== urlSortOrder) setSortOrder(urlSortOrder)
    if (state.searchQuery !== query) setSearchQuery(query)
    
  }, [urlCategory, urlSortBy, urlSortOrder, query, setSelectedCategory, setSortBy, setSortOrder, setSearchQuery])

  const handleSearch = useCallback((newQuery: string) => {
    setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        if (newQuery) {
            params.set('q', newQuery)
            params.delete('category')
        } else {
            params.delete('q')
        }
        return params
    }, { replace: true })
  }, [setSearchParams])

  const handleSortChange = useCallback((newSortBy: string | null, newOrder: 'asc' | 'desc') => {
    setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        if (newSortBy) {
            params.set('sortBy', newSortBy)
            params.set('order', newOrder)
        } else {
            params.delete('sortBy')
            params.delete('order')
        }
        return params
    }, { replace: true })
  }, [setSearchParams])

  const handleCategoryChange = useCallback((category: string | null) => {
    setSearchParams((prev) => {
        const params = new URLSearchParams(prev)
        if (category) {
            params.set('category', category)
            params.delete('q')
        } else {
            params.delete('category')
        }
        return params
    }, { replace: true })
  }, [setSearchParams])

  const clearFilters = useCallback(() => {
     setSearchParams({})
  }, [setSearchParams])

  return {
    filters: {
        query,
        category: urlCategory,
        sortBy: urlSortBy,
        sortOrder: urlSortOrder
    },
    handlers: {
        handleSearch,
        handleSortChange,
        handleCategoryChange,
        clearFilters
    },
    isSearchActive: !!query
  }
}
