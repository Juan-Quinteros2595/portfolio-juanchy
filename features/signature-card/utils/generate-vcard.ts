export const generateVCardData = () => {
  return `BEGIN:VCARD
VERSION:3.0
FN:Juanchi JNCH
ORG:JNCH.MEDIA
TITLE:Founder & CEO
TEL;TYPE=cell:+34 658 22 26 98
EMAIL:jnch.oficial@gmail.com
URL:https://jnch.media
END:VCARD`
}

export const downloadVCard = () => {
  const vCardData = generateVCardData()
  const blob = new Blob([vCardData], { type: "text/vcard" })
  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = "Juanchi_JNCH.vcf"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
