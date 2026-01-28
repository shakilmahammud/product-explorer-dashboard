interface SearchInputProps {
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void
  placeholder?: string
  readOnly?: boolean
}

export function SearchInput({
  value = '',
  onChange,
  onFocus,
  placeholder = 'Search products...',
  readOnly = false,
}: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={onFocus}
      readOnly={readOnly}
      placeholder={placeholder}
      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  )
}
