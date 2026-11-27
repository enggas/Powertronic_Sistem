import { createContext, useContext } from 'react'

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

// Pantalla inicial según permisos (el orden define la prioridad)
export const rutaInicial = (puede) => {
  if (puede('inventario.gestionar')) return '/productos' // administrador
  if (puede('ventas.leer')) return '/ventas' // vendedor y misceláneo
  if (puede('reparaciones.leer')) return '/reparaciones' // técnico
  if (puede('inventario.leer')) return '/productos'
  return '/sin-acceso'
}