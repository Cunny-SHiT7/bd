import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import VideoPlaceholder from './pages/VideoPlaceholder.tsx'
import GenerateForm from './pages/GenerateForm.tsx'
import GusRemotionDemo from './pages/GusRemotionDemo.tsx'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './components/model/QueryClient.ts'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/videodemo",
    element: <VideoPlaceholder />
  },
  {
    path: "/formdemo",
    element: <GenerateForm />
  },
  {
    path: "/gus",
    element: <GusRemotionDemo />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
