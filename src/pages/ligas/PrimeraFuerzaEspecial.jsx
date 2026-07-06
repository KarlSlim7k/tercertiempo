import { STANDINGS_J17, J17_RESULTS, QUARTERFINALS, CUARTOS_RESULTADOS } from '../../data/quarterfinals.js'
import DisclaimerBanner from '../../components/DisclaimerBanner.jsx'
import MatchAnalysis from '../../components/MatchAnalysis.jsx'
import QuarterfinalBracket from '../../components/QuarterfinalBracket.jsx'
import SeasonTrajectory from '../../components/SeasonTrajectory.jsx'
import TeamComparison from '../../components/TeamComparison.jsx'
import HeadToHead from '../../components/HeadToHead.jsx'

function StandingsTable({ teams }) {
  return (
    <table className="w-full border-collapse rounded-md overflow-hidden">
      <thead>
        <tr className="bg-[var(--panel-2)]">
          <th className="text-left text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>#</th>
          <th className="text-left text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Equipo</th>
          <th className="text-center text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Pts</th>
          <th className="text-center text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Dif</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t) => (
          <tr key={t.pos} className="border-t" style={{ borderColor: 'var(--line-soft)' }}>
            <td className="px-3 py-2.5">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded font-bold text-sm"
                style={t.pos === 1
                  ? { background: 'var(--gold)', color: 'var(--ink)' }
                  : { background: 'var(--panel-2)', color: 'var(--cream)', border: '1px solid var(--line)' }}
              >
                {t.pos}
              </span>
            </td>
            <td className="px-3 py-2.5 font-semibold" style={{ color: 'var(--cream)' }}>{t.team}</td>
            <td className="px-3 py-2.5 text-center font-bold" style={{ color: 'var(--cream)' }}>{t.pts}</td>
            <td
              className="px-3 py-2.5 text-center font-semibold"
              style={{ color: t.dif > 0 ? 'var(--green)' : t.dif < 0 ? 'var(--rose)' : 'var(--dim)' }}
            >
              {t.dif > 0 ? '+' : ''}{t.dif}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function PrimeraFuerzaEspecial() {
  const sorted = [...STANDINGS_J17].sort((a, b) => a.pos - b.pos)
  const left = sorted.filter((t) => t.pos <= 9)
  const right = sorted.filter((t) => t.pos > 9)

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8">
      <div>
        <p className="masthead-kicker text-[11px] mb-2">Liga</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: 'var(--cream)' }}>
          Primera Fuerza Especial
        </h1>
        <p className="text-sm mt-1.5" style={{ color: 'var(--dim)' }}>
          Liga Luis Pirata Fuente · Tras Jornada 17 · Cuartos de final (ida y vuelta)
        </p>
      </div>

      <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
        <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)] flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <p className="section-eyebrow mb-1">Clasificación</p>
            <h2 className="section-title text-2xl sm:text-3xl">Tabla general</h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--dimmer)' }}>
            Tras J-17
          </span>
        </header>
        <div className="p-5 sm:p-7 grid gap-4 sm:grid-cols-2">
          <StandingsTable teams={left} />
          <StandingsTable teams={right} />
        </div>
      </section>

      <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
        <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)] flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <p className="section-eyebrow mb-1">Resultados</p>
            <h2 className="section-title text-2xl sm:text-3xl">Jornada 17</h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--dimmer)' }}>
            Primera Fuerza Especial
          </span>
        </header>
        <div className="p-5 sm:p-7 overflow-x-auto">
          <table className="w-full border-collapse min-w-[420px]">
            <tbody>
              {J17_RESULTS.map((m, i) => (
                <tr key={i} className="border-t" style={{ borderColor: 'var(--line-soft)' }}>
                  <td className="px-3 py-3 text-right font-semibold" style={{ color: 'var(--cream)' }}>{m.local}</td>
                  <td className="px-2 py-3 text-center">
                    <span className="font-bold text-lg px-3 py-1 rounded" style={{ background: 'rgba(0,0,0,0.3)', color: 'var(--gold)' }}>
                      {m.gl} – {m.gv}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-left font-semibold" style={{ color: 'var(--cream)' }}>{m.visita}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
        <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)] flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <p className="section-eyebrow mb-1">Liguilla</p>
            <h2 className="section-title text-2xl sm:text-3xl">Cuartos de final · Ida y vuelta</h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--dimmer)' }}>
            Quién avanza a semis
          </span>
        </header>
        <div className="p-5 sm:p-7 overflow-x-auto">
          <table className="w-full border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-[var(--panel-2)]">
                <th className="text-left text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Cruce</th>
                <th className="text-right text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Local</th>
                <th className="text-center text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Ida</th>
                <th className="text-center text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Vuelta</th>
                <th className="text-center text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--gold)' }}>Global</th>
                <th className="text-left text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Visita</th>
                <th className="text-left text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Avanza</th>
              </tr>
            </thead>
            <tbody>
              {QUARTERFINALS.map((qf) => {
                const res = CUARTOS_RESULTADOS[qf.id]
                return (
                  <tr key={qf.id} className="border-t" style={{ borderColor: 'var(--line-soft)' }}>
                    <td className="px-3 py-3">
                      <span
                        className="font-bold text-xs px-2 py-1 rounded"
                        style={{ background: 'var(--gold-soft)', color: 'var(--gold)', border: '1px solid var(--gold-2)' }}
                      >
                        {qf.id}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right font-semibold" style={{ color: 'var(--cream)' }}>{qf.local}</td>
                    <td className="px-3 py-3 text-center" style={{ color: 'var(--dim)' }}>{res.ida.local}-{res.ida.visita}</td>
                    <td className="px-3 py-3 text-center" style={{ color: 'var(--dim)' }}>{res.vuelta.local}-{res.vuelta.visita}</td>
                    <td className="px-3 py-3 text-center font-bold" style={{ color: 'var(--cream)' }}>{res.global.local}-{res.global.visita}</td>
                    <td className="px-3 py-3 text-left font-semibold" style={{ color: 'var(--cream)' }}>{qf.visita}</td>
                    <td className="px-3 py-3 text-left text-xs font-bold uppercase" style={{ color: res.ganador ? 'var(--green)' : 'var(--gold)' }}>
                      {res.ganador ? (res.ganador === 'local' ? qf.local : qf.visita) : 'Pendiente'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div
          className="mx-5 sm:mx-7 mb-6 rounded-md p-4 flex items-start gap-3"
          style={{ background: 'var(--gold-soft)', border: '1px solid var(--gold-2)' }}
        >
          <span className="text-lg shrink-0">⚔️</span>
          <div className="text-sm">
            <p className="font-bold uppercase tracking-wide text-xs mb-0.5" style={{ color: 'var(--gold)' }}>
              CF2 · Halcones 3-3 Sabinal global
            </p>
            <p style={{ color: 'var(--dim)' }}>
              Empate en el marcador global. El desempate está pendiente de confirmación.
            </p>
          </div>
        </div>
      </section>

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
  )
}
