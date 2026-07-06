import { Routes, Route } from 'react-router-dom'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import Resultados from './pages/Resultados.jsx'
import Presentaciones from './pages/Presentaciones.jsx'

export default function App() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/presentaciones" element={<Presentaciones />} />
      </Routes>

      <SiteFooter />
    </div>
  )
}
