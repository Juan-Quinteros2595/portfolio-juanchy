"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./video-background.module.css"
import Image from "next/image"

interface VideoBackgroundProps {
  media: {
    src: string
    type: "video" | "image"
  }[]
  activeIndex?: number // Prop para controlar qué medio se muestra
}

export default function VideoBackground({ media, activeIndex = 0 }: VideoBackgroundProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [currentIndex, setCurrentIndex] = useState(activeIndex)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const lastChangeTimeRef = useRef(0)

  // Inicializar los refs para cada video
  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, media.length)
  }, [media.length])

  // Reproducir automáticamente los videos cuando estén listos
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {
          // Ignoramos errores iniciales de reproducción automática
        })
      }
    })
  }, [])

  // Efecto para manejar cambios en el índice activo
  useEffect(() => {
    // Evitar cambios demasiado frecuentes
    const now = Date.now()
    if (now - lastChangeTimeRef.current < 1000 || isTransitioning) {
      return
    }

    // Si el índice activo es diferente del actual
    if (activeIndex !== currentIndex) {
      console.log(`Video changing from ${currentIndex} to ${activeIndex}`)
      lastChangeTimeRef.current = now
      setIsTransitioning(true)

      // Reproducir el nuevo video
      const targetVideo = videoRefs.current[activeIndex]
      if (targetVideo) {
        // Pausar todos los videos excepto el actual
        videoRefs.current.forEach((video, idx) => {
          if (video && idx !== activeIndex) {
            video.pause()
          }
        })

        // Reproducir el video objetivo
        targetVideo.currentTime = 0
        const playPromise = targetVideo.play()

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Ignoramos errores de reproducción automática
          })
        }
      }

      // Actualizar el índice actual después de un breve retraso
      setTimeout(() => {
        setCurrentIndex(activeIndex)
        setIsTransitioning(false)
      }, 500)
    }
  }, [activeIndex, currentIndex, isTransitioning, media])

  return (
    <div className={styles.videoContainer}>
      {media.map((item, index) => (
        <div
          key={`media-${index}`}
          className={`${styles.videoWrapper} ${index === currentIndex ? styles.active : styles.hidden}`}
        >
          {item.type === "video" ? (
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.src}
              className={styles.video}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className={styles.imageContainer}>
              <Image
                src={item.src || "/placeholder.svg"}
                alt="Background image"
                fill
                className={styles.image}
                priority
              />
            </div>
          )}
          <div className={styles.overlay}></div>
        </div>
      ))}
    </div>
  )
}
