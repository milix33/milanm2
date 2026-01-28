'use client'

import Link from 'next/link'
import { FaBuilding, FaBriefcase, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

const links = [
  {
    icon: <FaBuilding className="text-4xl" />,
    title: 'Portfolio',
    description: 'Pogledajte naše realizovane projekte',
    href: '/portfolio',
  },
  {
    icon: <FaBriefcase className="text-4xl" />,
    title: 'Usluge',
    description: 'Saznajte više o našim uslugama',
    href: '/services',
  },
  {
    icon: <FaEnvelope className="text-4xl" />,
    title: 'Kontakt',
    description: 'Razgovarajmo o vašem projektu',
    href: '/contact',
  },
]

export default function QuickLinks() {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {links.map((link, index) => (
          <motion.div
            key={link.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
          >
            <Link href={link.href} className="group block">
              <div className="bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  {link.icon}
                </div>
                <h3 className="text-2xl font-serif mb-3">{link.title}</h3>
                <p className="text-gray-600">{link.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
