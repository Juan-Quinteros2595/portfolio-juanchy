// Definición de tipos
export interface ContentImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ContentItem {
  id: string
  title: string
  year: string
  client: string
  description: string
  image: string
  gallery: ContentImage[]
}

export interface Section {
  id: string
  title: string
  items: ContentItem[]
}

export interface NavigationItem {
  id: string
  label: string
  section: string
}

// Datos de las secciones
export const sections: Section[] = [
  {
    id: "events",
    title: "EVENTOS",
    items: [
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
          { src: "/images/events.png", alt: "Mascotte Event 6", width: 1200, height: 800 },
        ],
      },
      {
        id: "lion",
        title: "LION ROLLING CIRCUS",
        year: "2024",
        client: "@juanchy_aguilera | @Lion Rolling Circus",
        description:
          "SPANNABIS 2024 - Documentación visual completa del stand de Lion Rolling Circus, mostrando productos y la interacción con los asistentes.",
        image: "/images/lion-rolling-circus.webp",
        gallery: [
          {
            src: "/images/lion-rolling-circus.webp",
            alt: "Lion Rolling Circus - JNCH Filmmaking",
            width: 1200,
            height: 1200,
          },
          { src: "/images/lion-rolling-circus.webp", alt: "Lion Event 2", width: 1200, height: 800 },
          { src: "/images/lion-rolling-circus.webp", alt: "Lion Event 3", width: 1200, height: 800 },
          { src: "/images/lion-rolling-circus.webp", alt: "Lion Event 4", width: 1200, height: 800 },
        ],
      },
      {
        id: "cannabis",
        title: "CANNABIS COMMUNITY PHOTO COVERAGE",
        year: "2024",
        client: "@juanchy_aguilera | @Vorterix Buenos Aires",
        description:
          "Reportaje fotográfico de la comunidad cannábica en Argentina, capturando la cultura y los eventos más importantes del año.",
        image: "/images/events.png",
        gallery: [
          { src: "/images/events.png", alt: "Cannabis Community 1", width: 1200, height: 800 },
          { src: "/images/events.png", alt: "Cannabis Community 2", width: 1200, height: 800 },
          { src: "/images/events.png", alt: "Cannabis Community 3", width: 1200, height: 800 },
          { src: "/images/events.png", alt: "Cannabis Community 4", width: 1200, height: 800 },
          { src: "/images/events.png", alt: "Cannabis Community 5", width: 1200, height: 800 },
        ],
      },
    ],
  },
  {
    id: "E-commerce",
    title: "ECOMMERCE PHOTOGRAPHY",
    items: [
      {
        id: "magic-vaporizers",
        title: "MAGIC VAPORIZERS",
        year: "2024",
        client: "@juanchy_aguilera | @MagicVaporizers",
        description:
          "Sesión de fotografía de producto para Magic Vaporizers, capturando la esencia y calidad de sus vaporizadores premium.",
        image: "/images/ecommerce.png",
        gallery: [
          { src: "/images/ecommerce.png", alt: "Magic Vaporizers 1", width: 1200, height: 800 },
          { src: "/images/ecommerce.png", alt: "Magic Vaporizers 2", width: 1200, height: 800 },
          { src: "/images/ecommerce.png", alt: "Magic Vaporizers 3", width: 1200, height: 800 },
          { src: "/images/ecommerce.png", alt: "Magic Vaporizers 4", width: 1200, height: 800 },
        ],
      },
      {
        id: "zenco-life",
        title: "ZENCO LIFE VAPORIZER",
        year: "2023",
        client: "@gonzaloangueira | @zencolife",
        description:
          "Fotografía de producto para Zenco Life, destacando el diseño innovador y la funcionalidad de sus vaporizadores.",
        image: "/images/ecommerce.png",
        gallery: [
          { src: "/images/ecommerce.png", alt: "Zenco Life 1", width: 1200, height: 800 },
          { src: "/images/ecommerce.png", alt: "Zenco Life 2", width: 1200, height: 800 },
          { src: "/images/ecommerce.png", alt: "Zenco Life 3", width: 1200, height: 800 },
        ],
      },
    ],
  },
  {
    id: "LifeStyle",
    title: "LIFESTYLE PHOTOGRAPHY",
    items: [
      {
        id: "rawlife-argentina",
        title: "RAWLIFE ARGENTINA",
        year: "2023-2025",
        client: "@juanchy_aguilera | @rawlifearg",
        description:
          "Fotografía lifestyle para redes sociales de Raw Life Argentina, capturando el estilo de vida cannábico moderno.",
        image: "/images/lifestyle.png",
        gallery: [
          { src: "/images/lifestyle.png", alt: "Raw Life 1", width: 1200, height: 800 },
          { src: "/images/lifestyle.png", alt: "Raw Life 2", width: 1200, height: 800 },
          { src: "/images/lifestyle.png", alt: "Raw Life 3", width: 1200, height: 800 },
          { src: "/images/lifestyle.png", alt: "Raw Life 4", width: 1200, height: 800 },
          { src: "/images/lifestyle.png", alt: "Raw Life 5", width: 1200, height: 800 },
        ],
      },
      {
        id: "dynavap-collection",
        title: "DYNAVAP COLLECTION",
        year: "2023",
        client: "@gonzaloangueira | @dynavap",
        description:
          "Sesión lifestyle para DynaVap, mostrando sus productos en contextos de uso real y estilo de vida.",
        image: "/images/lifestyle.png",
        gallery: [
          { src: "/images/lifestyle.png", alt: "DynaVap 1", width: 1200, height: 800 },
          { src: "/images/lifestyle.png", alt: "DynaVap 2", width: 1200, height: 800 },
          { src: "/images/lifestyle.png", alt: "DynaVap 3", width: 1200, height: 800 },
        ],
      },
    ],
  },
]

// Navegación lateral
export const navigationItems: NavigationItem[] = [
  { id: "events", label: "EVENTOS", section: "eventos" },
  { id: "ecommerce", label: "COMERCIO", section: "comercio" },
  { id: "lifestyle", label: "LIFESTYLE", section: "lifestyle" },
]
