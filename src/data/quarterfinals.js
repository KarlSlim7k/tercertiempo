/* ===========================================================
   Datos y análisis · Cuartos de Final · Primera Fuerza Especial
   =========================================================== */

// ---- J17 (app.js) ----
export const STANDINGS_J17 = [
  { pos: 1,  team: "Molinos",       pts: 44, dif:  40 },
  { pos: 2,  team: "Halcones",      pts: 42, dif:  36 },
  { pos: 3,  team: "Red Bull",      pts: 37, dif:  31 },
  { pos: 4,  team: "Liverpool",     pts: 37, dif:  23 },
  { pos: 5,  team: "Arsenal",       pts: 32, dif:  14 },
  { pos: 6,  team: "Ranger's",      pts: 31, dif:  13 },
  { pos: 7,  team: "Sabinal",       pts: 30, dif:  15 },
  { pos: 8,  team: "Micheleros",    pts: 29, dif:   8 },
  { pos: 9,  team: "Real Victoria", pts: 23, dif:  -4 },
  { pos: 10, team: "Sor Juana",     pts: 22, dif:   5 },
  { pos: 11, team: "Felinos",       pts: 18, dif: -13 },
  { pos: 12, team: "Union Victoria",pts: 17, dif: -22 },
  { pos: 13, team: "Manchester",    pts: 17, dif: -11 },
  { pos: 14, team: "Aferrados",     pts: 15, dif:  -6 },
  { pos: 15, team: "Pinochos",      pts: 13, dif: -26 },
  { pos: 16, team: "Guerrero F.C.", pts: 10, dif: -24 },
  { pos: 17, team: "Bad's",         pts: 10, dif: -30 },
  { pos: 18, team: "Tiburones",     pts:  9, dif: -30 },
]

// ---- Cuartos de Final ----
export const QUARTERFINALS = [
  { id: "CF1", local: "Molinos",    visita: "Micheleros",   localPos: 1, visitaPos: 8 },
  { id: "CF2", local: "Halcones",   visita: "Sabinal",      localPos: 2, visitaPos: 7 },
  { id: "CF3", local: "Red Bull",   visita: "Ranger's",     localPos: 3, visitaPos: 6 },
  { id: "CF4", local: "Liverpool",  visita: "Arsenal",      localPos: 4, visitaPos: 5 },
]

// ---- Historial de puntajes a través del torneo ----
// Datos extraídos de las imágenes: P6, P7, P8, P9, P11, P13, P15 + J17
export const SEASON_JOURNEYS = [
  { jornada: 6,  label: "J-6" },
  { jornada: 7,  label: "J-7" },
  { jornada: 8,  label: "J-8" },
  { jornada: 9,  label: "J-9" },
  { jornada: 11, label: "J-11" },
  { jornada: 13, label: "J-13" },
  { jornada: 15, label: "J-15" },
  { jornada: 17, label: "J-17" },
]

