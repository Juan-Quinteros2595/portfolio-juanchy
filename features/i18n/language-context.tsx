"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Locale } from "@/config/i18n-config"

interface LanguageContextType {
  language: Locale
  setLanguage: (lang: Locale) => void
  dictionary: Record<string, string>
  setDictionary: (dict: Record<string, string>) => void
}

const defaultDictionary: Record<string, string> = {}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  dictionary: defaultDictionary,
  setDictionary: () => {},
})

export const LanguageProvider: React.FC<{
  children: React.ReactNode
  initialDictionary: Record<string, string>
  initialLocale: Locale
}> = ({ children, initialDictionary, initialLocale }) => {
  const [language, setLanguageState] = useState<Locale>(initialLocale)
  const [dictionary, setDictionary] = useState<Record<string, string>>(initialDictionary || defaultDictionary)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Locale
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
      // Cargar el diccionario correspondiente al idioma guardado
      fetch(`/api/dictionary?locale=${savedLanguage}`)
        .then((res) => res.json())
        .then((data) => {
          setDictionary(data)
        })
        .catch((err) => {
          console.error("Error loading dictionary:", err)
        })
    }
  }, [])

  const setLanguage = (lang: Locale) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)

    // Cargar el nuevo diccionario
    fetch(`/api/dictionary?locale=${lang}`)
      .then((res) => res.json())
      .then((data) => {
        setDictionary(data)
      })
      .catch((err) => {
        console.error("Error loading dictionary:", err)
      })
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dictionary, setDictionary }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
