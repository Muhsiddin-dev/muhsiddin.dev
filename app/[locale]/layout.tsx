import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Muhsiddin Nazarov | Junior Frontend Developer',
  description: 'Portfolio of Muhsiddin Nazarov, a Junior Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies.',
  keywords: ['Frontend Developer', 'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Web Developer', 'Tajikistan'],
  authors: [{ name: 'Muhsiddin Nazarov' }],
  creator: 'Muhsiddin Nazarov',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Muhsiddin Nazarov | Junior Frontend Developer',
    description: 'Portfolio of Muhsiddin Nazarov, a Junior Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies.',
    siteName: 'Muhsiddin Nazarov Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhsiddin Nazarov | Junior Frontend Developer',
    description: 'Portfolio of Muhsiddin Nazarov, a Junior Frontend Developer specializing in React, Next.js, TypeScript, and modern web technologies.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={cn("h-full antialiased", geist.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}