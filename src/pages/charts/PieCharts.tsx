import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis, Legend } from 'recharts'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { trafficSources } from '../../data/mock'

const tooltipStyle = { background: '#10172a', border: '1px solid #1c2542', borderRadius: 10, fontSize: 12 }

const radialData = [
  { name: 'Customer Satisfaction', value: 86, fill: '#6e5bff' },
]

const PieCharts: React.FC = () => (
  <div>
    <PageHeader title="Pie & Radial Charts" crumbs={['Charts', 'Pie']} />
    <div className="grid gap-5 lg:grid-cols-2">
      <Card delay={0}>
        <h3 className="mb-1 font-display text-lg font-semibold text-white">Traffic Sources</h3>
        <p className="mb-4 text-sm text-slate-500">Breakdown by channel</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={trafficSources} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={3} animationDuration={900}>
                {trafficSources.map((s) => <Cell key={s.name} fill={s.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card delay={0.05}>
        <h3 className="mb-1 font-display text-lg font-semibold text-white">Satisfaction Score</h3>
        <p className="mb-4 text-sm text-slate-500">Based on last 500 responses</p>
        <div className="relative h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart innerRadius="75%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background={{ fill: '#1c2542' }} dataKey="value" cornerRadius={20} animationDuration={1000} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold text-white">86%</span>
            <span className="mt-1 text-xs text-slate-500">Very satisfied</span>
          </div>
        </div>
      </Card>

      <Card className="lg:col-span-2" delay={0.1}>
        <h3 className="mb-4 font-display text-lg font-semibold text-white">Source Breakdown</h3>
        <div className="grid gap-4 sm:grid-cols-4">
          {trafficSources.map((s) => (
            <div key={s.name} className="rounded-xl border border-base-700 p-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-sm text-slate-300">{s.name}</span>
              </div>
              <p className="mt-2 font-display text-2xl font-semibold text-white">{s.value}%</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
)

export default PieCharts
