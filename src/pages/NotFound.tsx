import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { Button } from '../components/ui/Button'

const NotFound: React.FC = () => (
  <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <Compass className="mx-auto h-14 w-14 text-accent-400" />
      <h1 className="mt-6 font-display text-5xl font-bold text-white">404</h1>
      <p className="mt-2 text-slate-400">This page drifted off the map.</p>
      <Link to="/"><Button className="mt-6">Back to Dashboard</Button></Link>
    </motion.div>
  </div>
)

export default NotFound
