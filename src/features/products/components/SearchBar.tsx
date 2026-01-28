import { useState, type KeyboardEvent, useEffect, useRef, useMemo } from 'react'
import { debounce } from '../../../shared/utils/debounce'

interface SearchBarProps {
  value?: string
  onChange?: (value: string) => void
  onSearch: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
}

export function SearchBar({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search for products, categories, brands...',
  autoFocus = false,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedSearch = useMemo(
    () => debounce((val: string) => {
        onSearch(val)
    }, 500),
    [onSearch]
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  // Sync internal state if prop changes (Back button, external filter clear)
  // ONLY if input is NOT focused to avoid overwriting user typing
  useEffect(() => {
    if (value !== inputValue && document.activeElement !== inputRef.current) {
      setInputValue(value)
    }
  }, [value, inputValue]) // inputValue in dependency to satisfy hooks, though mainly value change triggers this

  const handleChange = (newValue: string) => {
    setInputValue(newValue)
    onChange?.(newValue)
    debouncedSearch(newValue)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      debouncedSearch.cancel() // Cancel pending debounce to avoid double fire
      onSearch(inputValue)
    }
  }

  const handleClear = () => {
    setInputValue('')
    debouncedSearch.cancel()
    onSearch('')
    inputRef.current?.focus()
  }

  return (
    <div className="relative flex-1">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22B573] focus:border-transparent"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  )
}
