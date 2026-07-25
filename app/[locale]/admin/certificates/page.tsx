'use client'

import { FormEvent, useMemo, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { LangTabs, type LangTab } from '@/components/Admin/LangTabs'
import { Modal } from '@/components/Admin/Modal'
import { PageHeader } from '@/components/Admin/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContentStore } from '@/hooks/use-content-store'
import { createId } from '@/lib/admin/content-store'
import type { Certificate } from '@/types/types'

const emptyCertificate = (): Certificate => ({
  id: createId(),
  title_en: '',
  title_tj: '',
  title_ru: '',
  issuer_en: '',
  issuer_tj: '',
  issuer_ru: '',
  image_url: '',
  issue_date: new Date().toISOString().slice(0, 10),
  credential_url: '',
  sort_order: 1,
})

export default function CertificatesAdminPage() {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'tj'
  const { certificates, saveCertificate, removeCertificate } = useContentStore()

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [langTab, setLangTab] = useState<LangTab>('tj')
  const [form, setForm] = useState<Certificate>(emptyCertificate())

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...certificates]
      .sort((a, b) => a.sort_order - b.sort_order)
      .filter((c) => {
        if (!q) return true
        return (
          c.title_en.toLowerCase().includes(q) ||
          c.title_tj.toLowerCase().includes(q) ||
          c.issuer_en.toLowerCase().includes(q)
        )
      })
  }, [certificates, query])

  const openCreate = () => {
    setIsEdit(false)
    setForm({ ...emptyCertificate(), sort_order: certificates.length + 1 })
    setLangTab('tj')
    setOpen(true)
  }

  const openEdit = (certificate: Certificate) => {
    setIsEdit(true)
    setForm({ ...certificate })
    setLangTab('tj')
    setOpen(true)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    saveCertificate({
      ...form,
      image_url: form.image_url || null,
      credential_url: form.credential_url || null,
      issue_date: form.issue_date || null,
    })
    setOpen(false)
  }

  const handleDelete = (certificate: Certificate) => {
    if (!confirm(`Сертификати «${certificate.title_tj || certificate.title_en}» нест карда шавад?`)) return
    removeCertificate(certificate.id)
  }

  return (
    <div>
      <PageHeader
        title="Сертификатҳо"
        description="Сертификатҳо ва дастовардҳои таълимиро идора кунед"
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((certificate) => (
          <article key={certificate.id} className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm">
            <div className="relative aspect-[4/3] bg-muted">
              {certificate.image_url ? (
                <Image
                  src={certificate.image_url}
                  alt={certificate.title_en}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-foreground">
                {certificate.title_tj || certificate.title_en}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {certificate.issuer_tj || certificate.issuer_en}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{certificate.issue_date}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(certificate)}>
                  <Pencil className="size-3.5" />
                  Таҳрир
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(certificate)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Сертификат ёфт нашуд
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={isEdit ? 'Таҳрири сертификат' : 'Сертификати нав'}
        wide
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <LangTabs value={langTab} onChange={setLangTab} />

          <div>
            <Label>Унвон ({langTab.toUpperCase()})</Label>
            <Input
              required
              value={form[`title_${langTab}`]}
              onChange={(e) => setForm((f) => ({ ...f, [`title_${langTab}`]: e.target.value }))}
            />
          </div>
          <div>
            <Label>Дода шуд аз ({langTab.toUpperCase()})</Label>
            <Input
              required
              value={form[`issuer_${langTab}`]}
              onChange={(e) => setForm((f) => ({ ...f, [`issuer_${langTab}`]: e.target.value }))}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Image URL</Label>
              <Input
                value={form.image_url ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                placeholder="/Certificate.jpg"
              />
            </div>
            <div>
              <Label>Сана</Label>
              <Input
                type="date"
                value={form.issue_date ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, issue_date: e.target.value }))}
              />
            </div>
            <div>
              <Label>Credential URL</Label>
              <Input
                value={form.credential_url ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, credential_url: e.target.value }))}
                placeholder="https://"
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
