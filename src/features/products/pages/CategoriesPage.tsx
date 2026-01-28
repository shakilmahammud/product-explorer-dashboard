import { Link } from 'react-router-dom'
import { useCategories } from '../queries/productsQueries'
import { LoadingSpinner, ErrorState, EmptyState } from '../../../shared/components/DataDisplay'

export function CategoriesPage() {
  const { data: categories, isLoading, isError } = useCategories()

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center h-screen gap-2">
        <LoadingSpinner size="lg" color="#22B573" />
        <span className="text-sm text-gray-500">Loading categories...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto my-12">
        <ErrorState 
          title="Failed to load categories"
          message="We encountered an error while fetching the category list. Please try again."
          onRetry={() => window.location.reload()}
          retryLabel="Retry"
        />
      </div>
    )
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="max-w-2xl mx-auto my-12">
        <EmptyState 
          title="No categories found"
          message="We couldn't find any product categories at the moment."
        />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
          Categories
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Browse {categories?.length || 0} product categories
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <Link
            key={category.slug}
            to={`/products?category=${category.slug}`}
            className="group flex flex-col items-start p-6 bg-white border border-gray-100 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-sm transition-all duration-200"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize group-hover:text-[#22B573] transition-colors">
              {category.name}
            </h3>
            <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-[#22B573] transition-colors">
              View products 
              <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
