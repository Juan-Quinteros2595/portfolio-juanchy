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
  console.log("🔍 Analizando estructura del proyecto...")

  try {
    // Configuración específica para Next.js
    const madgeInstance = await madge(".", {
      baseDir: "./",
      includeNpm: false,
      fileExtensions: ["js", "jsx", "ts", "tsx"],
      excludeRegExp: [
        /node_modules/,
        /\.next/,
        /\.git/,
        /\.vscode/,
        /public/,
        /styles/,
        /\.env/,
        /package\.json/,
        /tsconfig\.json/,
        /next\.config\.js/
      ],
      // Incluir directorios específicos de tu proyecto
      entryFiles: ["./app/**/*", "./components/**/*", "./features/**/*", "./utils/**/*"]
    })

    console.log("📊 Generando diagrama SVG...")

    // Configurar el estilo del diagrama
    const svg = await madgeInstance.svg({
      fontSize: "12px",
      backgroundColor: "#ffffff",
      nodeColor: "#333333",
      noDependencyColor: "#666666",
      layout: "dot"
    })

    // Guardar el diagrama
    const outputPath = "./docs/project-diagram.svg"
    writeFileSync(outputPath, svg)

    console.log("\n✅ Análisis completado:")
    
    // Mostrar estadísticas
    const dependencyGraph = madgeInstance.obj()
    const modules = Object.keys(dependencyGraph)
    
    console.log(`\n📁 Total de módulos: ${modules.length}`)
    console.log("\n🔍 Módulos principales:")
    
    // Agrupar módulos por directorio
    const groupedModules = modules.reduce((acc, module) => {
      const directory = module.split('/')[0]
      if (!acc[directory]) acc[directory] = []
      acc[directory].push(module)
      return acc
    }, {})

    // Mostrar módulos agrupados
    Object.entries(groupedModules).forEach(([directory, files]) => {
      console.log(`\n📂 ${directory} (${files.length} archivos)`)
      files.forEach(file => {
        const deps = dependencyGraph[file]
        console.log(`  └─ ${file} (${deps.length} dependencias)`)
      })
    })

    // Verificar dependencias circulares
    const circular = madgeInstance.circular()
    if (circular.length > 0) {
      console.log("\n⚠️ Dependencias circulares detectadas:")
      circular.forEach((path, i) => {
        console.log(`  ${i + 1}. ${path.join(" → ")} → ${path[0]}`)
      })
    } else {
      console.log("\n✅ No se detectaron dependencias circulares")
    }

    console.log(`\n📄 Diagrama guardado en: ${outputPath}`)
    return "Diagrama generado exitosamente"

  } catch (error) {
    console.error("\n❌ Error al generar el diagrama:", error)
    throw error
  }
}

// Ejecutar la función
generateDiagram()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
