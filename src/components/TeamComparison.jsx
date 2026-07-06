import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts'
import { QUARTERFINALS, TEAM_OD_RATIO, TEAM_COLORS } from '../data/quarterfinals.js'

const METRICS = ["Puntos", "Diferencia", "Ataque", "Defensa", "Momento"]

function getTeamMetrics(teamName) {
  const key = teamName.toLowerCase()
  const j17 = { "molinos":44, "halcones":42, "red bull":37, "liverpool":37, "arsenal":32, "ranger's":31, "sabinal":30, "micheleros":29 }
  const j17dif = { "molinos":40, "halcones":36, "red bull":31, "liverpool":23, "arsenal":14, "ranger's":13, "sabinal":15, "micheleros":8 }
  const p11 = TEAM_OD_RATIO[teamName]
  const gf = p11?.P11?.gf ?? 0
  const gc = p11?.P11?.gc ?? 0

  const pts = j17[key] || 0
  const dif = j17dif[key] || 0
  const ataque = gf / 11
  const defensa = Math.max(0, 3 - gc / 11)

  return [
    { metric: "Puntos",     value: pts / 44 * 100 },
    { metric: "Diferencia", value: Math.min(100, Math.max(0, (dif + 40) / 80 * 100)) },
    { metric: "Ataque",     value: Math.min(100, ataque / 4 * 100) },
    { metric: "Defensa",    value: Math.min(100, defensa / 3 * 100) },
    { metric: "Momento",    value: 70 },
  ]
}

export default function TeamComparison() {
  return (
    <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
      <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)] flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <p className="section-eyebrow mb-1">Comparativa</p>
          <h2 className="section-title text-2xl sm:text-3xl">Perfil de los equipos</h2>
          <p className="text-sm text-[var(--dim)] mt-1.5 max-w-2xl font-serif">
            Radar de rendimiento por enfrentamiento, normalizado a 100 puntos.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">
          Radar de rendimiento
        </span>
      </header>

      <div className="p-5 sm:p-7 grid gap-6 sm:grid-cols-2">
        {QUARTERFINALS.map((qf) => {
          const local = getTeamMetrics(qf.local)
          const visita = getTeamMetrics(qf.visita)
          const data = METRICS.map((m, i) => ({
            metric: m,
            [qf.local]: Math.round(local[i].value),
            [qf.visita]: Math.round(visita[i].value),
          }))

          return (
            <article key={qf.id} className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-4">
              <div className="font-serif text-sm font-bold text-[var(--cream)] text-center pb-2 mb-3 border-b border-[var(--line-soft)]">
                {qf.local} <span className="text-[var(--dimmer)]">vs</span> {qf.visita}
              </div>
              <div style={{ height: 240 }}>
                <ResponsiveContainer>
                  <RadarChart data={data} cx="50%" cy="50%" outerRadius="68%">
                    <PolarGrid stroke="rgba(245,241,232,0.14)" />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: '#dad5c8', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name={qf.local}  dataKey={qf.local}  stroke={TEAM_COLORS[qf.local]  || '#e6b54a'} fill={TEAM_COLORS[qf.local]  || '#e6b54a'} fillOpacity={0.2} strokeWidth={2} />
                    <Radar name={qf.visita} dataKey={qf.visita} stroke={TEAM_COLORS[qf.visita] || '#b8b2a3'} fill={TEAM_COLORS[qf.visita] || '#b8b2a3'} fillOpacity={0.2} strokeWidth={2} />
                    <Legend wrapperStyle={{ fontSize: 11, color: '#f5f1e8' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
