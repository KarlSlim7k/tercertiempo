import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, Check, Loader2, Tv } from 'lucide-react'
import { supabase } from '../lib/supabase.js'
import { PUNTOS, evaluar, tablaDePuntos, tieneResultado } from '../lib/puntos.js'
import {
  cuentaRegresiva,
  formatoInicio,
  guardarSesion,
  leerSesion,
  useAhora,
  useDatos,
} from '../lib/usePronosticos.js'

const panel = { background: 'var(--panel)', border: '1px solid var(--line)' }
const campo = { background: 'var(--ink)', border: '1px solid var(--line-2)', color: 'var(--cream)' }

// Un paso: eliges tu nombre, escribes tu PIN de 4 dígitos y entra solo.
function Acceso({ jugadores, sesion, onSesion }) {
  const [elegido, setElegido] = useState(null)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const entrada = useRef(null)

  const nombreSesion = jugadores.find((j) => j.id === sesion?.jugador)?.nombre

  function elegir(id) {
    setElegido(id)
    setPin('')
    setError('')
    setTimeout(() => entrada.current?.focus(), 0)
  }

  async function probar(valor) {
    setOcupado(true)
    setError('')
    const { data, error: err } = await supabase.rpc('verificar_pin', { p_jugador: elegido, p_pin: valor })
    setOcupado(false)
    if (err || !data) {
      setError(err ? 'No se pudo verificar. Intenta de nuevo.' : 'PIN incorrecto.')
      setPin('')
      setTimeout(() => entrada.current?.focus(), 0)
      return
    }
    onSesion({ jugador: elegido, pin: valor })
    setElegido(null)
    setPin('')
  }

  function cambiarPin(valor) {
    if (ocupado) return
    const limpio = valor.replace(/\D/g, '').slice(0, 4)
    setPin(limpio)
    if (limpio.length === 4) probar(limpio)
  }

  if (sesion) {
    return (
      <div className="rounded-sm p-3 flex items-center justify-between gap-3 flex-wrap" style={panel}>
        <p className="text-sm" style={{ color: 'var(--cream)' }}>
          Juegas como <strong style={{ color: 'var(--gold)' }}>{nombreSesion}</strong>
        </p>
        <button type="button" className="programa-card-btn" onClick={() => onSesion(null)}>
          Cambiar de jugador
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-sm p-4" style={panel}>
      <p className="text-sm mb-3" style={{ color: 'var(--dim)' }}>
        ¿Quién eres? Elige tu nombre y escribe tu PIN.
      </p>
      <div className="flex flex-wrap gap-2">
        {jugadores.map((j) => (
          <button
            key={j.id}
            type="button"
            className="programa-card-btn"
            aria-pressed={elegido === j.id}
            style={elegido === j.id ? { background: 'var(--gold-soft)', color: 'var(--gold)' } : undefined}
            onClick={() => elegir(j.id)}
          >
            {j.nombre}
          </button>
        ))}
      </div>

      {elegido && (
        <div className="mt-4">
          <label className="text-xs block" style={{ color: 'var(--dim)' }}>
            PIN de 4 dígitos
            <input
              ref={entrada}
              type="password"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={4}
              value={pin}
              onChange={(e) => cambiarPin(e.target.value)}
              className="block mt-1 w-32 rounded-sm px-3 py-2 text-xl text-center tracking-[0.5em]"
              style={campo}
            />
          </label>
          {ocupado && (
            <p className="mt-2 text-xs" style={{ color: 'var(--dim)' }}>
              Verificando…
            </p>
          )}
        </div>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm" style={{ color: 'var(--rose)' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function Estado({ estado, mensaje }) {
  if (estado === 'guardando') {
    return <Loader2 size={18} className="animate-spin" style={{ color: 'var(--dim)' }} aria-label="Guardando" />
  }
  if (estado === 'ok') return <Check size={18} style={{ color: 'var(--green)' }} aria-label="Guardado" />
  if (estado === 'error') {
    return <AlertCircle size={18} style={{ color: 'var(--rose)' }} aria-label={mensaje || 'Error al guardar'} />
  }
  return null
}

// Una fila de captura: escribes los dos marcadores y se guarda solo.
function FilaCaptura({ indice, partido, guardado, sesion, ahora }) {
  const cerrado = ahora >= new Date(partido.inicio)
  const [gl, setGl] = useState(guardado ? String(guardado.goles_local) : '')
  const [gv, setGv] = useState(guardado ? String(guardado.goles_visitante) : '')
  const [estado, setEstado] = useState('idle')
  const [mensaje, setMensaje] = useState('')
  const sucio = useRef(false)
  const refGv = useRef(null)

  // Si el pronóstico cambió desde otro dispositivo, se refleja mientras no estés escribiendo.
  useEffect(() => {
    if (sucio.current) return
    setGl(guardado ? String(guardado.goles_local) : '')
    setGv(guardado ? String(guardado.goles_visitante) : '')
  }, [guardado?.goles_local, guardado?.goles_visitante]) // eslint-disable-line react-hooks/exhaustive-deps

  // Autoguardado: medio segundo después de que ambos marcadores están escritos.
  useEffect(() => {
    if (!sucio.current || gl === '' || gv === '' || cerrado) return
    let vigente = true
    setEstado('guardando')
    const t = setTimeout(async () => {
      const { error } = await supabase.rpc('guardar_pronostico', {
        p_jugador: sesion.jugador,
        p_pin: sesion.pin,
        p_partido: partido.id,
        p_gl: Number(gl),
        p_gv: Number(gv),
      })
      if (!vigente) return
      if (error) {
        setEstado('error')
        setMensaje(error.message)
      } else {
        sucio.current = false
        setEstado('ok')
        setMensaje('')
      }
    }, 500)
    return () => {
      vigente = false
      clearTimeout(t)
    }
  }, [gl, gv]) // eslint-disable-line react-hooks/exhaustive-deps

  function cambiarLocal(valor) {
    sucio.current = true
    const d = valor.replace(/\D/g, '').slice(0, 2)
    setGl(d)
    if (d !== '') refGv.current?.focus()
  }

  function cambiarVisitante(valor) {
    sucio.current = true
    const d = valor.replace(/\D/g, '').slice(0, 2)
    setGv(d)
    if (d !== '') {
      document.querySelector(`[data-cap="${indice + 1}-gl"]:not(:disabled)`)?.focus()
    }
  }

  const alSeleccionar = (e) => e.target.select()
  const claseCaja = 'w-12 rounded-sm py-2 text-center text-xl font-bold disabled:opacity-60'

  return (
    <li className="py-3 rule-bottom last:border-b-0">
      <p className="text-[11px] mb-1.5 flex justify-between gap-2" style={{ color: 'var(--dimmer)' }}>
        <span>
          {formatoInicio(partido.inicio)} · {partido.campo}
        </span>
        <span style={{ color: cerrado ? 'var(--rose)' : 'var(--gold)' }}>
          {cerrado ? 'Cerrado' : `Cierra en ${cuentaRegresiva(partido.inicio, ahora)}`}
        </span>
      </p>
      <div className="grid grid-cols-[1fr_auto_1fr_1.5rem] items-center gap-2">
        <span className="text-right text-sm font-bold leading-tight" style={{ color: 'var(--cream)' }}>
          {partido.local}
        </span>
        <span className="flex items-center gap-1.5">
          <input
            data-cap={`${indice}-gl`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            disabled={cerrado}
            aria-label={`Goles de ${partido.local}`}
            value={gl}
            onFocus={alSeleccionar}
            onChange={(e) => cambiarLocal(e.target.value)}
            className={claseCaja}
            style={campo}
          />
          <span style={{ color: 'var(--dimmer)' }}>–</span>
          <input
            ref={refGv}
            data-cap={`${indice}-gv`}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={2}
            disabled={cerrado}
            aria-label={`Goles de ${partido.visitante}`}
            value={gv}
            onFocus={alSeleccionar}
            onChange={(e) => cambiarVisitante(e.target.value)}
            className={claseCaja}
            style={campo}
          />
        </span>
        <span className="text-left text-sm font-bold leading-tight" style={{ color: 'var(--cream)' }}>
          {partido.visitante}
        </span>
        <span role="status" className="flex justify-center">
          <Estado estado={estado} mensaje={mensaje} />
        </span>
      </div>
      {estado === 'error' && mensaje && (
        <p role="alert" className="mt-1 text-xs text-center" style={{ color: 'var(--rose)' }}>
          {mensaje}
        </p>
      )}
    </li>
  )
}

function Captura({ partidos, pronosticos, sesion, jugadores, ahora }) {
  const propios = useMemo(
    () => new Map(pronosticos.filter((p) => p.jugador_id === sesion.jugador).map((p) => [p.partido_id, p])),
    [pronosticos, sesion.jugador],
  )
  const abiertos = partidos.filter((p) => ahora < new Date(p.inicio))
  const capturados = abiertos.filter((p) => propios.has(p.id)).length
  const nombre = jugadores.find((j) => j.id === sesion.jugador)?.nombre

  return (
    <section aria-label="Mis pronósticos" className="rounded-sm p-4" style={panel}>
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h2 className="font-serif text-xl font-bold" style={{ color: 'var(--cream)' }}>
          Pronósticos de {nombre}
        </h2>
        <span className="text-xs" style={{ color: abiertos.length === capturados ? 'var(--green)' : 'var(--dim)' }}>
          {abiertos.length === 0
            ? 'Jornada cerrada'
            : abiertos.length === capturados
              ? 'Listo: capturaste todos los partidos abiertos'
              : `Llevas ${capturados} de ${abiertos.length} partidos abiertos`}
        </span>
      </div>
      <p className="mt-1 text-xs" style={{ color: 'var(--dimmer)' }}>
        Escribe el marcador y se guarda solo. Puedes cambiarlo hasta que empiece el partido.
      </p>
      <ul className="mt-2">
        {partidos.map((p, i) => (
          <FilaCaptura
            key={p.id}
            indice={i}
            partido={p}
            guardado={propios.get(p.id)}
            sesion={sesion}
            ahora={ahora}
          />
        ))}
      </ul>
    </section>
  )
}

function Tabla({ filas, jornadaNombre }) {
  const orden = [...filas].sort(
    (a, b) => b.jornada.pts - a.jornada.pts || b.total.pts - a.total.pts || b.jornada.exactos - a.jornada.exactos,
  )
  return (
    <section aria-label="Clasificación">
      <div className="grid gap-3 sm:grid-cols-3">
        {orden.map((f, i) => (
          <div key={f.jornada.jugador.id} className="rounded-sm p-4" style={panel}>
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif text-lg font-bold" style={{ color: 'var(--cream)' }}>
                {f.jornada.jugador.nombre}
              </h3>
              <span className="font-disp text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--gold)' }}>
                #{i + 1}
              </span>
            </div>
            <p className="mt-2 text-4xl font-bold" style={{ color: 'var(--gold)' }}>
              {f.jornada.pts}
              <span className="text-sm font-normal ml-1" style={{ color: 'var(--dimmer)' }}>
                pts · {jornadaNombre}
              </span>
            </p>
            <p className="mt-1 text-xs" style={{ color: 'var(--dim)' }}>
              {f.jornada.aciertos} aciertos · {f.jornada.exactos} exactos
            </p>
            <p className="mt-2 text-xs rule-top pt-2" style={{ color: 'var(--dimmer)' }}>
              Acumulado: <strong style={{ color: 'var(--cream)' }}>{f.total.pts} pts</strong>
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs" style={{ color: 'var(--dimmer)' }}>
        Acertar quién gana o el empate vale {PUNTOS.resultado} pt; clavar el marcador exacto suma {PUNTOS.exacto} más
        ({PUNTOS.resultado + PUNTOS.exacto} en total).
      </p>
    </section>
  )
}

function PartidoCard({ partido, jugadores, pronosticos, sesion, ahora }) {
  const cerrado = ahora >= new Date(partido.inicio)
  const final = tieneResultado(partido)
  const porJugador = new Map(pronosticos.filter((p) => p.partido_id === partido.id).map((p) => [p.jugador_id, p]))

  return (
    <article className="rounded-sm p-4" style={panel}>
      <div className="flex items-center justify-between gap-2 flex-wrap text-xs" style={{ color: 'var(--dim)' }}>
        <span>
          {formatoInicio(partido.inicio)} · {partido.campo}
        </span>
        <span
          className="font-disp uppercase tracking-[0.15em]"
          style={{ color: final ? 'var(--green)' : cerrado ? 'var(--rose)' : 'var(--gold)' }}
        >
          {final ? 'Final' : cerrado ? 'Cerrado' : `Cierra en ${cuentaRegresiva(partido.inicio, ahora)}`}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="text-right">
          <p className="font-bold" style={{ color: 'var(--cream)' }}>{partido.local}</p>
          <p className="text-[11px]" style={{ color: 'var(--dimmer)' }}>
            {partido.pos_local}.º · {partido.pts_local} pts
          </p>
        </div>
        <div
          className="font-bold text-xl px-3 py-1 rounded-sm min-w-[4.5rem] text-center"
          style={{ background: 'var(--ink-2)', color: final ? 'var(--gold)' : 'var(--dimmer)' }}
        >
          {final ? `${partido.goles_local} – ${partido.goles_visitante}` : 'vs'}
        </div>
        <div>
          <p className="font-bold" style={{ color: 'var(--cream)' }}>{partido.visitante}</p>
          <p className="text-[11px]" style={{ color: 'var(--dimmer)' }}>
            {partido.pos_visitante}.º · {partido.pts_visitante} pts
          </p>
        </div>
      </div>

      <ul className="mt-4 rule-top">
        {jugadores.map((j) => {
          const guardado = porJugador.get(j.id)
          const r = evaluar(guardado, partido)
          return (
            <li key={j.id} className="flex items-center justify-between gap-3 py-2 rule-bottom last:border-b-0">
              <span className="text-sm" style={{ color: sesion?.jugador === j.id ? 'var(--gold)' : 'var(--cream)' }}>
                {j.nombre}
              </span>
              <span className="flex items-center gap-3">
                {guardado ? (
                  <span className="font-bold" style={{ color: 'var(--cream)' }}>
                    {guardado.goles_local} – {guardado.goles_visitante}
                  </span>
                ) : (
                  <span className="text-sm" style={{ color: 'var(--dimmer)' }}>
                    {cerrado ? 'Sin pronóstico' : 'Pendiente'}
                  </span>
                )}
                {r && (
                  <span
                    className="text-xs font-bold rounded-sm px-2 py-1 min-w-[3.25rem] text-center"
                    style={{
                      background: r.pts > 0 ? 'var(--gold-soft)' : 'var(--panel-2)',
                      color: r.exacto ? 'var(--green)' : r.pts > 0 ? 'var(--gold)' : 'var(--dimmer)',
                    }}
                  >
                    +{r.pts} pt{r.pts === 1 ? '' : 's'}
                  </span>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default function Pronosticos() {
  const { jugadores, jornadas, partidos, pronosticos, estado, envivo } = useDatos()
  const [sesion, setSesion] = useState(leerSesion)
  const [jornadaId, setJornadaId] = useState(null)
  const ahora = useAhora(15000)

  // Valida la sesión guardada (por si cambió el PIN) al abrir la página.
  useEffect(() => {
    const s = leerSesion()
    if (!s) return
    supabase.rpc('verificar_pin', { p_jugador: s.jugador, p_pin: s.pin }).then(({ data, error }) => {
      if (!error && !data) {
        guardarSesion(null)
        setSesion(null)
      }
    })
  }, [])

  const jornadaActual = jornadas.find((j) => j.id === jornadaId) ?? jornadas[0]

  const partidosJornada = useMemo(
    () => partidos.filter((p) => p.jornada_id === jornadaActual?.id),
    [partidos, jornadaActual],
  )

  const filas = useMemo(() => {
    const jornada = tablaDePuntos(jugadores, partidosJornada, pronosticos)
    const total = tablaDePuntos(jugadores, partidos, pronosticos)
    return jornada.map((j, i) => ({ jornada: j, total: total[i] }))
  }, [jugadores, partidosJornada, partidos, pronosticos])

  function cambiarSesion(nueva) {
    guardarSesion(nueva)
    setSesion(nueva)
  }

  const enlaceVivo = jornadaActual ? `/pronosticos/envivo?j=${jornadaActual.id}` : '/pronosticos/envivo'

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
        <p className="masthead-kicker text-[11px]">Pedro · Doctor · Héctor</p>
        <span className="text-xs flex items-center gap-1.5" style={{ color: envivo ? 'var(--green)' : 'var(--dimmer)' }}>
          <span
            aria-hidden="true"
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: envivo ? 'var(--green)' : 'var(--dimmer)' }}
          />
          {envivo ? 'En vivo' : 'Conectando…'}
        </span>
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-1" style={{ color: 'var(--cream)' }}>
        Pronósticos
      </h1>
      {jornadaActual && (
        <p className="mb-6 text-sm" style={{ color: 'var(--dim)' }}>
          {jornadaActual.liga} · {jornadaActual.nombre}
          {jornadaActual.programa_resultados ? ` · resultados en el Programa ${jornadaActual.programa_resultados}` : ''}
        </p>
      )}

      {estado === 'cargando' && <p style={{ color: 'var(--dim)' }}>Cargando…</p>}
      {estado === 'error' && (
        <p role="alert" style={{ color: 'var(--rose)' }}>
          No se pudieron cargar los pronósticos. Revisa tu conexión e intenta de nuevo.
        </p>
      )}

      {estado === 'listo' && !jornadaActual && (
        <p style={{ color: 'var(--dim)' }}>Todavía no hay una jornada cargada.</p>
      )}

      {estado === 'listo' && jornadaActual && (
        <div className="space-y-6">
          {jornadas.length > 1 && (
            <label className="block text-xs" style={{ color: 'var(--dim)' }}>
              Jornada
              <select
                value={jornadaActual.id}
                onChange={(e) => setJornadaId(e.target.value)}
                className="block mt-1 rounded-sm px-3 py-2 text-base"
                style={campo}
              >
                {jornadas.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.liga} · {j.nombre}
                  </option>
                ))}
              </select>
            </label>
          )}

          <Acceso jugadores={jugadores} sesion={sesion} onSesion={cambiarSesion} />

          {sesion && (
            <Captura
              partidos={partidosJornada}
              pronosticos={pronosticos}
              sesion={sesion}
              jugadores={jugadores}
              ahora={ahora}
            />
          )}

          <Tabla filas={filas} jornadaNombre={jornadaActual.nombre} />

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <h2 className="font-serif text-xl font-bold" style={{ color: 'var(--cream)' }}>
              Todos los pronósticos
            </h2>
            <Link to={enlaceVivo} className="programa-card-btn inline-flex items-center gap-2">
              <Tv size={16} aria-hidden="true" /> Pantalla para el programa
            </Link>
          </div>

          <section aria-label="Partidos" className="grid gap-4">
            {partidosJornada.map((p) => (
              <PartidoCard
                key={p.id}
                partido={p}
                jugadores={jugadores}
                pronosticos={pronosticos}
                sesion={sesion}
                ahora={ahora}
              />
            ))}
          </section>
        </div>
      )}
    </main>
  )
}
