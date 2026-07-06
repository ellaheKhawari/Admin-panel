import React, { useState } from 'react'
import clsx from 'clsx'
import { User, Bell, CreditCard, Palette, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Field, Input, Toggle, Select } from '../components/ui/Form'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const sections = [
  { key: 'general', label: 'General', icon: User },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'billing', label: 'Billing', icon: CreditCard },
  { key: 'appearance', label: 'Appearance', icon: Palette },
]

const Settings: React.FC = () => {
  const [active, setActive] = useState('general')
  const { dark, toggleDark } = useTheme()
  const { user, updateProfile } = useAuth()

  const [generalForm, setGeneralForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    language: user?.language ?? 'en',
    timezone: user?.timezone ?? 'cet',
  })

  const [notif, setNotif] = useState({
    email: user?.emailNotif ?? true,
    push: user?.pushNotif ?? false,
    sms: user?.smsNotif ?? false,
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState('')

  const save = async (updates: Parameters<typeof updateProfile>[0], key: string) => {
    setSaving(true)
    await updateProfile(updates)
    setSaving(false)
    setSaved(key)
    setTimeout(() => setSaved(''), 2500)
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
                )}
              >
                <s.icon className="h-4 w-4 shrink-0" /> {s.label}
              </button>
            ))}
          </nav>
        </Card>

        {/* Panel */}
        <Card className="lg:col-span-3" delay={0.05}>
          {/* General */}
          {active === 'general' && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">General Information</h3>
                {saved === 'general' && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                    <Check className="h-4 w-4" /> Saved
                  </motion.span>
                )}
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <Input value={generalForm.name} onChange={(e) => setGeneralForm((f) => ({ ...f, name: e.target.value }))} />
                </Field>
                <Field label="Email">
                  <Input type="email" value={generalForm.email} onChange={(e) => setGeneralForm((f) => ({ ...f, email: e.target.value }))} />
                </Field>
                <Field label="Language">
                  <Select value={generalForm.language} onChange={(e) => setGeneralForm((f) => ({ ...f, language: e.target.value }))}>
                    <option value="en">English</option>
                    <option value="fa">فارسی</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                  </Select>
                </Field>
                <Field label="Timezone">
                  <Select value={generalForm.timezone} onChange={(e) => setGeneralForm((f) => ({ ...f, timezone: e.target.value }))}>
                    <option value="cet">Central European Time</option>
                    <option value="utc">UTC</option>
                    <option value="pst">Pacific Time</option>
                    <option value="irst">Iran Standard Time</option>
                  </Select>
                </Field>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => save({ ...generalForm }, 'general')} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Save Changes
                </Button>
              </div>
            </>
          )}

          {/* Notifications */}
          {active === 'notifications' && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Notification Preferences</h3>
                {saved === 'notif' && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                    <Check className="h-4 w-4" /> Saved
                  </motion.span>
                )}
              </div>
              <div className="space-y-4">
                <Toggle label="Email notifications" checked={notif.email} onChange={(v) => setNotif((n) => ({ ...n, email: v }))} />
                <Toggle label="Push notifications" checked={notif.push} onChange={(v) => setNotif((n) => ({ ...n, push: v }))} />
                <Toggle label="SMS alerts" checked={notif.sms} onChange={(v) => setNotif((n) => ({ ...n, sms: v }))} />
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => save({ emailNotif: notif.email, pushNotif: notif.push, smsNotif: notif.sms }, 'notif')} disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Save Preferences
                </Button>
              </div>
            </>
          )}

          {/* Billing */}
          {active === 'billing' && (
            <>
              <h3 className="mb-5 font-display text-lg font-semibold text-slate-900 dark:text-white">Billing & Plan</h3>
              <div className="rounded-xl border border-accent-500/30 bg-accent-500/8 p-5">
                <p className="text-sm text-slate-500 dark:text-slate-400">Current Plan</p>
                <p className="mt-1 font-display text-2xl font-semibold text-slate-900 dark:text-white">
                  {user?.plan} — {user?.plan === 'Pro' ? '$29/mo' : user?.plan === 'Enterprise' ? '$99/mo' : 'Free'}
                </p>
                <p className="mt-1 text-sm text-slate-400">Renews on July 24, 2026</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="outline">Change Plan</Button>
                <Button variant="danger">Cancel Subscription</Button>
              </div>
            </>
          )}

          {/* Appearance */}
          {active === 'appearance' && (
            <>
              <h3 className="mb-5 font-display text-lg font-semibold text-slate-900 dark:text-white">Appearance</h3>
              <div className="space-y-5">
                <Toggle label="Dark mode" checked={dark} onChange={toggleDark} />
                <p className="text-xs text-slate-400">Switch between light and dark interface themes.</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    { label: 'Dark', bg: '#0a0e17' },
                    { label: 'Light', bg: '#f0f4ff' },
                    { label: 'Midnight', bg: '#050810' },
                  ].map((t) => (
                    <button key={t.label} className="focus-ring flex items-center gap-2.5 rounded-xl border border-base-600 p-3 hover:border-accent-400 transition-colors">
                      <span className="h-5 w-5 rounded-full border border-white/10" style={{ background: t.bg }} />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Settings
