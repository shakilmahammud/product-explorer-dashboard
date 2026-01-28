import { create } from 'zustand'

interface ProductsUIState {
  // Filter state
  selectedCategory: string | null
  searchQuery: string
  
  // Sort state
  sortBy: 'title' | 'price' | 'rating' | null
  sortOrder: 'asc' | 'desc'
  
  // UI state
  isFiltersOpen: boolean
  
  // Actions
  setSelectedCategory: (category: string | null) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: 'title' | 'price' | 'rating' | null) => void
  setSortOrder: (order: 'asc' | 'desc') => void
  toggleFilters: () => void
  clearFilters: () => void
  resetSearch: () => void
}

export const useProductsUIStore = create<ProductsUIState>((set) => ({
  // Initial state
  selectedCategory: null,
  searchQuery: '',
  sortBy: null, // No default sort
  sortOrder: 'asc',
  isFiltersOpen: false,
  
  // Actions
  setSelectedCategory: (category) => set({ selectedCategory: category, searchQuery: '' }),
  setSearchQuery: (query) => set({ searchQuery: query, selectedCategory: null }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  toggleFilters: () => set((state) => ({ isFiltersOpen: !state.isFiltersOpen })),
  clearFilters: () => set({ selectedCategory: null }),
  resetSearch: () => set({ searchQuery: '' }),
}))
