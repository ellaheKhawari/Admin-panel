import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MailCheck } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Field, Input } from '../../components/ui/Form'
import { Button } from '../../components/ui/Button'

const ForgotPassword: React.FC = () => {
  const [sent, setSent] = useState(false)

  return (
    <AuthLayout title="Reset your password" subtitle="Enter your email and we'll send you a reset link.">
      {!sent ? (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="space-y-5">
          <Field label="Email"><Input type="email" required placeholder="you@example.com" /></Field>
          <Button type="submit" fullWidth>Send Reset Link</Button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-5 text-center">
          <MailCheck className="mx-auto h-8 w-8 text-emerald-400" />
          <p className="mt-3 text-sm text-slate-300">Check your inbox — we sent a reset link.</p>
        </motion.div>
      )}
      <p className="mt-6 text-center text-sm text-slate-500">
        Remember your password? <Link to="/auth/login" className="text-accent-400 hover:text-accent-300">Sign in</Link>
      </p>
    </AuthLayout>
  )
}

export default ForgotPassword
