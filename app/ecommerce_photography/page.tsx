import EcommercePhotographyStory from "@/features/ecommerce-photography/ecommerce-photography-story"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fotografía para Ecommerce | Fotógrafo de Productos | JNCH Portfolio",
  description:
    "Servicios de fotografía profesional para ecommerce y tiendas online en Argentina y España. Especialista en fotografía de productos, catálogos y contenido para marcas.",
  keywords:
    "fotografía ecommerce argentina, fotógrafo productos barcelona, fotografía catálogo, fotografía productos cannabis, fotografía tienda online",
}

export default function EcommercePhotographyPage() {
  return (
    <main className="min-h-screen">
      <EcommercePhotographyStory />
    </main>
  )
}
