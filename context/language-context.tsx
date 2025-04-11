"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Definimos los idiomas disponibles
export type Language = "es" | "en"

// Interfaz para el contexto
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string // Función para traducir textos
}

// Creamos el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traducciones completas para todos los componentes
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.works": "Works",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Proyectos dropdown
    "projects.content": "Content Creators",
    "projects.ecommerce": "Ecommerce Photography",
    "projects.lifestyle": "Lifestyle Photography",
    "projects.events": "Event Coverage",

    // Hero section
    "hero.words": "Design,Animate,Imagine,Illustrate,Refine,Collaborate,Innovate",

    // Works section
    "works.title": "Works.",
    "works.subtitle": "CREATIVE SOLUTIONS FOR BUSINESSES AND CREATORS",
    "works.process.title": "Creative Process",
    "works.process.text1":
      "At JNCH, we approach each project with passion and dedication. Our creative process involves understanding your brand, identifying your target audience, and crafting visual content that resonates with your message.",
    "works.process.text2":
      "We combine technical expertise with artistic vision to deliver exceptional results that help your business stand out in today's competitive market.",
    "works.support.text1":
      "We want you to feel supported every step of the way, ready to listen to your concerns, understand your needs, and work together toward the success of your project.",
    "works.enhance.title": "We work to enhance your business",
    "works.enhance.text1":
      "That is why we establish communication and build trust with our clients, as we believe it is essential to create strong business relationships. We greatly value those who trust our team and respond to that trust with products of exceptional quality.",
    "works.enhance.text2": "At JNCH, we fully understand the challenges involved in investing in a project.",

    // Portfolio section
    "portfolio.title": "MY PORTFOLIO",
    "portfolio.footer": "Designed by JNCH",

    // Happy Clients section
    "clients.number": "01",
    "clients.title": "HAPPY CLIENTS :)",
    "clients.description": "Our clients speak for themselves.",
    "clients.footer":
      "We work with the best brands and content creators, helping them stand out with high-quality photography and video.",

    // Contact section
    "contact.title": "LET'S WORK TOGETHER!",
    "contact.whatsapp": "WhatsApp",
    "contact.email": "E-mail",
    "contact.office": "Head Office",
    "contact.location.argentina": "Argentina, Buenos Aires",
    "contact.location.spain": "Spain, Barcelona",

    // Content Creators page
    "creators.title": "Content Creators",
    "creators.subtitle": "Specialized video content for brands and creators across multiple platforms",
    "creators.all": "All",
    "creators.cannabis": "Cannabis Content",
    "creators.brands": "Brand Collaborations",
    "creators.lifestyle": "Lifestyle",
    "creators.events": "Events",
    "creators.viewAll": "View all images",
    "creators.openInsta": "Open in Instagram",

    // Ecommerce Photography page
    "ecommerce.number": "03",
    "ecommerce.title": "ECOMMERCE PHOTOGRAPHY",
    "ecommerce.subtitle": "FOCUS ON QUALITY AND TRUE PRODUCT REPRESENTATION",
    "ecommerce.year": "Year:",
    "ecommerce.client": "Client Information:",
    "ecommerce.instagram": "Instagram:",
    "ecommerce.viewGallery": "VIEW GALLERY",
    "ecommerce.images": "images",

    // Lifestyle Photography page
    "lifestyle.number": "04",
    "lifestyle.title": "LIFESTYLE AND ADVERTISING PRODUCT PHOTOGRAPHY",
    "lifestyle.subtitle": "FOCUS ON QUALITY AND TRUE PRODUCT REPRESENTATION. USABILITY AND DISPLAY.",

    // Events page
    "events.viewGallery": "VIEW GALLERY",
    "events.images": "images",
  },
  es: {
    // Navbar
    "nav.works": "Trabajos",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    // Proyectos dropdown
    "projects.content": "Creadores de Contenido",
    "projects.ecommerce": "Fotografía Ecommerce",
    "projects.lifestyle": "Fotografía Lifestyle",
    "projects.events": "Cobertura de Eventos",

    // Hero section
    "hero.words": "Diseñar,Animar,Imaginar,Ilustrar,Refinar,Colaborar,Innovar",

    // Works section
    "works.title": "Trabajos.",
    "works.subtitle": "SOLUCIONES CREATIVAS PARA NEGOCIOS Y CREADORES",
    "works.process.title": "Proceso Creativo",
    "works.process.text1":
      "En JNCH, abordamos cada proyecto con pasión y dedicación. Nuestro proceso creativo implica entender tu marca, identificar tu público objetivo y crear contenido visual que resuene con tu mensaje.",
    "works.process.text2":
      "Combinamos experiencia técnica con visión artística para entregar resultados excepcionales que ayudan a tu negocio a destacar en el mercado competitivo actual.",
    "works.support.text1":
      "Queremos que te sientas apoyado en cada paso del camino, listos para escuchar tus inquietudes, entender tus necesidades y trabajar juntos hacia el éxito de tu proyecto.",
    "works.enhance.title": "Trabajamos para mejorar tu negocio",
    "works.enhance.text1":
      "Por eso establecemos comunicación y construimos confianza con nuestros clientes, ya que creemos que es esencial crear relaciones comerciales sólidas. Valoramos enormemente a quienes confían en nuestro equipo y respondemos a esa confianza con productos de calidad excepcional.",
    "works.enhance.text2": "En JNCH, entendemos completamente los desafíos que implica invertir en un proyecto.",

    // Portfolio section
    "portfolio.title": "MI PORTFOLIO",
    "portfolio.footer": "Diseñado por JNCH",

    // Happy Clients section
    "clients.number": "01",
    "clients.title": "CLIENTES FELICES :)",
    "clients.description": "Nuestros clientes hablan por sí solos.",
    "clients.footer":
      "Trabajamos con las mejores marcas y creadores de contenido, ayudándoles a destacar con fotografía y video de alta calidad.",

    // Contact section
    "contact.title": "¡TRABAJEMOS JUNTOS!",
    "contact.whatsapp": "WhatsApp",
    "contact.email": "Correo electrónico",
    "contact.office": "Oficina Principal",
    "contact.location.argentina": "Argentina, Buenos Aires",
    "contact.location.spain": "España, Barcelona",

    // Content Creators page
    "creators.title": "Creadores de Contenido",
    "creators.subtitle": "Contenido de video especializado para marcas y creadores en múltiples plataformas",
    "creators.all": "Todos",
    "creators.cannabis": "Contenido Cannabis",
    "creators.brands": "Colaboraciones con Marcas",
    "creators.lifestyle": "Estilo de Vida",
    "creators.events": "Eventos",
    "creators.viewAll": "Ver todas las imágenes",
    "creators.openInsta": "Abrir en Instagram",

    // Ecommerce Photography page
    "ecommerce.number": "03",
    "ecommerce.title": "FOTOGRAFÍA ECOMMERCE",
    "ecommerce.subtitle": "ENFOQUE EN CALIDAD Y REPRESENTACIÓN REAL DEL PRODUCTO",
    "ecommerce.year": "Año:",
    "ecommerce.client": "Información del Cliente:",
    "ecommerce.instagram": "Instagram:",
    "ecommerce.viewGallery": "VER GALERÍA",
    "ecommerce.images": "imágenes",

    // Lifestyle Photography page
    "lifestyle.number": "04",
    "lifestyle.title": "FOTOGRAFÍA DE PRODUCTOS LIFESTYLE Y PUBLICIDAD",
    "lifestyle.subtitle": "ENFOQUE EN CALIDAD Y REPRESENTACIÓN REAL DEL PRODUCTO. USABILIDAD Y PRESENTACIÓN.",

    // Events page
    "events.viewGallery": "VER GALERÍA",
    "events.images": "imágenes",
  },
}

/**
 * Proveedor del contexto de idioma
 *
 * Gestiona el estado del idioma seleccionado y proporciona
 * funciones para cambiar el idioma y traducir textos.
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado para el idioma actual, por defecto inglés
  const [language, setLanguageState] = useState<Language>("en")

  // Efecto para cargar el idioma guardado en localStorage al iniciar
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Función para cambiar el idioma y guardarlo en localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  // Función para traducir textos según el idioma actual
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

/**
 * Hook personalizado para usar el contexto de idioma
 *
 * Proporciona acceso al idioma actual, la función para cambiarlo
 * y la función para traducir textos.
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
