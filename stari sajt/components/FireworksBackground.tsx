'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface Rocket {
  x: number
  y: number
  vx: number
  vy: number
  exploded: boolean
  targetY: number
  color: string
}

// Elegant “architectural” vatromet – zlatne, bijele i blago tople nijanse
const COLORS = [
  'rgba(255, 255, 255, 1)',
  'rgba(230, 210, 160, 1)',
  'rgba(201, 169, 97, 1)', // accent
  'rgba(255, 240, 210, 1)',
]

export default function FireworksBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener('resize', resize)

    const particles: Particle[] = []
    const rockets: Rocket[] = []
    let lastSpawn = 0

    const spawnRocket = () => {
      const fromLeft = Math.random() < 0.5
      const startX = fromLeft ? width * (0.2 + Math.random() * 0.2) : width * (0.6 + Math.random() * 0.2)
      const targetY = height * (0.2 + Math.random() * 0.25)
      rockets.push({
        x: startX,
        y: height + 20,
        vx: (Math.random() - 0.5) * 0.8,
        vy: - (6 + Math.random() * 1.5),
        exploded: false,
        targetY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const explode = (rocket: Rocket) => {
      const count = 80 + Math.random() * 60
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.3 - 0.15)
        const speed = 1.5 + Math.random() * 2.2
        const maxLife = 45 + Math.random() * 25
        particles.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          life: maxLife,
          maxLife,
          color: rocket.color,
          size: 1.5 + Math.random() * 1.8,
        })
      }
    }

    const draw = (timestamp: number) => {
      animationRef.current = requestAnimationFrame(draw)

      // poluprovidni fade za “trail” efekat
      ctx.fillStyle = 'rgba(0, 0, 0, 0.18)'
      ctx.fillRect(0, 0, width, height)

      // povremeno lansiraj rakete (učestalost blago smanjena da ne bude napadno)
      if (timestamp - lastSpawn > 900 + Math.random() * 900) {
        lastSpawn = timestamp
        spawnRocket()
      }

      // update & crtanje raketa
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]
        if (!r.exploded) {
          r.x += r.vx
          r.y += r.vy
          r.vy += 0.05 // gravitacija

          ctx.save()
          const gradient = ctx.createLinearGradient(r.x, r.y, r.x, r.y + 30)
          gradient.addColorStop(0, r.color)
          gradient.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(r.x, r.y + 30)
          ctx.lineTo(r.x, r.y)
          ctx.stroke()
          ctx.restore()

          // mala jezgra rakete
          ctx.fillStyle = r.color
          ctx.beginPath()
          ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2)
          ctx.fill()

          if (r.y <= r.targetY || r.vy >= 0) {
            r.exploded = true
            explode(r)
          }
        } else {
          rockets.splice(i, 1)
        }
      }

      // update & crtanje čestica
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life -= 1
        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }
        const lifeRatio = p.life / p.maxLife

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.03
        p.vx *= 0.99

        const alpha = lifeRatio * 0.9

        const glowRadius = p.size * (2.5 + (1 - lifeRatio) * 2)
        const glow = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          glowRadius
        )
        glow.addColorStop(0, p.color.replace('1)', `${alpha})`))
        glow.addColorStop(1, p.color.replace('1)', '0)'))

        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // inicijalno malo zatamnimo da se blenduje sa pozadinom
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
    ctx.fillRect(0, 0, width, height)

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
    />
  )
}

