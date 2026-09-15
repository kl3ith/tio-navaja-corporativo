import { useCallback, useMemo, useState } from 'react'
import { DISH_BY_ID } from '../data/menu'
import { PACKAGES, allowanceFor, COURSE_ORDER } from '../data/packages'
import type { CourseId, Dish, PackageDef } from '../data/types'

export type Selection = Record<CourseId, string[]>

const emptySelection = (): Selection => ({
  entrada: [],
  fuerte: [],
  acompanamiento: [],
  postre: [],
})

export interface CourseStatus {
  course: CourseId
  allowance: number
  chosen: number
  /** Cuántas faltan para completar el tiempo. */
  missing: number
  /** Cuántas se eligieron por encima de lo que incluye el paquete. */
  extra: number
  dishes: Dish[]
}

export interface Builder {
  pkg: PackageDef
  packageId: string
  setPackage: (id: string) => void
  selection: Selection
  toggle: (dish: Dish) => void
  remove: (dish: Dish) => void
  clear: () => void
  isSelected: (id: string) => boolean
  /** true cuando el plato está elegido pero fuera de lo que cubre el paquete. */
  isExtra: (dish: Dish) => boolean
  /** Posición dentro de su tiempo (1, 2, 3…). */
  positionOf: (dish: Dish) => number
  status: Record<CourseId, CourseStatus>
  totalChosen: number
  totalAllowance: number
  totalExtra: number
  isComplete: boolean
}

export function usePackageBuilder(initialPackage = PACKAGES[0].id): Builder {
  const [packageId, setPackageId] = useState(initialPackage)
  const [selection, setSelection] = useState<Selection>(emptySelection)

  const pkg = useMemo(
    () => PACKAGES.find((p) => p.id === packageId) ?? PACKAGES[0],
    [packageId],
  )

  const toggle = useCallback((dish: Dish) => {
    setSelection((prev) => {
      const list = prev[dish.course]
      const next = list.includes(dish.id)
        ? list.filter((id) => id !== dish.id)
        : [...list, dish.id]
      return { ...prev, [dish.course]: next }
    })
  }, [])

  const remove = useCallback((dish: Dish) => {
    setSelection((prev) => ({
      ...prev,
      [dish.course]: prev[dish.course].filter((id) => id !== dish.id),
    }))
  }, [])

  const clear = useCallback(() => setSelection(emptySelection()), [])

  const status = useMemo(() => {
    const out = {} as Record<CourseId, CourseStatus>
    for (const course of COURSE_ORDER) {
      const ids = selection[course]
      const allowance = allowanceFor(pkg, course)
      out[course] = {
        course,
        allowance,
        chosen: ids.length,
        missing: Math.max(0, allowance - ids.length),
        extra: Math.max(0, ids.length - allowance),
        dishes: ids.map((id) => DISH_BY_ID[id]).filter(Boolean),
      }
    }
    return out
  }, [selection, pkg])

  const totals = useMemo(() => {
    const list = COURSE_ORDER.map((c) => status[c])
    return {
      totalChosen: list.reduce((n, s) => n + s.chosen, 0),
      totalAllowance: list.reduce((n, s) => n + s.allowance, 0),
      totalExtra: list.reduce((n, s) => n + s.extra, 0),
      isComplete: list.every((s) => s.missing === 0),
    }
  }, [status])

  const isSelected = useCallback(
    (id: string) => COURSE_ORDER.some((c) => selection[c].includes(id)),
    [selection],
  )

  const positionOf = useCallback(
    (dish: Dish) => selection[dish.course].indexOf(dish.id) + 1,
    [selection],
  )

  const isExtra = useCallback(
    (dish: Dish) => {
      const index = selection[dish.course].indexOf(dish.id)
      return index >= 0 && index >= allowanceFor(pkg, dish.course)
    },
    [selection, pkg],
  )

  return {
    pkg,
    packageId,
    setPackage: setPackageId,
    selection,
    toggle,
    remove,
    clear,
    isSelected,
    isExtra,
    positionOf,
    status,
    ...totals,
  }
}
