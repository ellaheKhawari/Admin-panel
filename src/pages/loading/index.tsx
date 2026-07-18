import React from 'react'
import { motion } from 'framer-motion'

const Loading: React.FC = () => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center"
    style={{ background: 'var(--body-bg)' }}>

    {/* Ambient glow blobs */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-glow-cyan/8 blur-3xl" />
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col items-center gap-6"
    >
      {/* Spinning ring + logo */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        {/* Outer spinning ring */}
        <motion.svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 80 80"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="40" cy="40" r="36" fill="none" stroke="url(#ringGrad)" strokeWidth="3"
            strokeLinecap="round" strokeDasharray="80 146" />
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6e5bff" />
              <stop offset="100%" stopColor="#3fe0d0" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Inner slower ring */}
        <motion.svg
          className="absolute inset-2 h-16 w-16"
          viewBox="0 0 64 64"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="32" cy="32" r="28" fill="none"
            stroke="rgba(110,91,255,0.2)" strokeWidth="2"
            strokeLinecap="round" strokeDasharray="20 120" />
        </motion.svg>

        {/* Nova logo center */}
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-glow-cyan text-lg font-bold text-white shadow-glow">
          N
        </div>
      </div>

      {/* Brand name */}
      <div className="flex flex-col items-center gap-1.5">
        <motion.p
          className="font-display text-xl font-semibold text-slate-900 dark:text-white"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          Nova
        </motion.p>

        {/* Animated dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent-500"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  </div>
)

export default Loading
