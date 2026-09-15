/** Los cuatro tiempos que componen un paquete corporativo. */
export type CourseId = 'entrada' | 'fuerte' | 'acompanamiento' | 'postre'

/** Secciones de navegación del menú. */
export type SectionId = 'entradas' | 'especialidades' | 'acompanamientos' | 'postres'

/** Subgrupos dentro de una sección (hoy sólo Entradas los usa). */
export type GroupId = 'frias' | 'calientes'

/** Familia de ilustración vectorial que acompaña a cada plato. */
export type ArtKind =
  | 'crudo'
  | 'bowl'
  | 'tostada'
  | 'verde'
  | 'brocheta'
  | 'slider'
  | 'frito'
  | 'croqueta'
  | 'ala'
  | 'plato'
  | 'pescado'
  | 'burger'
  | 'guarnicion'
  | 'arroz'
  | 'dulce'
  | 'copa'

export interface Dish {
  /** Identificador estable, usado en el estado y en las anclas. */
  id: string
  name: string
  /** Descripción tal cual la entregó el cliente. Puede no existir. */
  description?: string
  course: CourseId
  section: SectionId
  group?: GroupId
  art: ArtKind
  /**
   * Fotografía real del plato, opcional.
   * Para activarla: colocar el archivo en `src/assets/photos/` y
   * registrarlo en `src/data/photos.ts`. Mientras no exista,
   * se dibuja la ilustración vectorial de la casa.
   */
  photo?: string
}

export interface CourseSpec {
  id: CourseId
  /** Cuántas opciones incluye el paquete para este tiempo. */
  count: number
}

export interface PackageDef {
  id: string
  price: string
  /** Nombre editorial del paquete. */
  name: string
  courses: CourseSpec[]
}
