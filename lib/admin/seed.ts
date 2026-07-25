import { CERTIFICATES_DATA, PROJECTS_DATA, SKILLS_DATA } from '@/lib/data'
import { Admin, PersonalInfo, SiteContent } from '@/types/types'

export const CONTENT_STORAGE_KEY = 'muhsiddin.dev:site-content'
export const CONTENT_VERSION = 1
export const CONTENT_EVENT = 'muhsiddin:content-updated'

export const DEFAULT_PERSONAL: PersonalInfo = {
  name_en: Admin.name_En,
  name_tj: Admin.name_Tj,
  name_ru: Admin.name_Ru,
  surname_en: Admin.surname_En,
  surname_tj: Admin.surname_Tj,
  surname_ru: Admin.surname_Ru,
  role_en: 'Frontend Developer',
  role_tj: 'Frontend Барноманавис',
  role_ru: 'Frontend Разработчик',
  summary_en:
    'A passionate Junior Frontend Developer and programming student with strong expertise in building scalable, user-centric web applications. Highly proficient in React and Next.js, with advanced state management experience using Redux Toolkit (RTK Query), TanStack Query, Jotai and Zustand. Skilled in creating modern, responsive interfaces with Tailwind CSS, Shadcn UI and Magic UI. Dedicated to writing clean, optimized code and implementing efficient data-fetching strategies.',
  summary_tj:
    'Таҳиягари Frontend-и ҷавон ва донишҷӯи соҳаи барномасозӣ бо шавқи зиёд ба сохтани барномаҳои вебии миқёспазир ва корбарпазир. Ман дар истифодаи React ва Next.js маҳорати баланд дорам ва таҷрибаи кор бо воситаҳои муосири идоракунии ҳолат (state management) ба монанди Redux Toolkit (RTK Query), TanStack Query ва Zustand ва Jotai-ро дорам. Диққати асосии ман ба навиштани коди тоза, оптимизатсияшуда ва сохтани интерфейсҳои зебо бо Tailwind CSS, Shadcn UI ва Magic UI нигаронида шудааст.',
  summary_ru:
    'Увлеченный Junior Frontend разработчик и студент в области программирования с глубокими знаниями в создании масштабируемых и ориентированных на пользователя веб-приложений. Я обладаю опытом работы с React и Next.js, а также продвинутыми навыками управления состоянием с помощью Redux Toolkit (RTK Query), TanStack Query, jotai и Zustand. Специализируюсь на написании чистого, оптимизированного кода и создании современных интерфейсов с использованием Tailwind CSS, Shadcn UI и Magic UI.',
  education_en: 'Frontend Development Certificate from SoftClub',
  education_tj: 'Сертификати Таҳияи Frontend аз SoftClub',
  education_ru: 'Сертификат Frontend-разработки от SoftClub',
  email: Admin.email,
  telegram: Admin.telegram_UserName,
  github: Admin.github_UserName,
  linkedin: Admin.linkedin_UserName,
  instagram: Admin.Instagram_UserName,
  website: Admin.website,
  age: Admin.Age,
  country: Admin.Country,
  city: Admin.City,
  photo_url: '/Img1-Admin.jpg',
}

export function createSeedContent(): SiteContent {
  return {
    version: CONTENT_VERSION,
    updatedAt: new Date().toISOString(),
    projects: structuredClone(PROJECTS_DATA),
    skills: structuredClone(SKILLS_DATA),
    certificates: structuredClone(CERTIFICATES_DATA),
    personal: structuredClone(DEFAULT_PERSONAL),
  }
}
