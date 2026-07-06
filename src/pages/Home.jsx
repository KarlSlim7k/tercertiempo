import { Link } from 'react-router-dom'
import { ultimoPrograma } from '../data/programas.js'

export default function Home() {
  const programa = ultimoPrograma()

  return (
    <section className="masthead animate-hero min-h-[calc(100vh-64px)] flex items-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-center w-full">
        <p className="masthead-kicker text-[11px] sm:text-xs mb-3">
          {programa.liga}
        </p>
        <h1 className="masthead-title text-[clamp(34px,6.4vw,76px)]">
          Tercer Tiempo
        </h1>
        <div className="mt-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--dimmer)' }}>
          <span className="hidden sm:inline-block w-12 h-px" style={{ background: 'var(--line)' }} />
          <span>Programa {programa.numero}</span>
          <span className="hidden sm:inline-block w-12 h-px" style={{ background: 'var(--line)' }} />
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <Link to="/ligas" className="programa-card-btn">Ver ligas</Link>
          <Link to="/resultados" className="programa-card-btn">Ver resultados</Link>
          <Link to="/presentaciones" className="programa-card-btn">Ver presentaciones</Link>
        </div>
      </div>
    </section>
  )
}
