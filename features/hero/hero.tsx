"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import styles from "./hero.module.css"
import VideoBackground from "./video-background"
import WordScroller from "./word-scroller"
import { useLanguage } from "@/features/i18n/language-context"

export default function Hero() {
  const [showContent, setShowContent] = useState(false)
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const { dictionary } = useLanguage()

  // Lista de medios para el fondo (videos e imágenes)
  const backgroundMedia = [
    { src: "/videos/CityV2.mp4", type: "video" as const },
    { src: "/videos/SenderoV3.mp4", type: "video" as const },
    { src: "/images/lifestyle.png", type: "image" as const },
    // Puedes agregar más medios aquí si tienes más palabras
  ]

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

  // Manejador para cuando cambia la palabra activa
  const handleActiveWordChange = (index: number) => {
    if (index !== activeWordIndex) {
      setActiveWordIndex(index);
    }
  };

  return (
    <section className={styles.heroSection}>
      <VideoBackground media={backgroundMedia} activeIndex={activeWordIndex % backgroundMedia.length} />

      {showContent ? (
        <div className={styles.contentWrapper}>
          <WordScroller
            words={dictionary["hero.words"]?.split(",") || []} // Validación de datos
            activeIndex={activeWordIndex} // Pasamos el índice activo
            onActiveWordChange={handleActiveWordChange} // Callback para sincronización
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full w-full relative z-10">
          <div className="animate-pulse">Cargando...</div>
        </div>
      )}
    </section>
  )
}
