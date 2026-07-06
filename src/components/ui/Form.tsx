import React from 'react'
import clsx from 'clsx'

export const Field: React.FC<{ label?: string; hint?: string; children: React.ReactNode }> = ({ label, hint, children }) => (
  <label className="block">
    {label && (
      <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
    )}
    {children}
    {hint && <span className="mt-1 block text-xs text-slate-400 dark:text-slate-500">{hint}</span>}
  </label>
)

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...rest }) => (
  <input
    className={clsx(
      'focus-ring w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors',
      'bg-base-800/40 border-base-600',
      'text-slate-900 dark:text-slate-100',
      'placeholder:text-slate-400 dark:placeholder:text-slate-500',
      'focus:border-accent-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    {...rest}
  />
)

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...rest }) => (
  <textarea
    className={clsx(
      'focus-ring w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors resize-none',
      'bg-base-800/40 border-base-600',
      'text-slate-900 dark:text-slate-100',
      'placeholder:text-slate-400 dark:placeholder:text-slate-500',
      'focus:border-accent-400',
      className
    )}
    {...rest}
  />
)

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...rest }) => (
  <select
    className={clsx(
      'focus-ring w-full rounded-lg border px-3.5 py-2.5 text-sm transition-colors',
      'bg-base-800/40 border-base-600',
      'text-slate-900 dark:text-slate-100',
      'focus:border-accent-400',
      className
    )}
    {...rest}
  >
    {children}
  </select>
)

export const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, className, ...rest }) => (
  <label className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
    <input
      type="checkbox"
      className={clsx('focus-ring h-4 w-4 rounded border-base-600 bg-base-800 accent-accent-500', className)}
      {...rest}
    />
    {label}
  </label>
)

export const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label?: string }> = ({ checked, onChange, label }) => (
  <div className="flex items-center justify-between gap-3">
    {label && <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>}
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={clsx(
        'focus-ring relative h-6 w-11 rounded-full transition-colors duration-300',
        checked ? 'bg-accent-500' : 'bg-base-600'
      )}
    >
      <span
        className={clsx(
          'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300',
          checked && 'translate-x-5'
        )}
      />
    </button>
  </div>
)
