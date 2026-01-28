'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'
import { fadeIn, staggerContainer } from '@/utils/animations'

export default function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 3)

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif mb-4">Istaknuti projekti</h2>
          <p className="text-xl text-gray-600">Neki od naših najznačajnijih radova</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={fadeIn}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-block bg-primary text-white px-10 py-4 text-lg hover:bg-opacity-90 transition-all"
          >
            Pogledajte sve projekte
          </Link>
        </div>
      </div>
    </section>
  )
}
