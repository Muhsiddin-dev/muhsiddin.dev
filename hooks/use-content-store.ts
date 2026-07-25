'use client'

import { useSyncExternalStore } from 'react'
import { CONTENT_EVENT, createSeedContent } from '@/lib/admin/seed'
import {
  deleteCertificate,
  deleteProject,
  deleteSkill,
  exportContentJson,
  getContent,
  importContentJson,
  reloadContentFromStorage,
  resetContent,
  updatePersonal,
  upsertCertificate,
  upsertProject,
  upsertSkill,
} from '@/lib/admin/content-store'
import type {
  Certificate,
  PersonalInfo,
  Project,
  SiteContent,
  Skill,
} from '@/types/types'

// Кеш кардани getServerSnapshot барои пешгирии infinite loop
let cachedServerSnapshot: SiteContent | null = null

function getServerSnapshot(): SiteContent {
  if (!cachedServerSnapshot) {
    cachedServerSnapshot = createSeedContent()
  }
  return cachedServerSnapshot
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {}

  const onLocal = () => onStoreChange()
  const onStorage = (e: StorageEvent) => {
    if (e.key && e.key !== 'muhsiddin.dev:site-content') return
    reloadContentFromStorage()
    onStoreChange()
  }

  window.addEventListener(CONTENT_EVENT, onLocal)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CONTENT_EVENT, onLocal)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot(): SiteContent {
  return getContent()
}

export function useContentStore() {
  const content = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  
  const hydrated = typeof window !== 'undefined'

  return {
    content,
    hydrated,
    projects: content.projects,
    skills: content.skills,
    certificates: content.certificates,
    personal: content.personal,
    updatedAt: content.updatedAt,
    saveProject: (project: Project) => upsertProject(project),
    removeProject: (id: string) => deleteProject(id),
    saveSkill: (skill: Skill) => upsertSkill(skill),
    removeSkill: (id: number) => deleteSkill(id),
    saveCertificate: (certificate: Certificate) => upsertCertificate(certificate),
    removeCertificate: (id: string) => deleteCertificate(id),
    savePersonal: (personal: PersonalInfo) => updatePersonal(personal),
    reset: () => resetContent(),
    exportJson: () => exportContentJson(),
    importJson: (json: string) => importContentJson(json),
  }
}