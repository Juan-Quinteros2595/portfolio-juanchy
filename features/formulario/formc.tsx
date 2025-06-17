"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { motion } from "framer-motion"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import styles from "./formc.module.css"

// Importar componentes
import { DisintegrateText } from "./DisintegrateText"
import type { FormData, SubmitStatus, ValidationErrors } from "@/types/form"
import { fetchWithTimeout } from "@/utils/fetch"

interface Wave {
  amplitude: number
  period: number
  phase: number
  color: string
  lineWidth: number
  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number): void
}

export default function FormC() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contactCanvasRef = useRef<HTMLCanvasElement>(null)
  const waveCanvasRef = useRef<HTMLCanvasElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    idea: "",
  })

  // Estados para manejar el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    success: undefined,
    message: undefined,
  })

  // Estado para manejar la disponibilidad de reCAPTCHA
  const [recaptchaAvailable, setRecaptchaAvailable] = useState(false)

  // Estado para manejar errores de validación
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    name: "",
    email: "",
    idea: "",
  })

  // Estado para rastrear campos tocados
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    idea: false,
  })

  // Hook de reCAPTCHA
  const { executeRecaptcha } = useGoogleReCaptcha()

  // Verificar disponibilidad de reCAPTCHA
  useEffect(() => {
    const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (executeRecaptcha && recaptchaKey) {
      console.log("✅ reCAPTCHA configurado correctamente")
      setRecaptchaAvailable(true)
    }
  }, [executeRecaptcha])

  // Función para validar un campo específico
  const validateField = (field: keyof ValidationErrors, value: string) => {
    let error = ""

    switch (field) {
      case "name":
        if (!value.trim()) {
          error = "El nombre es requerido"
        } else if (value.trim().length < 2) {
          error = "El nombre debe tener al menos 2 caracteres"
        }
        break
      case "email":
        if (!value.trim()) {
          error = "El email es requerido"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Por favor ingresa un email válido"
        }
        break
      case "idea":
        if (!value.trim()) {
          error = "Por favor cuéntanos sobre tu proyecto"
        } else if (value.trim().length < 10) {
          error = "Por favor proporciona más detalles (mínimo 10 caracteres)"
        }
        break
    }

    setValidationErrors((prev) => ({
      ...prev,
      [field]: error,
    }))

    return error === ""
  }

  // Validación en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Validar solo si el campo ya fue tocado
    if (touchedFields[name as keyof ValidationErrors]) {
      validateField(name as keyof ValidationErrors, value)
    }
  }

  // Marcar un campo como tocado y validar
  const handleBlur = (field: keyof ValidationErrors) => {
    setTouchedFields((prev) => ({
      ...prev,
      [field]: true,
    }))
    validateField(field, formData[field] as string)
  }

  // Verificar si el formulario es válido
  const isFormValid = () => {
    return (
      !validationErrors.name &&
      !validationErrors.email &&
      !validationErrors.idea &&
      formData.name.trim() &&
      formData.email.trim() &&
      formData.idea.trim()
    )
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = 300
      canvas.height = 150
    }

    setCanvasSize()

    // Usar fuentes del sistema
    ctx.font = 'bold 80px "Gobold Hollow"'
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.strokeText("JNCH", 40, 100)

    ctx.shadowColor = "#ff0000"
    ctx.shadowBlur = 20
    ctx.strokeStyle = "#ff0000"
    ctx.strokeText("JNCH", 40, 100)

    // Contact Us canvas
    const contactCanvas = contactCanvasRef.current
    if (!contactCanvas) return

    const contactCtx = contactCanvas.getContext("2d")
    if (!contactCtx) return

    contactCanvas.width = 300
    contactCanvas.height = 80

    // Usar fuentes del sistema
    contactCtx.font = 'bold 40px "Gobold Hollow"'
    contactCtx.strokeStyle = "#666666"
    contactCtx.lineWidth = 1
    contactCtx.strokeText("CONTACT US", 25, 50)

    contactCtx.shadowColor = "#999999"
    contactCtx.shadowBlur = 15
    contactCtx.strokeStyle = "#888888"
    contactCtx.strokeText("CONTACT US", 25, 50)

    const waveCanvas = waveCanvasRef.current
    if (!waveCanvas) return

    const waveCtx = waveCanvas.getContext("2d")
    if (!waveCtx) return

    const setWaveCanvasSize = () => {
      waveCanvas.width = window.innerWidth
      waveCanvas.height = window.innerHeight
    }

    setWaveCanvasSize()
    window.addEventListener("resize", setWaveCanvasSize)

    let time = 0
    const waveCount = Math.min(5, Math.max(2, Math.floor(window.innerWidth / 300)))
    const waves: Wave[] = []

    class WaveClass implements Wave {
      constructor(
        public amplitude: number,
        public period: number,
        public phase: number,
        public color: string,
        public lineWidth: number,
      ) {}

      draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) {
        ctx.beginPath()
        ctx.lineWidth = this.lineWidth
        ctx.strokeStyle = this.color

        const height = canvas.height
        const width = canvas.width

        ctx.moveTo(0, height / 2)

        const step = window.innerWidth < 768 ? 10 : 5
        for (let x = 0; x < width; x += step) {
          const y = height / 2 + Math.sin(x / this.period + time + this.phase) * this.amplitude
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      }
    }

    for (let i = 0; i < waveCount; i++) {
      const amplitude = Math.random() * 50 + 30
      const period = Math.random() * 200 + 100
      const phase = Math.random() * Math.PI * 2
      const opacity = Math.random() * 0.3 + 0.1
      const lineWidth = Math.random() * 1.5 + 0.5

      waves.push(new WaveClass(amplitude, period, phase, `rgba(255, 0, 0, ${opacity})`, lineWidth))
    }

    let animationFrameId: number

    function animate() {
      if (!waveCtx || !waveCanvas) return
      waveCtx.clearRect(0, 0, waveCanvas.width, waveCanvas.height)

      time += 0.01

      for (const wave of waves) {
        wave.draw(waveCtx, waveCanvas, time)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setWaveCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // Función para enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado, estableciendo isSubmitting a true")

    // Marcar todos los campos como tocados para mostrar errores
    setTouchedFields({
      name: true,
      email: true,
      idea: true,
    })

    // Validar todos los campos
    const nameValid = validateField("name", formData.name)
    const emailValid = validateField("email", formData.email)
    const ideaValid = validateField("idea", formData.idea)

    // Si hay errores, no enviar el formulario
    if (!nameValid || !emailValid || !ideaValid) {
      setSubmitStatus({
        success: false,
        message: "Por favor corrige los errores antes de enviar el formulario",
      })
      return
    }

    // Iniciar envío
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      // Añadir un retraso artificial para probar la animación (quitar en producción)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      let recaptchaToken = null

      if (recaptchaAvailable && executeRecaptcha) {
        try {
          recaptchaToken = await executeRecaptcha("contact_form")
          if (!recaptchaToken) {
            throw new Error("Error en la verificación de reCAPTCHA")
          }
        } catch (error) {
          console.error("Error al ejecutar reCAPTCHA:", error)
          throw new Error("Error en la verificación de seguridad. Por favor, inténtalo de nuevo.")
        }
      }

      // Enviar datos del formulario junto con el token de reCAPTCHA
      const response = await fetchWithTimeout("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          bypassRecaptcha: !recaptchaToken,
        }),
      })

      let data
      try {
        const contentType = response.headers.get("Content-Type")
        if (contentType && contentType.includes("application/json")) {
          data = await response.json()
        } else {
          throw new Error("Unexpected response format")
        }
      } catch (error) {
        throw new Error("Failed to parse server response")
      }

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje")
      }

      // Éxito
      setSubmitStatus({
        success: true,
        message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      })
      setFormData({ name: "", email: "", phone: "", idea: "" })
      // Resetear campos tocados y errores
      setTouchedFields({
        name: false,
        email: false,
        idea: false,
      })
      setValidationErrors({
        name: "",
        email: "",
        idea: "",
      })
    } catch (error: any) {
      console.error("Error sending message:", error)
      setSubmitStatus({
        success: false,
        message: error.message || "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
      })
    } finally {
      console.log("Finalizando envío, estableciendo isSubmitting a false")
      setIsSubmitting(false)
    }
  }

  return (
    <section className={styles.section} id="contact">
      <canvas ref={waveCanvasRef} className={styles.waveCanvas} />

      {/* Mostrar advertencia si reCAPTCHA no está disponible */}
      {!recaptchaAvailable && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-100 text-yellow-800 p-2 text-center text-sm z-50">
          Advertencia: La protección reCAPTCHA no está disponible. El formulario funcionará, pero con menor protección
          contra spam.
        </div>
      )}

      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.logoContainer}
        >
          <canvas ref={canvasRef} className="w-[300px] h-[150px] font-gobold" />
        </motion.div>

        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <canvas ref={contactCanvasRef} className="w-[300px] h-[80px] font-samsungsans" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={styles.formGroup}
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                placeholder="NAME"
                className={`${styles.input} ${touchedFields.name && validationErrors.name ? styles.inputError : ""}`}
                required
                disabled={isSubmitting}
              />
              {touchedFields.name && validationErrors.name && (
                <div className={styles.errorMessage}>{validationErrors.name}</div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={styles.formGroup}
            >
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                placeholder="EMAIL"
                className={`${styles.input} ${touchedFields.email && validationErrors.email ? styles.inputError : ""}`}
                required
                disabled={isSubmitting}
              />
              {touchedFields.email && validationErrors.email && (
                <div className={styles.errorMessage}>{validationErrors.email}</div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.formGroup}
            >
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="PHONE"
                className={styles.input}
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={styles.formDivider}
            >
              {/* Componente de texto con desintegración - altura reducida */}
              <div className="mb-4 mt-4 h-16 relative w-full flex justify-center items-center">
                <DisintegrateText />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className={styles.formGroup}
            >
              <textarea
                name="idea"
                value={formData.idea}
                onChange={handleChange}
                onBlur={() => handleBlur("idea")}
                placeholder="TELL US ABOUT YOUR PROJECT"
                rows={3}
                className={`${styles.input} ${styles.textarea} ${
                  touchedFields.idea && validationErrors.idea ? styles.inputError : ""
                }`}
                required
                disabled={isSubmitting}
              />
              {touchedFields.idea && validationErrors.idea && (
                <div className={styles.errorMessage}>{validationErrors.idea}</div>
              )}
            </motion.div>

            {/* Mostrar mensaje de éxito o error */}
            {submitStatus.message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-md text-center ${
                  submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {submitStatus.message}
              </motion.div>
            )}

            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`${styles["animated-border-button"]} ${styles.submitButton}`}
              disabled={isSubmitting}
            >
              <div className={styles["button-background"]} />

              {isSubmitting ? (
                <div className={styles.progressBarContainer}>
                  <div className={styles.progressBar}></div>
                </div>
              ) : (
                <>
                  <span>SEND MESSAGE</span>
                  <Send size={18} />
                </>
              )}
            </motion.button>

            {/* Nota de protección reCAPTCHA */}
            <div className="text-xs text-center text-gray-500 mt-4">
              Este sitio está protegido por reCAPTCHA y aplican la{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Política de Privacidad
              </a>{" "}
              y los{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Términos de Servicio
              </a>{" "}
              de Google.
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
