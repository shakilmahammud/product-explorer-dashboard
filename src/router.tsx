import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { ProductsPage } from './features/products/pages/ProductsPage'
import { ProductDetailsPage } from './features/products/pages/ProductDetailsPage'
import { CategoriesPage } from './features/products/pages/CategoriesPage'
import { SettingsPage } from './features/settings/pages/SettingsPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
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
        element: <ProductsPage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
    ],
  },
])
