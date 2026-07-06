import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ArrowUp, ArrowDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export const PageHeader: React.FC<{ title: string; crumbs: string[]; action?: React.ReactNode }> = ({ title, crumbs, action }) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
        <Link to="/" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Home</Link>
        {crumbs.map((c, i) => (
          <React.Fragment key={i}>
            <ChevronRight className="h-3 w-3" />
            <span className={i === crumbs.length - 1 ? 'text-slate-600 dark:text-slate-300' : ''}>{c}</span>
          </React.Fragment>
        ))}
      </div>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
    </div>
    {action}
  </div>
)

const useCountUp = (target: number, duration = 900) => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    let start: number | null = null
    let raf: number
    const step = (t: number) => {
      if (start === null) start = t
      const progress = Math.min((t - start) / duration, 1)
      setValue(Math.floor(progress * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return value
}

export const StatCard: React.FC<{
  icon: React.ReactNode
  label: string
  value: number
  prefix?: string
  delta: number
  delay?: number
}> = ({ icon, label, value, prefix = '', delta, delay = 0 }) => {
  const count = useCountUp(value)
  const positive = delta >= 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-xl2 p-5 shadow-glass"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-500/15 text-accent-500">
        {icon}
      </div>
      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <div className="mt-1 flex items-end justify-between">
        <p className="font-display text-2xl font-semibold text-slate-900 dark:text-white">
          {prefix}{count.toLocaleString()}
        </p>
        <span className={clsx(
          'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
          positive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400'
                   : 'bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400'
        )}>
          {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {Math.abs(delta)}%
        </span>
      </div>
    </motion.div>
  )
}
