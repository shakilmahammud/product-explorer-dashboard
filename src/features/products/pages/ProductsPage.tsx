import { useProductFilters } from '../hooks/useProductFilters'
import { useProductData } from '../hooks/useProductData'
import { ProductsLayout } from '../components/ProductsLayout'

export function ProductsPage() {
  const { filters, handlers, isSearchActive } = useProductFilters()
  
  const { 
    displayProducts, 
    status, 
    actions, 
    sentinelRef 
  } = useProductData({
    isSearchActive,
    ...filters
  })

  return (
    <ProductsLayout
      products={displayProducts}
      filters={filters}
      handlers={handlers}
      status={status}
      actions={actions}
      sentinelRef={sentinelRef}
      isSearchActive={isSearchActive}
    />
  )
}
