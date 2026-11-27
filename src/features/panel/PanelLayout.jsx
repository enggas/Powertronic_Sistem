import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/authContext'
import './panel.css'

const modulos = [
  { ruta: '/productos', nombre: 'Productos', permiso: 'inventario.leer' },
  { ruta: '/ventas', nombre: 'Ventas', permiso: 'ventas.leer' },
  { ruta: '/reparaciones', nombre: 'Reparaciones', permiso: 'reparaciones.leer' },
]

export const PanelLayout = () => {
  const { perfil, puede, cerrarSesion } = useAuth()

  return (
    <div className="panel">
      <header className="panel__barra">
        <strong className="marca">Power<span>tronic</span></strong>
        <nav>
          {modulos.filter((m) => puede(m.permiso)).map((m) => (
            <NavLink key={m.ruta} to={m.ruta}>{m.nombre}</NavLink>
          ))}
        </nav>
        <span>{perfil.nombre_completo} · {perfil.roles.nombre}</span>
        <button type="button" className="boton" onClick={cerrarSesion}>Salir</button>
      </header>
      <main className="panel__contenido">
        <Outlet />
      </main>
    </div>
  )
}