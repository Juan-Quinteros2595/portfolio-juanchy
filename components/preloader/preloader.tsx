"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import styles from "./preloader.module.css"
import { motion, AnimatePresence } from "framer-motion"
import { useLoadingAssets } from "./use-loading-assets"
import { usePreloaderTiming } from "./hooks/use-preloader-timing"

// Define shader code inline to avoid import issues
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  // Uniforms - Variables que se pasan desde JavaScript
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uTextColor;
  uniform float uTileCount;
  varying vec2 vUv;

  // Funciones de ruido Simplex 2D - Implementación estándar
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  // Función de ruido Simplex 2D
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
              -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // SDF para la letra J
  float letter_J(vec2 p, float scale) {
    p /= scale;
    float d = 999.0;
    
    // Línea vertical principal
    d = min(d, abs(p.x - 0.0) - 0.1);
    
    // Curva inferior
    if (p.y < -0.3) {
      float r = 0.3;
      vec2 center = vec2(-0.2, -0.3);
      d = min(d, length(p - center) - r);
    }
    
    // Línea horizontal superior
    if (p.y > 0.4) {
      d = min(d, abs(p.y - 0.5) - 0.1);
    }
    
    // Recorte para dar forma a la J
    if (p.y < -0.6 || p.y > 0.6 || p.x < -0.5 || p.x > 0.3) {
      d = 999.0;
    }
    
    return d * scale;
  }

  // SDF para la letra N
  float letter_N(vec2 p, float scale) {
    p /= scale;
    float d = 999.0;
    
    // Línea vertical izquierda
    d = min(d, abs(p.x + 0.4) - 0.1);
    
    // Línea vertical derecha
    d = min(d, abs(p.x - 0.4) - 0.1);
    
    // Línea diagonal
    float diag = (p.x + 0.4) / 0.8; // 0 a 1 de izquierda a derecha
    float yTarget = mix(-0.5, 0.5, diag);
    d = min(d, abs(p.y - yTarget) - 0.1);
    
    // Recorte para dar forma a la N
    if (p.y < -0.6 || p.y > 0.6 || p.x < -0.5 || p.x > 0.5) {
      d = 999.0;
    }
    
    return d * scale;
  }

  // SDF para la letra C
  float letter_C(vec2 p, float scale) {
    p /= scale;
    float d = 999.0;
    
    // Crear un arco para la C usando un círculo con una sección recortada
    float r1 = 0.5; // Radio exterior
    float r2 = 0.3; // Radio interior
    
    // Distancia al anillo circular (diferencia entre círculos)
    float ring = max(length(p) - r1, -(length(p) - r2));
    
    // Recortar el lado derecho para formar la C
    if (p.x > 0.0 && abs(p.y) < 0.35) {
      ring = 999.0; // Eliminar esta parte
    }
    
    d = min(d, ring);
    
    // Recorte adicional para asegurar la forma correcta
    if (p.y < -0.6 || p.y > 0.6 || p.x < -0.6 || p.x > 0.6) {
      d = 999.0;
    }
    
    return d * scale;
  }

  // SDF para la letra H
  float letter_H(vec2 p, float scale) {
    p /= scale;
    float d = 999.0;
    
    // Línea vertical izquierda
    d = min(d, abs(p.x + 0.4) - 0.1);
    
    // Línea vertical derecha
    d = min(d, abs(p.x - 0.4) - 0.1);
    
    // Línea horizontal central
    d = min(d, abs(p.y - 0.0) - 0.1);
    
    // Recorte para dar forma a la H
    if (p.y < -0.6 || p.y > 0.6 || p.x < -0.5 || p.x > 0.5) {
      d = 999.0;
    }
    
    return d * scale;
  }

  // Función para renderizar las letras JNCH juntas
  float renderJNCH(vec2 p) {
    float scale = 0.15;
    float spacing = 0.35;
    
    float d = 999.0;
    
    // Posicionar cada letra con el espaciado adecuado
    d = min(d, letter_J(p - vec2(-spacing * 1.5, 0.0), scale));
    d = min(d, letter_N(p - vec2(-spacing * 0.5, 0.0), scale));
    d = min(d, letter_C(p - vec2(spacing * 0.5, 0.0), scale));
    d = min(d, letter_H(p - vec2(spacing * 1.5, 0.0), scale));
    
    return d;
  }

  // Función para simular dinámica de fluidos básica
  vec2 fluidDynamics(vec2 p, float time) {
    // Velocidad base del fluido - movimiento descendente suave
    vec2 velocity = vec2(0.0, -0.2);
    
    // Añadir turbulencia basada en ruido con frecuencias variadas
    float noise1 = snoise(p * 3.0 + time * 0.15);
    float noise2 = snoise(p * 5.0 - time * 0.25);
    float noise3 = snoise(p * 1.5 + time * 0.1);
    
    // Combinar diferentes capas de ruido para crear un movimiento más complejo
    velocity.x += noise1 * 0.25 + noise3 * 0.15;
    velocity.y += noise2 * 0.15 + noise3 * 0.1;
    
    return velocity;
  }

  void main() {
    // Convertir coordenadas UV a coordenadas de espacio normalizado (-1 a 1)
    vec2 uv = vUv;
    
    // Aplicar tiling horizontal - repetir el patrón uTileCount veces
    vec2 p = (uv * 2.0 - 1.0);
    p.x *= uResolution.x / uResolution.y; // Corregir aspect ratio
    
    // Aplicar tiling - repetir el patrón horizontalmente
    float tileWidth = 2.0 / uTileCount; // Ancho de cada tile en espacio normalizado
    float tileIndex = floor((p.x + 1.0) / tileWidth);
    p.x = mod(p.x + 1.0, tileWidth) * uTileCount - 1.0;
    
    // Tiempo y velocidad para la animación
    float time = uTime * 0.3;
    
    // Calcular la dinámica de fluidos para este punto
    vec2 velocity = fluidDynamics(p, time);
    
    // Advección - mover partículas según el campo de velocidad
    vec2 advectedPos = p - velocity * 0.08;
    
    // Crear múltiples capas de fluido con mayor contraste
    float fluid = 0.0;
    
    // Capa 1: Fluido base - movimiento lento y amplio
    vec2 q = advectedPos;
    q.y -= time * 0.2;
    float n1 = snoise(q * 2.0 + time * 0.1);
    fluid += n1 * 0.6;
    
    // Capa 2: Detalle fino - movimiento más rápido y detallado
    vec2 r = advectedPos;
    r.y -= time * 0.3;
    r.x += time * 0.05;
    float n2 = snoise(r * 4.0 - time * 0.2);
    fluid += n2 * 0.3;
    
    // Capa 3: Movimiento lateral - añade variación horizontal
    vec2 s = advectedPos;
    s.x += time * 0.15;
    s.y -= time * 0.4;
    float n3 = snoise(s * 6.0 + time * 0.3);
    fluid += n3 * 0.2;
    
    // Normalizar el fluido con más contraste
    fluid = fluid * 0.6 + 0.5;
    
    // Renderizar las letras JNCH que flotan en el fluido
    float letters = 0.0;
    
    // Múltiples instancias de letras que siguen el fluido
    for (int i = 0; i < 8; i++) {
      // Distribuir las letras verticalmente y animarlas con el tiempo
      float t = float(i) * 0.35 - time * 1.0;
      
      // Posición base con desplazamiento vertical
      vec2 pos = p;
      pos.y += t;
      
      // Aplicar advección al movimiento de las letras para que sigan el fluido
      vec2 flowOffset = vec2(
        snoise(pos * 1.8 + time * 0.25) * 0.25,
        snoise(pos * 1.8 - time * 0.35) * 0.15
      );
      
      pos += flowOffset;
      
      // Escalar y rotar ligeramente para añadir variedad visual
      float scale = 0.8 + sin(t * 0.25) * 0.25;
      float angle = sin(t * 0.15) * 0.15;
      vec2 rotPos;
      rotPos.x = pos.x * cos(angle) - pos.y * sin(angle);
      rotPos.y = pos.x * sin(angle) + pos.y * cos(angle);
      rotPos *= scale;
      
      // Obtener la máscara de las letras en esta posición
      float letterMask = renderJNCH(rotPos);
      
      // Desvanecimiento basado en la posición vertical
      float fade = smoothstep(1.0, -1.0, abs(pos.y) * 0.9);
      
      // Desvanecimiento adicional basado en la velocidad del fluido
      float flowStrength = length(velocity) * 3.0;
      float flowFade = smoothstep(0.0, 0.6, flowStrength);
      
      // Combinar los desvanecimientos
      float totalFade = fade * (0.4 + flowFade * 0.8);
      
      // Añadir esta instancia de letras al acumulador
      letters += smoothstep(0.01, 0.0, letterMask) * totalFade * 0.25;
    }
    
    // Combinar fluido y letras con mejor contraste
    float fluidLetters = fluid;
    fluidLetters += letters * 1.2;
    fluidLetters = clamp(fluidLetters, 0.0, 1.0);
    
    // Mezcla de colores: fondo del fluido y letras
    vec3 color = mix(uColor1, uColor2, fluid);
    color = mix(color, uTextColor, letters * 2.0);
    
    // Viñeta para oscurecer los bordes
    float vignette = smoothstep(1.0, 0.25, length(p * 0.65));
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`

// Function to get optimized shader parameters based on device
function getOptimizedShaderParams() {
  // Default values for desktop
  const defaultParams = {
    letterCount: 8,
    tileCount: 3.0,
  }

  // Check if window is defined (client-side only)
  if (typeof window === "undefined") {
    return defaultParams
  }

  // Check if device is mobile
  const isMobile = window.innerWidth < 768

  if (isMobile) {
    return {
      letterCount: 5, // Fewer letters on mobile
      tileCount: 2.0, // Fewer tiles on mobile
    }
  }

  return defaultParams
}

// Componente para el plano con shader fluido
function FluidTextPlane() {
  // Referencias para acceder al mesh y al material
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  // Obtener dimensiones del canvas
  const { size } = useThree()

  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false)

  // Get optimized parameters
  const [shaderParams, setShaderParams] = useState(() => getOptimizedShaderParams())

  // Set mounted state on client side
  useEffect(() => {
    setIsMounted(true)

    // Update shader params once we're on the client
    setShaderParams(getOptimizedShaderParams())
  }, [])

  // Crear uniforms para el shader
  const uniforms = useRef({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uColor1: { value: new THREE.Color("#050505") }, // Color original oscuro
    uColor2: { value: new THREE.Color("#252525") }, // Color original gris oscuro
    uTextColor: { value: new THREE.Color("#ffffff") }, // Color blanco para las letras
    uTileCount: { value: shaderParams.tileCount },
  })

  // Actualizar uniforms en cada frame
  useFrame(({ clock }) => {
    if (materialRef.current) {
      // Actualizar tiempo para la animación
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()

      // Actualizar resolución si cambia el tamaño de la ventana
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height)
    }
  })

  // Update uniforms when window resizes - only on client side
  useEffect(() => {
    if (!isMounted) return

    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isMounted])

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  )
}

// Componente para mostrar el porcentaje de carga
function LoadingPercentage({ progress }: { progress: number }) {
  return (
    <div className={styles.percentageText} aria-live="polite">
      {Math.round(progress)}%
    </div>
  )
}

// Componente principal del Preloader
export default function Preloader() {
  // Usamos nuestro hook personalizado para controlar la carga de recursos
  const { isLoaded, loadingProgress } = useLoadingAssets()

  // Use our custom timing hook with 2 second minimum display time
  const { shouldShowPreloader } = usePreloaderTiming({
    minDisplayTime: 2000,
    loadingProgress,
    isAssetsLoaded: isLoaded,
  })

  return (
    <AnimatePresence>
      {shouldShowPreloader && (
        <motion.div
          className={styles.preloader}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            transition: { duration: 1.2, ease: "easeInOut" },
          }}
          aria-label="Cargando sitio web"
          role="progressbar"
          aria-valuenow={Math.round(loadingProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {/* Canvas de Three.js con el efecto fluido */}
          <Canvas
            className={styles.canvas}
            camera={{ position: [0, 0, 1], fov: 50 }}
            dpr={[1, 2]} // Optimización para diferentes densidades de píxeles
          >
            <FluidTextPlane />
          </Canvas>

          {/* Contenedor principal centrado */}
          <div className={styles.contentContainer}>
            {/* Logo JNCH centrado con animación de trazo */}
            <motion.div
              className={styles.logoContainer}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.3, duration: 0.8 },
              }}
              exit={{
                opacity: 0,
                filter: "blur(8px)",
                transition: { duration: 0.8 },
              }}
            >
              <svg className={styles.logo} viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
                {/* J */}
                <path
                  d="M30,20 L30,50 Q30,60 20,60 L10,60"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className={styles.logoPath}
                />

                {/* N */}
                <path
                  d="M50,60 L50,20 L80,60 L80,20"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className={styles.logoPath}
                />

                {/* C - Corregida para que se vea como una C y no como una O */}
                <path
                  d="M130,30 Q120,20 110,20 Q90,20 90,40 Q90,60 110,60 Q120,60 130,50"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className={styles.logoPath}
                />

                {/* H */}
                <path
                  d="M150,20 L150,60 M150,40 L180,40 M180,20 L180,60"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  className={styles.logoPath}
                />
              </svg>
            </motion.div>

            {/* Indicador de progreso de carga mejorado */}
            <motion.div
              className={styles.progressContainer}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5, duration: 0.5 },
              }}
            >
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${loadingProgress}%`,
                    transition: { duration: 0.3 },
                  }}
                />
              </div>
              <LoadingPercentage progress={loadingProgress} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
