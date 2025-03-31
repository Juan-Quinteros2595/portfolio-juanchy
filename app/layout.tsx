import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Script from "next/script"

export const metadata = {
  title: "Juanchy Creativity | Filmmaker & Fotógrafo Comercial | Argentina-España",
  description:
    "Servicios profesionales de filmmaking, fotografía de productos y content creation para marcas de cannabis y lifestyle entre Argentina y Barcelona.",
  keywords:
    "filmmaker argentina, fotógrafo barcelona, content creator cannabis, fotografía productos, filmmaking eventos, fotografía ecommerce, cobertura eventos",
  openGraph: {
    title: "Juanchy Creativity | Filmmaker & Fotógrafo Comercial",
    description: "Servicios de filmmaking y fotografía comercial entre Argentina y España",
    url: "https://portfolio-juanchy.vercel.app",
    siteName: "Juanchy Creativity",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Juanchy Creativity | Filmmaker & Fotógrafo Comercial",
    description: "Servicios de filmmaking y fotografía comercial entre Argentina y España",
  },
  alternates: {
    canonical: "https://portfolio-juanchy.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-montserrat">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar/>
          {children}
        </ThemeProvider>

        {/* Schema.org markup para SEO */}
        <Script id="schema-professional-service" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Juanchy Creativity - Filmmaker & Fotógrafo",
              "image": "https://portfolio-juanchy.vercel.app/images/logo.jpg",
              "description": "Servicios profesionales de filmmaking y fotografía comercial especializada en cannabis, lifestyle y eventos",
              "address": [
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Barcelona",
                  "addressCountry": "ES"
                },
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Buenos Aires",
                  "addressCountry": "AR"
                }
              ],
              "url": "https://portfolio-juanchy.vercel.app",
              "telephone": "+3465822698",
              "email": "juanchyfilmaker@gmail.com",
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://instagram.com/juanchy_aguilera",
                "https://instagram.com/jnch.oficial"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios de Fotografía y Video",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Fotografía de Productos para Ecommerce",
                      "description": "Fotografía profesional de productos para tiendas online y catálogos"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Filmmaking para Eventos",
                      "description": "Cobertura audiovisual completa de eventos corporativos y culturales"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Content Creation para Marcas",
                      "description": "Creación de contenido visual para redes sociales y marketing digital"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Fotografía Lifestyle",
                      "description": "Fotografía de estilo de vida para marcas y productos en contextos naturales"
                    }
                  }
                ]
              }
            }
          `}
        </Script>

        {/* Schema.org para persona/profesional */}
        <Script id="schema-person" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Juanchy Aguilera",
              "jobTitle": "Filmmaker y Fotógrafo Comercial",
              "worksFor": {
                "@type": "Organization",
                "name": "Juanchy Creativity"
              },
              "knowsAbout": ["Fotografía de Productos", "Filmmaking", "Content Creation", "Fotografía Lifestyle", "Cobertura de Eventos"],
              "workLocation": [
                {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Barcelona",
                    "addressCountry": "España"
                  }
                },
                {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Buenos Aires",
                    "addressCountry": "Argentina"
                  }
                }
              ],
              "sameAs": [
                "https://instagram.com/juanchy_aguilera",
                "https://instagram.com/jnch.oficial"
              ]
            }
          `}
        </Script>
      </body>
    </html>
  )
}



import './globals.css'