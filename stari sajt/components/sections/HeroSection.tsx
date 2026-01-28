 'use client'

 import { motion } from 'framer-motion'
 import Image from 'next/image'
 import Logo from '@/components/Logo'
 import FireworksBackground from '@/components/FireworksBackground'

const navItems = [
  { name: 'Početna', index: 0 },
  { name: 'Portfolio', index: 1 },
  { name: 'Usluge', index: 2 },
  { name: 'O nama', index: 3 },
  { name: 'Kontakt', index: 4 },
]

interface HeroSectionProps {
  activeSection?: number
}

export default function HeroSection({ activeSection = 0 }: HeroSectionProps) {
  const handleNavClick = (index: number) => {
    const event = new CustomEvent('sectionChange', { detail: index })
    window.dispatchEvent(event)
  }

  const handleOpenQuoteWizard = () => {
    const event = new CustomEvent('openQuoteWizard')
    window.dispatchEvent(event)
  }

  return (
    <section className="relative h-screen w-full flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation removed sa vrha (desktop) - sada koristimo LeftNav sa lijeve strane */}
      {/* Animated Logo Background - pojačana vidljivost */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Logo - Animated Scale & Rotate */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [0, 2, -2, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Image
            src="/images/logo/logopng.png"
            alt="M² Architecture Logo"
            width={800}
            height={800}
            className="opacity-40 md:opacity-50 w-[600px] md:w-[800px] lg:w-[1000px] h-auto object-contain blur-[0.5px]"
            priority
            unoptimized
          />
        </motion.div>

        {/* Secondary Logo - Reverse Animation */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [0, -2, 2, 0],
            scale: [0.85, 0.9, 0.85],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            rotate: {
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Image
            src="/images/logo/logopng.png"
            alt="M² Architecture Logo"
            width={600}
            height={600}
            className="w-[400px] md:w-[600px] lg:w-[700px] h-auto object-contain blur-[1.5px] opacity-25"
            priority
            unoptimized
          />
        </motion.div>
      </div>

      {/* Fireworks / particles background za dodatni "wow" efekat */}
      <div className="absolute inset-0 overflow-hidden">
        <FireworksBackground />
      </div>

      {/* Animated Gradient Overlay - malo svetlije da logo više dođe do izražaja */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content with backdrop blur for better readability */}
      <div className="relative z-10 flex-1 flex items-center justify-center text-center text-white px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-sm bg-black/15 rounded-2xl p-6 sm:p-8 md:p-12 w-full max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotate: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              <Image
                src="/images/logo/logopng.png"
                alt="M² Architecture"
                width={240}
                height={240}
                className="h-[140px] sm:h-[180px] md:h-[220px] lg:h-[260px] w-auto object-contain drop-shadow-2xl"
                priority
                unoptimized
              />
            </motion.div>
          </motion.div>
          <p className="text-lg sm:text-xl md:text-2xl mb-4 text-gray-100 [text-shadow:_0_2px_10px_rgba(0,0,0,0.6)]">
            Projektovanje · Nadzor · Konsulting
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl sm:text-2xl md:text-3xl font-serif mb-8 sm:mb-12 text-accent [text-shadow:_0_2px_15px_rgba(201,169,97,0.5),_0_4px_20px_rgba(0,0,0,0.6)]"
          >
            We design spaces that inspire.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
          >
            <button
              onClick={() => {
                // Will be handled by section navigation
                const event = new CustomEvent('sectionChange', { detail: 1 })
                window.dispatchEvent(event)
              }}
              className="bg-accent text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-opacity-90 transition-all w-full sm:w-auto"
            >
              Pogledajte projekte
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleOpenQuoteWizard()
              }}
              className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-white hover:text-primary transition-all rounded-lg cursor-pointer w-full sm:w-auto"
            >
              Zatraži ponudu
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>

    </section>
  )
}
