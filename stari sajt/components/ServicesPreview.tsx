'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaPencilRuler, FaEye, FaLightbulb } from 'react-icons/fa'
import { fadeIn, staggerContainer } from '@/utils/animations'

const services = [
  {
    icon: <FaPencilRuler className="text-5xl" />,
    title: 'Projektovanje',
    description: 'Idejna rješenja, glavni i izvedbeni projekti sa detaljima i funkcionalnošću.',
  },
  {
    icon: <FaEye className="text-5xl" />,
    title: 'Nadzor',
    description: 'Stručni nadzor nad izvođenjem radova do finalne realizacije.',
  },
  {
    icon: <FaLightbulb className="text-5xl" />,
    title: 'Konsulting',
    description: 'Savjetovanje investitora, analiza prostora i priprema dokumentacije.',
  },
]

export default function ServicesPreview() {
  return (
    <section className="py-20 px-6 bg-primary text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif mb-4">Šta radimo</h2>
          <p className="text-xl text-gray-300">Naše stručne usluge</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeIn}
              className="text-center group"
            >
              <div className="text-accent mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4">{service.title}</h3>
              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-block bg-accent text-white px-10 py-4 text-lg hover:bg-opacity-90 transition-all"
          >
            Sve usluge
          </Link>
        </div>
      </div>
    </section>
  )
}
