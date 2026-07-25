'use client'

import { cn } from '@/lib/utils'

const LANGS = [
  { id: 'tj', label: 'TJ' },
  { id: 'ru', label: 'RU' },
  { id: 'en', label: 'EN' },
] as const

export type LangTab = 'tj' | 'ru' | 'en'

interface LangTabsProps {
  value: LangTab
  onChange: (value: LangTab) => void
}

export function LangTabs({ value, onChange }: LangTabsProps) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
      {LANGS.map((lang) => (
        <button
          key={lang.id}
          type="button"
          onClick={() => onChange(lang.id)}
          className={cn(
            'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
            value === lang.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
