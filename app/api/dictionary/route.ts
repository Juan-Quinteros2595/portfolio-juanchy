import { NextResponse } from "next/server"
import { getDictionary } from "@/lib/dictionary"
import { i18n } from "@/config/i18n-config"
import type { Locale } from "@/config/i18n-config"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = (searchParams.get("locale") as Locale) || i18n.defaultLocale

  // Validar que el locale sea válido
  if (!i18n.locales.includes(locale)) {
    return NextResponse.json({ error: `Invalid locale: ${locale}` }, { status: 400 })
  }

  const dictionary = await getDictionary(locale)
  return NextResponse.json(dictionary)
}
