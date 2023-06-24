import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import VideoPlaceholder from './pages/VideoPlaceholder.tsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/videodemo",
    element: <VideoPlaceholder />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </React.StrictMode>,
)
