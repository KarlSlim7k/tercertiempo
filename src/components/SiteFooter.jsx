import logoCrea from '../assets/optimized/logo-crea.png'
import logoTercerTiempo from '../assets/optimized/logo-tercer-tiempo.png'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-3 flex-wrap mb-3">
          <div className="bg-white rounded-sm px-2 py-0.5 inline-flex items-center justify-center">
            <img src={logoCrea} alt="CREA" className="h-6 w-auto" />
          </div>
          <p className="text-sm font-serif" style={{ color: 'var(--dim)' }}>
            Producido por <b style={{ color: 'var(--cream)' }}>CREA Contenidos</b> · Programa <b style={{ color: 'var(--cream)' }}>Tercer Tiempo</b>
          </p>
          <img src={logoTercerTiempo} alt="Tercer Tiempo" className="h-7 w-auto" />
        </div>
        <div className="rule-double pt-3">
          <small className="text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: 'var(--dimmer)' }}>
            Primera Fuerza Especial · Liga Luis Pirata Fuente · Datos preliminares sujetos a cambios
          </small>
        </div>
      </div>
    </footer>
  )
}
