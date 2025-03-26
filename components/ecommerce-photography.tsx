"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function EcommercePhotography() {
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

  return (
    <section className="min-h-screen flex flex-col justify-center bg-black text-white p-6 py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-50 z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10 z-0"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">03</h2>
          <h3 className="text-2xl md:text-3xl font-medium mt-2">ECOMMERCE PHOTOGRAPHY</h3>
          <p className="text-xl mt-4">FOCUS ON QUALITY AND TRUE PRODUCT REPRESENTATION</p>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={itemVariants} className="overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Ecommerce Photography"
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=600&width=800"
              alt="Ecommerce Photography"
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="overflow-hidden rounded-lg md:col-span-2">
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="Ecommerce Photography"
              width={1200}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-8">
          <p className="text-lg">
            <span className="font-bold">Year:</span> 2024
          </p>
          <p className="text-lg">
            <span className="font-bold">Client Information:</span> MAGIC VAPORIZERS
          </p>
          <p className="text-lg">
            <span className="font-bold">Instagram:</span> @juanchy_aguilera | @MagicVaporizers
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

