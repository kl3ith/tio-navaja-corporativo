import { CONTACT_URL } from '../config'
import { COURSE_LABEL, COURSE_ORDER } from '../data/packages'
import type { Builder } from '../hooks/usePackageBuilder'

/**
 * Arma el mensaje de cotización con lo que la persona eligió.
 *
 * Lo escribe en primera persona, como si lo redactara quien va a contratar,
 * porque es el texto que sale de su WhatsApp. No menciona precios más allá
 * del paquete ni promete condiciones: eso lo confirma el restaurante.
 */
export function buildQuoteMessage(builder: Builder): string {
  const lines: string[] = ['Hola, Tío Navaja.']

  if (builder.totalChosen === 0) {
    lines.push(
      '',
      `Me interesa el menú corporativo (paquete $${builder.pkg.price} por persona).`,
      '¿Me ayudan con una cotización?',
    )
    return lines.join('\n')
  }

  lines.push(
    '',
    `Armé esta mesa con el paquete $${builder.pkg.price} por persona:`,
  )

  const extras: string[] = []

  for (const course of COURSE_ORDER) {
    const s = builder.status[course]
    if (!s.dishes.length) continue

    const dentro = s.dishes.slice(0, s.allowance)
    const fuera = s.dishes.slice(s.allowance)
    extras.push(...fuera.map((d) => d.name))

    if (!dentro.length) continue

    const titulo = s.allowance === 1 ? COURSE_LABEL[course].one : COURSE_LABEL[course].many
    lines.push('', `${titulo.toUpperCase()}`)
    lines.push(...dentro.map((d) => `• ${d.name}`))
  }

  const faltan = COURSE_ORDER.map((c) => builder.status[c]).filter((s) => s.missing > 0)
  if (faltan.length) {
    const detalle = faltan
      .map((s) => {
        const label = s.missing === 1 ? COURSE_LABEL[s.course].one : COURSE_LABEL[s.course].many
        return `${s.missing} ${label}`
      })
      .join(', ')
    lines.push('', `Me falta elegir: ${detalle}.`)
  }

  if (extras.length) {
    lines.push('', 'Además me gustaría consultar, fuera del paquete:')
    lines.push(...extras.map((name) => `• ${name}`))
  }

  lines.push('', '¿Me ayudan con la cotización?')
  return lines.join('\n')
}

/**
 * Enlaza al canal de contacto llevando el mensaje ya escrito.
 *
 * Sólo sabe prellenar los canales cuyo formato conocemos: WhatsApp y correo.
 * Si CONTACT_URL apunta a otra cosa —un formulario, una landing— se abre tal
 * cual, sin inventarle parámetros que ese destino no entendería. Para esos
 * casos está el botón de copiar el mensaje.
 */
export function quoteHref(message: string): string {
  try {
    const url = new URL(CONTACT_URL)
    const host = url.hostname.toLowerCase()

    // Nada de URLSearchParams aquí: codifica los espacios como "+", y hay
    // clientes de WhatsApp que los muestran tal cual en el mensaje.
    const encoded = encodeURIComponent(message)

    if (host === 'wa.me' || host.endsWith('whatsapp.com')) {
      const sep = url.search ? '&' : '?'
      return `${CONTACT_URL}${sep}text=${encoded}`
    }

    if (url.protocol === 'mailto:') {
      const subject = encodeURIComponent('Cotización · Menú corporativo Tío Navaja')
      return `${CONTACT_URL}?subject=${subject}&body=${encoded}`
    }

    return CONTACT_URL
  } catch {
    return CONTACT_URL
  }
}

/** true cuando el canal configurado admite mensaje prellenado. */
export function contactTakesMessage(): boolean {
  try {
    const url = new URL(CONTACT_URL)
    const host = url.hostname.toLowerCase()
    return host === 'wa.me' || host.endsWith('whatsapp.com') || url.protocol === 'mailto:'
  } catch {
    return false
  }
}
