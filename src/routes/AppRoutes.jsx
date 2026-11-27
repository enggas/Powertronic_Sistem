import { Navigate, Route, Routes } from 'react-router-dom'
import { rutaInicial, useAuth } from '../features/auth/authContext'
import { LoginPage } from '../features/auth/LoginPage'
import { LandingHome } from '../features/landing/pages/landingHome'
import { PanelLayout } from '../features/panel/PanelLayout'
import { ProductosPage } from '../features/productos/ProductosPage'
import { RutaProtegida } from './RutaProtegida'

const Inicio = () => {
  const { puede } = useAuth()
  return <Navigate to={rutaInicial(puede)} replace />
}

const Pendiente = ({ titulo }) => (
  <>
    <h1>{titulo}</h1>
    <p>Módulo en construcción.</p>
  </>
)

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/landing" element={<LandingHome />} />

    <Route element={<RutaProtegida />}>
      <Route path="/" element={<Inicio />} />
      <Route element={<PanelLayout />}>
        <Route element={<RutaProtegida permiso="inventario.leer" />}>
          <Route path="/productos" element={<ProductosPage />} />
        </Route>
        <Route element={<RutaProtegida permiso="ventas.leer" />}>
          <Route path="/ventas" element={<Pendiente titulo="Ventas" />} />
        </Route>
        <Route element={<RutaProtegida permiso="reparaciones.leer" />}>
          <Route path="/reparaciones" element={<Pendiente titulo="Reparaciones" />} />
        </Route>
        <Route path="/sin-acceso" element={<Pendiente titulo="Sin módulos asignados" />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)