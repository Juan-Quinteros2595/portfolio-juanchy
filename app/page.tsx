import type { Metadata } from "next"
import Hero from "@/components/hero"
import Works from "@/components/works"
import HappyClients from "@/components/happy-clients"
import Contact from "@/components/contact"
import PortfolioNav from "@/components/portfolio-nav"

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

