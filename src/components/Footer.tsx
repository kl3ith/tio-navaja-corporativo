import { CONTACT_LABEL, CONTACT_URL, VENUE } from '../config'
import './Footer.css'

export function Footer() {
  return (
    <footer className="foot">
      <div className="u-wrap foot__inner">
        <div className="foot__brand">
          <p className="foot__name">Tío Navaja</p>
          <p className="u-script foot__script">buena mesa, buen plan</p>
        </div>

        <dl className="foot__data">
          <div>
            <dt>Dónde</dt>
            <dd>
              {VENUE.address}
              <br />
              {VENUE.city}
            </dd>
          </div>
          <div>
            <dt>Horario</dt>
            <dd>{VENUE.hours}</dd>
          </div>
          <div>
            <dt>Cotizaciones</dt>
            <dd>
              <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
                {CONTACT_LABEL}
              </a>
            </dd>
          </div>
          <div>
            <dt>Web</dt>
            <dd>
              <a href={VENUE.siteUrl} target="_blank" rel="noopener noreferrer">
                {VENUE.site}
              </a>
            </dd>
          </div>
        </dl>

        <p className="foot__legal">
          Menú corporativo. Las opciones y descripciones son las entregadas por el
          restaurante; disponibilidad y condiciones se confirman al cotizar.
        </p>
      </div>
    </footer>
  )
}
