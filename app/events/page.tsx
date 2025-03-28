import EventCoverage from "@/components/event-coverage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Event Coverage | JNCH Portfolio",
  description: "Explore our event coverage and photography services",
}

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <EventCoverage />
    </main>
  )
}

