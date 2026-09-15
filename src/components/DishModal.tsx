import { DishArt } from './DishArt'
import { Modal } from './Modal'
import { PHOTOS } from '../data/photos'
import { COURSE_LABEL } from '../data/packages'
import { DISHES } from '../data/menu'
import type { Dish } from '../data/types'
import type { Builder } from '../hooks/usePackageBuilder'
import './DishModal.css'

interface Props {
  dish: Dish | null
  builder: Builder
  onClose: () => void
}

export function DishModal({ dish, builder, onClose }: Props) {
  if (!dish) return null

  const selected = builder.isSelected(dish.id)
  const extra = selected && builder.isExtra(dish)
  const index = DISHES.findIndex((d) => d.id === dish.id)
  const allowance = builder.status[dish.course].allowance
  const chosen = builder.status[dish.course].chosen

  return (
    <Modal open={!!dish} onClose={onClose} labelledBy="dish-modal-title">
      <div className="dm" data-course={dish.course}>
        <button
          type="button"
          className="dm__close"
          onClick={onClose}
          data-autofocus
          aria-label="Cerrar detalle del plato"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6 6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="dm__media">
          <DishArt
            id={dish.id}
            name={dish.name}
            course={dish.course}
            art={dish.art}
            index={index}
            photo={PHOTOS[dish.id]}
            size="hero"
          />
        </div>

        <div className="dm__body">
          <p className="u-kicker dm__course">{COURSE_LABEL[dish.course].one}</p>

          <h3 className="dm__title" id="dish-modal-title">
            {dish.name}
          </h3>

          {dish.description ? (
            <p className="dm__desc">{dish.description}</p>
          ) : (
            <p className="dm__desc dm__desc--plain">
              Clásico de la casa, servido tal cual aparece en el menú.
            </p>
          )}

          <hr className="u-rule dm__rule" />

          <p className="dm__meta">
            Tu paquete <strong>${builder.pkg.price}</strong> incluye{' '}
            <strong>
              {allowance} {allowance === 1 ? COURSE_LABEL[dish.course].one : COURSE_LABEL[dish.course].many}
            </strong>
            . Llevas {chosen}.
          </p>

          {extra && (
            <p className="dm__warn">
              Este plato está por encima de lo que incluye el paquete. Queda marcado
              como <strong>extra</strong> para conversarlo con el equipo.
            </p>
          )}

          <div className="dm__actions">
            <button
              type="button"
              className={`btn ${selected ? 'btn--ghost' : 'btn--primary'}`}
              onClick={() => builder.toggle(dish)}
            >
              {selected ? 'Quitar de mi mesa' : 'Agregar a mi mesa'}
            </button>
            <button type="button" className="btn btn--ghost dm__back" onClick={onClose}>
              Seguir viendo
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
