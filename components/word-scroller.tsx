"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/context/language-context"
import styles from "@/styles/word-scroller.module.css"

interface WordScrollerProps {
  words?: string[] // Hacemos que words sea opcional
}

export default function WordScroller({ words: propWords }: WordScrollerProps) {
  const { t } = useLanguage()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLDivElement | null)[]>([])

  // Obtenemos las palabras de las traducciones si no se proporcionan como props
  const words = propWords || t("hero.words").split(",")

  // Colores para cada palabra
  const colors = [
    "#e91e63", // Rosa (Design/Diseñar)
    "#ff9800", // Naranja (Animate/Animar)
    "#cddc39", // Lima (Imagine/Imaginar)
    "#00bcd4", // Cian (Illustrate/Ilustrar)
    "#9c27b0", // Púrpura (Refine/Refinar)
    "#3f51b5", // Índigo (Collaborate/Colaborar)
    "#f44336", // Rojo (Innovate/Innovar)
  ]

  // Método alternativo para detectar la palabra centrada
  const checkCenteredWord = () => {
    if (!scrollContainerRef.current || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const containerCenter = containerRect.top + containerRect.height / 2

    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    wordRefs.current.forEach((wordRef, index) => {
      if (!wordRef) return

      const wordRect = wordRef.getBoundingClientRect()
      const wordCenter = wordRect.top + wordRect.height / 2
      const distance = Math.abs(containerCenter - wordCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActiveIndex(closestIndex)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Inicializar los refs para cada palabra
    wordRefs.current = wordRefs.current.slice(0, words.length)

    // Configurar el evento de scroll para detectar la palabra centrada
    const handleScroll = () => {
      checkCenteredWord()
    }

    container.addEventListener("scroll", handleScroll)

    // Verificar la palabra centrada inicialmente
    setTimeout(() => {
      checkCenteredWord()

      // Centrar la primera palabra
      const firstWord = wordRefs.current[0]
      if (firstWord) {
        firstWord.scrollIntoView({ block: "center", behavior: "auto" })
      }
    }, 100)

    return () => {
      container.removeEventListener("scroll", handleScroll)
    }
  }, [words.length])

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.jnchText}>JNCH</h1>

        <div ref={scrollContainerRef} className={styles.scrollContainer}>
          <div className={styles.spacer}></div>
          {words.map((word, index) => (
            <div
              key={index}
              ref={(el) => (wordRefs.current[index] = el)}
              className={styles.wordItem}
              style={{
                color: activeIndex === index ? colors[index % colors.length] : "rgba(255, 255, 255, 0.2)",
                opacity: activeIndex === index ? 1 : 0.3,
                transform: activeIndex === index ? "scale(1)" : "scale(0.9)",
              }}
            >
              {word}.
            </div>
          ))}
          <div className={styles.spacer}></div>
        </div>
      </div>
    </div>
  )
}
