import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import logoCrea from '../assets/optimized/logo-crea.png'
import logoTercerTiempo from '../assets/optimized/logo-tercer-tiempo.png'

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/ligas', label: 'Ligas' },
  { to: '/resultados', label: 'Resultados' },
  { to: '/presentaciones', label: 'Presentaciones' },
]

const navLinkClass = ({ isActive }) =>
  `font-disp text-xs sm:text-sm uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm transition-colors ${
    isActive ? 'bg-[var(--gold-soft)] text-[var(--gold)]' : 'text-[var(--dim)] hover:text-[var(--gold)]'
  }`

const mobileNavLinkClass = ({ isActive }) =>
  `font-disp text-sm uppercase tracking-[0.2em] px-4 py-3 rounded-sm transition-colors ${
    isActive ? 'bg-[var(--gold-soft)] text-[var(--gold)]' : 'text-[var(--dim)] hover:text-[var(--gold)]'
  }`

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <NavLink to="/" className="bg-white rounded-sm px-2.5 py-1 flex items-center justify-center shrink-0">
          <img src={logoCrea} alt="CREA Contenidos" className="h-8 sm:h-10 w-auto" />
        </NavLink>

        <nav className="hidden sm:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/" className="hidden sm:flex bg-white rounded-sm px-2.5 py-1 items-center justify-center shrink-0">
          <img src={logoTercerTiempo} alt="Tercer Tiempo" className="h-8 sm:h-10 w-auto" />
        </NavLink>

        <button
          type="button"
          className="sm:hidden p-2 rounded-sm text-[var(--dim)] hover:text-[var(--gold)] shrink-0"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="sm:hidden flex flex-col border-t border-[var(--line)] px-4 py-2" style={{ background: 'var(--ink)' }}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={mobileNavLinkClass}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
