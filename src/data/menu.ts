import type { CourseId, Dish, GroupId, SectionId } from './types'

/**
 * Menú corporativo de Tío Navaja.
 * Los textos son exactamente los entregados por el cliente:
 * no se agregan ingredientes, cantidades, precios ni condiciones.
 */
export const DISHES: Dish[] = [
  // ─────────────── ENTRADAS FRÍAS ───────────────
  {
    id: 'tartar',
    name: 'Tartar de Atún / Salmón',
    description:
      'Cortado, marinado en soya, jengibre y cebollina, semillas de sésamo tostado y aguacate.',
    course: 'entrada',
    section: 'entradas',
    group: 'frias',
    art: 'crudo',
  },
  {
    id: 'ceviche',
    name: 'Ceviche de pesca blanca',
    description: 'Róbalo fresco curado en leche de tigre de limón y maracuyá.',
    course: 'entrada',
    section: 'entradas',
    group: 'frias',
    art: 'bowl',
  },
  {
    id: 'tostadas',
    name: 'Tostadas Atún / salmón ahumado / jamón serrano',
    description: 'Pan de masa madre tostado en mantequilla.',
    course: 'entrada',
    section: 'entradas',
    group: 'frias',
    art: 'tostada',
  },
  {
    id: 'citrus-goat',
    name: 'Citrus Goat Salad',
    description:
      'Mezclum de lechugas hidropónicas y crumble de queso de cabra, vestida con reducción balsámica.',
    course: 'entrada',
    section: 'entradas',
    group: 'frias',
    art: 'verde',
  },

  // ─────────────── ENTRADAS CALIENTES ───────────────
  {
    id: 'yakitori',
    name: 'Yakitori',
    description: 'Brochetas estilo japonés de pollo, langostinos, filete, pulpo y cerdo.',
    course: 'entrada',
    section: 'entradas',
    group: 'calientes',
    art: 'brocheta',
  },
  {
    id: 'sliders',
    name: 'Cheese Burger Sliders',
    description: 'Carne de res, queso y salsa de la casa.',
    course: 'entrada',
    section: 'entradas',
    group: 'calientes',
    art: 'slider',
  },
  {
    id: 'canastitas',
    name: 'Canastitas de plátano con pork belly',
    description: 'Plátano verde crujiente relleno de cerdo jugoso.',
    course: 'entrada',
    section: 'entradas',
    group: 'calientes',
    art: 'frito',
  },
  {
    id: 'croqueta-pulpo',
    name: 'Croqueta de pulpo',
    description:
      'Base de papas con aceite de oliva, paprika, sal gruesa y trozos de pulpo en alioli de pimentón ahumado.',
    course: 'entrada',
    section: 'entradas',
    group: 'calientes',
    art: 'croqueta',
  },
  {
    id: 'croqueta-serrano',
    name: 'Croquetas de Jamón Serrano',
    description: 'Base de bechamel y jamón serrano con alioli de ajo negro ahumado.',
    course: 'entrada',
    section: 'entradas',
    group: 'calientes',
    art: 'croqueta',
  },
  {
    id: 'carimanola',
    name: 'Carimañola con queso',
    description: 'Tradicionales rellenas de queso del país.',
    course: 'entrada',
    section: 'entradas',
    group: 'calientes',
    art: 'frito',
  },
  {
    id: 'wings',
    name: 'Wings',
    description: 'Bañadas en salsa Búfalo o Teriyaki casera.',
    course: 'entrada',
    section: 'entradas',
    group: 'calientes',
    art: 'ala',
  },
  {
    id: 'wanton',
    name: 'Wanton de camarón',
    description: 'Crujientes, rellenos de camarón sazonado en salsa agridulce.',
    course: 'entrada',
    section: 'entradas',
    group: 'calientes',
    art: 'frito',
  },

  // ─────────────── ESPECIALIDADES ───────────────
  {
    id: 'crispy-pork',
    name: 'Crispy Pork & Chicken',
    description: 'Lomo de cerdo apanado con repollo encurtido y salsa asiática.',
    course: 'fuerte',
    section: 'especialidades',
    art: 'plato',
  },
  {
    id: 'salmon',
    name: 'Salmón',
    description: 'Glaseado con maracuyá y ajo negro.',
    course: 'fuerte',
    section: 'especialidades',
    art: 'pescado',
  },
  {
    id: 'filete-res',
    name: 'Filete de Res',
    description: 'En salsa de hongos y Oporto.',
    course: 'fuerte',
    section: 'especialidades',
    art: 'plato',
  },
  {
    id: 'escabeche',
    name: 'Filete de pescado al escabeche',
    description: 'Pesca blanca con vegetales frescos marinados.',
    course: 'fuerte',
    section: 'especialidades',
    art: 'pescado',
  },
  {
    id: 'navajas-burger',
    name: 'Navajas Cheese Burger',
    description:
      'Blend de la casa, queso cheddar gratinado, bacon ahumado, pickles y salsa rosada.',
    course: 'fuerte',
    section: 'especialidades',
    art: 'burger',
  },

  // ─────────────── ACOMPAÑAMIENTOS ───────────────
  {
    id: 'papines',
    name: 'Papines salteados',
    description: 'En aceite de oliva y orégano.',
    course: 'acompanamiento',
    section: 'acompanamientos',
    art: 'guarnicion',
  },
  {
    id: 'brocoli',
    name: 'Brócoli fresco',
    description: 'En mantequilla de finas hierbas.',
    course: 'acompanamiento',
    section: 'acompanamientos',
    art: 'verde',
  },
  {
    id: 'pure',
    name: 'Puré de papa',
    description: 'Suave y cremoso con queso mozzarella.',
    course: 'acompanamiento',
    section: 'acompanamientos',
    art: 'guarnicion',
  },
  {
    id: 'ensalada',
    name: 'Ensalada fresca',
    course: 'acompanamiento',
    section: 'acompanamientos',
    art: 'verde',
  },
  {
    id: 'tentacion',
    name: 'Plátano en tentación',
    course: 'acompanamiento',
    section: 'acompanamientos',
    art: 'frito',
  },
  {
    id: 'yuca',
    name: 'Yuca frita o al mojo',
    course: 'acompanamiento',
    section: 'acompanamientos',
    art: 'frito',
  },
  {
    id: 'arroz',
    name: 'Arroz de la casa',
    course: 'acompanamiento',
    section: 'acompanamientos',
    art: 'arroz',
  },

  // ─────────────── POSTRES ───────────────
  {
    id: 'cheesecake',
    name: 'Cheesecake de maracuyá',
    course: 'postre',
    section: 'postres',
    art: 'dulce',
  },
  {
    id: 'mousse',
    name: 'Mousse de Chocolate',
    course: 'postre',
    section: 'postres',
    art: 'copa',
  },
  { id: 'brownie', name: 'Brownie', course: 'postre', section: 'postres', art: 'dulce' },
  { id: 'tres-leches', name: 'Tres leches', course: 'postre', section: 'postres', art: 'dulce' },
  { id: 'tartaletas', name: 'Tartaletas', course: 'postre', section: 'postres', art: 'dulce' },
  { id: 'flan', name: 'Flan de coco', course: 'postre', section: 'postres', art: 'copa' },
]

