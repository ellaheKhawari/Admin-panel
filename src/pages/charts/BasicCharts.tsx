import React from 'react'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { monthly } from '../../data/mock'

const axisProps = { tick: { fill: '#64748b', fontSize: 12 }, axisLine: false, tickLine: false }
const tooltipStyle = { background: '#10172a', border: '1px solid #1c2542', borderRadius: 10, fontSize: 12 }

const BasicCharts: React.FC = () => (
  <div>
    <PageHeader title="Line & Bar Charts" crumbs={['Charts', 'Basic']} />
    <div className="grid gap-5 lg:grid-cols-2">
      <Card delay={0}>
        <h3 className="mb-1 font-display text-lg font-semibold text-white">Sales vs Target</h3>
        <p className="mb-4 text-sm text-slate-500">Monthly comparison</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly}>
              <CartesianGrid vertical={false} stroke="#1c2542" />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="sales" stroke="#6e5bff" strokeWidth={2.5} dot={false} name="Sales" animationDuration={900} />
              <Line type="monotone" dataKey="target" stroke="#3fe0d0" strokeWidth={2.5} strokeDasharray="5 4" dot={false} name="Target" animationDuration={900} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card delay={0.05}>
        <h3 className="mb-1 font-display text-lg font-semibold text-white">Revenue Bars</h3>
        <p className="mb-4 text-sm text-slate-500">In thousands ($)</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly} barCategoryGap="30%">
              <CartesianGrid vertical={false} stroke="#1c2542" />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(110,91,255,0.08)' }} />
              <Bar dataKey="revenue" fill="#ffb454" radius={[6, 6, 0, 0]} maxBarSize={26} animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="lg:col-span-2" delay={0.1}>
        <h3 className="mb-1 font-display text-lg font-semibold text-white">Area Trend</h3>
        <p className="mb-4 text-sm text-slate-500">Cumulative growth across the year</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthly}>
              <defs>
                <linearGradient id="basicArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff6b6b" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#ff6b6b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#1c2542" />
              <XAxis dataKey="month" {...axisProps} />
              <YAxis {...axisProps} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="sales" stroke="#ff6b6b" strokeWidth={2.5} fill="url(#basicArea)" animationDuration={1000} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </div>
)

export default BasicCharts
