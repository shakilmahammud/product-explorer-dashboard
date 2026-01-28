import { type Product } from '../types/productTypes'

interface ProductInfoCardProps {
  product: Product
}

export function ProductInfoCard({ product }: ProductInfoCardProps) {
  const discountPrice = product.price 
  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100))
    : null

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 w-[350px] border border-gray-100 z-50">
      <div className="flex gap-4 mb-4">
        <div className="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center p-2 border border-gray-100">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 leading-tight mb-1">{product.title}</h3>
          <div className="flex items-center gap-1 mb-1">
             <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
             </div>
             <span className="text-xs text-gray-500">({product.reviews?.length || 0})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-[#22B573]">${discountPrice.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
        <div className="flex justify-between">
           <span className="text-gray-500 font-medium">Warranty:</span>
           <span className="text-gray-900">{product.warrantyInformation || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
           <span className="text-gray-500 font-medium">Shipping:</span>
           <span className="text-gray-900">{product.shippingInformation || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
           <span className="text-gray-500 font-medium">Availability:</span>
           <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
              {product.availabilityStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
           </span>
        </div>
        <div className="flex justify-between">
           <span className="text-gray-500 font-medium">Min. Order Qty:</span>
           <span className="text-gray-900">{product.minimumOrderQuantity || 1} units</span>
        </div>
        <div className="flex justify-between">
           <span className="text-gray-500 font-medium">Return Policy:</span>
           <span className="text-gray-900">{product.returnPolicy || 'N/A'}</span>
        </div>
        <div className="flex gap-2 mt-3">
           <button className="flex-1 bg-black text-white text-xs py-2 rounded font-medium hover:bg-gray-800 transition-colors">
              Buy Now
           </button>
           <button className="flex-1 border border-gray-200 text-gray-700 text-xs py-2 rounded font-medium hover:bg-gray-50 transition-colors">
              Add to Cart
           </button>
        </div>
      </div>
    </div>
  )
}
