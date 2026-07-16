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
  { id: 9, name: "Shadcn UI", category: "UI Libraries", proficiency: 100, sort_order: 10, icon: null },
  { id: 10, name: "Magic UI", category: "UI Libraries", proficiency: 100, sort_order: 9, icon: null },
  { id: 11, name: "Ant Design", category: "UI Libraries", proficiency: 100, sort_order: 11, icon: null },
  { id: 12, name: "MUI UI", category: "UI Libraries", proficiency: 100, sort_order: 12, icon: null },

  // --- State Management ---
  { id: 13, name: "Redux Toolkit", category: "State Management", proficiency: 95, sort_order: 12, icon: null },
  { id: 14, name: "Redux Toolkit  Query", category: "State Management", proficiency: 95, sort_order: 12, icon: null },
  { id: 15, name: "Zustand", category: "State Management", proficiency: 90, sort_order: 13, icon: null },
  { id: 16, name: "Jotai", category: "State Management", proficiency: 90, sort_order: 14, icon: null },

  // --- Data Fetching ---
  { id: 17, name: "Axios", category: "Data Fetching", proficiency: 95, sort_order: 15, icon: null },
  { id: 18, name: "Fetch", category: "Data Fetching", proficiency: 90, sort_order: 16, icon: null },
  { id: 19, name: "TanStack Query", category: "Data Fetching", proficiency: 40, sort_order: 17, icon: null },

  // --- Next.js (Features) ---
  { id: 20, name: "Client Components", category: "Next.js", proficiency: 95, sort_order: 18, icon: null },
  { id: 21, name: "Server Components", category: "Next.js", proficiency: 93, sort_order: 19, icon: null },
  { id: 22, name: "Middleware", category: "Next.js", proficiency: 90, sort_order: 20, icon: null },
  { id: 23, name: "Routing", category: "Next.js", proficiency: 90, sort_order: 21, icon: null },
  { id: 24, name: "Server Actions", category: "Next.js", proficiency: 80, sort_order: 22, icon: null },

  // --- React (Features) ---
  { id: 25, name: "Hooks", category: "React", proficiency: 90, sort_order: 23, icon: null },
]

