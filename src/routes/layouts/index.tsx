import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return (
    <div className="font-gamja min-h-screen w-full flex justify-center">
      <div className="flex relative w-full max-w-screen-md lg:max-w-screen-lg">
        {!isHome && (
          <div className="sticky top-0 left-0 h-screen hidden lg:block">
            <Header />
          </div>
        )}
        <div className="flex-1 min-h-screen overflow-auto z-10">
          <div className="w-full h-full py-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
