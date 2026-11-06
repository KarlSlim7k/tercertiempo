import { useCallback, useEffect, useRef, useState } from 'react'
import { supabase } from './supabase.js'

const SESION_KEY = 'tercertiempo-pronosticos-sesion'
export const ZONA = 'America/Mexico_City'

export function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem(SESION_KEY)) || null
  } catch {
    return null
  }
}

export function guardarSesion(sesion) {
  try {
    if (sesion) localStorage.setItem(SESION_KEY, JSON.stringify(sesion))
    else localStorage.removeItem(SESION_KEY)
  } catch {
    /* almacenamiento no disponible: la sesión dura solo esta visita */
  }
}

export function formatoInicio(iso) {
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

// "Dom 08:00"
export function formatoCorto(iso) {
  const partes = new Intl.DateTimeFormat('es-MX', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: ZONA,
  }).formatToParts(new Date(iso))
  const dia = partes.find((p) => p.type === 'weekday')?.value ?? ''
  const hora = partes.find((p) => p.type === 'hour')?.value ?? ''
  const min = partes.find((p) => p.type === 'minute')?.value ?? ''
  return `${dia.charAt(0).toUpperCase()}${dia.slice(1).replace('.', '')} ${hora}:${min}`
}

export function cuentaRegresiva(iso, ahora) {
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

export function useAhora(cadaMs = 15000) {
  const [ahora, setAhora] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setAhora(new Date()), cadaMs)
    return () => clearInterval(t)
  }, [cadaMs])
  return ahora
}

// Carga jugadores, jornadas, partidos y pronósticos, y se mantiene al día por Realtime.
export function useDatos() {
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
    if ([j, jo, pa, pr].some((r) => r.error)) {
      setEstado((e) => (e === 'listo' ? e : 'error'))
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
      .channel(`pronosticos-en-vivo-${Math.random().toString(36).slice(2)}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pronosticos' }, refrescar)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'partidos' }, refrescar)
      .subscribe((s) => setEnvivo(s === 'SUBSCRIBED'))
    // Respaldo por si se corta la conexión en tiempo real (p. ej. la pantalla del programa).
    const respaldo = setInterval(cargar, 30000)
    return () => {
      clearTimeout(temporizador.current)
      clearInterval(respaldo)
      supabase.removeChannel(canal)
    }
  }, [cargar])

  return { ...datos, estado, envivo, recargar: cargar }
}
