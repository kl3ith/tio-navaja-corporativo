import type { CourseId, PackageDef } from './types'

/** Etiquetas de cada tiempo, en singular y plural. */
export const COURSE_LABEL: Record<CourseId, { one: string; many: string }> = {
  entrada: { one: 'entrada', many: 'entradas' },
  fuerte: { one: 'plato fuerte', many: 'platos fuertes' },
  acompanamiento: { one: 'acompañamiento', many: 'acompañamientos' },
  postre: { one: 'postre', many: 'postres' },
}

export const COURSE_ORDER: CourseId[] = ['entrada', 'fuerte', 'acompanamiento', 'postre']

/**
 * Los dos paquetes, exactamente como los definió el cliente.
 * No incluyen impuestos, mínimos ni condiciones porque no fueron provistos.
 */
export const PACKAGES: PackageDef[] = [
  {
    id: 'p45',
    price: '45',
    name: 'La mesa completa',
    courses: [
      { id: 'entrada', count: 1 },
      { id: 'fuerte', count: 1 },
      { id: 'acompanamiento', count: 2 },
      { id: 'postre', count: 2 },
    ],
  },
  {
    id: 'p55',
    price: '55',
    name: 'La mesa larga',
    courses: [
      { id: 'entrada', count: 2 },
      { id: 'fuerte', count: 2 },
      { id: 'acompanamiento', count: 2 },
      { id: 'postre', count: 2 },
    ],
  },
]

export const PACKAGE_BY_ID: Record<string, PackageDef> = Object.fromEntries(
  PACKAGES.map((p) => [p.id, p]),
)

/** Cuántas opciones incluye un paquete para un tiempo dado. */
export const allowanceFor = (pkg: PackageDef, course: CourseId): number =>
  pkg.courses.find((c) => c.id === course)?.count ?? 0

/** "2 entradas" / "1 plato fuerte" */
export const courseLine = (course: CourseId, count: number): string =>
  `${count} ${count === 1 ? COURSE_LABEL[course].one : COURSE_LABEL[course].many}`

/** Ocasiones sugeridas de uso de la propuesta. */
export const OCCASIONS = [
  { id: 'reuniones', label: 'Reuniones', index: '01' },
  { id: 'almuerzos', label: 'Almuerzos', index: '02' },
  { id: 'celebraciones', label: 'Celebraciones', index: '03' },
  { id: 'corporativos', label: 'Eventos corporativos', index: '04' },
] as const
