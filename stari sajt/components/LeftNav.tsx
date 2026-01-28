'use client'

import Logo from './Logo'

interface LeftNavProps {
  activeSection: number
  onSectionChange: (index: number) => void
}

const navItems = [
  { name: 'Portfolio', index: 1 },
  { name: 'Usluge', index: 2 },
  { name: 'O nama', index: 3 },
  { name: 'Kontakt', index: 4 },
]

export default function LeftNav({ activeSection, onSectionChange }: LeftNavProps) {
  const handleNavClick = (index: number) => {
    onSectionChange(index)
  }

  return (
    // Desktop-only lijevi meni; na mobilnom nema dodatne navigacije
    <nav className="hidden md:flex fixed left-0 top-0 h-full w-[160px] bg-primary/95 backdrop-blur-sm z-50 flex-col items-center justify-center border-r border-gray-800">
      <div className="mb-6">
        <Logo
          variant="header"
          width={160}
          height={90}
          isLink={false}
          onClick={() => handleNavClick(0)}
          className="cursor-pointer"
        />
      </div>
      <ul className="space-y-5">
        {navItems.map((item) => (
          <li key={item.index}>
            <button
              onClick={() => handleNavClick(item.index)}
              className={`text-left w-full px-6 py-3 text-sm font-medium transition-all duration-300 ${
                activeSection === item.index
                  ? 'text-accent border-l-4 border-accent pl-4'
                  : 'text-gray-300 hover:text-accent hover:pl-4'
              }`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
