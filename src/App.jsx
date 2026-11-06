import { Routes, Route, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import Ligas from './pages/Ligas.jsx'
import Resultados from './pages/Resultados.jsx'
import Presentaciones from './pages/Presentaciones.jsx'
import Pronosticos from './pages/Pronosticos.jsx'
import PronosticosEnVivo from './pages/PronosticosEnVivo.jsx'
import PrimeraFuerzaEspecial from './pages/ligas/PrimeraFuerzaEspecial.jsx'
import PrimeraA from './pages/ligas/PrimeraA.jsx'

// Pantalla del programa en vivo: sin menú ni pie de página.
const RUTA_PANTALLA = '/pronosticos/envivo'

export default function App() {
  const { pathname } = useLocation()
  const pantallaCompleta = pathname === RUTA_PANTALLA

  return (
    <div className="min-h-screen">
      {!pantallaCompleta && <SiteHeader />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ligas" element={<Ligas />} />
        <Route path="/ligas/primera-fuerza-especial" element={<PrimeraFuerzaEspecial />} />
        <Route path="/ligas/primera-a" element={<PrimeraA />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/pronosticos" element={<Pronosticos />} />
        <Route path={RUTA_PANTALLA} element={<PronosticosEnVivo />} />
        <Route path="/presentaciones" element={<Presentaciones />} />
      </Routes>

      {!pantallaCompleta && <SiteFooter />}
    </div>
  )
}
