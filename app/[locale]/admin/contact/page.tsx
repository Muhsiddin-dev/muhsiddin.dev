'use client'

import { FormEvent, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Check, Save } from 'lucide-react'
import { PageHeader } from '@/components/Admin/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContentStore } from '@/hooks/use-content-store'
import type { PersonalInfo } from '@/types/types'

export default function ContactAdminPage() {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'tj'
  const { personal, savePersonal } = useContentStore()
  const [form, setForm] = useState<PersonalInfo>(personal)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(personal)
  }, [personal])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    savePersonal(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const setField =
    (key: keyof PersonalInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = key === 'age' ? Number(e.target.value) || 0 : e.target.value
      setForm((f) => ({ ...f, [key]: value }))
    }

  return (
    <div>
      <PageHeader
        title="Тамос"
        description="Email, шабакаҳои иҷтимоӣ ва ҷойгиршавиро навсозӣ кунед"
        locale={lang}
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-5 rounded-2xl border border-border bg-card/80 p-5 shadow-sm md:p-7"
      >
        <div className="flex justify-end">
          <Button type="submit" size="sm">
            {saved ? <Check className="size-4" /> : <Save className="size-4" />}
            {saved ? 'Захира шуд' : 'Захира'}
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={setField('email')} required />
          </div>
          <div>
            <Label>Website</Label>
            <Input value={form.website} onChange={setField('website')} />
          </div>
          <div>
            <Label>Telegram</Label>
            <Input value={form.telegram} onChange={setField('telegram')} placeholder="https://t.me/..." />
          </div>
          <div>
            <Label>GitHub</Label>
            <Input value={form.github} onChange={setField('github')} placeholder="https://github.com/..." />
          </div>
          <div>
            <Label>LinkedIn</Label>
            <Input value={form.linkedin} onChange={setField('linkedin')} placeholder="https://linkedin.com/in/..." />
          </div>
          <div>
            <Label>Instagram</Label>
            <Input value={form.instagram} onChange={setField('instagram')} placeholder="https://instagram.com/..." />
          </div>
          <div>
            <Label>Шаҳр</Label>
            <Input value={form.city} onChange={setField('city')} />
          </div>
          <div>
            <Label>Кишвар</Label>
            <Input value={form.country} onChange={setField('country')} />
          </div>
          <div>
            <Label>Синну сол</Label>
            <Input type="number" value={form.age} onChange={setField('age')} min={1} />
          </div>
        </div>
      </form>
    </div>
  )
}
