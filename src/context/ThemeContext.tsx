import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeCtx = {
  dark: boolean
  toggleDark: () => void
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  sidebarCollapsed: boolean
  toggleCollapsed: () => void
  isDesktop: boolean
}

const Ctx = createContext<ThemeCtx | null>(null)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dark, setDark] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
      if (e.matches) setSidebarOpen(false)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <Ctx.Provider
      value={{
        dark,
        toggleDark: () => setDark((d) => !d),
        sidebarOpen,
        setSidebarOpen,
        sidebarCollapsed,
        toggleCollapsed: () => setSidebarCollapsed((c) => !c),
        isDesktop,
      }}
    >
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
