"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/features/i18n/language-context"
import ContentCarousel from "./components/content-carousel"
import { sections, navigationItems } from "./data/sections"
import styles from "./event-coverage.module.css"

export default function EventCoverage() {
  const { dictionary } = useLanguage()
  const [activeSection, setActiveSection] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Efecto para manejar el scroll y actualizar la sección activa
  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0", 10)
            setActiveSection(index)
          }
        })
      },
      {
        root: null,
        threshold: 0.3,
      },
    )

    const sectionElements = sectionRef.current.querySelectorAll(".content-section")
    sectionElements.forEach((section) => observer.observe(section))

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section))
    }
  }, [sections.length])

  // Función para desplazarse a una sección específica
  const scrollToSection = (index: number) => {
    const sectionElements = sectionRef.current?.querySelectorAll(".content-section")
    if (sectionElements && sectionElements[index]) {
      const targetSection = sectionElements[index] as HTMLElement
      const offset = targetSection.offsetTop

      window.scrollTo({
        top: offset,
        behavior: "smooth",
      })
    }
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Fondo decorativo */}
      <div className={styles.eventBackground}></div>

      {/* Navegación vertical con subrayado */}
      <div className={styles.eventNavigation}>
        <div className={styles.navigationContainer}>
          {navigationItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(index)}
              className={`${styles.navigationButton} ${activeSection === index ? styles.activeNavButton : ""}`}
              data-section={item.section}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor para cada sección con carousel */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={`content-section ${styles.contentSection}`}
          id={section.id}
          data-index={index}
          data-section={navigationItems[index]?.section}
        >
          <ContentCarousel items={section.items} title={section.title} isActive={activeSection === index} />
        </div>
      ))}

      {/* Indicador de navegación móvil */}
      <div className={styles.mobileNavigation}>
        <div className={styles.mobileIndicators}>
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`${styles.mobileIndicator} ${activeSection === index ? styles.activeMobileIndicator : ""}`}
              data-section={navigationItems[index]?.section}
              aria-label={`Ver sección ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
