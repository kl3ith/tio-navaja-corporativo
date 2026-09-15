import { DishArt } from './DishArt'
import { PHOTOS } from '../data/photos'
import type { Dish } from '../data/types'
import type { Builder } from '../hooks/usePackageBuilder'
import './DishCard.css'

interface Props {
  dish: Dish
  index: number
  builder: Builder
  onOpen: (dish: Dish) => void
}

export function DishCard({ dish, index, builder, onOpen }: Props) {
  const selected = builder.isSelected(dish.id)
  const extra = selected && builder.isExtra(dish)
  const position = builder.positionOf(dish)

  const state = extra ? 'extra' : selected ? 'in' : 'out'
  const actionLabel = selected
    ? `Quitar ${dish.name} de tu paquete`
    : `Agregar ${dish.name} a tu paquete`

  return (
    <article className={`card card--${state}`} data-course={dish.course}>
      <div className="card__media">
        <DishArt
          id={dish.id}
          name={dish.name}
          course={dish.course}
          art={dish.art}
          index={index}
          photo={PHOTOS[dish.id]}
        />

        {selected && (
          <span className={`card__badge${extra ? ' card__badge--extra' : ''}`}>
            {extra ? 'Extra' : `Nº ${position}`}
          </span>
        )}

        <button
          type="button"
          className="card__zoom"
          onClick={() => onOpen(dish)}
          aria-label={`Ver detalle de ${dish.name}`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5 21 21M10.5 7.5v6M7.5 10.5h6" />
            </g>
          </svg>
        </button>
      </div>

      <div className="card__body">
        <h4 className="card__name">
          <button type="button" className="card__name-btn" onClick={() => onOpen(dish)}>
            {dish.name}
          </button>
        </h4>

        {dish.description && <p className="card__desc">{dish.description}</p>}

        <button
          type="button"
          className="card__action"
          aria-pressed={selected}
          aria-label={actionLabel}
          onClick={() => builder.toggle(dish)}
        >
          <span className="card__action-icon" aria-hidden="true">
            {selected ? (
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M4 12.5 9.5 18 20 6.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M12 5v14M5 12h14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </span>
          <span aria-hidden="true">{selected ? 'En tu mesa' : 'Agregar'}</span>
        </button>
      </div>
    </article>
  )
}
