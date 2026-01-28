'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { fadeIn, staggerContainer } from '@/utils/animations'

export default function AboutSection() {
  return (
    <section className="relative h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 py-3 z-10 shadow-sm flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-serif text-primary font-bold">O nama</h1>
        </div>
      </div>

      {/* Main Content - Fixed height, no scroll */}
      <div className="flex-1 px-4 sm:px-6 py-2 sm:py-4 overflow-hidden">        
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto h-full flex items-center"
        >
          <div className="w-full grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Image */}
            <motion.div 
                 variants={fadeIn} 
                 whileHover={{ scale: 1.02 }}
                className="relative -mt-3 sm:mt-0 h-[220px] sm:h-[300px] md:h-[350px] rounded-xl overflow-hidden shadow-lg"
              >

              <Image
                src="/images/milan milincic.png"
                alt="Milan Milinčić - Arhitekta"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Text Content */}
            <motion.div variants={fadeIn} className="space-y-4 flex flex-col justify-center">
              <div>
                <h2 className="text-lg sm:text-xl font-serif mb-3 font-bold">Naša Priča</h2>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                  <strong>M² Architecture</strong> je studio za arhitektonsko projektovanje, nadzor i konsulting, 
                  vođen Milanom Milinčićem. Naša filozofija počiva na preciznosti, funkcionalnosti i estetici.
                </p>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  Svaki projekat tretiramo kao priliku da unaprijedimo prostor i život u njemu.
                </p>
              </div>

              {/* Mission & Vision - Compact */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div 
                  variants={fadeIn} 
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="text-sm sm:text-base font-serif mb-1.5 text-accent font-bold">Misija</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Kroz kreativno projektovanje stvaramo prostore koji odgovaraju potrebama klijenata.
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeIn} 
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="text-sm sm:text-base font-serif mb-1.5 text-accent font-bold">Vizija</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    Postati prepoznatljivi po kvalitetu, inovativnosti i profesionalnom pristupu.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
