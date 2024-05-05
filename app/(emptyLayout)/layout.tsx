import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeModeScript } from 'flowbite-react'
import { Suspense } from 'react'
import { Providers } from '../(mainLayout)/providers'
import Header from './components/Header'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'iChooseSV',
  description: 'Developed by Gementar Team',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Providers>
        <head>
          <ThemeModeScript />
        </head>
        <body className={inter.className}>
          {/* <Header/> */}
          <Suspense>{children}</Suspense>
        </body>
      </Providers>
    </html>
  )
}
