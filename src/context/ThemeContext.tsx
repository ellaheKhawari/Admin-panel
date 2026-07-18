import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeCtx = {
  dark: boolean
  setDark: (v: boolean) => void
  toggleDark: () => void
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
  sidebarCollapsed: boolean
  toggleCollapsed: () => void
}

const Ctx = createContext<ThemeCtx | null>(null)

const THEME_KEY = 'nova_theme'

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ✅ Synchronously read from localStorage so dark class is applied before first paint
  const [dark, setDarkState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY)
      return stored !== null ? stored === 'dark' : true   // default: dark
    } catch {
      return true
    }
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light') } catch {}
  }, [dark])

  const setDark = (v: boolean) => setDarkState(v)
  const toggleDark = () => setDarkState((d) => !d)

  return (
    <Ctx.Provider value={{ dark, setDark, toggleDark, sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleCollapsed: () => setSidebarCollapsed((c) => !c) }}>
      {children}
    </Ctx.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider')
  return ctx
}
