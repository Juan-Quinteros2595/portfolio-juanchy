"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/context/language-context"
import styles from "@/styles/works.module.css"

export default function Works() {
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
          {t("works.title")}
        </motion.h2>
        <motion.p variants={itemVariants} className={styles.subtitle}>
          {t("works.subtitle")}
        </motion.p>

        <motion.div variants={containerVariants} className={styles.contentRow}>
          <motion.div variants={itemVariants} className={styles.imageContainer}>
            <div className="overflow-hidden rounded-lg">
              <Image src="/images/lifestyle.png" alt="JNCH Working" width={800} height={600} className={styles.image} />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className={styles.textContainer}>
            <h3 className={styles.sectionTitle}>{t("works.process.title")}</h3>
            <p className={styles.text}>{t("works.process.text1")}</p>
            <p className={styles.text}>{t("works.process.text2")}</p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.centeredText}>
          <p className={styles.text}>{t("works.support.text1")}</p>
          <h3 className={styles.sectionTitle}>{t("works.enhance.title")}</h3>
          <p className={styles.text}>{t("works.enhance.text1")}</p>
          <p className={styles.text}>{t("works.enhance.text2")}</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
