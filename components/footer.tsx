'use client'

import { useTranslations } from 'next-intl'


export function Footer() {
  // const currentYear = new Date().getFullYear()
  const t = useTranslations()
  
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; <span className='underline'> 21.01.2011 </span> {t('Admin.name')}. {t('footer.rights')}.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
