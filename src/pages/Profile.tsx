import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, MapPin, Mail, Phone, Globe, Check, Loader2, Send, X, MessageCircle } from 'lucide-react'
import clsx from 'clsx'
import { toast } from 'sonner'
import { PageHeader } from '../components/ui/PageHeader'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Field, Input, Textarea } from '../components/ui/Form'
import { useAuth } from '../context/AuthContext'
import {Msg} from "@/types";
import {INIT_MSGS} from "@/data/mock.ts";

const resizeImage = (file: File, maxSide = 512): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(maxSide / img.width, maxSide / img.height, 1)
        const canvas = document.createElement('canvas')
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
const Avatar: React.FC<{ src: string | null; name: string; size?: string }> = ({ src, name, size = 'h-24 w-24' }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  if (src) return <img src={src} alt={name} className={clsx(size, 'rounded-2xl object-cover ring-4 ring-white dark:ring-base-900')} />
  return (
    <div className={clsx(size, 'flex items-center justify-center rounded-2xl bg-gradient-to-br from-accent-400 to-glow-cyan text-xl font-semibold text-white ring-4 ring-white dark:ring-base-900')}>
      {initials}
    </div>
  )
}
const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const MessagePanel: React.FC<{ open: boolean; onClose: () => void; contactName: string }> = ({ open, onClose, contactName }) => {
  const [msgs, setMsgs] = useState<Msg[]>(INIT_MSGS)
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  const handleSend = async () => {
    const text = draft.trim()
    if (!text) return
    setSending(true)
    setDraft('')
    const myMsg: Msg = { id: Date.now(), from: 'me', text, time: now() }
    setMsgs(prev => [...prev, myMsg])
    await new Promise(r => setTimeout(r, 1200))
    const replies = [
      'Got it! I\'ll look into that right away.',
      'Sounds great, let\'s sync up soon! 📅',
      'Totally agree. I\'ve been thinking the same thing.',
      'Interesting perspective! I\'ll need to think on it.',
      'Can you share the Figma link so I can take a look?',
    ]
    const reply: Msg = {
      id: Date.now() + 1,
      from: 'them',
      text: replies[Math.floor(Math.random() * replies.length)],
      time: now(),
    }
    setMsgs(prev => [...prev, reply])
    setSending(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 z-50 bg-black/40" />
          <motion.aside
            key="panel"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 inset-y-0 z-50 flex w-full max-w-sm flex-col shadow-2xl"
            style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px)', borderLeft: '1px solid var(--border-alpha)' }}
          >
            <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--border-alpha)' }}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-glow-cyan text-sm font-bold text-white">
                {contactName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{contactName}</p>
                <span className="flex items-center gap-1.5 text-xs text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-soft" /> Online
                </span>
              </div>
              <button onClick={onClose} className="focus-ring rounded-lg p-1.5 text-slate-400 hover:bg-base-700/40">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22 }}
                  className={clsx('flex flex-col', m.from === 'me' ? 'items-end' : 'items-start')}
                >
                  <div className={clsx(
                    'max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    m.from === 'me'
                      ? 'rounded-br-sm bg-accent-500 text-white'
                      : 'rounded-bl-sm bg-base-700/60 text-slate-900 dark:text-slate-100'
                  )}>
                    {m.text}
                  </div>
                  <p className="mt-1 px-1 text-[10px] text-slate-400">{m.time}</p>
                </motion.div>
              ))}
              {sending && (
                <div className="flex items-start">
                  <div className="rounded-2xl rounded-bl-sm bg-base-700/60 px-3.5 py-3">
                    <div className="flex gap-1">
                      {[0,1,2].map(i => (
                        <motion.span key={i} animate={{ y: [0,-4,0] }} transition={{ repeat: Infinity, delay: i*0.15, duration: 0.6 }}
                          className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t p-4" style={{ borderColor: 'var(--border-alpha)' }}>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type a message..."
                  className="focus-ring flex-1 rounded-xl border border-base-600 bg-base-800/40 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-accent-400"
                />
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={handleSend}
                  disabled={!draft.trim() || sending}
                  className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500 text-white disabled:opacity-40 hover:bg-accent-600 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-slate-500">Press Enter to send</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

const TABS = ['Overview', 'Edit Profile', 'Security']

const Profile: React.FC = () => {
  const { user, updateProfile, uploadAvatar, uploadBanner } = useAuth()
  const [tab, setTab] = useState('Overview')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const avatarRef = useRef<HTMLInputElement>(null)
  const bannerRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', bio: '', website: '',
  })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, phone: user.phone, location: user.location, bio: user.bio, website: user.website })
  }, [user?.email])

  const handleImageUpload = async (file: File | undefined, type: 'avatar' | 'banner') => {
    if (!file) return
    try {
      const dataUrl = await resizeImage(file, type === 'banner' ? 1200 : 256)
      if (type === 'avatar') {
        await uploadAvatar(dataUrl)
        toast.success('Profile photo updated', { description: 'Your avatar has been changed.' })
      } else {
        await uploadBanner(dataUrl)
        toast.success('Cover photo updated', { description: 'Your banner has been changed.' })
      }
    } catch {
      toast.error('Upload failed', { description: 'Could not process the image. Try a different file.' })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    await updateProfile(form)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
    toast.success('Profile saved', { description: 'Your changes have been applied.' })
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwError('')
    if (passwords.next !== passwords.confirm) { setPwError("New passwords don't match."); return }
    if (passwords.next.length < 8) { setPwError('Minimum 8 characters required.'); return }
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    setSaving(false)
    setPwSaved(true)
    setPasswords({ current: '', next: '', confirm: '' })
    setTimeout(() => setPwSaved(false), 2500)
    toast.success('Password changed', { description: 'Your new password is active.' })
  }

  return (
    <>
      <MessagePanel open={chatOpen} onClose={() => setChatOpen(false)} contactName={user?.name ?? 'Amir Moradi'} />
      <div>
        <PageHeader title="Profile" crumbs={['Account']} />

        <Card delay={0} noPad>
          <div className="relative h-40 overflow-hidden rounded-t-xl2">
            {user?.bannerImage
              ? <img src={user.bannerImage} alt="Cover" className="h-full w-full object-cover" />
              : <div className="h-full w-full bg-gradient-to-r from-accent-600 via-accent-500 to-glow-cyan/60" />
            }
            <button
              onClick={() => bannerRef.current?.click()}
              className="focus-ring absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
            >
              <Camera className="h-3.5 w-3.5" /> Change Cover
            </button>
            <input ref={bannerRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => handleImageUpload(e.target.files?.[0], 'banner')} />
          </div>

          <div className="px-5 pb-6 sm:px-6">
            <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <Avatar src={user?.avatar ?? null} name={user?.name ?? 'AM'} size="h-24 w-24" />
                  <button
                    onClick={() => avatarRef.current?.click()}
                    className="focus-ring absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-white shadow-md hover:bg-accent-600 transition-colors"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                  <input ref={avatarRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files?.[0], 'avatar')} />
                </div>
                <div className="pb-1">
                  <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">{user?.name}</h2>
                  <p className="text-sm text-slate-500">{user?.role}</p>
                </div>
              </div>
              <Button onClick={() => setChatOpen(true)}>
                <MessageCircle className="h-4 w-4" /> Message
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
              {user?.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 shrink-0" />{user.location}</span>}
              {user?.email    && <span className="flex items-center gap-1.5"><Mail className="h-4 w-4 shrink-0" />{user.email}</span>}
              {user?.phone    && <span className="flex items-center gap-1.5"><Phone className="h-4 w-4 shrink-0" />{user.phone}</span>}
              {user?.website  && <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 shrink-0" />{user.website}</span>}
            </div>

            <div className="mt-6 flex gap-1 border-b border-base-600">
              {TABS.map((t) => (
                <button key={t} onClick={() => setTab(t)}
                  className={clsx('focus-ring relative px-4 py-2.5 text-sm font-medium transition-colors',
                    tab === t ? 'text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300')}>
                  {t}
                  {tab === t && <motion.span layoutId="ptab" className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-500" />}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="mt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>

              {tab === 'Overview' && (
                <div className="grid gap-5 lg:grid-cols-3">
                  <Card className="lg:col-span-2" delay={0}>
                    <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-white">About</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{user?.bio || 'No bio yet.'}</p>
                    <div className="mt-5 grid grid-cols-3 gap-4 border-t border-base-600 pt-5 text-center">
                      {[['Projects', '38'], ['Followers', '1.2K'], ['Following', '184']].map(([l, v]) => (
                        <div key={l}>
                          <p className="font-display text-xl font-semibold text-slate-900 dark:text-white">{v}</p>
                          <p className="text-xs text-slate-500">{l}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card delay={0.05}>
                    <h3 className="mb-3 font-display text-lg font-semibold text-slate-900 dark:text-white">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Figma', 'Tailwind', 'React', 'TypeScript', 'Motion Design', 'Design Systems'].map((s) => (
                        <span key={s} className="rounded-full bg-base-700/60 px-3 py-1 text-xs text-slate-600 dark:text-slate-300">{s}</span>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-base-600 pt-4">
                      <p className="mb-1.5 text-xs text-slate-500">Current Plan</p>
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
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                        <Check className="h-4 w-4" /> Saved
                      </motion.span>
                    )}
                  </div>

                  <div className="mb-6 flex items-center gap-4">
                    <Avatar src={user?.avatar ?? null} name={user?.name ?? 'AM'} size="h-16 w-16" />
                    <div>
                      <Button variant="outline" onClick={() => avatarRef.current?.click()}>
                        <Camera className="h-4 w-4" /> Change Photo
                      </Button>
                      <p className="mt-1 text-xs text-slate-400">JPG or PNG. Resized to 256×256 automatically.</p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full Name"><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></Field>
                    <Field label="Email"><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></Field>
                    <Field label="Phone"><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></Field>
                    <Field label="Location"><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></Field>
                    <Field label="Website"><Input value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} /></Field>
                    <div className="sm:col-span-2">
                      <Field label="Bio" hint="Short description shown on your public profile.">
                        <Textarea rows={4} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
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
                        <Input type="password" placeholder="••••••••" value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))} required />
                      </Field>
                      <div />
                      <Field label="New Password">
                        <Input type="password" placeholder="Min. 8 characters" value={passwords.next} onChange={e => setPasswords(p => ({ ...p, next: e.target.value }))} required />
                      </Field>
                      <Field label="Confirm New Password">
                        <Input type="password" placeholder="Same as above" value={passwords.confirm} onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))} required />
                      </Field>
                    </div>
                    {pwError && <p className="mt-3 text-sm text-rose-500">{pwError}</p>}
                    {pwSaved && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                        <Check className="h-4 w-4" /> Password updated.
                      </motion.p>
                    )}
                    <div className="mt-6 flex justify-end">
                      <Button type="submit" disabled={saving}>
                        {saving && <Loader2 className="h-4 w-4 animate-spin" />} Update Password
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default Profile
