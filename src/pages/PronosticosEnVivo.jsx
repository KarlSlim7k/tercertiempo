import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import logoTercerTiempo from '../assets/optimized/logo-tercer-tiempo.png'
import { PUNTOS, evaluar, tablaDePuntos, tieneResultado } from '../lib/puntos.js'
import { formatoCorto, useAhora, useDatos } from '../lib/usePronosticos.js'

// Pantalla para el programa en vivo: solo lectura, sin menú, a pantalla completa y en tiempo real.
// Se abre en /#/pronosticos/envivo (opcional: ?j=<id de jornada>).
const COLUMNAS = '7.5em minmax(0,1fr) 6em minmax(0,1fr) repeat(3, 8.5em)'
const RECIENTE_MS = 10000

function colorCelda(r) {
  if (!r) return { background: 'var(--panel)', color: 'var(--cream)' }
  if (r.exacto) return { background: 'rgba(95,210,139,0.22)', color: 'var(--green)' }
  if (r.acierto) return { background: 'var(--gold-soft)', color: 'var(--gold)' }
  return { background: 'rgba(255,118,118,0.10)', color: 'var(--dimmer)' }
}

function Celda({ pronostico, partido, ahora }) {
  const r = evaluar(pronostico, partido)
  const reciente = pronostico && ahora - new Date(pronostico.actualizado_en) < RECIENTE_MS
  return (
    <div
      key={pronostico ? pronostico.actualizado_en : 'vacio'}
      className={`flex-1 rounded-sm flex flex-col items-center justify-center leading-none ${reciente ? 'pick-flash' : ''}`}
      style={colorCelda(r)}
    >
      <span className="font-bold text-[1.5em]">
        {pronostico ? `${pronostico.goles_local} – ${pronostico.goles_visitante}` : '—'}
      </span>
      {r && <span className="text-[0.6em] mt-[0.25em] opacity-90">+{r.pts}</span>}
    </div>
  )
}

