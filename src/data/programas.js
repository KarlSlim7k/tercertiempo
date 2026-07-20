// Fuente de verdad de qué programas existen y qué decks tiene cada uno.
// Para agregar un programa nuevo: copiar sus HTML a public/programas/<numero>/
// y agregar un objeto aquí. Un deck ausente (null) oculta su botón en el catálogo.
export const PROGRAMAS = [
  {
    numero: 42,
    titulo: 'Programa 42',
    liga: 'Primera Fuerza Especial · Liga Luis Pirata Fuente',
    decks: {
      horarios: 'programas/42/horarios.html',
      resultados: 'programas/42/resultados.html',
      analisis: 'programas/42/analisis.html',
    },
  },
  {
    numero: 43,
    titulo: 'Programa 43',
    liga: 'Primera Fuerza Especial · Primera A',
    decks: {
      horarios: null,
      resultados: 'programas/43/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 44,
    titulo: 'Programa 44',
    liga: 'Primera Fuerza Especial · Semifinales',
    decks: {
      horarios: null,
      resultados: 'programas/44/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 45,
    titulo: 'Programa 45',
    liga: 'Mundial 2026 · Primera Fuerza Especial · Primera A',
    decks: {
      horarios: null,
      resultados: 'programas/45/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 46,
    titulo: 'Programa 46',
    liga: 'Mundial 2026 · Liga MX · Fuerza Especial · Primera A · Veteranos 50+',
    decks: {
      horarios: null,
      resultados: 'programas/46/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 47,
    titulo: 'Programa 47',
    liga: 'Mundial 2026 · Final Fuerza Especial · Liga MX · Primera A · Veteranos 50+',
    decks: {
      horarios: null,
      resultados: 'programas/47/resultados.html',
      analisis: null,
    },
  },
]

export function ultimoPrograma() {
  return PROGRAMAS.reduce((a, b) => (b.numero > a.numero ? b : a))
}
