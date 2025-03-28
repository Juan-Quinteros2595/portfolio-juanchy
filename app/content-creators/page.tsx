import ContentCreatorsPage from "@/components/content-creators-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Content Creators | JNCH Portfolio",
  description: "Explore our content creation services for brands and creators",
}

export default function ContentCreatorsRoute() {
  return (
    <main className="min-h-screen">
      <ContentCreatorsPage />
    </main>
  )
}

