const DECK_LABELS = {
  horarios: 'Horarios',
  resultados: 'Resultados',
  analisis: 'Análisis',
}

export default function ProgramaCard({ programa, tipos }) {
  const disponibles = tipos.filter((tipo) => programa.decks[tipo])

  return (
    <article className="programa-card">
      <div className="flex items-baseline justify-between gap-3 mb-2">
        <h3 className="font-serif text-xl font-bold" style={{ color: 'var(--cream)' }}>
          {programa.titulo}
        </h3>
        <span className="font-disp text-xs uppercase tracking-[0.2em]" style={{ color: 'var(--gold)' }}>
          #{programa.numero}
        </span>
      </div>
      <p className="text-xs mb-4" style={{ color: 'var(--dimmer)' }}>{programa.liga}</p>

      <div className="flex flex-wrap gap-2">
        {disponibles.map((tipo) => (
          <a
            key={tipo}
            href={`${import.meta.env.BASE_URL}${programa.decks[tipo]}`}
            target="_blank"
            rel="noreferrer"
            className="programa-card-btn"
          >
            Ver {DECK_LABELS[tipo]}
          </a>
        ))}
        {disponibles.length === 0 && (
          <span className="text-xs" style={{ color: 'var(--dimmer)' }}>Sin material disponible aún</span>
        )}
      </div>
    </article>
  )
}