// Puntos por equipo por jornada (para la gráfica de trayectoria)
export const TEAM_POINTS_TRAJECTORY = {
  "Molinos":       { 6:13, 7:16, 8:19, 9:22, 11:28, 13:34, 15:40, 17:44 },
  "Halcones":      { 6:14, 7:17, 8:20, 9:23, 11:29, 13:32, 15:35, 17:42 },
  "Red Bull":      { 6:15, 7:18, 8:19, 9:22, 11:25, 13:29, 15:30, 17:37 },
  "Liverpool":     { 6:12, 7:15, 8:15, 9:18, 11:21, 13:25, 15:31, 17:37 },
  "Arsenal":       { 6:12, 7:13, 8:16, 9:19, 11:25, 13:26, 15:29, 17:32 },
  "Ranger's":      { 6:13, 7:16, 8:16, 9:17, 11:23, 13:26, 15:30, 17:31 },
  "Sabinal":       { 6:7,  7:7,  8:10, 9:10, 11:16, 13:22, 15:26, 17:30 },
  "Micheleros":    { 6:7,  7:8,  8:11, 9:14, 11:23, 13:25, 15:26, 17:29 },
  "Real Victoria": { 6:12, 7:13, 8:13, 9:13, 11:19, 13:22, 15:23, 17:23 },
  "Sor Juana":     { 6:3,  7:9,  8:12, 9:15, 11:12, 13:16, 15:19, 17:22 },
  "Felinos":       { 6:7,  7:7,  8:8,  9:8,  11:11, 13:11, 15:12, 17:18 },
  "Union Victoria":{ 6:4,  7:4,  8:4,  9:7,  11:10, 13:16, 15:16, 17:17 },
  "Manchester":    { 6:7,  7:7,  8:10, 9:10, 11:10, 13:12, 15:16, 17:17 },
  "Aferrados":     { 6:6,  7:7,  8:10, 9:11, 11:11, 13:11, 15:15, 17:15 },
  "Pinochos":      { 6:3,  7:3,  8:3,  9:3,  11:3,  13:6,  15:10, 17:13 },
  "Guerrero F.C.": { 6:7,  7:10, 8:10, 9:10, 11:10, 13:10, 15:10, 17:10 },
  "Bad's":         { 6:5,  7:5,  8:5,  9:5,  11:5,  13:8,  15:9,  17:10 },
  "Tiburones":     { 6:3,  7:6,  8:6,  9:6,  11:6,  13:6,  15:6,  17:9 },
}

// Diferencia de goles por equipo por jornada
export const TEAM_DIF_TRAJECTORY = {
  "Molinos":       { 6:5, 7:8, 8:12, 9:13, 11:20, 13:27, 15:37, 17:40 },
  "Halcones":      { 6:9, 7:14, 8:16, 9:20, 11:28, 13:28, 15:33, 17:36 },
  "Red Bull":      { 6:13, 7:18, 8:18, 9:23, 11:25, 13:26, 15:25, 17:31 },
  "Liverpool":     { 6:5, 7:8, 8:7, 9:11, 11:10, 13:14, 15:18, 17:23 },
  "Arsenal":       { 6:5, 7:5, 8:8, 9:9, 11:14, 13:10, 15:8, 17:14 },
  "Ranger's":      { 6:6, 7:11, 8:8, 9:8, 11:13, 13:13, 15:14, 17:13 },
  "Sabinal":       { 6:0, 7:-2, 8:1, 9:0, 11:6, 13:12, 15:13, 17:15 },
  "Micheleros":    { 6:-1, 7:-2, 8:1, 9:3, 11:8, 13:8, 15:6, 17:8 },
  "Real Victoria": { 6:7, 7:7, 8:5, 9:3, 11:6, 13:2, 15:1, 17:-4 },
}

