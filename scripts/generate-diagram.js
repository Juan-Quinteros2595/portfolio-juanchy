/**
 * Script para generar un diagrama de dependencias del proyecto
 * Utiliza Madge para analizar las dependencias y genera un archivo SVG
 */

import madge from "madge"
import { writeFileSync } from "fs"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

async function generateDiagram() {
  console.log("Generando diagrama de dependencias del proyecto...")

  try {
    // Instalar Graphviz si es necesario (comentado porque asumimos que ya está instalado)
    // await execAsync('npm install -g graphviz');

    // Crear instancia de Madge para analizar el proyecto
    const madgeInstance = await madge("./app", {
      baseDir: "./",
      includeNpm: false,
      fileExtensions: ["js", "jsx", "ts", "tsx"],
      excludeRegExp: [/node_modules/, /\.next/, /\.git/, /\.vscode/],
    })

    // Generar el diagrama en formato SVG
    const svg = await madgeInstance.svg()

    // Guardar el diagrama en un archivo
    writeFileSync("./public/project-diagram.svg", svg)

    console.log("Diagrama generado con éxito en ./public/project-diagram.svg")
    console.log("Estructura del proyecto:")

    // Mostrar la estructura de dependencias en la consola
    const dependencyGraph = madgeInstance.obj()
    const modules = Object.keys(dependencyGraph)

    console.log("\nMódulos principales:")
    modules.forEach((module) => {
      console.log(`- ${module} (${dependencyGraph[module].length} dependencias)`)
    })

    // Generar estadísticas
    const circularDependencies = madgeInstance.circular()
    console.log(`\nDependencias circulares: ${circularDependencies.length}`)
    if (circularDependencies.length > 0) {
      console.log("Detalles de dependencias circulares:")
      circularDependencies.forEach((deps, i) => {
        console.log(`  ${i + 1}. ${deps.join(" -> ")} -> ${deps[0]}`)
      })
    }

    return "Diagrama generado con éxito"
  } catch (error) {
    console.error("Error al generar el diagrama:", error)
    return `Error: ${error.message}`
  }
}

// Ejecutar la función
generateDiagram()
