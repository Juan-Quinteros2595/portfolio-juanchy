"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import styles from "@/styles/works.module.css"

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
    <section className={styles.section}>
      <div className={styles.background}></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className={styles.worksContainer}
      >
        <motion.h2 variants={itemVariants} className={styles.title}>
          Works.
        </motion.h2>
        <motion.p variants={itemVariants} className={styles.subtitle}>
          CREATIVE SOLUTIONS FOR
          <br />
          BUSINESSES AND CREATORS
        </motion.p>

        <motion.div variants={containerVariants} className={styles.contentRow}>
          <motion.div variants={itemVariants} className={styles.imageContainer}>
            <div className="overflow-hidden rounded-lg">
              <Image src="/images/lifestyle.png" alt="JNCH Working" width={800} height={600} className={styles.image} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.textContainer}>
            <h3 className={styles.sectionTitle}>Creative Process</h3>
            <p className={styles.text}>
              At JNCH, we approach each project with passion and dedication. Our creative process involves understanding
              your brand, identifying your target audience, and crafting visual content that resonates with your
              message.
            </p>
            <p className={styles.text}>
              We combine technical expertise with artistic vision to deliver exceptional results that help your business
              stand out in today's competitive market.
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.centeredText}>
          <p className={styles.text}>
            We want you to feel supported every step of the way, ready to listen to your concerns, understand your
            needs, and work together toward the success of your project.
          </p>
          <h3 className={styles.sectionTitle}>We work to enhance your business</h3>
          <p className={styles.text}>
            That is why we establish communication and build trust with our clients, as we believe it is essential to
            create strong business relationships. We greatly value those who trust our team and respond to that trust
            with products of exceptional quality.
          </p>
          <p className={styles.text}>At JNCH, we fully understand the challenges involved in investing in a project.</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

