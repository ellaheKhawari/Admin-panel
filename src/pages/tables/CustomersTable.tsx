import React, { useMemo, useState } from 'react'
import { Search, ArrowUpDown, MoreVertical } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { customers } from '../../data/mock'
import type { Customer } from '../../types'

const PAGE_SIZE = 5

const CustomersTable: React.FC = () => {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState<keyof Customer>('spent')
  const [asc, setAsc] = useState(false)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let rows = customers.filter(
      (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())
    )
    rows = [...rows].sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey]
      if (typeof av === 'number' && typeof bv === 'number') return asc ? av - bv : bv - av
      return asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
    return rows
  }, [query, sortKey, asc])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const Th: React.FC<{ label: string; sk: keyof Customer }> = ({ label, sk }) => (
    <th className="px-6 py-3 font-medium">
      <button
        onClick={() => { setSortKey(sk); setAsc(sortKey === sk ? !asc : true) }}
        className="focus-ring flex items-center gap-1 hover:text-slate-300"
      >
        {label} <ArrowUpDown className="h-3 w-3" />
      </button>
    </th>
  )

  return (
    <div>
      <PageHeader title="Customers" crumbs={['Tables', 'Customers']} />

      <Card noPad delay={0}>
        <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold text-white">All Customers ({filtered.length})</h3>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Search customers..."
              className="focus-ring w-56 rounded-lg border border-base-600 bg-base-800/60 py-2 pl-9 pr-3 text-sm text-slate-200 placeholder:text-slate-500 focus:border-accent-400"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-y border-base-600 text-xs uppercase tracking-wider text-slate-500">
                <Th label="Name" sk="name" />
                <th className="px-6 py-3 font-medium">Country</th>
                <Th label="Spent" sk="spent" />
                <Th label="Orders" sk="orders" />
                <th className="px-6 py-3 font-medium">Joined</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {pageRows.map((c) => (
                <tr key={c.id} className="border-b border-base-700/60 hover:bg-white/[0.03]">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-base-700 text-xs font-semibold text-slate-200">
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                      <div>
                        <p className="font-medium text-slate-200">{c.name}</p>
                        <p className="text-xs text-slate-500">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400">{c.flag} {c.country}</td>
                  <td className="px-6 py-3.5 text-slate-300">${c.spent.toLocaleString()}</td>
                  <td className="px-6 py-3.5 text-slate-400">{c.orders}</td>
                  <td className="px-6 py-3.5 text-slate-400">{c.joined}</td>
                  <td className="px-6 py-3.5"><Badge status={c.status} /></td>
                  <td className="px-6 py-3.5 text-right">
                    <button className="focus-ring rounded-lg p-1.5 text-slate-500 hover:bg-white/5">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-5 text-sm text-slate-400 sm:p-6">
          <span>Page {page} of {pages}</span>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="focus-ring rounded-lg border border-base-600 px-3 py-1.5 disabled:opacity-40">Prev</button>
            <button disabled={page === pages} onClick={() => setPage((p) => p + 1)} className="focus-ring rounded-lg border border-base-600 px-3 py-1.5 disabled:opacity-40">Next</button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default CustomersTable
