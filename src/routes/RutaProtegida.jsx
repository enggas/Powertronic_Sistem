import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/authContext'

export const RutaProtegida = ({ permiso }) => {
  const { perfil, cargando, puede } = useAuth()

  if (cargando) return <p style={{ padding: 24 }}>Cargando…</p>
  if (!perfil) return <Navigate to="/login" replace />
  if (permiso && !puede(permiso)) return <Navigate to="/" replace />
  return <Outlet />
}
