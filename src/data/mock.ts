import type { Order, Customer, Invoice, CalendarEvent } from '../types'

export const monthly = [
  { month: 'Jan', sales: 145, target: 200, revenue: 38 },
  { month: 'Feb', sales: 320, target: 220, revenue: 52 },
  { month: 'Mar', sales: 210, target: 230, revenue: 49 },
  { month: 'Apr', sales: 280, target: 240, revenue: 58 },
  { month: 'May', sales: 190, target: 240, revenue: 60 },
  { month: 'Jun', sales: 230, target: 250, revenue: 47 },
  { month: 'Jul', sales: 260, target: 250, revenue: 78 },
  { month: 'Aug', sales: 90, target: 260, revenue: 70 },
  { month: 'Sep', sales: 250, target: 260, revenue: 110 },
  { month: 'Oct', sales: 310, target: 270, revenue: 128 },
  { month: 'Nov', sales: 240, target: 270, revenue: 145 },
  { month: 'Dec', sales: 95, target: 280, revenue: 138 },
]

export const trafficSources = [
  { name: 'Organic', value: 42, color: '#6e5bff' },
  { name: 'Direct', value: 26, color: '#3fe0d0' },
  { name: 'Referral', value: 18, color: '#ffb454' },
  { name: 'Social', value: 14, color: '#ff6b6b' },
]

export const orders: Order[] = [
  { id: 'ORD-7741', product: 'MacBook Pro 14"', variant: '2 Variants', category: 'Laptop', price: 2399, status: 'Delivered', date: '2026-06-24', image: '💻' },
  { id: 'ORD-7742', product: 'Apple Watch Ultra', variant: '1 Variant', category: 'Watch', price: 879, status: 'Pending', date: '2026-06-24', image: '⌚' },
  { id: 'ORD-7743', product: 'iPhone 16 Pro Max', variant: '2 Variants', category: 'Smartphone', price: 1869, status: 'Delivered', date: '2026-06-23', image: '📱' },
  { id: 'ORD-7744', product: 'iPad Pro 13"', variant: '2 Variants', category: 'Tablet', price: 1699, status: 'Canceled', date: '2026-06-23', image: '📲' },
  { id: 'ORD-7745', product: 'AirPods Pro 3', variant: '1 Variant', category: 'Accessories', price: 240, status: 'Delivered', date: '2026-06-22', image: '🎧' },
  { id: 'ORD-7746', product: 'Sony WH-1000XM6', variant: '3 Variants', category: 'Audio', price: 399, status: 'Pending', date: '2026-06-22', image: '🎵' },
  { id: 'ORD-7747', product: 'Dell XPS 15', variant: '1 Variant', category: 'Laptop', price: 1899, status: 'Delivered', date: '2026-06-21', image: '💻' },
  { id: 'ORD-7748', product: 'Galaxy S25 Ultra', variant: '2 Variants', category: 'Smartphone', price: 1299, status: 'Delivered', date: '2026-06-20', image: '📱' },
]

export const customers: Customer[] = [
  { id: 'CUS-001', name: 'Amelia Carter', email: 'amelia@nova.io', country: 'USA', flag: '🇺🇸', spent: 4820, orders: 18, joined: '2025-02-14', status: 'Active' },
  { id: 'CUS-002', name: 'Liam Bernard', email: 'liam@nova.io', country: 'France', flag: '🇫🇷', spent: 2310, orders: 9, joined: '2025-04-02', status: 'Active' },
  { id: 'CUS-003', name: 'Sofia Rossi', email: 'sofia@nova.io', country: 'Italy', flag: '🇮🇹', spent: 980, orders: 4, joined: '2025-07-21', status: 'Inactive' },
  { id: 'CUS-004', name: 'Kenji Sato', email: 'kenji@nova.io', country: 'Japan', flag: '🇯🇵', spent: 6750, orders: 27, joined: '2024-11-09', status: 'Active' },
  { id: 'CUS-005', name: 'Mia Schmidt', email: 'mia@nova.io', country: 'Germany', flag: '🇩🇪', spent: 1540, orders: 6, joined: '2025-09-30', status: 'Active' },
  { id: 'CUS-006', name: 'Noah Brown', email: 'noah@nova.io', country: 'UK', flag: '🇬🇧', spent: 3200, orders: 13, joined: '2025-01-17', status: 'Inactive' },
  { id: 'CUS-007', name: 'Elena Petrova', email: 'elena@nova.io', country: 'Russia', flag: '🇷🇺', spent: 720, orders: 3, joined: '2026-01-05', status: 'Active' },
]

export const invoices: Invoice[] = [
  { id: 'INV-2026-101', client: 'Atlas Studio', amount: 4200, status: 'Paid', due: '2026-06-10' },
  { id: 'INV-2026-102', client: 'Bramble Co.', amount: 1850, status: 'Unpaid', due: '2026-07-02' },
  { id: 'INV-2026-103', client: 'Cobalt Labs', amount: 7600, status: 'Overdue', due: '2026-06-15' },
  { id: 'INV-2026-104', client: 'Driftwood Inc.', amount: 980, status: 'Paid', due: '2026-06-05' },
  { id: 'INV-2026-105', client: 'Echo Systems', amount: 3120, status: 'Unpaid', due: '2026-07-18' },
]

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Design sync', date: '2026-06-30', time: '10:00', type: 'meeting' },
  { id: 'e2', title: 'Q2 report due', date: '2026-06-30', time: '17:00', type: 'deadline' },
  { id: 'e3', title: 'Product launch — Nova 2.0', date: '2026-07-03', time: '09:00', type: 'launch' },
  { id: 'e4', title: 'Investor call', date: '2026-07-08', time: '14:30', type: 'meeting' },
  { id: 'e5', title: 'Renew domain', date: '2026-07-12', time: '00:00', type: 'reminder' },
  { id: 'e6', title: 'Team retro', date: '2026-07-17', time: '11:00', type: 'meeting' },
]

export const countryDemo = [
  { country: 'USA', flag: '🇺🇸', customers: 2379, percent: 79 },
  { country: 'France', flag: '🇫🇷', customers: 589, percent: 23 },
  { country: 'Japan', flag: '🇯🇵', customers: 412, percent: 16 },
]

export const recentActivity = [
  { id: 1, text: 'Kenji Sato placed a new order', time: '2m ago' },
  { id: 2, text: 'Invoice INV-2026-103 marked overdue', time: '18m ago' },
  { id: 3, text: 'Mia Schmidt updated billing address', time: '41m ago' },
  { id: 4, text: 'New customer Elena Petrova signed up', time: '1h ago' },
  { id: 5, text: 'Monthly target reached 75%', time: '3h ago' },
]
