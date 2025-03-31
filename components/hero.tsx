"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import styles from "@/styles/hero.module.css"
import ParticleBackground from "./particle-background"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Juanchy Creativity"

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 150) // Ajusta la velocidad de tipado aquí

    return () => clearInterval(typingInterval)
  }, [])

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <>
      <section className={styles.heroSection}>
        <ParticleBackground />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1 className={styles.heroTitle}>
            <span className="inline-block">{typedText}</span>
            <span className={styles.cursorBlink}></span>
          </h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            THE SYNERGY BETWEEN CREATIVITY AND QUALITY
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}>
            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com/juanchy_aguilera"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                @juanchy_aguilera
              </a>
              <a
                href="https://instagram.com/jnch.oficial"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                @jnch.oficial
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.scrollIndicator}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          onClick={scrollToContent}
        >
          <div className="flex flex-col items-center">
            <ChevronDown className="w-8 h-8 animate-bounce" />
          </div>
        </motion.div>
      </section>
    </>
  )
}

