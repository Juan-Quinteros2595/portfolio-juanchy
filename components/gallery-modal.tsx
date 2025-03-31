/**
 * Gallery Modal Component
 *
 * Este componente muestra una galería modal interactiva con dos modos de visualización:
 * - Modo carrusel: para ver las imágenes una por una con controles de navegación
 * - Modo cuadrícula: para ver todas las imágenes en una cuadrícula
 */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogClose, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"
import styles from "@/styles/gallery-modal.module.css"

// Definición de tipos
interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

interface GalleryModalProps {
  images: GalleryImage[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function GalleryModal({ images, open, onOpenChange }: GalleryModalProps) {
  // Estados para controlar la interacción
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel")
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  // Actualizar tamaño de ventana para cálculos responsivos
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  /**
   * Navega a la siguiente imagen en el carrusel
   */
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  /**
   * Navega a la imagen anterior en el carrusel
   */
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  /**
   * Alterna entre los modos de visualización (carrusel/cuadrícula)
   */
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "carousel" ? "grid" : "carousel"))
  }

  /**
   * Calcula la altura máxima disponible para la imagen
   */
  const calculateMaxHeight = () => {
    // Reservar espacio para la barra de miniaturas y algo de padding
    const thumbnailsHeight = 120
    const padding = 40
    return windowSize.height - thumbnailsHeight - padding
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.modalContent}>
        {/* Título accesible para lectores de pantalla */}
        <DialogTitle>
          <span className="sr-only">Galería de imágenes</span>
        </DialogTitle>

        <div className="relative">
          {/* Controles superiores */}
          <div className={styles.controls}>
            <button
              onClick={toggleViewMode}
              className={styles.controlButton}
              title={viewMode === "carousel" ? "Grid view" : "Carousel view"}
            >
              <Expand size={20} />
            </button>
            <DialogClose className={styles.controlButton}>
              <X size={20} />
            </DialogClose>
          </div>

          {/* Modo carrusel */}
          {viewMode === "carousel" ? (
            <div className={styles.carouselContainer}>
              <div className={styles.imageContainer} style={{ height: `${Math.min(calculateMaxHeight(), 600)}px` }}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`${styles.imageSlide} ${
                      index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className={styles.image}
                    />
                  </div>
                ))}
              </div>

              {/* Flechas de navegación */}
              <button
                onClick={prevImage}
                className={`${styles.navButton} ${styles.prevButton}`}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className={`${styles.navButton} ${styles.nextButton}`}
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={24} />
              </button>

              {/* Miniaturas */}
              <div className={styles.thumbnailsContainer}>
                <div className={`${styles.thumbnailsScroll} no-scrollbar`}>
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`${styles.thumbnail} ${
                        index === currentIndex ? styles.activeThumbnail : styles.inactiveThumbnail
                      }`}
                    >
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={`Miniatura ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
                <div className={styles.counter}>
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            </div>
          ) : (
            // Modo cuadrícula
            <div
              className={styles.galleryContainer}
              style={{ height: `${Math.min(calculateMaxHeight() + 120, 720)}px` }}
            >
              <div className={styles.galleryGridLayout}>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={styles.gridItem}
                    onClick={() => {
                      setCurrentIndex(index)
                      setViewMode("carousel")
                    }}
                  >
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className={styles.gridImage} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

