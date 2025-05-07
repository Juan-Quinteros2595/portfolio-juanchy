"use client"

import { useState, useEffect } from "react"

export function useLoadingAssets() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [assetsLoaded, setAssetsLoaded] = useState(0)
  const [totalAssets, setTotalAssets] = useState(1) // Evitar división por cero
  const [simulatedProgress, setSimulatedProgress] = useState(0)

  useEffect(() => {
    // Lista de recursos críticos a precargar
    const criticalAssets = [
      "/videos/CityV2.mp4",
      "/videos/SenderoV3.mp4",
      "/images/lifestyle.png",
      "/images/ecommerce.png",
      "/images/events.png",
      "/images/content-creators.png",
      // Añade más recursos según sea necesario
    ]

    setTotalAssets(criticalAssets.length)

    // Función para precargar una imagen
    const preloadImage = (url: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.src = url
        img.onload = () => {
          setAssetsLoaded((prev) => prev + 1)
          resolve()
        }
        img.onerror = () => {
          // Incluso si hay error, consideramos el recurso como "cargado" para no bloquear
          setAssetsLoaded((prev) => prev + 1)
          resolve()
        }
      })
    }

    // Función para precargar un video
    const preloadVideo = (url: string) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement("video")
        video.src = url
        video.preload = "auto"
        video.oncanplaythrough = () => {
          setAssetsLoaded((prev) => prev + 1)
          resolve()
        }
        video.onerror = () => {
          // Incluso si hay error, consideramos el recurso como "cargado" para no bloquear
          setAssetsLoaded((prev) => prev + 1)
          resolve()
        }
        // Iniciar la carga
        video.load()
      })
    }

    // Precargar todos los recursos
    const preloadAssets = async () => {
      const promises = criticalAssets.map((asset) => {
        if (asset.endsWith(".mp4")) {
          return preloadVideo(asset)
        } else {
          return preloadImage(asset)
        }
      })

      // Timeout de seguridad (10 segundos)
      const timeoutPromise = new Promise<void>((resolve) => {
        setTimeout(() => {
          setIsLoaded(true)
          resolve()
        }, 10000) // 10 segundos máximo de espera
      })

      // Iniciar simulación de progreso para feedback visual
      const simulationInterval = setInterval(() => {
        setSimulatedProgress((prev) => {
          // Calcular el progreso real basado en los recursos cargados
          const realProgress = Math.round((assetsLoaded / totalAssets) * 100)

          // Si el progreso real es mayor, usamos ese
          if (realProgress > prev) return realProgress

          // Si no, incrementamos gradualmente hasta acercarnos al real
          // pero nunca llegamos al 100% hasta que realmente esté todo cargado
          const increment = Math.max(1, Math.floor((realProgress - prev) / 3))
          const nextProgress = Math.min(prev + increment, realProgress === 100 ? 100 : 99)
          return nextProgress
        })
      }, 200)

      // Esperar a que se carguen todos los recursos o se agote el tiempo
      await Promise.race([Promise.all(promises), timeoutPromise])

      // Asegurar que llegamos al 100% cuando todo está cargado
      setSimulatedProgress(100)
      clearInterval(simulationInterval)

      // Marcar como cargado
      setIsLoaded(true)
    }

    preloadAssets()
  }, [])

  // Usar el progreso simulado en lugar del progreso real para una experiencia más suave
  return { isLoaded, loadingProgress: simulatedProgress }
}
