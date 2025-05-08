"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Configuración del efecto
const PHRASES = [
  "LET'S WORK TOGETHER!",
  "LET'S CREATE TOGETHER!",
  "LET'S COOK TOGETHER!",
  "LET'S BUILD TOGETHER!",
  "LET'S DREAM TOGETHER!",
]
const PHRASE_CHANGE_INTERVAL = 6000 // Intervalo para cambiar frases en ms

export function DisintegrateText() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const phraseIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Función para crear partículas para el efecto de desintegración
  const createParticles = (text: string, container: HTMLDivElement) => {
    // Limpiar partículas anteriores
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }

    // Crear un elemento temporal para medir el texto
    const tempElement = document.createElement("div")
    tempElement.style.position = "absolute"
    tempElement.style.visibility = "hidden"
    tempElement.style.fontSize = "2rem"
    tempElement.style.fontWeight = "bold"
    tempElement.style.whiteSpace = "nowrap"
    tempElement.textContent = text
    document.body.appendChild(tempElement)

    // Obtener dimensiones del texto
    const { width } = tempElement.getBoundingClientRect()
    document.body.removeChild(tempElement)

    // Número de partículas proporcional al ancho del texto (pero limitado)
    // Aumentado el número de partículas reduciendo el divisor de 5 a 3
    const numParticles = Math.min(Math.floor(width / 3), 150)

    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div")

      // Posición inicial distribuida a lo largo del texto
      const x = (i / numParticles) * width - width / 2

      // Distribuir verticalmente en un rango más amplio para cubrir mejor la altura del texto
      const y = (Math.random() - 0.5) * 20

      // Estilo de la partícula - Ligeramente más grandes
      particle.style.position = "absolute"

      // Variación en el tamaño de las partículas para más dinamismo
      const size = 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Color rojo con variación de tonalidad
      const red = 220 + Math.floor(Math.random() * 35)
      particle.style.backgroundColor = `rgb(${red}, 0, 0)`

      particle.style.borderRadius = "50%"

      // Mayor opacidad base para mejor visibilidad
      particle.style.opacity = (0.3 + Math.random() * 0.7).toString()

      particle.style.left = `calc(50% + ${x}px)`
      particle.style.top = `calc(50% + ${y}px)`

      // Animación
      const duration = 0.5 + Math.random() * 0.7
      const delay = Math.random() * 0.3

      // Dirección principal: horizontal con ligera variación vertical
      const angle = (Math.random() * 0.6 - 0.3) * Math.PI // -54° a 54°
      const distance = 40 + Math.random() * 60
      const dx = Math.cos(angle) * distance
      const dy = Math.sin(angle) * distance

      // Aplicar animación con CSS
      particle.animate(
        [
          { transform: "translate(0, 0)", opacity: particle.style.opacity },
          { transform: `translate(${dx}px, ${dy}px)`, opacity: "0" },
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
          fill: "forwards",
        },
      )

      container.appendChild(particle)
    }
  }

  // Efecto para manejar la animación y cambio de frases
  useEffect(() => {
    // Iniciar con la primera frase visible
    setIsAnimating(false)

    // Configurar el intervalo para cambiar frases
    phraseIntervalRef.current = setInterval(() => {
      if (containerRef.current) {
        setIsAnimating(true)

        // Crear efecto de partículas
        createParticles(PHRASES[currentPhraseIndex], containerRef.current)

        // Cambiar la frase después de un breve retraso
        setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length)
          setIsAnimating(false)
        }, 800)
      }
    }, PHRASE_CHANGE_INTERVAL)

    // Limpiar al desmontar
    return () => {
      if (phraseIntervalRef.current) {
        clearInterval(phraseIntervalRef.current)
      }
    }
  }, [currentPhraseIndex])

  return (
    <div className="relative w-full flex justify-center items-center h-16">
      {/* Contenedor de texto */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhraseIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isAnimating ? 0 : 1, y: isAnimating ? -10 : 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="inline-block"
          >
            <h2 
            style={{ fontFamily: '"Pragmatica Extended"' }}
            className="text-2xl font-bold text-red-600">{PHRASES[currentPhraseIndex]}</h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contenedor de partículas para la animación */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" />
    </div>
  )
}
