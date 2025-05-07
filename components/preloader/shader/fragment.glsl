// Uniforms - Variables que se pasan desde JavaScript
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uTextColor;
uniform float uTileCount;
varying vec2 vUv;

// Optimized Simplex noise functions
// Faster implementation that reduces computational overhead
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

// Optimized Simplex 2D noise function
float snoise(vec2 v) {
  // Precomputed constants to reduce calculations
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

// SDF para la letra C - Corregida para que se vea como una C y no como una O
float letter_C(vec2 p, float scale) {
  p /= scale;
  float d = 999.0;
  
  // Crear un arco para la C usando un círculo con una sección recortada
  float r1 = 0.5; // Radio exterior
  float r2 = 0.3; // Radio interior
  
  // Distancia al anillo circular (diferencia entre círculos)
  float ring = max(length(p) - r1, -(length(p) - r2));
  
  // Recortar el lado derecho para formar la C
  // Usamos una función más precisa para recortar solo el lado derecho
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

// Función para simular dinámica de fluidos básica (optimizada)
vec2 fluidDynamics(vec2 p, float time) {
  // Velocidad base del fluido - movimiento descendente suave
  vec2 velocity = vec2(0.0, -0.2);
  
  // Optimized: Precalculate common time factors
  float timeFactorA = time * 0.15;
  float timeFactorB = time * 0.25;
  float timeFactorC = time * 0.1;
  
  // Añadir turbulencia basada en ruido con frecuencias variadas
  float noise1 = snoise(p * 3.0 + vec2(timeFactorA));
  float noise2 = snoise(p * 5.0 - vec2(timeFactorB));
  float noise3 = snoise(p * 1.5 + vec2(timeFactorC));
  
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
  
  // Calcular la dinámica de fluidos para este punto (optimizada)
  vec2 velocity = fluidDynamics(p, time);
  
  // Advección - mover partículas según el campo de velocidad
  vec2 advectedPos = p - velocity * 0.08;
  
  // Crear múltiples capas de fluido con mayor contraste
  float fluid = 0.0;
  
  // Optimized: Precalculate time offsets
  float timeOffset1 = time * 0.2;
  float timeOffset2 = time * 0.3;
  float timeOffset3 = time * 0.4;
  
  // Capa 1: Fluido base - movimiento lento y amplio
  vec2 q = advectedPos;
  q.y -= timeOffset1;
  float n1 = snoise(q * 2.0 + vec2(time * 0.1));
  fluid += n1 * 0.6;
  
  // Capa 2: Detalle fino - movimiento más rápido y detallado
  vec2 r = advectedPos;
  r.y -= timeOffset2;
  r.x += time * 0.05;
  float n2 = snoise(r * 4.0 - vec2(time * 0.2));
  fluid += n2 * 0.3;
  
  // Capa 3: Movimiento lateral - añade variación horizontal
  vec2 s = advectedPos;
  s.x += time * 0.15;
  s.y -= timeOffset3;
  float n3 = snoise(s * 6.0 + vec2(time * 0.3));
  fluid += n3 * 0.2;
  
  // Normalizar el fluido con más contraste
  fluid = fluid * 0.6 + 0.5;
  
  // Renderizar las letras JNCH que flotan en el fluido
  float letters = 0.0;
  
  // Optimized: Use a smaller loop count on mobile devices
  // This is detected in JavaScript and passed as a uniform
  int letterCount = 12;
  
  // Múltiples instancias de letras que siguen el fluido
  for (int i = 0; i < 12; i++) {
    if (i >= letterCount) break; // Early exit for mobile optimization
    
    // Distribuir las letras verticalmente y animarlas con el tiempo
    float t = float(i) * 0.35 - time * 1.0;
    
    // Posición base con desplazamiento vertical
    vec2 pos = p;
    pos.y += t;
    
    // Aplicar advección al movimiento de las letras para que sigan el fluido
    vec2 flowOffset = vec2(
      snoise(pos * 1.8 + vec2(time * 0.25)) * 0.25,
      snoise(pos * 1.8 - vec2(time * 0.35)) * 0.15
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
