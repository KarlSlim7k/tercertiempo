// Reglas de puntos del juego de pronósticos.
// - Acertar el resultado (gana local, empate o gana visitante): 1 punto.
// - Acertar además el marcador exacto: +2 puntos (3 en total).
export const PUNTOS = { resultado: 1, exacto: 2 }

const signo = (a, b) => Math.sign(a - b)

export function tieneResultado(partido) {
  return partido.goles_local != null && partido.goles_visitante != null
}

// Devuelve { pts, acierto, exacto } o null si no hay pronóstico o el partido no tiene resultado.
export function evaluar(pronostico, partido) {
  if (!pronostico || !tieneResultado(partido)) return null
  const exacto =
    pronostico.goles_local === partido.goles_local &&
    pronostico.goles_visitante === partido.goles_visitante
  const acierto =
    signo(pronostico.goles_local, pronostico.goles_visitante) ===
    signo(partido.goles_local, partido.goles_visitante)
  const pts = (acierto ? PUNTOS.resultado : 0) + (exacto ? PUNTOS.exacto : 0)
  return { pts, acierto, exacto }
}

// Acumula puntos por jugador sobre una lista de partidos.
export function tablaDePuntos(jugadores, partidos, pronosticos) {
  const porClave = new Map(pronosticos.map((p) => [`${p.partido_id}:${p.jugador_id}`, p]))
  return jugadores.map((j) => {
    let pts = 0
    let aciertos = 0
    let exactos = 0
    let jugados = 0
    for (const partido of partidos) {
      const r = evaluar(porClave.get(`${partido.id}:${j.id}`), partido)
      if (!r) continue
      jugados += 1
      pts += r.pts
      if (r.acierto) aciertos += 1
      if (r.exacto) exactos += 1
    }
    return { jugador: j, pts, aciertos, exactos, jugados }
  })
}
