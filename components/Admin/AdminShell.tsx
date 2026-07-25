'use client'

import { usePathname } from "next/navigation"
import Aside from "./Aside"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const lang = pathname.split('/')[1] || 'tj'
  const isLoginPage =
    pathname === `/${lang}/admin` ||
    pathname === '/tj/admin' ||
    pathname === '/ru/admin' ||
    pathname === '/en/admin'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted/60 via-background to-background md:flex-row">
      <Aside />
      <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">{children}</main>
    </div>
  )
}