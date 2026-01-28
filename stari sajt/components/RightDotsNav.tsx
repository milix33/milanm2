'use client'

interface RightDotsNavProps {
  totalSections: number
  activeSection: number
  onSectionChange: (index: number) => void
}

export default function RightDotsNav({ totalSections, activeSection, onSectionChange }: RightDotsNavProps) {
  return (
    <nav className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50">
      <ul className="flex flex-col gap-3 sm:gap-4">
        {Array.from({ length: totalSections }).map((_, index) => (
          <li key={index}>
            <button
              onClick={() => onSectionChange(index)}
              className="group relative"
              aria-label={`Go to section ${index + 1}`}
            >
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  activeSection === index
                    ? 'bg-accent scale-125'
                    : 'bg-gray-400 hover:bg-gray-300 group-hover:scale-110'
                }`}
              />
              {activeSection === index && (
                <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 bg-primary text-white text-xs px-2 sm:px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
                  Section {index + 1}
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
