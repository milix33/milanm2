'use client'

import { useState, useEffect } from 'react'
import { FaPhone, FaTimes } from 'react-icons/fa'
import { SiViber, SiWhatsapp } from 'react-icons/si'

interface PhoneMenuProps {
  phoneNumber: string
  displayNumber?: string
  variant?: 'default' | 'card'
  /** Kad je card + cela kartica trigger: kontrolisano od strane parenta */
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function PhoneMenu({ phoneNumber, displayNumber, variant = 'default', isOpen: controlledOpen, onOpenChange }: PhoneMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = controlledOpen !== undefined && onOpenChange !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen
  const setOpen = isControlled ? onOpenChange : setInternalOpen

  const cleanNumber = phoneNumber.replace(/\s+/g, '').replace(/-/g, '')
  const display = displayNumber || phoneNumber

  // ESC key zatvara popup
  useEffect(() => {
    if (!isOpen) return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, setOpen])

  const handleCall = (type: 'phone' | 'viber' | 'whatsapp') => {
    let url = ''
    switch (type) {
      case 'phone':
        url = `tel:${cleanNumber}`
        break
      case 'viber':
        url = `viber://chat?number=${cleanNumber}`
        break
      case 'whatsapp':
        const whatsappNumber = cleanNumber.startsWith('+') ? cleanNumber.substring(1) : cleanNumber
        url = `https://wa.me/${whatsappNumber}`
        break
    }
    window.open(url, '_self')
    setOpen(false)
  }

  return (
    <div className="relative">
      {/* Broj: u card modu samo tekst (trigger je cela kartica), inače button */}
      {variant === 'card' && isControlled ? (
        <span className="text-gray-600 text-lg font-normal text-left block">{display}</span>
      ) : (
        <button
          onClick={() => setOpen(!isOpen)}
          className={variant === 'card'
            ? "text-gray-600 text-lg font-normal hover:text-accent transition-colors text-left w-full"
            : "flex items-center text-gray-600 hover:text-accent transition-colors group"
          }
        >
          {variant === 'default' && <FaPhone className="mr-2 group-hover:scale-110 transition-transform" />}
          {display}
        </button>
      )}

      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Menu */}
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 p-6 w-80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Title */}
            <h3 className="text-xl font-serif mb-2 text-center">Kontaktiraj nas</h3>
            <p className="text-gray-600 text-center mb-6">{display}</p>

            {/* Options */}
            <div className="space-y-3">
              {/* Phone Call */}
              <button
                onClick={() => handleCall('phone')}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <FaPhone className="text-xl" />
                <span className="font-semibold">Pozovi</span>
              </button>

              {/* Viber */}
              <button
                onClick={() => handleCall('viber')}
                className="w-full flex items-center justify-center gap-3 bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <SiViber className="text-xl" />
                <span className="font-semibold">Viber</span>
              </button>

              {/* WhatsApp */}
              <button
                onClick={() => handleCall('whatsapp')}
                className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <SiWhatsapp className="text-xl" />
                <span className="font-semibold">WhatsApp</span>
              </button>
            </div>

            {/* Cancel */}
            <button
              onClick={() => setOpen(false)}
              className="w-full mt-4 text-gray-500 hover:text-gray-700 py-2"
            >
              Otkaži
            </button>
          </div>
        </>
      )}
    </div>
  )
}
