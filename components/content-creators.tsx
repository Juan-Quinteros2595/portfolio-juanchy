"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useLanguage } from "@/context/language-context"
import Image from "next/image"

export default function ContentCreators() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [videoOpen, setVideoOpen] = useState(false)
  const [currentVideo, setCurrentVideo] = useState("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Update the openVideo function to handle Instagram links
  const openVideo = (videoId: string, isInstagram = false) => {
    if (isInstagram) {
      window.open(`https://www.instagram.com/reel/${videoId}/`, "_blank")
    } else {
      setCurrentVideo(videoId)
      setVideoOpen(true)
    }
  }

  // Update the sample content sections to include Instagram videos and thumbnails
  const contentSections = [
    {
      title: "CANNABIS-RELATED CONTENT",
      subtitle: "CONTENT CREATORS",
      items: [
        {
          name: "@Santatuca",
          videoId: "dhA2XemQxuM",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@Litvak",
          videoId: "DHb_I87tg1d",
          isInstagram: true,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "Matías",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@HighBuzz",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "HouseOfWeed",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@bahia420_bb",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
    {
      title: "CANNABIS-RELATED CONTENT",
      subtitle: "BRANDS AND BUSINESSES",
      items: [
        {
          name: "@Grupocannabb",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@thezencolife",
          videoId: "DHb_I87tg1d",
          isInstagram: true,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@rawlifearg",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@LionRolling Circus",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@Mascotte.spain",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@Tedejoenorsai",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
    {
      title: "CONTENT IN DIFFERENT AREAS",
      subtitle: "WE ADAPT TO YOUR NEEDS",
      items: [
        {
          name: "@cabboficial",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@sponsorsdios",
          videoId: "DHb_I87tg1d",
          isInstagram: true,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@dowcenterbahia",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@ifeelgoodgym",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@UNS",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@tukijobs",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
        {
          name: "@agenciahumo",
          videoId: "dQw4w9WgXcQ",
          isInstagram: false,
          thumbnail: "/placeholder.svg?height=200&width=350",
        },
      ],
    },
  ]

  return (
    <section className="min-h-screen flex flex-col justify-center bg-white text-black p-6 py-20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(249,249,249,0.1)_0%,rgba(249,249,249,0.6)_100%)] z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10 z-0"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">02</h2>
        </motion.div>

        {contentSections.map((section, sectionIndex) => (
          <motion.div key={sectionIndex} variants={containerVariants} className="mb-16">
            <motion.h3 variants={itemVariants} className="text-2xl md:text-3xl font-bold mb-2">
              {section.title}
            </motion.h3>
            <motion.h4 variants={itemVariants} className="text-xl md:text-2xl font-medium mb-8">
              {section.subtitle}
            </motion.h4>

            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => openVideo(item.videoId, item.isInstagram)}
                >
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h5 className="text-lg font-bold">{item.name}</h5>
                  </div>
                  <div className="relative">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={`${item.name} video preview`}
                        width={350}
                        height={200}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-10 transition-all">
                      <div className="w-12 h-12 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                        <div className="w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-12 border-l-black ml-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center bg-gray-50">
                    <p className="text-sm text-blue-600 font-medium">
                      {item.isInstagram ? t("creators.openInsta") : "View Video"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
