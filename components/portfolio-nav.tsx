"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface PortfolioItem {
  title: string
  path: string
  image: string
}

export default function PortfolioNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const portfolioItems: PortfolioItem[] = [
    {
      title: "CONTENT CREATORS",
      path: "/content-creators",
      image: "/images/content-creators.png",
    },
    {
      title: "ECOMMERCE",
      path: "/ecommerce_photography",
      image: "/images/ecommerce.png",
    },
    {
      title: "LIFESTYLE",
      path: "/lifestyle_photography",
      image: "/images/lifestyle.png",
    },
    {
      title: "EVENTS",
      path: "/events",
      image: "/images/events.png",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">MY PORTFOLIO</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {portfolioItems.map((item, index) => (
            <Link href={item.path} key={index} className="block relative overflow-hidden group">
              <div
                className="relative aspect-[3/4] w-full overflow-hidden"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay oscuro al hacer hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

                {/* Título con efecto de contorno */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-transparent text-2xl md:text-3xl font-bold tracking-wider"
                    style={{
                      WebkitTextStroke: "1px #c5ff00",
                      textShadow: "0 0 5px rgba(197, 255, 0, 0.3)",
                    }}
                  >
                    {item.title}
                  </motion.h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">Designed by JNCH</p>
        </div>
      </div>
    </section>
  )
}

