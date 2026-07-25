import {
  CONTENT_EVENT,
  CONTENT_STORAGE_KEY,
  CONTENT_VERSION,
  createSeedContent,
} from '@/lib/admin/seed'
import type {
  Certificate,
  PersonalInfo,
  Project,
  SiteContent,
  Skill,
} from '@/types/types'

let memoryCache: SiteContent | null = null

function isBrowser() {
  return typeof window !== 'undefined'
}

function emitUpdate() {
  if (!isBrowser()) return
  window.dispatchEvent(new Event(CONTENT_EVENT))
}

function parseContent(raw: string | null): SiteContent | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as SiteContent
    if (!parsed || typeof parsed !== 'object') return null
    if (
      !Array.isArray(parsed.projects) ||
      !Array.isArray(parsed.skills) ||
      !Array.isArray(parsed.certificates) ||
      !parsed.personal
    ) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

function readFromStorage(): SiteContent {
  const existing = parseContent(localStorage.getItem(CONTENT_STORAGE_KEY))
  if (existing) {
    if (existing.version !== CONTENT_VERSION) {
      const merged: SiteContent = {
        ...createSeedContent(),
        ...existing,
        version: CONTENT_VERSION,
      }
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(merged))
      return merged
    }
    return existing
  }

  const seed = createSeedContent()
  localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(seed))
  return seed
}

export function getContent(): SiteContent {
  if (!isBrowser()) return createSeedContent()
  if (!memoryCache) {
    memoryCache = readFromStorage()
  }
  return memoryCache
}

export function saveContent(content: SiteContent): SiteContent {
  const next: SiteContent = {
    ...content,
    version: CONTENT_VERSION,
    updatedAt: new Date().toISOString(),
  }
  memoryCache = next
  if (isBrowser()) {
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(next))
    emitUpdate()
  }
  return next
}

export function resetContent(): SiteContent {
  return saveContent(createSeedContent())
}

export function exportContentJson(): string {
  return JSON.stringify(getContent(), null, 2)
}

export function importContentJson(json: string): SiteContent {
  const parsed = parseContent(json)
  if (!parsed) {
    throw new Error('Invalid content JSON')
  }
  return saveContent({
    ...parsed,
    version: CONTENT_VERSION,
  })
}

export function upsertProject(project: Project): SiteContent {
  const content = getContent()
  const projects = [...content.projects]
  const index = projects.findIndex((p) => p.id === project.id)
  if (index >= 0) {
    projects[index] = project
  } else {
    projects.push(project)
  }
  projects.sort((a, b) => a.sort_order - b.sort_order)
  return saveContent({ ...content, projects })
}

export function deleteProject(id: string): SiteContent {
  const content = getContent()
  return saveContent({
    ...content,
    projects: content.projects.filter((p) => p.id !== id),
  })
}

export function upsertSkill(skill: Skill): SiteContent {
  const content = getContent()
  const skills = [...content.skills]
  const index = skills.findIndex((s) => s.id === skill.id)
  if (index >= 0) {
    skills[index] = skill
  } else {
    skills.push(skill)
  }
  skills.sort((a, b) => a.sort_order - b.sort_order)
  return saveContent({ ...content, skills })
}

export function deleteSkill(id: number): SiteContent {
  const content = getContent()
  return saveContent({
    ...content,
    skills: content.skills.filter((s) => s.id !== id),
  })
}

export function upsertCertificate(certificate: Certificate): SiteContent {
  const content = getContent()
  const certificates = [...content.certificates]
  const index = certificates.findIndex((c) => c.id === certificate.id)
  if (index >= 0) {
    certificates[index] = certificate
  } else {
    certificates.push(certificate)
  }
  certificates.sort((a, b) => a.sort_order - b.sort_order)
  return saveContent({ ...content, certificates })
}

export function deleteCertificate(id: string): SiteContent {
  const content = getContent()
  return saveContent({
    ...content,
    certificates: content.certificates.filter((c) => c.id !== id),
  })
}

export function updatePersonal(personal: PersonalInfo): SiteContent {
  const content = getContent()
  return saveContent({ ...content, personal })
}

export function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/** Invalidate memory cache (e.g. after storage event from another tab) */
export function reloadContentFromStorage(): SiteContent {
  if (!isBrowser()) return createSeedContent()
  memoryCache = readFromStorage()
  return memoryCache
}
