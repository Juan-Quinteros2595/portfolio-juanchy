import LifestylePhotographyStory from "@/components/lifestyle-photography-story"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lifestyle Photography | JNCH Portfolio",
  description: "Explore our lifestyle and advertising product photography services",
}

export default function LifestylePhotographyPage() {
  return (
    <main className="min-h-screen">
      <LifestylePhotographyStory />
    </main>
  )
}

