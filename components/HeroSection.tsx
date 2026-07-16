'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Mail, Send } from 'lucide-react'
// import { useLanguage, getLocalizedText } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Admin } from '@/types/types'
import { useTranslations } from 'next-intl'
import EffectFlipComponent from './swipper/Effect-Flip/effect-flip'
import { TypingAnimation } from './ui/typing-animation'


export function HeroSection() {
    const t = useTranslations("hero")
    const Admin_Translation = useTranslations("Admin")

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative md:top-0 top-14 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-accent/5" />

            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
                    animate={{
                        x: [0, -100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="relative w-64 h-64 md:w-80 md:h-80"
                    >
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl z-10">
                            <EffectFlipComponent Admin_Name={Admin_Translation("name")} />
                        </div>

                        <motion.div
                            className="absolute inset-0 rounded-full duration-200 border-2 border-primary/30 border-dashed"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: 'calc(100% + 20px)',
                                height: 'calc(100% + 20px)',
                                top: '-10px',
                                left: '-10px'
                            }}
                        />
                    </motion.div>

                    <div className="text-center lg:text-left max-w-xl">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-primary font-medium mb-4"
                        >
                            {t("greeting")}
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="min-h-25  min-w-xs max-w-2xs w-full md:min-h-37.5 "
                        >
                            <TypingAnimation
                                words={[
                                    Admin_Translation("name")
                                ]}
                                cursorStyle="underscore"
                                loop={true}
                                className="text-4xl md:text-6xl font-bold text-foreground mb-6 h-[80px] md:h-[120px] block"
                            />
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl text-muted-foreground mb-8"
                        >
                            {Admin_Translation("role")}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
                        >
                            <Button size="lg" asChild>
                                <a href="#projects">
                                    {t("viewProjects")}
                                    <ArrowDown className="ml-2 h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href="#contact">{t("downloadCV")}</a>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex justify-center lg:justify-start gap-6"
                        >
                            <motion.a
                                href={Admin.github_UserName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.2, y: -5 }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-6 w-6"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.2-.3 2.4 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href={Admin.linkedin_UserName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.2, y: -5 }}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href={Admin.telegram_UserName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.2, y: -5 }}
                            >
                                <Send className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href={`mailto:${Admin.email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.2, y: -5 }}
                            >
                                <Mail className="h-6 w-6" />
                            </motion.a>
                            <motion.a
                                href={Admin.Instagram_UserName}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.2, y: -5 }}
                            >
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
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
        </section>
    )
}
