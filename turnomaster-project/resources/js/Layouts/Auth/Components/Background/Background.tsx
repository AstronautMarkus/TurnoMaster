import type React from "react"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  direction: number
  waveOffset: number
}

export default function PS4Background({
  children,
}: {
  children?: React.ReactNode
}) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {

    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.15 + 0.05,
      direction: Math.random() > 0.5 ? 1 : -1,
      waveOffset: Math.random() * Math.PI * 2,
    }))

    setParticles(newParticles)


    let animationFrameId: number
    let lastTime = 0
    let totalTime = 0

    const animate = (time: number) => {
      if (lastTime === 0) lastTime = time
      const deltaTime = time - lastTime
      lastTime = time
      totalTime += deltaTime

      setParticles((prevParticles) =>
        prevParticles.map((particle) => {

          const waveX = Math.sin(totalTime / 2000 + particle.waveOffset) * 5 * particle.direction


          let newY = particle.y - particle.speed * (deltaTime / 100)
          let newX = particle.x + waveX * (deltaTime / 1000)


          if (newY < -5) {
            newY = 105
            newX = Math.random() * 100
          }


          if (newX < -5) newX = 105
          if (newX > 105) newX = -5

          return {
            ...particle,
            x: newX,
            y: newY,
          }
        }),
      )

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-700 via-blue-800 to-blue-900">

      <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-radial from-[#0a2463] via-transparent to-transparent opacity-20"></div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.size}px rgba(59, 130, 246, 0.5)`,
          }}
        />
      ))}

    </div>
  )
}

