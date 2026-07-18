export interface Order {
  id: string; product: string; variant: string; category: string
  price: number; status: 'Delivered' | 'Pending' | 'Canceled'; date: string; image: string
}

export interface Customer {
  id: string; name: string; email: string; country: string; flag: string
  spent: number; orders: number; joined: string; status: 'Active' | 'Inactive'
}

export interface Invoice {
  id: string; client: string; amount: number; status: 'Paid' | 'Unpaid' | 'Overdue'; due: string
}

export interface CalendarEvent {
  id: string; title: string; date: string; time: string; type: 'meeting' | 'deadline' | 'reminder' | 'launch'
}

export interface NavItem {
  label: string; to?: string; icon: string; badge?: string
  children?: { label: string; to: string }[]
}

export type ProductStatus = 'Active' | 'Draft' | 'Archived'

export type ProductCategory = 'Laptop' | 'Smartphone' | 'Tablet' | 'Audio' | 'Watch' | 'Accessories' | 'Display'

export interface Product  {
  id: string
  name: string
  description: string
  price: number
  stock: number
  image: string
  emoji?: string
  rating: number
  reviews: number
  sold: number
  sku: string
  tags: string[]
  featured?: boolean
  category: string | ProductCategory
  shortDesc?: string
  compareAt?: number | null
  status: ProductStatus
  createdAt?: string
}

export interface UserProfile {
    id: string; name: string; email: string; phone: string; location: string;
    bio: string; role: string; avatar: string | null; bannerImage: string | null;
    website: string; joinedAt: string; language: string; timezone: string;
    twoFactor: boolean; emailNotif: boolean; pushNotif: boolean; smsNotif: boolean;
    plan: 'Free' | 'Pro' | 'Enterprise'
}

export interface AuthCtx {
    user: UserProfile | null; token: string | null; isAuthed: boolean
    fakeLogin: (email: string, password: string) => Promise<void>
    fakeRegister: (name: string, email: string, password: string) => Promise<void>
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>
    uploadAvatar: (dataUrl: string) => Promise<void>
    uploadBanner: (dataUrl: string) => Promise<void>
    logout: () => void
}

export interface ThemeCtx {
    dark: boolean
    setDark: (v: boolean) => void
    toggleDark: () => void
    sidebarOpen: boolean
    setSidebarOpen: (v: boolean) => void
    sidebarCollapsed: boolean
    toggleCollapsed: () => void
}

export interface Msg { id: number; from: 'them' | 'me'; text: string; time: string }