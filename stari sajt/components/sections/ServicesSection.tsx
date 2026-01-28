'use client'

import { motion } from 'framer-motion'
import { FaBuilding, FaEye, FaLightbulb, FaRuler, FaPencilRuler, FaCube } from 'react-icons/fa'
import { fadeIn, staggerContainer } from '@/utils/animations'

const services = [
  {
    icon: <FaPencilRuler className="text-3xl sm:text-4xl" />,
    title: 'Projektovanje',
    description: 'Idejna rješenja, glavni i izvedbeni projekti sa detaljima i funkcionalnošću.'
  },
  {
    icon: <FaEye className="text-3xl sm:text-4xl" />,
    title: 'Nadzor',
    description: 'Stručni nadzor nad izvođenjem radova do finalne realizacije.'
  },
  {
    icon: <FaLightbulb className="text-3xl sm:text-4xl" />,
    title: 'Konsulting',
    description: 'Savjetovanje investitora, analiza prostora i priprema dokumentacije.'
  },
  {
    icon: <FaRuler className="text-3xl sm:text-4xl" />,
    title: 'Enterijer',
    description: 'Dizajn unutrašnjih prostora koji spajaju estetiku i funkcionalnost.'
  },
  {
    icon: <FaBuilding className="text-3xl sm:text-4xl" />,
    title: 'Urbanizam',
    description: 'Urbanističko planiranje i regulacioni planovi.'
  },
  {
    icon: <FaCube className="text-3xl sm:text-4xl" />,
    title: '3D Vizualizacije',
    description: 'Fotorealistični prikazi budućih prostora.'
  }
]

export default function ServicesSection() {
  return (
    <section className="relative h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 py-3 z-10 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-serif text-primary font-bold">Usluge</h1>
        </div>
      </div>

      {/* Services Grid - Fixed height, no scroll */}
      <div className="flex-1 px-4 sm:px-6 py-4 overflow-hidden">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto h-full flex items-center"
        >
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <div className="bg-white p-4 sm:p-5 border border-gray-200/50 hover:border-accent hover:shadow-xl transition-all duration-300 h-full rounded-xl backdrop-blur-sm flex flex-col">
                  <div className="text-accent mb-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-serif mb-2 font-bold flex-shrink-0">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm flex-1">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
