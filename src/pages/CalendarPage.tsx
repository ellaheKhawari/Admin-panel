import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import clsx from 'clsx'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { calendarEvents } from '../data/mock'

const typeColor: Record<string, string> = {
  meeting: 'bg-accent-500',
  deadline: 'bg-rose-500',
  reminder: 'bg-amber-500',
  launch: 'bg-emerald-500',
}
const CalendarPage: React.FC = () => {
  const [cursor, setCursor] = useState(new Date(2026, 5, 1))
  const [selected, setSelected] = useState('2026-06-30')
  const grid = useMemo(() => {
    const year = cursor.getFullYear()
    const month = cursor.getMonth()
    const first = new Date(year, month, 1)
    const startOffset = first.getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells: { date: string; day: number; inMonth: boolean }[] = []
    for (let i = 0; i < startOffset; i++) cells.push({ date: '', day: 0, inMonth: false })
    for (let d = 1; d <= daysInMonth; d++) {
      const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      cells.push({ date, day: d, inMonth: true })
    }
    return cells
  }, [cursor])
  const eventsFor = (date: string) => calendarEvents.filter((e) => e.date === date)
  const selectedEvents = eventsFor(selected)

  return (
    <div>
      <PageHeader
        title="Calendar"
        crumbs={['Schedule']}
        action={<Button><Plus className="h-4 w-4" /> New Event</Button>}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2" delay={0}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-white">
              {cursor.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex gap-1.5">
              <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="focus-ring rounded-lg p-1.5 hover:bg-white/5">
                <ChevronLeft className="h-4 w-4 text-slate-400" />
              </button>
              <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="focus-ring rounded-lg p-1.5 hover:bg-white/5">
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-500">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {grid.map((c, i) => {
              const evts = c.inMonth ? eventsFor(c.date) : []
              return (
                <button
                  key={i}
                  disabled={!c.inMonth}
                  onClick={() => setSelected(c.date)}
                  className={clsx(
                    'focus-ring flex aspect-square flex-col items-center justify-start gap-1 rounded-lg p-1.5 text-sm transition-colors',
                    !c.inMonth && 'invisible',
                    c.inMonth && c.date === selected && 'bg-accent-500 text-white',
                    c.inMonth && c.date !== selected && 'text-slate-300 hover:bg-white/5'
                  )}
                >
                  <span>{c.day}</span>
                  <span className="flex gap-0.5">
                    {evts.slice(0, 3).map((e) => (
                      <span key={e.id} className={clsx('h-1.5 w-1.5 rounded-full', typeColor[e.type])} />
                    ))}
                  </span>
                </button>
              )
            })}
          </div>
        </Card>

        <Card delay={0.1}>
          <h3 className="font-display text-lg font-semibold text-white">
            {selected ? new Date(selected).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Select a day'}
          </h3>
          <p className="mb-4 text-sm text-slate-500">{selectedEvents.length} event(s)</p>
          <AnimatePresence mode="wait">
            <motion.div key={selected} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {selectedEvents.length === 0 && (
                <p className="rounded-lg border border-dashed border-base-600 p-6 text-center text-sm text-slate-500">
                  No events scheduled.
                </p>
              )}
              {selectedEvents.map((e) => (
                <div key={e.id} className="flex items-start gap-3 rounded-lg border border-base-700 p-3">
                  <span className={clsx('mt-1 h-2 w-2 shrink-0 rounded-full', typeColor[e.type])} />
                  <div>
                    <p className="text-sm font-medium text-slate-200">{e.title}</p>
                    <p className="text-xs text-slate-500">{e.time} · {e.type}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 border-t border-base-600 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Upcoming</p>
            <ul className="space-y-3">
              {calendarEvents.slice(0, 4).map((e) => (
                <li key={e.id} className="flex items-center gap-2.5 text-sm">
                  <span className={clsx('h-1.5 w-1.5 rounded-full', typeColor[e.type])} />
                  <span className="flex-1 text-slate-300">{e.title}</span>
                  <span className="text-xs text-slate-500">{e.date.slice(5)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default CalendarPage
