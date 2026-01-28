'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ContactCTA() {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-5xl font-serif mb-6">Imate projekat na umu?</h2>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Kontaktirajte nas za besplatne konsultacije. Razgovarajmo o tome kako možemo 
          pretvoriti vaše ideje u stvarnost.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-accent text-white px-12 py-5 text-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
        >
          Pošaljite upit
        </Link>
      </motion.div>
    </section>
  )
}
