import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-6 items-center">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Products
            </Link>
            <Link 
              to="/products/categories" 
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Categories
            </Link>
            <Link 
              to="/products/search" 
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Search
            </Link>
            <Link 
              to="/settings" 
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Settings
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default App
