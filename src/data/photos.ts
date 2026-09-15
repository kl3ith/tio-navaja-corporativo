/**
 * Registro de fotografías reales de los platos.
 * ------------------------------------------------------------------
 * Está vacío a propósito: Tío Navaja no entregó fotografía del menú
 * corporativo, y no se usan imágenes de archivo ni generadas que
 * simulen ser los platos del restaurante.
 *
 * Para activar una foto:
 *   1. Guardar el archivo en `src/assets/photos/` (JPG o WebP, 4:5,
 *      idealmente 1200×1500 px).
 *   2. Importarlo y asociarlo al id del plato (ver `src/data/menu.ts`).
 *
 *   import tartar from '../assets/photos/tartar.jpg'
 *   export const PHOTOS: Record<string, string> = { tartar }
 *
 * La tarjeta y el modal cambian solos de ilustración a fotografía.
 * Vite empaqueta la imagen localmente: sigue sin haber peticiones externas.
 */
export const PHOTOS: Record<string, string> = {}
