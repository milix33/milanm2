'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
  variant?: 'header' | 'footer'
  width?: number
  height?: number
  isLink?: boolean
  onClick?: () => void
}

export default function Logo({
  className = '',
  variant = 'header',
  width = 150,
  height = 50,
  isLink = true,
  onClick,
}: LogoProps) {
  const [imgError, setImgError] = useState(false)
  const [imgSrc, setImgSrc] = useState('/images/logo/logopng.png')
  
  // Pokušaj različite formate
  const formats = ['png', 'jpg', 'svg', 'webp']
  const [currentFormat, setCurrentFormat] = useState(0)
  
  const handleError = () => {
    if (currentFormat < formats.length - 1) {
      const nextFormat = currentFormat + 1
      setCurrentFormat(nextFormat)
      setImgSrc(`/images/logo/logopng.${formats[nextFormat]}`)
    } else {
      setImgError(true)
    }
  }

  const textContent = (
    <span className="text-2xl font-serif font-bold">
      <span className={variant === 'header' ? 'text-primary' : 'text-white'}>M²</span>
      <span className="text-accent"> Architecture</span>
    </span>
  )

  const imageContent = (
    <Image
      src={imgSrc}
      alt="M² Architecture Logo"
      width={width}
      height={height}
      className={`${variant === 'header' ? 'h-16 md:h-20' : 'h-10'} w-auto object-contain transition-all ${
        variant === 'footer' ? 'brightness-0 invert opacity-90 hover:opacity-100' : 'hover:opacity-90'
      }`}
      priority={variant === 'header'}
      onError={handleError}
      unoptimized
    />
  )

  if (imgError) {
    // Fallback na tekst ako slika ne postoji
    if (isLink) {
      return (
        <Link href="/" className={className}>
          {textContent}
        </Link>
      )
    }
    return (
      <button type="button" onClick={onClick} className={className}>
        {textContent}
      </button>
    )
  }

  if (isLink) {
    return (
      <Link href="/" className={`flex items-center ${className}`}>
        {imageContent}
      </Link>
    )
  }

  return (
    <button type="button" onClick={onClick} className={`flex items-center ${className}`}>
      {imageContent}
    </button>
  )
}
