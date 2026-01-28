'use client'

import { motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa'
import { fadeIn, staggerContainer } from '@/utils/animations'

const testimonials = [
  {
    quote: 'Profesionalno i precizno – saradnja je nadmašila očekivanja. M² Architecture je bio sa nama u svakoj fazi projekta.',
    author: 'Marko Petrović',
    location: 'Prnjavor',
    project: 'Porodična kuća',
  },
  {
    quote: 'Izvanredan pristup i pažnja prema detaljima. Projekat je realizovan u roku i na profesionalan način.',
    author: 'Ana Jovanović',
    location: 'Doboj',
    project: 'Poslovni objekat',
  },
  {
    quote: 'Preporučujem! Kreativna rješenja i stručna podrška tokom cijelog procesa projektovanja i gradnje.',
    author: 'Stefan Nikolić',
    location: 'Banja Luka',
    project: 'Renovacija stana',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif mb-4">Šta klijenti kažu</h2>
          <p className="text-xl text-gray-600">Zadovoljstvo naših klijenata je naš prioritet</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white p-8 shadow-lg"
            >
              <FaQuoteLeft className="text-3xl text-accent mb-4" />
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-lg">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
                <p className="text-sm text-accent">{testimonial.project}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
