import { Cover } from './components/Cover'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Menu } from './components/Menu'
import { Nav } from './components/Nav'
import { Occasions } from './components/Occasions'
import { Packages } from './components/Packages'
import { Tray } from './components/Tray'
import { usePackageBuilder } from './hooks/usePackageBuilder'
import { useReveal } from './hooks/useReveal'

export default function App() {
  const builder = usePackageBuilder()
  useReveal()

  return (
    <div className={`app${builder.totalChosen > 0 ? ' has-tray' : ''}`}>
      <a className="u-skip" href="#contenido">
        Saltar al contenido
      </a>

      <Nav />

      <main id="contenido">
        <Cover />
        <Occasions />
        <Packages builder={builder} />
        <Menu builder={builder} />
        <FinalCta />
      </main>

      <Footer />
      <Tray builder={builder} />
    </div>
  )
}
