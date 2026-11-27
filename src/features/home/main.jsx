import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { errorConfiguracion } from '../../lib/supabase.js'
import { AppRoutes } from '../../routes/AppRoutes.jsx'
import { AuthProvider } from '../auth/authProvider.jsx'
import '../panel/panel.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {errorConfiguracion ? (
      <main className="login">
        <div className="caja login__form">
          <h1 className="marca">Power<span>tronic</span></h1>
          <p className="error" role="alert">{errorConfiguracion}</p>
          <p>
            Crea el archivo en la raíz del proyecto (junto a package.json) y
            reinicia con <code>npm run dev</code>.
          </p>
        </div>
      </main>
    ) : (
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    )}
  </StrictMode>,
)