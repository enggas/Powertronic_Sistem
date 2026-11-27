import { supabase } from '../../lib/supabase'

export const CAMPOS_PC = ['cpu', 'ram', 'tarjetagrafica', 'motherboard', 'fuente']

const exigir = ({ data, error }) => {
  if (error) throw new Error(error.message)
  return data
}

export const listarProductos = async () =>
  exigir(await supabase
    .from('producto')
    .select('*, marcas(nombre), categoriaproducto(nombre, descripcion), detproducto(*)')
    .order('nombreproducto'))

export const listarCatalogos = async () => {
  const [marcas, categorias] = await Promise.all([
    supabase.from('marcas').select('id, nombre, estado').order('nombre'),
    supabase.from('categoriaproducto').select('id, nombre, descripcion, estado').order('nombre'),
  ])
  return { marcas: exigir(marcas), categorias: exigir(categorias) }
}

// Crea (sin id) o actualiza (con id). Devuelve el id del producto.
export const guardarProducto = async (id, datos) => {
  const consulta = id
    ? supabase.from('producto').update(datos).eq('id', id)
    : supabase.from('producto').insert(datos)
  return exigir(await consulta.select('id').single()).id
}

export const guardarDetalle = async (idproducto, idDetalle, detalle) => {
  const consulta = idDetalle
    ? supabase.from('detproducto').update(detalle).eq('id', idDetalle)
    : supabase.from('detproducto').insert({ ...detalle, idproducto })
  exigir(await consulta.select('id').single())
}

// Baja lógica: el producto nunca se borra, así se conserva el historial
export const cambiarEstado = async (id, estado) =>
  exigir(await supabase.from('producto').update({ estado }).eq('id', id).select('id').single())