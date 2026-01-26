export interface ProductsUIState {
  selectedCategory: string | null
  sortOrder: 'asc' | 'desc'
  setSelectedCategory: (category: string | null) => void
  setSortOrder: (order: 'asc' | 'desc') => void
}
