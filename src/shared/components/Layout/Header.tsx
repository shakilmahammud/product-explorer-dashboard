import { useState, useMemo, useEffect, useRef } from 'react'
import { NavLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { debounce } from '../../utils/debounce'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [searchValue, setSearchValue] = useState(initialQuery)

  const isSearchPage = location.pathname.includes('/products/search')

  useEffect(() => {
    const query = searchParams.get('q') || ''
    setSearchValue(query)
  }, [searchParams])

  useEffect(() => {
    if (isSearchPage) {
        setIsMobileSearchOpen(true)
    }
  }, [isSearchPage])

  useOnClickOutside(searchRef, () => {
    if (!isSearchPage && isMobileSearchOpen) {
      setIsMobileSearchOpen(false)
    }
  })

  useOnClickOutside(menuRef, (event) => {
    if (isMobileMenuOpen && menuButtonRef.current && !menuButtonRef.current.contains(event.target as Node)) {
      setIsMobileMenuOpen(false)
    }
  })

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        if (query.trim()) {
          navigate(`/products/search?q=${encodeURIComponent(query)}`)
        }
      }, 500),
    [navigate]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    debouncedSearch(value)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between gap-4 md:gap-0 h-16">
          
          <div className={`${isMobileSearchOpen ? 'hidden md:block' : 'flex-shrink-0'} md:flex-shrink-0`}>
            <NavLink to="/products" className="text-2xl font-bold text-[#22B573]">
              PED
            </NavLink>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/products"
              end
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#22B573]'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/products/categories"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#22B573]'
                    : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Categories
            </NavLink>
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
             <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#22B573] focus:border-[#22B573] sm:text-sm transition-shadow duration-200"
                  placeholder="Search products..."
                />
                {searchValue && (
                  <button
                    onClick={() => {
                        setSearchValue('')
                        navigate('/products')
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
             </div>
          </div>

          {/* Settings & Mobile Actions */}
          <div className={`flex items-center gap-2 sm:gap-4 ${isMobileSearchOpen ? 'flex-1 md:flex-initial' : ''}`}>
            <div className="hidden md:block">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#22B573]'
                      : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                Settings
              </NavLink>
            </div>

            {/* Mobile Expandable Search */}
            <div 
                ref={searchRef}
                className={`md:hidden flex items-center transition-all duration-300 ease-in-out bg-white ${
                    isMobileSearchOpen 
                        ? 'flex-1 ml-2' 
                        : 'w-auto'
            }`}>
               <button 
                 onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                 className={`flex-shrink-0 text-gray-400 hover:text-gray-600 focus:outline-none ${!isMobileSearchOpen ? '' : 'mr-2'}`}
               >
                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                 </svg>
               </button>
               
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleSearchChange}
                    className={`bg-transparent border-none focus:ring-1 focus:ring-[#22B573] rounded-md caret-[#22B573] text-sm text-gray-700 px-2 placeholder-gray-400 h-9 transition-all duration-200 ${
                    isMobileSearchOpen ? 'flex-1 opacity-100 cursor-text' : 'w-0 opacity-0 cursor-default p-0'
                    }`}
                    placeholder="Search..."
                    autoFocus={isMobileSearchOpen}
                />
               
               {isMobileSearchOpen && searchValue && (
                   <button
                    onClick={() => {
                        setSearchValue('')
                        debouncedSearch('')
                    }}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500"
                   >
                     <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
               )}
            </div>

            {/* Mobile Menu Button  */}
            <button
              ref={menuButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#22B573]"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden" ref={menuRef}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100 shadow-lg">
            <NavLink
              to="/products"
              end
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-[#22B573] bg-[#22B573]/10'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/products/categories"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-[#22B573] bg-[#22B573]/10'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'text-[#22B573] bg-[#22B573]/10'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              Settings
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
