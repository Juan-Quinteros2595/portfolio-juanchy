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
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"

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
      <DialogContent className="max-w-[95vw] sm:max-w-[85vw] md:max-w-5xl p-0 bg-black border-gray-800 overflow-hidden">
        <div className="relative">
          {/* Controles superiores */}
          <div className="absolute top-4 right-4 z-30 flex space-x-2">
            <button
              onClick={toggleViewMode}
              className="rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
              title={viewMode === "carousel" ? "Grid view" : "Carousel view"}
            >
              <Expand size={20} />
            </button>
            <DialogClose className="rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors">
              <X size={20} />
            </DialogClose>
          </div>

          {/* Modo carrusel */}
          {viewMode === "carousel" ? (
            <div className="relative">
              <div
                className="w-full bg-black flex items-center justify-center"
                style={{ height: `${Math.min(calculateMaxHeight(), 600)}px` }}
              >
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-300 flex items-center justify-center ${
                      index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Flechas de navegación */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80 transition-colors z-20"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white hover:bg-black/80 transition-colors z-20"
                aria-label="Siguiente imagen"
              >
                <ChevronRight size={24} />
              </button>

              {/* Miniaturas */}
              <div className="bg-black/90 p-4">
                <div className="flex justify-center overflow-x-auto space-x-2 pb-2 no-scrollbar">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`flex-shrink-0 relative w-16 h-16 rounded overflow-hidden ${
                        index === currentIndex ? "ring-2 ring-white" : "opacity-60 hover:opacity-100"
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
                <div className="text-white text-sm mt-2 text-center">
                  {currentIndex + 1} / {images.length}
                </div>
              </div>
            </div>
          ) : (
            // Modo cuadrícula
            <div className="bg-black p-4" style={{ height: `${Math.min(calculateMaxHeight() + 120, 720)}px` }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full overflow-y-auto no-scrollbar">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded cursor-pointer"
                    onClick={() => {
                      setCurrentIndex(index)
                      setViewMode("carousel")
                    }}
                  >
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
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

