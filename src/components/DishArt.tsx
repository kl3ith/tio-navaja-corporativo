import type { ArtKind, CourseId } from '../data/types'
import './DishArt.css'

/**
 * Lámina ilustrada de cada plato.
 *
 * Tío Navaja todavía no entregó fotografía del menú corporativo, así que
 * cada plato se dibuja con una lámina vectorial de la casa: fondo de color
 * del tiempo, recortes superpuestos, numeración editorial y un trazo del
 * plato. Es ilustración declarada, no una foto inventada del restaurante.
 *
 * Cuando llegue la fotografía real basta con registrar el archivo en
 * `src/data/photos.ts`: la tarjeta cambia sola a <img> con alt.
 */

/** Hash estable: el mismo plato recibe siempre la misma composición. */
function hash(seed: string): number {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return Math.abs(h)
}

type Palette = { bg: string; shape: string; shape2: string; line: string; num: string }

const PALETTES: Record<CourseId, Palette[]> = {
  entrada: [
    { bg: '#004c45', shape: '#00312c', shape2: '#ff8040', line: '#f3efe4', num: '#0a655b' },
    { bg: '#00312c', shape: '#0a655b', shape2: '#8a1e40', line: '#f3efe4', num: '#004c45' },
  ],
  fuerte: [
    { bg: '#8a1e40', shape: '#4e1024', shape2: '#ff8040', line: '#f3efe4', num: '#a13a58' },
    { bg: '#4e1024', shape: '#8a1e40', shape2: '#004c45', line: '#f3efe4', num: '#6b1731' },
  ],
  acompanamiento: [
    { bg: '#0a655b', shape: '#004c45', shape2: '#f5abb8', line: '#f3efe4', num: '#00312c' },
    { bg: '#004c45', shape: '#00312c', shape2: '#f5abb8', line: '#f3efe4', num: '#0a655b' },
  ],
  postre: [
    { bg: '#ff8040', shape: '#8a1e40', shape2: '#f3efe4', line: '#101021', num: '#ff9a63' },
    { bg: '#f5abb8', shape: '#8a1e40', shape2: '#ff8040', line: '#101021', num: '#f8bfc9' },
  ],
}

/** Trazo del plato. Todos comparten el mismo lienzo 400×500. */
function Motif({ kind, c }: { kind: ArtKind; c: string }) {
  const s = { fill: 'none', stroke: c, strokeWidth: 6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'crudo':
      return (
        <g {...s}>
          <circle cx="200" cy="285" r="96" />
          <circle cx="200" cy="285" r="62" strokeDasharray="14 12" />
          <rect x="176" y="261" width="24" height="24" transform="rotate(18 188 273)" />
          <rect x="200" y="285" width="22" height="22" transform="rotate(-12 211 296)" />
          <path d="M150 232c22-16 48-18 70-6" />
        </g>
      )
    case 'bowl':
      return (
        <g {...s}>
          <path d="M104 250h192c0 62-43 104-96 104s-96-42-96-104Z" />
          <path d="M120 268c24 16 48-14 72 2s46-12 70 4" />
          <circle cx="268" cy="212" r="30" />
          <path d="M268 182v60M238 212h60" />
        </g>
      )
    case 'tostada':
      return (
        <g {...s}>
          <rect x="96" y="238" width="208" height="96" rx="22" />
          <path d="M112 262c30-18 62 14 92-4s58 12 88-6" />
          <path d="M140 300h120" strokeDasharray="10 14" />
          <path d="M150 210c16-20 40-24 62-12" />
        </g>
      )
    case 'verde':
      return (
        <g {...s}>
          <path d="M100 262h200c-8 58-48 92-100 92s-92-34-100-92Z" />
          <ellipse cx="164" cy="222" rx="42" ry="24" transform="rotate(-24 164 222)" />
          <ellipse cx="240" cy="230" rx="38" ry="22" transform="rotate(20 240 230)" />
          <path d="M206 210v46" />
        </g>
      )
    case 'brocheta':
      return (
        <g {...s}>
          <path d="M120 372 296 196" />
          <rect x="152" y="290" width="54" height="54" rx="10" transform="rotate(-45 179 317)" />
          <rect x="196" y="246" width="54" height="54" rx="10" transform="rotate(-45 223 273)" />
          <rect x="240" y="202" width="54" height="54" rx="10" transform="rotate(-45 267 229)" />
        </g>
      )
    case 'slider':
      return (
        <g {...s}>
          <path d="M116 256c0-44 38-70 84-70s84 26 84 70Z" />
          <path d="M112 274h176" />
          <path d="M112 300c22-16 44 12 66-4s44 12 66-4 24 8 44 8" />
          <path d="M116 322h168c0 24-20 34-46 34h-76c-26 0-46-10-46-34Z" />
          <path d="M200 150v42" />
        </g>
      )
    case 'frito':
      return (
        <g {...s}>
          <ellipse cx="164" cy="316" rx="66" ry="34" transform="rotate(-10 164 316)" />
          <ellipse cx="248" cy="286" rx="66" ry="34" transform="rotate(14 248 286)" />
          <ellipse cx="196" cy="230" rx="60" ry="32" transform="rotate(-6 196 230)" />
          <path d="M140 316c14-8 30-8 44 0" strokeDasharray="8 10" />
        </g>
      )
    case 'croqueta':
      return (
        <g {...s}>
          <rect x="106" y="278" width="126" height="62" rx="31" transform="rotate(-8 169 309)" />
          <rect x="182" y="222" width="126" height="62" rx="31" transform="rotate(10 245 253)" />
          <circle cx="146" cy="216" r="12" />
          <circle cx="188" cy="190" r="8" />
        </g>
      )
    case 'ala':
      return (
        <g {...s}>
          <path d="M130 344c-16-58 14-118 74-138 44-14 74 10 72 44-2 40-40 52-62 84-16 22-16 40-16 40Z" />
          <path d="M198 340c22 14 48 10 62-8" />
          <circle cx="146" cy="352" r="16" />
        </g>
      )
    case 'plato':
      return (
        <g {...s}>
          <circle cx="200" cy="286" r="112" />
          <path d="M146 268c18-30 60-40 92-20 26 16 30 52 6 70-28 20-76 12-98-14Z" />
          <path d="M138 336c34 14 90 14 124-4" strokeDasharray="6 14" />
        </g>
      )
    case 'pescado':
      return (
        <g {...s}>
          <path d="M108 286c44-56 140-56 184 0-44 56-140 56-184 0Z" />
          <path d="M200 244v84" />
          <path d="M170 262l-8 48M230 262l8 48" />
          <path d="M292 250l40-28v128l-40-28" />
        </g>
      )
    case 'burger':
      return (
        <g {...s}>
          <path d="M96 244c0-52 46-84 104-84s104 32 104 84Z" />
          <path d="M92 266h216" />
          <path d="M92 292c26-18 52 14 78-4s52 14 78-4 28 10 52 10" />
          <path d="M96 320h208" />
          <path d="M100 342h200c0 30-26 42-58 42H158c-32 0-58-12-58-42Z" />
          <circle cx="170" cy="196" r="6" />
          <circle cx="222" cy="184" r="6" />
        </g>
      )
    case 'guarnicion':
      return (
        <g {...s}>
          <path d="M116 274h168c-6 52-40 82-84 82s-78-30-84-82Z" />
          <circle cx="164" cy="240" r="26" />
          <circle cx="222" cy="232" r="22" />
          <circle cx="196" cy="276" r="18" />
        </g>
      )
    case 'arroz':
      return (
        <g {...s}>
          <path d="M112 334c0-62 40-112 88-112s88 50 88 112Z" />
          <path d="M112 334h176" />
          <path d="M156 290h14M196 262h14M232 300h14M182 312h14" />
        </g>
      )
    case 'dulce':
      return (
        <g {...s}>
          <path d="M120 350 200 190l80 160Z" />
          <path d="M152 286h96" />
          <path d="M104 350h192" />
          <circle cx="200" cy="216" r="12" />
        </g>
      )
    case 'copa':
      return (
        <g {...s}>
          <path d="M126 236h148c0 54-33 92-74 92s-74-38-74-92Z" />
          <path d="M200 328v48M162 376h76" />
          <path d="M140 236c26-22 54 14 82-6s38 6 52-2" />
          <circle cx="230" cy="196" r="14" />
          <path d="M230 182c6-14 18-18 26-16" />
        </g>
      )
  }
}

