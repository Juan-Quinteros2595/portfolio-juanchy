/**
 * Utility functions for loading and processing shaders
 */

// Import shader code from TypeScript files
import { vertexShader } from "../shader/vertex-shader"
import { fragmentShader } from "../shader/fragment-shader"

/**
 * Returns the shader code from imported shader files
 */
export const getShaders = () => {
  return {
    vertexShader,
    fragmentShader,
  }
}

/**
 * Detects if the device is likely a mobile device with lower GPU capabilities
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false

  // Check for touch capability as a proxy for mobile devices
  const hasTouchScreen =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)

  // Check for mobile user agent
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  return hasTouchScreen || isMobileUserAgent
}

/**
 * Returns optimized shader parameters based on device capabilities
 */
export const getOptimizedShaderParams = () => {
  const isMobile = isMobileDevice()

  return {
    letterCount: isMobile ? 8 : 12, // Fewer floating letters on mobile
    tileCount: isMobile ? 2 : 3, // Fewer tile repetitions on mobile
  }
}
