'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Award, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations, useLocale } from 'next-intl'
import { CERTIFICATES_DATA } from '@/lib/data'
import Image from 'next/image'

interface Certificate {
    id: string;
    title_en: string;
    title_tj: string;
    title_ru: string;
    issuer_en: string;
    issuer_tj: string;
    issuer_ru: string;
    image_url: string | null;
    issue_date: string;
    credential_url: string | null;
}

function CertificateCard({
    certificate,
    index,
    onImageClick
}: {
    certificate: Certificate;
    index: number;
    onImageClick: (url: string) => void
}) {
    const t = useTranslations("certificates")
    const locale = useLocale()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-50px' })

    const title = certificate[`title_${locale}` as keyof Certificate] || certificate.title_en
    const issuer = certificate[`issuer_${locale}` as keyof Certificate] || certificate.issuer_en

    const dateLocales: Record<string, string> = {
        tj: 'tg-TJ',
        ru: 'ru-RU',
        en: 'en-US',
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all shadow-sm"
        >
            {certificate.image_url ? (
                <div
                    className="aspect-3/3 bg-muted overflow-hidden cursor-pointer relative"
                    onClick={() => onImageClick(certificate.image_url!)}
                >
                    <Image
                        src={certificate.image_url}
                        alt={title as string}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                            {t("view")}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <Award className="h-16 w-16 text-primary/40" />
                </div>
            )}

            <div className="p-5">
                <h3 className="text-md font-bold text-foreground mb-1 line-clamp-1">{title as string}</h3>
                <p className="text-muted-foreground text-xs mb-2">
                    {t("issuedBy")}: <span className="font-medium">{issuer as string}</span>
                </p>

                {certificate.issue_date && (
                    <p className="text-muted-foreground text-[11px] mb-4 uppercase tracking-wider">
                        {new Date(certificate.issue_date).toLocaleDateString(dateLocales[locale], {
                            year: 'numeric',
                            month: 'long',
                        })}
                    </p>
                )}

                {certificate.credential_url && (
                    <Button variant="outline" size="sm" className="w-full text-xs h-8" asChild>
                        <a href={certificate.credential_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-2" />
                            {t("verify")}
                        </a>
                    </Button>
                )}
            </div>
        </motion.div>
    )
}

export function CertificatesSection() {
    const t = useTranslations("certificates")
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [lightboxImage, setLightboxImage] = useState<string | null>(null)

    return (
        <section id="certificates" className="py-24 bg-muted/20">
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

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {CERTIFICATES_DATA.map((certificate, index) => (
                        <CertificateCard
                            key={certificate.id}
                            certificate={certificate}
                            index={index}
                            onImageClick={setLightboxImage}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-3xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute -top-12 right-0 text-white hover:bg-white/10"
                                onClick={() => setLightboxImage(null)}
                            >
                                <X className="h-8 w-8" />
                            </Button>
                            <Image
                                src={lightboxImage}
                                alt="Certificate Full"
                                width={800}
                                height={600}
                                className="w-full h-auto rounded-lg shadow-2xl border border-white/10"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}