import EcommercePhotographyStory from "@/components/ecommerce-photography-story"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ecommerce Photography | JNCH Portfolio",
  description: "Explore our ecommerce product photography services",
}

export default function EcommercePhotographyPage() {
  return (
    <main className="min-h-screen">
      <EcommercePhotographyStory />
    </main>
  )
}

