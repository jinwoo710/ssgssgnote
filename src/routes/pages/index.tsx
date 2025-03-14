import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Layout from '../layouts'
import Students from './students'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/students',
        element: <Students />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
