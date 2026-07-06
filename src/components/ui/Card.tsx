import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

type Props = React.HTMLAttributes<HTMLDivElement> & {
  delay?: number
  noPad?: boolean
}

export const Card: React.FC<Props> = ({ children, className, delay = 0, noPad, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    className={clsx(
      'glass rounded-xl2 shadow-glass',
      !noPad && 'p-5 sm:p-6',
      className
    )}
    {...(rest as any)}
  >
    {children}
  </motion.div>
)
