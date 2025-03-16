import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Layout from '../layouts'
import Students from './students'
import Homework from './homework'

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
      },
      {
        path: '/homework',
        element: <Homework />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
