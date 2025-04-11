"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import styles from "@/styles/hero.module.css"
import ParticleBackground from "./particle-background"
import WordScroller from "./word-scroller"

export default function Hero() {
  const [showContent, setShowContent] = useState(false)

  // Lista de palabras para el scroller
  const words = ["Design", "Animate", "Imagine", "Illustrate", "Refine", "Collaborate", "Innovate"]

  useEffect(() => {
    // Mostrar el contenido después de un breve retraso
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <section className={styles.heroSection}>
      <ParticleBackground />

      {showContent ? (
        <WordScroller words={words} />
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <div className="animate-pulse">Cargando...</div>
        </div>
      )}

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center">
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
