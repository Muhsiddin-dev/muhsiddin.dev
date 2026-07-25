'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Award,
  FolderGit2,
  LayoutDashboard,
  LucideDoorOpen,
  LucideIcon,
  Mail,
  Menu,
  User,
  Wrench,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdminAuth } from '@/hooks/use-admin-auth'
import { SideBarItem } from '@/types/types'
import { cn } from '@/lib/utils'

function Aside() {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAdminAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const lang = pathname.split('/')[1] || 'tj'
  const isLoginPage =
    pathname === `/${lang}/admin` ||
    pathname === '/tj/admin' ||
    pathname === '/ru/admin' ||
    pathname === '/en/admin'

  const navItems: SideBarItem = [
    { key: 'Дашбоард', icon: LayoutDashboard, href: 'dashboard' },
    { key: 'Дар бораи ман', icon: User, href: 'about' },
    { key: 'Малакаҳо', icon: Wrench, href: 'skills' },
    { key: 'Лоиҳаҳо', icon: FolderGit2, href: 'projects' },
    { key: 'Сертификатҳо', icon: Award, href: 'certificates' },
    { key: 'Тамос', icon: Mail, href: 'contact' },
  ]

  const handleLogout = () => {
    logout()
    router.push(`/${lang}/admin`)
  }

  if (isLoginPage) return null

  const Nav = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-5 border-b border-border px-2 pb-4">
          <Link href={`/${lang}/admin/dashboard`} className="block">
            <h1 className="text-lg font-bold tracking-tight text-foreground">muhsiddin.dev</h1>
            <p className="text-xs text-muted-foreground">Admin Panel · Offline</p>
          </Link>
        </div>

        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const IconComponent = typeof item.icon === 'function' ? (item.icon as LucideIcon) : null
            const fullHref = `/${lang}/admin/${item.href}`
            const isActive = pathname === fullHref || pathname.endsWith(`/admin/${item.href}`)

            return (
              <li key={item.href}>
                <Link
                  href={fullHref}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {IconComponent ? <IconComponent className="size-4" /> : null}
                  <span>{item.key}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="border-t border-border pt-4">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full justify-start gap-3 border-destructive/30 text-destructive hover:bg-destructive hover:text-white"
        >
          <LucideDoorOpen className="size-4" />
          Баромадан
        </Button>
      </div>
    </div>
  )

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:hidden">
        <div>
          <p className="font-semibold text-foreground">muhsiddin.dev</p>
          <p className="text-xs text-muted-foreground">Admin</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => setMobileOpen(true)}>
          <Menu className="size-4" />
        </Button>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative z-10 flex h-full w-72 flex-col bg-card p-4 shadow-xl">
            <div className="mb-2 flex justify-end">
              <Button variant="ghost" size="icon-sm" onClick={() => setMobileOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
            {Nav}
          </aside>
        </div>
      ) : null}

      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card/80 p-4 backdrop-blur md:flex md:flex-col">
        {Nav}
      </aside>
    </>
  )
}

export default Aside
