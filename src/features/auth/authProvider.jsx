import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { AuthContext } from '../auth/authContext'

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(undefined) // undefined = verificando
  const [cuenta, setCuenta] = useState({ userId: null, perfil: null, error: '' })
  const userId = session?.user.id

  useEffect(() => {
    // Emite la sesión guardada al suscribirse y luego cada cambio.
    // No hacer consultas a Supabase dentro de este callback.
    const { data } = supabase.auth.onAuthStateChange((_evento, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) return
    let vigente = true

    supabase
      .from('perfiles_usuario')
      .select('nombre_completo, activo, roles(codigo, nombre, activo, rol_permisos(permisos(codigo)))')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!vigente) return
        let mensaje = ''
        if (error) mensaje = `No se pudo cargar tu perfil: ${error.message}`
        else if (!data) mensaje = 'Tu usuario no tiene un rol asignado.'
        else if (!data.activo || !data.roles?.activo) mensaje = 'Tu usuario o tu rol está inactivo.'
        setCuenta({ userId, perfil: mensaje ? null : data, error: mensaje })
      })

    return () => {
      vigente = false
    }
  }, [userId])

  const listo = cuenta.userId === userId
  const perfil = userId && listo ? cuenta.perfil : null
  const permisos = new Set(perfil?.roles.rol_permisos.map((rp) => rp.permisos.codigo))

  const valor = {
    session,
    perfil,
    error: userId && listo ? cuenta.error : '',
    cargando: session === undefined || Boolean(userId && !listo),
    puede: (codigo) => permisos.has(codigo),
    iniciarSesion: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    cerrarSesion: () => {
      setCuenta({ userId: null, perfil: null, error: '' })
      return supabase.auth.signOut()
    },
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}