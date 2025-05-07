"use client"

import { useState, useEffect } from "react"

interface PreloaderTimingProps {
  minDisplayTime: number
  loadingProgress: number
  isAssetsLoaded: boolean
}

export function usePreloaderTiming({ minDisplayTime, loadingProgress, isAssetsLoaded }: PreloaderTimingProps) {
  const [startTime] = useState<number>(() => {
    // Use Date.now() only on the client side
    return typeof window !== "undefined" ? Date.now() : 0
  })
  const [shouldShowPreloader, setShouldShowPreloader] = useState<boolean>(true)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts (client-side only)
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Only run this effect on the client side
    if (!isClient) return

    // If assets are loaded, check if minimum display time has passed
    if (isAssetsLoaded) {
      const currentTime = Date.now()
      const elapsedTime = currentTime - startTime

      if (elapsedTime >= minDisplayTime) {
        // If minimum time has passed, hide preloader immediately
        setShouldShowPreloader(false)
      } else {
        // Otherwise, set a timeout to hide after the remaining time
        const remainingTime = minDisplayTime - elapsedTime
        const timer = setTimeout(() => {
          setShouldShowPreloader(false)
        }, remainingTime)

        return () => clearTimeout(timer)
      }
    }
  }, [isAssetsLoaded, minDisplayTime, startTime, isClient])

  return { shouldShowPreloader }
}
