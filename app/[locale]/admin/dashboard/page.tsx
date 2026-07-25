'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Award,
  Download,
  FolderGit2,
  RefreshCcw,
  Upload,
  User,
  Wrench,
  Clock3,
} from 'lucide-react'
import { PageHeader } from '@/components/Admin/PageHeader'
import { Button } from '@/components/ui/button'
import { useContentStore } from '@/hooks/use-content-store'

function StatCard({
  title,
  value,
  icon: Icon,
  href,
}: {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  href: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-card/80 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">{value}</p>
        </div>
        <div className="rounded-xl bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" />
        </div>
      </div>
    </Link>
  )
}

export default function DashboardPage() {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'tj'
  const { projects, skills, certificates, personal, updatedAt, exportJson, importJson, reset } =
    useContentStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')

  const handleExport = () => {
    const blob = new Blob([exportJson()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `muhsiddin-content-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('JSON бомуваффақият боргирӣ шуд')
  }

  const handleImport = async (file: File) => {
    try {
      const text = await file.text()
      importJson(text)
      setMessage('Маълумот аз JSON ворид шуд')
    } catch {
      setMessage('Хато: файли JSON нодуруст аст')
    }
  }

  const handleReset = () => {
    if (!confirm('Ҳамаи тағйиротҳо бекор шаванд ва маълумоти асосӣ барқарор шавад?')) return
    reset()
    setMessage('Маълумоти асосӣ барқарор шуд')
  }

  const recentProjects = [...projects]
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, 4)

  return (
    <div>
      <PageHeader
        title="Дашбоард"
        description="Мундариҷаи портфолиоро локалӣ идора кунед. Баъдтар ҳамин API-ро ба backend иваз мекунед."
        locale={lang}
      />

      {message ? (
        <div className="mb-5 rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
          {message}
        </div>
      ) : null}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Лоиҳаҳо" value={projects.length} icon={FolderGit2} href={`/${lang}/admin/projects`} />
        <StatCard title="Малакаҳо" value={skills.length} icon={Wrench} href={`/${lang}/admin/skills`} />
        <StatCard title="Сертификатҳо" value={certificates.length} icon={Award} href={`/${lang}/admin/certificates`} />
        <StatCard title="Маълумоти шахсӣ" value={1} icon={User} href={`/${lang}/admin/about`} />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Лоиҳаҳои охирин</h2>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/${lang}/admin/projects`}>Ҳама</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {recentProjects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 px-4 py-3"
              >
                <div>
                  <p className="font-medium text-foreground">{project.title_tj || project.title_en}</p>
                  <p className="text-xs text-muted-foreground">
                    {project.technologies.slice(0, 3).join(' · ')}
                    {project.featured ? ' · Featured' : ''}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">#{project.sort_order}</span>
              </li>
            ))}
            {recentProjects.length === 0 ? (
              <li className="py-8 text-center text-sm text-muted-foreground">Ҳоло лоиҳа нест</li>
            ) : null}
          </ul>
        </section>

        <section className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
            <h2 className="mb-1 font-semibold text-foreground">Профил</h2>
            <p className="text-sm text-muted-foreground">
              {personal.name_tj} {personal.surname_tj}
            </p>
            <p className="mt-1 text-sm text-foreground">{personal.role_tj}</p>
            <p className="mt-3 text-xs text-muted-foreground">{personal.email}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock3 className="size-3.5" />
              Навсозӣ: {new Date(updatedAt).toLocaleString()}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
            <h2 className="mb-3 font-semibold text-foreground">Backup / Sync</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              То омода шудани backend, JSON export/import истифода баред.
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={handleExport} variant="outline" className="justify-start">
                <Download className="size-4" />
                Export JSON
              </Button>
              <Button
                onClick={() => fileRef.current?.click()}
                variant="outline"
                className="justify-start"
              >
                <Upload className="size-4" />
                Import JSON
              </Button>
              <Button onClick={handleReset} variant="destructive" className="justify-start">
                <RefreshCcw className="size-4" />
                Reset ба default
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) void handleImport(file)
                  e.target.value = ''
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
