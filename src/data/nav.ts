import type { NavItem } from '../types'

export const nav: { section: string; items: NavItem[] }[] = [
  {
    section: 'Overview',
    items: [
      { label: 'Dashboard', to: '/', icon: 'LayoutGrid' },
      { label: 'E-commerce', to: '/ecommerce', icon: 'ShoppingCart' },
      { label: 'Calendar', to: '/calendar', icon: 'Calendar' },
      { label: 'Profile', to: '/profile', icon: 'User' },
    ],
  },
  {
    section: 'Content',
    items: [
      { label: 'Tables', icon: 'Table2', children: [
        { label: 'Customers', to: '/tables/customers' },
        { label: 'Invoices', to: '/tables/invoices' },
      ]},
      { label: 'Forms', icon: 'ClipboardList', children: [
        { label: 'Form Elements', to: '/forms/elements' },
        { label: 'New Product', to: '/forms/new-product' },
      ]},
      { label: 'Charts', icon: 'BarChart3', children: [
        { label: 'Line & Bar', to: '/charts/basic' },
        { label: 'Pie & Radial', to: '/charts/pie' },
      ]},
    ],
  },
  {
    section: 'Account',
    items: [
      { label: 'Settings', to: '/settings', icon: 'Settings' },
    ],
  },
]
