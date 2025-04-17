import EventCoverage from "@/features/events/event-coverage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cobertura de Eventos | Filmmaker Profesional | JNCH Portfolio",
  description:
    "Servicios de cobertura audiovisual para eventos en Argentina y España. Fotografía y video profesional para eventos corporativos, culturales y de la industria del cannabis.",
  keywords:
    "cobertura eventos argentina, filmmaker eventos barcelona, fotografía eventos cannabis, video eventos corporativos, cobertura audiovisual",
}

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <EventCoverage />
    </main>
  )
}
