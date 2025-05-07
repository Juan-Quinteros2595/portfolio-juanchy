"use client"

import { usePathname } from "next/navigation"
import Navbar from "@/features/navigation/navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  const isVipPage = pathname === "/vip"

  // No renderizar nada si estamos en la página VIP
  if (isVipPage) {
    return null
  }

  // Renderizar la navbar en todas las demás páginas
  return <Navbar />
}
