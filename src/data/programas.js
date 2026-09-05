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
  {
    numero: 48,
    titulo: 'Programa 48',
    liga: 'Gran Final · Primera Fuerza Especial',
    decks: {
      horarios: 'programas/48/horarios.html',
      resultados: 'programas/48/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 49,
    titulo: 'Programa 49',
    liga: 'Final Ida Fuerza Especial · Primera A · Veteranos 50+ · Liga MX',
    decks: {
      horarios: null,
      resultados: 'programas/49/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 50,
    titulo: 'Programa 50',
    liga: 'Final Vuelta Fuerza Especial · Primera A · Cuartos Veteranos 50+',
    decks: {
      horarios: null,
      resultados: 'programas/50/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 51,
    titulo: 'Programa 51',
    liga: 'Final Fuerza Especial · Resultados Primera A',
    decks: {
      horarios: null,
      resultados: 'programas/51/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 52,
    titulo: 'Programa 52',
    liga: 'Primera Fuerza A J-34 · Resultados de ligas de Perote',
    decks: {
      horarios: 'programas/52/horarios.html',
      resultados: 'programas/52/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 53,
    titulo: 'Programa 53',
    liga: 'Primera Fuerza A · Resultados y tabla provisional J-34',
    decks: {
      horarios: null,
      resultados: 'programas/53/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 54,
    titulo: 'Programa 54',
    liga: 'Arranca Primera Especial · Recta final Primera A',
    decks: {
      horarios: null,
      resultados: 'programas/54/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 55,
    titulo: 'Programa 55',
    liga: 'Resultados J-1 Fuerza Especial · Primera A · Entrevista Rangers',
    decks: {
      horarios: null,
      resultados: 'programas/55/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 56,
    titulo: 'Programa 56',
    liga: 'Entrevista Beto Ortega Rosas · Veteranos 40+ · Fuerza Especial J-2 · Primera A J-36',
    decks: {
      horarios: null,
      resultados: 'programas/56/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 57,
    titulo: 'Programa 57',
    liga: 'Reto Ardilla vs Barbie · Veteranos 40+ · Primera Fuerza Especial J-3 · Primera A J-37',
    decks: {
      horarios: null,
      resultados: 'programas/57/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 58,
    titulo: 'Programa 58',
    liga: 'Correcaminos vs Everton · Veteranos 40+ Gran Final · Primera Fuerza Especial J-1 a J-3 · Primera A J-37',
    decks: {
      horarios: null,
      resultados: 'programas/58/resultados.html',
      analisis: null,
    },
  },
  {
    numero: 59,
    titulo: 'Programa 59',
    liga: 'Rol de juegos · Primera Fuerza Especial J-4 · Pendientes Primera Fuerza A',
    decks: {
      horarios: 'programas/59/horarios.html',
      resultados: null,
      analisis: null,
    },
  },
]

export function ultimoPrograma() {
  return PROGRAMAS.reduce((a, b) => (b.numero > a.numero ? b : a))
}