// --- Análisis de ofensiva/defensa (P6 al P11 tenemos datos detallados) ---
export const TEAM_OD_RATIO = {
  "Molinos":    { P6: { gf:13,gc:8, ratio:1.6 }, P7: { gf:16,gc:8, ratio:2.0 }, P8: { gf:21,gc:9, ratio:2.3 }, P9: { gf:22,gc:9, ratio:2.4 }, P11: { gf:29,gc:9, ratio:3.2 } },
  "Halcones":   { P6: { gf:18,gc:9, ratio:2.0 }, P7: { gf:24,gc:10,ratio:2.4 }, P8: { gf:26,gc:10,ratio:2.6 }, P9: { gf:30,gc:10,ratio:3.0 }, P11: { gf:40,gc:12,ratio:3.3 } },
  "Red Bull":   { P6: { gf:17,gc:4, ratio:4.2 }, P7: { gf:23,gc:5, ratio:4.6 }, P8: { gf:23,gc:5, ratio:4.6 }, P9: { gf:28,gc:5, ratio:5.6 }, P11: { gf:32,gc:7, ratio:4.6 } },
  "Liverpool":  { P6: { gf:17,gc:12,ratio:1.4 }, P7: { gf:21,gc:13,ratio:1.6 }, P8: { gf:22,gc:15,ratio:1.5 }, P9: { gf:26,gc:15,ratio:1.7 }, P11: { gf:27,gc:17,ratio:1.6 } },
  "Arsenal":    { P6: { gf:11,gc:6, ratio:1.8 }, P7: { gf:13,gc:8, ratio:1.6 }, P8: { gf:17,gc:9, ratio:1.9 }, P9: { gf:18,gc:9, ratio:2.0 }, P11: { gf:24,gc:10,ratio:2.4 } },
  "Ranger's":   { P6: { gf:12,gc:6, ratio:2.0 }, P7: { gf:17,gc:6, ratio:2.8 }, P8: { gf:17,gc:9, ratio:1.9 }, P9: { gf:18,gc:10,ratio:1.8 }, P11: { gf:24,gc:11,ratio:2.2 } },
  "Sabinal":    { P6: { gf:14,gc:14,ratio:1.0 }, P7: { gf:14,gc:16,ratio:0.9 }, P8: { gf:17,gc:16,ratio:1.1 }, P9: { gf:17,gc:17,ratio:1.0 }, P11: { gf:25,gc:19,ratio:1.3 } },
  "Micheleros": { P6: { gf:8,gc:9, ratio:0.9 }, P7: { gf:10,gc:12,ratio:0.8 }, P8: { gf:13,gc:12,ratio:1.1 }, P9: { gf:17,gc:14,ratio:1.2 }, P11: { gf:20,gc:12,ratio:1.7 } },
}

// ---- Cuartos de Final · Resultados (ida + vuelta + global) ----
// local/visita siguen la misma convención de semilla que QUARTERFINALS
// (local = semilla más alta), no necesariamente quién fungió como local
// en la cancha esa fecha. Ida: programa 42 (resultados.html). Vuelta:
// planilla oficial entregada tras la fecha.
export const CUARTOS_RESULTADOS = {
  CF1: {
    ida:    { local: 3, visita: 0 },
    vuelta: { local: 1, visita: 0 },
    global: { local: 4, visita: 0 },
    ganador: 'local', // Molinos
  },
  CF2: {
    ida:    { local: 1, visita: 2 },
    vuelta: { local: 2, visita: 1 },
    global: { local: 3, visita: 3 },
    ganador: null, // Halcones 3-3 Sabinal, empate global · pendiente desempate
  },
  CF3: {
    ida:    { local: 2, visita: 1 },
    vuelta: { local: 4, visita: 2 },
    global: { local: 6, visita: 3 },
    ganador: 'local', // Red Bull
  },
  CF4: {
    ida:    { local: 1, visita: 2 },
    vuelta: { local: 0, visita: 1 },
    global: { local: 1, visita: 3 },
    ganador: 'visita', // Arsenal
  },
}

// ---- Cuartos de Final · Partidos de IDA (calendario oficial) ----
export const QUARTERS_IDA = [
  { id: "CF1", local: "Micheleros", visita: "Molinos",     hora: "12:00", campo: "Bachiller",     dia: "Dom" },
  { id: "CF2", local: "Sabinal",    visita: "Halcones",    hora: "10:00", campo: "Sabinal",       dia: "Dom" },
  { id: "CF3", local: "Ranger's",   visita: "Red Bull's",  hora: "8:00",  campo: "Libertad",      dia: "Dom" },
  { id: "CF4", local: "Arsenal",    visita: "Liverpool",   hora: "8:00",  campo: "Fco. I Madero", dia: "Dom" },
]

