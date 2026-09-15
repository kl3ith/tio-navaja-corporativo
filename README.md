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

### El mensaje que se envía

Los botones de cotización no abren un WhatsApp en blanco: llevan el mensaje
ya escrito con lo que la persona eligió — paquete, platos por tiempo, lo que
le falta por definir y lo que pidió fuera del paquete. Lo arma
[`src/lib/quote.ts`](src/lib/quote.ts), y en la hoja *La mesa que armaste* se
puede desplegar para leerlo antes de enviarlo o copiarlo al portapapeles.

Sólo se prellenan los canales cuyo formato conocemos, WhatsApp y `mailto:`.
Si `CONTACT_URL` apunta a otra cosa —un formulario, una landing— el enlace se
abre tal cual, sin inventarle parámetros que ese destino no entendería, y la
vista previa avisa de que hay que copiar el texto a mano.

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
├── lib/          el mensaje de cotización y su enlace
├── hooks/        estado del armador de paquete y revelado al scroll
├── styles/       tokens de marca y estilos globales
├── assets/photos/ las fotografías en WebP
└── config.ts     CONTACT_URL y datos del local
```

## Dirección de arte

La identidad es la del propio Tío Navaja, no una interpretación: los colores
salen de sus fondos oficiales y la tipografía es la de su logotipo.

| Color | Hex | De dónde sale |
|---|---|---|
| Verde petróleo | `#004C45` | el fondo de todos los patrones oficiales |
| Vino | `#8A1E40` | el fondo de palmeras BG2 |
| Naranja | `#FF8040` | los cangrejos de BG3 |
| Rosa | `#F5ABB8` | el fondo de culantro BG5 |
| Noche | `#101021` | la tinta del logotipo |
| Crema | `#F3EFE4` | los elementos gráficos |

**Tipografías** (`src/assets/fonts/`, subconjuntadas a latín, 92 kB en total):

- **Chrone** — la del logotipo. Es *unicase*: sólo dibuja capitales, así que
  va en titulares cortos y nunca en texto corrido.
- **DM Sans** (variable) — interfaz y lectura.
- **Michigan Signature** — la firma manuscrita de la marca, para acentos.

**Elementos** (`src/assets/brand/`, generados con `assets-src/build-brand.py`
desde la carpeta *Logos y Elementos* del cliente):

- Logotipos en tinta plana (crema y noche) — van como `<img>` a propósito: si
  el navegador no soportara `mask-image`, el logotipo desaparecería.
- El personaje del Tío, en dos versiones: recoloreado en crema para fondos
  oscuros y en su tinta original para los claros.
- Motivos de los fondos oficiales (palmera, átomo, bombilla, navaja) como
  máscaras monocromas: el color lo pone el CSS, así que el mismo archivo
  tapiza la portada en crema y el cierre en vino.

Cada sección toma un color y un motivo de la casa: portada en verde con
palmeras, paquetes en vino, el menú tiñe su panel según el tiempo, y el cierre
va en naranja con átomos — el guiño a la Cabeza de Einstein que está enfrente
del local.

**Licencia de las tipografías:** DM Sans es OFL. Chrone y Michigan Signature
son comerciales y se autoalojan porque el cliente entregó el archivo para su
propia marca; si el sitio se publica fuera de Tío Navaja hay que revisar esa
licencia.
