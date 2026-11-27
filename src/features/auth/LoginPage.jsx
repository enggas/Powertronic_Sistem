import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { rutaInicial, useAuth } from './authContext'
import '../panel/panel.css'

export const LoginPage = () => {
  const { session, perfil, error, cargando, puede, iniciarSesion, cerrarSesion } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fallo, setFallo] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (perfil) return <Navigate to={rutaInicial(puede)} replace />

  const enviar = async (e) => {
    e.preventDefault()
    setFallo('')
    setEnviando(true)
    const { error } = await iniciarSesion(email.trim(), password)
    if (error) {
      setFallo(error.code === 'invalid_credentials' ? 'Correo o contraseña incorrectos.' : error.message)
    }
    setEnviando(false)
  }

  return (
    <main className="login">
      <form className="caja login__form" onSubmit={enviar}>
        <h1 className="marca">Power<span>tronic</span></h1>

        {session && error ? (
          <>
            <p className="error" role="alert">{error}</p>
            <button type="button" className="boton" onClick={cerrarSesion}>Usar otra cuenta</button>
          </>
        ) : (
          <>
            <label>
              Correo
              <input type="email" required autoComplete="username" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Contraseña
              <input type="password" required autoComplete="current-password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
            </label>
            {fallo && <p className="error" role="alert">{fallo}</p>}
            <button className="boton boton--primario" disabled={enviando || cargando}>
              {enviando || cargando ? 'Verificando…' : 'Iniciar sesión'}
            </button>
          </>
        )}
      </form>
    </main>
  )
}