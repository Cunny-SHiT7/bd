import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import IndexPage from './pages/index.tsx'
import RenderInformationPage from './pages/[renderId]/index.tsx'
import './index.css'

const client = new QueryClient()

const routes = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/:renderId',
    element: <RenderInformationPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
