import { Skill } from '@/types/types'


export const SKILLS_DATA: Skill[] = [
  // --- Frameworks ---
  { id: 1, name: "HTML v5", category: "Frameworks", proficiency: 100, sort_order: 1, icon: null },
  { id: 2, name: "Next.js", category: "Frameworks", proficiency: 98, sort_order: 2, icon: null },
  { id: 3, name: "React", category: "Frameworks", proficiency: 95, sort_order: 3, icon: null },

  // --- Languages ---
  { id: 4, name: "TypeScript", category: "Languages", proficiency: 96, sort_order: 4, icon: null },
  { id: 5, name: "JavaScript", category: "Languages", proficiency: 95, sort_order: 5, icon: null },

  // --- Styling ---
  { id: 6, name: "CSS v3", category: "Styling", proficiency: 100, sort_order: 6, icon: null },
  { id: 7, name: "Tailwind CSS", category: "Styling", proficiency: 99, sort_order: 7, icon: null },
  { id: 8, name: "SCSS", category: "Styling", proficiency: 60, sort_order: 8, icon: null },

  // --- UI Libraries ---
  { id: 9, name: "Magic UI", category: "UI Libraries", proficiency: 100, sort_order: 9, icon: null },
  { id: 10, name: "Shadcn UI", category: "UI Libraries", proficiency: 100, sort_order: 10, icon: null },

  // --- State Management ---
  { id: 11, name: "Redux Toolkit (RTK Query)", category: "State Management", proficiency: 95, sort_order: 11, icon: null },
  { id: 12, name: "Zustand", category: "State Management", proficiency: 90, sort_order: 12, icon: null },
  { id: 13, name: "Jotai", category: "State Management", proficiency: 90, sort_order: 13, icon: null },

  // --- Data Fetching ---
  { id: 14, name: "Axios", category: "Data Fetching", proficiency: 95, sort_order: 14, icon: null },
  { id: 15, name: "Fetch", category: "Data Fetching", proficiency: 90, sort_order: 15, icon: null },
  { id: 16, name: "TanStack Query", category: "Data Fetching", proficiency: 40, sort_order: 16, icon: null },

  // --- Next.js (Features) ---
  { id: 17, name: "Client Components", category: "Next.js", proficiency: 95, sort_order: 17, icon: null },
  { id: 18, name: "Server Components", category: "Next.js", proficiency: 93, sort_order: 18, icon: null },
  { id: 19, name: "Middleware", category: "Next.js", proficiency: 90, sort_order: 19, icon: null },
  { id: 20, name: "Routing", category: "Next.js", proficiency: 90, sort_order: 20, icon: null },
  { id: 21, name: "Server Actions", category: "Next.js", proficiency: 80, sort_order: 21, icon: null },

  // --- React (Features) ---
  { id: 22, name: "Hooks", category: "React", proficiency: 90, sort_order: 22, icon: null },
]

export const PROJECTS_DATA = [
  {
    id: "a64f9380-5a9e-421a-a874-b88a7cb645e5",
    title_en: "e-Kitobxona",
    title_tg: "e-Kitobxona",
    title_ru: "e-Kitobxona",
    description_en: "A digital library platform with Gemini AI integration...",
    description_tg: "Платформаи китобхонаи рақамӣ бо интегратсияи Gemini AI...",
    description_ru: "Платформа цифровой библиотеки с интеграцией Gemini AI...",
    image_url: "https://e-kitobxona.vercel.app/favicon.ico",
    live_url: "https://e-kitobxona.vercel.app",
    github_url: "https://github.com/Muhsiddin-dev/E-KITOBXONA",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Gemini AI"],
    featured: true,
    sort_order: 1
  },
  {
    id: "5f98a53a-17e8-46ba-b95d-ac9b5ic86a96",
    title_en: "DonishYob",
    title_tg: "DonishYob",
    title_ru: "DonishYob",
    description_en: "An educational platform designed to help students...",
    description_tg: "Платформаи таълимӣ барои кӯмак ба донишҷӯён...",
    description_ru: "Образовательная платформа, помогающая студентам...",
    image_url: null,
    live_url: null,
    github_url: null,
    technologies: ["React", "Redux Toolkit", "Tailwind CSS", "Node.js"],
    featured: true,
    sort_order: 2
  }
]