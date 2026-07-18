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
    section: 'Catalog',
    items: [
      {
        label: 'Products', icon: 'Package', children: [
          { label: 'All Products', to: '/products' },
          { label: 'Add Product', to: '/forms/new-product' },
        ],
      },
      {
        label: 'Tables', icon: 'Table2', children: [
          { label: 'Customers', to: '/tables/customers' },
          { label: 'Invoices', to: '/tables/invoices' },
        ],
      },
    ],
  },
  {
    section: 'Content',
    items: [
      {
        label: 'Forms', icon: 'ClipboardList', children: [
          { label: 'Form Elements', to: '/forms/elements' },
        ],
      },
      {
        label: 'Charts', icon: 'BarChart3', children: [
          { label: 'Line & Bar', to: '/charts/basic' },
          { label: 'Pie & Radial', to: '/charts/pie' },
        ],
      },
    ],
  },
  {
    section: 'Account',
    items: [
      { label: 'Settings', to: '/settings', icon: 'Settings' },
    ],
  },
]
