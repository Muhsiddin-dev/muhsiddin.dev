'use client'

import { FormEvent, useMemo, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Pencil, Plus, Search, Star, Trash2 } from 'lucide-react'
import { LangTabs, type LangTab } from '@/components/Admin/LangTabs'
import { Modal } from '@/components/Admin/Modal'
import { PageHeader } from '@/components/Admin/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useContentStore } from '@/hooks/use-content-store'
import { createId } from '@/lib/admin/content-store'
import type { Project } from '@/types/types'

const emptyProject = (): Project => ({
  id: createId(),
  title_en: '',
  title_tj: '',
  title_ru: '',
  description_en: '',
  description_tj: '',
  description_ru: '',
  image_url: '',
  live_url: '',
  github_url: '',
  technologies: [],
  featured: true,
  sort_order: 1,
})

export default function ProjectsAdminPage() {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'tj'
  const { projects, saveProject, removeProject } = useContentStore()

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [langTab, setLangTab] = useState<LangTab>('tj')
  const [form, setForm] = useState<Project>(emptyProject())
  const [techInput, setTechInput] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...projects]
      .sort((a, b) => a.sort_order - b.sort_order)
      .filter((p) => {
        if (!q) return true
        return (
          p.title_en.toLowerCase().includes(q) ||
          p.title_tj.toLowerCase().includes(q) ||
          p.title_ru.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
        )
      })
  }, [projects, query])

  const openCreate = () => {
    setIsEdit(false)
    setForm({
      ...emptyProject(),
      sort_order: projects.length + 1,
    })
    setTechInput('')
    setLangTab('tj')
    setOpen(true)
  }

  const openEdit = (project: Project) => {
    setIsEdit(true)
    setForm({ ...project, technologies: [...project.technologies] })
    setTechInput(project.technologies.join(', '))
    setLangTab('tj')
    setOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const technologies = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    saveProject({
      ...form,
      technologies,
      image_url: form.image_url || null,
      live_url: form.live_url || null,
      github_url: form.github_url || null,
    })
    setOpen(false)
  }

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Лоиҳаи «${title}» нест карда шавад?`)) return
    removeProject(id)
  }

  return (
    <div>
      <PageHeader
        title="Лоиҳаҳо"
        description="Илова, таҳрир ва нест кардани лоиҳаҳои портфолио"
        locale={lang}
        action={
          <Button onClick={openCreate} size="sm">
            <Plus className="size-4" />
            Илова
          </Button>
        }
      />

      <div className="mb-5 relative max-w-md">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ҷустуҷӯ..."
          className="pl-9"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card/80 p-4 shadow-sm sm:flex-row sm:items-center"
          >
            <div className="relative h-28 w-full overflow-hidden rounded-xl bg-muted sm:h-20 sm:w-32 shrink-0">
              {project.image_url ? (
                <Image src={project.image_url} alt={project.title_en} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-foreground">{project.title_tj || project.title_en}</h3>
                {project.featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    <Star className="size-3" /> Featured
                  </span>
                ) : null}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.description_tj || project.description_en}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                #{project.sort_order} · {project.technologies.slice(0, 4).join(' · ')}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => openEdit(project)}>
                <Pencil className="size-3.5" />
                Таҳрир
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(project.id, project.title_tj || project.title_en)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </article>
        ))}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            Лоиҳа ёфт нашуд
          </div>
        ) : null}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={isEdit ? 'Таҳрири лоиҳа' : 'Лоиҳаи нав'}
        description="Маълумотро бо се забон пур кунед"
        wide
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <LangTabs value={langTab} onChange={setLangTab} />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="size-4 accent-foreground"
              />
              Featured
            </label>
          </div>

          <div>
            <Label>Унвон ({langTab.toUpperCase()})</Label>
            <Input
              required
              value={form[`title_${langTab}`]}
              onChange={(e) => setForm((f) => ({ ...f, [`title_${langTab}`]: e.target.value }))}
            />
          </div>

          <div>
            <Label>Тавсиф ({langTab.toUpperCase()})</Label>
            <Textarea
              required
              value={form[`description_${langTab}`]}
              onChange={(e) => setForm((f) => ({ ...f, [`description_${langTab}`]: e.target.value }))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Image URL</Label>
              <Input
                value={form.image_url ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="/image.png"
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
            <div>
              <Label>Live URL</Label>
              <Input
                value={form.live_url ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, live_url: e.target.value }))}
                placeholder="https://"
              />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <Input
                value={form.github_url ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, github_url: e.target.value }))}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div>
            <Label>Технологияҳо (бо вергул)</Label>
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Next.js, TypeScript, Tailwind CSS"
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
