import type { ReactNode } from 'react'
import './Occasions.css'

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const ICONS: Record<string, ReactNode> = {
  reuniones: (
    <g {...stroke}>
      <rect x="12" y="34" width="76" height="32" rx="6" />
      <path d="M28 34V22M72 34v-12M28 66v12M72 66v12" />
      <circle cx="50" cy="50" r="7" />
    </g>
  ),
  almuerzos: (
    <g {...stroke}>
      <circle cx="50" cy="50" r="32" />
      <circle cx="50" cy="50" r="17" />
      <path d="M18 18l10 10M82 18L72 28" />
    </g>
  ),
  celebraciones: (
    <g {...stroke}>
      <path d="M30 18h40l-6 26a14 14 0 0 1-28 0Z" />
      <path d="M50 58v22M36 80h28" />
      <path d="M22 30l-8-8M78 30l8-8" />
    </g>
  ),
  corporativos: (
    <g {...stroke}>
      <path d="M18 84V26l28-10v68" />
      <path d="M46 40h36v44" />
      <path d="M30 38h4M30 54h4M60 56h8M60 70h8" />
      <path d="M12 84h76" />
    </g>
  ),
}

const ITEMS = [
  { id: 'reuniones', index: '01', label: 'Reuniones', course: 'entrada' },
  { id: 'almuerzos', index: '02', label: 'Almuerzos', course: 'acompanamiento' },
  { id: 'celebraciones', index: '03', label: 'Celebraciones', course: 'postre' },
  { id: 'corporativos', index: '04', label: 'Eventos corporativos', course: 'fuerte' },
] as const

export function Occasions() {
  return (
    <section className="occasions" aria-labelledby="occasions-title">
      <div className="u-wrap">
        <header className="occasions__head reveal">
          <p className="u-kicker">Antes de elegir</p>
          <h2 className="occasions__title" id="occasions-title">
            ¿Qué estás <em>organizando</em>?
          </h2>
        </header>

        <ul className="occasions__grid">
          {ITEMS.map((item, i) => (
            <li
              className="occasions__item reveal"
              key={item.id}
              data-course={item.course}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="occasions__index">{item.index}</span>
              <svg className="occasions__icon" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
                {ICONS[item.id]}
              </svg>
              <h3 className="occasions__label">{item.label}</h3>
            </li>
          ))}
        </ul>

        <p className="occasions__note reveal">
          Usos sugeridos de la propuesta. El menú es el mismo para todos:
          cambia el motivo de la mesa.
        </p>
      </div>
    </section>
  )
}
