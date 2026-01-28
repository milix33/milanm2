'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SectionSliderProps {
  children: React.ReactNode[]
  activeSection: number
  onSectionChange: (index: number) => void
}

export default function SectionSlider({ children, activeSection, onSectionChange }: SectionSliderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [autoAdvancePaused, setAutoAdvancePaused] = useState(false)
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now())
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef<number | null>(null)

  const totalSections = children.length
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const transitionDuration = prefersReducedMotion ? 300 : 800

  // Change section with animation
  const changeSection = useCallback((newIndex: number, immediate = false) => {
    if (newIndex < 0 || newIndex >= totalSections || isTransitioning) return
    
    setIsTransitioning(true)
    setLastInteractionTime(Date.now())
    setAutoAdvancePaused(true)
    
    // Resume auto-advance after 20 seconds
    setTimeout(() => {
      setAutoAdvancePaused(false)
      setLastInteractionTime(Date.now())
    }, 20000)

    onSectionChange(newIndex)

    // Allow next transition after animation
    setTimeout(() => {
      setIsTransitioning(false)
    }, immediate ? 0 : transitionDuration)
  }, [totalSections, isTransitioning, transitionDuration, onSectionChange])

  // Wheel event handler (debounced)
  const handleWheel = useCallback((e: WheelEvent) => {
    // Check if modal is open - if so, don't handle wheel events
    const modalOpen = document.querySelector('[data-quote-modal="true"]')
    if (modalOpen) {
      return // Allow normal scrolling in modal
    }

    // Check if the event target is inside a scrollable element
    const target = e.target as HTMLElement
    const scrollableParent = target.closest('[data-scrollable="true"]')
    
    // If inside a scrollable section, allow normal scrolling
    if (scrollableParent) {
      const element = scrollableParent as HTMLElement
      const isAtTop = element.scrollTop === 0
      const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1
      
      // Only prevent default if at boundaries
      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault()
      } else {
        // Allow normal scrolling within the section
        return
      }
    } else {
      e.preventDefault()
    }
    
    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current)
    }

    wheelTimeoutRef.current = setTimeout(() => {
      if (e.deltaY > 0) {
        // Scroll down -> next section
        changeSection(activeSection + 1)
      } else {
        // Scroll up -> previous section
        changeSection(activeSection - 1)
      }
    }, 50) // Debounce 50ms
  }, [activeSection, changeSection])

  // Touch event handlers
  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Don't handle touch if modal is open
    const modalOpen = document.querySelector('[data-quote-modal="true"]')
    if (modalOpen) return
    
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Don't handle touch if modal is open
    const modalOpen = document.querySelector('[data-quote-modal="true"]')
    if (modalOpen) return

    if (touchStartY.current === null) return

    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY
    const threshold = 50 // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe up -> next section
        changeSection(activeSection + 1)
      } else {
        // Swipe down -> previous section
        changeSection(activeSection - 1)
      }
    }

    touchStartY.current = null
  }, [activeSection, changeSection])

  // Keyboard event handler
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't handle keyboard if modal is open (ESC is handled in page.tsx)
    const modalOpen = document.querySelector('[data-quote-modal="true"]')
    if (modalOpen && e.key !== 'Escape') return

    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault()
        changeSection(activeSection + 1)
        break
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        changeSection(activeSection - 1)
        break
      case 'Home':
        e.preventDefault()
        changeSection(0)
        break
      case 'End':
        e.preventDefault()
        changeSection(totalSections - 1)
        break
    }
  }, [activeSection, totalSections, changeSection])

  // Auto-advance logic
  useEffect(() => {
    // Don't auto-advance on contact section (index 4) or footer (index 5)
    if (activeSection >= 4 || autoAdvancePaused) {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current)
      }
      return
    }

    const checkIdle = () => {
      const timeSinceInteraction = Date.now() - lastInteractionTime
      
      if (timeSinceInteraction >= 10000 && !autoAdvancePaused) {
        // Move to next section, but skip contact (4) and footer (5), loop to first
        let nextSection = activeSection + 1
        if (nextSection >= 4) {
          // Skip contact and footer, loop back to hero
          nextSection = 0
        }
        changeSection(nextSection)
      }
    }

    autoAdvanceRef.current = setTimeout(checkIdle, 1000)
    
    return () => {
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current)
      }
    }
  }, [activeSection, lastInteractionTime, autoAdvancePaused, totalSections, changeSection])

  // Listen for custom section change events from buttons
  useEffect(() => {
    const handleCustomSectionChange = (e: Event) => {
      const customEvent = e as CustomEvent<number>
      if (typeof customEvent.detail === 'number') {
        changeSection(customEvent.detail)
      }
    }

    window.addEventListener('sectionChange', handleCustomSectionChange)
    return () => {
      window.removeEventListener('sectionChange', handleCustomSectionChange)
    }
  }, [changeSection])

  // Sync with external activeSection changes (from nav clicks)
  useEffect(() => {
    if (activeSection >= 0 && activeSection < totalSections) {
      setLastInteractionTime(Date.now())
      setAutoAdvancePaused(true)
      setTimeout(() => {
        setAutoAdvancePaused(false)
        setLastInteractionTime(Date.now())
      }, 20000)
    }
  }, [activeSection, totalSections])

  // Event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
      if (autoAdvanceRef.current) {
        clearTimeout(autoAdvanceRef.current)
      }
    }
  }, [handleWheel, handleTouchStart, handleTouchEnd, handleKeyDown])

  // Prevent default scroll
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault()
    }
    
    document.body.style.overflow = 'hidden'
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      <motion.div
        className="flex flex-col"
        animate={{
          y: `-${activeSection * 100}vh`
        }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.8,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          willChange: 'transform'
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="w-full h-screen flex-shrink-0"
            style={{ minHeight: '100vh' }}
          >
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
