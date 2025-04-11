"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import styles from "@/styles/content-tabs.module.css"

interface ContentTabsProps {
  categories: string[]
  activeCategory: string
  onChange: (category: string) => void
}

export default function ContentTabs({ categories, activeCategory, onChange }: ContentTabsProps) {
  const { t } = useLanguage()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Actualizar la posición del indicador cuando cambia la categoría activa
  useEffect(() => {
    updateIndicator(categories.indexOf(activeCategory))
  }, [activeCategory, categories])

  // Actualizar el indicador cuando cambia el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      updateIndicator(categories.indexOf(activeCategory))
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeCategory, categories])

  // Función para actualizar la posición y ancho del indicador
  const updateIndicator = (index: number) => {
    const activeTab = tabsRef.current[index]
    if (!activeTab || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const tabRect = activeTab.getBoundingClientRect()

    setIndicatorStyle({
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    })
  }

  // Manejar el clic en una pestaña
  const handleTabClick = (category: string, index: number) => {
    onChange(category)
    updateIndicator(index)
  }

  return (
    <div ref={containerRef} className={styles.container} onMouseLeave={() => setHoveredIndex(null)}>
      <div className={styles.tabsContainer}>
        {categories.map((category, index) => (
          <motion.button
            key={category}
            ref={(el) => (tabsRef.current[index] = el)}
            className={`${styles.tab} ${activeCategory === category ? styles.activeTab : ""}`}
            onClick={() => handleTabClick(category, index)}
            onMouseEnter={() => setHoveredIndex(index)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Indicador animado */}
      <motion.div
        className={styles.indicator}
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
    </div>
  )
}
