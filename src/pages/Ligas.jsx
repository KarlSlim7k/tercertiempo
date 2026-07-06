import { Link } from 'react-router-dom'
import { LIGAS } from '../data/ligas.js'

export default function Ligas() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <p className="masthead-kicker text-[11px] mb-2">Torneos integrados</p>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8" style={{ color: 'var(--cream)' }}>
        Ligas
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {LIGAS.map((liga) => (
          <article key={liga.slug} className="programa-card">
            <h3 className="font-serif text-xl font-bold mb-1" style={{ color: 'var(--cream)' }}>
              {liga.nombre}
            </h3>
            <p className="text-xs mb-1" style={{ color: 'var(--dimmer)' }}>{liga.subtitulo}</p>
            <p className="text-xs mb-4" style={{ color: 'var(--gold)' }}>{liga.estado}</p>
            <Link to={`/ligas/${liga.slug}`} className="programa-card-btn">Ver liga</Link>
          </article>
        ))}
      </div>
    </main>
  )
}
