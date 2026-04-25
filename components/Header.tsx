'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'





export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale()
  const router = useRouter()

  const languages = [
    { code: "tj", label: 'Тоҷикӣ', flag: "🇹🇯" },
    { code: "ru", label: 'Русский', flag: "🇷🇺" },
    { code: "en", label: 'English', flag: "🇺🇸" },
  ] as const;

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'certificates', href: '#certificates' },
    { key: 'contact', href: '#contact' },
  ] as const

  const [isOpen, setIsOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const handleLangChange = (newLocale: string) => {
    router.replace(`/${newLocale}`)
  }


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.a
            href="#home"
            className="text-xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            {/* {t("Admin.Name")} */}
            muhsiddin.dev
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.key}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
              >
                {t(item.key)}
              </motion.a>
            ))}

            {/* Language Dropdown */}
            <div className="relative flex gap-3 items-center">
              <AnimatedThemeToggler />
              <div className="relative inline-block text-left">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-2 min-w-[90px]"
                >
                  <span>{currentLang.flag}</span>
                  <span className="uppercase">{currentLang.code}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                <AnimatePresence>
                  {langDropdownOpen && (
                    <>
                      {/* Барои он ки агар берун аз меню клик кунӣ, он пӯшида шавад */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setLangDropdownOpen(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50"
                      >
                        <div className="py-1">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => handleLangChange(lang.code)}
                              className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-muted transition-colors ${currentLang.code === lang.code ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                                }`}
                            >
                              <span className="text-lg">{lang.flag}</span>
                              <span>{lang.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <AnimatedThemeToggler />
            {/* Language Dropdown Mobile */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2"
              >
                <span>{currentLang?.flag}</span>
                <span className="uppercase">{currentLang?.code}</span>
              </Button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg overflow-hidden min-w-[140px] z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          // setLanguage(lang.code)
                          setLangDropdownOpen(false)
                        }}
                        className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-muted transition-colors ${currentLang?.code === lang.code ? 'bg-primary/10 text-primary' : 'text-foreground'
                          }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-4 py-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 10 }}
                  >
                    {t(item.key)}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
