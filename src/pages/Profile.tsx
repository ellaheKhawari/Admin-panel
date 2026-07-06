import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, MapPin, Mail, Phone, Globe, Check, Loader2 } from 'lucide-react'
import clsx from 'clsx'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Field, Input, Textarea } from '../components/ui/Form'
import { useAuth, type UserProfile } from '../context/AuthContext'

const tabs = ['Overview', 'Edit Profile', 'Security']

const Avatar: React.FC<{ user: UserProfile | null; size?: string }> = ({ user, size = 'h-24 w-24' }) => {
  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user?.name}
        className={clsx(size, 'rounded-2xl object-cover ring-4 ring-base-900 dark:ring-base-900')}
      />
    )
  }
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() ?? 'AM'
  return (
    <div className={clsx(size, 'flex items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-glow-cyan text-xl font-semibold text-white ring-4 ring-base-900 dark:ring-base-900')}>
      {initials}
    </div>
  )
}

const Profile: React.FC = () => {
  const { user, updateProfile, uploadAvatar } = useAuth()
  const [tab, setTab] = useState('Overview')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const avatarRef = useRef<HTMLInputElement>(null)

  // Edit form state synced from user
  const [form, setForm] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    location: user?.location ?? '',
    bio: user?.bio ?? '',
    website: user?.website ?? '',
  })

  // Sync when user loads (e.g. after /me refresh)
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        bio: user.bio,
        website: user.website,
      })
    }
  }, [user?.email])

  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  /* ── Avatar upload ───────────────────────────────────────────── */
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Resize & convert to base64
    const reader = new FileReader()
    reader.onload = async () => {
      // Resize using canvas to keep storage small
      const img = new Image()
      img.onload = async () => {
        const canvas = document.createElement('canvas')
        const maxSide = 256
        const scale = Math.min(maxSide / img.width, maxSide / img.height)
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
        await uploadAvatar(dataUrl)
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  /* ── Save profile ──────────────────────────────────────────────── */
  const handleSave = async () => {
    setSaving(true)
    await updateProfile(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  /* ── Change password ──────────────────────────────────────────── */
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    if (passwords.next !== passwords.confirm) { setPwError("New passwords don't match."); return }
    if (passwords.next.length < 8) { setPwError('Password must be at least 8 characters.'); return }
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600)) // simulate network
    setSaving(false)
    setPwSaved(true)
    setPasswords({ current: '', next: '', confirm: '' })
    setTimeout(() => setPwSaved(false), 2500)
  }

  return (
    <div>
      <PageHeader title="Profile" crumbs={['Account']} />

      {/* Cover + Avatar */}
      <Card delay={0} noPad>
        <div className="h-36 rounded-t-xl2 bg-gradient-to-r from-accent-600 via-accent-500 to-glow-cyan/60" />
        <div className="px-5 pb-6 sm:px-6">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="relative">
                <Avatar user={user} size="h-24 w-24" />
                <button
                  onClick={() => avatarRef.current?.click()}
                  className="focus-ring absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-white shadow-md hover:bg-accent-600 transition-colors"
                  title="Change photo"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
                <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
              <div className="pb-1">
                <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">
                  {user?.name ?? 'Loading...'}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user?.role}</p>
              </div>
            </div>
            <Button variant="outline">Message</Button>
          </div>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
            {user?.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 shrink-0" />{user.location}</span>}
            {user?.email && <span className="flex items-center gap-1.5"><Mail className="h-4 w-4 shrink-0" />{user.email}</span>}
            {user?.phone && <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 shrink-0" />{user.phone}</span>}
            {user?.website && <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 shrink-0" />{user.website}</span>}
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 border-b border-base-600">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={clsx(
                  'focus-ring relative px-4 py-2.5 text-sm font-medium transition-colors',
                  tab === t ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                )}
              >
                {t}
                {tab === t && (
                  <motion.span layoutId="profile-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Tab content */}
      <div className="mt-5">
        {tab === 'Overview' && (
          <div className="grid gap-5 lg:grid-cols-3">
            <Card className="lg:col-span-2" delay={0.05}>
              <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-white">About</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {user?.bio || 'No bio yet.'}
              </p>
              <div className="mt-5 grid grid-cols-3 gap-4 border-t border-base-600 pt-5 text-center">
                {[['Projects', '38'], ['Followers', '1.2K'], ['Following', '184']].map(([l, v]) => (
                  <div key={l}>
                    <p className="font-display text-xl font-semibold text-slate-900 dark:text-white">{v}</p>
                    <p className="text-xs text-slate-500">{l}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card delay={0.1}>
              <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-white">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['Figma', 'Tailwind', 'React', 'TypeScript', 'Motion Design', 'Design Systems'].map((s) => (
                  <span key={s} className="rounded-full bg-base-700/60 px-3 py-1 text-xs text-slate-700 dark:text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-5 border-t border-base-600 pt-4">
                <p className="mb-1 text-xs text-slate-500">Plan</p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-accent-500">
                  ✦ {user?.plan ?? 'Pro'}
                </span>
              </div>
            </Card>
          </div>
        )}

        {tab === 'Edit Profile' && (
          <Card delay={0}>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Edit Profile</h3>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400"
                >
                  <Check className="h-4 w-4" /> Changes saved
                </motion.span>
              )}
            </div>

            {/* Avatar in form */}
            <div className="mb-6 flex items-center gap-4">
              <Avatar user={{ ...DEFAULT_PLACEHOLDER, ...user, avatar: user?.avatar ?? null }} size="h-16 w-16" />
              <div>
                <Button variant="outline" onClick={() => avatarRef.current?.click()}>
                  <Camera className="h-4 w-4" /> Change Photo
                </Button>
                <p className="mt-1.5 text-xs text-slate-400">JPG or PNG, max 5MB. Resized to 256×256.</p>
                <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name">
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </Field>
              <Field label="Email">
                <Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
              </Field>
              <Field label="Phone">
                <Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
              </Field>
              <Field label="Location">
                <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />
              </Field>
              <Field label="Website">
                <Input value={form.website} onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Bio" hint="Brief description shown on your profile.">
                  <Textarea
                    rows={4}
                    value={form.bio}
                    onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => user && setForm({ name: user.name, email: user.email, phone: user.phone, location: user.location, bio: user.bio, website: user.website })}>
                Reset
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        )}

        {tab === 'Security' && (
          <Card delay={0}>
            <h3 className="mb-5 font-display text-lg font-semibold text-slate-900 dark:text-white">Change Password</h3>
            <form onSubmit={handleChangePassword}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Current Password">
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={passwords.current}
                    onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
                    required
                  />
                </Field>
                <div />
                <Field label="New Password">
                  <Input
                    type="password"
                    placeholder="Min. 8 characters"
                    value={passwords.next}
                    onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
                    required
                  />
                </Field>
                <Field label="Confirm New Password">
                  <Input
                    type="password"
                    placeholder="Same as above"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
                    required
                  />
                </Field>
              </div>
              {pwError && (
                <p className="mt-3 text-sm text-rose-500">{pwError}</p>
              )}
              {pwSaved && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Check className="h-4 w-4" /> Password updated successfully.
                </motion.p>
              )}
              <div className="mt-6 flex justify-end">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  Update Password
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  )
}

// used for form reset defaults while user loads
const DEFAULT_PLACEHOLDER = {
  id: '', name: 'Amir Moradi', email: 'amir@nova.io',
  phone: '', location: '', bio: '', role: 'Product Designer',
  website: '', joinedAt: '', language: 'en', timezone: 'cet',
  twoFactor: false, emailNotif: true, pushNotif: false, smsNotif: false, plan: 'Pro' as const,
}

export default Profile
