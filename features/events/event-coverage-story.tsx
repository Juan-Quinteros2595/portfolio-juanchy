/**
 * Event Coverage Story Component
 *
 * Este componente muestra una experiencia de desplazamiento interactiva para
 * proyectos de cobertura de eventos, con navegación lateral, animaciones
 * y una galería modal para ver las imágenes en detalle.
 */
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import GalleryModal from "@/features/gallery/gallery-modal"

// Definición de tipos para los eventos
interface EventImage {
  src: string
  alt: string
  width: number
  height: number
}

interface EventItem {
  id: string
  title: string
  year: string
  client: string
  description: string
  image: string
  gallery: EventImage[]
}

export default function EventCoverageStory() {
  // Estados para controlar la interacción
  const [activeEvent, setActiveEvent] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentEventImages, setCurrentEventImages] = useState<EventImage[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  // Datos de los eventos
  const events: EventItem[] = [
    {
      id: "mascotte",
      title: "MASCOTTE - THE LAST SPANNABIS",
      year: "2025",
      client: "@juanchy_aguilera | @Mascotte.official",
      description:
        "Cobertura exclusiva del evento Spannabis, capturando los momentos más destacados y la presencia de la marca Mascotte.",
      image: "/images/events.png",
      gallery: [
        { src: "/images/events.png", alt: "Mascotte Event 1", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Mascotte Event 2", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Mascotte Event 3", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Mascotte Event 4", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Mascotte Event 5", width: 1200, height: 800 },
      ],
    },
    {
      id: "lion",
      title: "LION ROLLING CIRCUS",
      year: "2024",
      client: "@juanchy_aguilera | @Lion Rolling Circus",
      description:
        "SPANNABIS 2024 - Documentación visual completa del stand de Lion Rolling Circus, mostrando productos y la interacción con los asistentes.",
      image: "/images/events.png",
      gallery: [
        { src: "/images/events.png", alt: "Lion Event 1", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Lion Event 2", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Lion Event 3", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Lion Event 4", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Lion Event 5", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Lion Event 6", width: 1200, height: 800 },
      ],
    },
    {
      id: "cannabis",
      title: "Cannabis Community Photo Coverage",
      year: "2024",
      client: "@juanchy_aguilera | @Vorterix Buenos Aires",
      description:
        "Reportaje fotográfico de la comunidad cannábica en Argentina, capturando la cultura y los eventos más importantes del año.",
      image: "/images/events.png",
      gallery: [
        { src: "/images/events.png", alt: "Cannabis Community 1", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Cannabis Community 2", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Cannabis Community 3", width: 1200, height: 800 },
      ],
    },
    {
      id: "sponsor",
      title: "SPONSOR DIOS",
      year: "2022",
      client: "@juanchy_aguilera | @Bahía Blanca, Argentina",
      description:
        "Cobertura del evento Sponsor Dios en Bahía Blanca, documentando todos los aspectos del evento desde la preparación hasta su conclusión.",
      image: "/images/events.png",
      gallery: [
        { src: "/images/events.png", alt: "Sponsor Dios 1", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Sponsor Dios 2", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Sponsor Dios 3", width: 1200, height: 800 },
        { src: "/images/events.png", alt: "Sponsor Dios 4", width: 1200, height: 800 },
      ],
    },
  ]

  // Prevenir el zoom en dispositivos móviles
  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault()
      }
    }

    document.addEventListener("touchmove", preventZoom, { passive: false })

    return () => {
      document.removeEventListener("touchmove", preventZoom)
    }
  }, [])

  /**
   * Efecto para manejar el scroll y actualizar el evento activo
   * Calcula qué evento debe mostrarse basado en la posición de scroll
   */
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0", 10)
            setActiveEvent(index)
          }
        })
      },
      {
        root: null, // Usa el viewport como contenedor
        threshold: 0.3, // Reduce el umbral para detectar antes el evento
      },
    )

    const sections = sectionRef.current.querySelectorAll(".event-section")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [events.length])

  /**
   * Abre la galería modal con las imágenes del evento seleccionado
   */
  const openGallery = (eventIndex: number) => {
    setCurrentEventImages(events[eventIndex].gallery)
    setGalleryOpen(true)
  }

  /**
   * Función para desplazarse a un evento específico
   */
  const scrollToEvent = (index: number) => {
    const sections = sectionRef.current?.querySelectorAll(".event-section")
    if (sections && sections[index]) {
      const targetSection = sections[index] as HTMLElement
      const offset = targetSection.offsetTop

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <section ref={sectionRef} className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8)_0%,rgba(0,0,0,1)_100%)] z-0"></div>

      {/* Navegación vertical de eventos - Solo visible en la página de eventos */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col items-start space-y-12 pl-8 pr-4 py-8 bg-black/40 backdrop-blur-sm rounded-r-lg shadow-lg shadow-amber-900/20">
          {events.map((event, index) => (
            <button
              key={event.id}
              onClick={() => scrollToEvent(index)}
              className={`text-sm uppercase tracking-wider transition-all duration-300 ${
                activeEvent === index ? "text-amber-400 font-bold" : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {event.id}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor para cada evento */}
      {events.map((event, index) => (
        <div
          key={event.id}
          className={`min-h-screen w-full flex items-center justify-center event-section ${
            activeEvent === index ? "z-10" : "z-0"
          }`}
          id={event.id}
          data-index={index}
        >
          <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Imagen del evento - Ahora con más margen a la izquierda en desktop */}
              <div className="order-2 md:order-1 md:ml-16">
                <motion.div
                  className="relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: activeEvent === index ? 1 : 0.3,
                    x: activeEvent === index ? 0 : -20,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ pointerEvents: "auto" }} // Permitir siempre la interacción
                >
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>
              </div>

              {/* Información del evento */}
              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeEvent === index ? 1 : 0.3,
                    y: activeEvent === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                  style={{
                    pointerEvents: activeEvent === index ? "auto" : "none", // Permitir interacción solo en el evento activo
                    opacity: activeEvent === index ? 1 : 0.3, // Asegurar opacidad explícita
                    willChange: "opacity, transform", // Optimizar animaciones
                    transform: "none", // Asegurar que no haya transformaciones no deseadas
                  }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-amber-400">{event.title}</h2>
                  <h3 className="text-xl md:text-2xl font-light">{event.year}</h3>
                  <p className="text-lg text-gray-300">{event.description}</p>
                  <div className="text-sm text-gray-400">{event.client}</div>
                  <button
                    onClick={() => openGallery(index)}
                    className="mt-6 inline-flex items-center px-6 py-3 border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition-colors duration-300"
                  >
                    VER GALERÍA ({event.gallery.length} imágenes)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Indicador de navegación móvil */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center md:hidden">
        <div className="flex space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToEvent(index)}
              className={`w-3 h-3 rounded-full ${activeEvent === index ? "bg-amber-400" : "bg-gray-600"}`}
              aria-label={`Ver evento ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Galería Modal */}
      <GalleryModal images={currentEventImages} open={galleryOpen} onOpenChange={setGalleryOpen} />
    </section>
  )
}