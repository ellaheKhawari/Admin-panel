import React, { useState } from 'react'
import { Download, Filter } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { invoices } from '../../data/mock'

const filters = ['All', 'Paid', 'Unpaid', 'Overdue']

const InvoicesTable: React.FC = () => {
  const [active, setActive] = useState('All')
  const rows = invoices.filter((i) => active === 'All' || i.status === active)
  const total = rows.reduce((s, r) => s + r.amount, 0)

  return (
    <div>
      <PageHeader
        title="Invoices"
        crumbs={['Tables', 'Invoices']}
        action={<Button variant="outline"><Download className="h-4 w-4" /> Export CSV</Button>}
      />

      <Card noPad delay={0}>
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`focus-ring rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  active === f ? 'bg-accent-500 text-white' : 'text-slate-400 hover:bg-white/5'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-400">Total: <span className="font-semibold text-white">${total.toLocaleString()}</span></p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-base-600 text-xs uppercase tracking-wider text-slate-500">
                <th className="px-6 py-3 font-medium">Invoice</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Due Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((inv) => (
                <tr key={inv.id} className="border-b border-base-700/60 hover:bg-white/[0.03]">
                  <td className="px-6 py-3.5 font-mono text-xs text-slate-400">{inv.id}</td>
                  <td className="px-6 py-3.5 font-medium text-slate-200">{inv.client}</td>
                  <td className="px-6 py-3.5 text-slate-300">${inv.amount.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-slate-400">{inv.due}</td>
                  <td className="px-6 py-3.5"><Badge status={inv.status} /></td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-500">No invoices found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default InvoicesTable
