'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AnimatedLogoBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          className="opacity-30 md:opacity-40 w-[600px] md:w-[800px] lg:w-[1000px] h-auto object-contain blur-[1px]"
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
          className="w-[400px] md:w-[600px] lg:w-[700px] h-auto object-contain blur-[2px] opacity-20"
          unoptimized
        />
      </motion.div>
    </div>
  )
}
