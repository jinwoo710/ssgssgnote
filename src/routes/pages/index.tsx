import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Layout from '../layouts'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
