import { useRef } from 'react'
import { PACKAGES, courseLine } from '../data/packages'
import type { Builder } from '../hooks/usePackageBuilder'
import './Packages.css'

interface Props {
  builder: Builder
}

export function Packages({ builder }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  /** Flechas para moverse entre opciones, como manda el patrón radiogroup. */
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const keys = ['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const forward = event.key === 'ArrowRight' || event.key === 'ArrowDown'
    const next = (index + (forward ? 1 : -1) + PACKAGES.length) % PACKAGES.length
    builder.setPackage(PACKAGES[next].id)
    refs.current[next]?.focus()
  }

  return (
    <section className="packages" id="paquetes" aria-labelledby="packages-title">
      <span className="pattern pattern--palmera packages__pattern" aria-hidden="true" />
      <div className="u-wrap packages__inner">
        <header className="packages__head reveal">
          <p className="u-kicker">Dos formatos</p>
          <h2 className="packages__title" id="packages-title">
            Elige tu paquete
          </h2>
          <p className="packages__sub">
            Precio por persona. Cada paquete define cuántas opciones del menú entran
            en la mesa.
          </p>
        </header>

        <div
          className="packages__grid"
          role="radiogroup"
          aria-labelledby="packages-title"
        >
          {PACKAGES.map((pkg, i) => {
            const active = builder.packageId === pkg.id
            return (
              <button
                type="button"
                key={pkg.id}
                ref={(el) => {
                  refs.current[i] = el
                }}
                role="radio"
                aria-checked={active}
                tabIndex={active ? 0 : -1}
                className={`pkg${active ? ' is-active' : ''}`}
                onClick={() => builder.setPackage(pkg.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="pkg__tag">{active ? 'Seleccionado' : 'Elegir'}</span>

                <span className="pkg__price">
                  <span className="pkg__currency" aria-hidden="true">
                    $
                  </span>
                  <span className="pkg__amount">{pkg.price}</span>
                  <span className="u-sr">{pkg.price} dólares por persona</span>
                </span>

                <span className="pkg__name u-script">{pkg.name}</span>

                <span className="pkg__list">
                  {pkg.courses.map((course) => (
                    <span className="pkg__row" key={course.id}>
                      <span className="pkg__count">{course.count}</span>
                      <span className="pkg__course">
                        {courseLine(course.id, course.count).replace(`${course.count} `, '')}
                      </span>
                    </span>
                  ))}
                </span>

                <span className="pkg__mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path
                      d="M4 12.5 9.5 18 20 6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            )
          })}
        </div>

        <div className="packages__foot reveal">
          <p className="packages__hint">
            Ya elegiste el <strong>paquete ${builder.pkg.price}</strong>. Ahora arma la
            mesa: el menú te va marcando lo que llevas.
          </p>
          <a className="btn btn--primary" href="#menu">
            Explorar menú
          </a>
        </div>
      </div>
    </section>
  )
}