/** Decorados de fondo — 4 composiciones asimétricas, elegidas por hash. */
function Backdrop({ variant, p }: { variant: number; p: Palette }) {
  switch (variant) {
    case 0:
      return (
        <>
          <circle cx="330" cy="120" r="150" fill={p.shape} />
          <path d="M0 400h400v100H0z" fill={p.shape2} opacity="0.9" />
        </>
      )
    case 1:
      return (
        <>
          <path d="M0 0h260L0 320Z" fill={p.shape} />
          <circle cx="322" cy="418" r="104" fill={p.shape2} opacity="0.9" />
        </>
      )
    case 2:
      return (
        <>
          <rect x="40" y="60" width="320" height="380" fill={p.shape} />
          <path d="M400 0v180L230 0Z" fill={p.shape2} opacity="0.9" />
        </>
      )
    default:
      return (
        <>
          <ellipse cx="200" cy="300" rx="210" ry="180" fill={p.shape} />
          <path d="M0 0h140v70H0z" fill={p.shape2} opacity="0.9" />
        </>
      )
  }
}

interface Props {
  id: string
  name: string
  course: CourseId
  art: ArtKind
  index: number
  photo?: string
  /** `card` en la parrilla, `hero` dentro del modal. */
  size?: 'card' | 'hero'
}

export function DishArt({ id, name, course, art, index, photo, size = 'card' }: Props) {
  // La fotografía real, cuando exista, siempre gana.
  if (photo) {
    return (
      <img
        className={`dish-art dish-art--photo dish-art--${size}`}
        src={photo}
        alt={`${name}, plato del menú corporativo de Tío Navaja`}
        loading={size === 'card' ? 'lazy' : 'eager'}
        decoding="async"
        width={400}
        height={500}
      />
    )
  }

  const h = hash(id)
  const palettes = PALETTES[course]
  const p = palettes[h % palettes.length]
  const variant = (h >> 3) % 4
  const tilt = ((h >> 5) % 5) - 2

  return (
    <svg
      className={`dish-art dish-art--${size}`}
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      /* Decorativa: el nombre del plato ya está en texto junto a ella. */
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="500" fill={p.bg} />
      <Backdrop variant={variant} p={p} />
      <text
        x="28"
        y="452"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="190"
        fontWeight="700"
        fill={p.num}
        opacity="0.55"
      >
        {String(index + 1).padStart(2, '0')}
      </text>
      <g transform={`rotate(${tilt} 200 280)`}>
        <Motif kind={art} c={p.line} />
      </g>
      <rect
        x="16"
        y="16"
        width="368"
        height="468"
        fill="none"
        stroke={p.line}
        strokeWidth="2"
        opacity="0.35"
      />
    </svg>
  )
}
