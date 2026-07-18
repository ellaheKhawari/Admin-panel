import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'
import * as Icons from 'lucide-react'
import { nav } from '../../data/nav'
import { useTheme } from '../../context/ThemeContext'
import { useIsDesktop } from '../../utils/hooks'

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  const Cmp = (Icons as unknown as Record<string, React.FC<{ className?: string }>>)[name]
  return Cmp ? <Cmp className={className} /> : null
}

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed } = useTheme()
  const location = useLocation()
  const isDesktop = useIsDesktop()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})
  const isChildActive = (children?: { to: string }[]) =>
    !!children?.some((c) => location.pathname === c.to)
  const sidebarWidth = sidebarCollapsed && isDesktop ? 80 : 264
  const sidebarX = isDesktop ? 0 : (sidebarOpen ? 0 : -300)

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth, x: sidebarX }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-y-0 left-0 z-50 flex flex-col border-r shadow-glass"
        style={{
          borderColor: 'var(--border-alpha)',
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex h-16 shrink-0 items-center gap-2.5 px-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-glow-cyan text-sm font-bold text-white shadow-glow">
            N
          </div>
          {(!sidebarCollapsed || !isDesktop) && (
            <span className="font-display text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              Nova
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 pb-4">
          {nav.map((group) => (
            <div key={group.section} className="mb-4">
              {(!sidebarCollapsed || !isDesktop) && (
                <p className="mb-1.5 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.section}
                </p>
              )}
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  if (item.children) {
                    const open = openGroups[item.label] ?? isChildActive(item.children)
                    const collapsed = sidebarCollapsed && isDesktop
                    return (
                      <li key={item.label}>
                        <button
                          onClick={() => setOpenGroups((s) => ({ ...s, [item.label]: !open }))}
                          className={clsx(
                            'focus-ring flex w-full items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors',
                            'text-slate-500 dark:text-slate-300 hover:bg-base-700/40',
                            isChildActive(item.children) && 'text-slate-900 dark:text-white'
                          )}
                        >
                          <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left">{item.label}</span>
                              <Icons.ChevronDown
                                className={clsx('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
                              />
                            </>
                          )}
                        </button>
                        <AnimatePresence>
                          {open && !collapsed && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-6 mt-0.5 space-y-0.5 overflow-hidden border-l border-base-600 pl-3"
                            >
                              {item.children.map((child) => (
                                <li key={child.to}>
                                  <NavLink
                                    to={child.to}
                                    onClick={() => !isDesktop && setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                      clsx(
                                        'focus-ring block rounded-md px-2.5 py-1.5 text-sm transition-colors',
                                        isActive
                                          ? 'text-accent-500 font-semibold'
                                          : 'text-slate-400 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                                      )
                                    }
                                  >
                                    {child.label}
                                  </NavLink>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    )
                  }
                  return (
                    <li key={item.to}>
                      <NavLink
                        to={item.to!}
                        onClick={() => !isDesktop && setSidebarOpen(false)}
                        className={({ isActive }) =>
                          clsx(
                            'focus-ring relative flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors',
                            isActive
                              ? 'text-white'
                              : 'text-slate-500 dark:text-slate-300 hover:bg-base-700/40'
                          )
                        }
                      >
                        {({ isActive }: { isActive: boolean }) => (
                          <>
                            {isActive && (
                              <motion.span
                                layoutId="active-pill"
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 shadow-glow"
                                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                              />
                            )}
                            <Icon name={item.icon} className="relative z-10 h-[18px] w-[18px] shrink-0" />
                            {(!sidebarCollapsed || !isDesktop) && (
                              <span className="relative z-10">{item.label}</span>
                            )}
                          </>
                        )}
                      </NavLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {(!sidebarCollapsed || !isDesktop) && (
          <div className="m-3 mb-4 rounded-xl border border-accent-500/20 bg-accent-500/8 p-4">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">Upgrade to Pro</p>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">Unlock advanced analytics.</p>
            <button className="focus-ring mt-3 w-full rounded-md bg-accent-500 py-1.5 text-xs font-semibold text-white keep-white hover:bg-accent-600 transition-colors">
              Upgrade
            </button>
          </div>
        )}
      </motion.aside>
    </>
  )
}
