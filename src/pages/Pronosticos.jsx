import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { PUNTOS, evaluar, tablaDePuntos, tieneResultado } from '../lib/puntos.js'

const SESION_KEY = 'tercertiempo-pronosticos-sesion'
const ZONA = 'America/Mexico_City'

const panel = { background: 'var(--panel)', border: '1px solid var(--line)' }

function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(SESION_KEY)) || null
  } catch {
    return null
  }
}

function guardarSesion(sesion) {
  try {
    if (sesion) localStorage.setItem(SESION_KEY, JSON.stringify(sesion))
    else localStorage.removeItem(SESION_KEY)
  } catch {
    /* almacenamiento no disponible: la sesión dura solo esta visita */
  }
}

function formatoInicio(iso) {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: ZONA,
  }).format(new Date(iso))
}

function cuentaRegresiva(iso, ahora) {
  const ms = new Date(iso) - ahora
  if (ms <= 0) return null
  const min = Math.floor(ms / 60000)
  const d = Math.floor(min / 1440)
  const h = Math.floor((min % 1440) / 60)
  const m = min % 60
  if (d > 0) return `${d} d ${h} h`
  if (h > 0) return `${h} h ${m} min`
  return `${m} min`
}

function useDatos() {
  const [datos, setDatos] = useState({ jugadores: [], jornadas: [], partidos: [], pronosticos: [] })
  const [estado, setEstado] = useState('cargando') // cargando | listo | error
  const [envivo, setEnvivo] = useState(false)
  const temporizador = useRef(null)

  const cargar = useCallback(async () => {
    const [j, jo, pa, pr] = await Promise.all([
      supabase.from('jugadores').select('*').order('orden'),
      supabase.from('jornadas').select('*').order('creada_en', { ascending: false }),
      supabase.from('partidos').select('*').order('inicio').order('orden'),
      supabase.from('pronosticos').select('*'),
    ])
    const fallo = [j, jo, pa, pr].find((r) => r.error)
    if (fallo) {
      setEstado('error')
      return
    }
    setDatos({ jugadores: j.data, jornadas: jo.data, partidos: pa.data, pronosticos: pr.data })
    setEstado('listo')
  }, [])

  useEffect(() => {
    cargar()
    const refrescar = () => {
      clearTimeout(temporizador.current)
      temporizador.current = setTimeout(cargar, 200)
    }
    const canal = supabase
      .channel('pronosticos-en-vivo')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pronosticos' }, refrescar)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'partidos' }, refrescar)
      .subscribe((s) => setEnvivo(s === 'SUBSCRIBED'))
    return () => {
      clearTimeout(temporizador.current)
      supabase.removeChannel(canal)
    }
  }, [cargar])

  return { ...datos, estado, envivo, recargar: cargar }
}

