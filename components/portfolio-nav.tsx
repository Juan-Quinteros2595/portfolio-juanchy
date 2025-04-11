"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/language-context"
import styles from "@/styles/portfolio-nav.module.css"

interface PortfolioItem {
  title: string
  path: string
  image: string
  translationKey: string
}

export default function PortfolioNav() {
  const { t } = useLanguage()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const portfolioItems: PortfolioItem[] = [
    {
      title: t("projects.content"),
      path: "/content-creators",
      image: "/images/content-creators.png",
      translationKey: "projects.content",
    },
    {
      title: t("projects.ecommerce"),
      path: "/ecommerce_photography",
      image: "/images/ecommerce.png",
      translationKey: "projects.ecommerce",
    },
    {
      title: t("projects.lifestyle"),
      path: "/lifestyle_photography",
      image: "/images/lifestyle.png",
      translationKey: "projects.lifestyle",
    },
    {
      title: t("projects.events"),
      path: "/events",
      image: "/images/events.png",
      translationKey: "projects.events",
    },
  ]

  return (
    <section className={styles.section}>
      <div className={styles.portfolioContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t("portfolio.title")}</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.portfolioGrid}>
          {portfolioItems.map((item, index) => (
            <Link href={item.path} key={index} className={styles.portfolioItem}>
              <div
                className={styles.imageContainer}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className={styles.image} />

                {/* Overlay oscuro al hacer hover */}
                <div className={styles.overlay}></div>

                {/* Título con efecto de contorno */}
                <div className={styles.titleContainer}>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={hoveredIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className={`${styles.itemTitle} ${styles.textOutline}`}
                  >
                    {item.title}
                  </motion.h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>{t("portfolio.footer")}</p>
        </div>
      </div>
    </section>
  )
}
