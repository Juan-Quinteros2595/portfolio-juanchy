import LifestylePhotographyStory from "@/components/lifestyle-photography-story"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fotografía Lifestyle | Fotógrafo Profesional | JNCH Portfolio",
  description:
    "Servicios de fotografía lifestyle para marcas y productos en Argentina y España. Especialista en fotografía de estilo de vida para cannabis, vaporizers y accesorios.",
  keywords:
    "fotografía lifestyle argentina, fotógrafo productos barcelona, fotografía cannabis, fotografía lifestyle marcas, fotógrafo profesional",
}

export default function LifestylePhotographyPage() {
  return (
    <main className="min-h-screen">
      <LifestylePhotographyStory />
    </main>
  )
}

