"use client"

import { useEffect, useRef, useState } from "react"

interface LogoCanvasProps {
  width?: number
  height?: number
  className?: string
}

export default function LogoCanvas({ width = 200, height = 60, className = "" }: LogoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Solo renderizar el canvas en el cliente
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.font = "bold 60px Gobold Hollow"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Crear gradiente para el texto
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
    gradient.addColorStop(0, "#ff3333")
    gradient.addColorStop(0.5, "#ff0000")
    gradient.addColorStop(1, "#cc0000")

    // Aplicar el gradiente
    ctx.fillStyle = gradient
    ctx.lineWidth = 2

    // Añadir efecto de brillo
    ctx.shadowColor = "rgba(255, 0, 0, 0.5)"
    ctx.shadowBlur = 10

    // Opcional: añadir un segundo contorno más fino para mejorar la visibilidad
    ctx.lineWidth = 0.5
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    ctx.shadowBlur = 0
    ctx.strokeText("JNCH", canvas.width / 2, canvas.height / 2)
  }, [isMounted, width, height])

  // Renderizar un placeholder en el servidor y el canvas real solo en el cliente
  if (!isMounted) {
    return <div className={className} style={{ width, height, background: "transparent" }} />
  }

  return <canvas ref={canvasRef} width={width} height={height} className={className} />
}
