import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return (
    <div className="font-gamja mx-auto flex-col px-4 lg:px-0 w-full max-w-screen-md lg:max-w-screen-lg text-dark flex justify-center items-center h-full">
      {!isHome && <Header />}
      <Outlet />
    </div>
  )
}
