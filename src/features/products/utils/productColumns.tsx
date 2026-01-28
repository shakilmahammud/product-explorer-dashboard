import { Link } from 'react-router-dom'
import { type TableColumn } from '../../../shared/components/Table'
import { type Product } from '../types/productTypes'

export function getProductColumns(formatPrice: (price: number) => string): TableColumn<Product>[] {
  return [
    {
      header: 'Product',
      render: (product) => (
        <div className="flex items-center">
          <Link to={`/products/${product.id}`} className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded hover:opacity-80 transition-opacity">
            <img
              src={product.thumbnail}
              alt={product.title}
              width="40"
              height="40"
              className="h-10 w-10 rounded object-cover"
              loading="lazy"
            />
          </Link>
          <div className="ml-4">
            <Link 
              to={`/products/${product.id}`}
              className="text-sm font-medium text-gray-900 truncate max-w-[12rem] sm:max-w-[16rem] hover:text-[#22B573] transition-colors"
              title={product.title}
            >
              {product.title}
            </Link>
            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Brand',
      className: 'hidden md:table-cell',
      render: (product) => (
        <span className="text-sm text-gray-900">
          {product.brand || '-'}
        </span>
      ),
    },
    {
      header: 'Category',
      className: 'hidden md:table-cell',
      render: (product) => (
        <span className="text-sm text-gray-900 capitalize">{product.category}</span>
      ),
    },
    {
      header: 'Price',
      render: (product) => {
        const hasDiscount = product.discountPercentage && product.discountPercentage > 0
        const finalPrice = product.price * (1 - (product.discountPercentage || 0) / 100)
        
        return hasDiscount ? (
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">
              {formatPrice(finalPrice)}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs font-semibold text-red-600">
                -{(product.discountPercentage || 0).toFixed(0)}%
              </span>
            </div>
          </div>
        ) : (
          <span className="text-sm font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
        )
      },
    },
    {
      header: 'Stock',
      className: 'hidden md:table-cell',
      render: (product) => (
        <span className="text-sm text-gray-900">{product.stock} units</span>
      ),
    },
    {
      header: 'Status',
      className: 'hidden md:table-cell',
      render: (product) => {
        const status = product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'
        const statusColor = product.stock > 20 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
            {status}
          </span>
        )
      },
    },
    {
      header: 'Actions',
      render: (product) => (
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="View product details"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </Link>
      ),
    },
  ]
}
