"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/language-context"

export default function LifestylePhotography() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const projects = [
    {
      title: "MAGIC VAPORIZERS",
      year: "2024 - 2025",
      client: "@juanchy_aguilera | @MagicVaporizers",
    },
    {
      title: "ZENCO LIFE VAPORIZER",
      year: "2023",
      client: "@gonzaloangueira | @zencolife",
    },
    {
      title: "DynaVap",
      year: "2023",
      client: "@gonzaloangueira | @dynavap",
    },
    {
      title: 'THE "B" + SLINGSTASH',
      year: "2023",
      client: "@gonzaloangueira | @dynavap",
    },
    {
      title: "RAWLIFE ARGENTINA",
      year: "2023-2025",
      client: "@juanchy_aguilera | @rawlifearg",
      description: "LIFESTYLE PHOTOGRAPHY FOR SOCIAL MEDIA",
    },
  ]

  return (
    <section className="min-h-screen flex flex-col justify-center bg-white text-black p-6 py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-70 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10 z-0"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">{t("lifestyle.number")}</h2>
          <h3 className="text-2xl md:text-3xl font-medium mt-2">{t("lifestyle.title")}</h3>
          <p className="text-xl mt-4">{t("lifestyle.subtitle")}</p>
        </motion.div>

        {projects.map((project, index) => (
          <motion.div key={index} variants={containerVariants} className="mb-16 border-t pt-8">
            <motion.div variants={itemVariants} className="mb-6">
              <h4 className="text-xl font-bold">{project.title}</h4>
              <p className="text-lg">
                <span className="font-medium">{t("ecommerce.year")}</span> {project.year}
              </p>
              <p className="text-lg">
                <span className="font-medium">{t("ecommerce.client")}</span> {project.client}
              </p>
              {project.description && <p className="text-lg mt-2">{project.description}</p>}
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt={`${project.title} Photography`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt={`${project.title} Photography`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
