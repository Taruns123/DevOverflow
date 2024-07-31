import React from 'react'
import './globals.css'

// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from 'next/font/google'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeProvider'

const inter = Inter(
  {
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-inter',
  }
)

const spaceGrotesk = Space_Grotesk(
  {
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-spaceGrotesk',
  }
)


export const metadata: Metadata = {
  title: 'DevFlow',
  description: 'A communtiy for developers to share their knowledge and grow together',
  icons: {
    icon: '/assets/images/site-logo.svg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} `}>

        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}