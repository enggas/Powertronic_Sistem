import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/authContext'
import { ProductoForm } from './ProductoForm'
import { cambiarEstado, listarCatalogos, listarProductos } from './productosServices'

const pedirDatos = () => Promise.all([listarProductos(), listarCatalogos()])
const dinero = (n) => Number(n).toFixed(2)

export const ProductosPage = () => {
  const { puede } = useAuth()
  const gestiona = puede('inventario.gestionar')
  const [datos, setDatos] = useState(null)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
  const [verInactivos, setVerInactivos] = useState(false)
  const [editando, setEditando] = useState(undefined) // undefined: cerrado, null: nuevo

  const mostrar = useCallback(([productos, catalogos]) => setDatos({ productos, ...catalogos }), [])
  const recargar = () => pedirDatos().then(mostrar).catch((e) => setError(e.message))

  useEffect(() => {
    pedirDatos().then(mostrar).catch((e) => setError(e.message))
  }, [mostrar])

  const alternar = async (p) => {
    const accion = p.estado ? 'Desactivar' : 'Reactivar'
    if (!window.confirm(`¿${accion} "${p.nombreproducto}"?`)) return
    setError('')
    try {
      await cambiarEstado(p.id, !p.estado)
      await recargar()
    } catch (e) {
      setError(e.message)
    }
  }

  if (!datos) return error ? <p className="error">{error}</p> : <p>Cargando productos…</p>

  const texto = busqueda.trim().toLowerCase()
  const visibles = datos.productos.filter((p) =>
    (verInactivos || p.estado) &&
    `${p.nombreproducto} ${p.marcas?.nombre}`.toLowerCase().includes(texto))

  return (
    <>
      <h1>Productos</h1>
      <div className="herramientas">
        <input type="search" placeholder="Buscar por nombre o marca" aria-label="Buscar"
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        {gestiona && (
          <>
            <label>
              <input type="checkbox" checked={verInactivos}
                onChange={(e) => setVerInactivos(e.target.checked)} />
              Ver inactivos
            </label>
            <button type="button" className="boton boton--primario"
              onClick={() => { setError(''); setEditando(null) }}>
              + Nuevo producto
            </button>
          </>
        )}
      </div>
      {error && <p className="error" role="alert">{error}</p>}

      <div className="tabla">
        <table>
          <thead>
            <tr>
              <th>Producto</th><th>Marca</th><th>Categoría</th>
              <th>Compra</th><th>Venta ref.</th><th>Stock</th><th>Estado</th>
              {gestiona && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {visibles.map((p) => (
              <tr key={p.id} className={p.estado ? '' : 'inactivo'}>
                <td>{p.nombreproducto}</td>
                <td>{p.marcas?.nombre}</td>
                <td>{p.categoriaproducto?.nombre || p.categoriaproducto?.descripcion}</td>
                <td>{dinero(p.preciocompra)}</td>
                <td>{dinero(p.precioventa)}</td>
                <td>{p.stock}</td>
                <td>{p.estado ? 'Activo' : 'Inactivo'}</td>
                {gestiona && (
                  <td>
                    <div className="acciones">
                      <button type="button" className="boton"
                        onClick={() => { setError(''); setEditando(p) }}>Editar</button>
                      <button type="button" className="boton" onClick={() => alternar(p)}>
                        {p.estado ? 'Desactivar' : 'Reactivar'}
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {visibles.length === 0 && <p>No hay productos para mostrar.</p>}
      </div>

      {editando !== undefined && (
        <ProductoForm producto={editando} marcas={datos.marcas} categorias={datos.categorias}
          onCerrar={() => setEditando(undefined)}
          onGuardado={(aviso) => { setEditando(undefined); setError(aviso); recargar() }} />
      )}
    </>
  )
}