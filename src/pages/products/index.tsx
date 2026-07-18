import React, { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, LayoutGrid, List, Star, Package, Plus, Edit3,
  Trash2, X, Check, MoreHorizontal, TrendingUp, ShoppingCart,
  AlertCircle, ChevronDown, Loader2, ExternalLink,
} from 'lucide-react'
import clsx from 'clsx'
import { toast } from 'sonner'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Field, Input, Textarea, Select } from '../../components/ui/Form'
import { products as initialProducts} from '../../data/mock'
import { Link } from 'react-router-dom'
import {Product} from "@/types";

const categories = ['All', 'Laptops', 'Smartphones', 'Audio', 'Wearables', 'Tablets', 'Monitors', 'Accessories']
const statuses = ['All', 'Active', 'Draft', 'Archived']
const EditDrawer: React.FC<{
  product: Product | null
  onClose: () => void
  onSave: (updated: Product) => void
}> = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState<Product | null>(product)
  const [saving, setSaving] = useState(false)

  React.useEffect(() => { setForm(product) }, [product])

  if (!form) return null

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 500))
    onSave(form)
    setSaving(false)
    onClose()
    toast.success(`"${form.name}" updated successfully.`)
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed right-0 inset-y-0 z-50 flex w-full max-w-lg flex-col shadow-2xl overflow-hidden"
            style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(20px)', borderLeft: '1px solid var(--border-alpha)' }}
          >
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border-alpha)' }}>
              <div>
                <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Edit Product</h2>
                <p className="text-xs text-slate-400 mt-0.5">SKU: {form.sku}</p>
              </div>
              <button onClick={onClose} className="focus-ring rounded-lg p-2 text-slate-400 hover:bg-base-700/40">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              <div className="relative overflow-hidden rounded-xl bg-base-800/40 h-48 flex items-center justify-center">
                <img src={form.image} alt={form.name}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-base-900/60 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="rounded-full bg-base-900/70 px-2.5 py-1 text-xs text-slate-300 backdrop-blur-sm">
                    {form.category}
                  </span>
                </div>
              </div>

              <Field label="Product Name">
                <Input value={form.name} onChange={e => setForm(f => f && ({ ...f, name: e.target.value }))} />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Price (USD)">
                  <Input type="number" value={form.price}
                    onChange={e => setForm(f => f && ({ ...f, price: Number(e.target.value) }))} />
                </Field>
                <Field label="Compare-at Price">
                  <Input type="number" value={form.compareAt ?? ''}
                    placeholder="—"
                    onChange={e => setForm(f => f && ({ ...f, compareAt: e.target.value ? Number(e.target.value) : null }))} />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Stock Quantity">
                  <Input type="number" value={form.stock}
                    onChange={e => setForm(f => f && ({ ...f, stock: Number(e.target.value) }))} />
                </Field>
                <Field label="Status">
                  <Select value={form.status}
                    onChange={e => setForm(f => f && ({ ...f, status: e.target.value as Product['status'] }))}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </Select>
                </Field>
              </div>

              <Field label="Category">
                <Select value={form.category}
                  onChange={e => setForm(f => f && ({ ...f, category: e.target.value }))}>
                  {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                </Select>
              </Field>

              <Field label="Short Description">
                <Input value={form.shortDesc}
                  onChange={e => setForm(f => f && ({ ...f, shortDesc: e.target.value }))} />
              </Field>

              <Field label="Full Description">
                <Textarea rows={4} value={form.description}
                  onChange={e => setForm(f => f && ({ ...f, description: e.target.value }))} />
              </Field>
            </div>

            <div className="p-5 border-t flex gap-3" style={{ borderColor: 'var(--border-alpha)' }}>
              <Button variant="outline" fullWidth onClick={onClose}>Cancel</Button>
              <Button fullWidth onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {saving ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

const DeleteModal: React.FC<{
  product: Product | null
  onClose: () => void
  onConfirm: () => void
}> = ({ product, onClose, onConfirm }) => (
  <AnimatePresence>
    {product && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="glass w-full max-w-sm rounded-2xl p-6 shadow-glass"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/15 text-rose-500 mb-4">
              <Trash2 className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">Delete product?</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">{product.name}</span> will be permanently removed. This action cannot be undone.
            </p>
            <div className="mt-5 flex gap-3">
              <Button variant="outline" fullWidth onClick={onClose}>Cancel</Button>
              <Button variant="danger" fullWidth onClick={onConfirm}>Delete</Button>
            </div>
          </motion.div>
        </div>
      </>
    )}
  </AnimatePresence>
)

const ProductCard: React.FC<{
  product: Product
  index: number
  onEdit: () => void
  onDelete: () => void
}> = ({ product, index, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      layout
      className="glass group relative rounded-xl2 shadow-glass overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden bg-base-800/40">
        <img
          src={product.image} alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const t = e.target as HTMLImageElement
            t.style.display = 'none'
            t.parentElement!.style.background = 'rgb(var(--c-700))'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-900/70 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge status={product.status} />
          {discount && (
            <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">
              -{discount}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-0.5 text-xs font-semibold text-white">
              <AlertCircle className="h-3 w-3" /> Out of stock
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="focus-ring flex h-7 w-7 items-center justify-center rounded-full bg-base-900/70 text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    className="glass absolute right-0 z-20 mt-1 w-36 rounded-xl p-1.5 shadow-glass"
                  >
                    <button onClick={() => { onEdit(); setMenuOpen(false) }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-base-700/40">
                      <Edit3 className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button onClick={() => { onDelete(); setMenuOpen(false) }}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-400/5">
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="p-4">
        <span className="text-xs font-medium text-accent-500">{product.category}</span>
        <h3 className="mt-0.5 font-medium text-slate-900 dark:text-slate-100 leading-snug line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-xs text-slate-400 line-clamp-2">{product.shortDesc}</p>

        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1 text-amber-500">
            <Star className="h-3.5 w-3.5 fill-current" /> {product.rating}
          </span>
          <span className="flex items-center gap-1">
            <ShoppingCart className="h-3.5 w-3.5" /> {product.sold.toLocaleString()} sold
          </span>
          <span className="flex items-center gap-1">
            <Package className="h-3.5 w-3.5" />
            {product.stock > 0 ? `${product.stock} left` : <span className="text-rose-500">Out</span>}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              ${product.price.toLocaleString()}
            </span>
            {product.compareAt && (
              <span className="ml-1.5 text-xs text-slate-400 line-through">${product.compareAt.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={onEdit}
            className="focus-ring flex items-center gap-1.5 rounded-lg border border-base-600 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-base-700/40 transition-colors"
          >
            <Edit3 className="h-3 w-3" /> Edit
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const ProductsPage: React.FC = () => {
  const [items, setItems] = useState<Product[]>(initialProducts)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [editTarget, setEditTarget] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock' | 'sold'>('name')
  const [sortAsc, setSortAsc] = useState(true)

  const filtered = useMemo(() => {
    let rows = items.filter(p => {
      const q = search.toLowerCase()
      return (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q))
        && (category === 'All' || p.category === category)
        && (statusFilter === 'All' || p.status === statusFilter)
    })
    rows = [...rows].sort((a, b) => {
      const av = a[sortBy], bv = b[sortBy]
      if (typeof av === 'number' && typeof bv === 'number') return sortAsc ? av - bv : bv - av
      return sortAsc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av))
    })
    return rows
  }, [items, search, category, statusFilter, sortBy, sortAsc])

  const handleSave = (updated: Product) => {
    setItems(prev => prev.map(p => p.id === updated.id ? updated : p))
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    const name = deleteTarget.name
    setItems(prev => prev.filter(p => p.id !== deleteTarget.id))
    setDeleteTarget(null)
    toast.success(`"${name}" has been deleted.`)
  }

  const totalValue = items.filter(p => p.status === 'Active').reduce((s, p) => s + p.price * p.stock, 0)

  const SortBtn: React.FC<{ field: typeof sortBy; label: string }> = ({ field, label }) => (
    <button
      onClick={() => { if (sortBy === field) setSortAsc(v => !v); else { setSortBy(field); setSortAsc(true) } }}
      className={clsx('focus-ring flex items-center gap-1 text-xs font-medium transition-colors',
        sortBy === field ? 'text-accent-500' : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-300')}
    >
      {label}
      {sortBy === field && <ChevronDown className={clsx('h-3 w-3 transition-transform', !sortAsc && 'rotate-180')} />}
    </button>
  )

  return (
    <div>
      <PageHeader
        title="Products"
        crumbs={['Catalog', 'Products']}
        action={
          <Link to="/forms/new-product">
            <Button><Plus className="h-4 w-4" /> Add Product</Button>
          </Link>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total Products', value: items.length, icon: Package, color: 'text-accent-500' },
          { label: 'Active', value: items.filter(p => p.status === 'Active').length, icon: Check, color: 'text-emerald-500' },
          { label: 'Out of Stock', value: items.filter(p => p.stock === 0).length, icon: AlertCircle, color: 'text-rose-500' },
          { label: 'Inventory Value', value: `$${(totalValue / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-amber-500', raw: true },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 shadow-glass">
            <s.icon className={clsx('h-5 w-5', s.color)} />
            <p className="mt-2 text-xs text-slate-500">{s.label}</p>
            <p className="font-display text-xl font-semibold text-slate-900 dark:text-white">
              {(s as any).raw ? s.value : s.value}
            </p>
          </motion.div>
        ))}
      </div>

      <Card noPad delay={0.05}>
        <div className="flex flex-wrap items-center gap-3 p-4 sm:p-5">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products, SKU…"
              className="focus-ring w-full rounded-lg border bg-base-800/40 py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-accent-400 transition-colors"
              style={{ borderColor: 'var(--border-alpha)', color: 'inherit' }}
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={clsx('focus-ring rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
                  category === c ? 'bg-accent-500 text-white' : 'text-slate-500 hover:bg-base-700/40'
                )}>{c}</button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="focus-ring rounded-lg border bg-base-800/40 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 transition-colors"
              style={{ borderColor: 'var(--border-alpha)' }}>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="flex rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border-alpha)' }}>
              <button onClick={() => setView('grid')}
                className={clsx('focus-ring p-1.5 transition-colors', view === 'grid' ? 'bg-accent-500 text-white' : 'text-slate-400 hover:bg-base-700/40')}>
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button onClick={() => setView('list')}
                className={clsx('focus-ring p-1.5 transition-colors', view === 'list' ? 'bg-accent-500 text-white' : 'text-slate-400 hover:bg-base-700/40')}>
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 px-5 pb-3 text-xs text-slate-400">
          <span>{filtered.length} products</span>
          <span>Sort by:</span>
          <SortBtn field="name" label="Name" />
          <SortBtn field="price" label="Price" />
          <SortBtn field="stock" label="Stock" />
          <SortBtn field="sold" label="Sold" />
        </div>
      </Card>

      {view === 'grid' && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i}
                onEdit={() => setEditTarget(p)}
                onDelete={() => setDeleteTarget(p)} />
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <Package className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
              <p className="mt-3 text-slate-400">No products match your filters.</p>
            </div>
          )}
        </div>
      )}

      {view === 'list' && (
        <Card className="mt-5" noPad delay={0.1}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase tracking-wider text-slate-500" style={{ borderColor: 'var(--border-alpha)' }}>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium hidden md:table-cell">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Stock</th>
                  <th className="px-5 py-3 font-medium hidden lg:table-cell">Sold</th>
                  <th className="px-5 py-3 font-medium hidden sm:table-cell">Rating</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <AnimatePresence mode="popLayout">
                <tbody>
                  {filtered.map((p, i) => (
                    <motion.tr key={p.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b hover:bg-base-700/20 transition-colors"
                      style={{ borderColor: 'var(--border-alpha)' }}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-base-700/40">
                            <img src={p.image} alt={p.name}
                              className="h-full w-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{p.name}</p>
                            <p className="text-xs text-slate-400">{p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell">{p.category}</td>
                      <td className="px-5 py-3.5">
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">${p.price.toLocaleString()}</span>
                          {p.compareAt && <span className="ml-1.5 text-xs text-slate-400 line-through">${p.compareAt.toLocaleString()}</span>}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        {p.stock === 0
                          ? <span className="text-rose-500 text-xs font-medium">Out of stock</span>
                          : <span className="text-slate-600 dark:text-slate-400">{p.stock}</span>
                        }
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 hidden lg:table-cell">{p.sold.toLocaleString()}</td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <span className="flex items-center gap-1 text-amber-500 text-xs">
                          <Star className="h-3 w-3 fill-current" /> {p.rating}
                          <span className="text-slate-400">({p.reviews})</span>
                        </span>
                      </td>
                      <td className="px-5 py-3.5"><Badge status={p.status} /></td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setEditTarget(p)}
                            className="focus-ring rounded-md p-1.5 text-slate-400 hover:bg-base-700/40 hover:text-accent-500 transition-colors">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button onClick={() => setDeleteTarget(p)}
                            className="focus-ring rounded-md p-1.5 text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-400/5 hover:text-rose-500 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
            {filtered.length === 0 && (
              <div className="py-20 text-center">
                <Package className="mx-auto h-10 w-10 text-slate-300 dark:text-slate-600" />
                <p className="mt-3 text-slate-400">No products match your filters.</p>
              </div>
            )}
          </div>
        </Card>
      )}

      <EditDrawer product={editTarget} onClose={() => setEditTarget(null)} onSave={handleSave} />

      <DeleteModal product={deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} />
    </div>
  )
}

export default ProductsPage
