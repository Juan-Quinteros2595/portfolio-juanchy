"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

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

  return (
    <section className="min-h-screen flex flex-col justify-center bg-black text-white p-6 py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-70 z-0"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">01</h2>
          <h3 className="text-2xl md:text-3xl font-medium mt-2">HAPPY CLIENTS :)</h3>
        </motion.div>

        <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            "@Santatuca",
            "@LitvakMatias",
            "@HighBuzz",
            "HouseOfWeed",
            "@bahia420_bb",
            "@tc__tc_",
            "@IBZ420.CLUB",
            "@Dynavap_latinoamerica",
            "@Magic Vaporizers",
            "@Grupocannabb",
            "@thezencolife",
            "@rawlifearg",
            "@LionRolling Circus",
            "@Mascotte.spain",
            "@Tedejoenorsai",
            "@cabboficial",
            "@sponsorsdios",
            "@dowcenterbahia",
            "@ifeelgoodgym",
            "@UNS",
            "@tukijobs",
            "@agenciahumo",
          ].map((client, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
            >
              <p className="text-lg">{client}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

