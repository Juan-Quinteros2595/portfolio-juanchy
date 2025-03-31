"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import styles from "@/styles/happy-clients.module.css"

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
    <section className={styles.section}>
      <div className={styles.background}></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto relative z-10 px-2 sm:px-0"
      >
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className={styles.title}>01</h2>
          <h3 className={styles.subtitle}>HAPPY CLIENTS :)</h3>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h4 className={styles.description}>Nuestros clientes hablan por sí solos.</h4>
        </motion.div>

        {/* Implementación alternativa del carrusel para mejor compatibilidad móvil */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className={styles.logosContainer}>
            <div className={styles.logosSlide}>
              {clients.map((client, index) => (
                <div key={`logo-${index}`} className={styles.logoItem}>
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
                <div key={`logo-dup-${index}`} className={styles.logoItem}>
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

