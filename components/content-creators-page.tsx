/**
 * Content Creators Page Component
 *
 * Este componente muestra una página dedicada a los creadores de contenido,
 * con una galería de videos organizados por categorías y un reproductor modal.
 */
"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Instagram, Youtube, X } from "lucide-react"
import GalleryModal from "./gallery-modal"

// Definición de tipos
interface VideoItem {
  id: string
  title: string
  creator: string
  platform: "youtube" | "instagram"
  category: string
  thumbnail: string
}

interface GalleryImage {
  src: string
  alt: string
  width: number
  height: number
}

export default function ContentCreatorsPage() {
  // Estados para controlar la interacción
  const [videoOpen, setVideoOpen] = useState(false)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const videoRef = useRef<HTMLIFrameElement>(null)

  // Categorías de videos
  const categories = ["All", "Cannabis Content", "Brand Collaborations", "Lifestyle", "Events"]

  // Datos de videos
  const videos: VideoItem[] = [
    {
      id: "dhA2XemQxuM",
      title: "Cannabis Culture",
      creator: "@Santatuca",
      platform: "youtube",
      category: "Cannabis Content",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "DHb_I87tg1d",
      title: "Product Review",
      creator: "@Litvak",
      platform: "instagram",
      category: "Cannabis Content",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Vaporizer Demo",
      creator: "Matías",
      platform: "youtube",
      category: "Cannabis Content",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "jNQXAC9IVRw",
      title: "Brand Story",
      creator: "@HighBuzz",
      platform: "youtube",
      category: "Brand Collaborations",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "DHb_I87tg1d",
      title: "Product Launch",
      creator: "HouseOfWeed",
      platform: "instagram",
      category: "Brand Collaborations",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Behind the Scenes",
      creator: "@bahia420_bb",
      platform: "youtube",
      category: "Lifestyle",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "jNQXAC9IVRw",
      title: "Event Coverage",
      creator: "@Grupocannabb",
      platform: "youtube",
      category: "Events",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "DHb_I87tg1d",
      title: "Product Showcase",
      creator: "@thezencolife",
      platform: "instagram",
      category: "Brand Collaborations",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Brand Story",
      creator: "@rawlifearg",
      platform: "youtube",
      category: "Brand Collaborations",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "jNQXAC9IVRw",
      title: "Event Highlights",
      creator: "@LionRolling Circus",
      platform: "youtube",
      category: "Events",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "DHb_I87tg1d",
      title: "Product Demo",
      creator: "@Mascotte.spain",
      platform: "instagram",
      category: "Cannabis Content",
      thumbnail: "/images/content-creators.png",
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Lifestyle Content",
      creator: "@Tedejoenorsai",
      platform: "youtube",
      category: "Lifestyle",
      thumbnail: "/images/content-creators.png",
    },
  ]

  /**
   * Abre el modal de video con el video seleccionado
   */
  const openVideo = (video: VideoItem) => {
    setCurrentVideo(video)
    setVideoOpen(true)
  }

  /**
   * Cierra el modal de video y pausa la reproducción
   */
  const closeVideo = () => {
    setVideoOpen(false)
    // Pausa el video al cerrar el modal
    if (videoRef.current && videoRef.current.src) {
      videoRef.current.src = videoRef.current.src
    }
  }

  /**
   * Abre la galería modal con las imágenes de la categoría seleccionada
   */
  const openGallery = (category: string) => {
    // Crear imágenes de galería basadas en la categoría
    const filteredVideos = category === "All" ? videos : videos.filter((video) => video.category === category)

    const images = filteredVideos.map((video) => ({
      src: video.thumbnail,
      alt: `${video.title} - ${video.creator}`,
      width: 1200,
      height: 800,
    }))

    setGalleryImages(images)
    setGalleryOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image src="/images/content-creators.png" alt="Content Creators" fill className="object-cover" />
        <div className="relative z-20 max-w-6xl mx-auto h-full flex flex-col justify-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Content Creators
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl"
          >
            Specialized video content for brands and creators across multiple platforms
          </motion.p>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Tabs defaultValue="All" className="w-full">
          {/* Navegación por pestañas */}
          <div className="mb-8 overflow-x-auto pb-2">
            <TabsList className="bg-gray-800/50 p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Botón para ver todas las imágenes */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => openGallery(categories[0])}
              className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Ver todas las imágenes
            </button>
          </div>

          {/* Pestaña "All videos" */}
          <TabsContent value="All" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <VideoCard key={index} video={video} onClick={() => openVideo(video)} />
              ))}
            </div>
          </TabsContent>

          {/* Pestañas por categoría */}
          {categories.slice(1).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos
                  .filter((video) => video.category === category)
                  .map((video, index) => (
                    <VideoCard key={index} video={video} onClick={() => openVideo(video)} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modal de video */}
      <Dialog open={videoOpen} onOpenChange={closeVideo}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-gray-800">
          <div className="relative">
            <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-black/80 p-2 text-white hover:bg-black">
              <X size={20} />
            </DialogClose>

            <div className="aspect-video w-full">
              {currentVideo?.platform === "youtube" ? (
                <iframe
                  ref={videoRef}
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-900">
                  <div className="text-center p-8">
                    <Instagram size={48} className="mx-auto mb-4 text-pink-500" />
                    <p className="text-lg mb-4">Instagram Reel</p>
                    <a
                      href={`https://www.instagram.com/reel/${currentVideo?.id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                    >
                      Open in Instagram
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-900">
              <h3 className="text-xl font-bold">{currentVideo?.title}</h3>
              <p className="text-gray-400">{currentVideo?.creator}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Galería Modal */}
      <GalleryModal images={galleryImages} open={galleryOpen} onOpenChange={setGalleryOpen} />
    </div>
  )
}

/**
 * Componente de tarjeta de video
 * Muestra una miniatura del video con información y efectos de hover
 */
function VideoCard({
  video,
  onClick,
}: {
  video: VideoItem
  onClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-gray-700/20 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay con icono de plataforma */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            {video.platform === "youtube" ? (
              <Youtube size={28} className="text-red-500" />
            ) : (
              <Instagram size={28} className="text-pink-500" />
            )}
          </div>
        </div>

        {/* Badge de plataforma */}
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
            video.platform === "youtube" ? "bg-red-600" : "bg-gradient-to-r from-purple-600 to-pink-500"
          }`}
        >
          {video.platform === "youtube" ? (
            <>
              <Youtube size={12} />
              <span>YouTube</span>
            </>
          ) : (
            <>
              <Instagram size={12} />
              <span>Instagram</span>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg group-hover:text-gray-300 transition-colors">{video.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{video.creator}</p>
      </div>
    </motion.div>
  )
}

