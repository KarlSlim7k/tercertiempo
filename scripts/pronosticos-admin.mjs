// Administración del juego de pronósticos (Supabase).
//
//   node scripts/pronosticos-admin.mjs resultados <programa> [jornada-id]
//       Lee public/programas/<programa>/resultados.html, busca los marcadores de los partidos
//       de la jornada y los guarda. Sin jornada-id usa la jornada cuyo programa_resultados = <programa>.
//   node scripts/pronosticos-admin.mjs jornada <archivo.json>
//       Crea o actualiza una jornada y sus partidos (ver scripts/jornada-ejemplo.json).
//   node scripts/pronosticos-admin.mjs reset-pin <jugador>
//       Borra el PIN de un jugador para que cree uno nuevo (pedro | doctor | hector).
//
// Requiere SUPABASE_ADMIN_PIN en .env.local (o en el entorno).
import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { supabase } from '../src/lib/supabase.js'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function cargarEnv() {
  const archivo = resolve(raiz, '.env.local')
  if (!existsSync(archivo)) return
  for (const linea of readFileSync(archivo, 'utf8').split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2]
  }
}
cargarEnv()

const adminPin = process.env.SUPABASE_ADMIN_PIN
if (!adminPin) {
  console.error('Falta SUPABASE_ADMIN_PIN (defínelo en .env.local).')
  process.exit(1)
}

const ALIAS = { galaxy: 'galaxi' }

function normalizar(nombre) {
  const n = nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’'`´]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
  return ALIAS[n] ?? n
}

function decodificar(texto) {
  return texto
    .replace(/&amp;/g, '&')
    .replace(/&#0?39;|&apos;|&rsquo;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, '')
    .trim()
}

function extraerMarcadores(html) {
  const filas = []
  const re =
    /<td class="local">(.*?)<\/td>\s*<td class="score">\s*(\d+)\s*[–—-]\s*(\d+)\s*<\/td>\s*<td class="visitor">(.*?)<\/td>/g
  for (const m of html.matchAll(re)) {
    filas.push({ local: decodificar(m[1]), gl: Number(m[2]), gv: Number(m[3]), visitante: decodificar(m[4]) })
  }
  return filas
}

async function comandoResultados(programa, jornadaId) {
  if (!programa) throw new Error('Uso: resultados <programa> [jornada-id]')
  const archivo = resolve(raiz, 'public', 'programas', String(programa), 'resultados.html')
  if (!existsSync(archivo)) throw new Error(`No existe ${archivo}`)

  let jornada = jornadaId
  if (!jornada) {
    const { data, error } = await supabase
      .from('jornadas')
      .select('id')
      .eq('programa_resultados', Number(programa))
    if (error) throw error
    if (data.length !== 1) {
      throw new Error(`Indica la jornada: hay ${data.length} jornadas con programa_resultados = ${programa}.`)
    }
    jornada = data[0].id
  }

  const { data: partidos, error } = await supabase.from('partidos').select('*').eq('jornada_id', jornada)
  if (error) throw error
  if (partidos.length === 0) throw new Error(`La jornada ${jornada} no tiene partidos.`)

  const marcadores = extraerMarcadores(readFileSync(archivo, 'utf8'))
  const porPareja = new Map(marcadores.map((m) => [`${normalizar(m.local)}|${normalizar(m.visitante)}`, m]))

  let guardados = 0
  const faltan = []
  for (const p of partidos) {
    const m = porPareja.get(`${normalizar(p.local)}|${normalizar(p.visitante)}`)
    if (!m) {
      faltan.push(`${p.local} vs ${p.visitante}`)
      continue
    }
    const { error: err } = await supabase.rpc('admin_guardar_resultado', {
      p_admin_pin: adminPin,
      p_partido: p.id,
      p_gl: m.gl,
      p_gv: m.gv,
    })
    if (err) throw err
    console.log(`  ${p.local} ${m.gl} – ${m.gv} ${p.visitante}`)
    guardados += 1
  }
  console.log(`\n${guardados}/${partidos.length} resultados guardados en ${jornada}.`)
  if (faltan.length) {
    console.log('Sin marcador en el programa (revisa nombres o espera al programa correcto):')
    for (const f of faltan) console.log(`  - ${f}`)
    process.exitCode = 2
  }
}

async function comandoJornada(archivo) {
  if (!archivo) throw new Error('Uso: jornada <archivo.json>')
  const jornada = JSON.parse(readFileSync(resolve(archivo), 'utf8'))
  const { error } = await supabase.rpc('admin_cargar_jornada', { p_admin_pin: adminPin, p_jornada: jornada })
  if (error) throw error
  console.log(`Jornada ${jornada.id} cargada con ${jornada.partidos.length} partidos.`)
}

async function comandoResetPin(jugador) {
  if (!jugador) throw new Error('Uso: reset-pin <jugador>')
  const { error } = await supabase.rpc('admin_reset_pin', { p_admin_pin: adminPin, p_jugador: jugador })
  if (error) throw error
  console.log(`PIN de ${jugador} borrado. Podrá crear uno nuevo al entrar.`)
}

const [, , comando, ...args] = process.argv
try {
  if (comando === 'resultados') await comandoResultados(args[0], args[1])
  else if (comando === 'jornada') await comandoJornada(args[0])
  else if (comando === 'reset-pin') await comandoResetPin(args[0])
  else {
    console.error('Comandos: resultados <programa> [jornada-id] | jornada <archivo.json> | reset-pin <jugador>')
    process.exitCode = 1
  }
} catch (e) {
  console.error('Error:', e.message ?? e)
  process.exitCode = 1
}
process.exit()
