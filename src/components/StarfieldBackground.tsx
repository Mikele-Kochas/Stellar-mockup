import { useEffect, useRef } from 'react'
import './StarfieldBackground.css'

function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: Array<{ x: number; y: number; radius: number; speed: number; opacity: number }> = []
    const numStars = 200

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random()
      })
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach(star => {
        star.y += star.speed
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(138, 43, 226, ${star.opacity})`
        ctx.fill()
        
        // Efekt świecenia
        ctx.shadowBlur = 10
        ctx.shadowColor = 'rgba(138, 43, 226, 0.8)'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="starfield" />
      <div className="hologram-overlay" />
    </>
  )
}

export default StarfieldBackground


