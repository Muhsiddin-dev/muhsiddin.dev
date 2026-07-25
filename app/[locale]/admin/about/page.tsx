'use client'

import { FormEvent, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Check, Save } from 'lucide-react'
import { LangTabs, type LangTab } from '@/components/Admin/LangTabs'
import { PageHeader } from '@/components/Admin/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useContentStore } from '@/hooks/use-content-store'

export default function AboutAdminPage() {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'tj'
  const { personal, savePersonal } = useContentStore()
  const [langTab, setLangTab] = useState<LangTab>('tj')
  
  const [form, setForm] = useState(personal)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    savePersonal(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader
        title="Дар бораи ман"
        description="Биография, нақш ва маълумоти таҳсилотро таҳрир кунед"
        locale={lang}
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-5 rounded-2xl border border-border bg-card/80 p-5 shadow-sm md:p-7"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <LangTabs value={langTab} onChange={setLangTab} />
          <Button type="submit" size="sm">
            {saved ? <Check className="size-4" /> : <Save className="size-4" />}
            {saved ? 'Захира шуд' : 'Захира'}
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Ном ({langTab.toUpperCase()})</Label>
            <Input
              value={form[`name_${langTab}`]}
              onChange={(e) => setForm((f) => ({ ...f, [`name_${langTab}`]: e.target.value }))}
              required
            />
          </div>
          <div>
            <Label>Насаб ({langTab.toUpperCase()})</Label>
            <Input
              value={form[`surname_${langTab}`]}
              onChange={(e) => setForm((f) => ({ ...f, [`surname_${langTab}`]: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <Label>Нақш / Role ({langTab.toUpperCase()})</Label>
          <Input
            value={form[`role_${langTab}`]}
            onChange={(e) => setForm((f) => ({ ...f, [`role_${langTab}`]: e.target.value }))}
            required
          />
        </div>

        <div>
          <Label>Дар бораи ман ({langTab.toUpperCase()})</Label>
          <Textarea
            className="min-h-36"
            value={form[`summary_${langTab}`]}
            onChange={(e) => setForm((f) => ({ ...f, [`summary_${langTab}`]: e.target.value }))}
            required
          />
        </div>

        <div>
          <Label>Таҳсилот ({langTab.toUpperCase()})</Label>
          <Input
            value={form[`education_${langTab}`]}
            onChange={(e) => setForm((f) => ({ ...f, [`education_${langTab}`]: e.target.value }))}
            required
          />
        </div>

        <div>
          <Label>Сурати профил (URL)</Label>
          <Input
            value={form.photo_url ?? ''}
            onChange={(e) => setForm((f) => ({ ...f, photo_url: e.target.value || null }))}
            placeholder="/Img1-Admin.jpg"
          />
        </div>
      </form>
    </div>
  )
}