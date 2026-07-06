import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

type Variant = 'primary' | 'ghost' | 'outline' | 'danger'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  fullWidth?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent-500 text-white keep-white hover:bg-accent-600 shadow-glow',
  ghost: 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-base-700/40',
  outline: 'bg-transparent border border-base-600 text-slate-700 dark:text-slate-200 hover:bg-base-700/40',
  danger: 'bg-rose-500 text-white keep-white hover:bg-rose-600',
}

export const Button: React.FC<Props> = ({ children, className, variant = 'primary', fullWidth, ...rest }) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    className={clsx(
      'focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200',
      variants[variant],
      fullWidth && 'w-full',
      className
    )}
    {...(rest as any)}
  >
    {children}
  </motion.button>
)
