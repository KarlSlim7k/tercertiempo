import ProgramaCard from '../components/ProgramaCard.jsx'
import { PROGRAMAS } from '../data/programas.js'

export default function Resultados() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <p className="masthead-kicker text-[11px] mb-2">Archivo por programa</p>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-8" style={{ color: 'var(--cream)' }}>
        Resultados
      </h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {[...PROGRAMAS].sort((a, b) => b.numero - a.numero).map((programa) => (
          <ProgramaCard key={programa.numero} programa={programa} tipos={['resultados']} />
        ))}
      </div>
    </main>
  )
}
