import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