function Acceso({ jugadores, sesion, onSesion }) {
  const [elegido, setElegido] = useState(null)
  const [tienePin, setTienePin] = useState(null)
  const [pin, setPin] = useState('')
  const [pin2, setPin2] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  const nombreSesion = jugadores.find((j) => j.id === sesion?.jugador)?.nombre

  async function elegir(id) {
    setElegido(id)
    setPin('')
    setPin2('')
    setError('')
    setTienePin(null)
    const { data, error: err } = await supabase.rpc('jugador_tiene_pin', { p_jugador: id })
    if (err) setError('No se pudo consultar. Intenta de nuevo.')
    else setTienePin(Boolean(data))
  }

  async function entrar(e) {
    e.preventDefault()
    setError('')
    setOcupado(true)
    try {
      if (!tienePin) {
        if (pin !== pin2) throw new Error('Los PIN no coinciden.')
        const { error: err } = await supabase.rpc('establecer_pin', { p_jugador: elegido, p_pin: pin })
        if (err) throw new Error(err.message)
      } else {
        const { data, error: err } = await supabase.rpc('verificar_pin', { p_jugador: elegido, p_pin: pin })
        if (err) throw new Error('No se pudo verificar. Intenta de nuevo.')
        if (!data) throw new Error('PIN incorrecto.')
      }
      onSesion({ jugador: elegido, pin })
      setElegido(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setOcupado(false)
    }
  }

  if (sesion) {
    return (
      <div className="rounded-sm p-4 flex items-center justify-between gap-3 flex-wrap" style={panel}>
        <p className="text-sm" style={{ color: 'var(--cream)' }}>
          Juegas como <strong style={{ color: 'var(--gold)' }}>{nombreSesion}</strong>. Captura tus marcadores abajo.
        </p>
        <button type="button" className="programa-card-btn" onClick={() => onSesion(null)}>
          Cerrar sesión
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-sm p-4" style={panel}>
      <p className="text-sm mb-3" style={{ color: 'var(--dim)' }}>
        Elige quién eres para capturar tus pronósticos. Cualquiera puede ver los marcadores de todos.
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

      {elegido && tienePin !== null && (
        <form onSubmit={entrar} className="mt-4 flex flex-wrap items-end gap-3">
          <label className="text-xs" style={{ color: 'var(--dim)' }}>
            {tienePin ? 'Tu PIN' : 'Crea tu PIN (4 a 6 dígitos)'}
            <input
              type="password"
              inputMode="numeric"
              autoComplete={tienePin ? 'current-password' : 'new-password'}
              pattern="[0-9]{4,6}"
              maxLength={6}
              required
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              className="block mt-1 w-32 rounded-sm px-3 py-2 text-base"
              style={{ background: 'var(--ink)', border: '1px solid var(--line-2)', color: 'var(--cream)' }}
            />
          </label>
          {!tienePin && (
            <label className="text-xs" style={{ color: 'var(--dim)' }}>
              Repite el PIN
              <input
                type="password"
                inputMode="numeric"
                autoComplete="new-password"
                pattern="[0-9]{4,6}"
                maxLength={6}
                required
                value={pin2}
                onChange={(e) => setPin2(e.target.value.replace(/\D/g, ''))}
                className="block mt-1 w-32 rounded-sm px-3 py-2 text-base"
                style={{ background: 'var(--ink)', border: '1px solid var(--line-2)', color: 'var(--cream)' }}
              />
            </label>
          )}
          <button type="submit" disabled={ocupado} className="programa-card-btn">
            {ocupado ? 'Verificando…' : tienePin ? 'Entrar' : 'Crear PIN y entrar'}
          </button>
        </form>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm" style={{ color: 'var(--rose)' }}>
          {error}
        </p>
      )}
    </div>
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

function MarcadorInput({ valor, onChange, etiqueta }) {
  return (
    <input
      type="number"
      inputMode="numeric"
      min={0}
      max={99}
      aria-label={etiqueta}
      value={valor}
      onChange={(e) => onChange(e.target.value.slice(0, 2))}
      className="w-14 rounded-sm px-2 py-1.5 text-center text-base"
      style={{ background: 'var(--ink)', border: '1px solid var(--line-2)', color: 'var(--cream)' }}
    />
  )
}

function PartidoCard({ partido, jugadores, pronosticos, sesion, drafts, onDraft, errores, ahora }) {
  const cerrado = ahora >= new Date(partido.inicio)
  const final = tieneResultado(partido)
  const restante = cuentaRegresiva(partido.inicio, ahora)
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
          {final ? 'Final' : cerrado ? 'Cerrado' : `Cierra en ${restante}`}
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
          const propio = sesion?.jugador === j.id
          const editable = propio && !cerrado
          const draft = drafts[partido.id]
          const gl = draft ? draft.gl : (guardado?.goles_local ?? '')
          const gv = draft ? draft.gv : (guardado?.goles_visitante ?? '')
          const r = evaluar(guardado, partido)
          return (
            <li key={j.id} className="flex items-center justify-between gap-3 py-2 rule-bottom last:border-b-0">
              <span className="text-sm" style={{ color: propio ? 'var(--gold)' : 'var(--cream)' }}>
                {j.nombre}
              </span>
              <span className="flex items-center gap-3">
                {editable ? (
                  <span className="flex items-center gap-1.5">
                    <MarcadorInput
                      valor={gl}
                      etiqueta={`Goles de ${partido.local}`}
                      onChange={(v) => onDraft(partido.id, { gl: v, gv })}
                    />
                    <span style={{ color: 'var(--dimmer)' }}>–</span>
                    <MarcadorInput
                      valor={gv}
                      etiqueta={`Goles de ${partido.visitante}`}
                      onChange={(v) => onDraft(partido.id, { gl, gv: v })}
                    />
                  </span>
                ) : guardado ? (
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
      {errores[partido.id] && (
        <p role="alert" className="mt-2 text-xs" style={{ color: 'var(--rose)' }}>
          {errores[partido.id]}
        </p>
      )}
    </article>
  )
}

export default function Pronosticos() {
  const { jugadores, jornadas, partidos, pronosticos, estado, envivo, recargar } = useDatos()
  const [sesion, setSesion] = useState(leerSesion)
  const [jornadaId, setJornadaId] = useState(null)
  const [drafts, setDrafts] = useState({})
  const [errores, setErrores] = useState({})
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [ahora, setAhora] = useState(() => new Date())

  useEffect(() => {
    const t = setInterval(() => setAhora(new Date()), 15000)
    return () => clearInterval(t)
  }, [])

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
    setDrafts({})
    setErrores({})
    setMensaje('')
  }

  function cambiarDraft(partidoId, valor) {
    setDrafts((d) => ({ ...d, [partidoId]: valor }))
    setMensaje('')
  }

  const pendientes = useMemo(() => {
    if (!sesion) return []
    return partidosJornada.filter((p) => {
      const d = drafts[p.id]
      if (!d || ahora >= new Date(p.inicio)) return false
      if (d.gl === '' || d.gv === '') return false
      const g = pronosticos.find((x) => x.partido_id === p.id && x.jugador_id === sesion.jugador)
      return !g || g.goles_local !== Number(d.gl) || g.goles_visitante !== Number(d.gv)
    })
  }, [drafts, partidosJornada, pronosticos, sesion, ahora])

  async function guardarTodo() {
    setGuardando(true)
    setMensaje('')
    const nuevosErrores = {}
    let guardados = 0
    for (const p of pendientes) {
      const d = drafts[p.id]
      const { error } = await supabase.rpc('guardar_pronostico', {
        p_jugador: sesion.jugador,
        p_pin: sesion.pin,
        p_partido: p.id,
        p_gl: Number(d.gl),
        p_gv: Number(d.gv),
      })
      if (error) nuevosErrores[p.id] = error.message
      else guardados += 1
    }
    setErrores(nuevosErrores)
    await recargar()
    setDrafts((d) => {
      const resto = { ...d }
      for (const p of pendientes) if (!nuevosErrores[p.id]) delete resto[p.id]
      return resto
    })
    setMensaje(
      guardados > 0
        ? `Guardado${guardados > 1 ? 's' : ''} ${guardados} pronóstico${guardados > 1 ? 's' : ''}.`
        : 'No se guardó ningún pronóstico.',
    )
    setGuardando(false)
  }

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
                style={{ background: 'var(--ink)', border: '1px solid var(--line-2)', color: 'var(--cream)' }}
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

          <Tabla filas={filas} jornadaNombre={jornadaActual.nombre} />

          {sesion && (
            <div
              className="sticky top-[4.5rem] z-10 rounded-sm p-3 flex items-center justify-between gap-3 flex-wrap"
              style={{ background: 'var(--ink-2)', border: '1px solid var(--line-2)' }}
            >
              <span role="status" className="text-sm" style={{ color: 'var(--dim)' }}>
                {mensaje ||
                  (pendientes.length > 0
                    ? `${pendientes.length} cambio${pendientes.length > 1 ? 's' : ''} sin guardar`
                    : 'Escribe tus marcadores y guarda.')}
              </span>
              <button
                type="button"
                className="programa-card-btn"
                disabled={guardando || pendientes.length === 0}
                onClick={guardarTodo}
              >
                {guardando ? 'Guardando…' : 'Guardar pronósticos'}
              </button>
            </div>
          )}

          <section aria-label="Partidos" className="grid gap-4">
            {partidosJornada.map((p) => (
              <PartidoCard
                key={p.id}
                partido={p}
                jugadores={jugadores}
                pronosticos={pronosticos}
                sesion={sesion}
                drafts={drafts}
                onDraft={cambiarDraft}
                errores={errores}
                ahora={ahora}
              />
            ))}
          </section>
        </div>
      )}
    </main>
  )
}