/** Índice por id para búsquedas rápidas desde el armador. */
export const DISH_BY_ID: Record<string, Dish> = Object.fromEntries(
  DISHES.map((dish) => [dish.id, dish]),
)

export interface SectionDef {
  id: SectionId
  label: string
  /** Numeración editorial que se imprime en la portada de sección. */
  index: string
  course: CourseId
  kicker: string
  groups?: { id: GroupId; label: string }[]
}

export const SECTIONS: SectionDef[] = [
  {
    id: 'entradas',
    label: 'Entradas',
    index: '01',
    course: 'entrada',
    kicker: 'Para romper el hielo',
    groups: [
      { id: 'frias', label: 'Frías' },
      { id: 'calientes', label: 'Calientes' },
    ],
  },
  {
    id: 'especialidades',
    label: 'Especialidades',
    index: '02',
    course: 'fuerte',
    kicker: 'El plato fuerte de la mesa',
  },
  {
    id: 'acompanamientos',
    label: 'Acompañamientos',
    index: '03',
    course: 'acompanamiento',
    kicker: 'Lo que redondea el plato',
  },
  {
    id: 'postres',
    label: 'Postres',
    index: '04',
    course: 'postre',
    kicker: 'El cierre dulce',
  },
]

export const dishesOf = (section: SectionId, group?: GroupId): Dish[] =>
  DISHES.filter((d) => d.section === section && (group ? d.group === group : true))
