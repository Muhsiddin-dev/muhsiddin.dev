'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Award, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'



function CertificateCard({ certificate, index, onImageClick }: { 
  onImageClick: (url: string) => void 
}) {
  const { language, t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const title = getLocalizedText(certificate, 'title', language)
  const issuer = getLocalizedText(certificate, 'issuer', language)

  const verifyLabel = {
    tg: 'Тасдиқ',
    ru: 'Проверить',
    en: 'Verify',
  }

  const dateLocales = {
    tg: 'tg-TJ',
    ru: 'ru-RU',
    en: 'en-US',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors"
    >
      {certificate.image_url ? (
        <div 
          className="aspect-[4/3] bg-muted overflow-hidden cursor-pointer"
          onClick={() => onImageClick(certificate.image_url!)}
        >
          <img
            src={certificate.image_url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <Award className="h-20 w-20 text-primary/50" />
        </div>
      )}

      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-3">
          {t.certificates.issuedBy} {issuer}
        </p>
        {certificate.issue_date && (
          <p className="text-muted-foreground text-sm mb-4">
            {new Date(certificate.issue_date).toLocaleDateString(dateLocales[language], {
              year: 'numeric',
              month: 'long',
            })}
          </p>
        )}
        {certificate.credential_url && (
          <Button variant="outline" size="sm" asChild>
            <a href={certificate.credential_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              {verifyLabel[language]}
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  return (
    <section id="certificates" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.certificates.title}
          </h2>
          <p className="text-muted-foreground">{t.certificates.subtitle}</p>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {certificates.map((certificate, index) => (
            <CertificateCard 
              key={certificate.id} 
              certificate={certificate} 
              index={index}
              onImageClick={setLightboxImage}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0"
              onClick={() => setLightboxImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={lightboxImage}
              alt="Certificate"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
