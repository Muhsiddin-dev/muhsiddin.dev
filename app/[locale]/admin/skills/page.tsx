'use client'

import { FormEvent, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { Modal } from '@/components/Admin/Modal'
import { PageHeader } from '@/components/Admin/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContentStore } from '@/hooks/use-content-store'
import type { Skill } from '@/types/types'

const CATEGORIES = [
  'Frameworks',
  'Languages',
  'Styling',
  'UI Libraries',
  'State Management',
  'Data Fetching',
  'Next.js',
  'React',
  'Other',
]

const emptySkill = (nextId: number, sort: number): Skill => ({
  id: nextId,
  name: '',
  category: 'Frameworks',
  proficiency: 80,
  icon: null,
  sort_order: sort,
})

export default function SkillsAdminPage() {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'tj'
  const { skills, saveSkill, removeSkill } = useContentStore()

  const [query, setQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [form, setForm] = useState<Skill>(emptySkill(1, 1))

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...skills]
      .sort((a, b) => a.sort_order - b.sort_order)
      .filter((s) => {
        if (categoryFilter !== 'all' && s.category !== categoryFilter) return false
        if (!q) return true
        return s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
      })
  }, [skills, query, categoryFilter])

  const openCreate = () => {
    const nextId = skills.reduce((max, s) => Math.max(max, s.id), 0) + 1
    setIsEdit(false)
    setForm(emptySkill(nextId, skills.length + 1))
    setOpen(true)
  }

  const openEdit = (skill: Skill) => {
    setIsEdit(true)
    setForm({ ...skill })
    setOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    saveSkill({
      ...form,
      proficiency: Math.min(100, Math.max(0, form.proficiency)),
      icon: form.icon || null,
    })
    setOpen(false)
  }

  const handleDelete = (skill: Skill) => {
    if (!confirm(`Малакаи «${skill.name}» нест карда шавад?`)) return
    removeSkill(skill.id)
  }

  return (
    <div>
      <PageHeader
        title="Малакаҳо"
        description="Сатҳи маҳорат ва категорияҳоро идора кунед"
        locale={lang}
        action={
          <Button onClick={openCreate} size="sm">
            <Plus className="size-4" />
            Илова
          </Button>
        }
      />

      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ҷустуҷӯ..."
            className="pl-9"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
        >
          <option value="all">Ҳамаи категорияҳо</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((skill) => (
          <article key={skill.id} className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-foreground">{skill.name}</h3>
                <p className="text-xs text-muted-foreground">{skill.category}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                {skill.proficiency}%
              </span>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(skill)}>
                <Pencil className="size-3.5" />
                Таҳрир
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(skill)}>
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Малака ёфт нашуд
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={isEdit ? 'Таҳрири малака' : 'Малакаи нав'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Ном</Label>
            <Input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>Категория</Label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Профитенсия: {form.proficiency}%</Label>
            <input
              type="range"
              min={0}
              max={100}
              value={form.proficiency}
              onChange={(e) => setForm((f) => ({ ...f, proficiency: Number(e.target.value) }))}
              className="mt-2 w-full accent-foreground"
            />
          </div>
          <div>
            <Label>Sort order</Label>
            <Input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) || 0 }))}
            />
          </div>
          <div className="flex justify-end gap-2 border-t border-border pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Бекор
            </Button>
            <Button type="submit">{isEdit ? 'Захира' : 'Илова'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
