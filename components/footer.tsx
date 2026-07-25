'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Mail, Send, Lock, Code2 } from 'lucide-react'
import { useContentStore } from '@/hooks/use-content-store'
import { Language } from '@/types/types'

export function Footer() {
  const t = useTranslations('nav')
  const locale = useLocale() as Language
  const { personal } = useContentStore()
  const fullName = `${personal[`name_${locale}`]} ${personal[`surname_${locale}`]}`
  const role = personal[`role_${locale}`]

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'certificates', href: '#certificates' },
    { key: 'contact', href: '#contact' },
  ] as const

  return (
    // Илова кардани mt-20 барои он ки футер аз болои сайт канда шуда бошад ва начаспад
    <footer className="relative mt-20 border-t border-border/60 bg-card/40 pt-16 pb-12 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4 pb-12 border-b border-border/60">
          
          <div className="flex flex-col gap-4 lg:col-span-2">
            <motion.a
              href="#home"
              className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2 w-fit"
              whileHover={{ scale: 1.02 }}
            >
              muhsiddin.dev
              <Code2 className="size-5 text-primary" />
            </motion.a>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {role} · Таҳияи барномаҳо ва интерфейсҳои вебии замонавӣ бо истифода аз технологияҳои пешрафта.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 pt-2"
            >
              {personal.github && (
                <motion.a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border/80 bg-background/50 p-2.5 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </motion.a>
              )}
              {personal.linkedin && (
                <motion.a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border/80 bg-background/50 p-2.5 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              )}
              {personal.telegram && (
                <motion.a
                  href={personal.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border/80 bg-background/50 p-2.5 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <Send className="h-4 w-4" />
                </motion.a>
              )}
              {personal.email && (
                <motion.a
                  href={`mailto:${personal.email}`}
                  className="rounded-xl border border-border/80 bg-background/50 p-2.5 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                >
                  <Mail className="h-4 w-4" />
                </motion.a>
              )}
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Саҳифаҳо</h3>
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
                  >
                    {t(item.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">Система</h3>
            <div className="flex flex-col gap-2">
              <Link
                href={`/${locale}/admin`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group w-fit"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background group-hover:border-primary/50 transition-colors">
                  <Lock className="size-3.5" />
                </span>
                Панели Админ
              </Link>
              <span className="text-xs text-muted-foreground/70 pt-1">
                Барои идоракунии мундариҷаи сайт.
              </span>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} {fullName}. Ҳамаи ҳуқуқҳо ҳифз шудаанд.</p>
          <p className="flex items-center gap-1.5">
            Сохта шудааст бо <span className="text-primary font-medium">Next.js</span>, <span className="text-primary font-medium">TypeScript</span> & <span className="text-primary font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}