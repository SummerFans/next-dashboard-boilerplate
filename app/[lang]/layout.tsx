import './globals.css'
import type { Metadata } from 'next'
import { dir } from 'i18next'
import { Inter } from 'next/font/google'
import Providers from '@/context/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  params: {
    lang
  }
}: {
  children: React.ReactNode,
  params: {
    lang: Lang
  }
}) {
  return (
    <html lang={lang} dir={dir(lang)} className={inter.className + "h-full"}>
      <body className="h-full bg-white dark:bg-gray-900"><Providers>{children}</Providers></body>
    </html>
  )
}
