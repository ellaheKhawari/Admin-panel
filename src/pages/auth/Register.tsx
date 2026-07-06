import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { AuthLayout } from './AuthLayout'
import { Field, Input, Checkbox } from '../../components/ui/Form'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../context/AuthContext'

const Register: React.FC = () => {
  const { fakeRegister } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fakeRegister(`${form.firstName} ${form.lastName}`, form.email, form.password)
    navigate('/')
  }

  return (
    <AuthLayout title="Create your account" subtitle="Start your 14-day free trial — no card required.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name">
            <Input required placeholder="Amir" value={form.firstName} onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))} />
          </Field>
          <Field label="Last Name">
            <Input required placeholder="Moradi" value={form.lastName} onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))} />
          </Field>
        </div>
        <Field label="Email">
          <Input type="email" required placeholder="you@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
        </Field>
        <Field label="Password">
          <Input type="password" required placeholder="Min. 8 characters" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
        </Field>
        <Checkbox label="I agree to the Terms of Service and Privacy Policy" required />
        <Button type="submit" fullWidth disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/auth/login" className="text-accent-500 hover:text-accent-400 font-medium">Sign in</Link>
      </p>
    </AuthLayout>
  )
}

export default Register
