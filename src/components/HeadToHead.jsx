export default function HeadToHead() {
  return (
    <section className="bg-[var(--panel)] border border-[var(--line)] rounded-lg shadow-sm overflow-hidden">
      <header className="px-5 sm:px-7 py-5 border-b border-[var(--line)] flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <p className="section-eyebrow mb-1">Historial</p>
          <h2 className="section-title text-2xl sm:text-3xl">Cara a cara</h2>
          <p className="text-sm text-[var(--dim)] mt-1.5 max-w-2xl font-serif">
            Resultados del torneo regular entre los equipos que se enfrentan en cuartos.
          </p>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-[var(--dimmer)] font-semibold">
          Torneo regular
        </span>
      </header>

      <div className="p-5 sm:p-7">
        <div className="rounded-md border border-[var(--line)] bg-[var(--panel-2)] overflow-hidden">
          <div className="p-6 sm:p-8 flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--gold-soft)] border border-[var(--gold-2)] text-[var(--gold)] font-serif font-bold text-lg">
              i
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[var(--cream)]">
                Resultados del torneo regular, próximamente
              </h3>
              <p className="text-sm text-[var(--dim)] mt-2 max-w-md mx-auto leading-relaxed font-serif">
                No contamos con los marcadores oficiales de cada jornada. Los datos actuales solo
                reflejan posiciones globales. Para un análisis cara a cara completo necesitamos
                los resultados partido por partido del torneo regular.
              </p>
            </div>
            <div className="bg-[var(--panel)] rounded-md px-5 py-4 border border-[var(--line)] text-left w-full max-w-md">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--gold)] font-bold mb-2">
                Lo que podríamos analizar
              </p>
              <ul className="space-y-1.5 text-sm text-[var(--dim)] font-serif">
                {[
                  'Victorias, empates y derrotas en enfrentamientos directos',
                  'Goles a favor y en contra en partidos entre sí',
                  'Rendimiento como local y visitante',
                  'Racha de resultados previa a la liguilla',
                  'Promedio de goles por partido en la serie histórica',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--gold)] shrink-0 mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-[var(--dimmer)] text-center mt-4 font-serif">
          ¿Tienes acceso a los resultados oficiales?{' '}
          <span className="text-[var(--gold)] font-semibold">Contáctanos</span> para enriquecer el análisis.
        </p>
      </div>
    </section>
  )
}
