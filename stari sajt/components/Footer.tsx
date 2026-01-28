'use client'

import Link from 'next/link'
import { FaEnvelope } from 'react-icons/fa'
import PhoneMenu from './PhoneMenu'

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Studio za arhitektonsko projektovanje, nadzor i konsulting. 
              Stvaramo prostore koji inspirišu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Brzi linkovi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent transition-colors">
                  O nama
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-accent transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-accent transition-colors">
                  Usluge
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-accent transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Usluge</h4>
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
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-accent" />
                <a href="mailto:milan.milincic1990@gmail.com" className="hover:text-accent transition-colors">
                  milan.milincic1990@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-accent mt-1">📞</div>
                <PhoneMenu phoneNumber="+387 65 959 599" />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} M² Architecture. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  )
}
