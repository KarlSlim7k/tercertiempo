import { NavLink } from 'react-router-dom'
import logoCrea from '../assets/optimized/logo-crea.png'
import logoTercerTiempo from '../assets/optimized/logo-tercer-tiempo.png'

const navLinkClass = ({ isActive }) =>
  `font-disp text-xs sm:text-sm uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm transition-colors ${
    isActive ? 'bg-[var(--gold-soft)] text-[var(--gold)]' : 'text-[var(--dim)] hover:text-[var(--gold)]'
  }`

export default function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <NavLink to="/" className="bg-white rounded-sm px-2.5 py-1 flex items-center justify-center shrink-0">
          <img src={logoCrea} alt="CREA Contenidos" className="h-8 sm:h-10 w-auto" />
        </NavLink>

        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" end className={navLinkClass}>Inicio</NavLink>
          <NavLink to="/resultados" className={navLinkClass}>Resultados</NavLink>
          <NavLink to="/presentaciones" className={navLinkClass}>Presentaciones</NavLink>
        </nav>

        <NavLink to="/" className="bg-white rounded-sm px-2.5 py-1 flex items-center justify-center shrink-0">
          <img src={logoTercerTiempo} alt="Tercer Tiempo" className="h-8 sm:h-10 w-auto" />
        </NavLink>
      </div>
    </header>
  )
}
