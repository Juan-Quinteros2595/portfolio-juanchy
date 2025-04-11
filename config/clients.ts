// Importamos el tipo ClientCardProps desde el componente ClientCard
import type { ClientCardProps } from "@/components/cards/client-card/ClientCard"

/**
 * Array de clientes con sus datos
 *
 * Cada cliente tiene un nombre de usuario, categoría, comentario,
 * avatar y enlace a su perfil o sitio web.
 */
const CLIENTS: ClientCardProps[] = [
  {
    username: "Ibiza 420",
    category: "Cannabis Brand",
    comment: "Fotografía de productos y contenido para redes sociales.",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ibiza.jpg-npiFyTMyF2mq3Y7nO8WmwiZFbSusaz.jpeg",
    link: "https://instagram.com/ibiza420",
  },
  {
    username: "Raw Life Argentina",
    category: "Cannabis Accessories",
    comment: "Fotografía de productos y lifestyle para catálogo y redes sociales.",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raw.jpg-TQJCB1bWlQfAaCPicaRrygBMw1xFZp.jpeg",
    link: "https://instagram.com/rawlifearg",
  },
  // Más clientes...
  {
    username: "Zenco Life",
    category: "Vaporizer Brand",
    comment: "Fotografía de productos y lifestyle para catálogo y redes sociales.",
    avatar: "/placeholder.svg?height=80&width=80&text=ZL",
    link: "https://instagram.com/thezencolife",
  },
]

export default CLIENTS
