import ProgramaCard from '../components/ProgramaCard.jsx'
import { PROGRAMAS } from '../data/programas.js'

export default function Presentaciones() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <p className="masthead-kicker text-[11px] mb-2">Archivo por programa</p>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8" style={{ color: 'var(--cream)' }}>
        Presentaciones
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {[...PROGRAMAS].sort((a, b) => b.numero - a.numero).map((programa) => (
          <ProgramaCard key={programa.numero} programa={programa} tipos={['horarios', 'analisis']} />
        ))}
      </div>

      <p className="masthead-kicker text-[11px] mb-2 mt-10">Transmisión en vivo</p>
      <h2 className="font-serif text-xl font-bold mb-4" style={{ color: 'var(--cream)' }}>
        Final Ida
      </h2>
      <article className="programa-card max-w-md">
        <div className="flex items-baseline justify-between gap-3 mb-2">
          <h3 className="font-serif text-xl font-bold" style={{ color: 'var(--cream)' }}>
            Starting Soon
          </h3>
        </div>
        <p className="text-xs mb-4" style={{ color: 'var(--dimmer)' }}>
          Pantalla de espera para vMix &middot; Final de Ida &middot; Liga Primera Fuerza Especial
        </p>
        <a
          href={`${import.meta.env.BASE_URL}presentaciones/final-ida/starting-soon.html`}
          target="_blank"
          rel="noreferrer"
          className="programa-card-btn"
        >
          Abrir pantalla
        </a>
      </article>
    </main>
  )
}
