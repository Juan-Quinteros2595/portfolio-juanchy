import type { Metadata } from "next"
import Hero from "@/components/hero"
import Works from "@/components/works"
import HappyClients from "@/components/happy-clients"
import ContentCreators from "@/components/content-creators"
import EcommercePhotography from "@/components/ecommerce-photography"
import LifestylePhotography from "@/components/lifestyle-photography"
import EventCoverage from "@/components/event-coverage"
import Contact from "@/components/contact"

export const metadata: Metadata = {
  title: "JNCH Portfolio | The Synergy Between Creativity and Quality",
  description: "Creative solutions for businesses and creators",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="hero">
        <Hero />
      </section>
      <section id="works">
        <Works />
        <HappyClients />
      </section>
      <section id="content-creators">
        <ContentCreators />
      </section>
      <section id="ecommerce-photography">
        <EcommercePhotography />
      </section>
      <section id="lifestyle-photography">
        <LifestylePhotography />
      </section>
      <section id="event-coverage">
        <EventCoverage />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}

