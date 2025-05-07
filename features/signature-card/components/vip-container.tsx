"use client"

import { motion } from "framer-motion"
import SignatureCard from "./signature-card"
import styles from "../styles/signature-card.module.css"

export default function VipContainer() {
  return (
    <div className={styles.vipContainer}>
      {/* Fondo con gradiente */}
      <div className={styles.backgroundGradient}></div>

      {/* Cuadrícula según la imagen de referencia */}
      <div className={styles.grid}>
        {Array.from({ length: 12 }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className={styles.gridRow}>
            {Array.from({ length: 12 }).map((_, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className={styles.gridCell}></div>
            ))}
          </div>
        ))}
      </div>

      {/* Tarjeta */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={styles.cardContainer}
      >
        <SignatureCard />
      </motion.div>
    </div>
  )
}
