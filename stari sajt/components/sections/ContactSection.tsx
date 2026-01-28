'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaEnvelope, FaFileAlt } from 'react-icons/fa'
import PhoneMenu from '@/components/PhoneMenu'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [phoneMenuOpen, setPhoneMenuOpen] = useState(false)
  
  const handleOpenQuoteWizard = () => {
    window.dispatchEvent(new CustomEvent('openQuoteWizard'))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Poruka poslata! Kontaktiraćemo vas uskoro.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="relative h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200/50 px-4 sm:px-6 py-3 z-10 shadow-sm flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-serif text-primary font-bold">Kontakt</h1>
        </div>
      </div>

      {/* Content - Scrollable on mobile */}
      <div className="flex-1 px-4 sm:px-6 py-3 pb-6 sm:py-4 sm:pb-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="w-full grid md:grid-cols-2 gap-4 sm:gap-6 items-start">
            {/* Left column: Zatraži ponudu + (desktop) kontakt info */}
            <div className="space-y-4 sm:space-y-6">
              {/* Quote Request Card - Prominent */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-white border-2 border-accent/20 rounded-xl p-3 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <div className="flex-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 mb-1 sm:mb-3">
                        <div className="bg-accent/20 p-2 sm:p-3 rounded-lg">
                          <FaFileAlt className="text-accent text-lg sm:text-2xl" />
                        </div>
                        <h2 className="text-lg sm:text-2xl font-serif font-bold text-gray-900">
                          Zatraži ponudu
                        </h2>
                      </div>
                      <p className="hidden sm:block text-sm sm:text-base text-gray-700 leading-relaxed">
                        Potrebna vam je detaljna ponuda za vaš projekat? Popunite naš interaktivni upitnik i dobijte personalizovanu ponudu u najkraćem mogućem roku.
                      </p>
                    </div>
                    <motion.button
                      onClick={handleOpenQuoteWizard}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-accent text-white px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl whitespace-nowrap w-full sm:w-auto"
                    >
                      Otvori upitnik →
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info - hidden on mobile to save space */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="hidden md:block"
              >
                <h2 className="text-lg sm:text-xl font-serif mb-3 font-bold">Kontaktirajte nas</h2>
                <p className="text-xs sm:text-sm text-gray-700 mb-4 leading-relaxed">
                  Imate pitanja ili želite da razgovarate o svom projektu? 
                  Slobodno nas kontaktirajte. Odgovorićemo u najkraćem mogućem roku.
                </p>

                <div className="space-y-2 mb-3">
                  {/* Address Card */}
                  <motion.a 
                    href="https://www.google.com/maps/search/?api=1&query=Prnjavor,+Bosnia+and+Herzegovina" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="block bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 p-2.5 sm:p-3 hover:border-accent hover:shadow-xl transition-all duration-300 group cursor-pointer rounded-xl"
                  >
                    <div className="flex items-start">
                      <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                        <FaMapMarkerAlt className="text-accent text-lg sm:text-xl group-hover:text-white" />
                      </div>
                      <div className="ml-2 sm:ml-3 flex-1">
                        <h3 className="font-bold text-xs sm:text-sm mb-0.5 group-hover:text-accent transition-colors">Adresa</h3>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          Prnjavor, Bosna i Hercegovina
                        </p>
                      </div>
                    </div>
                  </motion.a>

                  {/* Email Card */}
                  <motion.a 
                    href="mailto:milan.milincic1990@gmail.com"
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="block bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 p-2.5 sm:p-3 hover:border-accent hover:shadow-xl transition-all duration-300 group cursor-pointer rounded-xl"
                  >
                    <div className="flex items-start">
                      <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                        <FaEnvelope className="text-accent text-lg sm:text-xl group-hover:text-white" />
                      </div>
                      <div className="ml-2 sm:ml-3 flex-1">
                        <h3 className="font-bold text-xs sm:text-sm mb-0.5 group-hover:text-accent transition-colors">Email</h3>
                        <p className="text-gray-600 text-xs break-all">
                          milan.milincic1990@gmail.com
                        </p>
                      </div>
                    </div>
                  </motion.a>

                  {/* Phone Card */}
                  <motion.div
                    role="button"
                    tabIndex={0}
                    onClick={() => setPhoneMenuOpen(true)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPhoneMenuOpen(true) } }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 p-2.5 sm:p-3 hover:border-accent hover:shadow-xl transition-all duration-300 group cursor-pointer outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-xl"
                  >
                    <div className="flex items-start">
                      <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                        <div className="text-accent text-lg sm:text-xl group-hover:text-white">📞</div>
                      </div>
                      <div className="ml-2 sm:ml-3 flex-1">
                        <h3 className="font-bold text-xs sm:text-sm mb-0.5 group-hover:text-accent transition-colors">Telefon</h3>
                        <PhoneMenu
                          phoneNumber="+387 65 959 599"
                          variant="card"
                          isOpen={phoneMenuOpen}
                          onOpenChange={setPhoneMenuOpen}
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm p-2.5 sm:p-4 pb-3 sm:pb-6 rounded-xl border border-gray-200/50 shadow-lg flex flex-col"
            >
              <h3 className="text-base sm:text-lg font-serif mb-2 sm:mb-3 font-bold flex-shrink-0">Pošaljite upit</h3>
              <form onSubmit={handleSubmit} className="space-y-1 sm:space-y-2 flex flex-col flex-1 min-h-0">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
                    Ime i prezime *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-1 sm:py-2 border border-gray-300 focus:border-accent focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-1 sm:py-2 border border-gray-300 focus:border-accent focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-1 sm:py-2 border border-gray-300 focus:border-accent focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
                    Tip upita *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 py-1 sm:py-2 border border-gray-300 focus:border-accent focus:outline-none text-sm"
                  >
                    <option value="">Izaberite...</option>
                    <option value="projektovanje">Projektovanje</option>
                    <option value="nadzor">Nadzor</option>
                    <option value="konsulting">Konsulting</option>
                    <option value="ostalo">Ostalo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">
                    Poruka *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 sm:py-2 border border-gray-300 focus:border-accent focus:outline-none resize-none text-sm min-h-[60px] sm:min-h-[80px]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-white py-2 sm:py-3 text-sm sm:text-base font-semibold hover:bg-opacity-90 transition-all rounded-lg mt-3 sm:mt-6 mb-2"
                >
                  Pošaljite poruku
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
