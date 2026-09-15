/**
 * Fotografías reales de los platos.
 * ------------------------------------------------------------------
 * Provienen del material que Tío Navaja entregó para el brochure de
 * boquitas: son fotos del propio restaurante, de platos que aparecen
 * igual en el menú corporativo. Se recortan a 4:5 con
 * `assets-src/build-photos.py`.
 *
 * Los platos que todavía no tienen foto se dibujan con la lámina
 * vectorial de la casa (ver `components/DishArt.tsx`). Para sumar una
 * foto nueva basta con dejar el archivo en esta carpeta e importarlo
 * aquí con el id del plato tal como aparece en `menu.ts`.
 *
 * Pendiente: no se usa la foto de canastitas del otro brochure porque
 * muestra la versión con camarón, y el menú corporativo las lleva con
 * pork belly. Hay que pedirle al cliente la foto correcta.
 */
import brownie from '../assets/photos/brownie.webp'
import carimanola from '../assets/photos/carimanola.webp'
import cheesecake from '../assets/photos/cheesecake.webp'
import flan from '../assets/photos/flan.webp'
import mousse from '../assets/photos/mousse.webp'
import tartaletas from '../assets/photos/tartaletas.webp'
import tostadas from '../assets/photos/tostadas.webp'
import tresLeches from '../assets/photos/tres-leches.webp'
import yakitori from '../assets/photos/yakitori.webp'

export const PHOTOS: Record<string, string> = {
  yakitori,
  carimanola,
  tostadas,
  cheesecake,
  mousse,
  brownie,
  'tres-leches': tresLeches,
  tartaletas,
  flan,
}
