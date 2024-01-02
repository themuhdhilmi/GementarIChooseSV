import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from './components/Header'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'iChooseSV',
  description: 'Developed by Gementar Team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <Providers>

        <body className={inter.className}>
          <Header />
          {children}
        </body>

      </Providers>

    </html>
  )
}