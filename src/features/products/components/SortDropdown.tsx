import { useState, useRef } from 'react'
import { useOnClickOutside } from '../../../shared/hooks/useOnClickOutside'

interface SortDropdownProps {
  sortBy: 'title' | 'price' | 'rating' | null
  sortOrder: 'asc' | 'desc'
  onSortChange: (sortBy: string | null, order: 'asc' | 'desc') => void
}

export function SortDropdown({ sortBy, sortOrder, onSortChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  const handleSelect = (newSortBy: string, newOrder: 'asc' | 'desc') => {
    onSortChange(newSortBy, newOrder)
    setIsOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSortChange(null, 'asc')
    setIsOpen(false)
  }

  const getLabel = () => {
    if (!sortBy) return 'Sort'
    switch (`${sortBy}-${sortOrder}`) {
      case 'title-asc': return 'Title (A-Z)'
      case 'title-desc': return 'Title (Z-A)'
      case 'price-asc': return 'Price (Low to High)'
      case 'price-desc': return 'Price (High to Low)'
      default: return 'Sort'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 min-w-[140px] sm:min-w-[200px] justify-between transition-colors w-full"
      >
        <span className={`truncate pr-6 ${sortBy ? 'text-[#22B573] font-medium' : ''}`}>
          {getLabel()}
        </span>
        <div className="flex items-center gap-1 shrink-0 ml-2">
            <div className={`transition-opacity duration-200 ${sortBy ? 'opacity-100' : 'opacity-0'} absolute right-8`}>
             <span
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 rounded-full cursor-pointer text-gray-400 hover:text-gray-600 flex items-center justify-center"
              title="Clear sort"
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
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-1">
          <div className="space-y-1">
            <button
              onClick={() => handleSelect('title', 'asc')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors
                ${sortBy === 'title' && sortOrder === 'asc' ? 'bg-[#22B573]/10 text-[#22B573] font-medium' : 'text-gray-700'}
              `}
            >
              Title (A-Z)
            </button>
            <button
              onClick={() => handleSelect('title', 'desc')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors
                ${sortBy === 'title' && sortOrder === 'desc' ? 'bg-[#22B573]/10 text-[#22B573] font-medium' : 'text-gray-700'}
              `}
            >
              Title (Z-A)
            </button>
            <button
              onClick={() => handleSelect('price', 'asc')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors
                ${sortBy === 'price' && sortOrder === 'asc' ? 'bg-[#22B573]/10 text-[#22B573] font-medium' : 'text-gray-700'}
              `}
            >
              Price (Low to High)
            </button>
            <button
              onClick={() => handleSelect('price', 'desc')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors
                ${sortBy === 'price' && sortOrder === 'desc' ? 'bg-[#22B573]/10 text-[#22B573] font-medium' : 'text-gray-700'}
              `}
            >
              Price (High to Low)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
