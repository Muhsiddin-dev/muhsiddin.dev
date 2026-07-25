import { LucideIcon } from "lucide-react"

export type Language = 'tj' | 'ru' | 'en'

export const Admin = {
  name_En: 'Muhsiddin',
  name_Ru: 'Мухсиддин',
  name_Tj: 'Муҳсиддин',
  surname_En: 'Nazarov',
  surname_Ru: 'Назаров',
  surname_Tj: 'Назаров',
  email: 'muhsinnazarov21@gmail.com',
  telegram_UserName: "https://t.me/lll_nazarov_lll",
  github_UserName: "https://github.com/Muhsiddin-dev",
  linkedin_UserName: "https://linkedin.com/in/muhsiddin-nazarov",
  Instagram_UserName: "https://www.instagram.com/_nazarov.__011",
  website: "https://muhsiddin.dev",
  Age: 15,
  Country: "Tajikistan",
  City: "Dushanbe",
  role: "Frontend Developer"
}

export interface Project {
  id: string
  title_en: string
  title_tj: string
  title_ru: string
  description_en: string
  description_tj: string
  description_ru: string
  image_url: string | null
  live_url: string | null
  github_url: string | null
  technologies: string[]
  featured: boolean
  sort_order: number
}

export interface Certificate {
  id: string
  title_en: string
  title_tj: string
  title_ru: string
  issuer_en: string
  issuer_tj: string
  issuer_ru: string
  image_url: string | null
  issue_date: string | null
  credential_url: string | null
  sort_order: number
}

export interface Skill {
  id: number
  name: string
  category: string
  proficiency: number
  icon: string | null
  sort_order: number
}

export interface PersonalInfo {
  name_en: string
  name_tj: string
  name_ru: string
  surname_en: string
  surname_tj: string
  surname_ru: string
  role_en: string
  role_tj: string
  role_ru: string
  summary_en: string
  summary_tj: string
  summary_ru: string
  education_en: string
  education_tj: string
  education_ru: string
  email: string
  telegram: string
  github: string
  linkedin: string
  instagram: string
  website: string
  age: number
  country: string
  city: string
  photo_url: string | null
}

export interface SiteContent {
  version: number
  updatedAt: string
  projects: Project[]
  skills: Skill[]
  certificates: Certificate[]
  personal: PersonalInfo
}

export type SideBarItem = Array<{
  key: string
  icon: LucideIcon | string
  href: string
}>
