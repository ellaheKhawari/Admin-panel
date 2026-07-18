import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { User, Bell, CreditCard, Palette, Check, Loader2, Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Field, Input, Toggle, Select } from '../components/ui/Form'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const sections = [
  { key: 'general',      label: 'General',       icon: User },
  { key: 'notifications',label: 'Notifications', icon: Bell },
  { key: 'billing',      label: 'Billing',       icon: CreditCard },
  { key: 'appearance',   label: 'Appearance',    icon: Palette },
]

const Settings: React.FC = () => {
  const [active, setActive] = useState('general')
  const { dark, setDark } = useTheme()
  const { user, updateProfile } = useAuth()

  // ── Synced form state ──
  const [generalForm, setGeneralForm] = useState({
    name: user?.name ?? '', email: user?.email ?? '',
    language: user?.language ?? 'en', timezone: user?.timezone ?? 'cet',
  })
  const [notif, setNotif] = useState({
    email: user?.emailNotif ?? true,
    push:  user?.pushNotif  ?? false,
    sms:   user?.smsNotif   ?? false,
  })

  // ✅ Re-sync if user loads after mount (e.g. fresh login)
  useEffect(() => {
    if (!user) return
    setGeneralForm({ name: user.name, email: user.email, language: user.language, timezone: user.timezone })
    setNotif({ email: user.emailNotif, push: user.pushNotif, sms: user.smsNotif })
  }, [user?.email])

  const [saving, setSaving] = useState(false)

  const save = async (updates: Parameters<typeof updateProfile>[0], label: string) => {
    setSaving(true)
    await updateProfile(updates)
    setSaving(false)
    toast.success(label, { description: 'Your preferences have been saved.' })
  }

  return (
    <div>
      <PageHeader title="Settings" crumbs={['Account', 'Settings']} />
      <div className="grid gap-5 lg:grid-cols-4">

        {/* Sidebar nav */}
        <Card noPad delay={0} className="h-fit lg:col-span-1">
          <nav className="p-2">
            {sections.map((s) => (
              <button key={s.key} onClick={() => setActive(s.key)}
                className={clsx(
                  'focus-ring flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors',
                  active === s.key
                    ? 'bg-accent-500/15 text-accent-600 dark:text-accent-300'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-base-700/40'
                )}>
                <s.icon className="h-4 w-4 shrink-0" />{s.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Panel */}
        <Card className="lg:col-span-3" delay={0.05}>

          {/* ── General ── */}
          {active === 'general' && (
            <>
              <h3 className="mb-5 font-display text-lg font-semibold text-slate-900 dark:text-white">General Information</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <Input value={generalForm.name} onChange={e => setGeneralForm(f => ({ ...f, name: e.target.value }))} />
                </Field>
                <Field label="Email">
                  <Input type="email" value={generalForm.email} onChange={e => setGeneralForm(f => ({ ...f, email: e.target.value }))} />
                </Field>
                <Field label="Language">
                  <Select value={generalForm.language} onChange={e => setGeneralForm(f => ({ ...f, language: e.target.value }))}>
                    <option value="en">🇬🇧  English</option>
                    <option value="fa">🇮🇷  فارسی</option>
                    <option value="de">🇩🇪  Deutsch</option>
                    <option value="fr">🇫🇷  Français</option>
                    <option value="es">🇪🇸  Español</option>
                  </Select>
                </Field>
                <Field label="Timezone">
                  <Select value={generalForm.timezone} onChange={e => setGeneralForm(f => ({ ...f, timezone: e.target.value }))}>
                    <option value="irst">Iran Standard Time (UTC+3:30)</option>
                    <option value="cet">Central European (UTC+1)</option>
                    <option value="utc">UTC±0</option>
                    <option value="est">Eastern Time (UTC-5)</option>
                    <option value="pst">Pacific Time (UTC-8)</option>
                    <option value="jst">Japan Standard (UTC+9)</option>
                  </Select>
                </Field>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => save({ ...generalForm }, 'General settings saved')} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save Changes
                </Button>
              </div>
            </>
          )}

          {/* ── Notifications ── */}
          {active === 'notifications' && (
            <>
              <h3 className="mb-5 font-display text-lg font-semibold text-slate-900 dark:text-white">Notification Preferences</h3>
              <div className="divide-y divide-base-600">
                {[
                  { key: 'email' as const, label: 'Email notifications', desc: 'Receive order and account updates via email' },
                  { key: 'push'  as const, label: 'Push notifications',  desc: 'In-browser alerts for important events' },
                  { key: 'sms'   as const, label: 'SMS alerts',           desc: 'Critical alerts sent to your phone number' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
                      <p className="text-xs text-slate-400">{desc}</p>
                    </div>
                    <Toggle
                      checked={notif[key]}
                      onChange={(v) => setNotif(n => ({ ...n, [key]: v }))}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => save({ emailNotif: notif.email, pushNotif: notif.push, smsNotif: notif.sms }, 'Notification preferences saved')} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save Preferences
                </Button>
              </div>
            </>
          )}

          {/* ── Billing ── */}
          {active === 'billing' && (
            <>
              <h3 className="mb-5 font-display text-lg font-semibold text-slate-900 dark:text-white">Billing & Plan</h3>
              <div className="rounded-xl border border-accent-500/30 bg-accent-500/8 p-5">
                <p className="text-xs text-slate-500">Current Plan</p>
                <p className="mt-1 font-display text-2xl font-semibold text-slate-900 dark:text-white">
                  {user?.plan} — {user?.plan === 'Pro' ? '$29/mo' : user?.plan === 'Enterprise' ? '$99/mo' : 'Free'}
                </p>
                <p className="mt-1 text-sm text-slate-400">Next renewal: July 24, 2026</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { name: 'Free', price: '$0', features: '5 pages, 1 user' },
                  { name: 'Pro',  price: '$29/mo', features: 'Unlimited pages, analytics' },
                  { name: 'Enterprise', price: '$99/mo', features: 'SSO, audit logs, SLA' },
                ].map(p => (
                  <div key={p.name} className={clsx(
                    'rounded-xl border p-4 text-center transition-colors cursor-pointer',
                    user?.plan === p.name
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-base-600 hover:border-accent-400/50'
                  )}>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{p.name}</p>
                    <p className="mt-1 font-display text-lg font-bold text-accent-500">{p.price}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{p.features}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                <Button variant="outline" onClick={() => toast.info('Redirecting to billing portal...')}>Change Plan</Button>
                <Button variant="danger" onClick={() => toast.error('Subscription canceled', { description: 'Your plan will end at the billing period.' })}>Cancel Subscription</Button>
              </div>
            </>
          )}

          {/* ── Appearance ── */}
          {active === 'appearance' && (
            <>
              <h3 className="mb-5 font-display text-lg font-semibold text-slate-900 dark:text-white">Appearance</h3>

              {/* Theme selector */}
              <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Color theme</p>
              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { label: 'Dark',    bg: '#0a0e17', textColor: 'text-slate-200', isDark: true },
                  { label: 'Light',   bg: '#f0f4ff', textColor: 'text-slate-800', isDark: false },
                ].map((t) => (
                  <motion.button
                    key={t.label}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setDark(t.isDark)
                      toast.success(`${t.label} theme applied`, { description: 'Your preference has been saved.' })
                    }}
                    className={clsx(
                      'focus-ring relative flex flex-col items-start gap-2 overflow-hidden rounded-xl border p-4 transition-all',
                      dark === t.isDark ? 'border-accent-500 shadow-glow' : 'border-base-600 hover:border-accent-400/50'
                    )}
                    style={{ background: t.bg }}
                  >
                    <div className="flex gap-1.5">
                      {['bg-accent-500', 'bg-glow-cyan', 'bg-glow-coral'].map(c => (
                        <span key={c} className={clsx('h-3 w-3 rounded-full', c)} />
                      ))}
                    </div>
                    <div className="space-y-1 w-full">
                      <div className={clsx('h-2 w-2/3 rounded-full opacity-80', t.isDark ? 'bg-slate-200' : 'bg-slate-700')} />
                      <div className={clsx('h-1.5 w-full rounded-full opacity-40', t.isDark ? 'bg-slate-400' : 'bg-slate-500')} />
                      <div className={clsx('h-1.5 w-4/5 rounded-full opacity-40', t.isDark ? 'bg-slate-400' : 'bg-slate-500')} />
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className={clsx('text-xs font-semibold', t.textColor)}>{t.label}</span>
                      {dark === t.isDark && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-500">
                          <Check className="h-3 w-3 text-white" />
                        </span>
                      )}
                    </div>
                    {t.isDark ? <Moon className="absolute right-3 top-3 h-4 w-4 text-slate-400 opacity-50" /> : <Sun className="absolute right-3 top-3 h-4 w-4 text-slate-500 opacity-50" />}
                  </motion.button>
                ))}
              </div>

              <div className="border-t border-base-600 pt-5">
                <p className="mb-3 text-sm font-medium text-slate-700 dark:text-slate-300">Quick toggle</p>
                <Toggle
                  label={dark ? 'Dark mode is ON' : 'Light mode is ON'}
                  checked={dark}
                  onChange={(v) => {
                    setDark(v)
                    toast.success(`${v ? 'Dark' : 'Light'} mode activated`)
                  }}
                />
              </div>
            </>
          )}

        </Card>
      </div>
    </div>
  )
}

export default Settings
