export type Order = {
  id: string
  product: string
  variant: string
  category: string
  price: number
  status: 'Delivered' | 'Pending' | 'Canceled'
  date: string
  image: string
}

export type Customer = {
  id: string
  name: string
  email: string
  country: string
  flag: string
  spent: number
  orders: number
  joined: string
  status: 'Active' | 'Inactive'
}

export type Invoice = {
  id: string
  client: string
  amount: number
  status: 'Paid' | 'Unpaid' | 'Overdue'
  due: string
}

export type CalendarEvent = {
  id: string
  title: string
  date: string
  time: string
  type: 'meeting' | 'deadline' | 'reminder' | 'launch'
}

export type NavItem = {
  label: string
  to?: string
  icon: string
  badge?: string
  children?: { label: string; to: string }[]
}
