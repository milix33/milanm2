'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProjectCard from '@/components/ProjectCard'

interface Project {
  id: string
  title: string
  location: string
  category: string
  description: string
  image?: string
}

interface PortfolioCarouselProps {
  projects: Project[]
}

const CARDS_PER_PAGE = 6 // 6 kartica po stranici
// Desktop: 3 kolone x 2 reda = 6 kartica
// Mobile: 2 kolone x 3 reda = 6 kartica

export default function PortfolioCarousel({ projects }: PortfolioCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Update mobile state based on screen size
  useEffect(() => {
    const updateLayout = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  // Group projects into pages of 6
  const totalPages = Math.ceil(projects.length / CARDS_PER_PAGE)
  const currentProjects = projects.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  )

  const canGoNext = currentPage < totalPages - 1
  const canGoPrev = currentPage > 0

  const goNext = () => {
    if (canGoNext) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goPrev = () => {
    if (canGoPrev) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const diff = touchStartX.current - touchEndX.current
    const threshold = 50 // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && canGoNext) {
        // Swipe left -> next page
        goNext()
      } else if (diff < 0 && canGoPrev) {
        // Swipe right -> previous page
        goPrev()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Grid Container */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-3 sm:gap-4 ${
              isMobile ? 'grid-cols-2 grid-rows-3' : 'grid-cols-3 grid-rows-2'
            }`}
          >
            {currentProjects.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
            {/* Fill empty slots if last page has less than 6 items */}
            {currentProjects.length < CARDS_PER_PAGE &&
              Array.from({ length: CARDS_PER_PAGE - currentProjects.length }).map((_, i) => (
                <div key={`empty-${i}`} className="invisible">
                  <div className="h-full" />
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {totalPages > 1 && (
        <>
          <button
            onClick={goPrev}
            disabled={!canGoPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 ${
              !canGoPrev ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Prethodni projekti"
          >
            <FaChevronLeft className="text-sm sm:text-base" />
          </button>
          <button
            onClick={goNext}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 ${
              !canGoNext ? 'opacity-30 cursor-not-allowed' : 'opacity-100'
            }`}
            aria-label="Sledeći projekti"
          >
            <FaChevronRight className="text-sm sm:text-base" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 sm:mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'w-8 bg-accent'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Idi na stranicu ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
