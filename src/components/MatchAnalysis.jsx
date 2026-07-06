import { QUARTERFINALS, STANDINGS_J17, MATCH_DEEP_DIVE, TEAM_COLORS } from '../data/quarterfinals.js'

function getTeamColor(name) {
  return TEAM_COLORS[name] || '#1f3a8a'
}

function FormBars({ form }) {
  const items = [
    { kind: 'W', count: form.w, color: 'bg-[var(--green)]', label: 'G' },
    { kind: 'D', count: form.d, color: 'bg-[var(--amber)]',  label: 'E' },
    { kind: 'L', count: form.l, color: 'bg-[var(--rose)]',   label: 'P' },
  ]
  const total = Math.max(1, form.w + form.d + form.l)
  return (
    <div className="space-y-1.5">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[var(--panel-2)]">
        {items.map((it) => it.count > 0 && (
          <div
            key={it.kind}
            className={`${it.color} h-full`}
            style={{ width: `${(it.count / total) * 100}%` }}
            title={`${it.label}: ${it.count}`}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] font-semibold tracking-wider uppercase text-[var(--dimmer)]">
        <span><span className="text-[var(--green)]">{form.w}G</span> · <span className="text-[var(--amber)]">{form.d}E</span> · <span className="text-[var(--rose)]">{form.l}P</span></span>
        <span className="text-[var(--dimmer)]">Últ. 5</span>
      </div>
    </div>
  )
}

function PlayerList({ players }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {players.map((p) => (
        <li
          key={p}
          className="text-xs px-2 py-1 rounded border border-[var(--line)] bg-[var(--panel-2)] text-[var(--dim)] font-medium"
        >
          {p}
        </li>
      ))}
    </ul>
  )
}

function H2HPill({ h2h }) {
  const total = h2h.localWins + h2h.draw + h2h.visitaWins
  return (
    <div className="flex items-stretch w-full max-w-xs mx-auto border border-[var(--line)] rounded-md overflow-hidden bg-[var(--panel)]">
      <div className="flex-1 text-center py-2 border-r border-[var(--line)]">
        <div className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">Local</div>
        <div className="text-2xl font-serif font-bold text-[var(--cream)] leading-none mt-1">{h2h.localWins}</div>
      </div>
      <div className="flex-1 text-center py-2 border-r border-[var(--line)] bg-[var(--panel-2)]">
        <div className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">Empates</div>
        <div className="text-2xl font-serif font-bold text-[var(--dim)] leading-none mt-1">{h2h.draw}</div>
      </div>
      <div className="flex-1 text-center py-2">
        <div className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">Visita</div>
        <div className="text-2xl font-serif font-bold text-[var(--cream)] leading-none mt-1">{h2h.visitaWins}</div>
      </div>
    </div>
  )
}

function MatchCard({ match }) {
  const local  = STANDINGS_J17[match.localPos  - 1]
  const visita = STANDINGS_J17[match.visitaPos - 1]
  const deep   = MATCH_DEEP_DIVE[match.id]

  if (!deep) return null

  return (
    <article className="bg-[var(--panel)] border border-[var(--line)] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <header className="px-5 py-3 border-b border-[var(--line)] flex items-center justify-between bg-[var(--panel-2)]">
        <div className="flex items-center gap-3">
          <span className="font-serif text-xs font-bold tracking-[0.2em] text-[var(--dimmer)] uppercase">
            {match.id} · Cuartos
          </span>
          <span className="hidden sm:inline text-[11px] text-[var(--dimmer)] font-medium">
            Semilla {deep.seed.local} vs {deep.seed.visita}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">
          Torneo regular
        </span>
      </header>

      <div className="px-5 pt-4 pb-2">
        <h3 className="font-serif text-lg sm:text-xl text-[var(--cream)] leading-snug font-semibold">
          {deep.head}
        </h3>
      </div>

      <div className="px-5 py-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-y border-[var(--line-soft)]">
        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <span className="font-serif text-base sm:text-lg font-bold text-[var(--cream)] truncate">
              {local.team}
            </span>
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: getTeamColor(local.team) }}
              aria-hidden
            />
          </div>
          <div className="text-[11px] uppercase tracking-widest text-[var(--dimmer)] font-semibold mt-0.5">
            Pos. {local.pos} · {local.pts} pts · {local.dif > 0 ? '+' : ''}{local.dif}
          </div>
        </div>

        <div className="px-2">
          <div className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-bold text-center">vs</div>
          <div className="font-serif text-2xl font-extrabold text-[var(--line-2)] leading-none text-center">×</div>
        </div>

        <div className="text-left">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ background: getTeamColor(visita.team) }}
              aria-hidden
            />
            <span className="font-serif text-base sm:text-lg font-bold text-[var(--cream)] truncate">
              {visita.team}
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-widest text-[var(--dimmer)] font-semibold mt-0.5">
            Pos. {visita.pos} · {visita.pts} pts · {visita.dif > 0 ? '+' : ''}{visita.dif}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-[var(--line-soft)]">
        <p className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold text-center mb-2">
          Cara a cara · {deep.h2h.text}
        </p>
        <H2HPill h2h={deep.h2h} />
        <p className="text-[11px] text-[var(--dimmer)] text-center mt-2 italic font-serif">
          {deep.h2h.detail}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--line-soft)]">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">
              Jugadores a seguir
            </span>
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: getTeamColor(local.team) }}
            >
              {deep.watch.local.label}
            </span>
          </div>
          <PlayerList players={deep.watch.local.players} />
        </div>

        <div className="px-5 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">
              Jugadores a seguir
            </span>
            <span
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: getTeamColor(visita.team) }}
            >
              {deep.watch.visita.label}
            </span>
          </div>
          <PlayerList players={deep.watch.visita.players} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--line-soft)] border-t border-[var(--line-soft)] bg-[var(--panel-2)]">
        <div className="px-5 py-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold mb-2">
            Forma reciente · {deep.watch.local.label}
          </p>
          <FormBars form={deep.form5.local} />
          <p className="text-[11px] text-[var(--dimmer)] mt-1.5 font-serif italic">{deep.form5.local.detail}</p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold mb-2">
            Forma reciente · {deep.watch.visita.label}
          </p>
          <FormBars form={deep.form5.visita} />
          <p className="text-[11px] text-[var(--dimmer)] mt-1.5 font-serif italic">{deep.form5.visita.detail}</p>
        </div>
      </div>

      <footer className="px-5 py-4 border-t border-[var(--line)] bg-[var(--panel)]">
        <p className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold mb-1">
          La lectura
        </p>
        <p className="font-serif text-[15px] text-[var(--cream)] leading-relaxed">
          {deep.take}
        </p>
      </footer>
    </article>
  )
}

export default function MatchAnalysis() {
  return (
    <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
      <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)] flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-bold mb-1">
            Análisis por enfrentamiento
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--cream)] leading-tight">
            Radiografía de los cuartos
          </h2>
          <p className="text-sm text-[var(--dim)] mt-1.5 max-w-2xl font-serif">
            Jugadores clave, historial directo y momento deportivo de cada llave, según los datos de la jornada 17.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">
          Fuente: Profr. Manuel Leal
        </span>
      </header>

      <div className="p-5 sm:p-7 grid gap-6 md:grid-cols-2">
        {QUARTERFINALS.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </section>
  )
}
