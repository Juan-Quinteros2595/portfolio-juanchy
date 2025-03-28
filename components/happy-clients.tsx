"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

export default function HappyClients() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Datos de los clientes con sus logos
  const clients = [
    {
      name: "Ibiza 420",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ibiza.jpg-npiFyTMyF2mq3Y7nO8WmwiZFbSusaz.jpeg",
    },
    {
      name: "Raw Life Argentina",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raw.jpg-TQJCB1bWlQfAaCPicaRrygBMw1xFZp.jpeg",
    },
    {
      name: "Santatuca",
      logo: "/placeholder.svg?height=80&width=160&text=SANTATUCA",
    },
    {
      name: "LitvakMatias",
      logo: "/placeholder.svg?height=80&width=160&text=LITVAK",
    },
    {
      name: "HighBuzz",
      logo: "/placeholder.svg?height=80&width=160&text=HIGHBUZZ",
    },
    {
      name: "HouseOfWeed",
      logo: "/placeholder.svg?height=80&width=160&text=HOUSE+OF+WEED",
    },
    {
      name: "bahia420_bb",
      logo: "/placeholder.svg?height=80&width=160&text=BAHIA+420",
    },
    {
      name: "Dynavap",
      logo: "/placeholder.svg?height=80&width=160&text=DYNAVAP",
    },
    {
      name: "Magic Vaporizers",
      logo: "/placeholder.svg?height=80&width=160&text=MAGIC+VAPORIZERS",
    },
    {
      name: "Grupocannabb",
      logo: "/placeholder.svg?height=80&width=160&text=GRUPO+CANNABB",
    },
    {
      name: "Zenco Life",
      logo: "/placeholder.svg?height=80&width=160&text=ZENCO+LIFE",
    },
  ]

  return (
    <section className="min-h-screen flex flex-col justify-center bg-black text-white p-4 sm:p-6 py-16 sm:py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-70 z-0"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto relative z-10 px-2 sm:px-0"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold">01</h2>
          <h3 className="text-2xl md:text-3xl font-medium mt-2">HAPPY CLIENTS :)</h3>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h4 className="text-xl md:text-2xl font-medium">Nuestros clientes hablan por sí solos.</h4>
        </motion.div>

        {/* Implementación alternativa del carrusel para mejor compatibilidad móvil */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="logos-container">
            <div className="logos-slide">
              {clients.map((client, index) => (
                <div key={`logo-${index}`} className="logo-item">
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
              {/* Duplicar los primeros logos para crear un efecto continuo */}
              {clients.slice(0, 5).map((client, index) => (
                <div key={`logo-dup-${index}`} className="logo-item">
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-lg">
            Trabajamos con las mejores marcas y creadores de contenido, ayudándoles a destacar con fotografía y video de
            alta calidad.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