export const J17_RESULTS = [
  { local: "Halcones",      gl: 3, gv: 2, visita: "Micheleros" },
  { local: "Liverpool",     gl: 2, gv: 1, visita: "Ranger's" },
  { local: "Guerreros",     gl: 1, gv: 3, visita: "Sabinal" },
  { local: "R. Victoria",   gl: 1, gv: 4, visita: "Pinochos" },
  { local: "Red Bull",      gl: 2, gv: 0, visita: "Sor Juana" },
  { local: "Arsenal",       gl: 3, gv: 0, visita: "U. Victoria" },
  { local: "Manchester",    gl: 0, gv: 3, visita: "Molinos" },
  { local: "Bad's",         gl: 2, gv: 3, visita: "Tiburones" },
  { local: "Felinos",       gl: 1, gv: 0, visita: "Aferrados" },
]

// ---- helpers ----
export function getTeamData(teamName) {
  const key = teamName.toLowerCase()
  return STANDINGS_J17.find(t => t.team.toLowerCase() === key)
}

// ---- Análisis por partido (extraído de "ANALISIS CUARTOS.pdf") ----
export const MATCH_DEEP_DIVE = {
  CF1: {
    seed: { local: 1, visita: 8 },
    head: "El líder recibe al octavo en una llave con pronóstico claro.",
    h2h: { text: "Torneo regular", localWins: 0, draw: 0, visitaWins: 1, detail: "Molinos 0 – 1 Micheleros" },
    watch: {
      local:  { label: "Molinos",   players: ["Misa", "Puchis", "El Chino", "Perico", "Kalé", "Victor"] },
      visita: { label: "Micheleros",players: ["Ismael", "Kevin", "Benjamin", "Jose Luis", "Daniel"] },
    },
    form5: {
      local:   { w: 4, d: 1, l: 0, detail: "4G (2L, 2V) · 1E (V)" },
      visita:  { w: 1, d: 2, l: 2, detail: "1G (L) · 2E (L) · 2D (V)" },
    },
    take: "Molinos sostiene el mejor diferencial del torneo (+40) y una defensa casi impenetrable. Micheleros necesita convertir su media tabla en una fortaleza ofensiva para sorprender.",
  },
  CF2: {
    seed: { local: 2, visita: 7 },
    head: "Duelo de estilos: el segundo mejor ataque contra la revelación de la segunda vuelta.",
    h2h: { text: "Torneo regular", localWins: 1, draw: 1, visitaWins: 1, detail: "Halcones 1 – 1 Sabinal" },
    watch: {
      local:  { label: "Halcones",  players: ["Daniel", "Rafa", "Karol", "Willebaldo", "Argenol"] },
      visita: { label: "Sabinal",   players: ["Alex Loeza", "Chucho Apolinar", "La Chona", "El Conejito", "Litros"] },
    },
    form5: {
      local:   { w: 4, d: 1, l: 0, detail: "4G (L) · 1E (V)" },
      visita:  { w: 3, d: 2, l: 0, detail: "3G (2V, 1L) · 2E (1L, 1V)" },
    },
    take: "Halcones tiene el segundo mejor registro general, pero Sabinal llega invicto en sus últimos cinco y con la mejor racha del torneo. Duelo táctico de poder a poder.",
  },
  CF3: {
    seed: { local: 3, visita: 6 },
    head: "Un clásico moderno: la mejor defensa contra el equipo más disciplinado.",
    h2h: { text: "Torneo regular", localWins: 2, draw: 0, visitaWins: 1, detail: "Red Bull 2 – 1 Ranger's" },
    watch: {
      local:  { label: "Red Bull",  players: ["Kikin", "Ulises", "Tyson", "Tuca", "Frank"] },
      visita: { label: "Ranger's",  players: ["Toti", "Miguel", "Adame", "Luis"] },
    },
    form5: {
      local:   { w: 4, d: 1, l: 0, detail: "4G (2L, 2V) · 1E (V)" },
      visita:  { w: 1, d: 2, l: 2, detail: "1G (L) · 2E (L) · 2D (V)" },
    },
    take: "Red Bull ostenta la mejor defensiva del campeonato. Ranger's es ordenado y peligroso a balón parado. La llave más pareja de los cuartos.",
  },
  CF4: {
    seed: { local: 4, visita: 5 },
    head: "Derbi de la parte alta: mejor momento ofensivo contra solidez táctica.",
    h2h: { text: "Torneo regular", localWins: 0, draw: 0, visitaWins: 2, detail: "Liverpool 0 – 2 Arsenal" },
    watch: {
      local:  { label: "Liverpool", players: ["Maizero", "Andrés", "Galgo", "Bruno", "Braulio"] },
      visita: { label: "Arsenal",   players: ["Pollito"] },
    },
    form5: {
      local:   { w: 4, d: 1, l: 0, detail: "4G (3L, 1V) · 1E (V)" },
      visita:  { w: 2, d: 0, l: 3, detail: "2G (L) · 3P (1L, 2V)" },
    },
    take: "Liverpool llega con cuatro victorias al hilo y la mejor racha reciente. Arsenal, sin embargo, ya venció a los Rojos en el torneo regular. Historia reciente a favor de la visita.",
  },
}

