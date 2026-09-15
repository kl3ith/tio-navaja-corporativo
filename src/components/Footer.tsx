import { CONTACT_LABEL, CONTACT_URL, VENUE } from '../config'
import logo from '../assets/brand/logo-horizontal-cream.png'
import firma from '../assets/brand/firma-cream.png'
import './Footer.css'

export function Footer() {
  return (
    <footer className="foot">
      <span className="pattern pattern--bombilla foot__pattern" aria-hidden="true" />
      <div className="u-wrap foot__inner">
        <div className="foot__brand">
          <img
            className="foot__logo"
            src={logo}
            alt="Tío Navaja, El Cangrejo"
            width={760}
            height={162}
          />
          <img className="foot__firma" src={firma} alt="" width={720} height={133} />
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