export default function PronosticosEnVivo() {
  const { jugadores, jornadas, partidos, pronosticos, estado, envivo } = useDatos()
  const [params] = useSearchParams()
  const ahora = useAhora(10000)

  const jornada = jornadas.find((j) => j.id === params.get('j')) ?? jornadas[0]
  const partidosJornada = useMemo(
    () => partidos.filter((p) => p.jornada_id === jornada?.id),
    [partidos, jornada],
  )
  const porClave = useMemo(
    () => new Map(pronosticos.map((p) => [`${p.partido_id}:${p.jugador_id}`, p])),
    [pronosticos],
  )
  const marcador = useMemo(() => {
    const deJornada = tablaDePuntos(jugadores, partidosJornada, pronosticos)
    const total = tablaDePuntos(jugadores, partidos, pronosticos)
    return deJornada
      .map((j, i) => ({ ...j, acumulado: total[i].pts }))
      .sort((a, b) => b.pts - a.pts || b.exactos - a.exactos || b.acumulado - a.acumulado)
  }, [jugadores, partidosJornada, partidos, pronosticos])
  const hayPuntos = marcador.some((m) => m.jugados > 0)

  return (
    <main
      className="h-screen overflow-hidden flex flex-col px-[2vw] py-[1.6vh] gap-[1.4vh]"
      style={{ fontSize: 'clamp(11px, 2.1vh, 30px)' }}
    >
      <header className="flex items-stretch justify-between gap-[1.5vw]">
        <div className="flex flex-col justify-center min-w-0">
          <p className="masthead-kicker text-[0.55em]">Tercer Tiempo · Pronósticos</p>
          <h1 className="font-serif font-bold text-[1.7em] leading-tight" style={{ color: 'var(--cream)' }}>
            {jornada ? `${jornada.liga} · ${jornada.nombre}` : 'Pronósticos'}
          </h1>
          <p className="text-[0.6em] flex items-center gap-[0.5em]" style={{ color: envivo ? 'var(--green)' : 'var(--dimmer)' }}>
            <span
              aria-hidden="true"
              className="inline-block rounded-full w-[0.6em] h-[0.6em]"
              style={{ background: envivo ? 'var(--green)' : 'var(--dimmer)' }}
            />
            {envivo ? 'En vivo' : 'Conectando…'}
          </p>
        </div>

        <div className="flex items-stretch gap-[0.8vw]">
          {marcador.map((m, i) => (
            <div
              key={m.jugador.id}
              className="rounded-sm px-[1em] py-[0.4em] flex flex-col justify-center min-w-[8.5em]"
              style={{
                background: 'var(--panel)',
                border: `1px solid ${i === 0 && hayPuntos ? 'var(--gold)' : 'var(--line)'}`,
              }}
            >
              <p className="text-[0.7em] flex justify-between gap-2" style={{ color: 'var(--dim)' }}>
                <span className="font-bold" style={{ color: 'var(--cream)' }}>{m.jugador.nombre}</span>
                {hayPuntos && <span style={{ color: 'var(--gold)' }}>#{i + 1}</span>}
              </p>
              <p className="font-bold text-[2em] leading-none" style={{ color: 'var(--gold)' }}>
                {m.pts}
                <span className="text-[0.35em] font-normal ml-[0.4em]" style={{ color: 'var(--dimmer)' }}>pts</span>
              </p>
              <p className="text-[0.55em]" style={{ color: 'var(--dimmer)' }}>
                Acumulado {m.acumulado} · {m.exactos} exactos
              </p>
            </div>
          ))}
        </div>

        <Link
          to="/pronosticos"
          aria-label="Volver a Pronósticos"
          className="hidden lg:flex bg-white rounded-sm px-[0.6em] items-center shrink-0 self-center py-[0.3em]"
        >
          <img src={logoTercerTiempo} alt="Tercer Tiempo" className="h-[2.6em] w-auto" />
        </Link>
      </header>

      {estado === 'cargando' && <p style={{ color: 'var(--dim)' }}>Cargando…</p>}
      {estado === 'error' && (
        <p role="alert" style={{ color: 'var(--rose)' }}>
          No se pudieron cargar los pronósticos.
        </p>
      )}
      {estado === 'listo' && !jornada && <p style={{ color: 'var(--dim)' }}>Todavía no hay una jornada cargada.</p>}

      {jornada && (
        <section aria-label="Partidos y pronósticos" className="flex-1 min-h-0 flex flex-col gap-[0.7vh] overflow-x-auto">
          <div
            className="grid items-end gap-[0.6em] text-[0.6em] uppercase tracking-[0.15em] px-[0.6em]"
            style={{ gridTemplateColumns: COLUMNAS, color: 'var(--dimmer)' }}
          >
            <span>Hora</span>
            <span />
            <span />
            <span />
            {jugadores.map((j) => (
              <span key={j.id} className="text-center font-bold" style={{ color: 'var(--cream)' }}>
                {j.nombre}
              </span>
            ))}
          </div>

          {partidosJornada.map((p) => {
            const final = tieneResultado(p)
            const cerrado = ahora >= new Date(p.inicio)
            return (
              <div
                key={p.id}
                className="flex-1 min-h-0 grid items-stretch gap-[0.6em] px-[0.6em] rounded-sm"
                style={{ gridTemplateColumns: COLUMNAS, background: 'rgba(255,255,255,0.025)', borderBottom: '1px solid var(--line-soft)' }}
              >
                <div className="flex flex-col justify-center leading-tight">
                  <span className="text-[0.75em] font-bold" style={{ color: 'var(--cream)' }}>{formatoCorto(p.inicio)}</span>
                  <span
                    className="text-[0.55em] uppercase tracking-wider"
                    style={{ color: final ? 'var(--green)' : cerrado ? 'var(--rose)' : 'var(--dimmer)' }}
                  >
                    {final ? 'Final' : cerrado ? 'En juego' : p.campo}
                  </span>
                </div>
                <div className="flex flex-col justify-center text-right leading-tight min-w-0">
                  <span className="font-bold text-[1.2em] truncate" style={{ color: 'var(--cream)' }}>{p.local}</span>
                  <span className="text-[0.55em]" style={{ color: 'var(--dimmer)' }}>{p.pos_local}.º · {p.pts_local} pts</span>
                </div>
                <div className="flex items-center justify-center">
                  <span
                    className="font-bold text-[1.3em] px-[0.5em] py-[0.15em] rounded-sm"
                    style={{ background: 'var(--ink-2)', color: final ? 'var(--gold)' : 'var(--dimmer)' }}
                  >
                    {final ? `${p.goles_local} – ${p.goles_visitante}` : 'vs'}
                  </span>
                </div>
                <div className="flex flex-col justify-center leading-tight min-w-0">
                  <span className="font-bold text-[1.2em] truncate" style={{ color: 'var(--cream)' }}>{p.visitante}</span>
                  <span className="text-[0.55em]" style={{ color: 'var(--dimmer)' }}>{p.pos_visitante}.º · {p.pts_visitante} pts</span>
                </div>
                {jugadores.map((j) => (
                  <div key={j.id} className="py-[0.35em] flex flex-col">
                    <Celda pronostico={porClave.get(`${p.id}:${j.id}`)} partido={p} ahora={ahora} />
                  </div>
                ))}
              </div>
            )
          })}
        </section>
      )}

      <footer className="text-[0.5em] text-center" style={{ color: 'var(--dimmer)' }}>
        Acertar quién gana o el empate: {PUNTOS.resultado} pt · Marcador exacto: +{PUNTOS.exacto} ({PUNTOS.resultado + PUNTOS.exacto} en total)
      </footer>
    </main>
  )
}
