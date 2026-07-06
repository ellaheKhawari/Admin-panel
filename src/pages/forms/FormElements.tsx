import React, { useState } from 'react'
import { PageHeader } from '../../components/ui/PageHeader'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Field, Input, Textarea, Select, Checkbox, Toggle } from '../../components/ui/Form'

const FormElements: React.FC = () => {
  const [toggle1, setToggle1] = useState(true)
  const [toggle2, setToggle2] = useState(false)

  return (
    <div>
      <PageHeader title="Form Elements" crumbs={['Forms', 'Elements']} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Card delay={0}>
          <h3 className="mb-5 font-display text-lg font-semibold text-white">Input Fields</h3>
          <div className="space-y-5">
            <Field label="Text Input"><Input placeholder="Enter your name" /></Field>
            <Field label="Email" hint="We'll never share your email."><Input type="email" placeholder="you@example.com" /></Field>
            <Field label="Password"><Input type="password" placeholder="••••••••" /></Field>
            <Field label="Disabled"><Input disabled placeholder="Disabled field" /></Field>
          </div>
        </Card>

        <Card delay={0.05}>
          <h3 className="mb-5 font-display text-lg font-semibold text-white">Select & Textarea</h3>
          <div className="space-y-5">
            <Field label="Country">
              <Select defaultValue="de">
                <option value="de">Germany</option>
                <option value="us">United States</option>
                <option value="fr">France</option>
                <option value="ir">Iran</option>
              </Select>
            </Field>
            <Field label="Message"><Textarea rows={4} placeholder="Write your message..." /></Field>
          </div>
        </Card>

        <Card delay={0.1}>
          <h3 className="mb-5 font-display text-lg font-semibold text-white">Checkboxes & Radios</h3>
          <div className="space-y-3">
            <Checkbox label="Email notifications" defaultChecked />
            <Checkbox label="SMS notifications" />
            <Checkbox label="Marketing emails" defaultChecked />
          </div>
          <div className="mt-6 flex gap-6">
            {['Small', 'Medium', 'Large'].map((s, i) => (
              <label key={s} className="flex items-center gap-2 text-sm text-slate-300">
                <input type="radio" name="size" defaultChecked={i === 1} className="h-4 w-4 border-base-600 bg-base-800 text-accent-500" />
                {s}
              </label>
            ))}
          </div>
        </Card>

        <Card delay={0.15}>
          <h3 className="mb-5 font-display text-lg font-semibold text-white">Toggles & Buttons</h3>
          <div className="space-y-4">
            <Toggle checked={toggle1} onChange={setToggle1} label="Two-factor authentication" />
            <Toggle checked={toggle2} onChange={setToggle2} label="Public profile" />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default FormElements
