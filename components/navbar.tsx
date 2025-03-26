"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (projectsRef.current && !projectsRef.current.contains(event.target as Node)) {
        setProjectsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const toggleProjects = () => {
    setProjectsOpen(!projectsOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setProjectsOpen(false)
  }

  // Función para manejar el desplazamiento suave a las secciones
  const scrollToSection = (sectionId: string) => {
    closeMenu()

    const section = document.getElementById(sectionId)
    if (section) {
      // Añadir un pequeño retraso para asegurar que el menú se cierre primero
      setTimeout(() => {
        // Calcular la posición considerando la altura de la navbar
        const navbarHeight = scrolled ? 60 : 80 // Altura aproximada de la navbar
        const offsetTop = section.offsetTop - navbarHeight

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }, 100)
    }
  }

  const projectItems = [
    { name: "Content Creators", id: "content-creators" },
    { name: "Ecommerce Photography", id: "ecommerce-photography" },
    { name: "Lifestyle Photography", id: "lifestyle-photography" },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black bg-opacity-90 backdrop-blur-md py-2" : "bg-transparent py-3 sm:py-5"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <button onClick={() => scrollToSection("hero")} className="text-white font-bold text-xl">
          JNCH
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <button
            onClick={() => scrollToSection("works")}
            className="text-white hover:text-red-500 transition-colors relative group"
          >
            Trabajos
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </button>

          {/* Proyectos Dropdown */}
          <div ref={projectsRef} className="relative">
            <button
              onClick={toggleProjects}
              className="text-white hover:text-red-500 transition-colors relative group flex items-center"
            >
              Proyectos
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform duration-300 ${projectsOpen ? "rotate-180" : ""}`}
              />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
            </button>

            <AnimatePresence>
              {projectsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-black bg-opacity-90 backdrop-blur-md rounded-md overflow-hidden shadow-lg"
                >
                  <div className="py-2">
                    {projectItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="block w-full text-left px-4 py-3 text-white hover:bg-gray-800 transition-colors"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="text-white hover:text-red-500 transition-colors relative group"
          >
            Contacto
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none p-2" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black bg-opacity-95 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("works")}
                className="text-white hover:text-red-500 transition-colors py-3 text-lg text-left"
              >
                Trabajos
              </button>

              {/* Mobile Projects Dropdown */}
              <div>
                <button
                  onClick={toggleProjects}
                  className="text-white hover:text-red-500 transition-colors py-3 text-lg flex items-center justify-between w-full"
                >
                  <span>Proyectos</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${projectsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {projectsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-2 border-l border-gray-800"
                    >
                      {projectItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => scrollToSection(item.id)}
                          className="block w-full text-left py-3 text-gray-300 hover:text-red-500 transition-colors"
                        >
                          {item.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-red-500 transition-colors py-3 text-lg text-left"
              >
                Contacto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

