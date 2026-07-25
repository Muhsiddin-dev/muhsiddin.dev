'use client'

import { useCallback, useSyncExternalStore } from 'react'
import {
  AUTH_EVENT,
  getAdminSession,
  loginAdmin,
  logoutAdmin,
  reloadAdminSession,
  type AdminSession,
} from '@/lib/admin/auth'

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}
  const onLocal = () => onStoreChange()
  const onStorage = () => {
    reloadAdminSession()
    onStoreChange()
  }
  window.addEventListener(AUTH_EVENT, onLocal)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(AUTH_EVENT, onLocal)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot(): AdminSession | null {
  return getAdminSession()
}

function getServerSnapshot(): AdminSession | null {
  return null
}

export function useAdminAuth() {
  const session = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const login = useCallback((email: string, password: string) => {
    return loginAdmin(email, password)
  }, [])

  const logout = useCallback(() => {
    logoutAdmin()
  }, [])

  return {
    session,
    ready: typeof window !== 'undefined',
    isAuthenticated: Boolean(session),
    login,
    logout,
  }
}
