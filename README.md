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
   - Carrusel continuo de logos de clientes
   - Diseño responsive que se adapta a diferentes tamaños de pantalla

5. **Portfolio Nav (`components/portfolio-nav.tsx`)**
   - Navegación visual a las diferentes secciones de portfolio
   - Efectos de hover con texto estilizado

6. **Content Creators (`components/content-creators-page.tsx`)**
   - Página dedicada a creadores de contenido
   - Galería de videos organizados por categorías
   - Soporte para videos de YouTube e Instagram Reels
   - Visualización en modal

7. **Ecommerce Photography (`components/ecommerce-photography-story.tsx`)**
   - Experiencia de desplazamiento interactiva para proyectos de fotografía de ecommerce
   - Navegación lateral y animaciones
   - Galería modal para ver imágenes en detalle

8. **Lifestyle Photography (`components/lifestyle-photography-story.tsx`)**
   - Experiencia de desplazamiento interactiva para proyectos de fotografía de estilo de vida
   - Navegación lateral y animaciones
   - Galería modal para ver imágenes en detalle

9. **Event Coverage (`components/event-coverage.tsx`)**
   - Experiencia de desplazamiento interactiva para proyectos de cobertura de eventos
   - Navegación lateral y animaciones
   - Galería modal para ver imágenes en detalle

10. **Gallery Modal (`components/gallery-modal.tsx`)**
    - Componente reutilizable para mostrar galerías de imágenes
    - Dos modos de visualización: carrusel y cuadrícula
    - Controles de navegación y miniaturas

11. **Contact (`components/contact.tsx`)**
    - Sección de contacto con animación de ondas
    - Información de contacto y ubicaciones
    - Logo JNCH con efecto de contorno

### Páginas

1. **Home (`app/page.tsx`)**
   - Página principal que integra los componentes Hero, Works, Portfolio Nav, Happy Clients y Contact

2. **Content Creators (`app/content-creators/page.tsx`)**
   - Página dedicada a mostrar el trabajo con creadores de contenido

3. **Ecommerce Photography (`app/ecommerce_photography/page.tsx`)**
   - Página dedicada a mostrar proyectos de fotografía de ecommerce

4. **Lifestyle Photography (`app/lifestyle_photography/page.tsx`)**
   - Página dedicada a mostrar proyectos de fotografía de estilo de vida

5. **Events (`app/events/page.tsx`)**
   - Página dedicada a mostrar coberturas de eventos

## Tecnologías Utilizadas

- **Next.js 14**: Framework de React para renderizado del lado del servidor y generación de sitios estáticos
- **React 18**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Para tipado estático y mejor desarrollo
- **Framer Motion**: Para animaciones fluidas y transiciones
- **Tailwind CSS**: Para estilos y diseño responsive
- **Lucide React**: Para iconos vectoriales
- **Shadcn/UI**: Componentes de UI reutilizables y accesibles

## Características Destacadas

1. **Experiencia de Desplazamiento Interactiva**
   - Las páginas de proyectos utilizan efectos de scroll para mostrar diferentes proyectos
   - Navegación lateral que indica la posición actual

2. **Galería Modal Avanzada**
   - Visualización de imágenes en modo carrusel o cuadrícula
   - Miniaturas para navegación rápida
   - Controles intuitivos

3. **Diseño Responsive**
   - Adaptación completa a dispositivos móviles, tablets y escritorio
   - Menús y navegación optimizados para cada tamaño de pantalla

4. **Efectos Visuales**
   - Partículas interactivas en la sección Hero
   - Animaciones de ondas en la sección Contact
   - Efectos de hover en elementos interactivos

5. **Organización por Categorías**
   - Contenido organizado por tipos de proyectos
   - Navegación intuitiva entre diferentes secciones

## Cómo Continuar con el Desarrollo

### Mejoras Técnicas

1. **Optimización de Imágenes**
   - Implementar carga progresiva de imágenes
   - Utilizar formatos modernos como WebP
   - Configurar tamaños responsivos para diferentes dispositivos

2. **Rendimiento**
   - Implementar lazy loading para componentes
   - Optimizar las animaciones para dispositivos de gama baja
   - Mejorar el Server-Side Rendering (SSR) para SEO

3. **Funcionalidades Adicionales**
   - Formulario de contacto funcional con validación
   - Filtrado avanzado de proyectos por categoría, año o cliente
   - Sistema de comentarios o testimonios

### Consejos de Branding

1. **Consistencia Visual**
   - Mantener la paleta de colores (negro, blanco, rojo, azul, ámbar) en todos los materiales
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

