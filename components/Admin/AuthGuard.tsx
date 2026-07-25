'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useAdminAuth } from '@/hooks/use-admin-auth'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAdminAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  const lang = pathname.split('/')[1] || 'tj'
  const isLoginPage =
    pathname === `/${lang}/admin` ||
    pathname === '/tj/admin' ||
    pathname === '/ru/admin' ||
    pathname === '/en/admin'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!isLoginPage && !isAuthenticated) {
      router.replace(`/${lang}/admin`)
    }
    if (isLoginPage && isAuthenticated) {
      router.replace(`/${lang}/admin/dashboard`)
    }
  }, [mounted, isAuthenticated, isLoginPage, lang, router])

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isLoginPage && !isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  return <>{children}</>
}
