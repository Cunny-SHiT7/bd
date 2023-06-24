import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import SharePage from './pages/SharePage.tsx'

const client = new QueryClient()

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/share/:theme/:name',
    element: <SharePage />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