// ---- Análisis generado por IA ----
export const ANALYSIS_INSIGHTS = {
  molinos_vs_micheleros: {
    resumen: "El líder indiscutible (44 pts, +40) enfrenta al 8vo clasificado. Molinos ha mantenido una consistencia casi perfecta con una remontada espectacular desde la J-11 donde despegó. Micheleros, aunque octavo, tiene una ofensiva respetable y viene en ascenso desde media tabla.",
    clave: "Molinos llega como amplio favorito. Su solidez defensiva (menos de 1 gol recibido por partido en promedio) será determinante. Micheleros necesita explotar su velocidad al contraataque.",
    prediccion: "Molinos avanza con ventaja clara.",
  },
  halcones_vs_sabinal: {
    resumen: "Halcones (2do, 42 pts, +36) vs Sabinal (7mo, 30 pts, +15). Halcones arrancó líder parcial en J-8 y J-9 pero fue alcanzado por Molinos. Sabinal tuvo un inicio discreto pero creció fuerte en la segunda mitad del torneo.",
    clave: "Halcones tiene el segundo mejor ataque del torneo. Sabinal mostró gran recuperación defensiva en jornadas recientes. Partido de estilos contrastantes.",
    prediccion: "Halcones parte como favorito, pero Sabinal puede complicar si cierra los espacios.",
  },
  redbull_vs_rangers: {
    resumen: "Red Bull (3ro, 37 pts, +31) vs Ranger's (6to, 31 pts, +13). Un clásico de la liga. Red Bull tuvo el mejor inicio del torneo (líder en J-6 y J-7) pero perdió fuelle. Ranger's es un equipo sólido, siempre en la parte alta.",
    clave: "Red Bull cuenta con la mejor defensiva de la liga (menos goles recibidos). Ranger's es disciplinado tácticamente y peligroso a balón parado. Históricamente partidos muy parejos.",
    prediccion: "Es la llave más pareja. Red Bull favorito por su solidez, pero Ranger's puede dar la sorpresa.",
  },
  liverpool_vs_arsenal: {
    resumen: "Liverpool (4to, 37 pts, +23) vs Arsenal (5to, 32 pts, +14). El 'derbi de la parte alta'. Liverpool tuvo un crecimiento sostenido, escalando posiciones jornada tras jornada. Arsenal arrancó lento pero se consolidó entre los 5 primeros.",
    clave: "Liverpool es el equipo con mayor proyección ofensiva de la segunda mitad. Arsenal es sólido en partidos cerrados. El duelo táctico será fascinante.",
    prediccion: "Ligeramente favorable a Liverpool por su momento anímico, pero Arsenal es una incógnita peligrosa.",
  },
}

export const TEAM_COLORS = {
  "Molinos": "#c0152a",
  "Halcones": "#ffd166",
  "Red Bull": "#e63e2e",
  "Liverpool": "#00b4d8",
  "Arsenal": "#e63946",
  "Ranger's": "#2a9d8f",
  "Sabinal": "#8338ec",
  "Micheleros": "#ff9e00",
}
