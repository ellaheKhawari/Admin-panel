import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Search, Sun, Moon, Bell, ChevronDown,
         PanelLeftClose, PanelLeftOpen, LogOut, Settings, UserCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import clsx from 'clsx'

const AvatarBubble: React.FC<{ size?: string }> = ({ size = 'h-8 w-8' }) => {
  const { user } = useAuth()
  if (user?.avatar) {
    return <img src={user.avatar} alt={user.name} className={clsx(size, 'rounded-full object-cover')} />
  }
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() ?? 'AM'
  return (
    <div className={clsx(size, 'flex items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-glow-cyan text-sm font-semibold text-white')}>
      {initials}
    </div>
  )
}

export const Header: React.FC = () => {
  const { dark, toggleDark, setSidebarOpen, sidebarCollapsed, toggleCollapsed } = useTheme()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const closeAll = () => { setNotifOpen(false); setProfileOpen(false) }

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
    closeAll()
  }

  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 sm:px-6"
      style={{
        borderColor: 'var(--border-alpha)',
        background: dark ? 'rgba(10,14,23,0.85)' : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <button onClick={() => setSidebarOpen(true)} className="focus-ring rounded-lg p-2 text-slate-500 hover:bg-base-700/40 lg:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>
      <button onClick={toggleCollapsed} className="focus-ring hidden rounded-lg p-2 text-slate-500 hover:bg-base-700/40 lg:flex" aria-label="Toggle sidebar">
        {sidebarCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
      </button>

      <div className="relative hidden flex-1 max-w-sm sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Search or type a command..."
          className="focus-ring w-full rounded-lg border bg-base-800/40 py-2 pl-9 pr-12 text-sm placeholder:text-slate-400 transition-colors focus:border-accent-400"
          style={{ borderColor: 'var(--border-alpha)', color: dark ? '#cbd5e1' : '#1e293b' }}
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded border px-1.5 py-0.5 text-[10px] text-slate-400"
          style={{ borderColor: 'var(--border-alpha)', background: 'rgb(var(--c-800))' }}>
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        {/* Dark/Light toggle */}
        <button onClick={toggleDark} className="focus-ring rounded-lg p-2.5 text-slate-500 hover:bg-base-700/40" aria-label="Toggle theme">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={dark ? 'moon' : 'sun'}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }} className="block">
              {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false) }}
            className="focus-ring relative rounded-lg p-2.5 text-slate-500 hover:bg-base-700/40">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 animate-pulse-soft rounded-full bg-glow-coral ring-2 ring-base-900" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAll} />
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.15 }}
                  className="glass absolute right-0 z-50 mt-2 w-72 rounded-xl p-2 shadow-glass">
                  <p className="px-2 py-1.5 text-xs font-semibold text-slate-400">Notifications</p>
                  {['New order #ORD-7748 received', 'Invoice INV-2026-103 is overdue', 'Server backup completed'].map((t, i) => (
                    <div key={i} className="cursor-pointer rounded-lg px-2.5 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-base-700/40">{t}</div>
                  ))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false) }}
            className="focus-ring flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2.5 hover:bg-base-700/40">
            <AvatarBubble />
            <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">{user?.name ?? 'Guest'}</span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </button>
          <AnimatePresence>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAll} />
                <motion.div initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }} transition={{ duration: 0.15 }}
                  className="glass absolute right-0 z-50 mt-2 w-56 rounded-xl p-2 shadow-glass">
                  <div className="mb-2 px-2.5 py-2 border-b border-base-600">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                  </div>
                  <Link to="/profile" onClick={closeAll} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-base-700/40">
                    <UserCircle className="h-4 w-4" /> My Profile
                  </Link>
                  <Link to="/settings" onClick={closeAll} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-base-700/40">
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <hr className="my-1" style={{ borderColor: 'var(--border-alpha)' }} />
                  <button onClick={handleLogout} className="focus-ring flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-400/5">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
