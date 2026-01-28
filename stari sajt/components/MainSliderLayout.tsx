 'use client'

 import { useState, useEffect } from 'react'
 import { createPortal } from 'react-dom'
 import { motion, AnimatePresence } from 'framer-motion'
 import SectionSlider from '@/components/SectionSlider'
 import RightDotsNav from '@/components/RightDotsNav'
 import LeftNav from '@/components/LeftNav'
 import HeroSection from '@/components/sections/HeroSection'
 import PortfolioSection from '@/components/sections/PortfolioSection'
 import ServicesSection from '@/components/sections/ServicesSection'
 import AboutSection from '@/components/sections/AboutSection'
 import ContactSection from '@/components/sections/ContactSection'
 import FooterSection from '@/components/sections/FooterSection'
 import QuoteWizard from '@/components/QuoteWizard'
 import { FaTimes } from 'react-icons/fa'

 interface MainSliderLayoutProps {
   /** 
    * Koji section da bude aktivan pri otvaranju stranice.
    * 0 = Hero, 1 = Portfolio, 2 = Usluge, 3 = O nama, 4 = Kontakt, 5 = Footer
    */
   initialSection?: number
 }

 export default function MainSliderLayout({ initialSection = 0 }: MainSliderLayoutProps) {
   const [activeSection, setActiveSection] = useState(initialSection)
   const [isQuoteWizardOpen, setIsQuoteWizardOpen] = useState(false)
   const [mounted, setMounted] = useState(false)

   // Mount check for portal
   useEffect(() => {
     setMounted(true)
   }, [])

   // Sync activeSection with initialSection when se promijeni ruta
   useEffect(() => {
     setActiveSection(initialSection)
   }, [initialSection])

   // Block scroll when modal is open
   useEffect(() => {
     if (isQuoteWizardOpen) {
       document.body.style.overflow = 'hidden'
     } else {
       document.body.style.overflow = ''
     }
     return () => {
       document.body.style.overflow = ''
     }
   }, [isQuoteWizardOpen])

   // Listen for section change events from buttons
   useEffect(() => {
     const handleSectionChange = (e: CustomEvent) => {
       setActiveSection(e.detail)
     }

     window.addEventListener('sectionChange', handleSectionChange as EventListener)
     return () => {
       window.removeEventListener('sectionChange', handleSectionChange as EventListener)
     }
   }, [])

   // Listen for quote wizard open event (za dugmad iz drugih komponenti)
   useEffect(() => {
     const handleOpenQuoteWizard = () => {
       setIsQuoteWizardOpen(true)
     }
     window.addEventListener('openQuoteWizard', handleOpenQuoteWizard as EventListener)
     return () => {
       window.removeEventListener('openQuoteWizard', handleOpenQuoteWizard as EventListener)
     }
   }, [])

   // ESC key closes quote wizard
   useEffect(() => {
     const handleEscape = (e: KeyboardEvent) => {
       if (e.key === 'Escape' && isQuoteWizardOpen) {
         setIsQuoteWizardOpen(false)
       }
     }
     window.addEventListener('keydown', handleEscape)
     return () => window.removeEventListener('keydown', handleEscape)
   }, [isQuoteWizardOpen])

   const sections = [
     <HeroSection key="hero" activeSection={activeSection} />,
     <PortfolioSection key="portfolio" />,
     <ServicesSection key="services" />,
     <AboutSection key="about" />,
     <ContactSection key="contact" />,
     <FooterSection key="footer" />,
   ]

   const handleSectionChange = (index: number) => {
     setActiveSection(index)
   }

   return (
     <>
       <div className="relative w-full h-screen overflow-hidden md:pl-[160px]">
         <LeftNav activeSection={activeSection} onSectionChange={handleSectionChange} />
         <SectionSlider activeSection={activeSection} onSectionChange={handleSectionChange}>
           {sections}
         </SectionSlider>
         <RightDotsNav
           totalSections={sections.length}
           activeSection={activeSection}
           onSectionChange={handleSectionChange}
         />
       </div>

       {/* Quote Wizard Modal - Rendered via Portal */}
       {mounted &&
         createPortal(
           <AnimatePresence mode="wait">
             {isQuoteWizardOpen && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsQuoteWizardOpen(false)}
                 data-quote-modal="true"
                 className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4 md:p-8"
                 style={{
                   position: 'fixed',
                   top: 0,
                   left: 0,
                   right: 0,
                   bottom: 0,
                   zIndex: 9999,
                 }}
               >
                 <motion.div
                   initial={{ opacity: 0, scale: 0.9, y: 20 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9, y: 20 }}
                   onClick={(e) => e.stopPropagation()}
                   className="w-full max-w-4xl max-h-[90vh] overflow-y-auto relative bg-white rounded-xl"
                 >
                   <button
                     onClick={(e) => {
                       e.stopPropagation()
                       setIsQuoteWizardOpen(false)
                     }}
                     className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                     aria-label="Zatvori"
                   >
                     <FaTimes className="text-gray-600 text-xl" />
                   </button>
                   <QuoteWizard onClose={() => setIsQuoteWizardOpen(false)} />
                 </motion.div>
               </motion.div>
             )}
           </AnimatePresence>,
           document.body
         )}
     </>
   )
 }

