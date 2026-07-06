/**
 * Fake auth system — simulates a /me endpoint using localStorage.
 * Token: "nova_token"  |  User: "nova_user"
 *
 * In production, replace fakeLogin/fakeRegister with real API calls
 * and fakeMe() with fetch('/api/me', { headers: { Authorization: `Bearer ${token}` } })
 */
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'

export type UserProfile = {
  id: string
  name: string
  email: string
  phone: string
  location: string
  bio: string
  role: string
  avatar: string | null    // base64 data URL or null
  website: string
  joinedAt: string
  language: string
  timezone: string
  twoFactor: boolean
  emailNotif: boolean
  pushNotif: boolean
  smsNotif: boolean
  plan: 'Free' | 'Pro' | 'Enterprise'
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_' + Math.random().toString(36).slice(2, 9),
  name: 'Amir Moradi',
  email: 'amir@nova.io',
  phone: '+49 30 1234 5678',
  location: 'Hamburg, Germany',
  bio: 'Product designer focused on dashboards and data-dense interfaces. Previously led design systems at two early-stage startups.',
  role: 'Product Designer · Nova Inc.',
  avatar: null,
  website: 'nova.io/amir',
  joinedAt: '2025-01-15',
  language: 'en',
  timezone: 'cet',
  twoFactor: false,
  emailNotif: true,
  pushNotif: false,
  smsNotif: false,
  plan: 'Pro',
}

const STORAGE_TOKEN_KEY = 'nova_token'
const STORAGE_USER_KEY = 'nova_user'

/* ── Helpers ───────────────────────────────────────────── */
const generateToken = (email: string) =>
  btoa(`nova:${email}:${Date.now()}:${Math.random().toString(36)}`)

const saveUser = (user: UserProfile) =>
  localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user))

const loadUser = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_USER_KEY)
    return raw ? (JSON.parse(raw) as UserProfile) : null
  } catch { return null }
}

const loadToken = () => localStorage.getItem(STORAGE_TOKEN_KEY)

/* ── Context ────────────────────────────────────────────── */
type AuthCtx = {
  user: UserProfile | null
  token: string | null
  isAuthed: boolean
  /** Simulates POST /auth/login */
  fakeLogin: (email: string, password: string) => Promise<void>
  /** Simulates POST /auth/register */
  fakeRegister: (name: string, email: string, password: string) => Promise<void>
  /** Simulates GET /me */
  fakeMe: () => Promise<UserProfile>
  /** Simulates PATCH /me */
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  /** Simulates POST /me/avatar */
  uploadAvatar: (dataUrl: string) => Promise<void>
  logout: () => void
}

const Ctx = createContext<AuthCtx | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [token, setToken] = useState<string | null>(null)

  /* Bootstrap from localStorage on mount */
  useEffect(() => {
    const storedToken = loadToken()
    if (storedToken) {
      const storedUser = loadUser() ?? DEFAULT_USER
      setToken(storedToken)
      setUser(storedUser)
    }
  }, [])

  const fakeLogin = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 700)) // simulate network
    const existingUser = loadUser()
    const loggedInUser: UserProfile = existingUser
      ? { ...existingUser, email }
      : { ...DEFAULT_USER, email, id: 'usr_' + Math.random().toString(36).slice(2, 9) }
    const t = generateToken(email)
    localStorage.setItem(STORAGE_TOKEN_KEY, t)
    saveUser(loggedInUser)
    setToken(t)
    setUser(loggedInUser)
  }, [])

  const fakeRegister = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800))
    const newUser: UserProfile = {
      ...DEFAULT_USER,
      name,
      email,
      id: 'usr_' + Math.random().toString(36).slice(2, 9),
      joinedAt: new Date().toISOString().slice(0, 10),
    }
    const t = generateToken(email)
    localStorage.setItem(STORAGE_TOKEN_KEY, t)
    saveUser(newUser)
    setToken(t)
    setUser(newUser)
  }, [])

  const fakeMe = useCallback(async (): Promise<UserProfile> => {
    await new Promise((r) => setTimeout(r, 200))
    const u = loadUser() ?? DEFAULT_USER
    setUser(u)
    return u
  }, [])

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    await new Promise((r) => setTimeout(r, 400))
    setUser((prev) => {
      const next = { ...(prev ?? DEFAULT_USER), ...updates }
      saveUser(next)
      return next
    })
  }, [])

  const uploadAvatar = useCallback(async (dataUrl: string) => {
    await new Promise((r) => setTimeout(r, 300))
    setUser((prev) => {
      const next = { ...(prev ?? DEFAULT_USER), avatar: dataUrl }
      saveUser(next)
      return next
    })
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN_KEY)
    setToken(null)
    setUser(null)
  }, [])

  return (
    <Ctx.Provider value={{
      user,
      token,
      isAuthed: !!token,
      fakeLogin,
      fakeRegister,
      fakeMe,
      updateProfile,
      uploadAvatar,
      logout,
    }}>
      {children}
    </Ctx.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
