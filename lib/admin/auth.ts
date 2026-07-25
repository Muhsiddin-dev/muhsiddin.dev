export const AUTH_STORAGE_KEY = 'muhsiddin.dev:admin-auth'
export const AUTH_EVENT = 'muhsiddin:auth-updated'

export interface AdminSession {
  email: string
  loggedInAt: string
}

let sessionCache: AdminSession | null | undefined

function isBrowser() {
  return typeof window !== 'undefined'
}

function emitAuthUpdate() {
  if (!isBrowser()) return
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function getExpectedCredentials() {
  return {
    email: process.env.NEXT_PUBLIC_Login_Admin_Panel ?? '',
    password: process.env.NEXT_PUBLIC_Password_Admin_Panel ?? '',
  }
}

function readSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) {
      const oldLogin = localStorage.getItem('Login')
      const expected = getExpectedCredentials()
      if (oldLogin && oldLogin === expected.email) {
        const session: AdminSession = {
          email: oldLogin,
          loggedInAt: new Date().toISOString(),
        }
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
        localStorage.removeItem('Password')
        return session
      }
      return null
    }
    return JSON.parse(raw) as AdminSession
  } catch {
    return null
  }
}

export function loginAdmin(email: string, password: string): boolean {
  const expected = getExpectedCredentials()
  if (!expected.email || !expected.password) return false
  if (email !== expected.email || password !== expected.password) return false

  const session: AdminSession = {
    email,
    loggedInAt: new Date().toISOString(),
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
  localStorage.removeItem('Login')
  localStorage.removeItem('Password')
  sessionCache = session
  emitAuthUpdate()
  return true
}

export function logoutAdmin() {
  if (!isBrowser()) return
  localStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem('Login')
  localStorage.removeItem('Password')
  sessionCache = null
  emitAuthUpdate()
}

export function getAdminSession(): AdminSession | null {
  if (!isBrowser()) return null
  if (sessionCache === undefined) {
    sessionCache = readSession()
  }
  return sessionCache
}

export function reloadAdminSession(): AdminSession | null {
  if (!isBrowser()) return null
  sessionCache = readSession()
  return sessionCache
}

export function isAdminAuthenticated() {
  return Boolean(getAdminSession())
}
