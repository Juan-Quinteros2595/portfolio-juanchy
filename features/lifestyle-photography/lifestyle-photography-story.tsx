"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Camera } from "lucide-react"
import { useLanguage } from "@/features/i18n/language-context"
import GalleryModal from "@/features/gallery/gallery-modal"

// Definición de tipos para los proyectos
interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

interface Project {
  id: string
  title: string
  year: string
  client: string
  description: string
  image: string
  gallery: ProjectImage[]
}

export default function LifestylePhotographyStory() {
  const { dictionary } = useLanguage()
  const [activeProject, setActiveProject] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentProjectImages, setCurrentProjectImages] = useState<ProjectImage[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  // Datos de los proyectos de fotografía de estilo de vida
  const projects: Project[] = [
    {
      id: "magic",
      title: "MAGIC VAPORIZERS",
      year: "2024 - 2025",
      client: "@juanchy_aguilera | @MagicVaporizers",
      description:
        "Fotografía de estilo de vida para Magic Vaporizers, mostrando sus productos en situaciones cotidianas y destacando su usabilidad y diseño.",
      image: "/images/lifestyle.png",
      gallery: [
        { src: "/images/lifestyle.png", alt: "Magic Vaporizers Lifestyle 1", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "Magic Vaporizers Lifestyle 2", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "Magic Vaporizers Lifestyle 3", width: 1200, height: 800 },
      ],
    },
    {
      id: "zenco",
      title: "ZENCO LIFE VAPORIZER",
      year: "2023",
      client: "@gonzaloangueira | @zencolife",
      description:
        "Sesión fotográfica para Zenco Life, enfocada en mostrar la integración de sus vaporizers en un estilo de vida moderno y consciente.",
      image: "/images/lifestyle.png",
      gallery: [
        { src: "/images/lifestyle.png", alt: "Zenco Lifestyle 1", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "Zenco Lifestyle 2", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "Zenco Lifestyle 3", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "Zenco Lifestyle 4", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "Zenco Lifestyle 5", width: 1200, height: 800 },
      ],
    },
    {
      id: "dynavap",
      title: "DynaVap",
      year: "2023",
      client: "@gonzaloangueira | @dynavap",
      description:
        "Fotografía de producto y estilo de vida para DynaVap, destacando la calidad y el diseño innovador de sus productos.",
      image: "/images/lifestyle.png",
      gallery: [
        { src: "/images/lifestyle.png", alt: "DynaVap Lifestyle 1", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "DynaVap Lifestyle 2", width: 1200, height: 800 },
      ],
    },
    {
      id: "slingstash",
      title: 'THE "B" + SLINGSTASH',
      year: "2023",
      client: "@gonzaloangueira | @dynavap",
      description:
        "Campaña fotográfica para el lanzamiento de los nuevos productos 'The B' y 'SlingStash', mostrando su uso en diferentes contextos.",
      image: "/images/lifestyle.png",
      gallery: [
        { src: "/images/lifestyle.png", alt: "SlingStash Lifestyle 1", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "SlingStash Lifestyle 2", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "SlingStash Lifestyle 3", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "SlingStash Lifestyle 4", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "SlingStash Lifestyle 5", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "SlingStash Lifestyle 6", width: 1200, height: 800 },
      ],
    },
    {
      id: "rawlife",
      title: "RAWLIFE ARGENTINA",
      year: "2023-2025",
      client: "@juanchy_aguilera | @rawlifearg",
      description:
        "LIFESTYLE PHOTOGRAPHY FOR SOCIAL MEDIA - Contenido fotográfico continuo para redes sociales, mostrando los productos de Raw en situaciones cotidianas.",
      image: "/images/lifestyle.png",
      gallery: [
        { src: "/images/lifestyle.png", alt: "RawLife Lifestyle 1", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "RawLife Lifestyle 2", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "RawLife Lifestyle 3", width: 1200, height: 800 },
        { src: "/images/lifestyle.png", alt: "RawLife Lifestyle 4", width: 1200, height: 800 },
      ],
    },
  ]

  // Función para abrir la galería modal
  const openGallery = (projectIndex: number) => {
    setCurrentProjectImages(projects[projectIndex].gallery)
    setGalleryOpen(true)
  }

  // Función para desplazarse a un proyecto específico
  const scrollToProject = (index: number) => {
    const sections = sectionRef.current?.querySelectorAll(".project-section")
    if (sections && sections[index]) {
      const targetSection = sections[index] as HTMLElement
      const offset = targetSection.offsetTop

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      })
    }
  }

  // Efecto para manejar el scroll y actualizar el proyecto activo
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0", 10)
            setActiveProject(index)
          }
        })
      },
      {
        root: null,
        threshold: 0.3,
      },
    )

    const sections = sectionRef.current?.querySelectorAll(".project-section")
    sections?.forEach((section) => observer.observe(section))

    return () => {
      sections?.forEach((section) => observer.unobserve(section))
    }
  }, [projects.length])

  return (
    <section ref={sectionRef} className="min-h-screen w-full bg-white text-black relative overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-70 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10 z-0"></div>

      {/* Navegación vertical de proyectos con icono de cámara */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col items-start space-y-12 pl-8 pr-4 py-8 bg-white/60 backdrop-blur-sm rounded-r-lg shadow-lg shadow-gray-300/50">
          <div className="mb-4">
            <Camera size={24} className="text-black opacity-70" />
          </div>
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => scrollToProject(index)}
              className={`text-sm uppercase tracking-wider transition-all duration-300 ${
                activeProject === index ? "text-gray-800 font-bold" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {project.id}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor para cada proyecto */}
      {projects.map((project, index) => (
        <div
          key={project.id}
          className={`min-h-screen w-full flex items-center justify-center project-section ${
            activeProject === index ? "z-10" : "z-0"
          }`}
          id={project.id}
          data-index={index}
        >
          <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Imagen del proyecto - Ahora con más margen a la izquierda en desktop */}
              <div className="order-2 md:order-1 md:ml-16">
                <motion.div
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: activeProject === index ? 1 : 0.3,
                    x: activeProject === index ? 0 : -20,
                  }}
                  transition={{ duration: 0.5 }}
                  style={{
                    pointerEvents: activeProject === index ? "auto" : "none",
                    willChange: "opacity, transform",
                    transform: "none",
                  }}
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </motion.div>
              </div>

              {/* Información del proyecto */}
              <div className="order-1 md:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: activeProject === index ? 1 : 0.3,
                    y: activeProject === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                  style={{
                    pointerEvents: activeProject === index ? "auto" : "none",
                    willChange: "opacity, transform",
                    transform: "none",
                  }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold text-gray-800">{project.title}</h2>
                  <h3 className="text-xl md:text-2xl font-light text-gray-600">{project.year}</h3>
                  <p className="text-lg text-gray-700">{project.description}</p>
                  <div className="text-sm text-gray-500">{project.client}</div>
                  <button
                    onClick={() => openGallery(index)}
                    className="mt-6 inline-flex items-center px-6 py-3 border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
                  >
                    {dictionary["ecommerce.viewGallery"]} ({project.gallery.length} {dictionary["ecommerce.images"]})
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
        <div className="flex space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`w-3 h-3 rounded-full ${activeProject === index ? "bg-gray-800" : "bg-gray-300"}`}
              aria-label={`Ver proyecto ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Galería Modal */}
      <GalleryModal images={currentProjectImages} open={galleryOpen} onOpenChange={setGalleryOpen} />
    </section>
  )
}
