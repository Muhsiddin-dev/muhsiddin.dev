'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAdminAuth } from '@/hooks/use-admin-auth'

function Page() {
  const router = useRouter()
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'tj'
  const { login } = useAdminAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const ok = login(email.trim(), password)
    if (ok) {
      router.push(`/${lang}/admin/dashboard`)
    } else {
      setError('Логин ё парол нодуруст аст')
      setLoading(false)
    }
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col overflow-hidden md:flex-row">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.08),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(0,0,0,0.06),transparent_35%)] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.04),transparent_35%)]" />

      <aside className="relative h-[38vh] w-full overflow-hidden md:h-screen md:flex-1">
        <Image
          src="/Img1-Admin.jpg"
          width={1200}
          height={1400}
          priority
          className="h-full w-full object-cover"
          alt="Admin"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-white/70">Portfolio</p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">muhsiddin.dev</h1>
          <p className="mt-2 max-w-md text-sm text-white/80">
            Панели идоракунӣ
          </p>
        </div>
      </aside>

      <aside className="flex w-full flex-1 items-center justify-center p-6 md:p-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl border border-border bg-card/80 p-7 shadow-xl backdrop-blur"
        >
          <div className="mb-7 text-center">
            <h2 className="text-2xl font-bold text-foreground">Админ панел</h2>
            <p className="mt-1 text-sm text-muted-foreground">Барои идоракунии мундариҷа ворид шавед</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Логин / Email</Label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@muhsiddin.dev"
                  className="pl-9"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Парол</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10 pl-9"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error ? (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="h-10 w-full" disabled={loading}>
              {loading ? 'Санҷиш...' : 'Ворид шудан'}
            </Button>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Ба инчо  Админ ворид шуда метавонад
          </p>
        </form>
      </aside>
    </section>
  )
}

export default Page
