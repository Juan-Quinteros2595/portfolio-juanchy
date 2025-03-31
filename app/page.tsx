import type { Metadata } from "next"
import Hero from "@/components/hero"
import Works from "@/components/works"
import HappyClients from "@/components/happy-clients"
import Contact from "@/components/contact"
import PortfolioNav from "@/components/portfolio-nav"

export const metadata: Metadata = {
  title: "JNCH Portfolio | Filmmaker y Fotógrafo entre Argentina y España",
  description:
    "Servicios de filmmaking, fotografía de productos y content creation para marcas. Especialista en fotografía lifestyle, ecommerce y cobertura de eventos en Argentina y España.",
  keywords:
    "filmmaker argentina, fotógrafo barcelona, content creator cannabis, fotografía productos, filmmaking eventos, fotografía ecommerce, cobertura eventos",
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="hero">
        <Hero />
      </section>
      <section id="works">
        <Works />
      </section>
      <PortfolioNav />
      <section>
        <HappyClients />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  )
}

