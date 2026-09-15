import { useEffect, useState } from 'react'
import { CONTACT_URL } from '../config'
import logo from '../assets/brand/logo-horizontal-cream.png'
import './Nav.css'

const LINKS = [
  { href: '#paquetes', label: 'Paquetes' },
  { href: '#menu', label: 'Menú' },
  { href: '#cotizar', label: 'Cotizar' },
]

export function Nav() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${solid ? ' is-solid' : ''}`}>
      <div className="nav__inner u-wrap">
        <a className="nav__brand" href="#portada">
          <img
            className="nav__logo"
            src={logo}
            alt="Tío Navaja, El Cangrejo"
            width={760}
            height={162}
          />
          <span className="nav__sub">Menú corporativo</span>
        </a>

        <nav className="nav__links" aria-label="Secciones del brochure">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          className="btn btn--primary nav__cta"
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Cotizar
        </a>
      </div>
    </header>
  )
}
