import { create } from 'zustand'
import { type ProductsUIState } from '../types/productsUI.types'


export const useProductsUIStore = create<ProductsUIState>((set) => ({
  selectedCategory: null,
  sortOrder: 'asc',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortOrder: (order) => set({ sortOrder: order }),
}))

