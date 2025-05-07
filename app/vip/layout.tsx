import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"

export const metadata: Metadata = {
  title: "JNCH Media VIP",
  description: "Contacto exclusivo de JNCH Media",
}

export default function VipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={false}
        >
          <div className="overflow-hidden bg-black min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
