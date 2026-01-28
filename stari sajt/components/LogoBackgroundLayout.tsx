'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import FireworksBackground from '@/components/FireworksBackground'

interface LogoBackgroundLayoutProps {
  children: React.ReactNode
}

export default function LogoBackgroundLayout({ children }: LogoBackgroundLayoutProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Animated Logo Background – isti kao na početnoj */}
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
              ease: 'easeInOut',
            },
            scale: {
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            },
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
              ease: 'easeInOut',
            },
            scale: {
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            },
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

      {/* Fireworks / particles background */}
      <div className="absolute inset-0 overflow-hidden">
        <FireworksBackground />
      </div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/20 to-black/30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content slot – svaka stranica ubacuje svoj layout ovdje */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </div>
    </section>
  )
}

