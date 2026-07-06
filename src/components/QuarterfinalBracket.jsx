import { QUARTERFINALS, STANDINGS_J17, TEAM_COLORS, CUARTOS_RESULTADOS } from '../data/quarterfinals.js'

function getTeamColor(name) {
  return TEAM_COLORS[name] || '#1f3a8a'
}

export default function QuarterfinalBracket() {
  return (
    <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
      <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)] flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-bold mb-1">
            Liguilla
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--cream)] leading-tight">
            Cuartos de final
          </h2>
          <p className="text-sm text-[var(--dim)] mt-1.5 max-w-2xl font-serif">
            Resultados de ida y vuelta, y quién avanza a semifinales.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">
          Ida · Vuelta · Global
        </span>
      </header>

      <div className="p-5 sm:p-7 grid gap-4 sm:grid-cols-2">
        {QUARTERFINALS.map((qf) => {
          const local  = STANDINGS_J17[qf.localPos  - 1]
          const visita = STANDINGS_J17[qf.visitaPos - 1]
          const res = CUARTOS_RESULTADOS[qf.id]

          return (
            <article
              key={qf.id}
              className="bg-[var(--panel)] border border-[var(--line)] rounded-md overflow-hidden"
            >
              <div className="px-4 py-2.5 border-b border-[var(--line)] bg-[var(--panel-2)] flex items-center justify-between">
                <span className="font-serif text-[11px] font-bold tracking-[0.2em] text-[var(--dimmer)] uppercase">
                  {qf.id}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">
                  {local.pos}° vs {visitaPos_label(visita.pos)}
                </span>
              </div>

              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-4">
                <TeamSide team={local} align="right" />
                <div className="px-2 text-center">
                  <div className="text-[9px] uppercase tracking-widest text-[var(--dimmer)] font-bold">vs</div>
                  <div className="font-serif text-2xl font-extrabold text-[var(--line-2)] leading-none">×</div>
                </div>
                <TeamSide team={visita} align="left" />
              </div>

              <div className="px-4 py-3 border-t border-[var(--line-soft)] bg-[var(--panel-2)] grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[var(--dimmer)] font-semibold mb-0.5">Ida</p>
                  <p className="font-serif text-sm font-bold text-[var(--dim)]">{res.ida.local}-{res.ida.visita}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[var(--dimmer)] font-semibold mb-0.5">Vuelta</p>
                  <p className="font-serif text-sm font-bold text-[var(--dim)]">{res.vuelta.local}-{res.vuelta.visita}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-[var(--gold)] font-semibold mb-0.5">Global</p>
                  <p className="font-serif text-sm font-bold text-[var(--cream)]">{res.global.local}-{res.global.visita}</p>
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-[var(--line-soft)] text-center">
                {res.ganador ? (
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--green)' }}>
                    Avanza {res.ganador === 'local' ? local.team : visita.team}
                  </p>
                ) : (
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--gold)' }}>
                    Empate global · pendiente desempate
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function visitaPos_label(p) {
  return p + '°'
}

function TeamSide({ team, align }) {
  const isRight = align === 'right'
  return (
    <div className={`min-w-0 ${isRight ? 'text-right' : 'text-left'}`}>
      <div className={`flex items-center gap-2 ${isRight ? 'justify-end' : 'justify-start'}`}>
        {isRight && (
          <span className="font-serif text-base sm:text-lg font-bold text-[var(--cream)] truncate">
            {team.team}
          </span>
        )}
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: getTeamColor(team.team) }}
          aria-hidden
        />
        {!isRight && (
          <span className="font-serif text-base sm:text-lg font-bold text-[var(--cream)] truncate">
            {team.team}
          </span>
        )}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold mt-1">
        {team.pts} pts · {team.dif > 0 ? '+' : ''}{team.dif}
      </div>
    </div>
  )
}
