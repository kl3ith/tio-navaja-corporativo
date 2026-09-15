import './Occasions.css'

/**
 * Cada ocasión toma prestado uno de los motivos de la marca
 * (los mismos que aparecen en los fondos oficiales).
 */
const ITEMS = [
  { id: 'reuniones', index: '01', label: 'Reuniones', motif: 'bombilla', tone: 'petrol' },
  { id: 'almuerzos', index: '02', label: 'Almuerzos', motif: 'navaja', tone: 'pink' },
  { id: 'celebraciones', index: '03', label: 'Celebraciones', motif: 'palmera', tone: 'orange' },
  { id: 'corporativos', index: '04', label: 'Eventos corporativos', motif: 'atomo', tone: 'wine' },
] as const

export function Occasions() {
  return (
    <section className="occasions" aria-labelledby="occasions-title">
      <div className="u-wrap">
        <header className="occasions__head reveal">
          <p className="u-kicker">Antes de elegir</p>
          <h2 className="occasions__title" id="occasions-title">
            ¿Qué estás <em className="u-script">organizando</em>?
          </h2>
        </header>

        <ul className="occasions__grid">
          {ITEMS.map((item, i) => (
            <li
              className="occasions__item reveal"
              key={item.id}
              data-tone={item.tone}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="occasions__index">{item.index}</span>
              <span
                className={`occasions__motif pattern--${item.motif}`}
                aria-hidden="true"
              />
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
