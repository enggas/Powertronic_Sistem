import { Routes, Route, Navigate } from 'react-router-dom'
import { LandingHome } from '../features/landing/pages/landingHome'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingHome />} />
      {/* Futuras rutas: /catalogo, /reparaciones, /login, etc. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}