import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex-shrink-0">
            <NavLink to="/products" className="text-2xl font-bold text-[#22B573]">
              Product Explorer 
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

          <div className="hidden md:block flex-1 max-w-md mx-8"></div>

          {/* Desktop Settings & Mobile Menu Button */}
          <div className="flex items-center gap-4">
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

            {/* Mobile Menu Button */}
            <button
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
        <div className="md:hidden">
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
