import React, { useRef, useState } from 'react'
import { UploadCloud, X } from 'lucide-react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Field, Input, Textarea, Select } from '../../components/ui/Form'

const NewProduct: React.FC = () => {
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [saved, setSaved] = useState(false)

  return (
    <div>
      <PageHeader title="New Product" crumbs={['Forms', 'New Product']} />

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2" delay={0}>
          <h3 className="mb-5 font-display text-lg font-semibold text-white">Product Information</h3>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Product Name"><Input placeholder="e.g. MacBook Pro 14&quot;" /></Field>
            <Field label="SKU"><Input placeholder="MBP-14-2026" /></Field>
            <Field label="Category">
              <Select defaultValue="">
                <option value="" disabled>Select category</option>
                <option>Laptop</option>
                <option>Smartphone</option>
                <option>Accessories</option>
                <option>Audio</option>
              </Select>
            </Field>
            <Field label="Price (USD)"><Input type="number" placeholder="0.00" /></Field>
            <Field label="Description" hint="Minimum 40 characters."><Textarea rows={4} className="sm:col-span-2" placeholder="Describe the product..." /></Field>
          </div>
        </Card>

        <div className="space-y-5">
          <Card delay={0.05}>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">Product Image</h3>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); setFileName(e.dataTransfer.files[0]?.name ?? null) }}
              onClick={() => inputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                dragOver ? 'border-accent-400 bg-accent-500/5' : 'border-base-600'
              }`}
            >
              <UploadCloud className="h-8 w-8 text-slate-500" />
              <p className="text-sm text-slate-300">Click or drag to upload</p>
              <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </div>
            {fileName && (
              <div className="mt-3 flex items-center justify-between rounded-lg border border-base-600 px-3 py-2 text-sm text-slate-300">
                <span className="truncate">{fileName}</span>
                <button onClick={() => setFileName(null)} className="focus-ring text-slate-500 hover:text-rose-400">
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </Card>

          <Card delay={0.1}>
            <h3 className="mb-4 font-display text-lg font-semibold text-white">Inventory</h3>
            <div className="space-y-4">
              <Field label="Stock Quantity"><Input type="number" placeholder="100" /></Field>
              <Field label="Status">
                <Select defaultValue="active">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </Select>
              </Field>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3">
        {saved && <span className="text-sm text-emerald-400">Product saved ✓</span>}
        <Button variant="outline">Save as Draft</Button>
        <Button onClick={() => setSaved(true)}>Publish Product</Button>
      </div>
    </div>
  )
}

export default NewProduct
