'use client'

import { useState } from 'react'
import PortfolioCarousel from '@/components/PortfolioCarousel'
import { projects } from '@/data/projects'

const categories = ['Svi', 'Stambeni', 'Poslovni', 'Javni', 'Renovacije']

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('Svi')

  const filteredProjects = activeCategory === 'Svi' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section className="relative h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-hidden">
      {/* Compact Header with Filter */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 py-3 z-10 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-serif text-primary font-bold">Portfolio</h1>
            </div>
            <div className="flex gap-1 sm:gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-2 py-1 text-[11px] sm:px-3 sm:py-1.5 sm:text-xs rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
                    activeCategory === category
                      ? 'bg-accent text-white shadow-lg scale-105'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Carousel - Fixed height, no scroll */}
      <div className="flex-1 px-4 sm:px-6 py-4 sm:py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex items-center">
          {filteredProjects.length > 0 ? (
            <PortfolioCarousel projects={filteredProjects} />
          ) : (
            <div className="text-center w-full">
              <p className="text-gray-500 text-sm">Nema projekata u ovoj kategoriji.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
