"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import styles from "@/styles/spotlight-tabs.module.css"

interface SpotlightTabsProps {
  categories: string[]
  activeCategory: string
  onChange: (category: string) => void
}

export default function SpotlightTabs({ categories, activeCategory, onChange }: SpotlightTabsProps) {
  const { t } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(categories.indexOf(activeCategory))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Actualizar la posición del spotlight basado en el elemento activo o hover
  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Actualizar la posición del spotlight cuando cambia el elemento activo
  useEffect(() => {
    setActiveIndex(categories.indexOf(activeCategory))
  }, [activeCategory, categories])

  // Manejar el movimiento del mouse para el efecto spotlight
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  // Manejar el clic en una pestaña
  const handleTabClick = (category: string, index: number) => {
    onChange(category)
    setActiveIndex(index)
  }

  // Calcular la posición del spotlight
  const getSpotlightPosition = () => {
    if (hoveredIndex !== null) {
      // Si hay un elemento con hover, posicionar el spotlight en ese elemento
      const tabWidth = dimensions.width / categories.length
      return {
        x: tabWidth * (hoveredIndex + 0.5),
        y: dimensions.height / 2,
      }
    } else if (activeIndex >= 0) {
      // Si no hay hover pero hay un elemento activo, posicionar el spotlight en ese elemento
      const tabWidth = dimensions.width / categories.length
      return {
        x: tabWidth * (activeIndex + 0.5),
        y: dimensions.height / 2,
      }
    }
    // Si no hay hover ni elemento activo, usar la posición del mouse
    return mousePosition
  }

  const spotlightPosition = getSpotlightPosition()

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* SVG Filter para el efecto spotlight */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="spotlight" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="glow"
            />
            <feBlend in="SourceGraphic" in2="glow" mode="normal" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
            <fePointLight x={spotlightPosition.x} y={spotlightPosition.y} z="100" result="light" />
            <feSpecularLighting
              in="blur"
              surfaceScale="1.5"
              specularConstant="1"
              specularExponent="80"
              lightingColor="#00e5ff"
              result="specOut"
            >
              <fePointLight x={spotlightPosition.x} y={spotlightPosition.y} z="100" />
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut2" />
            <feComposite
              in="SourceGraphic"
              in2="specOut2"
              operator="arithmetic"
              k1="0"
              k2="1"
              k3="1"
              k4="0"
              result="litPaint"
            />
          </filter>
        </defs>
      </svg>

      {/* Tabs con efecto spotlight */}
      <div className={styles.tabsContainer}>
        {categories.map((category, index) => (
          <motion.button
            key={category}
            className={`${styles.tab} ${activeIndex === index ? styles.activeTab : ""}`}
            onClick={() => handleTabClick(category, index)}
            onMouseEnter={() => setHoveredIndex(index)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
