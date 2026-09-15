/**
 * Configuración de contacto.
 * ------------------------------------------------------------------
 * CONTACT_URL es la única variable que hay que tocar para cambiar
 * a dónde va el botón "SOLICITAR COTIZACIÓN".
 *
 * Datos tomados de la ficha oficial de Tío Navaja (no inventados):
 *   WhatsApp / reservas: 6360-8156
 *   Ubicación: Calle Arturo Motta, El Cangrejo — frente a la Cabeza de Einstein
 *   Horario: Lunes a Sábado, 4:00 p.m. – 12:00 a.m.
 *
 * Si se quiere apuntar a un formulario, un correo o una landing,
 * basta con reemplazar CONTACT_URL por esa dirección.
 */
export const CONTACT_URL = 'https://wa.me/50763608156'

/** Etiqueta legible del canal de contacto (se muestra en el pie). */
export const CONTACT_LABEL = 'WhatsApp 6360-8156'

/** Datos de pie de página. */
export const VENUE = {
  name: 'Tío Navaja',
  address: 'Calle Arturo Motta, El Cangrejo — frente a la Cabeza de Einstein',
  city: 'Ciudad de Panamá',
  hours: 'Lunes a Sábado · 4:00 p.m. – 12:00 a.m.',
  site: 'tionavaja.com',
  siteUrl: 'https://tionavaja.com',
} as const
