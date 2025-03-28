"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Works() {
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
    <section className="min-h-screen flex flex-col justify-center bg-white text-black p-4 sm:p-6 py-16 sm:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white opacity-50 z-0"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-4xl mx-auto relative z-10 px-2 sm:px-0"
      >
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8">
          Works.
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl font-medium mb-8 sm:mb-12">
          CREATIVE SOLUTIONS FOR
          <br />
          BUSINESSES AND CREATORS
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="flex flex-col md:flex-row gap-8 my-12 border-t-2 border-black pt-8"
        >
          <motion.div variants={itemVariants} className="md:w-1/2">
            <div className="overflow-hidden rounded-lg">
              <Image
                src="/images/lifestyle.png"
                alt="JNCH Working"
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="md:w-1/2 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">Creative Process</h3>
            <p className="text-base sm:text-lg mb-4">
              At JNCH, we approach each project with passion and dedication. Our creative process involves understanding
              your brand, identifying your target audience, and crafting visual content that resonates with your
              message.
            </p>
            <p className="text-base sm:text-lg">
              We combine technical expertise with artistic vision to deliver exceptional results that help your business
              stand out in today's competitive market.
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 sm:mt-16 text-center">
          <p className="text-base sm:text-lg">
            We want you to feel supported every step of the way, ready to listen to your concerns, understand your
            needs, and work together toward the success of your project.
          </p>
          <h3 className="text-xl sm:text-2xl font-bold my-4 sm:my-6">We work to enhance your business</h3>
          <p className="text-base sm:text-lg">
            That is why we establish communication and build trust with our clients, as we believe it is essential to
            create strong business relationships. We greatly value those who trust our team and respond to that trust
            with products of exceptional quality.
          </p>
          <p className="text-base sm:text-lg mt-4">
            At JNCH, we fully understand the challenges involved in investing in a project.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

