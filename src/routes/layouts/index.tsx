import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import { AnimatePresence, motion } from 'framer-motion'
import Students from '../pages/students'
import Homework from '../pages/homework'
import Attendance from '../pages/attendance'
import Counseling from '../pages/counseling'

export default function Layout() {
  const location = useLocation()
  const { pathname } = location
  const isHome = pathname === '/'

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
      </div>
    </div>
  )
}
