"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import GalleryModal from "@/features/gallery/gallery-modal"
import styles from "./content-carousel.module.css"

interface ContentImage {
  src: string
  alt: string
  width: number
  height: number
}

interface ContentItem {
  id: string
  title: string
  year: string
  client: string
  description: string
  image: string
  gallery: ContentImage[]
}

interface ContentCarouselProps {
  items: ContentItem[]
  title: string
  isActive: boolean
}

export default function ContentCarousel({ items, title, isActive }: ContentCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const openGallery = (item: ContentItem) => {
    setSelectedItem(item)
    setGalleryOpen(true)
  }

  const currentItem = items[currentIndex]

  if (!isActive || !currentItem) return null

  return (
    <div className={styles.carouselContainer}>
      {/* Header del carousel */}
      <motion.div
        className={styles.carouselHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.carouselControls}>
          <button onClick={prevItem} className={styles.controlButton} aria-label="Anterior">
            <ChevronLeft size={24} />
          </button>
          <span className={styles.itemCounter}>
            {currentIndex + 1} / {items.length}
          </span>
          <button onClick={nextItem} className={styles.controlButton} aria-label="Siguiente">
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>

      {/* Contenido del carousel */}
      <div className={styles.carouselContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className={styles.contentGrid}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            {/* Galería de imágenes */}
            <div className={styles.imageGrid}>
              {currentItem.gallery.slice(0, 4).map((image, index) => (
                <motion.div
                  key={index}
                  className={styles.imageContainer}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openGallery(currentItem)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className={styles.gridImage}
                    priority={index < 2}
                  />
                  {index === 3 && currentItem.gallery.length > 4 && (
                    <div className={styles.moreImagesOverlay}>
                      <span>+{currentItem.gallery.length - 4}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Información del contenido */}
            <div className={styles.contentInfo}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className={styles.contentTitle}>{currentItem.title}</h3>
                <div className={styles.contentMeta}>
                  <span className={styles.contentYear}>{currentItem.year}</span>
                  <span className={styles.contentClient}>{currentItem.client}</span>
                </div>
                <p className={styles.contentDescription}>{currentItem.description}</p>

                <button onClick={() => openGallery(currentItem)} className={styles.galleryButton}>
                  <span>VER GALERÍA</span>
                  <span className={styles.imageCount}>({currentItem.gallery.length} imágenes)</span>
                  <svg className={styles.buttonIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores */}
      <div className={styles.indicators}>
        {items.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Gallery Modal */}
      <GalleryModal images={selectedItem?.gallery || []} open={galleryOpen} onOpenChange={setGalleryOpen} />
    </div>
  )
}
