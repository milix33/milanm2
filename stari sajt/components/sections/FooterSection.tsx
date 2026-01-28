'use client'

import Link from 'next/link'
import { FaEnvelope } from 'react-icons/fa'
import PhoneMenu from '@/components/PhoneMenu'

export default function FooterSection() {
  return (
    <section className="relative h-screen w-full bg-primary text-white flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8 sm:py-12 w-full h-full flex flex-col justify-center">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* About */}
          <div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Studio za arhitektonsko projektovanje, nadzor i konsulting. 
              Stvaramo prostore koji inspirišu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-base sm:text-lg">Brzi linkovi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('sectionChange', { detail: 3 })
                    window.dispatchEvent(event)
                  }}
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  O nama
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('sectionChange', { detail: 1 })
                    window.dispatchEvent(event)
                  }}
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('sectionChange', { detail: 2 })
                    window.dispatchEvent(event)
                  }}
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Usluge
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const event = new CustomEvent('sectionChange', { detail: 4 })
                    window.dispatchEvent(event)
                  }}
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-base sm:text-lg">Usluge</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Projektovanje</li>
              <li>Nadzor</li>
              <li>Konsulting</li>
              <li>Enterijer</li>
              <li>3D Vizualizacije</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-base sm:text-lg">Kontakt</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-accent flex-shrink-0" />
                <a href="mailto:milan.milincic1990@gmail.com" className="hover:text-accent transition-colors break-all">
                  milan.milincic1990@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-accent mt-1 flex-shrink-0">📞</div>
                <PhoneMenu phoneNumber="+387 65 959 599" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center text-xs sm:text-sm text-gray-400 flex-shrink-0">
          <p>© {new Date().getFullYear()} M² Architecture. Sva prava zadržana.</p>
        </div>
      </div>
    </section>
  )
}
