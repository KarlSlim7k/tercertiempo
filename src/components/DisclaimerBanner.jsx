export default function DisclaimerBanner() {
  return (
    <aside
      className="rounded-sm p-4 sm:p-5 flex items-start gap-4"
      style={{ background: 'var(--gold-soft)', borderLeft: '4px solid var(--gold)', border: '1px solid var(--line)', borderLeftWidth: '4px' }}
    >
      <div
        className="w-9 h-9 shrink-0 rounded-full font-serif font-bold flex items-center justify-center"
        style={{ background: 'var(--gold)', color: 'var(--ink)' }}
      >
        !
      </div>
      <div className="text-sm">
        <p className="font-serif font-bold text-base leading-tight" style={{ color: 'var(--gold)' }}>
          Datos preliminares
        </p>
        <p className="mt-1.5 leading-relaxed font-serif" style={{ color: 'var(--dim)' }}>
          Los resultados y el análisis provienen de los datos proporcionados por el
          <b style={{ color: 'var(--cream)' }}> Profr. Manuel Leal</b> y están sujetos a cambios.
          No contamos con los marcadores oficiales de todas las jornadas del torneo regular
          para realizar un análisis histórico cara a cara completo.{' '}
          <b style={{ color: 'var(--cream)' }}>Síguelo en el programa Tercer Tiempo.</b>
        </p>
      </div>
    </aside>
  )
}
