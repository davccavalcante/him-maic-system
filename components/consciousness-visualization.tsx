"use client"

import { useEffect, useRef, useState } from "react"

interface ConsciousnessVisualizationProps {
  active: boolean
  intensity: number // 0-100
  complexity: number // 0-100
  emotionalValence: number // -100 to 100
  dominantConcept?: string
}

export function ConsciousnessVisualization({
  active = true,
  intensity = 50,
  complexity = 50,
  emotionalValence = 0,
  dominantConcept,
}: ConsciousnessVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      hue: number
    }>
  >([])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return

    const particleCount = Math.floor(complexity * 0.5) + 20 // 20-70 particles based on complexity
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * (complexity / 10) + 2, // 2-12px based on complexity
        speedX: (Math.random() - 0.5) * (intensity / 25), // Speed based on intensity
        speedY: (Math.random() - 0.5) * (intensity / 25),
        opacity: Math.random() * 0.5 + 0.2, // 0.2-0.7 opacity
        hue: getHueFromValence(emotionalValence, i, particleCount),
      })
    }

    particlesRef.current = particles
  }, [dimensions, complexity, intensity, emotionalValence])

  // Animation loop
  useEffect(() => {
    if (!active || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between particles
      ctx.strokeStyle = `hsla(${getBaseHue(emotionalValence)}, 70%, 60%, 0.1)`
      ctx.lineWidth = 0.5
      ctx.beginPath()

      const connectionThreshold = 100 * (complexity / 100) // Connection distance based on complexity
      const particles = particlesRef.current

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionThreshold) {
            const opacity = (1 - distance / connectionThreshold) * 0.2
            ctx.strokeStyle = `hsla(${getBaseHue(emotionalValence)}, 70%, 60%, ${opacity})`
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Update position
        p.x += p.speedX * (active ? 1 : 0.1)
        p.y += p.speedY * (active ? 1 : 0.1)

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1

        // Draw particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size)
        gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${p.opacity})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw dominant concept if provided
      if (dominantConcept) {
        ctx.font = "14px var(--font-ibm-plex-sans), sans-serif"
        ctx.textAlign = "center"
        ctx.fillStyle = `hsla(${getBaseHue(emotionalValence)}, 70%, 80%, 0.7)`
        ctx.fillText(dominantConcept, canvas.width / 2, canvas.height / 2)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [active, dimensions, complexity, intensity, emotionalValence, dominantConcept])

  // Helper function to get hue from emotional valence
  function getHueFromValence(valence: number, index: number, total: number) {
    // Base hue determined by emotional valence
    const baseHue = getBaseHue(valence)

    // Add variation based on particle index
    const variation = (index / total) * 40 - 20 // -20 to +20 degree variation
    return (baseHue + variation) % 360
  }

  function getBaseHue(valence: number) {
    // Map valence from -100...100 to appropriate hue
    // Negative: more red/orange (0-30)
    // Neutral: purple/blue (240-280)
    // Positive: green/teal (120-180)
    if (valence < -20) return 0 + ((valence + 100) / 80) * 30 // Red to orange
    if (valence > 20) return 120 + ((valence - 20) / 80) * 60 // Green to teal
    return 240 + ((valence + 20) / 40) * 40 // Purple to blue for neutral
  }

  return (
    <div className="relative w-full h-full min-h-[120px] overflow-hidden rounded-lg">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ opacity: active ? 1 : 0.3, transition: "opacity 0.5s ease" }}
      />
      {!active && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
          Consciência em estado contemplativo
        </div>
      )}
    </div>
  )
}
