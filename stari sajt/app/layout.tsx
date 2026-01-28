import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Using Inter as default font (can be replaced with custom font later)
// To use custom font, add font files to public/fonts/ and uncomment localFont code below
const brandFont = Inter({ 
  subsets: ['latin'],
  variable: '--font-brand',
  display: 'swap',
})

// Custom font configuration (uncomment when font files are added)
// import localFont from 'next/font/local'
// const brandFont = localFont({
//   src: [
//     { path: '../public/fonts/YourFont-Regular.woff2', weight: '400', style: 'normal' },
//     { path: '../public/fonts/YourFont-Bold.woff2', weight: '700', style: 'normal' }
//   ],
//   variable: '--font-brand',
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: 'M² Architecture – Projektovanje, Nadzor i Konsulting',
  description: 'M² Architecture je studio za arhitektonsko projektovanje, nadzor i konsulting. Portfolio inovativnih projekata u Bosni i Hercegovini i šire.',
  keywords: 'arhitektonski projekt, arhitektonska usluga, portfolio arhitekture, arhitekt, Prnjavor, Doboj, BiH, projektovanje, nadzor',
  authors: [{ name: 'Milan Milinčić' }],
  openGraph: {
    title: 'M² Architecture',
    description: 'Projektovanje, Nadzor i Konsulting',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr" className={brandFont.variable}>
      <body className={`${brandFont.variable} font-sans overflow-hidden`}>
        <main className="w-full h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
