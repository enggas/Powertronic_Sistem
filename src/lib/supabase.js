import { createClient } from '@supabase/supabase-js'

const url = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const key = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  ''
).trim()

// Si la configuración está mal no se lanza una excepción (dejaría la página en
// blanco): se expone el mensaje para que main.jsx lo muestre en pantalla.
export const errorConfiguracion =
  /^https?:\/\/.+/.test(url) && key
    ? ''
    : 'Faltan o son inválidas VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en el archivo .env.local'

export const supabase = errorConfiguracion ? null : createClient(url, key)