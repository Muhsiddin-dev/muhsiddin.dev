'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Code2, Sparkles } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useContentStore } from '@/hooks/use-content-store'
import type { Language } from '@/types/types'

export function AboutSection() {
    const t = useTranslations('about')
    const locale = useLocale() as Language
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const { personal, projects, skills } = useContentStore()

    const summary = personal[`summary_${locale}`] || personal.summary_en
    const education = personal[`education_${locale}`] || personal.education_en

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <section id="about" className="py-24 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="max-w-4xl mx-auto"
                >
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {t("title")}
                        </h2>
                        <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div variants={itemVariants} className="space-y-6">
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {summary}
                            </p>

                            <div className="flex items-start gap-4 p-4 bg-card rounded-lg border border-border">
                                <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-foreground">{t("education")}</h3>
                                    <p className="text-muted-foreground">{education}</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                            <div className="bg-card p-6 rounded-xl border border-border text-center">
                                <Code2 className="h-8 w-8 text-primary mx-auto mb-3" />
                                <div className="text-3xl font-bold text-foreground">{projects.length}+</div>
                                <div className="text-muted-foreground text-sm">
                                    {t("Myprojects")}
                                </div>
                            </div>
                            <div className="bg-card p-6 rounded-xl border border-border text-center">
                                <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
                                <div className="text-3xl font-bold text-foreground">{skills.length}+</div>
                                <div className="text-muted-foreground text-sm">
                                    {t("Myskills")}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