export const PROJECTS_DATA = [
  {
    id: "a64f9380-5a9e-421a-a874-b88a7cb645e5",
    title_en: "e-Kitobxona",
    title_tg: "e-Kitobxona",
    title_ru: "e-Kitobxona",

    description_en: "A comprehensive library management system for educational institutions. Includes an admin dashboard for managing schools, regional filtering, and an interactive map interface for precise location tracking using React Leaflet.",

    description_tj: "Системаи мукаммали идоракунии китобхонаҳо барои муассисаҳои таълимӣ. Дорои панели администратор барои идоракунии мактабҳо, филтратсия аз рӯи минтақаҳо ва харитаи интерактивӣ барои муайян кардани ҷойгиршавии муассисаҳо бо истифода аз React Leaflet.",

    description_ru: "Комплексная система управления библиотеками для образовательных учреждений. Включает панель администратора для управления школами, фильтрацию по регионам и интерактивный интерфейс карты для точного определения местоположения с использованием React Leaflet.",

    image_url: "/imageEKitobxona.png",
    live_url: "https://e-kitobxona.vercel.app",
    github_url: "https://github.com/Muhsiddin-dev/E-KITOBXONA",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Magic UI",
      "RTK Query",
      "Lucide React"
    ],

    featured: true,
    sort_order: 1
  },
  {
    "id": "5f98a53a-17e8-46ba-b95d-ac9b5ic86a96",
    "title_en": "DonishYob",
    "title_tg": "DonishYob",
    "title_ru": "DonishYob",
    "description_en": "A comprehensive educational ecosystem providing students with access to digital libraries, course materials, and interactive learning tools. Built with a focus on performance and seamless user experience.",
    "description_tj": "Экосистемаи мукаммали таълимӣ, ки ба донишҷӯён имкони истифодаи китобхонаи рақамӣ, маводҳои курсӣ ва асбобҳои интерактивии омӯзишро фароҳам меорад. Бо тамаркуз ба суръат ва роҳати истифодабарӣ сохта шудааст.",
    "description_ru": "Комплексная образовательная экосистема, предоставляющая студентам доступ к цифровым библиотекам, учебным материалам и интерактивным инструментам обучения. Разработана с акцентом на производительность и удобство пользователя.",
    "image_url": "/imageDonishYob.png",
    "live_url": "https://donishyob.vercel.app/",
    "github_url": "https://github.com/Muhsiddin-dev/DonishYob",
    "technologies": [
      "Next.js",
      "TypeScript",
      "React",
      "Tanstack Query",
      "Tailwind CSS",
      "Zod"
    ],
    "featured": true,
    "sort_order": 1
  },
  {
    "id": "a64f9380-5a9e-421a-a874-b88a7cb645",
    "title_en": "MTMU 97",
    "title_ru": "MTMU 97",
    "title_tj": "MTMU 97",

    "description_en": "Secondary General Education Institution №97 of Dushanbe. Information on admissions, faculty, facilities, and student achievements. Build your child's future with us!",

    "description_tj": "Муассисаи таҳсилоти миёнаи умумии №97-и шаҳри Душанбе. Маълумот дар бораи қабул, омӯзгорон, синфхонаҳо ва дастовардҳои хонандагон. Ояндаи фарзанди худро бо мо созед!",

    "description_ru": "Среднее общеобразовательное учреждение №97 города Душанбе. Информация о приёме, учителях, учебных классах и достижениях учащихся. Стройте будущее своего ребенка вместе с нами!",

    "image_url": "/imageMTMU97.png",
    "live_url": "https://mtmu-97.vercel.app/",
    "github_url": "https://github.com/Muhsiddin-dev/MTMU_97",

    "technologies": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Magic UI",
      "Zustand",
      "Lucide React"
    ],

    "featured": true,
    "sort_order": 1
  },
  // {
  //   "id": "a64f9380-5a9e-421a-a874-b88a7cb645",
  //   "title_en": "CRM Saliheen",
  //   "title_ru": "CRM Saliheen",
  //   "title_tj": "CRM Saliheen",

  //   "description_en": "An internal management system designed for Saliheen CRM to track finances, manage user applications, and monitor committee workflows. Features include real-time analytics, status tracking, and automated reporting.",

  //   "description_tj": "Системаи мукаммали идоракунии Saliheen CRM барои назорати молиявӣ, идоракунии дархостҳои корбарон ва мониторинги фаъолияти кумитаҳо. Дорои аналитикаи вақти воқеӣ, пайгирии ҳолати дархостҳо ва ҳисоботи худкор.",

  //   "description_ru": "Комплексная система управления Saliheen CRM для финансового контроля, обработки заявок пользователей и мониторинга деятельности комитетов. Включает аналитику в реальном времени, отслеживание статусов заявок и автоматическую отчетность.",

  //   "image_url": "https://mtmu-97.vercel.app/mtmu_97.png",
  //   "live_url": "https://mtmu-97.vercel.app/",
  //   "github_url": "https://github.com/Muhsiddin-dev/MTMU_97",

  //   "technologies": [
  //     "Next.js",
  //     "TypeScript",
  //     "Tailwind CSS",
  //     "Shadcn UI",
  //     "Redux Toolkit Query",
  //     "Lucide React",
  //     "Recharts",
  //     "Sonner"
  //   ],

  //   "featured": true,
  //   "sort_order": 1
  // }
]

export const CERTIFICATES_DATA = [
  {
    id: "1",
    title_en: "Frontend Development Certificate",
    title_tj: "Сертификати Таҳияи Frontend",
    title_ru: "Сертификат Frontend-разработки",
    issuer_en: "SoftClub.tj",
    issuer_tj: "SoftClub.tj",
    issuer_ru: "SoftClub.tj",
    image_url: '/Certificate_Of_SoftClub.jpg',
    issue_date: "2026-01-05",
    credential_url: null,
    sort_order: 1
  },
];