import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { LoadingBar } from '../ui/Skeleton'
import { useTheme } from '../../context/ThemeContext'
import { useIsDesktop } from '../../utils/hooks'

export const Layout: React.FC = () => {
  const location = useLocation()
  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])
  const { sidebarCollapsed, setSidebarOpen } = useTheme()
  const isDesktop = useIsDesktop()
  const [loading, setLoading] = useState(false)
  const sidebarWidth = isDesktop ? (sidebarCollapsed ? 80 : 264) : 0

  useEffect(() => {
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <motion.div
        className="flex min-h-screen flex-1 flex-col overflow-x-hidden"
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        <LoadingBar show={loading} />
        <Header />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-screen-2xl w-full mx-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  )
}
