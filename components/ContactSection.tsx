'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Send, MapPin } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { useContentStore } from '@/hooks/use-content-store'
import type { Language } from '@/types/types'

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const InstagramIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
)

export function ContactSection() {
    const t = useTranslations("contact")
    const locale = useLocale()
    const ref = useRef(null)
    const { personal } = useContentStore()

    const locationLabels: Record<Language, string> = {
        tj: `${personal.city}, Тоҷикистон`,
        ru: `${personal.city}, Таджикистан`,
        en: `${personal.city}, ${personal.country}`,
    }
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const contactItems = [
        {
            icon: Mail,
            label: "Email",
            value: personal.email,
            href: personal.email ? `mailto:${personal.email}` : undefined,
        },
        {
            icon: GithubIcon,
            label: 'GitHub',
            value: personal.github?.replace('https://github.com/', '@'),
            href: personal.github,
        },
        {
            icon: LinkedinIcon,
            label: 'LinkedIn',
            value: personal.linkedin?.replace('https://linkedin.com/in/', '@'),
            href: personal.linkedin,
        },
        {
            icon: Send,
            label: 'Telegram',
            value: personal.telegram?.replace('https://t.me/', '@'),
            href: personal.telegram,
        },
        {
            icon: InstagramIcon,
            label: 'instagram',
            value: personal.instagram?.replace('https://www.instagram.com/', '@'),
            href: personal.instagram,
        },
    ].filter(item => item.value)

    return (
        <section id="contact" className="py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground">{t("subtitle")}</p>
                    <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    <div className="grid sm:grid-cols-2 gap-6">
                        {contactItems.map((item, index) => {
                            return (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    target={item.href?.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary/50 transition-colors"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{item.label}</p>
                                        <p className="text-foreground font-medium">{item.value}</p>
                                    </div>
                                </motion.a>
                            )
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 text-center"
                    >
                        <div className="inline-flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{locationLabels[locale as Language]}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
