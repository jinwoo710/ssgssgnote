import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="gamja-flower mx-auto px-4 lg:px-0 w-full max-w-screen-md lg:max-w-screen-lg text-dark bg-orange-500 flex justify-center items-center h-screen">
      <Outlet />
    </div>
  )
}
