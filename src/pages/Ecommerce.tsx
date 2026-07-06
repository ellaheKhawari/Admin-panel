import React from 'react'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, TrendingUp } from 'lucide-react'
import { PageHeader, StatCard } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { orders } from '../data/mock'

const products = [
  { name: 'MacBook Pro 14"', price: 2399, rating: 4.9, sold: 320, emoji: '💻', tag: 'Best seller' },
  { name: 'Apple Watch Ultra', price: 879, rating: 4.7, sold: 210, emoji: '⌚', tag: 'Trending' },
  { name: 'iPhone 16 Pro Max', price: 1869, rating: 4.8, sold: 540, emoji: '📱', tag: 'Best seller' },
  { name: 'AirPods Pro 3', price: 240, rating: 4.6, sold: 980, emoji: '🎧', tag: 'New' },
]

const Ecommerce: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="E-commerce"
        crumbs={['Store']}
        action={<Button><ShoppingCart className="h-4 w-4" /> Add Product</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Total Sales" value={48290} prefix="$" delta={14.2} delay={0} />
        <StatCard icon={<ShoppingCart className="h-5 w-5" />} label="Orders" value={5359} delta={-3.1} delay={0.05} />
        <StatCard icon={<Star className="h-5 w-5" />} label="Avg. Rating" value={5} delta={1.4} delay={0.1} />
      </div>

      <h3 className="mt-7 mb-4 font-display text-lg font-semibold text-white">Top Products</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="glass group rounded-xl2 p-5 shadow-glass transition-shadow hover:shadow-glow"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-base-700 text-2xl">{p.emoji}</span>
              <span className="rounded-full bg-accent-500/15 px-2.5 py-1 text-[11px] font-medium text-accent-300">{p.tag}</span>
            </div>
            <p className="mt-4 font-medium text-slate-100">{p.name}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-amber-400">
              <Star className="h-3.5 w-3.5 fill-current" /> {p.rating} <span className="text-slate-500">· {p.sold} sold</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-white">${p.price.toLocaleString()}</span>
              <button className="focus-ring rounded-lg bg-base-700 px-3 py-1.5 text-xs font-medium text-slate-200 opacity-0 transition-opacity group-hover:opacity-100">
                View
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="mt-7" delay={0.1} noPad>
        <div className="flex items-center justify-between p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-white">All Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-base-600 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-base-700/60 hover:bg-white/[0.03]">
                  <td className="px-6 py-3.5 font-mono text-xs text-slate-400">{o.id}</td>
                  <td className="flex items-center gap-3 px-6 py-3.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-base-700 text-base">{o.image}</span>
                    <span className="text-slate-200">{o.product}</span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400">{o.date}</td>
                  <td className="px-6 py-3.5 text-slate-300">${o.price.toLocaleString()}</td>
                  <td className="px-6 py-3.5"><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Ecommerce
