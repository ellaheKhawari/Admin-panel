import React, { createContext, useContext, useState, useCallback } from 'react'

export type UserProfile = {
  id: string; name: string; email: string; phone: string; location: string;
  bio: string; role: string; avatar: string | null; bannerImage: string | null;
  website: string; joinedAt: string; language: string; timezone: string;
  twoFactor: boolean; emailNotif: boolean; pushNotif: boolean; smsNotif: boolean;
  plan: 'Free' | 'Pro' | 'Enterprise'
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_default', name: 'Amir Moradi', email: 'amir@nova.io',
  phone: '+49 30 1234 5678', location: 'Hamburg, Germany',
  bio: 'Product designer focused on dashboards and data-dense interfaces. Previously led design systems at two early-stage startups.',
  role: 'Product Designer · Nova Inc.', avatar: null, bannerImage: null,
  website: 'nova.io/amir', joinedAt: '2025-01-15', language: 'en',
  timezone: 'cet', twoFactor: false, emailNotif: true, pushNotif: false,
  smsNotif: false, plan: 'Pro',
}

const TOKEN_KEY = 'nova_token'
const USER_KEY  = 'nova_user'

const loadToken = (): string | null => { try { return localStorage.getItem(TOKEN_KEY) } catch { return null } }
const loadUser = (): UserProfile | null => {
  try { const r = localStorage.getItem(USER_KEY); return r ? JSON.parse(r) : null } catch { return null }
}
const saveUser = (u: UserProfile) => { try { localStorage.setItem(USER_KEY, JSON.stringify(u)) } catch {} }
const genToken = (email: string) => btoa(`nova:${email}:${Date.now()}:${Math.random().toString(36)}`)

type AuthCtx = {
  user: UserProfile | null; token: string | null; isAuthed: boolean
  fakeLogin: (email: string, password: string) => Promise<void>
  fakeRegister: (name: string, email: string, password: string) => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  uploadAvatar: (dataUrl: string) => Promise<void>
  uploadBanner: (dataUrl: string) => Promise<void>
  logout: () => void
}

const Ctx = createContext<AuthCtx | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken]   = useState<string | null>(() => loadToken())
  const [user, setUser]     = useState<UserProfile | null>(() => loadToken() ? (loadUser() ?? DEFAULT_USER) : null)

  const fakeLogin = useCallback(async (email: string, _pw: string) => {
    await new Promise(r => setTimeout(r, 700))
    const existing = loadUser()
    const u: UserProfile = existing ? { ...existing, email } : { ...DEFAULT_USER, email, id: 'usr_' + Date.now() }
    const t = genToken(email)
    localStorage.setItem(TOKEN_KEY, t)
    saveUser(u); setToken(t); setUser(u)
  }, [])

  const fakeRegister = useCallback(async (name: string, email: string, _pw: string) => {
    await new Promise(r => setTimeout(r, 800))
    const u: UserProfile = { ...DEFAULT_USER, name, email, id: 'usr_' + Date.now(), joinedAt: new Date().toISOString().slice(0, 10) }
    const t = genToken(email)
    localStorage.setItem(TOKEN_KEY, t)
    saveUser(u); setToken(t); setUser(u)
  }, [])

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    await new Promise(r => setTimeout(r, 400))
    setUser(prev => { const next = { ...(prev ?? DEFAULT_USER), ...updates }; saveUser(next); return next })
  }, [])

  const uploadAvatar = useCallback(async (dataUrl: string) => {
    await new Promise(r => setTimeout(r, 300))
    setUser(prev => { const next = { ...(prev ?? DEFAULT_USER), avatar: dataUrl }; saveUser(next); return next })
  }, [])

  const uploadBanner = useCallback(async (dataUrl: string) => {
    await new Promise(r => setTimeout(r, 300))
    setUser(prev => { const next = { ...(prev ?? DEFAULT_USER), bannerImage: dataUrl }; saveUser(next); return next })
  }, [])

  const logout = useCallback(() => {
    try { localStorage.removeItem(TOKEN_KEY) } catch {}
    setToken(null); setUser(null)
  }, [])

  return (
    <Ctx.Provider value={{ user, token, isAuthed: !!token, fakeLogin, fakeRegister, updateProfile, uploadAvatar, uploadBanner, logout }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
