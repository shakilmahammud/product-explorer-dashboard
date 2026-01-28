import { useMemo, useCallback, useEffect } from 'react'
import { useSearchProducts } from '../queries/productsQueries'
import { useProductsUIStore } from '../store/productsUI.store'
import { useSearchUrlState } from './useSearchUrlState'

export const useSearchPage = () => {
  const { state: urlState, updateParams, clearParams } = useSearchUrlState()

  const { setSelectedCategory } = useProductsUIStore()
  const { query, category, sortBy, sortOrder, page } = urlState

  useEffect(() => {
    setSelectedCategory(category)
  }, [category, setSelectedCategory])

  const isEmptyQuery = !query.trim()

  const { data, isLoading, isError, error, isFetching } = useSearchProducts({
    query: query || undefined,
    category: category || undefined,
    sortBy: sortBy || undefined,
    order: sortOrder || 'asc',
    limit: 20,
    skip: (page - 1) * 20
  })

  const availableCategories = useMemo(() => {
    if (!data?.products) return []
    const categories = new Set(data.products.map(p => p.category))
    return Array.from(categories).map(cat => ({
      slug: cat,
      name: cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      url: `/category/${cat}` 
    }))
  }, [data?.products])

  const products = data?.products || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / 20)

  const handlePageChange = useCallback((newPage: number) => {
    updateParams({ page: newPage.toString() })
  }, [updateParams])

  const handleSortChange = useCallback((newSortBy: string | null, newOrder: 'asc' | 'desc') => {
    updateParams({
      sortBy: newSortBy,
      order: newOrder,
      page: '1'
    })
  }, [updateParams])

  const handleCategoryChange = useCallback((newCategory: string | null) => {
    updateParams({
      category: newCategory,
      page: '1'
    })
  }, [updateParams])

  const clearFilters = useCallback(() => {
    clearParams()
    setSelectedCategory(null)
  }, [clearParams, setSelectedCategory])

  return {
    state: {
        query,
        category,
        sortBy,
        sortOrder,
        isEmptyQuery,
        products,
        availableCategories,
        isLoading: isEmptyQuery ? false : (isLoading || isFetching),
        isError,
        error,
        page,
        totalPages
    },
    handlers: {
        handlePageChange,
        handleSortChange,
        handleCategoryChange,
        clearFilters,
        refetch: () => {} 
    }
  }
}
