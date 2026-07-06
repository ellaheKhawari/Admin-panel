import React from 'react'
import clsx from 'clsx'

const styles: Record<string, string> = {
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/20',
  Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/20',
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-400 dark:border-emerald-400/20',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/20',
  Unpaid: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-400 dark:border-amber-400/20',
  Canceled: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-400 dark:border-rose-400/20',
  Overdue: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-400/10 dark:text-rose-400 dark:border-rose-400/20',
  Inactive: 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-400/10 dark:text-slate-400 dark:border-slate-400/20',
}

export const Badge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
      styles[status] ?? 'bg-slate-100 text-slate-500 border-slate-200'
    )}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-current" />
    {status}
  </span>
)
