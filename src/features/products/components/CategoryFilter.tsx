import { useState, useRef, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { type Category } from '../types/productTypes'
import { useOnClickOutside } from '../../../shared/hooks/useOnClickOutside'

interface CategoryFilterProps {
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
}

export function CategoryFilter({ selectedCategory, onCategorySelect }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filterText, setFilterText] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
  })

  const filteredCategories = useMemo(() => {
    if (!filterText) return categories
    return categories.filter(c => 
      c.name.toLowerCase().includes(filterText.toLowerCase())
    )
  }, [categories, filterText])

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory) return 'Product Category'
    const match = categories.find(c => c.slug === selectedCategory)
    return match ? match.name : selectedCategory
  }, [selectedCategory, categories])

  const handleSelect = (slug: string | null) => {
    onCategorySelect(slug)
    setIsOpen(false)
    setFilterText('')
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCategorySelect(null)
    setIsOpen(false)
    setFilterText('')
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 min-w-[140px] sm:min-w-[200px] w-full justify-between transition-colors group"
      >
        <span className={`truncate pr-6 ${selectedCategory ? 'text-[#22B573] font-medium' : ''}`}>
          {selectedCategoryName}
        </span>
        
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <div className={`transition-opacity duration-200 ${selectedCategory ? 'opacity-100' : 'opacity-0'} absolute right-8`}>
             <span
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 rounded-full cursor-pointer text-gray-400 hover:text-gray-600 flex items-center justify-center"
              title="Clear category"
            >
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-2">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filter categories..."
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-[#22B573]"
            autoFocus
          />
          
          <div className="max-h-64 overflow-y-auto space-y-1">
            <button
              onClick={() => handleSelect(null)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors
                ${!selectedCategory ? 'bg-[#22B573]/10 text-[#22B573] font-medium' : 'text-gray-700'}
              `}
            >
              All Categories
            </button>

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => handleSelect(category.slug)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors
                    ${selectedCategory === category.slug ? 'bg-[#22B573]/10 text-[#22B573] font-medium' : 'text-gray-700'}
                  `}
                >
                  {category.name}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-400 text-center">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
