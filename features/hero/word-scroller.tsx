"use client"

import { useEffect, useRef } from "react"
import styles from "./word-scroller.module.css"

interface WordScrollerProps {
  words?: string[];
  activeIndex: number; // Recibimos el índice activo desde el padre
  onActiveWordChange?: (index: number) => void;
}

export default function WordScroller({ words = [], activeIndex, onActiveWordChange }: WordScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Colores para cada palabra
  const colors = [
    "#e91e63", // Rosa (Design/Diseñar)
    "#ff9800", // Naranja (Animate/Animar)
    "#cddc39", // Lima (Imagine/Imaginar)
    "#00bcd4", // Cian (Illustrate/Ilustrar)
    "#9c27b0", // Púrpura (Refine/Refinar)
    "#3f51b5", // Índigo (Collaborate/Colaborar)
    "#f44336", // Rojo (Innovate/Innovar)
  ]

  const checkCenteredWord = () => {
    if (!scrollContainerRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    wordRefs.current.forEach((wordRef, index) => {
      if (!wordRef) return;

      const wordRect = wordRef.getBoundingClientRect();
      const wordCenter = wordRect.top + wordRect.height / 2;
      const distance = Math.abs(containerCenter - wordCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex && onActiveWordChange) {
      onActiveWordChange(closestIndex); // Notificamos al padre solo si hay un cambio
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    wordRefs.current = wordRefs.current.slice(0, words.length);

    const handleScroll = () => {
      requestAnimationFrame(checkCenteredWord);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [words.length, activeIndex, onActiveWordChange]);

  useEffect(() => {
    const wordRef = wordRefs.current[activeIndex];
    if (wordRef) {
      wordRef.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [activeIndex]); // Centramos la palabra activa cuando cambia el índice

    // Función para dividir el título en letras individuales
    const renderStyledTitle = (text: string) => {
      return text.split("").map((letter, index) => (
        <span key={index} className={styles.letter}>
          {letter}
        </span>
      ))
    }

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.jnchText}>{renderStyledTitle("JNCH")}</h1>
        <div ref={scrollContainerRef} className={styles.scrollContainer} style={{ scrollSnapType: "y mandatory" }}>
          <div className={styles.spacer}></div>
          {words.map((word, index) => (
            <div
              key={index}
              ref={(el) => {
                wordRefs.current[index] = el;
              }}
              className={styles.wordItem}
              style={{
                color: activeIndex === index ? colors[index % colors.length] : "rgba(255, 255, 255, 0.2)",
                opacity: activeIndex === index ? 1 : 0.3,
                transform: activeIndex === index ? "scale(1)" : "scale(0.9)",
                textShadow: activeIndex === index ? "0 0 10px rgba(0, 0, 0, 0.3)" : "none",
                scrollSnapAlign: "center",
              }}
            >
              {word}.
            </div>
          ))}
          <div className={styles.spacer}></div>
        </div>
      </div>
    </div>
  );
}
