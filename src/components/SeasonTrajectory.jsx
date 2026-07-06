import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, LineChart, ResponsiveContainer } from 'recharts'
import { SEASON_JOURNEYS, TEAM_POINTS_TRAJECTORY, TEAM_DIF_TRAJECTORY, TEAM_COLORS } from '../data/quarterfinals.js'

const QF_TEAMS = ["Molinos", "Halcones", "Red Bull", "Liverpool", "Arsenal", "Ranger's", "Sabinal", "Micheleros"]
const JOURNEY_LABELS = SEASON_JOURNEYS.map(j => j.label)

function buildChartData(trajectory) {
  return SEASON_JOURNEYS.map(j => {
    const row = { jornada: j.label }
    QF_TEAMS.forEach(t => {
      const val = trajectory[t]?.[j.jornada]
      row[t] = val ?? null
    })
    return row
  })
}

function Chart({ title, subtitle, data, yLabel, height }) {
  return (
    <div className="rounded-md border border-[var(--line)] bg-[var(--panel)] p-4 sm:p-5">
      <div className="mb-4 pb-3 border-b border-[var(--line-soft)]">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-bold mb-1">
          Gráfico
        </p>
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[var(--cream)]">{title}</h3>
        {subtitle && <p className="text-sm text-[var(--dim)] mt-1 font-serif italic">{subtitle}</p>}
      </div>
      <div style={{ width: '100%', height: height || 320 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,241,232,0.14)" />
            <XAxis dataKey="jornada" tick={{ fill: '#dad5c8', fontSize: 12 }} stroke="rgba(245,241,232,0.22)" />
            <YAxis tick={{ fill: '#dad5c8', fontSize: 12 }} stroke="rgba(245,241,232,0.22)" label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: '#dad5c8', fontSize: 11, style: { fontFamily: 'Inter' } }} />
            <Tooltip
              contentStyle={{ background: '#0b1220', border: '1px solid rgba(245,241,232,0.14)', borderRadius: 6, color: '#f5f1e8', fontSize: 13 }}
              labelStyle={{ color: '#f5f1e8', fontFamily: 'Playfair Display, serif', fontWeight: 700 }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#f5f1e8' }} />
            {QF_TEAMS.map(t => (
              <Line key={t} type="monotone" dataKey={t} stroke={TEAM_COLORS[t] || '#666'} strokeWidth={2} dot={{ r: 3, fill: TEAM_COLORS[t] }} connectNulls />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function SeasonTrajectory() {
  return (
    <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
      <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)]">
        <p className="section-eyebrow mb-1">Trayectoria</p>
        <h2 className="section-title text-2xl sm:text-3xl">Evolución en el torneo</h2>
        <p className="text-sm text-[var(--dim)] mt-1.5 max-w-2xl font-serif">
          Puntos acumulados y diferencia de goles a lo largo de las jornadas, para los ocho clasificados.
        </p>
      </header>

      <div className="p-5 sm:p-7 space-y-5">
        <Chart
          title="Puntos por jornada"
          subtitle="Evolución de puntos acumulados durante el torneo regular"
          data={buildChartData(TEAM_POINTS_TRAJECTORY)}
          yLabel="Puntos"
        />

        <Chart
          title="Diferencia de goles"
          subtitle="Evolución de la diferencia de goles a lo largo del torneo"
          data={buildChartData(TEAM_DIF_TRAJECTORY)}
          yLabel="Diferencia de goles"
        />
      </div>
    </section>
  )
}
