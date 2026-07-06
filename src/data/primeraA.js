/* ===========================================================
   Datos · Primera A · 2026
   Fuente: programa 42 (horarios.html / resultados.html)
   =========================================================== */

// Tabla de posiciones previa a J-29
export const STANDINGS = [
  { pos: 1,  team: "P S G",             jj: 27, dif: 31,  pts: 58 },
  { pos: 2,  team: "Perris FC",         jj: 26, dif: 39,  pts: 56 },
  { pos: 3,  team: "Everton",           jj: 26, dif: 35,  pts: 51 },
  { pos: 4,  team: "Pumas",             jj: 26, dif: 13,  pts: 44 },
  { pos: 5,  team: "Cuervos",           jj: 27, dif: -3,  pts: 43 },
  { pos: 6,  team: "River Plate",       jj: 26, dif: 10,  pts: 42 },
  { pos: 7,  team: "Racing",            jj: 27, dif: 10,  pts: 41 },
  { pos: 8,  team: "Boca Jr",           jj: 27, dif: 17,  pts: 40 },
  { pos: 9,  team: "Halcones",          jj: 27, dif: -11, pts: 40 },
  { pos: 10, team: "Mi Barrio",         jj: 27, dif: -12, pts: 40 },
  { pos: 11, team: "Molinos",           jj: 27, dif: 1,   pts: 38 },
  { pos: 12, team: "Correcaminos",      jj: 27, dif: -2,  pts: 38 },
  { pos: 13, team: "Coyotes Neza",      jj: 27, dif: -19, pts: 37 },
  { pos: 14, team: "Pescados",          jj: 27, dif: -10, pts: 35 },
  { pos: 15, team: "Warners",           jj: 27, dif: null, pts: 32 },
  { pos: 16, team: "Dep. Jardin",       jj: 27, dif: null, pts: 27 },
  { pos: 17, team: "Atletico Libertad", jj: 27, dif: null, pts: 27 },
  { pos: 18, team: "Barrio Unido",      jj: 27, dif: null, pts: 26 },
  { pos: 19, team: "Viveros",           jj: 27, dif: null, pts: 17 },
  { pos: 20, team: "Vaper",             jj: 27, dif: null, pts: null },
]

// Resultados Jornada 29 (partidos disputados el fin de semana)
export const J29_RESULTS = [
  { local: "Perris",             gl: 4, gv: 0, visita: "Jardín" },
  { local: "Atlético Libertad",  gl: 2, gv: 1, visita: "Racing" },
  { local: "Cuervos",            gl: 3, gv: 0, visita: "Correcaminos" },
  { local: "Molinos",            gl: 3, gv: 1, visita: "Mi Barrio" },
  { local: "PSG",                gl: 6, gv: 5, visita: "Coyotes" },
  { local: "Pumas",              gl: 4, gv: 2, visita: "Pescados" },
  { local: "Boca JR",            gl: 4, gv: 1, visita: "Barrio Unido" },
]

// Partidos J-29 resueltos administrativamente (sin marcador, sin horario)
export const J29_RESUELTOS = [
  { ganador: "Wuarner", perdedor: "River Plate" },
  { ganador: "Viveros", perdedor: "Halcones" },
  { ganador: "Everton", perdedor: "Vaper" },
]
