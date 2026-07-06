import React from 'react'
import { Users, ShoppingBag, DollarSign, Activity, MoreHorizontal } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import { PageHeader, StatCard } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { monthly, orders, countryDemo, recentActivity } from '../data/mock'

const Dashboard: React.FC = () => {
  return (
    <div>
      <PageHeader title="Dashboard" crumbs={['Overview']} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users className="h-5 w-5" />} label="Customers" value={3782} delta={11.01} delay={0} />
        <StatCard icon={<ShoppingBag className="h-5 w-5" />} label="Orders" value={5359} delta={-9.05} delay={0.05} />
        <StatCard icon={<DollarSign className="h-5 w-5" />} label="Revenue" value={84290} prefix="$" delta={6.4} delay={0.1} />
        <StatCard icon={<Activity className="h-5 w-5" />} label="Active Sessions" value={912} delta={3.2} delay={0.15} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2" delay={0.1}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold text-white">Monthly Sales</h3>
              <p className="text-sm text-slate-500">Units sold per month, 2026</p>
            </div>
            <button className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-white/5">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthly} barCategoryGap="28%">
                <CartesianGrid vertical={false} stroke="#1c2542" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#10172a', border: '1px solid #1c2542', borderRadius: 10, fontSize: 12 }}
                  cursor={{ fill: 'rgba(110,91,255,0.08)' }}
                />
                <Bar dataKey="sales" fill="#6e5bff" radius={[6, 6, 0, 0]} maxBarSize={28} animationDuration={900} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card delay={0.15}>
          <h3 className="font-display text-lg font-semibold text-white">Monthly Target</h3>
          <p className="text-sm text-slate-500">Goal you've set for June</p>
          <div className="relative mt-2 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: 75.5, fill: '#6e5bff' }]} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background={{ fill: '#1c2542' }} dataKey="value" cornerRadius={20} animationDuration={1000} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-bold text-white">75.5%</span>
              <span className="mt-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-400">+10%</span>
            </div>
          </div>
          <p className="text-center text-sm text-slate-400">
            You earned <span className="font-medium text-white">$3,287</span> today, higher than last month.
          </p>
          <div className="mt-4 grid grid-cols-3 divide-x divide-base-600 border-t border-base-600 pt-4 text-center">
            {[['Target', '$20K'], ['Revenue', '$20K'], ['Today', '$20K']].map(([l, v]) => (
              <div key={l}>
                <p className="text-xs text-slate-500">{l}</p>
                <p className="mt-1 text-sm font-semibold text-white">{v}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2" delay={0.2}>
          <h3 className="font-display text-lg font-semibold text-white">Statistics</h3>
          <p className="text-sm text-slate-500">Revenue trend across the year</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6e5bff" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#6e5bff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#1c2542" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#10172a', border: '1px solid #1c2542', borderRadius: 10, fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" stroke="#6e5bff" strokeWidth={2.5} fill="url(#rev)" animationDuration={1000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card delay={0.25}>
          <h3 className="font-display text-lg font-semibold text-white">Customers Demographic</h3>
          <p className="mb-4 text-sm text-slate-500">By country</p>
          <div className="space-y-4">
            {countryDemo.map((c) => (
              <div key={c.country}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-300">
                    <span>{c.flag}</span>{c.country}
                  </span>
                  <span className="text-slate-500">{c.customers.toLocaleString()}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-500 to-glow-cyan transition-all duration-700"
                    style={{ width: `${c.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-base-600 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Recent Activity</p>
            <ul className="space-y-3">
              {recentActivity.slice(0, 3).map((a) => (
                <li key={a.id} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                  <span className="text-slate-300">{a.text}<span className="ml-1.5 text-xs text-slate-500">· {a.time}</span></span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>

      <Card className="mt-5" delay={0.3} noPad>
        <div className="flex items-center justify-between p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-white">Recent Orders</h3>
          <button className="focus-ring rounded-lg border border-base-600 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/5">
            See all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-base-600 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="border-b border-base-700/60 transition-colors hover:bg-white/[0.03]">
                  <td className="flex items-center gap-3 px-6 py-3.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-base-700 text-base">{o.image}</span>
                    <div>
                      <p className="font-medium text-slate-200">{o.product}</p>
                      <p className="text-xs text-slate-500">{o.variant}</p>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400">{o.category}</td>
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

export default Dashboard
