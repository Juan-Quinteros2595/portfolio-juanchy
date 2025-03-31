/**
 * Ecommerce Photography Story Component
 *
 * Este componente muestra una experiencia de desplazamiento interactiva para
 * proyectos de fotografía de ecommerce, con navegación lateral, animaciones
 * y una galería modal para ver las imágenes en detalle.
 */
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import GalleryModal from "./gallery-modal"

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

export default function EcommercePhotographyStory() {
  const [activeProject, setActiveProject] = useState(0)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentProjectImages, setCurrentProjectImages] = useState<ProjectImage[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  // Datos de los proyectos de fotografía de ecommerce
  const projects: Project[] = [
    {
      id: "magic-vaporizers",
      title: "MAGIC VAPORIZERS",
      year: "2024",
      client: "@juanchy_aguilera | @MagicVaporizers",
      description:
        "Fotografía de producto para la tienda online de Magic Vaporizers, destacando los detalles y características de cada producto con un enfoque limpio y profesional.",
      image: "/images/ecommerce.png",
      gallery: [
        { src: "/images/ecommerce.png", alt: "Magic Vaporizers Product 1", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Magic Vaporizers Product 2", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Magic Vaporizers Product 3", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Magic Vaporizers Product 4", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Magic Vaporizers Product 5", width: 1200, height: 800 },
      ],
    },
    {
      id: "dynavap-collection",
      title: "DYNAVAP COLLECTION",
      year: "2023",
      client: "@juanchy_aguilera | @dynavap_latinoamerica",
      description:
        "Sesión fotográfica completa de la colección de productos DynaVap para su catálogo online, con énfasis en la calidad de los materiales y el diseño único.",
      image: "/images/ecommerce.png",
      gallery: [
        { src: "/images/ecommerce.png", alt: "DynaVap Product 1", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "DynaVap Product 2", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "DynaVap Product 3", width: 1200, height: 800 },
      ],
    },
    {
      id: "raw-papers",
      title: "RAW ROLLING PAPERS",
      year: "2023",
      client: "@juanchy_aguilera | @rawlifearg",
      description:
        "Fotografía de producto para la línea completa de papeles y accesorios Raw, con composiciones creativas que resaltan la marca y facilitan la venta online.",
      image: "/images/ecommerce.png",
      gallery: [
        { src: "/images/ecommerce.png", alt: "Raw Papers Product 1", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Raw Papers Product 2", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Raw Papers Product 3", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Raw Papers Product 4", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Raw Papers Product 5", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Raw Papers Product 6", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Raw Papers Product 7", width: 1200, height: 800 },
      ],
    },
    {
      id: "zenco-accessories",
      title: "ZENCO ACCESSORIES",
      year: "2022",
      client: "@juanchy_aguilera | @thezencolife",
      description:
        "Fotografía de accesorios para la tienda online de Zenco Life, con un enfoque minimalista que destaca cada producto sobre fondos neutros.",
      image: "/images/ecommerce.png",
      gallery: [
        { src: "/images/ecommerce.png", alt: "Zenco Accessory 1", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Zenco Accessory 2", width: 1200, height: 800 },
      ],
    },
    {
      id: "lion-circus",
      title: "LION ROLLING CIRCUS",
      year: "2022-2023",
      client: "@juanchy_aguilera | @lionrollingcircus",
      description:
        "Fotografía de producto para el catálogo completo de Lion Rolling Circus, con un estilo distintivo que refleja la personalidad de la marca.",
      image: "/images/ecommerce.png",
      gallery: [
        { src: "/images/ecommerce.png", alt: "Lion Rolling Product 1", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Lion Rolling Product 1", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Lion Rolling Product 2", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Lion Rolling Product 3", width: 1200, height: 800 },
        { src: "/images/ecommerce.png", alt: "Lion Rolling Product 4", width: 1200, height: 800 },
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
            const index = parseInt(entry.target.getAttribute("data-index") || "0", 10)
            setActiveProject(index)
          }
        })
      },
      {
        root: null,
        threshold: 0.3,
      }
    )

    const sections = sectionRef.current?.querySelectorAll(".project-section")
    sections?.forEach((section) => observer.observe(section))

    return () => {
      sections?.forEach((section) => observer.unobserve(section))
    }
  }, [projects.length])

  return (
    <section ref={sectionRef} className="min-h-screen w-full bg-black text-white relative overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10 z-0"></div>

      {/* Navegación vertical de proyectos con icono de bolsa de compras */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col items-start space-y-12 pl-8 pr-4 py-8 bg-black/40 backdrop-blur-sm rounded-r-lg shadow-lg shadow-blue-900/20">
          <div className="mb-4">
            <ShoppingBag size={24} className="text-white opacity-70" />
          </div>
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => scrollToProject(index)}
              className={`text-sm uppercase tracking-wider transition-all duration-300 ${
                activeProject === index ? "text-blue-400 font-bold" : "text-gray-500 hover:text-gray-300"
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
              {/* Imagen del proyecto */}
              <div className="order-2 md:order-1 md:ml-16">
                <motion.div
                  className="relative overflow-hidden rounded-lg border border-gray-800"
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
                  <h2 className="text-4xl md:text-6xl font-bold text-blue-400">{project.title}</h2>
                  <h3 className="text-xl md:text-2xl font-light text-gray-400">{project.year}</h3>
                  <p className="text-lg text-gray-300">{project.description}</p>
                  <div className="text-sm text-gray-400">{project.client}</div>
                  <button
                    onClick={() => openGallery(index)}
                    className="mt-6 inline-flex items-center px-6 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black transition-colors duration-300"
                  >
                    VER GALERÍA ({project.gallery.length} imágenes)
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
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`w-3 h-3 rounded-full ${activeProject === index ? "bg-blue-400" : "bg-gray-600"}`}
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

