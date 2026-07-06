import React from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

export const Skeleton: React.FC<Props> = ({ className, rounded = 'md' }) => {
  const r = { sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' }[rounded]
  return <div className={clsx('skeleton', r, className)} />
}

export const SkeletonCard: React.FC = () => (
  <div className="glass rounded-xl2 p-5 shadow-glass">
    <div className="flex items-center gap-3">
      <Skeleton className="h-11 w-11" rounded="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-32" />
      </div>
    </div>
    <Skeleton className="mt-4 h-2 w-full" />
    <Skeleton className="mt-2 h-2 w-4/5" />
  </div>
)

export const SkeletonRow: React.FC = () => (
  <div className="flex items-center gap-4 border-b border-base-700/60 px-6 py-3.5">
    <Skeleton className="h-9 w-9" rounded="lg" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-3 w-40" />
      <Skeleton className="h-2.5 w-24" />
    </div>
    <Skeleton className="h-3 w-16" />
    <Skeleton className="h-6 w-20" rounded="full" />
  </div>
)

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="glass rounded-xl2 shadow-glass">
    <div className="p-5">
      <Skeleton className="h-6 w-40" />
    </div>
    <div className="border-t border-base-700/60">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  </div>
)

export const SkeletonDashboard: React.FC = () => (
  <div className="space-y-5 animate-fade-up">
    {/* Stat cards */}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
    {/* Charts row */}
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="glass rounded-xl2 p-5 shadow-glass lg:col-span-2">
        <Skeleton className="mb-1 h-5 w-36" />
        <Skeleton className="mb-4 h-3 w-24" />
        <Skeleton className="h-64 w-full" rounded="lg" />
      </div>
      <div className="glass rounded-xl2 p-5 shadow-glass">
        <Skeleton className="mb-4 h-5 w-32" />
        <Skeleton className="mx-auto h-48 w-48" rounded="full" />
        <div className="mt-4 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
        </div>
      </div>
    </div>
    {/* Table */}
    <SkeletonTable rows={4} />
  </div>
)

/** Thin animated progress bar shown during page transitions */
export const LoadingBar: React.FC<{ show: boolean }> = ({ show }) => {
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    if (!show) { setWidth(0); return }
    setWidth(20)
    const t1 = setTimeout(() => setWidth(60), 100)
    const t2 = setTimeout(() => setWidth(80), 400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [show])

  if (!show && width === 0) return null

  return (
    <div
      className="loading-bar transition-all duration-500"
      style={{ width: show ? `${width}%` : '100%', opacity: show ? 1 : 0 }}
    />
  )
}
