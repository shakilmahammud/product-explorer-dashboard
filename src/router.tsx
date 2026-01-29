import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from './App'
import { ProductsPage } from './features/products/pages/ProductsPage'
import { ProductDetailsPage } from './features/products/pages/ProductDetailsPage'
import { CategoriesPage } from './features/products/pages/CategoriesPage'
import { SettingsPage } from './features/settings/pages/SettingsPage'
import { SearchPage } from './features/products/pages/SearchPage'
import { RouteError } from './shared/components/Error/RouteError'
import { NotFound } from './pages/NotFound'



export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'products/:id',
        element: <ProductDetailsPage />,
      },
      {
        path: 'products/categories',
        element: <CategoriesPage />,
      },
      {
        path: 'products/search',
        element: <SearchPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  },
])
