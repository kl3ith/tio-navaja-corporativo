# Tío Navaja · Menú Corporativo

Brochure digital interactivo para vender paquetes gastronómicos corporativos
de **Tío Navaja** (gastrobar, El Cangrejo, Ciudad de Panamá).

No es un PDF maquetado ni un menú digital: el visitante elige un paquete,
explora la carta y ve armarse la mesa que va a contratar.

---

## Cómo se usa

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción a dist/
npm run preview  # sirve el build
npm run lint
```

## Qué hay que tocar

### El contacto

Una sola variable, en [`src/config.ts`](src/config.ts):

```ts
export const CONTACT_URL = 'https://wa.me/50763608156'
```

Es a donde van los botones **Cotizar** y **Solicitar cotización**. Se puede
apuntar a un formulario, un correo o una landing sin tocar nada más.
En el mismo archivo están la dirección y el horario del pie de página.

### Los platos y los paquetes

- [`src/data/menu.ts`](src/data/menu.ts) — los 30 platos, con su tiempo
  (entrada / fuerte / acompañamiento / postre), su sección y su ilustración.
- [`src/data/packages.ts`](src/data/packages.ts) — los paquetes $45 y $55 y
  cuántas opciones incluye cada uno por tiempo.

Cambiar un paquete es cambiar un número: el selector, los contadores, la
bandeja y los avisos de "fuera del paquete" se recalculan solos.

### Las fotografías

Nueve platos van con **fotografía real de Tío Navaja**, tomada del material
que el cliente entregó para el brochure de boquitas: yakitori, carimañola,
tostadas y los seis postres. Los archivos viven en `src/assets/photos/`,
recortados a 4:5 con `assets-src/build-photos.py` (las fuentes salen de la
carpeta `assets-src` del proyecto **tio-navaja-boquitas**, y los originales del
cliente están en `~/Desktop/TN_Brochures/Boquitas`; no se versionan aquí para
no inflar el repo). Si el script no las encuentra, se le pasa la ruta:
`TN_BOQUITAS_SRC=/ruta/a/assets-src python3 assets-src/build-photos.py`.

Los otros 21 platos todavía no tienen foto. En lugar de usar imágenes de
archivo que no son los platos del restaurante, cada uno lleva una lámina
vectorial de la casa: fondo del color de su tiempo, recortes superpuestos,
numeración editorial y un trazo del plato.

Para sumar una foto nueva:

1. Guardar el archivo en `src/assets/photos/` — 4:5, 800×1000 px basta.
2. Importarlo en [`src/data/photos.ts`](src/data/photos.ts) con el `id` del
   plato tal como aparece en `menu.ts`:

```ts
import ceviche from '../assets/photos/ceviche.webp'

export const PHOTOS: Record<string, string> = { ceviche /* …el resto */ }
```

La tarjeta y el modal cambian solos de ilustración a fotografía, con su `alt`
ya escrito. Se puede ir plato por plato.

**Ojo con las canastitas:** la foto que existe muestra la versión con camarón,
y este menú las lleva con pork belly. Está deliberadamente sin usar hasta que
el cliente mande la correcta.

## Funciona sin conexión

Nada se carga de fuera: ni CDN, ni Google Fonts, ni imágenes remotas, ni
analítica. Las tipografías (Playfair Display, Archivo, Caveat) se empaquetan
desde `@fontsource`, las fotos son WebP locales y las ilustraciones son SVG
generado en el propio componente. El build usa rutas relativas (`base: './'`), así que el `dist/`
se puede abrir desde un USB, un disco o cualquier hosting.

## Accesibilidad

- HTML semántico, un solo `h1`, enlace de salto al contenido.
- Navegación por teclado completa: flechas + Home/End en las pestañas del menú
  y en los selectores de paquete y de tipo de entrada.
- Modales con `role="dialog"`, `aria-modal`, foco atrapado, Escape, retorno del
  foco al control que los abrió y scroll del fondo bloqueado.
- Foco siempre visible; la bandeja inferior nunca tapa el elemento enfocado.
- Contraste verificado contra WCAG AA en todos los pares de color.
- `prefers-reduced-motion` desactiva animaciones, marquesina y scroll suave.
- Objetivos táctiles de 44 px como mínimo; nada depende del hover.

## Estructura

```
src/
├── components/   una pieza de UI + su CSS, en pareja
├── data/         menú, paquetes, tipos y registro de fotos
├── hooks/        estado del armador de paquete y revelado al scroll
├── styles/       tokens de marca y estilos globales
├── assets/photos/ las fotografías en WebP
└── config.ts     CONTACT_URL y datos del local
```

## Dirección de arte

Editorial, nocturna y panameña. Verde petróleo, vino, naranja, crema y negro;
serif de revista para los titulares, grotesca para la interfaz y manuscrita
para los acentos. Composición asimétrica, numeración, marcos y recortes.
Sin glassmorphism, sin degradados genéricos, sin tarjetas todas iguales.
