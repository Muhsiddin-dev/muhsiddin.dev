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
  Instagram_UserName: "https://www.instagram.com/_nazarov._011",
  website: "https://muhsiddin.dev",
  Age: 15,
  Country: "Tajikistan",
  City: "Dushanbe",
  role: "Frontend Developer"
}

// export interface PersonalInfo {
//   id: string
//   name_en: string
//   name_tg: string
//   name_ru: string
//   role_en: string
//   role_tg: string
//   role_ru: string
//   summary_en: string
//   summary_tg: string
//   summary_ru: string
//   photo_url: string | null
//   email: string | null
//   github: string | null
//   linkedin: string | null
//   telegram: string | null
// }

export interface Project {
  id: string
  title_en: string
  title_tg: string
  title_ru: string
  description_en: string
  description_tg: string
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
  title_tg: string
  title_ru: string
  issuer_en: string
  issuer_tg: string
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

// export const translations = {
//   tg: {
//     nav: {
//       home: 'Асосӣ',
//       about: 'Дар бораи ман',
//       skills: 'Малакаҳо',
//       projects: 'Лоиҳаҳо',
//       certificates: 'Сертификатҳо',
//       contact: 'Тамос',
//     },
//     hero: {
//       greeting: 'Салом, ман',
//       downloadCV: 'Боргирии CV',
//       viewProjects: 'Лоиҳаҳоро бинед',
//     },
//     about: {
//       title: 'Дар бораи ман',
//       education: 'Таҳсилот',
//       educationDesc: 'Сертификати Таҳияи Frontend аз SoftClub',
//     },
//     skills: {
//       title: 'Малакаҳо',
//       subtitle: 'Технологияҳое, ки ман истифода мебарам',
//     },
//     projects: {
//       title: 'Лоиҳаҳо',
//       subtitle: 'Кори охирини ман',
//       viewLive: 'Дидан',
//       viewCode: 'Код',
//     },
//     certificates: {
//       title: 'Сертификатҳо',
//       subtitle: 'Дастовардҳои касбӣ',
//       issuedBy: 'Аз ҷониби',
//     },
//     contact: {
//       title: 'Тамос',
//       subtitle: 'Бо ман алоқа гиред',
//       email: 'Почтаи электронӣ',
//     },
//     footer: {
//       rights: 'Ҳамаи ҳуқуқҳо ҳифз шудаанд',
//     },
//     admin: {
//       login: 'Воридшавӣ',
//       logout: 'Баромадан',
//       dashboard: 'Панели идоракунӣ',
//       password: 'Рамз',
//       submit: 'Фиристодан',
//       save: 'Захира кардан',
//       cancel: 'Бекор кардан',
//       edit: 'Таҳрир',
//       delete: 'Нест кардан',
//       add: 'Илова кардан',
//       personalInfo: 'Маълумоти шахсӣ',
//       projectsList: 'Рӯйхати лоиҳаҳо',
//       certificatesList: 'Рӯйхати сертификатҳо',
//       uploadImage: 'Бор кардани тасвир',
//       uploadPhoto: 'Бор кардани сурат',
//     },
//   },
//   ru: {
//     nav: {
//       home: 'Главная',
//       about: 'Обо мне',
//       skills: 'Навыки',
//       projects: 'Проекты',
//       certificates: 'Сертификаты',
//       contact: 'Контакты',
//     },
//     hero: {
//       greeting: 'Привет, я',
//       downloadCV: 'Скачать CV',
//       viewProjects: 'Смотреть проекты',
//     },
//     about: {
//       title: 'Обо мне',
//       education: 'Образование',
//       educationDesc: 'Сертификат Frontend-разработки от SoftClub',
//     },
//     skills: {
//       title: 'Навыки',
//       subtitle: 'Технологии, с которыми я работаю',
//     },
//     projects: {
//       title: 'Проекты',
//       subtitle: 'Мои последние работы',
//       viewLive: 'Демо',
//       viewCode: 'Код',
//     },
//     certificates: {
//       title: 'Сертификаты',
//       subtitle: 'Профессиональные достижения',
//       issuedBy: 'Выдан',
//     },
//     contact: {
//       title: 'Контакты',
//       subtitle: 'Свяжитесь со мной',
//       email: 'Электронная почта',
//     },
//     footer: {
//       rights: 'Все права защищены',
//     },
//     admin: {
//       login: 'Вход',
//       logout: 'Выход',
//       dashboard: 'Панель управления',
//       password: 'Пароль',
//       submit: 'Отправить',
//       save: 'Сохранить',
//       cancel: 'Отмена',
//       edit: 'Редактировать',
//       delete: 'Удалить',
//       add: 'Добавить',
//       personalInfo: 'Личная информация',
//       projectsList: 'Список проектов',
//       certificatesList: 'Список сертификатов',
//       uploadImage: 'Загрузить изображение',
//       uploadPhoto: 'Загрузить фото',
//     },
//   },
//   en: {
//     nav: {
//       home: 'Home',
//       about: 'About',
//       skills: 'Skills',
//       projects: 'Projects',
//       certificates: 'Certificates',
//       contact: 'Contact',
//     },
//     hero: {
//       greeting: 'Hello, I am',
//       downloadCV: 'Download CV',
//       viewProjects: 'View Projects',
//     },
//     about: {
//       title: 'About Me',
//       education: 'Education',
//       educationDesc: 'Frontend Development Certificate from SoftClub',
//     },
//     skills: {
//       title: 'Skills',
//       subtitle: 'Technologies I work with',
//     },
//     projects: {
//       title: 'Projects',
//       subtitle: 'My recent work',
//       viewLive: 'Live Demo',
//       viewCode: 'Source Code',
//     },
//     certificates: {
//       title: 'Certificates',
//       subtitle: 'Professional achievements',
//       issuedBy: 'Issued by',
//     },
//     contact: {
//       title: 'Contact',
//       subtitle: 'Get in touch with me',
//       email: 'Email',
//     },
//     footer: {
//       rights: 'All rights reserved',
//     },
//     admin: {
//       login: 'Login',
//       logout: 'Logout',
//       dashboard: 'Admin Dashboard',
//       password: 'Password',
//       submit: 'Submit',
//       save: 'Save',
//       cancel: 'Cancel',
//       edit: 'Edit',
//       delete: 'Delete',
//       add: 'Add',
//       personalInfo: 'Personal Info',
//       projectsList: 'Projects List',
//       certificatesList: 'Certificates List',
//       uploadImage: 'Upload Image',
//       uploadPhoto: 'Upload Photo',
//     },
//   },
// } as const
