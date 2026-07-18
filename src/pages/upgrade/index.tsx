import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X, Zap, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import clsx from 'clsx'
import { useAuth } from '../../context/AuthContext'
import { PageHeader } from '../../components/ui/PageHeader'
import {PlanKey} from "@/types";
import {comparisonFeatures, plans} from "../../data/mock.ts";

const Cell: React.FC<{ value: boolean | string }> = ({ value }) => {
    if (typeof value === 'string') {
        return <span className="text-sm text-slate-700 dark:text-slate-300">{value}</span>
    }
    return value
        ? <Check className="mx-auto h-4 w-4 text-emerald-500" />
        : <X    className="mx-auto h-4 w-4 text-slate-300 dark:text-slate-600" />
}

const Upgrade: React.FC = () => {
    const { user, updateProfile } = useAuth()
    const [loading, setLoading] = useState<PlanKey | null>(null)

    const handleSelect = async (plan: PlanKey) => {
        if (plan === user?.plan) return

        if (plan === 'Enterprise') {
            toast.info('Connecting you with sales…', {
                description: 'Our team will reach out within 24 hours.',
            })
            return
        }

        setLoading(plan)
        await new Promise(r => setTimeout(r, 1200))
        await updateProfile({ plan })
        setLoading(null)

        toast.success(`Upgraded to ${plan}!`, {
            description: `Your plan has been changed to ${plan}. Enjoy the new features.`,
        })
    }

    return (
        <div className="pb-16">
            <PageHeader title="Upgrade Plan" crumbs={['Account', 'Upgrade']} />
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10 text-center"
            >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500/15 px-3 py-1 text-xs font-semibold text-accent-500">
          <Zap className="h-3.5 w-3.5" /> Unlock more power
        </span>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Simple, transparent pricing
                </h2>
                <p className="mt-2 text-slate-500 dark:text-slate-400">
                    Start free. Scale as you grow. Cancel any time.
                </p>
                {user?.plan && (
                    <p className="mt-1.5 text-sm text-slate-400">
                        You're currently on the{' '}
                        <span className="font-semibold text-accent-500">{user.plan}</span> plan.
                    </p>
                )}
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-3">
                {plans.map((plan, i) => {
                    const isCurrent = user?.plan === plan.key
                    const isLoading = loading === plan.key

                    return (
                        <motion.div
                            key={plan.key}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className={clsx(
                                'glass relative flex flex-col rounded-xl2 p-6 shadow-glass transition-shadow',
                                plan.key === 'Pro' && 'ring-2 ring-accent-500 shadow-glow',
                            )}
                        >
                            {/* Popular badge */}
                            {plan.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-500 px-3 py-0.5 text-[11px] font-bold text-white shadow-glow">
                  {plan.badge}
                </span>
                            )}

                            <div className={clsx(
                                'flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-white',
                                plan.color
                            )}>
                                <plan.icon className="h-5 w-5" />
                            </div>

                            <p className="mt-4 font-display text-lg font-semibold text-slate-900 dark:text-white">
                                {plan.label}
                            </p>
                            <div className="mt-1 flex items-end gap-1">
                <span className="font-display text-3xl font-bold text-slate-900 dark:text-white">
                  {plan.price}
                </span>
                                <span className="mb-1 text-sm text-slate-400">/{plan.period}</span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{plan.description}</p>

                            <ul className="my-6 flex-1 space-y-2.5">
                                {plan.features.map(f => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                disabled={isCurrent || isLoading}
                                onClick={() => handleSelect(plan.key)}
                                className={clsx(
                                    'focus-ring flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors',
                                    isCurrent
                                        ? 'cursor-default bg-base-700/60 text-slate-400'
                                        : plan.key === 'Pro'
                                            ? 'bg-accent-500 text-white hover:bg-accent-600 shadow-glow'
                                            : 'border border-base-600 text-slate-700 dark:text-slate-200 hover:bg-base-700/40'
                                )}
                            >
                                {isLoading ? (
                                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
                                    </svg>
                                ) : isCurrent ? (
                                    'Current Plan'
                                ) : (
                                    <>
                                        {plan.cta}
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </motion.button>
                        </motion.div>
                    )
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="mt-14"
            >
                <h3 className="mb-5 text-center font-display text-xl font-semibold text-slate-900 dark:text-white">
                    Full feature comparison
                </h3>

                <div className="glass overflow-hidden rounded-xl2 shadow-glass">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                            <tr className="border-b border-base-600">
                                <th className="px-5 py-3.5 text-sm font-medium text-slate-500">Feature</th>
                                {plans.map(p => (
                                    <th
                                        key={p.key}
                                        className={clsx(
                                            'px-5 py-3.5 text-center text-sm font-semibold',
                                            p.key === 'Pro'
                                                ? 'text-accent-500'
                                                : 'text-slate-700 dark:text-slate-300'
                                        )}
                                    >
                                        {p.label}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {comparisonFeatures.map((row, i) => (
                                <tr
                                    key={row.label}
                                    className={clsx(
                                        'border-b border-base-700/50 transition-colors hover:bg-white/[0.02]',
                                        i === comparisonFeatures.length - 1 && 'border-none'
                                    )}
                                >
                                    <td className="px-5 py-3 text-sm text-slate-600 dark:text-slate-400">
                                        {row.label}
                                    </td>
                                    <td className="px-5 py-3 text-center"><Cell value={row.free} /></td>
                                    <td className="px-5 py-3 text-center"><Cell value={row.pro} /></td>
                                    <td className="px-5 py-3 text-center"><Cell value={row.enterprise} /></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <p className="mt-4 text-center text-xs text-slate-500">
                    All plans include SSL encryption and GDPR compliance.
                    Need a custom plan?{' '}
                    <button
                        onClick={() => toast.info('Sales team notified', { description: 'We\'ll reach out within one business day.' })}
                        className="text-accent-500 hover:underline"
                    >
                        Contact us
                    </button>
                </p>
            </motion.div>
        </div>
    )
}

export default Upgrade