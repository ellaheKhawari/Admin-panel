import React from 'react'
import { motion } from 'framer-motion'

export const AuthLayout: React.FC<{ children: React.ReactNode; title: string; subtitle: string }> = ({ children, title, subtitle }) => (
  <div className="flex min-h-screen bg-base-950">
    <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }} className="mx-auto w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-glow-cyan text-base font-bold text-base-950">N</div>
          <span className="font-display text-xl font-semibold text-white">Nova</span>
        </div>
        <h1 className="font-display text-2xl font-semibold text-white">{title}</h1>
        <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>
        <div className="mt-7">{children}</div>
      </motion.div>
    </div>

    <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-accent-700 via-accent-600 to-base-900 lg:block">
      <div className="absolute inset-0 bg-mesh-1" />
      <div className="relative flex h-full flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass w-full max-w-md rounded-xl2 p-6 shadow-glass"
        >
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Today's Revenue</span>
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs text-emerald-300">+12.4%</span>
          </div>
          <p className="mt-2 font-display text-3xl font-bold text-white">$48,290.00</p>
          <div className="mt-5 flex items-end gap-1.5">
            {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                className="w-full rounded-sm bg-gradient-to-t from-accent-400 to-glow-cyan"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </motion.div>
        <p className="mt-8 max-w-sm text-sm text-white/70">
          Run your entire operation from one calm, data-rich workspace built for fast-moving teams.
        </p>
      </div>
    </div>
  </div>
)
