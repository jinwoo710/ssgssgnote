import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { AnimatePresence, motion } from 'framer-motion'
import Students from '../pages/students'
import Homework from '../pages/homework'
import Attendance from '../pages/attendance'
import Counseling from '../pages/counseling'
import { useState } from 'react'
import { EXTRA_MENU_ITEMS } from '../constants/menu'

export default function Layout() {
  const location = useLocation()
  const { pathname } = location
  const isHome = pathname === '/'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }
  const navigate = useNavigate()
  const handleMenuClick = (path: string) => {
    navigate(path)
    setMobileMenuOpen(false)
  }
  const getComponent = (path: string) => {
    switch (path) {
      case '/students':
        return <Students />
      case '/homework':
        return <Homework />
      case '/attendance':
        return <Attendance />
      case '/counseling':
        return <Counseling />
      default:
        return <Outlet />
    }
  }

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
            {isHome ? (
              <Outlet />
            ) : (
              <div
                className="bg-white rounded-2xl border-black border shadow-md w-full h-full"
                style={{
                  backgroundImage: 'linear-gradient(#eee 1px, transparent 1px)',
                  backgroundSize: '100% 25px'
                }}>
                <AnimatePresence
                  mode="wait"
                  initial={false}>
                  <motion.div
                    key={pathname}
                    className="w-full h-full"
                    variants={{
                      initial: {
                        x: 100,
                        opacity: 0
                      },
                      animate: {
                        x: 0,
                        opacity: 1,
                        transition: {
                          x: { type: 'spring', stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }
                      },
                      exit: {
                        x: -100,
                        opacity: 0,
                        transition: {
                          x: { type: 'spring', stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }
                      }
                    }}
                    initial="initial"
                    animate="animate"
                    exit="exit">
                    {getComponent(pathname)}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
        {!isHome && (
          <motion.button
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="fixed left-4 bottom-4 w-12 h-12 rounded-full shadow-lg bg-gray-500 text-white flex items-center justify-center lg:hidden z-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </motion.button>
        )}
        <AnimatePresence>
          {mobileMenuOpen && !isHome && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 bottom-20 p-4 z-40 lg:hidden">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {EXTRA_MENU_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleMenuClick(item.path)}
                    className={`${item.color} cursor-pointer p-3 hover:brightness-95 flex items-center ${pathname === item.path ? 'font-bold' : ''}`}>
                    <span>{item.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
