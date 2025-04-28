import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/features/i18n/language-context"
import { getDictionary } from "@/lib/dictionary"
import { i18n } from "@/config/i18n-config"
import Navbar from "@/features/navigation/navbar"
import Script from "next/script"
import RecaptchaProvider from "@/components/recaptcha-provider"

export const metadata = {
  title: "Juanchy Creativity | Filmmaker & Photographer | Argentina-Spain",
  description:
    "Professional filmmaking, product photography and content creation services for cannabis and lifestyle brands between Argentina and Barcelona.",
  keywords:
    "filmmaker argentina, photographer barcelona, content creator cannabis, product photography, event filmmaking, ecommerce photography, event coverage",
  openGraph: {
    title: "Juanchy Creativity | Filmmaker & Photographer",
    description: "Filmmaking and commercial photography services between Argentina and Spain",
    url: "https://portfolio-juanchy.vercel.app",
    siteName: "Juanchy Creativity",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Juanchy Creativity | Filmmaker & Photographer",
    description: "Filmmaking and commercial photography services between Argentina and Spain",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Obtener el diccionario para el idioma por defecto
  const dictionary = await getDictionary(i18n.defaultLocale)

  return (
    <html lang="en" suppressHydrationWarning>
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
      <body className="font-argentum">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {/* Envolvemos la aplicación con el LanguageProvider y le pasamos el diccionario inicial */}
          <LanguageProvider initialDictionary={dictionary} initialLocale={i18n.defaultLocale}>
            <RecaptchaProvider>
              <Navbar />
              {children}
            </RecaptchaProvider>
          </LanguageProvider>
        </ThemeProvider>

        {/* Schema.org markup para SEO */}
        <Script id="schema-professional-service" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Juanchy Creativity - Filmmaker & Photographer",
              "image": "https://portfolio-juanchy.vercel.app/images/logo.jpg",
              "description": "Professional filmmaking and commercial photography services specialized in cannabis, lifestyle and events",
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
                "name": "Photography and Video Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Product Photography for Ecommerce",
                      "description": "Professional product photography for online stores and catalogs"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Event Filmmaking",
                      "description": "Complete audiovisual coverage of corporate and cultural events"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Content Creation for Brands",
                      "description": "Visual content creation for social media and digital marketing"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Lifestyle Photography",
                      "description": "Lifestyle photography for brands and products in natural contexts"
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
              "jobTitle": "Filmmaker and Commercial Photographer",
              "worksFor": {
                "@type": "Organization",
                "name": "Juanchy Creativity"
              },
              "knowsAbout": ["Product Photography", "Filmmaking", "Content Creation", "Lifestyle Photography", "Event Coverage"],
              "workLocation": [
                {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Barcelona",
                    "addressCountry": "Spain"
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