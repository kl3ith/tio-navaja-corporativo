import { VENUE } from '../config'
import logo from '../assets/brand/logo-apilado-cream.png'
import tio from '../assets/brand/tio.webp'
import emc from '../assets/brand/emc-cream.png'
import './Cover.css'

export function Cover() {
  return (
    <section className="cover" id="portada">
      <span className="pattern pattern--palmera cover__pattern" aria-hidden="true" />

      <div className="cover__inner u-wrap">
        <div className="cover__text">
          <p className="u-kicker cover__eyebrow">El Cangrejo · Ciudad de Panamá</p>

          <h1 className="cover__title">
            <img src={logo} alt="Tío Navaja, El Cangrejo" width={640} height={354} />
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

        <div className="cover__art" aria-hidden="true">
          <img className="cover__tio" src={tio} alt="" width={520} height={939} />
          <img className="cover__emc" src={emc} alt="" width={520} height={266} />
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
