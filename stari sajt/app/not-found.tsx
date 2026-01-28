'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-9xl font-serif text-accent mb-4">404</h1>
        <h2 className="text-4xl font-serif mb-6">Stranica nije pronađena</h2>
        <p className="text-xl text-gray-600 mb-10">
          Stranica koju tražite ne postoji ili je premeštena.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-accent text-white px-10 py-4 text-lg hover:bg-opacity-90 transition-all"
          >
            Nazad na početnu
          </Link>
          <Link
            href="/portfolio"
            className="inline-block bg-transparent border-2 border-primary text-primary px-10 py-4 text-lg hover:bg-primary hover:text-white transition-all"
          >
            Pogledaj projekte
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
