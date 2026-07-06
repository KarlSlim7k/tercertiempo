import { Link } from 'react-router-dom'
import DisclaimerBanner from '../components/DisclaimerBanner.jsx'
import MatchAnalysis from '../components/MatchAnalysis.jsx'
import QuarterfinalBracket from '../components/QuarterfinalBracket.jsx'
import SeasonTrajectory from '../components/SeasonTrajectory.jsx'
import TeamComparison from '../components/TeamComparison.jsx'
import HeadToHead from '../components/HeadToHead.jsx'
import { ultimoPrograma } from '../data/programas.js'

export default function Home() {
  const programa = ultimoPrograma()

  return (
    <>
      <section className="masthead animate-hero">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6 text-center">
          <p className="masthead-kicker text-[11px] sm:text-xs mb-3">
            Primera Fuerza Especial · Liga Luis Pirata Fuente
          </p>
          <h1 className="masthead-title text-[clamp(34px,6.4vw,76px)]">
            Tercer Tiempo
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--dimmer)' }}>
            <span className="hidden sm:inline-block w-12 h-px" style={{ background: 'var(--line)' }} />
            <span>Programa {programa.numero} · Cuartos de final</span>
            <span className="hidden sm:inline-block w-12 h-px" style={{ background: 'var(--line)' }} />
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link to="/resultados" className="programa-card-btn">Ver resultados</Link>
            <Link to="/presentaciones" className="programa-card-btn">Ver presentaciones</Link>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8">
        <DisclaimerBanner />

        <div>
          <p className="masthead-kicker text-[11px] mb-3">Análisis en vivo</p>
          <div className="grid gap-8">
            <MatchAnalysis />
            <QuarterfinalBracket />
            <SeasonTrajectory />
            <TeamComparison />
            <HeadToHead />
          </div>
        </div>
      </main>
    </>
  )
}
