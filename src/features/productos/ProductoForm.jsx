import { useState } from 'react'
import { CAMPOS_PC, guardarDetalle, guardarProducto } from './productosServices'

const ETIQUETAS = {
  cpu: 'CPU', ram: 'RAM', tarjetagrafica: 'Tarjeta gráfica',
  motherboard: 'Motherboard', fuente: 'Fuente',
}

export const ProductoForm = ({ producto, marcas, categorias, onCerrar, onGuardado }) => {
  const detalle = producto?.detproducto?.[0]
  const [f, setF] = useState(() => ({
    nombreproducto: producto?.nombreproducto ?? '',
    idmarca: producto?.idmarca ?? '',
    idcategoria: producto?.idcategoria ?? '',
    preciocompra: producto?.preciocompra ?? '',
    precioventa: producto?.precioventa ?? '',
    stock: producto?.stock ?? 0,
    imagen: producto?.imagen ?? '',
    prearmado: producto?.prearmado ?? false,
    ...Object.fromEntries(CAMPOS_PC.map((c) => [c, detalle?.[c] ?? ''])),
  }))
  const [error, setError] = useState('')
  const [guardando, setGuardando] = useState(false)

  const campo = (nombre) => ({
    value: f[nombre],
    onChange: (e) => setF({ ...f, [nombre]: e.target.value }),
  })

  const enviar = async (e) => {
    e.preventDefault()
    if (!f.nombreproducto.trim()) return setError('El nombre es obligatorio.')
    setError('')
    setGuardando(true)
    try {
      const id = await guardarProducto(producto?.id, {
        nombreproducto: f.nombreproducto.trim(),
        idmarca: Number(f.idmarca),
        idcategoria: Number(f.idcategoria),
        preciocompra: Number(f.preciocompra),
        precioventa: Number(f.precioventa),
        stock: Number(f.stock),
        imagen: f.imagen.trim() || null,
        prearmado: f.prearmado,
      })

      let aviso = ''
      if (f.prearmado) {
        const specs = Object.fromEntries(CAMPOS_PC.map((c) => [c, f[c].trim() || null]))
        // Si esto falla, el producto ya quedó guardado: se avisa sin duplicarlo
        await guardarDetalle(id, detalle?.id, specs).catch((err) => {
          aviso = `Producto guardado, pero no sus especificaciones: ${err.message}`
        })
      }
      onGuardado(aviso)
    } catch (err) {
      setError(err.message)
      setGuardando(false)
    }
  }

  // Solo opciones activas, más la que ya tiene el producto
  const opciones = (lista, actual) => lista.filter((x) => x.estado || x.id === actual)

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <form className="caja" onSubmit={enviar}>
        <h2 className="ancho">{producto ? 'Editar producto' : 'Nuevo producto'}</h2>
        <label className="ancho">Nombre<input required {...campo('nombreproducto')} /></label>
        <label>Marca
          <select required {...campo('idmarca')}>
            <option value="">Seleccionar…</option>
            {opciones(marcas, producto?.idmarca).map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </label>
        <label>Categoría
          <select required {...campo('idcategoria')}>
            <option value="">Seleccionar…</option>
            {opciones(categorias, producto?.idcategoria).map((c) => (
              <option key={c.id} value={c.id}>{c.nombre || c.descripcion}</option>
            ))}
          </select>
        </label>
        <label>Precio de compra
          <input type="number" min="0" step="0.01" required {...campo('preciocompra')} />
        </label>
        <label>Precio de venta (referencia)
          <input type="number" min="0" step="0.01" required {...campo('precioventa')} />
        </label>
        <label>Stock<input type="number" min="0" step="1" required {...campo('stock')} /></label>
        <label>URL de imagen<input type="url" {...campo('imagen')} /></label>
        <label className="casilla ancho">
          <input type="checkbox" checked={f.prearmado}
            onChange={(e) => setF({ ...f, prearmado: e.target.checked })} />
          Es un equipo prearmado
        </label>
        {f.prearmado && CAMPOS_PC.map((c) => (
          <label key={c}>{ETIQUETAS[c]}<input {...campo(c)} /></label>
        ))}
        {error && <p className="error ancho" role="alert">{error}</p>}
        <div className="acciones ancho">
          <button className="boton boton--primario" disabled={guardando}>
            {guardando ? 'Guardando…' : 'Guardar'}
          </button>
          <button type="button" className="boton" onClick={onCerrar} disabled={guardando}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}