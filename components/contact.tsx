"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/language-context"
import styles from "@/styles/contact.module.css"

export default function Contact() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Wave animation settings
    let time = 0
    const waveCount = Math.min(5, Math.max(2, Math.floor(window.innerWidth / 300))) // Ajustar según tamaño de pantalla
    const waves: Wave[] = []

    class Wave {
      amplitude: number
      period: number
      phase: number
      color: string
      lineWidth: number

      constructor(amplitude: number, period: number, phase: number, color: string, lineWidth: number) {
        this.amplitude = amplitude
        this.period = period
        this.phase = phase
        this.color = color
        this.lineWidth = lineWidth
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.beginPath()
        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.color

        const height = canvas.height
        const width = canvas.width

        ctx.moveTo(0, height / 2)

        const step = window.innerWidth < 768 ? 10 : 5 // Ajustar detalle según tamaño de pantalla
        for (let x = 0; x < width; x += step) {
          const y = height / 2 + Math.sin(x / this.period + time + this.phase) * this.amplitude
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }
    }

    // Initialize waves
    for (let i = 0; i < waveCount; i++) {
      const amplitude = Math.random() * 50 + 30
      const period = Math.random() * 200 + 100
      const phase = Math.random() * Math.PI * 2
      const opacity = Math.random() * 0.3 + 0.1
      const lineWidth = Math.random() * 1.5 + 0.5

      waves.push(new Wave(amplitude, period, phase, `rgba(255, 0, 0, ${opacity})`, lineWidth))
    }

    // Animation loop
    let animationFrameId: number

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      for (const wave of waves) {
        wave.draw(ctx, time)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <>
      <section className={styles.section}>
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50" />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className={styles.contactContainer}
        >
          <div className="md:w-2/3 mb-12 md:mb-0">
            <motion.h2 variants={itemVariants} className={styles.title}>
              {t("contact.title")}
            </motion.h2>

            <motion.div variants={containerVariants} className={styles.infoContainer}>
              <motion.div variants={itemVariants} className={styles.infoRow}>
                <span className={styles.infoLabel}>{t("contact.whatsapp")}</span>
                <span itemProp="telephone">+3465822698</span>
              </motion.div>

              <motion.div variants={itemVariants} className={styles.infoRow}>
                <span className={styles.infoLabel}>{t("contact.email")}</span>
                <span itemProp="email">juanchyfilmaker@gmail.com</span>
              </motion.div>

              <motion.div variants={itemVariants} className={styles.infoRow}>
                <span className={styles.infoLabel}>{t("contact.office")}</span>
                <div className="flex flex-col">
                  <span itemProp="address">{t("contact.location.argentina")}</span>
                  <span itemProp="address">{t("contact.location.spain")}</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className={styles.socialLinks}>
                <a
                  href="https://instagram.com/juanchy_aguilera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  @juanchy_aguilera
                </a>
                <a
                  href="https://instagram.com/jnch.oficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  @jnch.oficial
                </a>
              </motion.div>
            </motion.div>
          </div>

          <div className="md:w-1/3 flex justify-center md:justify-end">
            <motion.div variants={itemVariants} className={`${styles.logo} ${styles.textOutline}`}>
              JNCH
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  )
}
