import type React from "react"
import Image from "next/image"
import Link from "next/link"
import styles from "./ClientCard.module.css"

// Definición de la interfaz para las propiedades del componente
export interface ClientCardProps {
  username: string // Nombre de usuario o nombre del cliente
  category: string // Categoría o tipo de cliente
  comment: string // Comentario o descripción del trabajo realizado
  avatar: string // URL de la imagen de avatar
  link: string // Enlace al perfil o sitio web del cliente
}

/**
 * Componente ClientCard
 *
 * Muestra una tarjeta con información de un cliente, incluyendo su avatar,
 * nombre de usuario, categoría y un comentario. La tarjeta es clickeable
 * y redirige al enlace proporcionado.
 */
export const ClientCard: React.FC<ClientCardProps> = ({ username, category, comment, avatar, link }) => {
  return (
    <Link href={link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
      <div className={styles.card}>
        {/* Contenedor de la imagen de avatar */}
        <div className={styles.avatarContainer}>
          <Image
            src={avatar || "/placeholder.svg"} // Usa una imagen de placeholder si no hay avatar
            alt={`${username}'s Avatar`}
            width={80}
            height={80}
            className={styles.avatar}
          />
        </div>

        {/* Contenedor de la información del cliente */}
        <div className={styles.data}>
          {/* Encabezado con el nombre de usuario */}
          <div className={styles.header}>
            <span className={styles.username}>{username}</span>
          </div>
          {/* Categoría del cliente */}
          <span className={styles.category}>{category}</span>
          {/* Comentario o descripción */}
          <span className={styles.comment}>{comment}</span>
        </div>
      </div>
    </Link>
  )
}
