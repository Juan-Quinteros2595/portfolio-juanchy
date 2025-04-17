"use client"

import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/features/i18n/language-context"
import { Globe } from "lucide-react"
import styles from "./language-switcher.module.css"
import type { Locale } from "@/config/i18n-config"

/**
 * Componente LanguageSwitcher
 *
 * Muestra un botón para cambiar entre los idiomas disponibles (español e inglés).
 * Utiliza el contexto de idioma para gestionar el cambio.
 */
export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Función para alternar el menú desplegable
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  // Función para cambiar el idioma
  const changeLanguage = (lang: Locale) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={styles.button} aria-label="Change language">
        <Globe size={18} />
        <span className={styles.currentLanguage}>{language.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            onClick={() => changeLanguage("en")}
            className={`${styles.option} ${language === "en" ? styles.active : ""}`}
          >
            EN
          </button>
          <button
            onClick={() => changeLanguage("es")}
            className={`${styles.option} ${language === "es" ? styles.active : ""}`}
          >
            ES
          </button>
        </div>
      )}
    </div>
  )
}
