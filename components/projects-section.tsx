'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { PROJECTS_DATA } from '@/lib/data'
import Image from 'next/image'

interface ProjectCardProps {
    project: typeof PROJECTS_DATA[0]
    index: number
}

function ProjectCard({ project, index }: ProjectCardProps) {
    const t = useTranslations("projects")
    const locale = useLocale()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    const title = project[`title_${locale}` as keyof typeof project] || project.title_en
    const description = project[`description_${locale}` as keyof typeof project] || project.description_en

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors shadow-sm"
        >
            {project.image_url ? (
                <div className="aspect-video bg-linear-to-br from-primary/10 to-accent/10 overflow-hidden relative">
                    <Image
                        src={project.image_url}
                        alt={title as string}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            ) : (
                <div className="aspect-video bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Folder className="h-16 w-16 text-primary/50" />
                </div>
            )}

            <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {title as string}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
                    {description as string}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-xs rounded-full border border-border"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-3">
                    {project.live_url && (
                        <Button size="sm" asChild className="cursor-pointer">
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t("viewLive")}
                            </a>
                        </Button>
                    )}
                    {project.github_url && (
                        <Button variant="outline" size="sm" asChild className="cursor-pointer">
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4 mr-2"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                                {t("viewCode")}
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

export function ProjectsSection() {
    const t = useTranslations("projects")
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })

    const sortedProjects = [...PROJECTS_DATA].sort((a, b) => a.sort_order - b.sort_order)

    return (
        <section id="projects" className="py-24 bg-background">
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
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
                    <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {sortedProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
