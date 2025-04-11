import ContentCreatorsPage from "@/components/content-creators-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Content Creation para Marcas | Creator Profesional | JNCH Portfolio",
  description:
    "Servicios de content creation para marcas y creadores en Argentina y España. Especialista en contenido audiovisual para redes sociales, marketing digital y campañas publicitarias.",
  keywords:
    "content creator argentina, creador contenido barcelona, content creation cannabis, contenido redes sociales, creator profesional, marketing audiovisual",
}

export default function ContentCreatorsRoute() {
  return (
    <main className="min-h-screen">
      <ContentCreatorsPage />
    </main>
  )
}
