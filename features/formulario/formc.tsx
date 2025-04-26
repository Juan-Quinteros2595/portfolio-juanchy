"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { motion } from "framer-motion"
import styles from "./formc.module.css"

// Importar el componente DisintegrateText
import { DisintegrateText } from "./DisintegrateText"

interface Wave {
  amplitude: number
  period: number
  phase: number
  color: string
  lineWidth: number
  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number): void
}

export default function FormC() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contactCanvasRef = useRef<HTMLCanvasElement>(null)
  const waveCanvasRef = useRef<HTMLCanvasElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    idea: "",
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = 300
      canvas.height = 150
    }

    setCanvasSize()

    // Usar fuentes del sistema
    ctx.font = 'bold 80px "Gobold Hollow"';
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.strokeText("JNCH", 40, 100)

    ctx.shadowColor = "#ff0000"
    ctx.shadowBlur = 20
    ctx.strokeStyle = "#ff0000"
    ctx.strokeText("JNCH", 40, 100)

    // Contact Us canvas
    const contactCanvas = contactCanvasRef.current
    if (!contactCanvas) return

    const contactCtx = contactCanvas.getContext("2d")
    if (!contactCtx) return

    contactCanvas.width = 300
    contactCanvas.height = 80

    // Usar fuentes del sistema
    contactCtx.font = 'bold 40px "Gobold Hollow"';
    contactCtx.strokeStyle = "#666666"
    contactCtx.lineWidth = 1
    contactCtx.strokeText("CONTACT US", 25, 50)

    contactCtx.shadowColor = "#999999"
    contactCtx.shadowBlur = 15
    contactCtx.strokeStyle = "#888888"
    contactCtx.strokeText("CONTACT US", 25, 50)

    const waveCanvas = waveCanvasRef.current
    if (!waveCanvas) return

    const waveCtx = waveCanvas.getContext("2d")
    if (!waveCtx) return

    const setWaveCanvasSize = () => {
      waveCanvas.width = window.innerWidth
      waveCanvas.height = window.innerHeight
    }

    setWaveCanvasSize()
    window.addEventListener("resize", setWaveCanvasSize)

    let time = 0
    const waveCount = Math.min(5, Math.max(2, Math.floor(window.innerWidth / 300)))
    const waves: Wave[] = []

    class WaveClass implements Wave {
      constructor(
        public amplitude: number,
        public period: number,
        public phase: number,
        public color: string,
        public lineWidth: number,
      ) {}

      draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) {
        ctx.beginPath()
        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.color

        const height = canvas.height
        const width = canvas.width

        ctx.moveTo(0, height / 2)

        const step = window.innerWidth < 768 ? 10 : 5
        for (let x = 0; x < width; x += step) {
          const y = height / 2 + Math.sin(x / this.period + time + this.phase) * this.amplitude
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }
    }

    for (let i = 0; i < waveCount; i++) {
      const amplitude = Math.random() * 50 + 30
      const period = Math.random() * 200 + 100
      const phase = Math.random() * Math.PI * 2
      const opacity = Math.random() * 0.3 + 0.1
      const lineWidth = Math.random() * 1.5 + 0.5

      waves.push(new WaveClass(amplitude, period, phase, `rgba(255, 0, 0, ${opacity})`, lineWidth))
    }

    let animationFrameId: number

    function animate() {
      if (!waveCtx || !waveCanvas) return
      waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height)

      time += 0.01

      for (const wave of waves) {
        wave.draw(waveCtx, waveCanvas, time)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setWaveCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log("Form submitted:", formData)
      setFormData({ name: "", email: "", phone: "", idea: "" })
      alert("Message sent successfully!")
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className={styles.section} id="contact">
      <canvas ref={waveCanvasRef} className={styles.waveCanvas} />

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.logoContainer}
        >
          <canvas ref={canvasRef} className="w-[300px] h-[150px] font-gobold" />
        </motion.div>

        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <canvas ref={contactCanvasRef} className="w-[300px] h-[80px] font-samsungsans" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.formGroup}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="NAME"
                className={styles.input}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={styles.formGroup}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EMAIL"
                className={styles.input}
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.formGroup}
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="PHONE"
                className={styles.input}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.formDivider}
            >
              {/* Componente de texto con desintegración - altura reducida */}
              <div className="mb-4 mt-4 h-16 relative w-full flex justify-center items-center">
                <DisintegrateText />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={styles.formGroup}
            >
              <textarea
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                placeholder="TELL US ABOUT YOUR PROJECT"
                rows={3}
                className={`${styles.input} ${styles.textarea}`}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`${styles["animated-border-button"]} ${styles.submitButton}`}
            >
              <div className={styles["button-background"]} />
              <span>SEND MESSAGE</span>
              <Send size={18} />
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  )
}
