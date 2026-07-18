import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { AuthLayout } from './AuthLayout'
import { Field, Input, Checkbox } from '../../components/ui/Form'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const Login: React.FC = () => {
  const { fakeLogin } = useAuth()
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 4) {
      toast.error('Password too short', { description: 'Enter at least 4 characters.' })
      return
    }
    setLoading(true)
    try {
      await fakeLogin(email, password)
      const name = email.split('@')[0]
      toast.success(`Welcome back, ${name}! 👋`, {
        description: 'You have successfully signed in.',
      })
      navigate('/')
    } catch {
      toast.error('Sign in failed', { description: 'Please check your credentials and try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access your Nova dashboard.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email">
          <Input type="email" required placeholder="you@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password">
          <div className="relative">
            <Input type={show ? 'text' : 'password'} required placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} className="pr-10" />
            <button type="button" onClick={() => setShow((s) => !s)}
              className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </Field>
        <div className="flex items-center justify-between">
          <Checkbox label="Remember me" />
          <Link to="/auth/forgot-password" className="text-sm text-accent-500 hover:text-accent-400">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/auth/register" className="font-medium text-accent-500 hover:text-accent-400">Create one</Link>
      </p>
    </AuthLayout>
  )
}

export default Login
