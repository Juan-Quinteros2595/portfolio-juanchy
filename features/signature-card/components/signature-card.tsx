"use client"

import { motion } from "framer-motion"
import { Download, ArrowRight, Mail, Phone, Globe, Instagram} from "lucide-react"
import styles from "../styles/signature-card.module.css"
import Image from "next/image"
import { useEffect, useState } from 'react'

export default function SignatureCard() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <header className={styles.header}>
        <div className={styles.profileImageContainer}>
            <Image
              src="/jnchprofile.png?height=100&width=100"
              alt="Profile picture"
              width={100}
              height={100}
              className={styles.profileImage}
              priority
            />
          </div>
          <h2 className={styles.title}>Founder & CEO</h2>
        </header>

        <div className={styles.divider}></div>

        <div className={styles.contactInfo}>
          <a href="mailto:jnch.oficial@gmail.com" className={styles.contactItem}>
            <Mail className={styles.icon} size={18} />
            <span>jnch.oficial@gmail.com</span>
          </a>
          <a href="tel:+51999123456" className={styles.contactItem}>
            <Phone className={styles.icon} size={18} />
            <span>+51 999 123 456</span>
          </a>
          <a href="https://jnch.media" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
            <Globe className={styles.icon} size={18} />
            <span>jnch.media</span>
          </a>
          <a href="https://instagram.com/jnch.oficial" className={styles.contactItem}>
            <Instagram className={styles.icon} size={18} />
            <span>Instagram</span>
          </a>
        </div>

        <div className={styles.actions}>
          <a href="/contact.vcf" download className={styles.downloadButton}>
            <Download size={18} />
            <span>Add Contact</span>
          </a>
          <a href="/" className={styles.ctaButton}>
            <span>Ver trabajos</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowRight size={18} />
            </motion.div>
          </a>
        </div>
      </div>
      <div className={styles.cardGlow}></div>
    </div>
  )
}
