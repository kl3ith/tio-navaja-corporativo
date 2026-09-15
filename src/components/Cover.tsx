import { DishArt } from './DishArt'
import { VENUE } from '../config'
import './Cover.css'

/** Láminas que arman el collage de portada. */
const COLLAGE = [
  { id: 'ceviche', name: 'Ceviche de pesca blanca', course: 'entrada', art: 'bowl', index: 1 },
  { id: 'filete-res', name: 'Filete de Res', course: 'fuerte', art: 'plato', index: 2 },
  { id: 'cheesecake', name: 'Cheesecake de maracuyá', course: 'postre', art: 'dulce', index: 0 },
] as const

export function Cover() {
  return (
    <section className="cover" id="portada">
      <div className="cover__inner u-wrap">
        <div className="cover__text">
          <p className="u-kicker cover__eyebrow">
            El Cangrejo · Ciudad de Panamá
          </p>

          <h1 className="cover__title">
            <span className="cover__title-line">Tío</span>
            <span className="cover__title-line cover__title-line--offset">Navaja</span>
          </h1>

          <p className="cover__lede">Menú corporativo</p>

          <p className="cover__quote">
            <span aria-hidden="true" className="cover__quote-mark">
              “
            </span>
            Una propuesta gastronómica para compartir, celebrar y hacer negocios
            alrededor de una buena mesa.
          </p>

          <div className="cover__actions">
            <a className="btn btn--primary" href="#paquetes">
              Ver paquetes
            </a>
            <a className="btn btn--ghost" href="#menu">
              Explorar menú
            </a>
          </div>

          <p className="cover__meta">{VENUE.hours}</p>
        </div>

        <div className="cover__collage" aria-hidden="true">
          {COLLAGE.map((item, i) => (
            <div className={`cover__plate cover__plate--${i + 1}`} key={item.id}>
              <DishArt
                id={item.id}
                name={item.name}
                course={item.course}
                art={item.art}
                index={item.index}
              />
            </div>
          ))}
          <span className="cover__stamp u-script">de la casa</span>
        </div>
      </div>

      <div className="cover__ticker" aria-hidden="true">
        <div className="cover__ticker-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              Reuniones <i>·</i> Almuerzos <i>·</i> Celebraciones <i>·</i> Eventos corporativos{' '}
              <i>·</i>{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
