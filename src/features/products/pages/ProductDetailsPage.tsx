import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProductById } from '../queries/productsQueries'
import { LoadingSpinner } from '../../../shared/components/DataDisplay'

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: product, isLoading, error } = useProductById(id)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description')

  useEffect(() => {
    if (product) {
      setSelectedImage(product.thumbnail)
    }
  }, [product])

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center h-screen gap-2">
        <LoadingSpinner size="lg" color="#22B573" />
        <span className="text-sm text-gray-500">Loading product details...</span>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="text-[#22B573] hover:text-[#1a8f5a] font-medium"
        >
          &larr; Back to Products
        </button>
      </div>
    )
  }

  const discountPrice = product.price 
  const originalPrice = product.discountPercentage 
    ? (product.price / (1 - product.discountPercentage / 100))
    : null

  return (
    <div className="bg-white min-h-screen font-sans text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#22B573]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#22B573]">Products</Link>
          <span className="mx-2">/</span>
          <span className="capitalize text-gray-900 truncate">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <div className="aspect-w-1 aspect-h-1 w-full rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-8 relative overflow-hidden group">
               <img
                src={selectedImage || product.thumbnail}
                alt={product.title}
                className="max-h-[500px] w-auto mx-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
               <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-[#22B573]">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
               </button>
            </div>
            
            {product.images && product.images.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 p-1 ${
                      selectedImage === image ? 'border-[#22B573]' : 'border-transparent hover:border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
               <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
               </div>
               <span className="text-gray-500 text-sm">
                  ({product.reviews?.length || 0} customer reviews)
               </span>
            </div>

            <div className="text-3xl font-bold text-[#22B573] mb-6">
              ${discountPrice.toFixed(2)}
              {originalPrice && (
                <span className="text-lg text-gray-400 line-through ml-3 font-normal">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-3 mb-8 text-gray-600">
               {product.description && <p className="mb-4">{product.description}</p>}
               <ul className="space-y-2 text-sm">
                  {product.warrantyInformation && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span className="font-medium">Warranty:</span> {product.warrantyInformation}
                      </li>
                  )}
                  {product.shippingInformation && (
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        <span className="font-medium">Shipping:</span> {product.shippingInformation}
                      </li>
                  )}
                   <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                     <span className="font-medium">Availability:</span> 
                     <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                        {product.availabilityStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
                     </span>
                  </li>
                   <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                     <span className="font-medium">Min. Order Qty:</span> 
                     <span className="font-medium">
                        {product.minimumOrderQuantity || 1} units
                     </span>
                  </li>
                    <li className="flex items-center gap-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                     <span className="font-medium">Return Policy:</span> 
                     <span className="font-medium">
                        {product.returnPolicy || 'No return policy'}
                     </span>
                  </li>
               </ul>
            </div>

            <div className="border-t border-b border-gray-100 py-6 mb-6 space-y-6">
               <div className="flex flex-wrap gap-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                     <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        disabled={quantity <= 1}
                     >
                        -
                     </button>
                     <span className="px-4 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                     <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                     >
                        +
                     </button>
                  </div>
                  
                  <button className="flex-1 bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors uppercase tracking-wide text-sm">
                     Add to Cart
                  </button>
                  <button className="flex-1 bg-[#22B573] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#1e9e63] transition-colors uppercase tracking-wide text-sm">
                     Buy Now
                  </button>
               </div>
               
               <div className="flex gap-6 text-sm text-gray-500">
                  <button className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                     Add to wishlist
                  </button>
               </div>
            </div>

            <div className="space-y-2 text-sm text-gray-500">
               <div><span className="font-semibold text-gray-900">SKU:</span> {product.sku}</div>
               <div><span className="font-semibold text-gray-900">Categories:</span> <span className="capitalize">{product.category.replace('-', ' ')}</span></div>
               {product.tags && (
                   <div><span className="font-semibold text-gray-900">Tags:</span> {product.tags.join(', ')}</div>
               )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-16">
           <div className="flex justify-center border-b border-gray-200 mb-8">
              <div className="flex gap-4 md:gap-8">
                 {['description', 'specifications', 'reviews'].map((tab) => (
                    <button
                       key={tab}
                       onClick={() => setActiveTab(tab as any)}
                       className={`pb-4  text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${
                          activeTab === tab 
                             ? 'border-[#22B573] text-gray-900' 
                             : 'border-transparent text-gray-500 hover:text-gray-700'
                       }`}
                    >
                       {tab} {tab === 'reviews' ? `(${product.reviews?.length || 0})` : ''}
                    </button>
                 ))}
              </div>
           </div>

           <div className="max-w-4xl mx-auto">
              {activeTab === 'description' && (
                 <div className="prose max-w-none text-gray-600 leading-relaxed">
                    <p>{product.description}</p>
                 </div>
              )}

              {activeTab === 'specifications' && (
                 <div className="space-y-8">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                       <table className="min-w-full divide-y divide-gray-200">
                          <tbody className="divide-y divide-gray-200 bg-white">
                             <tr className="bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Brand</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.brand}</td>
                             </tr>
                             <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">SKU</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
                             </tr>
                             <tr className="bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Stock Level</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.stock} units available</td>
                             </tr>
                             <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Availability</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                      {product.availabilityStatus || (product.stock > 0 ? 'In Stock' : 'Out of Stock')}
                                   </span>
                                </td>
                             </tr>
                             <tr className="bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Weight</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.weight} lbs</td>
                             </tr>
                             <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Dimensions</td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                   {product.dimensions 
                                      ? `${product.dimensions.width}" x ${product.dimensions.height}" x ${product.dimensions.depth}"`
                                      : 'N/A'}
                                </td>
                             </tr>
                             <tr className="bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Warranty</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.warrantyInformation || 'N/A'}</td>
                             </tr>
                             <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Shipping</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.shippingInformation || 'N/A'}</td>
                             </tr>
                             <tr className="bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Barcode</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.meta?.barcode || 'N/A'}</td>
                             </tr>
                             <tr>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Return Policy</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.returnPolicy || 'N/A'}</td>
                             </tr>
                             <tr className="bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">Min. Order Qty</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.minimumOrderQuantity || 1} units</td>
                             </tr>
                          </tbody>
                       </table>
                    </div>

                    {product.meta?.qrCode && (
                       <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-4">Product QR Code</h3>
                          <div className="border border-gray-200 rounded-lg p-2 inline-block">
                             <img 
                                src={product.meta.qrCode} 
                                alt="Product QR Code" 
                                className="w-24 h-24"
                             />
                          </div>
                       </div>
                    )}
                 </div>
              )}


              {activeTab === 'reviews' && (
                 <div className="space-y-8">
                    {(!product.reviews || product.reviews.length === 0) && (
                       <p className="text-gray-500 text-center py-8">No reviews yet.</p>
                    )}
                    {product.reviews?.map((review, idx) => (
                       <div key={idx} className="flex gap-4 border-b border-gray-100 pb-8">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                             {review.reviewerName.charAt(0)}
                          </div>
                          <div>
                             <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-gray-900">{review.reviewerName}</h4>
                                <span className="text-xs text-gray-400">on {new Date(review.date).toLocaleDateString()}</span>
                             </div>
                             <div className="flex text-yellow-400 mb-2">
                                {[...Array(5)].map((_, i) => (
                                   <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                   </svg>
                                ))}
                             </div>
                             <p className="text-gray-600">{review.comment}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}
