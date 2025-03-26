"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState } from "react"

export default function EventCoverage() {
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

  // Update the events array to include Instagram videos and thumbnails
  const events = [
    {
      title: "MASCOTTE - THE LAST SPANNABIS",
      year: "2025",
      client: "@juanchy_aguilera | @Mascotte.official",
      videoId: "dQw4w9WgXcQ",
      isInstagram: false,
      thumbnail: "/placeholder.svg?height=400&width=800",
    },
    {
      title: "LION ROLLING CIRCUS",
      year: "2024",
      client: "@juanchy_aguilera | @Lion Rolling Circus",
      description: "SPANNABIS 2024",
      videoId: "DHb_I87tg1d",
      isInstagram: true,
      thumbnail: "/placeholder.svg?height=400&width=800",
    },
    {
      title: "Cannabis Community Photo & Video Vlog – Coverage in Argentina",
      year: "2024",
      client: "@juanchy_aguilera | @Vorterix Buenos Aires",
      videoId: "dQw4w9WgXcQ",
      isInstagram: false,
      thumbnail: "/placeholder.svg?height=400&width=800",
    },
    {
      title: "SPONSOR DIOS",
      year: "2022",
      client: "@juanchy_aguilera | @Bahía Blanca, Argentina",
      videoId: "CcoTjgKryG4",
      isInstagram: true,
      thumbnail: "/juanchy_ysya.webp?height=400&width=800",
    },
  ]

  return (
    <section className="min-h-screen flex flex-col justify-center bg-black text-white p-6 py-20 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8)_0%,rgba(0,0,0,1)_100%)] z-0"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10 z-0"></div>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">05</h2>
          <h3 className="text-2xl md:text-3xl font-medium mt-2">Audiovisual Coverage for Events</h3>
        </motion.div>

        {events.map((event, index) => (
          <motion.div key={index} variants={containerVariants} className="mb-16 border-t border-gray-800 pt-8">
            <motion.div variants={itemVariants} className="mb-6">
              <h4 className="text-xl font-bold">{event.title}</h4>
              <p className="text-lg">
                <span className="font-medium">Year:</span> {event.year}
              </p>
              <p className="text-lg">
                <span className="font-medium">Client Information:</span> {event.client}
              </p>
              {event.description && <p className="text-lg mt-2">{event.description}</p>}
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 gap-6">
              <motion.div
                variants={itemVariants}
                className="overflow-hidden rounded-lg cursor-pointer relative"
                onClick={() => openVideo(event.videoId, event.isInstagram)}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-20 transition-all">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-16 border-l-black ml-1"></div>
                  </div>
                </div>
                <Image
                  src={event.thumbnail || "/placeholder.svg"}
                  alt={`${event.title} Coverage`}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white text-sm font-medium">
                    {event.isInstagram ? "View Instagram Reel" : "View Video"}
                  </p>
                </div>
              </motion.div>
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

