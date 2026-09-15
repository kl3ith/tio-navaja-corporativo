import { useEffect, useRef, useState } from 'react'
import { DISHES, SECTIONS, dishesOf } from '../data/menu'
import { COURSE_LABEL } from '../data/packages'
import type { Dish, GroupId, SectionId } from '../data/types'
import type { Builder } from '../hooks/usePackageBuilder'
import { DishCard } from './DishCard'
import { DishModal } from './DishModal'
import './Menu.css'

interface Props {
  builder: Builder
}

/** Permite enlazar directo a una sección: .../#postres */
const sectionFromHash = (): SectionId => {
  const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
  return SECTIONS.some((s) => s.id === hash) ? (hash as SectionId) : 'entradas'
}

export function Menu({ builder }: Props) {
  const [section, setSection] = useState<SectionId>(sectionFromHash)
  const [group, setGroup] = useState<GroupId>('frias')
  const [open, setOpen] = useState<Dish | null>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const groupRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  /** Centra la pestaña activa dentro de la barra horizontal. */
  const centerTab = (id: SectionId) => {
    const el = tabRefs.current[id]
    const bar = el?.parentElement
    if (!el || !bar) return
    const left = el.offsetLeft - (bar.clientWidth - el.clientWidth) / 2
    const smooth =
      typeof window.matchMedia !== 'function' ||
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    bar.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' })
  }

  /** Mismo patrón de flechas para el segmentado Frías / Calientes. */
  const onGroupKeyDown = (event: React.KeyboardEvent, index: number) => {
    const groups = current.groups
    if (!groups) return
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const next = (index + (forward ? 1 : -1) + groups.length) % groups.length
    setGroup(groups[next].id)
    groupRefs.current[groups[next].id]?.focus()
  }

  const goTo = (id: SectionId) => {
    setSection(id)
    if (id === 'entradas') setGroup('frias')
    centerTab(id)
    // El hash refleja la sección abierta, para poder compartir el enlace.
    // replaceState no ensucia el historial: el botón atrás sigue saliendo
    // del brochure, que es lo que la gente espera.
    window.history.replaceState(null, '', `#${id}`)
  }

  // Si la página se abre con #postres, hay que llevar la barra hasta ahí.
  useEffect(() => {
    const id = sectionFromHash()
    if (window.location.hash.slice(1) === id) {
      // Quien abre un enlace a una sección espera aterrizar en el menú,
      // no en la portada con la pestaña cambiada. Hay que esperar a que
      // carguen las tipografías: cambian la altura de todo lo de arriba
      // y el scroll acabaría en cualquier parte.
      const land = () => {
        centerTab(id)
        document.getElementById('menu')?.scrollIntoView({ behavior: 'auto' })
      }
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
      if (fonts?.ready) fonts.ready.then(() => requestAnimationFrame(land))
      else requestAnimationFrame(land)
    }
    const onHashChange = () => goTo(sectionFromHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = SECTIONS.find((s) => s.id === section)!
  const hasGroups = !!current.groups
  const dishes = dishesOf(section, hasGroups ? group : undefined)
  const status = builder.status[current.course]

  /** Flechas / Home / End sobre la barra de secciones. */
  const onTabKeyDown = (event: React.KeyboardEvent) => {
    const ids = SECTIONS.map((s) => s.id)
    const i = ids.indexOf(section)
    let next: SectionId | null = null

    if (event.key === 'ArrowRight') next = ids[(i + 1) % ids.length]
    else if (event.key === 'ArrowLeft') next = ids[(i - 1 + ids.length) % ids.length]
    else if (event.key === 'Home') next = ids[0]
    else if (event.key === 'End') next = ids[ids.length - 1]
    if (!next) return

    event.preventDefault()
    goTo(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="menu" id="menu" aria-labelledby="menu-title">
      <div className="u-wrap">
        <header className="menu__head reveal">
          <p className="u-kicker">La carta</p>
          <h2 className="menu__title" id="menu-title">
            El menú
          </h2>
          <p className="menu__sub">
            Toca un plato para verlo en grande. Agrégalo y la mesa se va armando sola,
            de acuerdo con el paquete que elegiste.
          </p>
        </header>
      </div>

      {/* ── Secciones ─────────────────────────────────────── */}
      <div className="menu__tabs-wrap">
        <div
          className="menu__tabs u-wrap"
          role="tablist"
          aria-label="Secciones del menú"
          onKeyDown={onTabKeyDown}
        >
          {SECTIONS.map((s) => {
            const active = s.id === section
            return (
              <button
                type="button"
                key={s.id}
                id={`tab-${s.id}`}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${s.id}`}
                tabIndex={active ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[s.id] = el
                }}
                className={`menu__tab${active ? ' is-active' : ''}`}
                onClick={() => goTo(s.id)}
              >
                <span className="menu__tab-index">{s.index}</span>
                <span className="menu__tab-label">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className="menu__panel"
        role="tabpanel"
        id={`panel-${section}`}
        aria-labelledby={`tab-${section}`}
        tabIndex={-1}
        data-course={current.course}
      >
        <span
          className={`pattern pattern--${current.motif} menu__pattern`}
          aria-hidden="true"
        />
        <div className="u-wrap menu__panel-inner">
          <div className="menu__section-head">
            <div>
              <p className="menu__kicker u-script">{current.kicker}</p>
              <h3 className="menu__section-title">{current.label}</h3>
            </div>
            <p className={`menu__allowance${status.extra > 0 ? ' is-over' : ''}`}>
              <span className="menu__allowance-num">
                {status.chosen}/{status.allowance}
              </span>
              <span className="menu__allowance-txt">
                {status.allowance === 1
                  ? COURSE_LABEL[current.course].one
                  : COURSE_LABEL[current.course].many}{' '}
                del paquete ${builder.pkg.price}
              </span>
            </p>
          </div>

          {hasGroups && (
            <div className="menu__groups" role="radiogroup" aria-label="Tipo de entrada">
              {current.groups!.map((g, i) => {
                const active = g.id === group
                return (
                  <button
                    type="button"
                    key={g.id}
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    ref={(el) => {
                      groupRefs.current[g.id] = el
                    }}
                    className={`menu__group${active ? ' is-active' : ''}`}
                    onClick={() => setGroup(g.id)}
                    onKeyDown={(e) => onGroupKeyDown(e, i)}
                  >
                    {g.label}
                  </button>
                )
              })}
            </div>
          )}

          <ul className="menu__grid">
            {dishes.map((dish) => (
              <li key={dish.id}>
                <DishCard
                  dish={dish}
                  index={DISHES.findIndex((d) => d.id === dish.id)}
                  builder={builder}
                  onOpen={setOpen}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <DishModal dish={open} builder={builder} onClose={() => setOpen(null)} />
    </section>
  )
}
