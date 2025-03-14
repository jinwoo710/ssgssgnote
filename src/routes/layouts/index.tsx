import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="font-gamja mx-auto px-4 lg:px-0 w-full max-w-screen-md lg:max-w-screen-lg text-dark bg-orange-500 flex justify-center items-center h-full lg:h-screen">
      <Outlet />
    </div>
  )
}
