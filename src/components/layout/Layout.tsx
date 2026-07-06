import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { LoadingBar, SkeletonDashboard } from '../ui/Skeleton'
import { useTheme } from '../../context/ThemeContext'
import { useIsDesktop } from '../../utils/hooks'

export const Layout: React.FC = () => {
  const location = useLocation()
  const { sidebarCollapsed } = useTheme()
  const isDesktop = useIsDesktop()
  const [loading, setLoading] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)

  // Sidebar width (must match Sidebar.tsx values)
  const sidebarWidth = isDesktop ? (sidebarCollapsed ? 80 : 264) : 0

  // Loading state on route change
  useEffect(() => {
    setLoading(true)
    setShowSkeleton(true)
    const t1 = setTimeout(() => setLoading(false), 600)
    const t2 = setTimeout(() => setShowSkeleton(false), 350)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [location.pathname])

  return (
    <div className="flex min-h-screen">
      {/* Fixed sidebar — Layout compensates with left margin */}
      <Sidebar />

      {/* Main content — shifts right by sidebar width on desktop */}
      <motion.div
        className="flex min-h-screen flex-1 flex-col"
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <LoadingBar show={loading} />
        <Header />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-screen-2xl w-full mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            {showSkeleton ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <SkeletonDashboard />
              </motion.div>
            ) : (
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  )
}
