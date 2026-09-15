import { CONTACT_URL, CONTACT_LABEL, VENUE } from '../config'
import tio from '../assets/brand/tio-oscuro.webp'
import firma from '../assets/brand/firma-cream.png'
import './FinalCta.css'

const LINES = [
  'Un almuerzo de equipo.',
  'Una celebración.',
  'Una cena de negocios.',
  'Una ocasión especial.',
]

export function FinalCta() {
  return (
    <section className="final" id="cotizar" aria-labelledby="final-title">
      <span className="pattern pattern--atomo final__pattern" aria-hidden="true" />

      <div className="u-wrap final__inner">
        <div className="final__text">
          <h2 className="final__title reveal" id="final-title">
            Hagamos de tu próximo encuentro <em>una buena mesa</em>
          </h2>

          <ul className="final__lines reveal">
            {LINES.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          <p className="final__claim reveal">
            <span>Tío Navaja pone la mesa.</span>
            <span className="final__claim-alt">Tú pones el motivo.</span>
          </p>

          <div className="final__actions reveal">
            <a
              className="btn btn--ink final__btn"
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar cotización
            </a>
            <p className="final__channel">
              {CONTACT_LABEL} · {VENUE.hours}
            </p>
          </div>
        </div>

        <div className="final__art" aria-hidden="true">
          <img className="final__tio" src={tio} alt="" width={520} height={939} />
          <img className="final__firma" src={firma} alt="" width={720} height={133} />
        </div>
      </div>
    </section>
  )
}
