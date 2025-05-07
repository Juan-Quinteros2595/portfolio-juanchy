/**
 * Vertex shader for the fluid text effect
 */
export const vertexShader = `
// Shader de vértices simple que pasa las coordenadas UV al fragment shader
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
