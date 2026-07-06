import { STANDINGS, J29_RESULTS, J29_RESUELTOS } from '../../data/primeraA.js'

function StandingsTable({ teams }) {
  return (
    <table className="w-full border-collapse rounded-md overflow-hidden">
      <thead>
        <tr className="bg-[var(--panel-2)]">
          <th className="text-left text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>#</th>
          <th className="text-left text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Equipo</th>
          <th className="text-center text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>JJ</th>
          <th className="text-center text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Dif</th>
          <th className="text-center text-[11px] uppercase tracking-widest font-bold px-3 py-2.5" style={{ color: 'var(--dimmer)' }}>Pts</th>
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
            <td className="px-3 py-2.5 text-center" style={{ color: 'var(--dim)' }}>{t.jj}</td>
            <td
              className="px-3 py-2.5 text-center font-semibold"
              style={{ color: t.dif == null ? 'var(--dimmer)' : t.dif > 0 ? 'var(--green)' : t.dif < 0 ? 'var(--rose)' : 'var(--dim)' }}
            >
              {t.dif == null ? '—' : (t.dif > 0 ? '+' : '') + t.dif}
            </td>
            <td className="px-3 py-2.5 text-center font-bold" style={{ color: 'var(--cream)' }}>{t.pts ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function PrimeraA() {
  const sorted = [...STANDINGS].sort((a, b) => a.pos - b.pos)
  const left = sorted.filter((t) => t.pos <= 10)
  const right = sorted.filter((t) => t.pos > 10)

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid gap-8">
      <div>
        <p className="masthead-kicker text-[11px] mb-2">Liga</p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold" style={{ color: 'var(--cream)' }}>
          Primera A
        </h1>
        <p className="text-sm mt-1.5" style={{ color: 'var(--dim)' }}>
          Temporada 2026 · Jornada 29
        </p>
      </div>

      <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
        <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)] flex items-baseline justify-between flex-wrap gap-3">
          <div>
            <p className="section-eyebrow mb-1">Clasificación</p>
            <h2 className="section-title text-2xl sm:text-3xl">Tabla general</h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--dimmer)' }}>
            Previa a J-29
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
            <h2 className="section-title text-2xl sm:text-3xl">Jornada 29</h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--dimmer)' }}>
            Primera A
          </span>
        </header>
        <div className="p-5 sm:p-7 overflow-x-auto">
          <table className="w-full border-collapse min-w-[420px]">
            <tbody>
              {J29_RESULTS.map((m, i) => (
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

        <div className="px-5 sm:px-7 pb-6">
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-2" style={{ color: 'var(--dimmer)' }}>
            Resueltos administrativamente (sin marcador)
          </p>
          <ul className="flex flex-wrap gap-2 text-xs">
            {J29_RESUELTOS.map((r, i) => (
              <li key={i} className="px-2.5 py-1 rounded" style={{ background: 'var(--panel-2)', color: 'var(--dim)', border: '1px solid var(--line-soft)' }}>
                <b style={{ color: 'var(--cream)' }}>{r.ganador}</b> gana vs {r.perdedor}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
