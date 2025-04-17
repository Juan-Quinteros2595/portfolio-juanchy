"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ClientCard } from "@/features/clients/client-card"
import { useLanguage } from "@/features/i18n/language-context"
import CLIENTS from "@/config/clients"
import styles from "./happy-clients-slider.module.css"

export default function HappyClientsSlider() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const { dictionary } = useLanguage()
  const sliderRef = useRef<HTMLDivElement>(null)

  // Efecto para el desplazamiento automático del slider
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let animationId: number
    let startTime: number
    const duration = 30000 // 30 segundos para una vuelta completa
    const totalWidth = slider.scrollWidth - slider.clientWidth

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % duration) / duration

      // Cálculo de la posición con efecto de rebote suave en los extremos
      const position = totalWidth * progress
      slider.scrollLeft = position

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className={styles.section}>
      <div className={styles.background}></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className={styles.container}
      >
        <motion.div variants={itemVariants} className={styles.header}>
          <h2 className={styles.title}>{dictionary["clients.number"]}</h2>
          <h3 className={styles.subtitle}>{dictionary["clients.title"]}</h3>
          <p className={styles.description}>{dictionary["clients.description"]}</p>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.sliderContainer}>
          <div ref={sliderRef} className={styles.slider}>
            {CLIENTS.map((client, index) => (
              <div key={index} className={styles.slideItem}>
                <ClientCard {...client} />
              </div>
            ))}
            {/* Duplicar los primeros clientes para crear un efecto continuo */}
            {CLIENTS.slice(0, 5).map((client, index) => (
              <div key={`dup-${index}`} className={styles.slideItem}>
                <ClientCard {...client} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.footer}>
          <p>{dictionary["clients.footer"]}</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
