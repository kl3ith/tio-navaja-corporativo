import { CONTACT_URL, CONTACT_LABEL, VENUE } from '../config'
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
      <div className="u-wrap final__inner">
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
    </section>
  )
}
