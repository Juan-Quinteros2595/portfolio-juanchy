"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import styles from "@/styles/navbar.module.css"

// Función para habilitar el scroll suave
const enableSmoothScroll = () => {
  document.documentElement.classList.add("smooth-scroll")
  setTimeout(() => {
    document.documentElement.classList.remove("smooth-scroll")
  }, 1000)
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const projectsRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
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
    // Si cerramos el menú principal, también cerramos el submenú de proyectos
    if (!isOpen === false) {
      setProjectsOpen(false)
    }
  }

  const toggleProjects = (e: React.MouseEvent) => {
    e.stopPropagation()
    setProjectsOpen(!projectsOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
    setProjectsOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    closeMenu()

    if (pathname === "/") {
      const section = document.getElementById(sectionId)
      if (section) {
        setTimeout(() => {
          const navbarHeight = scrolled ? 60 : 80
          const offsetTop = section.offsetTop - navbarHeight

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }, 100)
      }
    } else {
      enableSmoothScroll()
      router.push(`/#${sectionId}`)
    }
  }

  const projectItems = [
    { name: "Content Creators", path: "/content-creators" },
    { name: "Ecommerce Photography", path: "/ecommerce_photography" },
    { name: "Lifestyle Photography", path: "/lifestyle_photography" },
    { name: "Event Coverage", path: "/events" },
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link href="/" className="text-white font-bold text-xl" onClick={closeMenu}>
          JNCH
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <div className={styles.navLinkContainer}>
            <button onClick={() => scrollToSection("works")} className={styles.navLink}>
              Trabajos
            </button>
            <span className={styles.linkUnderline}></span>
          </div>

          {/* Proyectos Dropdown */}
          <div ref={projectsRef} className="relative">
            <div className={styles.navLinkContainer}>
              <button onClick={toggleProjects} className={`${styles.navLink} flex items-center`}>
                Proyectos
                <ChevronDown
                  size={16}
                  className={`ml-1 transition-transform duration-300 ${projectsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <span className={styles.linkUnderline}></span>
            </div>

            <AnimatePresence>
              {projectsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className={styles.dropdownMenu}
                >
                  <div className="py-2">
                    {projectItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        className={styles.dropdownItem}
                        onClick={() => {
                          closeMenu()
                          enableSmoothScroll()
                        }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.navLinkContainer}>
            <button onClick={() => scrollToSection("contact")} className={styles.navLink}>
              Contacto
            </button>
            <span className={styles.linkUnderline}></span>
          </div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            <button onClick={closeMenu} className="mobile-menu-close" aria-label="Cerrar menú">
              <X size={24} />
            </button>

            <div className="mobile-menu-content">
              <button onClick={() => scrollToSection("works")} className="mobile-menu-link">
                Trabajos
              </button>

              {/* Mobile Projects Dropdown */}
              <div className="flex flex-col items-center w-full max-w-[280px]">
                <button onClick={toggleProjects} className="mobile-menu-link flex items-center justify-center gap-2">
                  <span>Proyectos</span>
                  <ChevronDown
                    size={20}
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
                      className="w-full flex flex-col items-center space-y-4 mt-4"
                    >
                      {projectItems.map((item) => (
                        <Link key={item.name} href={item.path} className="mobile-menu-link" onClick={closeMenu}>
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => scrollToSection("contact")} className="mobile-menu-link">
                Contacto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

