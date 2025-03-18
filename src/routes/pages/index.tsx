import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './home'
import Layout from '../layouts'
import Students from './students'
import Homework from './homework'
import Attendance from './attendance'
import NotFound from './notfound'
import Counseling from './counseling'

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
        path: '/attendance',
        element: <Attendance />
      },
      {
        path: '/homework',
        element: <Homework />
      },
      {
        path: '/counseling',
        element: <Counseling />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
