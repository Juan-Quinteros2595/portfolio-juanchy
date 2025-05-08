import type { Metadata } from "next"
import Hero from "@/features/hero/hero"
import Works from "@/features/works/works"
import HappyClientsSlider from "@/features/clients/happy-clients-slider"
import PortfolioNav from "@/features/portfolio/portfolio-nav"
import FormC from "@/features/formulario/"

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
        <HappyClientsSlider />
      </section>
      <section id="contact">
        <FormC />
      </section>
    </main>
  )
}
