
/**
 * Event Coverage Component
 *
 * Este componente actúa como contenedor y punto de entrada para la sección
 * de cobertura de eventos, integrando el componente Story.
 */
"use client"

import EventCoverageStory from "./event-coverage-story"

export default function EventCoverage() {
  return (
    <div className="w-full">
      <EventCoverageStory />
    </div>
  )
}