# JNCH Portfolio Website

Este proyecto es un sitio web de portfolio para JNCH (Juanchy Creativity), un estudio creativo especializado en fotografía, video y contenido para marcas y creadores.

## Estructura del Proyecto

El sitio web está construido con Next.js y utiliza React para crear una experiencia interactiva y moderna. A continuación se detalla la estructura y funcionalidad de cada componente:

### Componentes Principales

1. **Hero (`components/hero.tsx`)**
   - Sección principal con animación de tipado para "Juanchy Creativity"
   - Fondo con partículas interactivas
   - Flecha animada para indicar scroll

2. **Navbar (`components/navbar.tsx`)**
   - Barra de navegación fija con efecto de transparencia
   - Menú desplegable para la sección "Proyectos"
   - Versión responsive para dispositivos móviles

3. **Works (`components/works.tsx`)**
   - Presentación de los servicios ofrecidos
   - Animaciones de entrada al hacer scroll

4. **Happy Clients (`components/happy-clients.tsx`)**
   - Muestra de clientes satisfechos
   - Diseño en grid para mostrar múltiples clientes
   - Fondo oscuro para contraste con el resto de secciones

5. **Content Creators (`components/content-creators.tsx`)**
   - Galería de videos para creadores de contenido
   - Previsualizaciones de videos con miniaturas
   - Soporte para videos de YouTube e Instagram Reels

6. **Ecommerce Photography (`components/ecommerce-photography.tsx`)**
   - Muestra de fotografía de productos para ecommerce
   - Galería de imágenes con efectos de hover

7. **Lifestyle Photography (`components/lifestyle-photography.tsx`)**
   - Proyectos de fotografía de estilo de vida
   - Organizado por proyectos con información detallada

8. **Event Coverage (`components/event-coverage.tsx`)**
   - Cobertura audiovisual de eventos
   - Reproductor de video integrado

9. **Contact (`components/contact.tsx`)**
   - Sección de contacto con animación de ondas
   - Información de contacto y ubicaciones

## Tecnologías Utilizadas

- **Next.js**: Framework de React para renderizado del lado del servidor
- **React**: Biblioteca para construir interfaces de usuario
- **Framer Motion**: Para animaciones fluidas
- **Tailwind CSS**: Para estilos y diseño responsive
- **TypeScript**: Para tipado estático y mejor desarrollo

## Cómo Continuar con el Desarrollo

### Mejoras Técnicas

1. **Optimización de Imágenes**
   - Implementar carga progresiva de imágenes
   - Utilizar formatos modernos como WebP
   - Configurar tamaños responsivos para diferentes dispositivos

2. **Rendimiento**
   - Implementar lazy loading para componentes
   - Optimizar las animaciones para dispositivos de gama baja
   - Añadir Server-Side Rendering (SSR) para mejorar SEO

3. **Funcionalidades Adicionales**
   - Formulario de contacto funcional
   - Filtrado de proyectos por categoría
   - Galería de imágenes con lightbox

### Consejos de Branding

1. **Consistencia Visual**
   - Mantener la paleta de colores (negro, blanco, rojo) en todos los materiales
   - Usar siempre la misma tipografía (Montserrat)
   - Mantener el estilo minimalista y elegante

2. **Contenido**
   - Actualizar regularmente con nuevos proyectos
   - Incluir testimonios de clientes
   - Añadir casos de estudio detallados

3. **Presencia en Redes Sociales**
   - Vincular todas las redes sociales
   - Mantener coherencia entre el sitio web y las redes
   - Compartir el mismo tipo de contenido visual

4. **Expansión de Marca**
   - Considerar crear un blog con consejos de fotografía y video
   - Desarrollar un kit de prensa descargable
   - Crear plantillas de presentación para propuestas a clientes

## Mantenimiento

Para mantener el sitio actualizado:

1. Actualizar regularmente las imágenes y videos de muestra
2. Revisar y actualizar la lista de clientes
3. Mantener las dependencias de Next.js y otras bibliotecas actualizadas
4. Realizar pruebas periódicas en diferentes dispositivos y navegadores

## Despliegue

El sitio está optimizado para ser desplegado en Vercel, que ofrece:
- Despliegue automático desde GitHub
- Previews de cada commit
- Análisis de rendimiento
- Certificados SSL automáticos

Para desplegar en Vercel:
1. Conectar el repositorio de GitHub
2. Configurar variables de entorno si es necesario
3. Seleccionar la rama principal para producción

---

Este README proporciona una visión general del proyecto y sirve como guía para futuros desarrolladores que trabajen en el sitio. Para cualquier pregunta adicional, contactar a través de los canales proporcionados en la sección de contacto del sitio.

