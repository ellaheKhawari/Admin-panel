import React, { createContext, useContext, useState, useCallback } from 'react'
import {AuthCtx, UserProfile} from "@/types";
import {DEFAULT_USER} from "@/data/mock.ts";

const TOKEN_KEY = 'nova_token'
const USER_KEY  = 'nova_user'

const loadToken = (): string | null => { try { return localStorage.getItem(TOKEN_KEY) } catch { return null } }
const loadUser = (): UserProfile | null => {
  try { const r = localStorage.getItem(USER_KEY); return r ? JSON.parse(r) : null } catch { return null }
}
const saveUser = (u: UserProfile) => { try { localStorage.setItem(USER_KEY, JSON.stringify(u)) } catch {} }
const genToken = (email: string) => btoa(`nova:${email}:${Date.now()}:${Math.random().toString(36)}`)
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
