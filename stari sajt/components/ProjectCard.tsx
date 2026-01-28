'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt } from 'react-icons/fa'

interface Project {
  id: string
  title: string
  location: string
  category: string
  description: string
  image?: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="group overflow-hidden rounded-xl bg-white border border-gray-200/50 hover:border-accent/30 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
    >
      {/* Image - Top */}
      <div className="relative h-28 sm:h-36 lg:h-44 bg-gray-200 overflow-hidden flex-shrink-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 group-hover:scale-105 transition-transform duration-500" />
        )}
      </div>

      {/* Text - Below image, white background */}
      <div className="relative px-2.5 py-2 sm:px-3 sm:py-2.5 flex-1 flex flex-col bg-white">
        <div className="absolute top-1.5 right-2 sm:top-2 sm:right-2.5 z-10">
          <span className="px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[8px] sm:text-[10px] font-medium bg-accent text-white rounded-full shadow-sm">
            {project.category}
          </span>
        </div>
        <div className="flex flex-col z-0 pr-12">
          <h3 className="text-xs sm:text-sm font-serif mb-0.5 sm:mb-1 line-clamp-1 font-bold text-gray-900">
            {project.title}
          </h3>
          <div className="flex items-center text-[9px] sm:text-[10px] text-gray-600 mb-1 sm:mb-1.5">
            <FaMapMarkerAlt className="mr-0.5 flex-shrink-0 text-[8px] sm:text-[9px]" />
            <span className="truncate">{project.location}</span>
          </div>
          <p className="text-gray-700 text-[9px] sm:text-[10px] leading-tight sm:leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
